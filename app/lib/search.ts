import type { Product } from "./products";

// ────────────────────────────────────────────────────────────────────────────
// Text folding
//
// Catalogue data is entered by hand in the admin panel, so the same brand shows
// up as "Lattafa", "Lattafa Perfumes" and "L A T T A F A" (letter-spaced for
// looks). A plain `includes()` can never match "lattafa" against
// "l a t t a f a", which is why products appeared to be missing from search.
// Every string is therefore folded two ways: `spaced` for normal word matching
// and `collapsed` (all spaces removed) so letter-spaced entries still match.
// ────────────────────────────────────────────────────────────────────────────

/** Lowercase, strip accents, turn punctuation into spaces, collapse runs of space. */
function normalizeText(input: string | null | undefined): string {
  if (!input) return "";
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "") // é → e, Privée → privee
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ") // *, -, /, ’ … → space
    .trim()
    .replace(/\s+/g, " ");
}

type Haystack = { spaced: string; collapsed: string };

function hay(parts: (string | null | undefined)[]): Haystack {
  const spaced = normalizeText(parts.filter(Boolean).join(" "));
  return { spaced, collapsed: spaced.replace(/ /g, "") };
}

/** A term hits a field if it appears as a substring of either folding. */
function hits(term: string, field: Haystack): boolean {
  if (!field.spaced) return false;
  // A single letter anywhere inside a field matches almost the whole catalogue,
  // so require it to start a word — "y" finds "Y EDP" and "Yara", not "Layali".
  if (term.length === 1) {
    return field.spaced === term || field.spaced.startsWith(term + " ") || field.spaced.includes(" " + term);
  }
  if (field.spaced.includes(term)) return true;
  // Collapsed fallback is what matches "lattafa" against "L A T T A F A".
  return field.collapsed.includes(term);
}

// ────────────────────────────────────────────────────────────────────────────
// Per-product index (built once per product object, cached)
// ────────────────────────────────────────────────────────────────────────────

type ProductIndex = {
  name: Haystack;
  house: Haystack;
  inspired: Haystack;
  id: Haystack;
  notes: Haystack;
  meta: Haystack;
  description: Haystack;
};

const WEIGHTS: { key: keyof ProductIndex; weight: number }[] = [
  { key: "name", weight: 100 },
  { key: "house", weight: 70 },
  { key: "inspired", weight: 55 },
  { key: "id", weight: 45 },
  { key: "notes", weight: 30 },
  { key: "meta", weight: 15 },
  { key: "description", weight: 8 },
];

/** Fields that identify a product, as opposed to describing it. */
const IDENTIFYING = WEIGHTS.filter((f) => f.key === "name" || f.key === "house" || f.key === "id");

const indexCache = new WeakMap<Product, ProductIndex>();

function indexOf(p: Product): ProductIndex {
  const cached = indexCache.get(p);
  if (cached) return cached;

  const built: ProductIndex = {
    name: hay([p.name]),
    house: hay([p.house]),
    inspired: hay([p.inspiredBy?.name, p.inspiredBy?.house]),
    id: hay([p.id]),
    notes: hay(p.notes ?? []),
    meta: hay([p.line, p.gender, ...(p.occasions ?? []), ...(p.seasons ?? [])]),
    description: hay([p.description]),
  };
  indexCache.set(p, built);
  return built;
}

// ────────────────────────────────────────────────────────────────────────────
// Query parsing
// ────────────────────────────────────────────────────────────────────────────

/** Split a folded query into terms, joining a letter-spaced query back into one word. */
function queryTerms(query: string): string[] {
  const parts = normalizeText(query).split(" ").filter(Boolean);
  // Someone copying "M A N C E R A" off the page types seven 1-letter terms —
  // treat that as the single word they meant.
  if (parts.length >= 3 && parts.every((t) => t.length === 1)) return [parts.join("")];
  return parts;
}

/**
 * Generic matcher for callers that don't hold `Product` objects (e.g. the admin
 * panel, which works with raw Supabase rows). Every term must hit some field.
 */
