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

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all"); // active/inactive
  const [type, setType] = useState("all"); // free/paid


  const [selected, setSelected] = useState<string[]>([]);

  const [selectAll, setSelectAll] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  const [sort, setSort] = useState("newest");


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
      `/api/store/products/list?page=${page}&limit=${limit}&sort=${sort}`
    );

    const data = await res.json();

    setProducts(data.products || []);
    setTotal(data.total || 0);
  }

  useEffect(() => {
    fetchProducts();
  }, [page, limit, sort]);

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

  {/*filter products based on search, category, status, and type*/ }

  const filteredProducts = products.filter((p) => {
    const matchSearch =
      p.title?.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      category === "all" || p.category_id === category;

    const matchStatus =
      status === "all" ||
      (status === "active" ? p.active : !p.active);

    const matchType =
      type === "all" ||
      (type === "free"
        ? p.free_product
        : !p.free_product);

    return (
      matchSearch &&
      matchCategory &&
      matchStatus &&
      matchType
    );
  });

  // TOGGLE SELECTED PRODUCTS

  function toggleSelect(id: string) {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  }

  // TOGGLE SELECT ALL

  function handleSelectAll() {
    if (selectAll) {
      setSelected([]);
      setSelectAll(false);
    } else {
      const allIds = filteredProducts.map((p) => p.id);
      setSelected(allIds);
      setSelectAll(true);
    }
  }

  // RESET SELECTED WHEN FILTERS CHANGE
  useEffect(() => {
    setSelectAll(false);
    setSelected([]);
  }, [search, category, status, type]);


  // BULK DELETE

  async function bulkDelete() {
    await fetch("/api/store/products/bulk-delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: selected }),
    });

    setSelected([]);
    fetchProducts();
  }

  // BULK FEATURE

  async function bulkFeature() {
    await fetch("/api/store/products/bulk-feature", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: selected }),
    });

    setSelected([]);
    fetchProducts();
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

      {/* BULK ACTIONS */}

      {selected.length > 0 && (
        <div className="flex items-center gap-4 p-4 border rounded-xl bg-white mb-4">
          <span className="text-sm font-medium">
            {selected.length} selected
          </span>

          <button
            onClick={bulkDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Delete
          </button>

          <button
            onClick={bulkFeature}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
          >
            Feature
          </button>

          <button
            onClick={() => setSelected([])}
            className="text-sm underline"
          >
            Clear
          </button>
        </div>
      )}

      {/* SELECT ALL */}

      <div className="flex items-center gap-3 mb-4">
        <input
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAll}
        />

        <span className="text-sm font-medium">
          Select All ({filteredProducts.length})
        </span>
      </div>

      {/* FILTERS */}

      <div className="rounded-2xl border bg-white p-4 mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {/* SEARCH */}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-lg border p-3"
          />

          {/* CATEGORY */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border p-3"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* STATUS */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-lg border p-3"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          {/* TYPE */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-lg border p-3"
          >
            <option value="all">All Types</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        {/* RESET BUTTON */}
        <button
          onClick={() => {
            setSearch("");
            setCategory("all");
            setStatus("all");
            setType("all");
          }}
          className="text-sm text-blue-600 hover:underline"
        >
          Reset Filters
        </button>
      </div>

      <select
        value={sort}
        onChange={(e) => {
          setSort(e.target.value);
          setPage(1);
        }}
        className="w-full rounded-lg border p-3"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="price_low">Price: Low to High</option>
        <option value="price_high">Price: High to Low</option>
        <option value="name_az">Name A–Z</option>
        <option value="name_za">Name Z–A</option>
      </select>

      {/* PRODUCTS TABLE */}
      <StoreProductsTable
        products={filteredProducts}
        fetchProducts={
          fetchProducts
        }
        selected={selected}
        toggleSelect={toggleSelect}
      />

      {/* PAGINATION */}

      <div className="flex items-center justify-between mt-6">

        <div className="text-sm text-gray-600">
          Showing {products.length} products
        </div>

        <div className="flex gap-2 items-center">

          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-sm">
            Page {page}
          </span>

          <button
            disabled={page * limit >= total}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>

        </div>

        <select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
          className="border p-2 rounded"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>

      </div>
    </div>
  );
}