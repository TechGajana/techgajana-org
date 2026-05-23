"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export async function createService(
    formData: FormData
) {
    const supabase = await createClient();

    const title = formData.get("title") as string;

    const slug = formData.get("slug") as string;

    const short_description = formData.get(
        "short_description"
    ) as string;

    const full_description = formData.get(
        "full_description"
    ) as string;

    const image_url = formData.get(
        "image_url"
    ) as string;

    const seo_title = formData.get(
        "seo_title"
    ) as string;

    const seo_description = formData.get(
        "seo_description"
    ) as string;

    const featured =
        formData.get("featured") === "on";

    const { error } = await supabase
        .from("services")
        .insert({
            title,
            slug,
            short_description,
            full_description,
            image_url,
            seo_title,
            seo_description,
            featured,
        });

    if (error) {
        console.error(error.message);
        return;
    }

    revalidatePath("/admin/services");
}


// Delete service action

export async function deleteService(
  formData: FormData
) {
  const supabase = await createClient();

  const id = formData.get("id") as string;

  const { error } = await supabase
    .from("services")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error.message);
    return;
  }

  revalidatePath("/admin/services");
}


// Update service action

export async function updateService(
  formData: FormData
) {
  const supabase = await createClient();

  const id = formData.get("id") as string;

  const title = formData.get("title") as string;

  const slug = formData.get("slug") as string;

  const short_description = formData.get(
    "short_description"
  ) as string;

  const full_description = formData.get(
    "full_description"
  ) as string;

  const image_url = formData.get(
    "image_url"
  ) as string;

  const seo_title = formData.get(
    "seo_title"
  ) as string;

  const seo_description = formData.get(
    "seo_description"
  ) as string;

  const featured =
    formData.get("featured") === "on";

  const { error } = await supabase
    .from("services")
    .update({
      title,
      slug,
      short_description,
      full_description,
      image_url,
      seo_title,
      seo_description,
      featured,
    })
    .eq("id", id);

  if (error) {
    console.error(error.message);
    return;
  }

  revalidatePath("/admin/services");
}