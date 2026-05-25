import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    const body = await req.json();

    const id = body.id;

    // GET SERVICE FIRST
    const { data: service } =
      await supabase
        .from("services")
        .select("image_url")
        .eq("id", id)
        .single();

    // DELETE IMAGE FROM STORAGE
    if (service?.image_url) {
      const fileName =
        service.image_url
          .split("/")
          .pop();

      if (fileName) {
        const { error: storageError } =
          await supabase.storage
            .from("services")
            .remove([fileName]);

        if (storageError) {
          console.error(
            storageError
          );
        }
      }
    }

    // DELETE DATABASE ROW
    const { error } = await supabase
      .from("services")
      .delete()
      .eq("id", id);

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
    console.error(error);

    return Response.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}