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
        {
          error: "No file uploaded",
        },
        {
          status: 400,
        }
      );
    }

    const fileExt =
      file.name.split(".").pop();

    const fileName = `${Date.now()}.${fileExt}`;

    const { error } =
      await supabase.storage
        .from("events")
        .upload(fileName, file);

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

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("events")
      .getPublicUrl(fileName);

    return Response.json({
      url: publicUrl,
    });
  } catch (error) {
    return Response.json(
      {
        error: "Upload failed",
      },
      {
        status: 500,
      }
    );
  }
}