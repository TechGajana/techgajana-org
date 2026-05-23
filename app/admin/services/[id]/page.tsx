"use client";

import {
    useEffect,
    useState,
} from "react";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/admin/image-upload";

export default function EditServicePage() {

    const router = useRouter();
    const params = useParams();

    const id = params.id as string;

    const [service, setService] =
        useState<any>(null);

    const [imageUrl, setImageUrl] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    async function fetchService() {
        const res = await fetch(
            `/api/services/list`
        );

        const data = await res.json();

        const found = data.services.find(
            (item: any) => item.id === id
        );

        setService(found);
        setImageUrl(found.image_url || "");
    }

    useEffect(() => {
        fetchService();
    }, []);

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        setLoading(true);

        const form = e.currentTarget;

        const formData = new FormData(form);

        const body = {
            id,

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

            image_url:
                formData.get("image_url"),

            seo_title:
                formData.get("seo_title"),

            seo_description:
                formData.get(
                    "seo_description"
                ),

            featured:
                formData.get("featured") ===
                "on",
        };

        const res = await fetch(
            "/api/services/update",
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
            router.push("/admin/services");
        }

        setLoading(false);
    }

    if (!service) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold">
                Edit Service
            </h1>

            <form
                onSubmit={handleSubmit}
                className="mt-10 space-y-4 rounded-2xl border bg-white p-6"
            >
                <input
                    name="title"
                    defaultValue={service.title}
                    placeholder="Title"
                    className="w-full rounded-lg border p-3"
                    required
                />

                <input
                    name="slug"
                    defaultValue={service.slug}
                    placeholder="Slug"
                    className="w-full rounded-lg border p-3"
                    required
                />

                <textarea
                    name="short_description"
                    defaultValue={
                        service.short_description
                    }
                    placeholder="Short Description"
                    className="w-full rounded-lg border p-3"
                    required
                />

                <textarea
                    name="full_description"
                    defaultValue={
                        service.full_description
                    }
                    placeholder="Full Description"
                    className="min-h-[200px] w-full rounded-lg border p-3"
                    required
                />

                <ImageUpload
                    value={imageUrl}
                    onChange={setImageUrl}
                />

                <input
                    type="hidden"
                    name="image_url"
                    value={imageUrl}
                />

                <input
                    name="seo_title"
                    defaultValue={
                        service.seo_title
                    }
                    placeholder="SEO Title"
                    className="w-full rounded-lg border p-3"
                />

                <textarea
                    name="seo_description"
                    defaultValue={
                        service.seo_description
                    }
                    placeholder="SEO Description"
                    className="w-full rounded-lg border p-3"
                />

                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="featured"
                        defaultChecked={
                            service.featured
                        }
                    />

                    Featured Service
                </label>

                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg bg-black px-6 py-3 text-white"
                >
                    {loading
                        ? "Updating..."
                        : "Update Service"}
                </button>
            </form>
        </div>
    );
}