"use client";

import Image from "next/image";

import Link from "next/link";

type Product = {
  id: string;
  title: string;
  thumbnail?: string;
  price?: number;
  free_product?: boolean;
  featured?: boolean;
  active?: boolean;
  store_categories?: {
    name: string;
  };
};

interface Props {
  products: Product[];
  fetchProducts: () => void;

  selected: string[];
  toggleSelect: (id: string) => void;
}

export default function StoreProductsTable({
  products,
  fetchProducts,
  selected,
  toggleSelect,
}: Props) {
  async function handleDelete(
    id: string
  ) {
    const confirmDelete =
      confirm(
        "Delete this product?"
      );

    if (!confirmDelete) return;

    await fetch(
      "/api/store/products/delete",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          id,
        }),
      }
    );

    fetchProducts();
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-white">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>

            <th className="px-6 py-4 text-left">
              Select
            </th>

            <th className="px-6 py-4 text-left">
              Thumbnail
            </th>

            <th className="px-6 py-4 text-left">
              Title
            </th>

            <th className="px-6 py-4 text-left">
              Category
            </th>

            <th className="px-6 py-4 text-left">
              Price
            </th>

            <th className="px-6 py-4 text-left">
              Featured
            </th>

            <th className="px-6 py-4 text-left">
              Active
            </th>

            <th className="px-6 py-4 text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-t"
            >

              <td className="px-6 py-4">
                <input
                  type="checkbox"
                  checked={selected?.includes(product.id)}
                  onChange={() => toggleSelect(product.id)}
                />
              </td>

              <td className="px-6 py-4">
                <Image
                  src={
                    product.thumbnail ||
                    "/images/placeholder.png"
                  }
                  alt={product.title}
                  width={70}
                  height={70}
                  className="rounded-lg object-cover"
                />
              </td>

              <td className="px-6 py-4">
                {product.title}
              </td>

              <td className="px-6 py-4">
                {product
                  .store_categories
                  ?.name || "-"}
              </td>

              <td className="px-6 py-4">
                {product.free_product
                  ? "FREE"
                  : `₹${product.price}`}
              </td>

              <td className="px-6 py-4">
                {product.featured
                  ? "✅"
                  : "❌"}
              </td>

              <td className="px-6 py-4">
                {product.active
                  ? "🟢"
                  : "🔴"}
              </td>

              <td className="flex gap-3 px-6 py-4">
                <Link
                  href={`/admin/stores/${product.id}`}
                >
                  <button className="rounded-lg bg-black px-4 py-2 text-white">
                    Edit
                  </button>
                </Link>

                <button
                  onClick={() =>
                    handleDelete(
                      product.id
                    )
                  }
                  className="rounded-lg bg-red-500 px-4 py-2 text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}