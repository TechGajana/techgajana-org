import { createClient } from "@/lib/supabase/server";

export async function getServices() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(error.message);
    return [];
  }

  return data;
}