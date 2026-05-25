import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    const body = await req.json();

    const id = body.id;

    delete body.id;

    const { error } = await supabase
      .from("events")
      .update(body)
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
        error: "Update failed",
      },
      {
        status: 500,
      }
    );
  }
}