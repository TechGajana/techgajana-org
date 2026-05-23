import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    const body = await req.json();

    const { error } = await supabase
      .from("services")
      .delete()
      .eq("id", body.id);

    if (error) {
      return Response.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return Response.json({
      success: true,
    });
  } catch (err) {
    return Response.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}