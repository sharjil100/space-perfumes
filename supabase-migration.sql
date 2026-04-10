-- ============================================================
-- Space Perfumes – Supabase Products Table Migration
-- Run this in the Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Create Table
CREATE TABLE IF NOT EXISTS products (
  id           TEXT PRIMARY KEY,
  name         TEXT NOT NULL,
  house        TEXT NOT NULL,
  line         TEXT NOT NULL CHECK (line IN ('Arabian', 'Designer', 'Niche')),
  gender       TEXT NOT NULL CHECK (gender IN ('Him', 'Her', 'Unisex')),
  notes        TEXT[]   NOT NULL DEFAULT '{}',
  occasions    TEXT[]   NOT NULL DEFAULT '{}',
  seasons      TEXT[]   NOT NULL DEFAULT '{}',
  best_seller  BOOLEAN  NOT NULL DEFAULT false,
  sizes        JSONB    NOT NULL DEFAULT '[]',
  inspired_by  JSONB,
  description  TEXT,
  image_url    TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Enable Row Level Security (read-only for anonymous users)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read" ON products FOR SELECT USING (true);

-- 3. Seed – all 30 products
-- ── ARABIAN LINE ──────────────────────────────────────────────

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes, inspired_by, description) VALUES
('khamrah', 'Khamrah', 'Lattafa', 'Arabian', 'Unisex',
  ARRAY['Amber','Vanilla','Myrrh','Cinnamon','Tonka Bean','Praline'],
  ARRAY['Night','Date'], ARRAY['Fall','Winter'], true,
  '[{"ml":5,"price":315},{"ml":9,"price":511},{"ml":15,"price":768}]',
  '{"name":"Love, Don''t Be Shy","house":"Kilian"}',
  'A rich, candy-like oriental that opens with sweet amber and praline before settling into a warm vanillic embrace. Widely regarded as a near-identical dupe of Kilian''s Love, Don''t Be Shy at a fraction of the price.');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes, description) VALUES
('khamrah-qahwa', 'Khamrah Qahwa', 'Lattafa', 'Arabian', 'Unisex',
  ARRAY['Coffee','Cardamom','Vanilla','Cinnamon','Praline','Musk'],
  ARRAY['Night'], ARRAY['Fall','Winter'], true,
  '[{"ml":5,"price":339},{"ml":9,"price":549},{"ml":15,"price":828}]',
  'A coffee-forward oriental that blends rich Arabic qahwa with Khamrah''s signature sweetness. Intense, warming, and deeply Middle Eastern in character.');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes, inspired_by, description) VALUES
('angham', 'Angham', 'Lattafa', 'Arabian', 'Unisex',
  ARRAY['Rose','Saffron','Jasmine','Amber','Musk','Pink Pepper','Ylang Ylang'],
  ARRAY['Day','Evening','Signature'], ARRAY['Spring','Summer','Fall','Winter'], true,
  '[{"ml":5,"price":319},{"ml":9,"price":517},{"ml":15,"price":778}]',
  '{"name":"Portrait of a Lady","house":"Frédéric Malle"}',
  'A bold floral-oriental with saffron-laced rose at its heart. An accessible take on the iconic Portrait of a Lady DNA — dramatic, long-lasting, and universally flattering.');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes, inspired_by, description) VALUES
('supremacy-collectors', 'Supremacy Collectors Edition', 'Afnan', 'Arabian', 'Him',
  ARRAY['Oud','Rose','Amber','Cinnamon','Vanilla','Patchouli','Bergamot'],
  ARRAY['Evening','Formal','Signature'], ARRAY['Fall','Winter'], true,
  '[{"ml":5,"price":496},{"ml":9,"price":837},{"ml":15,"price":1273}]',
  '{"name":"Royal Oud","house":"Creed"}',
  'A regal oud-rose composition that channels the grandeur of Creed Royal Oud. Layers of smoky oud, Bulgarian rose, and warm amber make this a statement fragrance for formal occasions.');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes, inspired_by, description) VALUES
