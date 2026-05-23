import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    const formData = await req.formData();

    const file = formData.get(
      "file"
    ) as File;

    if (!file) {
      return Response.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const fileExt =
      file.name.split(".").pop();

    const fileName = `${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
      .from("services")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      return Response.json(
        { error: error.message },
        { status: 400 }
      );
    }

    const { data } = supabase.storage
      .from("services")
      .getPublicUrl(fileName);

    return Response.json({
      url: data.publicUrl,
    });
  } catch (error) {
    return Response.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}