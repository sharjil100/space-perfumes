-- ============================================================
-- Space Perfumes – New Products (from stock list)
-- Run this in Supabase Dashboard → SQL Editor
-- Already in DB (skip): Acqua Di Gio Parfum, Acqua Di Gio Profondo,
--   Versace Eros EDP, Armaf Club De Nuit EDP, Afnan Supremacy
--   Collectors, Khamrah Qahwa, Rasasi Hawas Fire
-- ============================================================

-- ── DESIGNER LINE ────────────────────────────────────────────

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('bleu-de-chanel-parfum', 'Bleu de Chanel Parfum', 'Chanel', 'Designer', 'Him',
  ARRAY['Sandalwood','Cedar','Incense','Vetiver','Amber','Jasmine'],
  ARRAY['Day','Formal','Evening','Signature'], ARRAY['Spring','Summer','Fall','Winter'], true,
  '[{"ml":3,"price":1099},{"ml":5,"price":1799},{"ml":9,"price":3199}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('sauvage-edt', 'Sauvage Eau de Toilette', 'Dior', 'Designer', 'Him',
  ARRAY['Bergamot','Ambroxan','Pepper','Lavender','Geranium','Vetiver'],
  ARRAY['Day','Casual','Office'], ARRAY['Spring','Summer','Fall'], true,
  '[{"ml":3,"price":799},{"ml":5,"price":1299},{"ml":9,"price":2299},{"ml":15,"price":3499}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('dior-homme-intense', 'Dior Homme Intense', 'Dior', 'Designer', 'Him',
  ARRAY['Iris','Amber','Vetiver','Lavender','Pear','Leather'],
  ARRAY['Evening','Formal','Date'], ARRAY['Fall','Winter'], false,
  '[{"ml":3,"price":853},{"ml":5,"price":1384},{"ml":9,"price":2434},{"ml":15,"price":3748}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('jpg-ultra-male', 'Ultra Male', 'Jean Paul Gaultier', 'Designer', 'Him',
  ARRAY['Lavender','Vanilla','Amber','Tonka Bean','Bergamot','Fig'],
  ARRAY['Evening','Night','Date'], ARRAY['Fall','Winter'], true,
  '[{"ml":3,"price":450},{"ml":5,"price":720},{"ml":9,"price":1250},{"ml":15,"price":1920}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('jpg-le-male-le-parfum', 'Le Male Le Parfum', 'Jean Paul Gaultier', 'Designer', 'Him',
  ARRAY['Lavender','Vanilla','Tonka Bean','Benzyl Benzoate','Musk'],
  ARRAY['Evening','Date','Formal'], ARRAY['Fall','Winter'], false,
  '[{"ml":3,"price":512},{"ml":5,"price":820},{"ml":9,"price":1430},{"ml":15,"price":2200}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('gentleman-reserve-privee', 'Gentleman Reserve Privée', 'Givenchy', 'Designer', 'Him',
  ARRAY['Iris','Leather','Vetiver','Bergamot','Patchouli','Benzoin'],
  ARRAY['Formal','Evening','Signature'], ARRAY['Fall','Winter'], false,
  '[{"ml":3,"price":700},{"ml":5,"price":1130},{"ml":9,"price":1990},{"ml":15,"price":3060}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('dg-the-one-edp', 'The One EDP', 'Dolce & Gabbana', 'Designer', 'Him',
  ARRAY['Tobacco','Ginger','Amber','Cardamom','Sandalwood','Cedarwood'],
  ARRAY['Evening','Night','Formal'], ARRAY['Fall','Winter'], false,
  '[{"ml":3,"price":540},{"ml":5,"price":865},{"ml":9,"price":1500},{"ml":15,"price":2300}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('dg-light-blue-intense', 'Light Blue Eau Intense', 'Dolce & Gabbana', 'Designer', 'Him',
  ARRAY['Grapefruit','Bergamot','Juniper','Wood','Musk','Rosewood'],
  ARRAY['Casual','Day','Beach'], ARRAY['Spring','Summer'], false,
  '[{"ml":3,"price":420},{"ml":5,"price":670},{"ml":9,"price":1160},{"ml":15,"price":1780}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('swi-intensely', 'Stronger With You Intensely', 'Emporio Armani', 'Designer', 'Him',
  ARRAY['Tonka Bean','Vanilla','Chestnut','Sage','Amber','Musk'],
  ARRAY['Evening','Date','Night'], ARRAY['Fall','Winter'], false,
  '[{"ml":3,"price":480},{"ml":5,"price":765},{"ml":9,"price":1330},{"ml":15,"price":2040}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('swi-parfum', 'Stronger With You Parfum', 'Emporio Armani', 'Designer', 'Him',
  ARRAY['Tonka Bean','Leather','Cardamom','Amber','Vanilla','Musk'],
  ARRAY['Evening','Formal','Signature'], ARRAY['Fall','Winter'], false,
  '[{"ml":3,"price":530},{"ml":5,"price":845},{"ml":9,"price":1470},{"ml":15,"price":2260}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('bad-boy-elixir', 'Bad Boy Elixir', 'Carolina Herrera', 'Designer', 'Him',
  ARRAY['Cocoa','Praline','Patchouli','Amberwood','Vanilla','Black Coffee'],
  ARRAY['Evening','Night','Date'], ARRAY['Fall','Winter'], false,
  '[{"ml":3,"price":560},{"ml":5,"price":895},{"ml":9,"price":1560},{"ml":15,"price":2395}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('bentley-intense', 'Bentley For Men Intense', 'Bentley', 'Designer', 'Him',
  ARRAY['Vetiver','Leather','Cedar','Sandalwood','Amber','Patchouli'],
  ARRAY['Evening','Formal','Signature'], ARRAY['Fall','Winter'], false,
  '[{"ml":5,"price":400},{"ml":9,"price":650},{"ml":15,"price":990}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('azzaro-most-wanted-parfum', 'Most Wanted Parfum', 'Azzaro', 'Designer', 'Him',
  ARRAY['Black Pepper','Cardamom','Tonka Bean','Whisky','Sandalwood','Amber'],
  ARRAY['Evening','Night','Date'], ARRAY['Fall','Winter'], false,
  '[{"ml":3,"price":480},{"ml":5,"price":765},{"ml":9,"price":1330},{"ml":15,"price":2040}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('azzaro-pour-homme', 'Azzaro Pour Homme', 'Azzaro', 'Designer', 'Him',
  ARRAY['Anise','Basil','Bergamot','Lavender','Vetiver','Oakmoss'],
  ARRAY['Day','Casual','Office'], ARRAY['Spring','Summer','Fall'], false,
  '[{"ml":3,"price":320},{"ml":5,"price":505},{"ml":9,"price":875},{"ml":15,"price":1345}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('prada-luna-rossa-black', 'Luna Rossa Black', 'Prada', 'Designer', 'Him',
  ARRAY['Coumarin','Patchouli','Ambergris','Iris','Vetiver','Amber'],
  ARRAY['Evening','Formal','Date'], ARRAY['Fall','Winter'], false,
  '[{"ml":3,"price":650},{"ml":5,"price":1040},{"ml":9,"price":1810},{"ml":15,"price":2780}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('spicebomb-extreme', 'SpiceBomb Extreme', 'Viktor & Rolf', 'Designer', 'Him',
  ARRAY['Tobacco','Vanilla','Amber','Cinnamon','Black Pepper','Vetiver'],
  ARRAY['Evening','Night','Date'], ARRAY['Fall','Winter'], false,
  '[{"ml":3,"price":600},{"ml":5,"price":960},{"ml":9,"price":1670},{"ml":15,"price":2565}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('mont-blanc-emblem', 'Emblem', 'Mont Blanc', 'Designer', 'Him',
  ARRAY['Apple','Lemon','Rose','Patchouli','Sandalwood','Amber'],
  ARRAY['Day','Office','Casual'], ARRAY['Spring','Summer','Fall'], false,
  '[{"ml":3,"price":280},{"ml":5,"price":445},{"ml":9,"price":768},{"ml":15,"price":1175}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('issey-leau-pour-homme', 'L''Eau D''Issey Pour Homme', 'Issey Miyake', 'Designer', 'Him',
  ARRAY['Aquatic','Yuzu','Coriander','Vetiver','Tonka Bean','Cyclamen'],
  ARRAY['Day','Casual','Office'], ARRAY['Spring','Summer'], false,
  '[{"ml":3,"price":350},{"ml":5,"price":560},{"ml":9,"price":970},{"ml":15,"price":1485}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('coach-platinum', 'Coach Platinum', 'Coach', 'Designer', 'Him',
  ARRAY['Cardamom','Black Pepper','Vetiver','Cedarwood','White Musk'],
  ARRAY['Day','Office','Casual'], ARRAY['Spring','Fall'], false,
  '[{"ml":3,"price":380},{"ml":5,"price":601},{"ml":9,"price":1040},{"ml":15,"price":1595}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('ralph-lauren-safari', 'Safari', 'Ralph Lauren', 'Designer', 'Him',
  ARRAY['Cedarwood','Vetiver','Oakmoss','Mimosa','Bergamot','Ginger'],
  ARRAY['Day','Casual','Outdoor'], ARRAY['Spring','Summer'], false,
  '[{"ml":3,"price":320},{"ml":5,"price":510},{"ml":9,"price":885},{"ml":15,"price":1358}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('polo-67-edt', 'Polo 67 EDT', 'Ralph Lauren', 'Designer', 'Him',
  ARRAY['Bergamot','Lavender','Musk','Ambrette','Vetiver','Cedarwood'],
  ARRAY['Day','Casual','Office'], ARRAY['Spring','Summer'], false,
  '[{"ml":3,"price":340},{"ml":5,"price":540},{"ml":9,"price":935},{"ml":15,"price":1435}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('born-in-roma-intense', 'Born In Roma Intense', 'Valentino', 'Designer', 'Him',
  ARRAY['Bergamot','Vanilla','Vetiver','Tonka Bean','Amber','Patchouli'],
  ARRAY['Evening','Formal','Date'], ARRAY['Fall','Winter'], false,
  '[{"ml":3,"price":550},{"ml":5,"price":880},{"ml":9,"price":1530},{"ml":15,"price":2350}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('john-varvatos-artisan-blu', 'Artisan Blu', 'John Varvatos', 'Designer', 'Him',
  ARRAY['Sea Mineral','Bergamot','Patchouli','Amber','Musk','Teak Wood'],
  ARRAY['Day','Casual','Beach'], ARRAY['Spring','Summer'], false,
  '[{"ml":3,"price":380},{"ml":5,"price":601},{"ml":9,"price":1040},{"ml":15,"price":1595}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('ch-212-men-nyc', '212 Men NYC', 'Carolina Herrera', 'Designer', 'Him',
  ARRAY['Bergamot','Musk','Cedar','Oakmoss','Amber','Marine'],
  ARRAY['Day','Casual','Office'], ARRAY['Spring','Summer','Fall'], false,
  '[{"ml":3,"price":350},{"ml":5,"price":555},{"ml":9,"price":960},{"ml":15,"price":1470}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('mancera-instant-crush-intense', 'Instant Crush Intense', 'Mancera', 'Designer', 'Unisex',
  ARRAY['Rose','Oud','Sandalwood','Musk','Amber','Patchouli'],
  ARRAY['Evening','Formal','Signature'], ARRAY['Fall','Winter'], false,
  '[{"ml":3,"price":680},{"ml":5,"price":1090},{"ml":9,"price":1900},{"ml":15,"price":2920}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('mancera-sicily', 'Sicily', 'Mancera', 'Designer', 'Unisex',
  ARRAY['Bergamot','Rose','Vetiver','Musk','Amber','Jasmine'],
  ARRAY['Day','Evening','Signature'], ARRAY['Spring','Summer'], false,
  '[{"ml":3,"price":640},{"ml":5,"price":1025},{"ml":9,"price":1785},{"ml":15,"price":2740}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('mancera-french-riviera', 'French Riviera', 'Mancera', 'Designer', 'Unisex',
  ARRAY['Bergamot','Lemon','White Musk','Cedar','Amber','Neroli'],
  ARRAY['Day','Casual','Beach'], ARRAY['Spring','Summer'], false,
  '[{"ml":3,"price":640},{"ml":5,"price":1025},{"ml":9,"price":1785},{"ml":15,"price":2740}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('mr-burberry-edt', 'Mr. Burberry EDT', 'Burberry', 'Designer', 'Him',
  ARRAY['Bergamot','Cardamom','Oakmoss','Vetiver','Sandalwood','Guaiac Wood'],
  ARRAY['Day','Office','Casual'], ARRAY['Spring','Summer','Fall'], false,
  '[{"ml":3,"price":380},{"ml":5,"price":601},{"ml":9,"price":1040},{"ml":15,"price":1595}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('kenzo-homme-intense', 'Homme EDT Intense', 'Kenzo', 'Designer', 'Him',
  ARRAY['Sage','Lavender','Cedar','Amber','Sandalwood','Musk'],
  ARRAY['Day','Office','Casual'], ARRAY['Fall','Winter'], false,
  '[{"ml":3,"price":360},{"ml":5,"price":572},{"ml":9,"price":990},{"ml":15,"price":1520}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('hugo-boss-dark-blue', 'Dark Blue', 'Hugo Boss', 'Designer', 'Him',
  ARRAY['Citrus','Marine','Woods','Musk','Vetiver','Cedar'],
  ARRAY['Day','Casual','Office'], ARRAY['Spring','Summer'], false,
  '[{"ml":3,"price":320},{"ml":5,"price":505},{"ml":9,"price":875},{"ml":15,"price":1345}]');

