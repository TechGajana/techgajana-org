import { createClient } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const supabase = await createClient();

  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  const sort = searchParams.get("sort") || "newest";

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("store_products")
    .select("*, store_categories(name)", { count: "exact" });

  // SORTING LOGIC
  if (sort === "newest") {
    query = query.order("created_at", { ascending: false });
  }

  if (sort === "oldest") {
    query = query.order("created_at", { ascending: true });
  }

  if (sort === "price_low") {
    query = query.order("price", { ascending: true });
  }

  if (sort === "price_high") {
    query = query.order("price", { ascending: false });
  }

  if (sort === "name_az") {
    query = query.order("title", { ascending: true });
  }

  if (sort === "name_za") {
    query = query.order("title", { ascending: false });
  }

  const { data, error, count } = await query.range(from, to);

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({
    products: data,
    total: count,
  });
}