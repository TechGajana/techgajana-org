import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("admin_settings")
    .select("*")
    .single();

  if (error) {
    return Response.json({ settings: null }, { status: 200 });
  }

  return Response.json({ settings: data });
}