-- ── ARABIAN / MIDDLE EASTERN LINE ────────────────────────────

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('hawas-ice', 'Hawas Ice', 'Rasasi', 'Arabian', 'Him',
  ARRAY['Aquatic','Mint','Bergamot','Ambergris','Musk','Cyclamen'],
  ARRAY['Day','Casual'], ARRAY['Spring','Summer'], false,
  '[{"ml":5,"price":350},{"ml":9,"price":575},{"ml":15,"price":862}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('hawas-atlantis', 'Hawas Atlantis', 'Rasasi', 'Arabian', 'Him',
  ARRAY['Marine','Bergamot','Driftwood','Amber','Musk','Aquatic'],
  ARRAY['Day','Casual','Beach'], ARRAY['Spring','Summer'], false,
  '[{"ml":5,"price":430},{"ml":9,"price":710},{"ml":15,"price":1072}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('hawas-viper', 'Hawas Viper', 'Rasasi', 'Arabian', 'Him',
  ARRAY['Spice','Aquatic','Bergamot','Amber','Musk','Pepper'],
  ARRAY['Evening','Day'], ARRAY['Fall','Spring'], false,
  '[{"ml":5,"price":430},{"ml":9,"price":710},{"ml":15,"price":1072}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('hawas-diva', 'Hawas Diva', 'Rasasi', 'Arabian', 'Her',
  ARRAY['Floral','Rose','Aquatic','Musk','Amber','Jasmine'],
  ARRAY['Day','Evening'], ARRAY['Spring','Summer'], false,
  '[{"ml":5,"price":430},{"ml":9,"price":710},{"ml":15,"price":1072}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('hawas-verde', 'Hawas Verde', 'Rasasi', 'Arabian', 'Him',
  ARRAY['Green','Bergamot','Aquatic','Cedar','Musk','Lime'],
  ARRAY['Day','Casual'], ARRAY['Spring','Summer'], false,
  '[{"ml":5,"price":430},{"ml":9,"price":710},{"ml":15,"price":1072}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('hawas-kobra', 'Hawas Kobra', 'Rasasi', 'Arabian', 'Him',
  ARRAY['Amber','Spice','Musk','Bergamot','Woods','Oud'],
  ARRAY['Evening','Night'], ARRAY['Fall','Winter'], false,
  '[{"ml":5,"price":430},{"ml":9,"price":710},{"ml":15,"price":1072}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('hawas-elixir', 'Hawas Elixir', 'Rasasi', 'Arabian', 'Him',
  ARRAY['Amber','Musk','Aquatic','Sandalwood','Vanilla','Ambergris'],
  ARRAY['Evening','Formal'], ARRAY['Fall','Winter'], false,
  '[{"ml":5,"price":460},{"ml":9,"price":760},{"ml":15,"price":1145}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('rayhaan-nocturno', 'Nocturno EDP', 'Rayhaan', 'Arabian', 'Him',
  ARRAY['Amber','Musk','Oud','Sandalwood','Vanilla','Rose'],
  ARRAY['Evening','Night'], ARRAY['Fall','Winter'], false,
  '[{"ml":5,"price":340},{"ml":9,"price":560},{"ml":15,"price":837}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('rayhaan-aquatica', 'Aquatica EDP', 'Rayhaan', 'Arabian', 'Him',
  ARRAY['Aquatic','Bergamot','Musk','Cedar','Amber','Marine'],
  ARRAY['Day','Casual'], ARRAY['Spring','Summer'], false,
  '[{"ml":5,"price":340},{"ml":9,"price":560},{"ml":15,"price":837}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('rayhaan-jungle-vibe', 'Jungle Vibe EDP', 'Rayhaan', 'Arabian', 'Him',
  ARRAY['Green','Citrus','Vetiver','Musk','Amber','Wood'],
  ARRAY['Day','Casual'], ARRAY['Spring','Summer'], false,
  '[{"ml":5,"price":340},{"ml":9,"price":560},{"ml":15,"price":837}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('jean-lowe-summer-vibes', 'Summer Vibes', 'Jean Lowe', 'Arabian', 'Unisex',
  ARRAY['Aquatic','Citrus','Bergamot','Musk','Amber'],
  ARRAY['Day','Casual','Beach'], ARRAY['Spring','Summer'], false,
  '[{"ml":5,"price":350},{"ml":9,"price":575},{"ml":15,"price":862}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('jean-lowe-azure', 'Azure', 'Jean Lowe', 'Arabian', 'Unisex',
  ARRAY['Aquatic','Marine','Musk','Bergamot','Amber','Cedar'],
  ARRAY['Day','Casual'], ARRAY['Spring','Summer'], false,
  '[{"ml":5,"price":350},{"ml":9,"price":575},{"ml":15,"price":862}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('lattafa-mahir-legacy', 'Maahir Legacy', 'Lattafa Perfumes', 'Arabian', 'Him',
  ARRAY['Lime','Mint','Grapefruit','Lavender','Pineapple','Black Pepper','Rosemary','Juniper Berry','Geranium','Ambroxan','Vetiver','Oakmoss','Tonka Bean'],
  ARRAY['Day','Office','Casual'], ARRAY['Spring','Summer','Fall'], false,
  '[{"ml":5,"price":360},{"ml":9,"price":590},{"ml":15,"price":888}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('afnan-supremacy-noi', 'Supremacy Not Only Intense', 'Afnan', 'Arabian', 'Him',
  ARRAY['Oud','Amber','Musk','Saffron','Rose','Sandalwood'],
  ARRAY['Evening','Formal','Signature'], ARRAY['Fall','Winter'], false,
  '[{"ml":5,"price":400},{"ml":9,"price":660},{"ml":15,"price":995}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('lattafa-asad-elixir', 'Asad Elixir', 'Lattafa Perfumes', 'Arabian', 'Him',
  ARRAY['Grapefruit','Bergamot','Cedar','Frankincense','Amber','Cashmeran','Tonka Bean','Sandalwood'],
  ARRAY['Evening','Night','Signature'], ARRAY['Fall','Winter'], false,
  '[{"ml":5,"price":380},{"ml":9,"price":625},{"ml":15,"price":942}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('lattafa-asad-bourbon', 'Asad Bourbon', 'Lattafa Perfumes', 'Arabian', 'Him',
  ARRAY['Bourbon Vanilla','Davana','Cacao','Amber','Caramel','Musk','Sandalwood','Praline'],
  ARRAY['Evening','Night','Date'], ARRAY['Fall','Winter'], false,
  '[{"ml":5,"price":380},{"ml":9,"price":625},{"ml":15,"price":942}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('lattafa-yara-elixir', 'Yara Elixir', 'Lattafa Perfumes', 'Arabian', 'Her',
  ARRAY['Rose','Vanilla','Musk','Amber','Sandalwood','Praline'],
  ARRAY['Day','Evening','Date'], ARRAY['Spring','Fall'], false,
  '[{"ml":5,"price":350},{"ml":9,"price":575},{"ml":15,"price":862}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('khadlaj-azure-velvet', 'Azure Velvet', 'Khadlaj', 'Arabian', 'Unisex',
  ARRAY['Aquatic','Musk','Bergamot','Amber','Sandalwood','Rose'],
  ARRAY['Day','Casual'], ARRAY['Spring','Summer'], false,
  '[{"ml":5,"price":360},{"ml":9,"price":590},{"ml":15,"price":888}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('khadlaj-onyx', 'ONYX', 'Khadlaj', 'Arabian', 'Him',
  ARRAY['Oud','Amber','Musk','Sandalwood','Vanilla','Patchouli'],
  ARRAY['Evening','Night','Formal'], ARRAY['Fall','Winter'], false,
  '[{"ml":5,"price":370},{"ml":9,"price":608},{"ml":15,"price":915}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('armaf-urban-man-elixir', 'Urban Man Elixir', 'Armaf', 'Arabian', 'Him',
  ARRAY['Amber','Vanilla','Sandalwood','Musk','Tonka Bean','Patchouli'],
  ARRAY['Evening','Night','Signature'], ARRAY['Fall','Winter'], false,
  '[{"ml":5,"price":380},{"ml":9,"price":625},{"ml":15,"price":942}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('afnan-turathi-electric', 'Turathi Electric', 'Afnan', 'Arabian', 'Him',
  ARRAY['Citrus','Aquatic','Musk','Amber','Bergamot','Wood'],
  ARRAY['Day','Casual'], ARRAY['Spring','Summer'], false,
  '[{"ml":5,"price":360},{"ml":9,"price":590},{"ml":15,"price":888}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('lattafa-fakhar', 'Fakhar', 'Lattafa Perfumes', 'Arabian', 'Him',
  ARRAY['Oud','Rose','Amber','Saffron','Musk','Patchouli'],
  ARRAY['Evening','Formal','Signature'], ARRAY['Fall','Winter'], false,
  '[{"ml":5,"price":370},{"ml":9,"price":608},{"ml":15,"price":915}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('lattafa-teriaq-intense', 'Teriaq Intense', 'Lattafa Perfumes', 'Arabian', 'Him',
  ARRAY['Oud','Amber','Vanilla','Musk','Cinnamon','Sandalwood'],
  ARRAY['Evening','Night','Formal'], ARRAY['Fall','Winter'], false,
  '[{"ml":5,"price":390},{"ml":9,"price":640},{"ml":15,"price":965}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('al-haramain-amber-oud-dubai-night', 'Amber Oud Dubai Night', 'Al Haramain', 'Arabian', 'Unisex',
  ARRAY['Amber','Oud','Rose','Musk','Vanilla','Sandalwood'],
  ARRAY['Evening','Night','Signature'], ARRAY['Fall','Winter'], false,
  '[{"ml":5,"price":450},{"ml":9,"price":740},{"ml":15,"price":1115}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('ibraq-emerald-soul-diamond', 'Emerald Soul Diamond', 'IBRAQ', 'Arabian', 'Him',
  ARRAY['Citrus','Aquatic','Musk','Amber','Bergamot','Wood'],
  ARRAY['Day','Evening'], ARRAY['Spring','Summer'], false,
  '[{"ml":5,"price":360},{"ml":9,"price":590},{"ml":15,"price":888}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('french-avenue-liquid-brun', 'Liquid Brun', 'French Avenue', 'Arabian', 'Him',
  ARRAY['Cinnamon','Orange Blossom','Cardamom','Bergamot','Bourbon Vanilla','Elemi','Praline','Ambroxan','Guaiac Wood','Musk'],
  ARRAY['Evening','Night','Date'], ARRAY['Fall','Winter'], true,
  '[{"ml":5,"price":400},{"ml":9,"price":660},{"ml":15,"price":995}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('french-avenue-atlantis-extrait', 'Atlantis Extrait', 'French Avenue', 'Arabian', 'Unisex',
  ARRAY['Aquatic','Musk','Amber','Bergamot','Sandalwood','Jasmine'],
  ARRAY['Day','Evening'], ARRAY['Spring','Summer'], false,
  '[{"ml":5,"price":420},{"ml":9,"price":690},{"ml":15,"price":1040}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('armaf-dunescape', 'Dunescape', 'Armaf', 'Arabian', 'Him',
  ARRAY['Amber','Musk','Sandalwood','Vanilla','Oud','Patchouli'],
  ARRAY['Evening','Night'], ARRAY['Fall','Winter'], false,
  '[{"ml":5,"price":370},{"ml":9,"price":608},{"ml":15,"price":915}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('lattafa-rave-now-black', 'Rave Now Black', 'Lattafa Perfumes', 'Arabian', 'Him',
  ARRAY['Amber','Musk','Vanilla','Sandalwood','Oud','Tonka Bean'],
  ARRAY['Evening','Night'], ARRAY['Fall','Winter'], false,
  '[{"ml":5,"price":340},{"ml":9,"price":560},{"ml":15,"price":837}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('abraaj-vikings', 'Vikings', 'Abraaj', 'Arabian', 'Him',
  ARRAY['Bergamot','Musk','Amber','Sandalwood','Vetiver','Citrus'],
  ARRAY['Day','Evening'], ARRAY['Spring','Fall'], false,
  '[{"ml":5,"price":350},{"ml":9,"price":575},{"ml":15,"price":862}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('midnight-oud', 'Midnight Oud', 'Rasasi', 'Arabian', 'Him',
  ARRAY['Oud','Amber','Musk','Rose','Sandalwood','Incense'],
  ARRAY['Evening','Night','Formal'], ARRAY['Fall','Winter'], false,
  '[{"ml":5,"price":360},{"ml":9,"price":590},{"ml":15,"price":888}]');

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('brandy-saffron-noir', 'Saffron Noir', 'Brandy', 'Arabian', 'Unisex',
  ARRAY['Saffron','Oud','Amber','Musk','Rose','Sandalwood'],
  ARRAY['Evening','Night','Signature'], ARRAY['Fall','Winter'], false,
  '[{"ml":5,"price":380},{"ml":9,"price":625},{"ml":15,"price":942}]');

