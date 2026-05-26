import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    const body = await req.json();

    const id = body.id;

    if (!id) {
      return Response.json(
        { error: "Missing product id" },
        { status: 400 }
      );
    }

    // Remove id from update payload
    const {
      id: _,
      ...updateData
    } = body;

    // Sanitize important fields
    const cleanData = {
      title: updateData.title || "",
      slug: updateData.slug || "",
      short_description:
        updateData.short_description || "",
      full_description:
        updateData.full_description || "",

      thumbnail:
        updateData.thumbnail || null,

      zip_file:
        updateData.zip_file || null,

      version:
        updateData.version || "1.0.0",

      category_id:
        updateData.category_id || null,

      product_type:
        updateData.product_type || null,

      tags: Array.isArray(updateData.tags)
        ? updateData.tags
        : [],

      price: Number(updateData.price || 0),

      discount_price: Number(
        updateData.discount_price || 0
      ),

      free_product:
        !!updateData.free_product,

      featured: !!updateData.featured,

      active: updateData.active ?? true,

      demo_url:
        updateData.demo_url || null,

      documentation_url:
        updateData.documentation_url ||
        null,

      seo_title:
        updateData.seo_title || null,

      seo_description:
        updateData.seo_description ||
        null,
    };

    const { error } = await supabase
      .from("store_products")
      .update(cleanData)
      .eq("id", id);

    if (error) {
      console.log("UPDATE ERROR:", error);

      return Response.json(
        {
          error: error.message,
          details: error,
        },
        { status: 400 }
      );
    }

    return Response.json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.log("SERVER ERROR:", error);

    return Response.json(
      {
        error: "Product update failed",
      },
      { status: 500 }
    );
  }
}