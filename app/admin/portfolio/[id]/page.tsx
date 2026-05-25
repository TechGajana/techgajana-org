"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import ImageUpload from "@/components/admin/image-upload";

export default function EditPortfolioPage() {
  const params = useParams();

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [thumbnailUrl, setThumbnailUrl] =
    useState("");

  const [formData, setFormData] =
    useState<any>(null);

  async function fetchPortfolio() {
    try {
      const res = await fetch(
        "/api/portfolio/list"
      );

      const data = await res.json();

      const item = data.portfolio.find(
        (p: any) => p.id === params.id
      );

      setFormData(item);

      setThumbnailUrl(
        item.thumbnail_url || ""
      );
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchPortfolio();
  }, []);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const form = e.currentTarget;

    const data = new FormData(form);

    const body = {
      id: params.id,

      title: data.get("title"),

      slug: data.get("slug"),

      short_description:
        data.get(
          "short_description"
        ),

      full_description:
        data.get(
          "full_description"
        ),

      thumbnail_url: thumbnailUrl,

      technologies: (
        data.get(
          "technologies"
        ) as string
      )
        .split(",")
        .map((tech) => tech.trim()),

      category:
        data.get("category"),

      live_url:
        data.get("live_url"),

      github_url:
        data.get("github_url"),

      client_name:
        data.get("client_name"),

      featured:
        data.get("featured") ===
        "on",

      seo_title:
        data.get("seo_title"),

      seo_description:
        data.get(
          "seo_description"
        ),
    };

    try {
      const res = await fetch(
        "/api/portfolio/update",
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
        router.push(
          "/admin/portfolio"
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (!formData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">
        Edit Portfolio
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-10 space-y-4 rounded-2xl border bg-white p-6"
      >
        <input
          name="title"
          defaultValue={formData.title}
          className="w-full rounded-lg border p-3"
        />

        <input
          name="slug"
          defaultValue={formData.slug}
          className="w-full rounded-lg border p-3"
        />

        <textarea
          name="short_description"
          defaultValue={
            formData.short_description
          }
          className="w-full rounded-lg border p-3"
        />

        <textarea
          name="full_description"
          defaultValue={
            formData.full_description
          }
          className="min-h-[200px] w-full rounded-lg border p-3"
        />

        <ImageUpload
          value={thumbnailUrl}
          onChange={setThumbnailUrl}
          uploadEndpoint="/api/upload/portfolio-image"
        />

        <input
          name="technologies"
          defaultValue={
            formData.technologies?.join(
              ", "
            ) || ""
          }
          className="w-full rounded-lg border p-3"
        />

        <input
          name="category"
          defaultValue={
            formData.category
          }
          className="w-full rounded-lg border p-3"
        />

        <input
          name="live_url"
          defaultValue={
            formData.live_url
          }
          className="w-full rounded-lg border p-3"
        />

        <input
          name="github_url"
          defaultValue={
            formData.github_url
          }
          className="w-full rounded-lg border p-3"
        />

        <input
          name="client_name"
          defaultValue={
            formData.client_name
          }
          className="w-full rounded-lg border p-3"
        />

        <input
          name="seo_title"
          defaultValue={
            formData.seo_title
          }
          className="w-full rounded-lg border p-3"
        />

        <textarea
          name="seo_description"
          defaultValue={
            formData.seo_description
          }
          className="w-full rounded-lg border p-3"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={
              formData.featured
            }
          />

          Featured Project
        </label>

        <button className="rounded-lg bg-black px-6 py-3 text-white">
          {loading
            ? "Updating..."
            : "Update Portfolio"}
        </button>
      </form>
    </div>
  );
}