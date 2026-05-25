import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    const body = await req.json();

    const { id, banner_url } = body;

    if (banner_url) {
      const fileName =
        banner_url.split("/").pop();

      await supabase.storage
        .from("events")
        .remove([fileName]);
    }

    const { error } = await supabase
      .from("events")
      .delete()
      .eq("id", id);

    if (error) {
      return Response.json(
        {
          error: error.message,
        },
        {
          status: 400,
        }
      );
    }

    return Response.json({
      success: true,
    });
  } catch (error) {
    return Response.json(
      {
        error: "Delete failed",
      },
      {
        status: 500,
      }
    );
  }
}