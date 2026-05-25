import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    const body = await req.json();

    const id = body.id;

    // Get portfolio item first
    const { data: portfolioItem } =
      await supabase
        .from("portfolio")
        .select("thumbnail_url")
        .eq("id", id)
        .single();

    // Delete image from bucket
    if (portfolioItem?.thumbnail_url) {
      const imagePath =
        portfolioItem.thumbnail_url
          .split("/portfolio/")[1];

      if (imagePath) {
        await supabase.storage
          .from("portfolio")
          .remove([imagePath]);
      }
    }

    // Delete DB record
    const { error } = await supabase
      .from("portfolio")
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
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}