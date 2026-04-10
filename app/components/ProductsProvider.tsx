"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { products as staticProducts, type Product } from "../lib/products";
import { supabase } from "../lib/supabase";

type ProductsContextValue = {
  products: Product[];
  loading: boolean;
};

const ProductsContext = createContext<ProductsContextValue>({
  products: staticProducts,
  loading: false,
});

export function useProducts() {
  return useContext(ProductsContext);
}

export default function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(staticProducts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    supabase
      .from("products")
      .select("*")
      .then(({ data, error }) => {
        if (cancelled) return;
        setLoading(false);
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
          sizes: row.sizes ?? [],
          inspiredBy: row.inspired_by ?? undefined,
          description: row.description ?? undefined,
          imageUrl: row.image_url ?? undefined,
          inStock: row.in_stock ?? true,
        }));

        setProducts(mapped);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading }}>
      {children}
    </ProductsContext.Provider>
  );
}
