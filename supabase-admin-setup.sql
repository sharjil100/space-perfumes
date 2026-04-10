-- ============================================================
-- Space Perfumes – Admin Setup
-- Run this in the Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Add in_stock column (defaults true = all existing products stay available)
ALTER TABLE products ADD COLUMN IF NOT EXISTS in_stock BOOLEAN NOT NULL DEFAULT true;

-- 2. Admin write policies (authenticated Supabase users only)
CREATE POLICY "admin insert" ON products FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "admin update" ON products FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "admin delete" ON products FOR DELETE USING (auth.role() = 'authenticated');

-- 3. Storage policies for product-images bucket
--    (Run these so the admin can upload images from the dashboard)
CREATE POLICY "public read images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

CREATE POLICY "admin upload images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

CREATE POLICY "admin update images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');

CREATE POLICY "admin delete images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- ============================================================
-- After running this SQL:
-- 1. Go to Supabase → Authentication → Users → Add user
--    Set the email + password you want the client to use
-- 2. That's it — they can now log in at yoursite.com/admin
-- ============================================================
