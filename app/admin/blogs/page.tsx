"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import Link from "next/link";

import ImageUpload from "@/components/admin/image-upload";

import RichTextEditor from "@/components/admin/rich-text-editor";

interface Blog {
  id: string;

  title: string;

  slug: string;

  excerpt: string;

  content: string;

  thumbnail_url: string;

  category: string;

  tags: string[];

  author: string;

  reading_time: number;

  featured: boolean;

  published: boolean;

  seo_title: string;

  seo_description: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<
    Blog[]
  >([]);

  const [loading, setLoading] =
    useState(false);

  const [thumbnailUrl, setThumbnailUrl] =
    useState("");

  const [content, setContent] =
    useState("");

  async function fetchBlogs() {
    try {
      const res = await fetch(
        "/api/blogs/list"
      );

      const data = await res.json();

      setBlogs(data.blogs || []);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchBlogs();
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

      excerpt: formData.get(
        "excerpt"
      ),

      content,

      thumbnail_url: thumbnailUrl,

      category:
        formData.get("category"),

      tags: (
        formData.get(
          "tags"
        ) as string
      )
        .split(",")
        .map((tag) => tag.trim()),

      author:
        formData.get("author"),

      reading_time: Number(
        formData.get(
          "reading_time"
        )
      ),

      featured:
        formData.get("featured") ===
        "on",

      published:
        formData.get("published") ===
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
        "/api/blogs/create",
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

        setContent("");

        fetchBlogs();
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
      "Delete this blog?"
    );

    if (!confirmed) return;

    try {
      await fetch(
        "/api/blogs/delete",
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

      fetchBlogs();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Blogs
        </h1>

        <p className="mt-2 text-gray-500">
          Manage blogs here.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-10 space-y-4 rounded-2xl border bg-white p-6"
      >
        <input
          name="title"
          placeholder="Blog Title"
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
          name="excerpt"
          placeholder="Excerpt"
          className="w-full rounded-lg border p-3"
        />

        {/* Thumbnail */}
        <div>
          <p className="mb-2 text-sm font-medium">
            Thumbnail
          </p>

          <ImageUpload
            value={thumbnailUrl}
            onChange={setThumbnailUrl}
            uploadEndpoint="/api/upload/blog-image"
          />
        </div>

        {/* Rich Editor */}
        <div>
          <p className="mb-2 text-sm font-medium">
            Blog Content
          </p>

          <RichTextEditor
            value={content}
            onChange={setContent}
          />
        </div>

        <input
          name="category"
          placeholder="Category"
          className="w-full rounded-lg border p-3"
        />

        <input
          name="tags"
          placeholder="AI, Next.js, Web"
          className="w-full rounded-lg border p-3"
        />

        <input
          name="author"
          placeholder="Author"
          className="w-full rounded-lg border p-3"
        />

        <input
          type="number"
          name="reading_time"
          placeholder="Reading Time"
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

        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
            />

            Featured
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="published"
              defaultChecked
            />

            Published
          </label>
        </div>

        <button className="rounded-xl bg-black px-6 py-3 text-white">
          {loading
            ? "Creating..."
            : "Create Blog"}
        </button>
      </form>

      {/* Table */}
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
                Author
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
            {blogs.map((blog) => (
              <tr
                key={blog.id}
                className="border-t"
              >
                <td className="px-6 py-4">
                  <Image
                    src={
                      blog.thumbnail_url?.startsWith(
                        "http"
                      )
                        ? blog.thumbnail_url
                        : "/images/placeholder.png"
                    }
                    alt={blog.title}
                    width={80}
                    height={80}
                    className="h-[80px] w-[80px] rounded-lg object-cover"
                  />
                </td>

                <td className="px-6 py-4 font-medium">
                  {blog.title}
                </td>

                <td className="px-6 py-4">
                  {blog.category}
                </td>

                <td className="px-6 py-4">
                  {blog.author}
                </td>

                <td className="px-6 py-4">
                  {blog.featured
                    ? "Yes"
                    : "No"}
                </td>

                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/blogs/${blog.id}`}
                    >
                      <button className="rounded-lg bg-blue-500 px-4 py-2 text-white">
                        Edit
                      </button>
                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(
                          blog.id
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