"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ProductDetail } from "@/components/ui/ProductModal";

const STORAGE_KEY = "sanja-plush-cart-v1";

export type CartLine = {
  id: number;
  name: string;
  price: number;
  img: string;
  qty: number;
};

type CartContextValue = {
  lines: CartLine[];
  totalQty: number;
  addProduct: (product: ProductDetail, qty?: number) => void;
  removeLine: (productId: number) => void;
  setLineQty: (productId: number, qty: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function loadStored(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (x): x is CartLine =>
        x &&
        typeof x === "object" &&
        typeof (x as CartLine).id === "number" &&
        typeof (x as CartLine).qty === "number" &&
        (x as CartLine).qty > 0
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    queueMicrotask(() => {
      setLines(loadStored());
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore quota */
    }
  }, [lines]);

  const addProduct = useCallback((product: ProductDetail, qty = 1) => {
    const q = Math.max(1, Math.floor(qty));
    setLines((prev) => {
      const i = prev.findIndex((l) => l.id === product.id);
      if (i === -1) {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            img: product.img,
            qty: q,
          },
        ];
      }
      const next = [...prev];
      next[i] = { ...next[i], qty: next[i].qty + q };
      return next;
    });
  }, []);

  const removeLine = useCallback((productId: number) => {
    setLines((prev) => prev.filter((l) => l.id !== productId));
  }, []);

  const setLineQty = useCallback((productId: number, qty: number) => {
    const q = Math.floor(qty);
    if (q < 1) {
      setLines((prev) => prev.filter((l) => l.id !== productId));
      return;
    }
    setLines((prev) =>
      prev.map((l) => (l.id === productId ? { ...l, qty: q } : l))
    );
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const totalQty = useMemo(
    () => lines.reduce((sum, l) => sum + l.qty, 0),
    [lines]
  );

  const value = useMemo(
    () => ({
      lines,
      totalQty,
      addProduct,
      removeLine,
      setLineQty,
      clearCart,
    }),
    [lines, totalQty, addProduct, removeLine, setLineQty, clearCart]
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
