"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "../lib/supabase";
import { matchesQuery } from "../lib/search";

// ── Types ───────────────────────────────────────────────────────────────────
type SizeRow = { ml: number; price: number };

type AdminProduct = {
  id: string;
  name: string;
  house: string;
  line: string;
  gender: string;
  notes: string[];
  occasions: string[];
  seasons: string[];
  best_seller: boolean;
  in_stock: boolean;
  discount: number;
  sizes: SizeRow[];
  inspired_by?: { name: string; house: string } | null;
  description?: string | null;
  image_url?: string | null;
};

type FormData = {
  id: string;
  name: string;
  house: string;
  line: "Arabian" | "Designer" | "Niche";
  gender: "Him" | "Her" | "Unisex";
  notes: string;
  occasions: string;
  seasons: string;
  bestSeller: boolean;
  inStock: boolean;
  discount: number;
  description: string;
  inspiredByName: string;
  inspiredByHouse: string;
  sizes: SizeRow[];
  imageUrl: string;
};

const emptyForm: FormData = {
  id: "", name: "", house: "",
  line: "Arabian", gender: "Him",
  notes: "", occasions: "", seasons: "",
  bestSeller: false, inStock: true, discount: 0,
  description: "", inspiredByName: "", inspiredByHouse: "",
  sizes: [{ ml: 5, price: 0 }],
  imageUrl: "",
};

type View = "loading" | "login" | "dashboard" | "form" | "reviews" | "review-form" | "orders";

// ── Order Types ─────────────────────────────────────────────────────────────
type OrderItem = { name: string; house: string; ml: number; qty: number; price: number };
type Order = {
  id: string;
  order_id: string;
  customer_name: string;
  phone: string;
  address: string;
  apartment?: string | null;
  city: string;
  items: OrderItem[];
  shipping_method: string;
  shipping_cost: number;
  payment_method: string;
  subtotal: number;
  discount: number;
  total: number;
  status: string;
  created_at: string;
};

// ── Review Types ────────────────────────────────────────────────────────────
type Review = {
  id: string;
  reviewer_name: string;
  platform: string;
  content: string;
  rating: number;
  screenshot_url?: string | null;
  featured: boolean;
  created_at?: string;
};

type ReviewForm = {
  reviewer_name: string;
  platform: string;
  content: string;
  rating: number;
  screenshot_url: string;
  featured: boolean;
};

const emptyReviewForm: ReviewForm = {
  reviewer_name: "",
  platform: "Instagram",
  content: "",
  rating: 5,
  screenshot_url: "",
  featured: true,
};

// ── Styles ──────────────────────────────────────────────────────────────────
const inputCls = "w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm px-4 py-2.5 rounded-sm focus:outline-none focus:border-[#c4a97d] transition-colors placeholder:text-[#444]";
const selectCls = inputCls + " cursor-pointer";

