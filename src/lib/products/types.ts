import type { ProductDetail } from "@/components/ui/ProductModal";

/** Row from `public.shop_products` (Supabase). */
export type ShopProductRow = {
  id: number;
  body: ProductDetail;
  sort_order: number;
  is_published: boolean;
};