-- ── NICHE LINE ───────────────────────────────────────────────

INSERT INTO products (id, name, house, line, gender, notes, occasions, seasons, best_seller, sizes) VALUES
('pdm-sedley', 'Sedley', 'Parfums de Marly', 'Niche', 'Him',
  ARRAY['Aquatic','Marine','Bergamot','Cedar','Musk','Vetiver','Lavender'],
  ARRAY['Day','Casual','Office'], ARRAY['Spring','Summer'], false,
  '[{"ml":3,"price":603},{"ml":5,"price":967},{"ml":9,"price":1685},{"ml":15,"price":2588}]');

-- ============================================================
-- "Inspired By" fields – UPDATE after INSERT
-- (Fragrantica-verified + widely accepted community knowledge)
-- ============================================================

-- Arabian fragrances with clear "inspired by" sources
UPDATE products SET inspired_by = '{"name":"Acqua Di Gio Profumo","house":"Giorgio Armani"}'::jsonb WHERE id = 'hawas-ice';
UPDATE products SET inspired_by = '{"name":"Acqua Di Gio Profumo","house":"Giorgio Armani"}'::jsonb WHERE id = 'rayhaan-aquatica';
UPDATE products SET inspired_by = '{"name":"Invictus","house":"Paco Rabanne"}'::jsonb WHERE id = 'jean-lowe-summer-vibes';
UPDATE products SET inspired_by = '{"name":"Bleu de Chanel EDP","house":"Chanel"}'::jsonb WHERE id = 'jean-lowe-azure';
UPDATE products SET inspired_by = '{"name":"Bleu de Chanel EDP","house":"Chanel"}'::jsonb WHERE id = 'afnan-supremacy-noi';
UPDATE products SET inspired_by = '{"name":"Sauvage Elixir","house":"Dior"}'::jsonb WHERE id = 'lattafa-asad-elixir';
UPDATE products SET inspired_by = '{"name":"Le Male Le Parfum","house":"Jean Paul Gaultier"}'::jsonb WHERE id = 'lattafa-asad-bourbon';
UPDATE products SET inspired_by = '{"name":"Versace Pour Homme","house":"Versace"}'::jsonb WHERE id = 'lattafa-mahir-legacy';
UPDATE products SET inspired_by = '{"name":"Spicebomb Extreme","house":"Viktor & Rolf"}'::jsonb WHERE id = 'french-avenue-liquid-brun';
UPDATE products SET inspired_by = '{"name":"Acqua Di Gio Profondo","house":"Giorgio Armani"}'::jsonb WHERE id = 'armaf-urban-man-elixir';
UPDATE products SET inspired_by = '{"name":"Chrome","house":"Azzaro"}'::jsonb WHERE id = 'afnan-turathi-electric';
UPDATE products SET inspired_by = '{"name":"Viking","house":"Creed"}'::jsonb WHERE id = 'abraaj-vikings';
UPDATE products SET inspired_by = '{"name":"Acqua Di Gio","house":"Giorgio Armani"}'::jsonb WHERE id = 'hawas-atlantis';
UPDATE products SET inspired_by = '{"name":"Spicebomb Extreme","house":"Viktor & Rolf"}'::jsonb WHERE id = 'rayhaan-nocturno';
