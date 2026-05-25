"use client";

interface Props {
  categories: any[];

  fetchCategories: () => void;
}

export default function StoreCategoriesTable({
  categories,
  fetchCategories,
}: Props) {
  async function handleDelete(
    id: string
  ) {
    const confirmDelete =
      confirm(
        "Delete this category?"
      );

    if (!confirmDelete) return;

    await fetch(
      "/api/store/categories/delete",
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

    fetchCategories();
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-white">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-4 text-left">
              Name
            </th>

            <th className="px-6 py-4 text-left">
              Slug
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
          {categories.map((item) => (
            <tr
              key={item.id}
              className="border-t"
            >
              <td className="px-6 py-4">
                {item.name}
              </td>

              <td className="px-6 py-4">
                {item.slug}
              </td>

              <td className="px-6 py-4">
                {item.featured
                  ? "✅"
                  : "❌"}
              </td>

              <td className="px-6 py-4">
                {item.active
                  ? "🟢"
                  : "🔴"}
              </td>

              <td className="px-6 py-4">
                <button
                  onClick={() =>
                    handleDelete(
                      item.id
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