('hawas', 'Hawas', 'Rasasi', 'Arabian', 'Him',
  ARRAY['Aquatic','Bergamot','Ambergris','Cinnamon','Musk','Orange Blossom'],
  ARRAY['Day'], ARRAY['Spring','Summer'], true,
  '[{"ml":5,"price":340},{"ml":9,"price":560},{"ml":15,"price":837}]',
  '{"name":"Acqua di Gio Profumo","house":"Giorgio Armani"}',
  'A fresh aquatic powerhouse with a magnetic ambergris base. Widely considered the best dupe of Acqua di Gio Profumo — same DNA at a fraction of the cost, with arguably better longevity.');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes, inspired_by, description) VALUES
('hawas-fire', 'Hawas Fire', 'Rasasi', 'Arabian', 'Him',
  ARRAY['Ambergris','Aquatic','Clary Sage','Egyptian Jasmine'],
  ARRAY['Day','Evening','Signature'], ARRAY['Spring','Summer','Fall','Winter'], false,
  '[{"ml":5,"price":430},{"ml":9,"price":710},{"ml":15,"price":1072}]',
  '{"name":"Acqua di Gio Profondo","house":"Giorgio Armani"}',
  'The warmer, smokier sibling of Hawas. A deep aquatic with incense and jasmine accords — mirrors the DNA of Acqua di Gio Profondo with added Middle Eastern richness.');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes, inspired_by, description) VALUES
('9pm', '9PM', 'Afnan', 'Arabian', 'Him',
  ARRAY['Amber','Vanilla','Patchouli','Bergamot','Musk'],
  ARRAY['Evening','Night'], ARRAY['Fall','Winter'], false,
  '[{"ml":5,"price":361},{"ml":9,"price":594},{"ml":15,"price":897}]',
  '{"name":"Ultra Male","house":"Jean Paul Gaultier"}',
  'A seductive evening fragrance built around sweet amber and vanilla — a highly accessible alternative to JPG Ultra Male with remarkable longevity and projection.');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes, inspired_by, description) VALUES
('9pm-elixir', '9PM Elixir', 'Afnan', 'Arabian', 'Him',
  ARRAY['Amber','Sandalwood','Tonka Bean','Bergamot','Musk'],
  ARRAY['Evening','Formal'], ARRAY['Fall','Winter'], false,
  '[{"ml":5,"price":461},{"ml":9,"price":773},{"ml":15,"price":1174}]',
  '{"name":"Ultra Male Elixir","house":"Jean Paul Gaultier"}',
  'A darker, more intense interpretation of the 9PM lineage. The sandalwood and tonka bean base adds a sophisticated creaminess that echoes JPG Ultra Male Elixir.');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('ajayeb-dubai', 'Ajayeb Dubai', 'Lattafa', 'Arabian', 'Unisex',
  ARRAY['Musk','Vanilla','Amber','Woods','Bergamot'],
  ARRAY['Casual','Signature'], ARRAY['Spring','Fall'], false,
  '[{"ml":5,"price":354},{"ml":9,"price":581},{"ml":15,"price":877}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('adonis-oud', 'Adonis Oud', 'Rayhaan', 'Arabian', 'Him',
  ARRAY['Oud','Rose','Musk','Sandalwood','Amber'],
  ARRAY['Evening','Signature'], ARRAY['Fall','Winter'], false,
  '[{"ml":5,"price":319},{"ml":9,"price":517},{"ml":15,"price":778}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('ajayeb-dubai-portrait', 'Ajayeb Dubai Portrait', 'Lattafa', 'Arabian', 'Her',
  ARRAY['Floral','Amber','Musk','Vanilla','Bergamot'],
  ARRAY['Day','Signature'], ARRAY['Spring','Summer'], false,
  '[{"ml":5,"price":283},{"ml":9,"price":453},{"ml":15,"price":679}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('al-nashama-caprice', 'Al Nashama Caprice', 'Lattafa', 'Arabian', 'Her',
  ARRAY['Floral','Musk','Sandalwood','Bergamot','Rose'],
  ARRAY['Day','Evening'], ARRAY['Spring','Summer'], false,
  '[{"ml":5,"price":354},{"ml":9,"price":581},{"ml":15,"price":877}]');

