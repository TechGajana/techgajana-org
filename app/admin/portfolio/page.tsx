"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import Link from "next/link";

import ImageUpload from "@/components/admin/image-upload";

interface PortfolioItem {
  id: string;

  title: string;

  slug: string;

  short_description: string;

  full_description: string;

  thumbnail_url: string;

  technologies: string[];

  category: string;

  live_url: string;

  github_url: string;

  client_name: string;

  featured: boolean;

  seo_title: string;

  seo_description: string;
}

export default function PortfolioPage() {
  const [portfolio, setPortfolio] =
    useState<PortfolioItem[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [thumbnailUrl, setThumbnailUrl] =
    useState("");

  async function fetchPortfolio() {
    try {
      const res = await fetch(
        "/api/portfolio/list"
      );

      const data = await res.json();

      setPortfolio(data.portfolio || []);
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

      thumbnail_url: thumbnailUrl,

      technologies: (
        formData.get(
          "technologies"
        ) as string
      )
        .split(",")
        .map((tech) => tech.trim()),

      category:
        formData.get("category"),

      live_url:
        formData.get("live_url"),

      github_url:
        formData.get("github_url"),

      client_name:
        formData.get("client_name"),

      featured:
        formData.get("featured") ===
        "on",

      seo_title:
        formData.get("seo_title"),

      seo_description:
        formData.get(
          "seo_description"
        ),
    };

    try {
      const res = await fetch(
        "/api/portfolio/create",
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

        setThumbnailUrl("");

        fetchPortfolio();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(
    id: string
  ) {
    const confirmed = confirm(
      "Delete this portfolio item?"
    );

    if (!confirmed) return;

    try {
      await fetch(
        "/api/portfolio/delete",
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

      fetchPortfolio();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Portfolio
        </h1>

        <p className="mt-2 text-gray-500">
          Manage portfolio projects here.
        </p>
      </div>

      {/* Create Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-10 space-y-4 rounded-2xl border bg-white p-6"
      >
        <input
          name="title"
          placeholder="Project Title"
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
          className="min-h-[200px] w-full rounded-lg border p-3"
          required
        />

        {/* Thumbnail Upload */}
        <div>
          <p className="mb-2 text-sm font-medium">
            Thumbnail Image
          </p>

          <ImageUpload
            value={thumbnailUrl}
            onChange={setThumbnailUrl}
            uploadEndpoint="/api/upload/portfolio-image"
          />

          <input
            type="hidden"
            name="thumbnail_url"
            value={thumbnailUrl}
          />
        </div>

        <input
          name="technologies"
          placeholder="React, Next.js, TailwindCSS"
          className="w-full rounded-lg border p-3"
        />

        <input
          name="category"
          placeholder="Category"
          className="w-full rounded-lg border p-3"
        />

        <input
          name="live_url"
          placeholder="Live URL"
          className="w-full rounded-lg border p-3"
        />

        <input
          name="github_url"
          placeholder="GitHub URL"
          className="w-full rounded-lg border p-3"
        />

        <input
          name="client_name"
          placeholder="Client Name"
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

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
          />

          Featured Project
        </label>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-black px-6 py-3 text-white"
        >
          {loading
            ? "Creating..."
            : "Create Portfolio"}
        </button>
      </form>

      {/* Portfolio Table */}
      <div className="mt-10 overflow-x-auto rounded-2xl border bg-white">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left">
                Image
              </th>

              <th className="px-6 py-4 text-left">
                Title
              </th>

              <th className="px-6 py-4 text-left">
                Category
              </th>

              <th className="px-6 py-4 text-left">
                Technologies
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
            {portfolio.map((item) => (
              <tr
                key={item.id}
                className="border-t"
              >
                <td className="px-6 py-4">
                  <Image
                    src={
                      item.thumbnail_url?.startsWith(
                        "http"
                      )
                        ? item.thumbnail_url
                        : "/images/placeholder.png"
                    }
                    alt={item.title}
                    width={80}
                    height={80}
                    className="h-[80px] w-[80px] rounded-lg object-cover"
                  />
                </td>

                <td className="px-6 py-4 font-medium">
                  {item.title}
                </td>

                <td className="px-6 py-4">
                  {item.category}
                </td>

                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {item.technologies?.map(
                      (tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-gray-100 px-3 py-1 text-xs"
                        >
                          {tech}
                        </span>
                      )
                    )}
                  </div>
                </td>

                <td className="px-6 py-4">
                  {item.featured
                    ? "Yes"
                    : "No"}
                </td>

                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/portfolio/${item.id}`}
                    >
                      <button className="rounded-lg bg-blue-500 px-4 py-2 text-white">
                        Edit
                      </button>
                    </Link>

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
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}