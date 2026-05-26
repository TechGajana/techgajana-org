import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    // Get all products
    const { data: products, error } = await supabase
      .from("store_products")
      .select("id, price, featured, active, free_product");

    if (error) {
      return Response.json(
        { error: error.message },
        { status: 400 }
      );
    }

    // Get categories
    const { data: categories } = await supabase
      .from("store_categories")
      .select("id");

    const totalProducts = products?.length || 0;

    const totalCategories = categories?.length || 0;

    const featuredProducts =
      products?.filter((p) => p.featured)?.length || 0;

    const activeProducts =
      products?.filter((p) => p.active)?.length || 0;

    const freeProducts =
      products?.filter((p) => p.free_product)?.length || 0;

    const paidProducts =
      products?.filter((p) => !p.free_product)?.length || 0;

    const totalRevenue =
      products?.reduce((acc, p) => {
        return acc + (p.price || 0);
      }, 0) || 0;

    return Response.json({
      totalProducts,
      totalCategories,
      featuredProducts,
      activeProducts,
      freeProducts,
      paidProducts,
      totalRevenue,
    });
  } catch (error) {
    return Response.json(
      { error: "Analytics failed" },
      { status: 500 }
    );
  }
}