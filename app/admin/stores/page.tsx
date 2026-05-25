"use client";

import { useEffect, useState } from "react";

import ImageUpload from "@/components/admin/image-upload";

import StoreFileUpload from "@/components/admin/store-file-upload";

import StoreProductsTable from "@/components/admin/store-products-table";

import StoreCategoriesTable from "@/components/admin/store-categories-table";

import PageHeader from "@/components/admin/page-header";

export default function StorePage() {
  const [categories, setCategories] =
    useState<any[]>([]);

  const [products, setProducts] =
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

  // FETCH CATEGORIES
  async function fetchCategories() {
    const res = await fetch(
      "/api/store/categories/list"
    );

    const data = await res.json();

    setCategories(
      data.categories || []
    );
  }

  // FETCH PRODUCTS
  async function fetchProducts() {
    const res = await fetch(
      "/api/store/products/list"
    );

    const data = await res.json();

    setProducts(
      data.products || []
    );
  }

  useEffect(() => {
    fetchCategories();

    fetchProducts();
  }, []);

  // CREATE CATEGORY
  async function createCategory(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form);

    const body = {
      name: formData.get("name"),

      slug: formData.get("slug"),

      description:
        formData.get(
          "description"
        ),

      featured:
        formData.get(
          "featured"
        ) === "on",

      active:
        formData.get("active") ===
        "on",
    };

    const res = await fetch(
      "/api/store/categories/create",
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
      form.reset();

      fetchCategories();
    }
  }

  // CREATE PRODUCT
  async function createProduct(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form);

    const body = {
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

    const res = await fetch(
      "/api/store/products/create",
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
      form.reset();

      setThumbnail("");

      setZipFile("");

      setFeatured(false);

      setActive(true);

      setFreeProduct(false);

      fetchProducts();
    }
  }

  return (
    <div className="space-y-10">
      <PageHeader
        title="Store CMS"
        description="Manage digital products and categories."
      />

      {/* CATEGORY FORM */}
      <div className="rounded-2xl border bg-white p-6">
        <h2 className="mb-5 text-2xl font-bold">
          Create Category
        </h2>

        <form
          onSubmit={createCategory}
          className="space-y-4"
        >
          <input
            name="name"
            placeholder="Category Name"
            className="w-full rounded-lg border p-3"
            required
          />

          <input
            name="slug"
            placeholder="Slug"
            className="w-full rounded-lg border p-3"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            className="w-full rounded-lg border p-3"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
            />

            Featured
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="active"
              defaultChecked
            />

            Active
          </label>

          <button className="rounded-xl bg-black px-6 py-3 text-white">
            Create Category
          </button>
        </form>
      </div>

      {/* CATEGORY TABLE */}
      <StoreCategoriesTable
        categories={categories}
        fetchCategories={
          fetchCategories
        }
      />

      {/* PRODUCT FORM */}
      <div className="rounded-2xl border bg-white p-6">
        <h2 className="mb-5 text-2xl font-bold">
          Create Product
        </h2>

        <form
          onSubmit={createProduct}
          className="space-y-4"
        >
          <input
            name="title"
            placeholder="Title"
            className="w-full rounded-lg border p-3"
            required
          />

          <input
            name="slug"
            placeholder="Slug"
            className="w-full rounded-lg border p-3"
            required
          />

          <textarea
            name="short_description"
            placeholder="Short Description"
            className="w-full rounded-lg border p-3"
          />

          <textarea
            name="full_description"
            placeholder="Full Description"
            className="w-full rounded-lg border p-3"
            rows={6}
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
            placeholder="Version"
            defaultValue="1.0.0"
            className="w-full rounded-lg border p-3"
          />

          {/* CATEGORY */}
          <select
            name="category_id"
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
            placeholder="Product Type"
            className="w-full rounded-lg border p-3"
          />

          <input
            name="tags"
            placeholder="Tags separated by commas"
            className="w-full rounded-lg border p-3"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            className="w-full rounded-lg border p-3"
          />

          <input
            type="number"
            name="discount_price"
            placeholder="Discount Price"
            className="w-full rounded-lg border p-3"
          />

          <input
            name="demo_url"
            placeholder="Demo URL"
            className="w-full rounded-lg border p-3"
          />

          <input
            name="documentation_url"
            placeholder="Documentation URL"
            className="w-full rounded-lg border p-3"
          />

          <input
            name="seo_title"
            placeholder="SEO Title"
            className="w-full rounded-lg border p-3"
          />

          <textarea
            name="seo_description"
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
            Create Product
          </button>
        </form>
      </div>

      {/* PRODUCTS TABLE */}
      <StoreProductsTable
        products={products}
        fetchProducts={
          fetchProducts
        }
      />
    </div>
  );
}