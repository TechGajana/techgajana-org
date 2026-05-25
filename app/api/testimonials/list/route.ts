import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } =
      await supabase
        .from("testimonials")
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
      testimonials: data,
    });
  } catch (error) {
    return Response.json(
      {
        error: "Fetch failed",
      },
      {
        status: 500,
      }
    );
  }
}