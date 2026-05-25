import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    const body = await req.json();

    const { error } = await supabase
      .from("blogs")
      .insert({
        title: body.title,

        slug: body.slug,

        excerpt: body.excerpt,

        content: body.content,

        thumbnail_url:
          body.thumbnail_url,

        category: body.category,

        tags: body.tags,

        author: body.author,

        reading_time:
          body.reading_time,

        featured: body.featured,

        published:
          body.published,

        seo_title:
          body.seo_title,

        seo_description:
          body.seo_description,
      });

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