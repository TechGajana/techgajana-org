import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    const body = await req.json();

    const { error } = await supabase
      .from("portfolio")
      .insert({
        title: body.title,

        slug: body.slug,

        short_description:
          body.short_description,

        full_description:
          body.full_description,

        thumbnail_url:
          body.thumbnail_url,

        technologies:
          body.technologies,

        category: body.category,

        live_url: body.live_url,

        github_url:
          body.github_url,

        client_name:
          body.client_name,

        featured:
          body.featured,

        seo_title:
          body.seo_title,

        seo_description:
          body.seo_description,
      });

    if (error) {
      return Response.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return Response.json({
      success: true,
    });
  } catch (error) {
    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}