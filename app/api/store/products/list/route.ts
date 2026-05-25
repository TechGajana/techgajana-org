import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } =
      await supabase
        .from("store_products")
        .select(`
          *,
          store_categories (
            id,
            name
          )
        `)
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      return Response.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return Response.json({
      products: data,
    });
  } catch (error) {
    return Response.json(
      {
        error:
          "Failed to fetch products",
      },
      { status: 500 }
    );
  }
}