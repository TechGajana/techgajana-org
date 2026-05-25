import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } =
      await supabase
        .from("blogs")
        .select("*")
        .order("created_at", {
          ascending: false,
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
      blogs: data,
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