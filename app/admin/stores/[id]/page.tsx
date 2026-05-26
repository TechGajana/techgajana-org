"use client";

import { useEffect, useState } from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import ImageUpload from "@/components/admin/image-upload";

import StoreFileUpload from "@/components/admin/store-file-upload";

import PageHeader from "@/components/admin/page-header";

export default function EditStoreProductPage() {
  const params = useParams();

  const router = useRouter();

  const [product, setProduct] =
    useState<any>(null);

  const [categories, setCategories] =
    useState<any[]>([]);

  const [thumbnail, setThumbnail] =
    useState("");

  const [zipFile, setZipFile] =
    useState("");

  const [featured, setFeatured] =
    useState(false);

  const [active, setActive] =
    useState(true);

  const [freeProduct, setFreeProduct] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  // FETCH DATA
  async function fetchData() {
  try {
    const productRes = await fetch(
      `/api/store/products/get?id=${params.id}`
    );

    const productData = await productRes.json();

    const found = productData.product;

    if (!found) return;

    setProduct(found);

    setThumbnail(found.thumbnail || "");
    setZipFile(found.zip_file || "");
    setFeatured(found.featured || false);
    setActive(found.active ?? true); // FIXED
    setFreeProduct(found.free_product || false);

    const categoryRes = await fetch(
      "/api/store/categories/list"
    );

    const categoryData = await categoryRes.json();

    setCategories(categoryData.categories || []);
  } catch (error) {
    console.error(error);
  }
}

  useEffect(() => {
  if (params.id) {
    fetchData();
  }
}, [params.id]);

  // UPDATE PRODUCT
  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(
      e.currentTarget
    );

    const body = {
      id: params.id,

      title: formData.get("title"),

      slug: formData.get("slug"),

      short_description:
        formData.get(
          "short_description"
        ),

      full_description:
        formData.get(
          "full_description"
        ),

      thumbnail,

      zip_file: zipFile,

      version:
        formData.get("version"),

      category_id:
        formData.get(
          "category_id"
        ),

      product_type:
        formData.get(
          "product_type"
        ),

      tags: (
        formData.get(
          "tags"
        ) as string
      )
        .split(",")
        .map((tag) =>
          tag.trim()
        ),

      price: Number(
        formData.get("price")
      ),

      discount_price: Number(
        formData.get(
          "discount_price"
        )
      ),

      free_product: freeProduct,

      featured,

      active,

      demo_url:
        formData.get("demo_url"),

      documentation_url:
        formData.get(
          "documentation_url"
        ),

      seo_title:
        formData.get("seo_title"),

      seo_description:
        formData.get(
          "seo_description"
        ),
    };

    try {
      const res = await fetch(
        "/api/store/products/update",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(body),
        }
      );

      if (res.ok) {
        await new Promise((r) => setTimeout(r, 100));

        router.replace("/admin/stores");

        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (!product) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Edit Product"
        description="Update store product details."
      />

      <form
        onSubmit={handleSubmit}
        className="mt-10 space-y-5 rounded-2xl border bg-white p-6"
      >
        <input
          name="title"
          defaultValue={product.title}
          placeholder="Title"
          className="w-full rounded-lg border p-3"
        />

        <input
          name="slug"
          defaultValue={product.slug}
          placeholder="Slug"
          className="w-full rounded-lg border p-3"
        />

        <textarea
          name="short_description"
          defaultValue={
            product.short_description
          }
          placeholder="Short Description"
          className="w-full rounded-lg border p-3"
        />

        <textarea
          name="full_description"
          defaultValue={
            product.full_description
          }
          placeholder="Full Description"
          rows={6}
          className="w-full rounded-lg border p-3"
        />

        {/* THUMBNAIL */}
        <div>
          <p className="mb-2 text-sm font-medium">
            Thumbnail
          </p>

          <ImageUpload
            value={thumbnail}
            onChange={setThumbnail}
            uploadEndpoint="/api/upload/store-thumbnail"
          />
        </div>

        {/* ZIP FILE */}
        <div>
          <p className="mb-2 text-sm font-medium">
            Product ZIP File
          </p>

          <StoreFileUpload
            value={zipFile}
            onChange={setZipFile}
          />
        </div>

        <input
          name="version"
          defaultValue={product.version}
          placeholder="Version"
          className="w-full rounded-lg border p-3"
        />

        {/* CATEGORY */}
        <select
          name="category_id"
          defaultValue={
            product.category_id
          }
          className="w-full rounded-lg border p-3"
        >
          <option value="">
            Select Category
          </option>

          {categories.map(
            (category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            )
          )}
        </select>

        <input
          name="product_type"
          defaultValue={
            product.product_type
          }
          placeholder="Product Type"
          className="w-full rounded-lg border p-3"
        />

        <input
          name="tags"
          defaultValue={
            product.tags?.join(", ")
          }
          placeholder="Tags separated by commas"
          className="w-full rounded-lg border p-3"
        />

        <input
          type="number"
          name="price"
          defaultValue={product.price}
          placeholder="Price"
          className="w-full rounded-lg border p-3"
        />

        <input
          type="number"
          name="discount_price"
          defaultValue={
            product.discount_price
          }
          placeholder="Discount Price"
          className="w-full rounded-lg border p-3"
        />

        <input
          name="demo_url"
          defaultValue={
            product.demo_url
          }
          placeholder="Demo URL"
          className="w-full rounded-lg border p-3"
        />

        <input
          name="documentation_url"
          defaultValue={
            product.documentation_url
          }
          placeholder="Documentation URL"
          className="w-full rounded-lg border p-3"
        />

        <input
          name="seo_title"
          defaultValue={
            product.seo_title
          }
          placeholder="SEO Title"
          className="w-full rounded-lg border p-3"
        />

        <textarea
          name="seo_description"
          defaultValue={
            product.seo_description
          }
          placeholder="SEO Description"
          className="w-full rounded-lg border p-3"
        />

        {/* TOGGLES */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={freeProduct}
            onChange={(e) =>
              setFreeProduct(
                e.target.checked
              )
            }
          />

          Free Product
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) =>
              setFeatured(
                e.target.checked
              )
            }
          />

          Featured
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={active}
            onChange={(e) =>
              setActive(
                e.target.checked
              )
            }
          />

          Active
        </label>

        <button className="rounded-xl bg-black px-6 py-3 text-white">
          {loading
            ? "Updating..."
            : "Update Product"}
        </button>
      </form>
    </div>
  );
}