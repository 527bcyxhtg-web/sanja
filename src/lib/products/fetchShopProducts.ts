import type { SupabaseClient } from "@supabase/supabase-js";
import type { ProductDetail } from "@/components/ui/ProductModal";
import type { ShopProductRow } from "./types";

function isProductDetail(x: unknown): x is ProductDetail {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.id === "number" &&
    typeof o.name === "string" &&
    typeof o.crochetMorph === "string" &&
    typeof o.price === "number"
  );
}

/**
 * Loads catalog from Supabase. Empty or error → caller should use fallback.
 */
export async function fetchShopProducts(
  supabase: SupabaseClient
): Promise<ProductDetail[] | null> {
  const { data, error } = await supabase
    .from("shop_products")
    .select("id, body, sort_order, is_published")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (error || !data?.length) return null;

  const rows = data as ShopProductRow[];
  const out: ProductDetail[] = [];
  for (const row of rows) {
    const body = row.body as unknown;
    if (!isProductDetail(body)) continue;
    if (body.id !== row.id) {
      out.push({ ...body, id: row.id });
    } else {
      out.push(body);
    }
  }

  return out.length > 0 ? out : null;
}
