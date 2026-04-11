"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

export type CartItem = {
  productId: string;
  name: string;
  house: string;
  line: string;
  ml: number;
  price: number;
  qty: number;
  imageUrl?: string;
};

type CartCtx = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (productId: string, ml: number) => void;
  updateQty: (productId: string, ml: number, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const CartContext = createContext<CartCtx>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQty: () => {},
  clearCart: () => {},
  totalItems: 0,
  subtotal: 0,
  drawerOpen: false,
  openDrawer: () => {},
  closeDrawer: () => {},
});

export function useCart() {
  return useContext(CartContext);
}

const STORAGE_KEY = "sp-cart";

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setItems(loadCart());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) saveCart(items);
  }, [items, mounted]);

  const addItem = useCallback((item: Omit<CartItem, "qty">) => {
    setItems((prev) => {
      const idx = prev.findIndex((c) => c.productId === item.productId && c.ml === item.ml);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], qty: updated[idx].qty + 1 };
        return updated;
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setDrawerOpen(true);
  }, []);

  const removeItem = useCallback((productId: string, ml: number) => {
    setItems((prev) => prev.filter((c) => !(c.productId === productId && c.ml === ml)));
  }, []);

  const updateQty = useCallback((productId: string, ml: number, qty: number) => {
    if (qty < 1) return;
    setItems((prev) =>
      prev.map((c) => (c.productId === productId && c.ml === ml ? { ...c, qty } : c))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((s, c) => s + c.qty, 0);
  const subtotal = items.reduce((s, c) => s + c.price * c.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        totalItems,
        subtotal,
        drawerOpen,
        openDrawer: () => setDrawerOpen(true),
        closeDrawer: () => setDrawerOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
