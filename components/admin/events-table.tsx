"use client";

import Image from "next/image";

import Link from "next/link";

interface Props {
  events: any[];

  fetchEvents: () => void;
}

export default function EventsTable({
  events,
  fetchEvents,
}: Props) {
  async function handleDelete(
    id: string,
    banner_url: string
  ) {
    const confirmDelete =
      confirm(
        "Delete this event?"
      );

    if (!confirmDelete) return;

    await fetch(
      "/api/events/delete",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          id,
          banner_url,
        }),
      }
    );

    fetchEvents();
  }

  return (
    <div className="mt-10 overflow-hidden rounded-2xl border bg-white">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-4 text-left">
              Banner
            </th>

            <th className="px-6 py-4 text-left">
              Title
            </th>

            <th className="px-6 py-4 text-left">
              Date
            </th>

            <th className="px-6 py-4 text-left">
              Status
            </th>

            <th className="px-6 py-4 text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {events.map((event) => (
            <tr
              key={event.id}
              className="border-t"
            >
              <td className="px-6 py-4">
                <Image
                  src={
                    event.banner_url ||
                    "/images/placeholder.png"
                  }
                  alt=""
                  width={80}
                  height={60}
                  className="rounded-lg object-cover"
                />
              </td>

              <td className="px-6 py-4">
                {event.title}
              </td>

              <td className="px-6 py-4">
                {event.event_date}
              </td>

              <td className="px-6 py-4">
                {event.status}
              </td>

              <td className="flex gap-3 px-6 py-4">
                <Link
                  href={`/admin/events/${event.id}`}
                >
                  <button className="rounded-lg bg-black px-4 py-2 text-white">
                    Edit
                  </button>
                </Link>

                <button
                  onClick={() =>
                    handleDelete(
                      event.id,
                      event.banner_url
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