-- ── DESIGNER LINE ────────────────────────────────────────────

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('sauvage-edp', 'Sauvage Eau de Parfum', 'Dior', 'Designer', 'Him',
  ARRAY['Ambroxan','Bergamot','Lavender','Nutmeg','Star Anise','Vanilla'],
  ARRAY['Day','Night'], ARRAY['Spring','Summer','Fall','Winter'], true,
  '[{"ml":3,"price":853},{"ml":5,"price":1384},{"ml":9,"price":2434},{"ml":15,"price":3748}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('bleu-de-chanel-edp', 'Bleu de Chanel EDP', 'Chanel', 'Designer', 'Him',
  ARRAY['Cedar','Jasmine','Sandalwood','Vetiver','Ginger','Patchouli'],
  ARRAY['Formal','Day','Evening','Signature'], ARRAY['Spring','Summer','Fall','Winter'], true,
  '[{"ml":3,"price":999},{"ml":5,"price":1632},{"ml":9,"price":2882}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('y-edp', 'Y Eau de Parfum', 'Yves Saint Laurent', 'Designer', 'Him',
  ARRAY['Apple','Bergamot','Amberwood','Sage','Vetiver','Tonka Bean'],
  ARRAY['Formal','Office','Romantic','Signature'], ARRAY['Spring','Summer','Fall'], true,
  '[{"ml":3,"price":542},{"ml":5,"price":865},{"ml":9,"price":1501},{"ml":15,"price":2303}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes, inspired_by, description) VALUES
('cdni-edp', 'Club de Nuit Intense Man EDP', 'Armaf', 'Designer', 'Him',
  ARRAY['Pineapple','Apple','Bergamot','Rose','Jasmine','Musk','Vanilla'],
  ARRAY['Casual','Evening','Night','Signature'], ARRAY['Spring','Summer','Fall'], true,
  '[{"ml":5,"price":425},{"ml":9,"price":700},{"ml":15,"price":1075}]',
  '{"name":"Aventus","house":"Creed"}',
  'The legendary Creed Aventus dupe that took the world by storm. Shares Aventus''s iconic pineapple-birch-smoke DNA at a deeply accessible price point. Consistently ranked among the best value fragrances available.');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('acqua-di-gio-parfum', 'Acqua Di Gio Parfum', 'Giorgio Armani', 'Designer', 'Him',
  ARRAY['Aquatic','Incense','Bergamot','Cypress','Mineral'],
  ARRAY['Casual','Day'], ARRAY['Spring','Summer'], false,
  '[{"ml":3,"price":632},{"ml":5,"price":1014},{"ml":9,"price":1770},{"ml":15,"price":2718}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('acqua-di-gio-profondo', 'Acqua Di Gio Profondo', 'Giorgio Armani', 'Designer', 'Him',
  ARRAY['Aquatic','Bergamot','Green Mandarin','Musk','Mineral'],
  ARRAY['Casual','Day'], ARRAY['Spring','Summer'], false,
  '[{"ml":3,"price":593},{"ml":5,"price":950},{"ml":9,"price":1655},{"ml":15,"price":2540}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('1-million-edp', '1 Million Parfum', 'Paco Rabanne', 'Designer', 'Him',
  ARRAY['Grapefruit','Cinnamon','Leather','Amber','Rose'],
  ARRAY['Evening','Night','Signature'], ARRAY['Fall','Winter'], false,
  '[{"ml":3,"price":470},{"ml":5,"price":745},{"ml":9,"price":1284},{"ml":15,"price":1966}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('eros-edp', 'Eros Eau de Parfum', 'Versace', 'Designer', 'Him',
  ARRAY['Mint','Vanilla','Tonka Bean','Apple','Amber'],
  ARRAY['Evening','Romantic'], ARRAY['Fall','Winter','Spring'], true,
  '[{"ml":3,"price":331},{"ml":5,"price":514},{"ml":9,"price":869},{"ml":15,"price":1323}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('212-vip-black', '212 VIP Black', 'Carolina Herrera', 'Designer', 'Him',
  ARRAY['Tonka Bean','Vanilla','Amber Accord','Musk'],
  ARRAY['Night','Date','Signature'], ARRAY['Fall','Winter'], false,
  '[{"ml":3,"price":385},{"ml":5,"price":603},{"ml":9,"price":1029},{"ml":15,"price":1570}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('alien-goddess', 'Alien Goddess', 'Mugler', 'Designer', 'Her',
  ARRAY['Jasmine','Vanilla','Sandalwood','Cashmeran'],
  ARRAY['Evening','Night'], ARRAY['Fall','Winter'], false,
  '[{"ml":3,"price":609},{"ml":5,"price":979},{"ml":9,"price":1706},{"ml":15,"price":2615}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('addict-edp', 'Addict Eau de Parfum', 'Dior', 'Designer', 'Her',
  ARRAY['Vanilla','Rose','Sandalwood','Benzyl Benzoate'],
  ARRAY['Evening','Signature'], ARRAY['Fall','Winter','Spring'], false,
  '[{"ml":3,"price":853},{"ml":5,"price":1384},{"ml":9,"price":2434}]');

-- ── NICHE LINE ───────────────────────────────────────────────

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('724-mfk', '724', 'Maison Francis Kurkdjian', 'Niche', 'Unisex',
  ARRAY['Green Tea','Cedar','White Musk','Amber'],
  ARRAY['Day','Signature'], ARRAY['Spring','Summer'], false,
  '[{"ml":3,"price":1404},{"ml":5,"price":2301},{"ml":9,"price":4087},{"ml":15,"price":6308}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('african-leather', 'African Leather', 'Memo Paris', 'Niche', 'Unisex',
  ARRAY['Leather','Rose','Sandalwood','Incense','Oud'],
  ARRAY['Evening','Formal','Signature'], ARRAY['Fall','Winter'], false,
  '[{"ml":3,"price":768},{"ml":5,"price":1242},{"ml":9,"price":2179},{"ml":15,"price":3352}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('a-la-nuit', 'A La Nuit', 'Serge Lutens', 'Niche', 'Her',
  ARRAY['Jasmine','Rose','Musk','White Floral'],
  ARRAY['Evening','Night'], ARRAY['Summer','Spring'], false,
  '[{"ml":3,"price":1173},{"ml":5,"price":1916},{"ml":9,"price":3393}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('acqua-viva', 'Acqua Viva', 'Profumum Roma', 'Niche', 'Unisex',
  ARRAY['Aquatic','Iris','Ambergris','Musk','Citrus'],
  ARRAY['Day'], ARRAY['Spring','Summer'], false,
  '[{"ml":3,"price":1024},{"ml":5,"price":1668},{"ml":9,"price":2946},{"ml":15,"price":4540}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('akaster', 'Akaster (Batch 2017)', 'Parfums de Marly', 'Niche', 'Him',
  ARRAY['Amber','Vanilla','Tonka Bean','Cinnamon','Elemi'],
  ARRAY['Evening','Formal'], ARRAY['Fall','Winter'], false,
  '[{"ml":3,"price":603},{"ml":5,"price":967},{"ml":9,"price":1685},{"ml":15,"price":2588}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('a-men', 'A*Men', 'Mugler', 'Niche', 'Him',
  ARRAY['Coffee','Caramel','Patchouli','Vanilla','Sandalwood'],
  ARRAY['Evening','Night'], ARRAY['Fall','Winter'], false,
  '[{"ml":3,"price":448},{"ml":5,"price":709},{"ml":9,"price":1200},{"ml":15,"price":1860}]');
