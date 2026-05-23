"use client";

import Image from "next/image";
import Link from "next/link";

import type { Service } from "@/types/service";


interface ServicesTableProps {
    services: Service[];
}

export default function ServicesTable({
    services,
}: ServicesTableProps) {
    if (services.length === 0) {
        return (
            <div className="mt-10 rounded-2xl border bg-white p-10 text-center">
                <h2 className="text-2xl font-bold">
                    No Services Found
                </h2>

                <p className="mt-2 text-gray-500">
                    Create your first service.
                </p>
            </div>
        );
    }

    return (
        <div className="mt-10 overflow-hidden rounded-2xl border bg-white">
            <table className="w-full">
                <thead className="border-b bg-gray-50">
                    <tr>
                        <th className="px-6 py-4 text-left">
                            Image
                        </th>

                        <th className="px-6 py-4 text-left">
                            Title
                        </th>

                        <th className="px-6 py-4 text-left">
                            Slug
                        </th>

                        <th className="px-6 py-4 text-left">
                            Featured
                        </th>

                        <th className="px-6 py-4 text-left">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {services.map((service) => (
                        <tr
                            key={service.id}
                            className="border-b"
                        >
                            <td className="px-6 py-4">
                                <Image
                                    src={
                                        service.image_url?.startsWith("http")
                                            ? service.image_url
                                             : "/images/placeholder.png"
                                    }
                                    alt={service.title}
                                    width={80}
                                    height={80}
                                    className="rounded-lg object-cover"
                                />
                            </td>

                            <td className="px-6 py-4 font-medium">
                                {service.title}
                            </td>

                            <td className="px-6 py-4">
                                {service.slug}
                            </td>

                            <td className="px-6 py-4">
                                {service.featured ? (
                                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                                        Featured
                                    </span>
                                ) : (
                                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                                        Normal
                                    </span>
                                )}
                            </td>

                            <td className="px-6 py-4">
                                <div className="flex gap-3">
                                    <Link
                                        href={`/admin/services/${service.id}`}
                                        className="rounded-lg bg-blue-500 px-4 py-2 text-white"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={async () => {
                                            const res = await fetch(
                                                "/api/services/delete",
                                                {
                                                    method: "POST",
                                                    headers: {
                                                        "Content-Type":
                                                            "application/json",
                                                    },
                                                    body: JSON.stringify({
                                                        id: service.id,
                                                    }),
                                                }
                                            );

                                            if (res.ok) {
                                                window.location.reload();
                                            }
                                        }}
                                        className="rounded-lg bg-red-500 px-4 py-2 text-white"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}