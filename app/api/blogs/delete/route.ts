import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    const body = await req.json();

    const id = body.id;

    // Find thumbnail
    const { data: blog } =
      await supabase
        .from("blogs")
        .select("thumbnail_url")
        .eq("id", id)
        .single();

    // Delete image
    if (blog?.thumbnail_url) {
      const imagePath =
        blog.thumbnail_url.split(
          "/blogs/"
        )[1];

      if (imagePath) {
        await supabase.storage
          .from("blogs")
          .remove([imagePath]);
      }
    }

    // Delete blog
    const { error } = await supabase
      .from("blogs")
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
        error:
          "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}