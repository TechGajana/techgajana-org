import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    const { ids } = await req.json();

    if (!ids || !Array.isArray(ids)) {
      return Response.json(
        { error: "Invalid request" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("store_products")
      .update({ featured: true })
      .in("id", ids);

    if (error) {
      return Response.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return Response.json({ success: true });
  } catch (err) {
    return Response.json(
      { error: "Bulk feature failed" },
      { status: 500 }
    );
  }
}