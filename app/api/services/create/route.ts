import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    const body = await req.json();

    const { error } = await supabase
      .from("services")
      .insert({
        title: body.title,
        slug: body.slug,
        short_description:
          body.short_description,
        full_description:
          body.full_description,
        image_url: body.image_url,
        seo_title: body.seo_title,
        seo_description:
          body.seo_description,
        featured: body.featured,
      });

    if (error) {
      console.error(error);

      return Response.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}