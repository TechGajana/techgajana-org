import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    const formData =
      await req.formData();

    const file = formData.get(
      "file"
    ) as File;

    if (!file) {
      return Response.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const fileName = `${Date.now()}-${file.name}`;

    const { error } =
      await supabase.storage
        .from("store-files")
        .upload(fileName, file);

    if (error) {
      return Response.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return Response.json({
      path: fileName,
    });
  } catch (error) {
    return Response.json(
      {
        error:
          "File upload failed",
      },
      { status: 500 }
    );
  }
}