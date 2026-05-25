"use client";

import Link from "next/link";

interface Props {
  faqs: any[];

  fetchFaqs: () => void;
}

export default function FaqsTable({
  faqs,
  fetchFaqs,
}: Props) {
  async function handleDelete(
    id: string
  ) {
    const confirmDelete =
      confirm("Delete this FAQ?");

    if (!confirmDelete) return;

    await fetch("/api/faqs/delete", {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        id,
      }),
    });

    fetchFaqs();
  }

  return (
    <div className="mt-10 overflow-hidden rounded-2xl border bg-white">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-4 text-left">
              Question
            </th>

            <th className="px-6 py-4 text-left">
              Category
            </th>

            <th className="px-6 py-4 text-left">
              Featured
            </th>

            <th className="px-6 py-4 text-left">
              Active
            </th>

            <th className="px-6 py-4 text-left">
              Sort
            </th>

            <th className="px-6 py-4 text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {faqs.map((faq) => (
            <tr
              key={faq.id}
              className="border-t"
            >
              <td className="max-w-md px-6 py-4">
                {faq.question}
              </td>

              <td className="px-6 py-4">
                {faq.category || "-"}
              </td>

              <td className="px-6 py-4">
                {faq.featured
                  ? "✅"
                  : "❌"}
              </td>

              <td className="px-6 py-4">
                {faq.active
                  ? "🟢"
                  : "🔴"}
              </td>

              <td className="px-6 py-4">
                {faq.sort_order}
              </td>

              <td className="flex gap-3 px-6 py-4">
                <Link
                  href={`/admin/faqs/${faq.id}`}
                >
                  <button className="rounded-lg bg-black px-4 py-2 text-white">
                    Edit
                  </button>
                </Link>

                <button
                  onClick={() =>
                    handleDelete(
                      faq.id
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