export function matchesQuery(fields: (string | null | undefined)[], query: string): boolean {
  const terms = queryTerms(query);
  if (!terms.length) return true;
  const haystacks = fields.map((f) => hay([f]));
  return terms.every((t) => haystacks.some((h) => hits(t, h)));
}

// ────────────────────────────────────────────────────────────────────────────
// Ranked product search
// ────────────────────────────────────────────────────────────────────────────

function scoreProduct(p: Product, terms: string[], fullQuery: Haystack): number {
  const idx = indexOf(p);
  let score = 0;

  // Every term must land somewhere; each term scores the best field it hit.
  for (const term of terms) {
    // A one-letter query is only meaningful against identifying fields, never
    // against notes or prose — otherwise "y" returns the whole catalogue.
    const fields = term.length === 1 ? IDENTIFYING : WEIGHTS;
    let best = 0;
    for (const { key, weight } of fields) {
      if (weight <= best) continue;
      if (hits(term, idx[key])) best = weight;
    }
    if (best === 0) return 0; // AND semantics — an unmatched term disqualifies
    score += best;
  }

  // Whole-query bonuses decide which of many matches is *the* one the user meant.
  const q = fullQuery.spaced;
  const qc = fullQuery.collapsed;

  if (idx.name.spaced === q || idx.name.collapsed === qc) score += 1000;
  else if (idx.name.spaced.startsWith(q) || idx.name.collapsed.startsWith(qc)) score += 400;
  else if (idx.name.spaced.includes(q) || idx.name.collapsed.includes(qc)) score += 200;

  if (idx.house.spaced === q || idx.house.collapsed === qc) score += 150;
  else if (idx.house.spaced.includes(q) || idx.house.collapsed.includes(qc)) score += 80;

  if (idx.inspired.spaced.includes(q) || (qc.length >= 2 && idx.inspired.collapsed.includes(qc)))
    score += 60;

  // Shorter names beat longer ones on an equal footing ("Hawas" over "Hawas Fire").
  score += Math.max(0, 20 - idx.name.spaced.length / 2);

  if (p.bestSeller) score += 6;
  if (p.inStock !== false) score += 4;

  return score;
}

/** Same scoring, but a single matching term is enough — used only as a fallback. */
function looseScore(p: Product, terms: string[], fullQuery: Haystack): number {
  const idx = indexOf(p);
  let matched = 0;
  let score = 0;

  for (const term of terms) {
    let best = 0;
    for (const { key, weight } of WEIGHTS) {
      if (weight <= best) continue;
      if (hits(term, idx[key])) best = weight;
    }
    if (best > 0) {
      matched++;
      score += best;
    }
  }

  // Require the hit to be on something identifying, not just a shared note,
  // so "khamrah vanilla" doesn't fall back to every vanilla fragrance.
  if (!matched) return 0;
  const identifying = terms.some(
    (t) => hits(t, idx.name) || hits(t, idx.house) || hits(t, idx.inspired) || hits(t, idx.id)
  );
  if (!identifying) return 0;

  if (idx.name.spaced.includes(fullQuery.spaced)) score += 200;
  return score / 2; // always rank below exact-AND matches
}

/**
 * Search the catalogue, best match first.
 *
 * Matches on name, brand, "inspired by", id, notes, line/gender/occasion/season
 * and description — accent-, punctuation- and letter-spacing-insensitive.
 */
export function searchProducts(products: Product[], query: string): Product[] {
  const terms = queryTerms(query);
  if (!terms.length) return products;

  const normalized = normalizeText(query);
  const fullQuery: Haystack = { spaced: normalized, collapsed: normalized.replace(/ /g, "") };

  let scored = products
    .map((p) => ({ p, score: scoreProduct(p, terms, fullQuery) }))
    .filter((r) => r.score > 0);

  // Nothing matched every term — widen to "any identifying term" rather than
  // showing an empty state for a query that is merely over-specified.
  if (!scored.length && terms.length > 1) {
    scored = products
      .map((p) => ({ p, score: looseScore(p, terms, fullQuery) }))
      .filter((r) => r.score > 0);
  }

  return scored
    .sort((a, b) => b.score - a.score || a.p.name.localeCompare(b.p.name))
    .map((r) => r.p);
}