// ── Sub-components ──────────────────────────────────────────────────────────
function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[9px] tracking-[0.35em] text-[#666] uppercase block mb-1.5">
        {label}{required && <span className="text-[#c4a97d] ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? "bg-[#c4a97d]" : "bg-[#2a2a2a]"}`}
      >
        <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${value ? "translate-x-6" : "translate-x-1"}`} />
      </button>
      <span className="text-[10px] tracking-[0.3em] text-[#888] uppercase">{label}</span>
    </label>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div>
      <p className="text-[9px] tracking-[0.4em] text-[#555] uppercase">{label}</p>
      <p className={`text-2xl font-light mt-0.5 ${accent ? "text-red-400" : "text-white"}`}>{value}</p>
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────────────
export default function AdminPage() {
  const [view, setView] = useState<View>("loading");
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [editProduct, setEditProduct] = useState<AdminProduct | null>(null);
  const [search, setSearch] = useState("");
  const [lineFilter, setLineFilter] = useState("All");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [form, setForm] = useState<FormData>(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [confirmDialog, setConfirmDialog] = useState<{ message: string; onConfirm: () => void } | null>(null);

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editReview, setEditReview] = useState<Review | null>(null);
  const [reviewForm, setReviewForm] = useState<ReviewForm>(emptyReviewForm);
  const [reviewSaving, setReviewSaving] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const [reviewScreenshotFile, setReviewScreenshotFile] = useState<File | null>(null);
  const [reviewScreenshotPreview, setReviewScreenshotPreview] = useState("");

  // Orders state
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoaded, setOrdersLoaded] = useState(false);

  function askConfirm(message: string, onConfirm: () => void) {
    setConfirmDialog({ message, onConfirm });
  }

  // Check auth on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        Promise.all([loadProducts(), loadReviews(), loadOrders()]).then(() => setView("dashboard"));
      } else {
        setView("login");
      }
    });
  }, []);

  async function loadProducts() {
    const { data } = await supabase.from("products").select("*").order("line").order("name");
    setProducts(data ?? []);
  }

  async function loadReviews() {
    const { data } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
    setReviews(data ?? []);
  }

  async function loadOrders() {
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    setOrders(data ?? []);
    setOrdersLoaded(true);
  }

  async function updateOrderStatus(id: string, status: string) {
    await supabase.from("orders").update({ status }).eq("id", id);
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
  }

  async function saveReview() {
    if (!reviewForm.reviewer_name.trim() || !reviewForm.content.trim()) {
      setReviewError("Name and review text are required.");
      return;
    }
    setReviewSaving(true);
    setReviewError("");

    let screenshotUrl = reviewForm.screenshot_url;

    if (reviewScreenshotFile) {
      const ext = reviewScreenshotFile.name.split(".").pop();
      const path = `screenshots/${Date.now()}-${reviewForm.reviewer_name.toLowerCase().replace(/\s+/g, "-")}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("review-avatars")
        .upload(path, reviewScreenshotFile, { upsert: true });
      if (uploadError) {
        setReviewError("Screenshot upload failed: " + uploadError.message);
        setReviewSaving(false);
        return;
      }
      const { data: urlData } = supabase.storage.from("review-avatars").getPublicUrl(path);
      screenshotUrl = urlData.publicUrl;
    }

    const payload = {
      reviewer_name: reviewForm.reviewer_name.trim(),
      platform: reviewForm.platform,
      content: reviewForm.content.trim(),
      rating: reviewForm.rating,
      screenshot_url: screenshotUrl.trim() || null,
      featured: reviewForm.featured,
    };
    if (editReview) {
      const { error } = await supabase.from("reviews").update(payload).eq("id", editReview.id);
      if (error) { setReviewError(error.message); setReviewSaving(false); return; }
    } else {
      const { error } = await supabase.from("reviews").insert(payload);
      if (error) { setReviewError(error.message); setReviewSaving(false); return; }
    }
    await loadReviews();
    setReviewSaving(false);
    setReviewScreenshotFile(null);
    setReviewScreenshotPreview("");
    setView("reviews");
  }

  async function deleteReview(id: string) {
    askConfirm("Delete this review? This cannot be undone.", async () => {
      await supabase.from("reviews").delete().eq("id", id);
      setReviews((prev) => prev.filter((r) => r.id !== id));
    });
  }

  async function toggleFeatured(r: Review) {
    await supabase.from("reviews").update({ featured: !r.featured }).eq("id", r.id);
    setReviews((prev) => prev.map((x) => x.id === r.id ? { ...x, featured: !r.featured } : x));
  }

  async function login() {
    setLoginLoading(true);
    setLoginError("");
    const { error } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPassword });
    setLoginLoading(false);
    if (error) {
      setLoginError("Invalid email or password.");
    } else {
      await Promise.all([loadProducts(), loadReviews(), loadOrders()]);
      setView("dashboard");
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    setView("login");
  }

  function openAdd() {
    setEditProduct(null);
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview("");
    setSaveError("");
    setView("form");
  }

  function openEdit(p: AdminProduct) {
    setEditProduct(p);
    setForm({
      id: p.id,
      name: p.name,
      house: p.house,
      line: p.line as FormData["line"],
      gender: p.gender as FormData["gender"],
      notes: (p.notes ?? []).join(", "),
      occasions: (p.occasions ?? []).join(", "),
      seasons: (p.seasons ?? []).join(", "),
      bestSeller: p.best_seller ?? false,
      inStock: p.in_stock ?? true,
      discount: p.discount ?? 0,
      description: p.description ?? "",
      inspiredByName: p.inspired_by?.name ?? "",
      inspiredByHouse: p.inspired_by?.house ?? "",
      sizes: p.sizes?.length ? p.sizes : [{ ml: 5, price: 0 }],
      imageUrl: p.image_url ?? "",
    });
    setImageFile(null);
    setImagePreview(p.image_url ?? "");
    setSaveError("");
    setView("form");
  }

  async function toggleStock(p: AdminProduct) {
    await supabase.from("products").update({ in_stock: !p.in_stock }).eq("id", p.id);
    setProducts((prev) => prev.map((x) => x.id === p.id ? { ...x, in_stock: !p.in_stock } : x));
  }

  async function deleteProduct(id: string, name: string) {
    askConfirm(`Delete "${name}"? This cannot be undone.`, async () => {
      await supabase.from("products").delete().eq("id", id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    });
  }

  async function saveProduct() {
    if (!form.id.trim() || !form.name.trim() || !form.house.trim()) {
      setSaveError("ID, Name, and Brand are required.");
      return;
    }
    setSaving(true);
    setSaveError("");

    try {
      let imageUrl = form.imageUrl;

      if (imageFile) {
        const ext = imageFile.name.split(".").pop();
        const path = `${form.id}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(path, imageFile, { upsert: true });
        if (uploadError) {
          setSaveError("Image upload failed: " + uploadError.message);
          setSaving(false);
          return;
        }
        const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(path);
        imageUrl = `${urlData.publicUrl}?t=${Date.now()}`;
      }

      const payload = {
        id: form.id.trim(),
        name: form.name.trim(),
        house: form.house.trim(),
        line: form.line,
        gender: form.gender,
        notes: form.notes.split(",").map((s) => s.trim()).filter(Boolean),
        occasions: form.occasions.split(",").map((s) => s.trim()).filter(Boolean),
        seasons: form.seasons.split(",").map((s) => s.trim()).filter(Boolean),
        best_seller: form.bestSeller,
        in_stock: form.inStock,
        discount: form.discount || 0,
        description: form.description.trim() || null,
        inspired_by: form.inspiredByName.trim()
          ? { name: form.inspiredByName.trim(), house: form.inspiredByHouse.trim() }
          : null,
        sizes: form.sizes.filter((s) => s.ml > 0 && s.price > 0),
        image_url: imageUrl || null,
      };

      if (editProduct) {
        const { error } = await supabase.from("products").update(payload).eq("id", editProduct.id);
        if (error) { setSaveError(error.message); setSaving(false); return; }
      } else {
        const { error } = await supabase.from("products").insert(payload);
        if (error) { setSaveError(error.message); setSaving(false); return; }
      }

      await loadProducts();
      setView("dashboard");
    } finally {
      setSaving(false);
    }
  }

  const filtered = products.filter((p) => {
    // Same folding as the storefront, so "lattafa" finds rows saved as "L A T T A F A".
    const matchSearch = matchesQuery([p.name, p.house, p.id], search);
    const matchLine = lineFilter === "All" || p.line === lineFilter;
    return matchSearch && matchLine;
  });

  // ── Loading ────────────────────────────────────────────────────────────────
  if (view === "loading") {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#c4a97d] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ── Login ──────────────────────────────────────────────────────────────────
  if (view === "login") {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <h1
            className="text-2xl font-light text-white tracking-widest mb-1 text-center"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Space Perfumes
          </h1>
          <p className="text-[10px] tracking-[0.5em] text-[#555] uppercase text-center mb-10">Admin Panel</p>

          <div className="bg-[#161616] border border-[#2a2a2a] p-8 rounded-sm">
            <div className="mb-5">
              <label className="text-[10px] tracking-[0.35em] text-[#666] uppercase block mb-2">Email</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && login()}
                autoComplete="email"
                className={inputCls}
              />
            </div>
            <div className="mb-6">
              <label className="text-[10px] tracking-[0.35em] text-[#666] uppercase block mb-2">Password</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && login()}
                autoComplete="current-password"
                className={inputCls}
              />
            </div>
            {loginError && <p className="text-red-400 text-xs mb-4">{loginError}</p>}
            <button
              onClick={login}
              disabled={loginLoading}
              className="w-full bg-[#c4a97d] text-[#0c0b09] text-[11px] tracking-[0.4em] uppercase py-3 font-medium hover:bg-[#d4b98d] transition-colors disabled:opacity-50"
            >
              {loginLoading ? "Signing in…" : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Confirm Modal ─────────────────────────────────────────────────────────
  const ConfirmModal = confirmDialog ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="bg-[#161616] border border-[#2a2a2a] rounded-sm p-8 max-w-sm w-full">
        <p className="text-white text-sm font-light mb-8 leading-relaxed">{confirmDialog.message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setConfirmDialog(null)}
            className="text-[10px] tracking-[0.35em] text-[#555] uppercase px-5 py-2 border border-[#2a2a2a] hover:border-[#444] hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => { confirmDialog.onConfirm(); setConfirmDialog(null); }}
            className="text-[10px] tracking-[0.35em] uppercase px-5 py-2 bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  ) : null;

  // ── Product Form (Add / Edit) ──────────────────────────────────────────────
  if (view === "form") {
    return (
      <>
        {ConfirmModal}
      <div className="min-h-screen bg-[#0f0f0f] text-white">
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-[#2a2a2a] bg-[#0f0f0f] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setView("dashboard")} className="text-[#666] hover:text-white text-sm transition-colors">
              ← Back
            </button>
            <h1 className="text-[11px] tracking-[0.4em] uppercase text-[#666]">
              {editProduct ? `Editing · ${editProduct.name}` : "Add New Product"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {saveError && <p className="text-red-400 text-xs">{saveError}</p>}
            <button
              onClick={saveProduct}
              disabled={saving}
              className="bg-[#c4a97d] text-[#0c0b09] text-[10px] tracking-[0.4em] uppercase px-6 py-2 font-medium hover:bg-[#d4b98d] transition-colors disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save Product"}
            </button>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-10 space-y-10">

          {/* Basic Info */}
          <section>
            <h2 className="text-[10px] tracking-[0.5em] text-[#c4a97d] uppercase mb-6">Basic Info</h2>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Product ID (slug, no spaces)" required>
                <input
                  value={form.id}
                  onChange={(e) => setForm({ ...form, id: e.target.value.toLowerCase().replace(/[\s/]+/g, "-") })}
                  disabled={!!editProduct}
                  placeholder="e.g. khamrah-oud"
                  className={inputCls + (editProduct ? " opacity-40 cursor-not-allowed" : "")}
                />
              </Field>
              <Field label="Product Name" required>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Khamrah" className={inputCls} />
              </Field>
              <Field label="Brand / House" required>
                <input value={form.house} onChange={(e) => setForm({ ...form, house: e.target.value })} placeholder="e.g. Lattafa" className={inputCls} />
              </Field>
              <Field label="Line">
                <select value={form.line} onChange={(e) => setForm({ ...form, line: e.target.value as FormData["line"] })} className={selectCls}>
                  <option>Arabian</option>
                  <option>Designer</option>
                  <option>Niche</option>
                </select>
              </Field>
              <Field label="Gender">
                <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value as FormData["gender"] })} className={selectCls}>
                  <option>Him</option>
                  <option>Her</option>
                  <option>Unisex</option>
                </select>
              </Field>
              <div className="flex flex-col gap-4 pt-6">
                <Toggle label="Best Seller" value={form.bestSeller} onChange={(v) => setForm({ ...form, bestSeller: v })} />
                <Toggle label="In Stock" value={form.inStock} onChange={(v) => setForm({ ...form, inStock: v })} />
                <Toggle label="Hot Deal" value={form.discount > 0} onChange={(v) => setForm({ ...form, discount: v ? 10 : 0 })} />
              </div>
            </div>
            {form.discount > 0 && (
              <div className="mt-4">
                <Field label="Discount Percentage (%)">
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={form.discount || ""}
                    onChange={(e) => setForm({ ...form, discount: Math.min(99, Math.max(0, +e.target.value)) })}
                    placeholder="e.g. 15"
                    className={inputCls + " w-32"}
                  />
                </Field>
              </div>
            )}
          </section>

          {/* Image */}
          <section>
            <h2 className="text-[10px] tracking-[0.5em] text-[#c4a97d] uppercase mb-6">Product Image</h2>
            <div className="flex gap-6 items-start">
              {(imagePreview || form.imageUrl) && (
                <div className="shrink-0 flex flex-col items-center gap-2">
                  <div className="w-24 h-32 relative bg-[#1a1a1a] rounded-sm overflow-hidden border border-[#2a2a2a]">
                    <Image src={imagePreview || form.imageUrl} alt="" fill className="object-cover" unoptimized />
                  </div>
                  <button
                    type="button"
                    onClick={() => askConfirm("Remove this image?", () => {
                      setImageFile(null);
                      setImagePreview("");
                      setForm((f) => ({ ...f, imageUrl: "" }));
                    })}
                    className="text-[9px] tracking-[0.3em] text-red-400/60 uppercase hover:text-red-400 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              )}
              <div className="flex-1 space-y-3">
                <label className="block w-full border-2 border-dashed border-[#2a2a2a] hover:border-[#c4a97d] transition-colors rounded-sm p-6 text-center cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (!f) return;
                      setImageFile(f);
                      setImagePreview(URL.createObjectURL(f));
                    }}
                  />
                  <p className="text-[10px] tracking-[0.3em] text-[#888] uppercase">Click to upload image</p>
                  <p className="text-[9px] text-[#444] mt-1">PNG, JPG – will be saved to Supabase Storage</p>
                </label>
                <p className="text-[9px] text-[#555]">Or paste an existing URL:</p>
                <input
                  value={form.imageUrl}
                  onChange={(e) => { setForm({ ...form, imageUrl: e.target.value }); setImagePreview(e.target.value); }}
                  placeholder="https://..."
                  className={inputCls}
                />
              </div>
            </div>
          </section>

          {/* Description */}
          <section>
            <h2 className="text-[10px] tracking-[0.5em] text-[#c4a97d] uppercase mb-6">Description & Inspiration</h2>
            <div className="space-y-4">
              <Field label="Description">
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={4}
                  placeholder="Describe the fragrance…"
                  className={inputCls + " resize-none"}
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Inspired By (Fragrance Name)">
                  <input value={form.inspiredByName} onChange={(e) => setForm({ ...form, inspiredByName: e.target.value })} placeholder="e.g. Aventus" className={inputCls} />
                </Field>
                <Field label="Inspired By (Brand)">
                  <input value={form.inspiredByHouse} onChange={(e) => setForm({ ...form, inspiredByHouse: e.target.value })} placeholder="e.g. Creed" className={inputCls} />
                </Field>
              </div>
            </div>
          </section>

          {/* Fragrance Details */}
          <section>
            <h2 className="text-[10px] tracking-[0.5em] text-[#c4a97d] uppercase mb-6">Fragrance Details</h2>
            <div className="space-y-4">
              <Field label="Fragrance Notes (comma-separated)">
                <input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Amber, Vanilla, Musk, Oud" className={inputCls} />
              </Field>
              <Field label="Occasions (comma-separated)">
                <input value={form.occasions} onChange={(e) => setForm({ ...form, occasions: e.target.value })} placeholder="Evening, Night, Formal, Date" className={inputCls} />
              </Field>
              <Field label="Seasons (comma-separated)">
                <input value={form.seasons} onChange={(e) => setForm({ ...form, seasons: e.target.value })} placeholder="Fall, Winter, Spring, Summer" className={inputCls} />
              </Field>
            </div>
          </section>

          {/* Sizes & Prices */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[10px] tracking-[0.5em] text-[#c4a97d] uppercase">Sizes & Prices (BDT)</h2>
              <button
                onClick={() => setForm({ ...form, sizes: [...form.sizes, { ml: 0, price: 0 }] })}
                className="text-[10px] tracking-[0.35em] text-[#c4a97d] uppercase hover:text-white transition-colors border border-[#c4a97d]/30 hover:border-[#c4a97d] px-3 py-1"
              >
                + Add Size
              </button>
            </div>
            <div className="space-y-3">
              {form.sizes.map((s, i) => (
                <div key={i} className="flex gap-3 items-end">
                  <Field label="ml">
                    <input
                      type="number"
                      value={s.ml || ""}
                      onChange={(e) => {
                        const sizes = [...form.sizes];
                        sizes[i] = { ...sizes[i], ml: +e.target.value };
                        setForm({ ...form, sizes });
                      }}
                      placeholder="5"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Price (৳)">
                    <input
                      type="number"
                      value={s.price || ""}
                      onChange={(e) => {
                        const sizes = [...form.sizes];
                        sizes[i] = { ...sizes[i], price: +e.target.value };
                        setForm({ ...form, sizes });
                      }}
                      placeholder="350"
                      className={inputCls}
                    />
                  </Field>
                  {form.sizes.length > 1 && (
                    <button
                      onClick={() => setForm({ ...form, sizes: form.sizes.filter((_, j) => j !== i) })}
                      className="text-[#555] hover:text-red-400 transition-colors pb-2.5 text-xl leading-none"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Bottom save */}
          <div className="flex items-center gap-4 pb-10">
            {saveError && <p className="text-red-400 text-xs">{saveError}</p>}
            <button
              onClick={saveProduct}
              disabled={saving}
              className="bg-[#c4a97d] text-[#0c0b09] text-[11px] tracking-[0.4em] uppercase px-8 py-3 font-medium hover:bg-[#d4b98d] transition-colors disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save Product"}
            </button>
            <button onClick={() => setView("dashboard")} className="text-[10px] tracking-[0.35em] text-[#555] uppercase hover:text-white transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>
      </>
    );
  }

  // ── Reviews List ───────────────────────────────────────────────────────────
  if (view === "reviews") {
    const platformIcon: Record<string, string> = {
      Instagram: "📸", TikTok: "🎵", WhatsApp: "💬", Facebook: "📘", Twitter: "🐦", Google: "⭐", Other: "💬",
    };
    return (
      <>
        {ConfirmModal}
        <div className="min-h-screen bg-[#0f0f0f] text-white">
          <div className="sticky top-0 z-10 border-b border-[#2a2a2a] bg-[#0f0f0f] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setView("dashboard")} className="text-[#666] hover:text-white text-sm transition-colors">← Back</button>
              <h1 className="text-[11px] tracking-[0.4em] uppercase text-[#666]">Customer Reviews</h1>
            </div>
            <button
              onClick={() => { setEditReview(null); setReviewForm(emptyReviewForm); setReviewError(""); setReviewScreenshotFile(null); setReviewScreenshotPreview(""); setView("review-form"); }}
              className="bg-[#c4a97d] text-[#0c0b09] text-[10px] tracking-[0.4em] uppercase px-5 py-2 font-medium hover:bg-[#d4b98d] transition-colors"
            >
              + Add Review
            </button>
          </div>
          <div className="px-6 py-8 max-w-4xl mx-auto">
            {reviews.length === 0 ? (
              <p className="text-center text-[#333] text-xs py-16">No reviews yet. Add your first one.</p>
            ) : (
              <div className="space-y-4">
                {reviews.map((r) => (
                  <div key={r.id} className={`bg-[#161616] border rounded-sm p-5 flex gap-5 items-start ${r.featured ? "border-[#c4a97d]/30" : "border-[#2a2a2a]"}`}>
                    <div className="shrink-0 w-12 h-12 rounded-full bg-[#2a2a2a] overflow-hidden flex items-center justify-center text-lg">
                      <span>{r.reviewer_name[0]?.toUpperCase()}</span>
                    </div>
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-white text-sm font-medium">{r.reviewer_name}</span>
                        <span className="text-[10px] text-[#555]">{platformIcon[r.platform] ?? "💬"} {r.platform}</span>
                        <span className="text-[#c4a97d] text-xs">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                        {r.featured && <span className="text-[8px] tracking-[0.3em] uppercase bg-[#c4a97d20] text-[#c4a97d] px-2 py-[2px]">Featured</span>}
                      </div>
                      <p className="text-[#888] text-sm leading-relaxed line-clamp-3">"{r.content}"</p>
                    </div>
                    {/* Actions */}
                    <div className="shrink-0 flex flex-col gap-2 items-end">
                      <button
                        onClick={() => toggleFeatured(r)}
                        className={`text-[9px] tracking-[0.3em] uppercase transition-colors ${r.featured ? "text-[#c4a97d]" : "text-[#444] hover:text-[#c4a97d]"}`}
                      >
                        {r.featured ? "Unfeature" : "Feature"}
                      </button>
                      <button
                        onClick={() => { setEditReview(r); setReviewForm({ reviewer_name: r.reviewer_name, platform: r.platform, content: r.content, rating: r.rating, screenshot_url: r.screenshot_url ?? "", featured: r.featured }); setReviewError(""); setReviewScreenshotFile(null); setReviewScreenshotPreview(r.screenshot_url ?? ""); setView("review-form"); }}
                        className="text-[9px] tracking-[0.3em] uppercase text-[#666] hover:text-[#c4a97d] transition-colors"
                      >
                        Edit
                      </button>
                      <button onClick={() => deleteReview(r.id)} className="text-[9px] tracking-[0.3em] uppercase text-[#444] hover:text-red-400 transition-colors">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  // ── Review Form ─────────────────────────────────────────────────────────────
  if (view === "review-form") {
    return (
      <>
        {ConfirmModal}
        <div className="min-h-screen bg-[#0f0f0f] text-white">
          <div className="sticky top-0 z-10 border-b border-[#2a2a2a] bg-[#0f0f0f] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setView("reviews")} className="text-[#666] hover:text-white text-sm transition-colors">← Back</button>
              <h1 className="text-[11px] tracking-[0.4em] uppercase text-[#666]">{editReview ? "Edit Review" : "Add Review"}</h1>
            </div>
            <div className="flex items-center gap-4">
              {reviewError && <p className="text-red-400 text-xs">{reviewError}</p>}
              <button onClick={saveReview} disabled={reviewSaving} className="bg-[#c4a97d] text-[#0c0b09] text-[10px] tracking-[0.4em] uppercase px-6 py-2 font-medium hover:bg-[#d4b98d] transition-colors disabled:opacity-50">
                {reviewSaving ? "Saving…" : "Save Review"}
              </button>
            </div>
          </div>
          <div className="max-w-2xl mx-auto px-6 py-10 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Customer Name" required>
                <input value={reviewForm.reviewer_name} onChange={(e) => setReviewForm({ ...reviewForm, reviewer_name: e.target.value })} placeholder="e.g. Aisha Rahman" className={inputCls} />
              </Field>
              <Field label="Platform">
                <select value={reviewForm.platform} onChange={(e) => setReviewForm({ ...reviewForm, platform: e.target.value })} className={selectCls}>
                  {["Instagram", "TikTok", "WhatsApp", "Facebook", "Twitter", "Google", "Other"].map((p) => <option key={p}>{p}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Rating">
              <div className="flex gap-2 mt-1">
                {[1,2,3,4,5].map((star) => (
                  <button key={star} type="button" onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                    className={`text-2xl transition-colors ${star <= reviewForm.rating ? "text-[#c4a97d]" : "text-[#333]"}`}>★</button>
                ))}
              </div>
            </Field>
            <Field label="Review Text" required>
              <textarea value={reviewForm.content} onChange={(e) => setReviewForm({ ...reviewForm, content: e.target.value })} rows={5} placeholder="What did the customer say?" className={inputCls + " resize-none"} />
            </Field>

            {/* Screenshot upload */}
            <section>
              <h2 className="text-[10px] tracking-[0.5em] text-[#c4a97d] uppercase mb-2">Social Media Screenshot <span className="text-[#c4a97d]">★ Priority</span></h2>
              <p className="text-[9px] text-[#555] mb-4">Upload a screenshot of the Instagram/Facebook/WhatsApp review. This will be shown prominently in the reviews gallery.</p>
              <div className="flex gap-6 items-start">
                {(reviewScreenshotPreview || reviewForm.screenshot_url) && (
                  <div className="shrink-0 flex flex-col items-center gap-2">
                    <div className="w-32 h-48 rounded-sm overflow-hidden bg-[#1a1a1a] border border-[#2a2a2a]">
                      <img src={reviewScreenshotPreview || reviewForm.screenshot_url} alt="" className="w-full h-full object-cover" />
                    </div>
                    <button type="button" onClick={() => { setReviewScreenshotFile(null); setReviewScreenshotPreview(""); setReviewForm((f) => ({ ...f, screenshot_url: "" })); }}
                      className="text-[9px] tracking-[0.3em] text-red-400/60 uppercase hover:text-red-400 transition-colors">
                      Remove
                    </button>
                  </div>
                )}
                <div className="flex-1 space-y-3">
                  <label className="block w-full border-2 border-dashed border-[#c4a97d]/30 hover:border-[#c4a97d] transition-colors rounded-sm p-5 text-center cursor-pointer">
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (!f) return;
                      setReviewScreenshotFile(f);
                      setReviewScreenshotPreview(URL.createObjectURL(f));
                    }} />
                    <p className="text-[10px] tracking-[0.3em] text-[#c4a97d] uppercase">Click to upload screenshot</p>
                    <p className="text-[9px] text-[#444] mt-1">Screenshot from Instagram, Facebook, WhatsApp, etc.</p>
                  </label>
                  <p className="text-[9px] text-[#555]">Or paste a URL:</p>
                  <input value={reviewForm.screenshot_url} onChange={(e) => { setReviewForm({ ...reviewForm, screenshot_url: e.target.value }); setReviewScreenshotPreview(e.target.value); }}
                    placeholder="https://..." className={inputCls} />
                </div>
              </div>
            </section>

            <Toggle label="Show on website (Featured)" value={reviewForm.featured} onChange={(v) => setReviewForm({ ...reviewForm, featured: v })} />
            <div className="flex items-center gap-4 pt-4">
              {reviewError && <p className="text-red-400 text-xs">{reviewError}</p>}
              <button onClick={saveReview} disabled={reviewSaving} className="bg-[#c4a97d] text-[#0c0b09] text-[11px] tracking-[0.4em] uppercase px-8 py-3 font-medium hover:bg-[#d4b98d] transition-colors disabled:opacity-50">
                {reviewSaving ? "Saving…" : "Save Review"}
              </button>
              <button onClick={() => setView("reviews")} className="text-[10px] tracking-[0.35em] text-[#555] uppercase hover:text-white transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── Orders View ────────────────────────────────────────────────────────────
  if (view === "orders") {
    const statusColors: Record<string, string> = {
      pending:    "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
      confirmed:  "bg-blue-500/15 text-blue-400 border-blue-500/30",
      shipped:    "bg-purple-500/15 text-purple-400 border-purple-500/30",
      delivered:  "bg-green-500/15 text-green-400 border-green-500/30",
      cancelled:  "bg-red-500/15 text-red-400 border-red-500/30",
    };
    const STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

    return (
      <>
        {ConfirmModal}
        <div className="min-h-screen bg-[#0f0f0f] text-white">
          {/* Header */}
          <div className="sticky top-0 z-10 border-b border-[#2a2a2a] bg-[#0f0f0f] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setView("dashboard")} className="text-[#666] hover:text-white text-sm transition-colors">← Back</button>
              <h1 className="text-[11px] tracking-[0.4em] uppercase text-[#666]">Orders</h1>
            </div>
            <button
              onClick={loadOrders}
              className="text-[10px] tracking-[0.35em] text-[#555] uppercase hover:text-white transition-colors"
            >
              Refresh
            </button>
          </div>

          {!ordersLoaded ? (
            <div className="flex items-center justify-center py-32">
              <div className="w-6 h-6 border-2 border-[#c4a97d] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 gap-3">
              <p className="text-[#444] text-sm">No orders yet.</p>
            </div>
          ) : (
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-4">
              {orders.map((o) => {
                const date = new Date(o.created_at).toLocaleDateString("en-GB", {
                  day: "2-digit", month: "short", year: "numeric",
                });
                const time = new Date(o.created_at).toLocaleTimeString("en-GB", {
                  hour: "2-digit", minute: "2-digit",
                });
                return (
                  <div key={o.id} className="bg-[#161616] border border-[#222] rounded-sm">
                    {/* Order header row */}
                    <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-[#1e1e1e]">
                      <div className="flex items-center gap-4 flex-wrap">
                        <span className="font-mono text-[11px] text-[#c4a97d] tracking-widest">{o.order_id}</span>
                        <span className="text-[10px] text-[#555]">{date} · {time}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-[9px] tracking-[0.25em] uppercase border px-2.5 py-1 rounded-sm ${statusColors[o.status] ?? "bg-[#2a2a2a] text-[#888] border-[#333]"}`}>
                          {o.status}
                        </span>
                        <select
                          value={o.status}
                          onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                          className="bg-[#1a1a1a] border border-[#2a2a2a] text-[#888] text-[10px] px-2 py-1 rounded-sm focus:outline-none focus:border-[#c4a97d] cursor-pointer"
                        >
                          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[#1e1e1e]">
                      {/* Customer */}
                      <div className="px-5 py-4 space-y-1">
                        <p className="text-[9px] tracking-[0.4em] text-[#555] uppercase mb-2">Customer</p>
                        <p className="text-sm text-white">{o.customer_name}</p>
                        <p className="text-[11px] text-[#888]">{o.phone}</p>
                        <p className="text-[11px] text-[#666] leading-relaxed">{o.address}{o.apartment ? `, ${o.apartment}` : ""}, {o.city}</p>
                        <p className="text-[10px] text-[#555] pt-1">
                          <span className="capitalize">{o.payment_method}</span>
                          {" · "}
                          <span>{o.shipping_method}</span>
                        </p>
                      </div>

                      {/* Items */}
                      <div className="px-5 py-4">
                        <p className="text-[9px] tracking-[0.4em] text-[#555] uppercase mb-3">Items</p>
                        <div className="space-y-2">
                          {(Array.isArray(o.items) ? o.items : JSON.parse(o.items as unknown as string) as OrderItem[]).map((item, i) => (
                            <div key={i} className="flex justify-between items-start gap-2">
                              <div>
                                <p className="text-[11px] text-[#e8e0d4] leading-tight">{item.name}</p>
                                <p className="text-[9px] text-[#555]">{item.house} · {item.ml}ml × {item.qty}</p>
                              </div>
                              <p className="text-[11px] text-[#888] shrink-0">৳{item.price * item.qty}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Totals */}
                      <div className="px-5 py-4">
                        <p className="text-[9px] tracking-[0.4em] text-[#555] uppercase mb-3">Summary</p>
                        <div className="space-y-1.5 text-[10px]">
                          <div className="flex justify-between text-[#666]">
                            <span>Subtotal</span><span>৳{o.subtotal}</span>
                          </div>
                          <div className="flex justify-between text-[#666]">
                            <span>Shipping</span><span>৳{o.shipping_cost}</span>
                          </div>
                          {o.discount > 0 && (
                            <div className="flex justify-between text-[#c4a97d]">
                              <span>Discount</span><span>−৳{o.discount}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-white text-xs font-medium pt-2 border-t border-[#2a2a2a] mt-2">
                            <span>Total</span><span>৳{o.total}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </>
    );
  }

  // ── Dashboard ──────────────────────────────────────────────────────────────
  const outOfStock = products.filter((p) => !p.in_stock).length;
  const hotDeals = products.filter((p) => (p.discount ?? 0) > 0).length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;

  return (
    <>
      {ConfirmModal}
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Header */}
      <div className="border-b border-[#2a2a2a] px-6 py-4 flex items-center justify-between">
        <h1
          className="text-base tracking-[0.3em] uppercase font-light"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Space Perfumes <span className="text-[#c4a97d] font-semibold">· Admin</span>
        </h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => { loadOrders(); setView("orders"); }}
            className="relative text-[10px] tracking-[0.35em] text-[#e8e0d4] uppercase border border-[#e8e0d4]/20 px-4 py-2 hover:border-[#e8e0d4]/60 transition-colors"
          >
            Orders
            {orders.filter((o) => o.status === "pending").length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[8px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {orders.filter((o) => o.status === "pending").length}
              </span>
            )}
          </button>
          <button
            onClick={() => { loadReviews(); setView("reviews"); }}
            className="text-[10px] tracking-[0.35em] text-[#c4a97d] uppercase border border-[#c4a97d]/30 px-4 py-2 hover:border-[#c4a97d] transition-colors"
          >
            Reviews ({reviews.length})
          </button>
          <button onClick={logout} className="text-[10px] tracking-[0.35em] text-[#555] uppercase hover:text-white transition-colors">
            Logout
          </button>
        </div>
      </div>

      {/* Stats + Add button */}
      <div className="px-4 sm:px-6 py-5 border-b border-[#1a1a1a] flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-6 sm:gap-10">
          <Stat label="Total Products" value={products.length} />
          <Stat label="In Stock" value={products.length - outOfStock} />
          <Stat label="Out of Stock" value={outOfStock} accent={outOfStock > 0} />
          <Stat label="Hot Deals" value={hotDeals} />
          <Stat label="Pending Orders" value={pendingOrders} accent={pendingOrders > 0} />
        </div>
        <button
          onClick={openAdd}
          className="shrink-0 bg-[#c4a97d] text-[#0c0b09] text-[10px] tracking-[0.4em] uppercase px-5 py-2.5 font-medium hover:bg-[#d4b98d] transition-colors"
        >
          + Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="px-4 sm:px-6 py-4 border-b border-[#1a1a1a]">
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or brand…"
            className="bg-[#161616] border border-[#2a2a2a] text-sm text-white px-4 py-2 rounded-sm focus:outline-none focus:border-[#c4a97d] transition-colors placeholder:text-[#444] w-full sm:w-64 shrink-0"
          />
          <div className="flex flex-wrap gap-2">
            {["All", "Arabian", "Designer", "Niche"].map((l) => (
              <button
                key={l}
                onClick={() => setLineFilter(l)}
                className={`text-[10px] tracking-[0.3em] uppercase px-4 py-2 border transition-colors ${
                  lineFilter === l
                    ? "border-[#c4a97d] text-[#c4a97d]"
                    : "border-[#2a2a2a] text-[#555] hover:border-[#444] hover:text-[#888]"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-[#444] sm:ml-auto">{filtered.length} products</span>
        </div>
      </div>

      {/* Mobile cards (< md) */}
      <div className="md:hidden px-4 pb-16 space-y-3 pt-4">
        {filtered.map((p) => (
          <div key={p.id} className="bg-[#161616] border border-[#222] rounded-sm p-4">
            <div className="flex gap-4">
              {/* Thumb */}
              <div className="w-14 h-20 bg-[#1a1a1a] rounded-sm overflow-hidden relative shrink-0">
                {p.image_url ? (
                  <Image src={p.image_url} alt="" fill className="object-cover" unoptimized />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#333] text-[10px]">—</div>
                )}
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium leading-tight truncate">{p.name}</p>
                <p className="text-[#555] text-[11px] mt-0.5">{p.house}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className={`text-[9px] tracking-[0.2em] uppercase px-2 py-[2px] rounded-sm ${
                    p.line === "Arabian"  ? "bg-[#d4a85320] text-[#d4a853]" :
                    p.line === "Designer" ? "bg-[#8aadcf20] text-[#8aadcf]" :
                                            "bg-[#b89fd420] text-[#b89fd4]"
                  }`}>{p.line}</span>
                  <span className="text-[9px] tracking-[0.2em] uppercase text-[#555] border border-[#2a2a2a] px-2 py-[2px] rounded-sm">{p.gender}</span>
                </div>
                <p className="text-[10px] text-[#444] mt-1">{(p.sizes ?? []).map((s) => `${s.ml}ml`).join(" · ")}</p>
                {(p.discount ?? 0) > 0 && (
                  <span className="inline-block mt-1 text-[9px] tracking-[0.2em] uppercase bg-[#c4a97d20] text-[#c4a97d] px-2 py-[2px] rounded-sm">−{p.discount}% Deal</span>
                )}
              </div>
            </div>
            {/* Footer row */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#222]">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleStock(p)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${p.in_stock ? "bg-[#c4a97d]" : "bg-[#2a2a2a]"}`}
                >
                  <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${p.in_stock ? "translate-x-6" : "translate-x-1"}`} />
                </button>
                <span className="text-[10px] text-[#555]">{p.in_stock ? "In Stock" : "Out of Stock"}</span>
              </div>
              <div className="flex gap-5">
                <button onClick={() => openEdit(p)} className="text-[11px] tracking-[0.3em] text-[#c4a97d] uppercase">Edit</button>
                <button onClick={() => deleteProduct(p.id, p.name)} className="text-[11px] tracking-[0.3em] text-[#444] uppercase hover:text-red-400 transition-colors">Delete</button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-[#333] text-xs py-16">No products found.</p>
        )}
      </div>

      {/* Desktop table (≥ md) */}
      <div className="hidden md:block px-6 pb-16 overflow-x-auto">
        <table className="w-full text-sm border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-[#1e1e1e]">
              <th className="text-left py-3 pr-4 text-[9px] tracking-[0.4em] text-[#444] uppercase font-normal w-14">Img</th>
              <th className="text-left py-3 pr-4 text-[9px] tracking-[0.4em] text-[#444] uppercase font-normal">Product</th>
              <th className="text-left py-3 pr-4 text-[9px] tracking-[0.4em] text-[#444] uppercase font-normal">Line</th>
              <th className="text-left py-3 pr-4 text-[9px] tracking-[0.4em] text-[#444] uppercase font-normal">Gender</th>
              <th className="text-left py-3 pr-4 text-[9px] tracking-[0.4em] text-[#444] uppercase font-normal">Sizes</th>
              <th className="text-left py-3 pr-4 text-[9px] tracking-[0.4em] text-[#444] uppercase font-normal">Stock</th>
              <th className="text-left py-3 text-[9px] tracking-[0.4em] text-[#444] uppercase font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-[#161616] hover:bg-[#131313] transition-colors">
                <td className="py-3 pr-4">
                  <div className="w-10 h-14 bg-[#1a1a1a] rounded-sm overflow-hidden relative">
                    {p.image_url ? (
                      <Image src={p.image_url} alt="" fill className="object-cover" unoptimized />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#333] text-[10px]">—</div>
                    )}
                  </div>
                </td>
                <td className="py-3 pr-4">
                  <p className="text-white text-xs font-medium">{p.name}</p>
                  <p className="text-[#555] text-[10px] mt-[2px]">{p.house}</p>
                </td>
                <td className="py-3 pr-4">
                  <span className={`text-[9px] tracking-[0.25em] uppercase px-2 py-[3px] rounded-sm ${
                    p.line === "Arabian"  ? "bg-[#d4a85318] text-[#d4a853]" :
                    p.line === "Designer" ? "bg-[#8aadcf18] text-[#8aadcf]" :
                                            "bg-[#b89fd418] text-[#b89fd4]"
                  }`}>{p.line}</span>
                </td>
                <td className="py-3 pr-4">
                  <span className="text-[10px] text-[#555]">{p.gender}</span>
                </td>
                <td className="py-3 pr-4">
                  <span className="text-[10px] text-[#555]">
                    {(p.sizes ?? []).map((s) => `${s.ml}ml`).join(", ")}
                  </span>
                  {(p.discount ?? 0) > 0 && (
                    <p className="text-[9px] tracking-[0.2em] text-[#c4a97d] mt-1">−{p.discount}% Deal</p>
                  )}
                </td>
                <td className="py-3 pr-4">
                  <button
                    onClick={() => toggleStock(p)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${p.in_stock ? "bg-[#c4a97d]" : "bg-[#2a2a2a]"}`}
                    title={p.in_stock ? "Mark as out of stock" : "Mark as in stock"}
                  >
                    <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${p.in_stock ? "translate-x-6" : "translate-x-1"}`} />
                  </button>
                  <p className="text-[9px] mt-1 text-[#444]">{p.in_stock ? "In Stock" : "Out of Stock"}</p>
                </td>
                <td className="py-3">
                  <div className="flex gap-4">
                    <button onClick={() => openEdit(p)} className="text-[10px] tracking-[0.3em] text-[#666] uppercase hover:text-[#c4a97d] transition-colors">Edit</button>
                    <button onClick={() => deleteProduct(p.id, p.name)} className="text-[10px] tracking-[0.3em] text-[#444] uppercase hover:text-red-400 transition-colors">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-center text-[#333] text-xs py-16">No products found.</p>
        )}
      </div>
    </div>
    </>
  );
}
