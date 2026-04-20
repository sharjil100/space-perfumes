"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { products as staticProducts, type Product } from "../lib/products";
import { supabase } from "../lib/supabase";

type SizeRow = { ml: number; price: number };

const STANDARD_MLS = [3, 5, 10];

function normalizeDecantSizes(raw: SizeRow[]): SizeRow[] {
  if (!raw.length) return STANDARD_MLS.map((ml) => ({ ml, price: 0 }));
  const existing = new Map(raw.map((s) => [s.ml, s.price]));
  // average price-per-ml across all stored sizes for interpolation
  const avgPricePerMl = raw.reduce((sum, s) => sum + s.price / s.ml, 0) / raw.length;
  return STANDARD_MLS.map((ml) => ({
    ml,
    price: existing.has(ml) ? existing.get(ml)! : Math.round(avgPricePerMl * ml),
  }));
}

type ProductsContextValue = {
  products: Product[];
  loading: boolean;
  hydrated: boolean;
};

const ProductsContext = createContext<ProductsContextValue>({
  products: staticProducts,
  loading: false,
  hydrated: false,
});

export function useProducts() {
  return useContext(ProductsContext);
}

function cloudinaryUrl(url: string | undefined | null): string | undefined {
  if (!url) return undefined;
  return `https://res.cloudinary.com/diyelmgg3/image/fetch/f_auto,q_auto,w_600/${encodeURIComponent(url)}`;
}

export default function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(staticProducts);
  const [loading, setLoading] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    supabase
      .from("products")
      .select("*")
      .then(({ data, error }) => {
        if (cancelled) return;
        setLoading(false);
        setHydrated(true);
        if (error || !data || data.length === 0) return;

        const mapped: Product[] = data.map((row) => ({
          id: row.id,
          name: row.name,
          house: row.house,
          line: row.line as Product["line"],
          gender: row.gender as Product["gender"],
          notes: row.notes ?? [],
          occasions: row.occasions ?? [],
          seasons: row.seasons ?? [],
          bestSeller: row.best_seller ?? false,
          sizes: normalizeDecantSizes(row.sizes ?? []),
          inspiredBy: row.inspired_by ?? undefined,
          description: row.description ?? undefined,
          imageUrl: cloudinaryUrl(row.image_url),
          inStock: row.in_stock ?? true,
          discount: row.discount ?? 0,
        }));

        setProducts(mapped);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading, hydrated }}>
      {children}
    </ProductsContext.Provider>
  );
}
