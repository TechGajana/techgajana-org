"use client";

import Image from "next/image";

import Link from "next/link";

interface Props {
  testimonials: any[];

  fetchTestimonials: () => void;
}

export default function TestimonialsTable({
  testimonials,
  fetchTestimonials,
}: Props) {
  async function handleDelete(
    id: string,
    client_image: string
  ) {
    const confirmDelete =
      confirm(
        "Delete this testimonial?"
      );

    if (!confirmDelete) return;

    await fetch(
      "/api/testimonials/delete",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          id,
          client_image,
        }),
      }
    );

    fetchTestimonials();
  }

  return (
    <div className="mt-10 overflow-hidden rounded-2xl border bg-white">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-4 text-left">
              Client
            </th>

            <th className="px-6 py-4 text-left">
              Name
            </th>

            <th className="px-6 py-4 text-left">
              Company
            </th>

            <th className="px-6 py-4 text-left">
              Rating
            </th>

            <th className="px-6 py-4 text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {testimonials.map(
            (testimonial) => (
              <tr
                key={testimonial.id}
                className="border-t"
              >
                <td className="px-6 py-4">
                  <Image
                    src={
                      testimonial.client_image ||
                      "/images/placeholder.png"
                    }
                    alt=""
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />
                </td>

                <td className="px-6 py-4">
                  {
                    testimonial.client_name
                  }
                </td>

                <td className="px-6 py-4">
                  {
                    testimonial.company_name
                  }
                </td>

                <td className="px-6 py-4">
                  {"⭐".repeat(
                    testimonial.rating
                  )}
                </td>

                <td className="flex gap-3 px-6 py-4">
                  <Link
                    href={`/admin/testimonials/${testimonial.id}`}
                  >
                    <button className="rounded-lg bg-black px-4 py-2 text-white">
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(
                        testimonial.id,
                        testimonial.client_image
                      )
                    }
                    className="rounded-lg bg-red-500 px-4 py-2 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}