import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    const body = await req.json();

    const { id, client_image } = body;

    if (client_image) {
      const fileName =
        client_image.split("/").pop();

      await supabase.storage
        .from("testimonials")
        .remove([fileName]);
    }

    const { error } = await supabase
      .from("testimonials")
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