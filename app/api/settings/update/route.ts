import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();

  const body = await req.json();

  const { error } = await supabase
    .from("admin_settings")
    .update(body)
    .eq("id", body.id);

  if (error) {
    return Response.json(
      { error: error.message },
      { status: 400 }
    );
  }

  return Response.json({ success: true });
}