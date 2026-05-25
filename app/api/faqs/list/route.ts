import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } =
      await supabase
        .from("faqs")
        .select("*")
        .order("sort_order", {
          ascending: true,
        });

    if (error) {
      return Response.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return Response.json({
      faqs: data,
    });
  } catch (error) {
    return Response.json(
      { error: "Fetch failed" },
      { status: 500 }
    );
  }
}