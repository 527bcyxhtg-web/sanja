"use client";

import { useEffect, useState } from "react";
import type { ProductDetail } from "@/components/ui/ProductModal";
import { FALLBACK_PRODUCTS } from "@/data/products.fallback";
import { fetchShopProducts } from "@/lib/products/fetchShopProducts";
import { useSupabase } from "@/hooks/useSupabase";

export type ProductsSource = "fallback" | "supabase";

export function useProducts(): {
  products: ProductDetail[];
  source: ProductsSource;
} {
  const supabase = useSupabase();
  const [products, setProducts] = useState<ProductDetail[]>(FALLBACK_PRODUCTS);
  const [source, setSource] = useState<ProductsSource>("fallback");

  useEffect(() => {
    if (!supabase) return;

    let cancelled = false;
    (async () => {
      const remote = await fetchShopProducts(supabase);
      if (cancelled || !remote?.length) return;
      setProducts(remote);
      setSource("supabase");
    })();

    return () => {
      cancelled = true;
    };
  }, [supabase]);

  return { products, source };
}
