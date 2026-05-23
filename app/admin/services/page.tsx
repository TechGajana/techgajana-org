"use client";

import { useEffect, useState } from "react";

import ServicesTable from "@/components/admin/services-table";

import type { Service } from "@/types/service";

import ImageUpload from "@/components/admin/image-upload";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>(
    []
  );

  const [loading, setLoading] =
    useState(false);

  const [imageUrl, setImageUrl] =
    useState("");

  async function fetchServices() {
    try {
      const res = await fetch(
        "/api/services/list"
      );

      const data = await res.json();

      setServices(data.services || []);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchServices();
  }, []);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

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

      image_url: imageUrl,

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

    try {
      const res = await fetch(
        "/api/services/create",
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

        fetchServices();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold">
          Services
        </h1>

        <p className="mt-2 text-gray-500">
          Manage all services here.
        </p>
      </div>

      {/* Create Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-10 space-y-4 rounded-2xl border bg-white p-6"
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
          required
        />

        <textarea
          name="full_description"
          placeholder="Full Description"
          className="w-full rounded-lg border p-3"
          required
        />

        

        <input
          type="hidden"
          name="image_url"
          value={imageUrl}
        />

        <ImageUpload
          value={imageUrl}
          onChange={setImageUrl}
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

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
          />

          Featured Service
        </label>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-black px-6 py-3 text-white disabled:opacity-50"
        >
          {loading
            ? "Creating..."
            : "Create Service"}
        </button>
      </form>

      {/* Services Table */}
      <ServicesTable services={services} />
    </div>
  );
}