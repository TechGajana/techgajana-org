"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import ImageUpload from "@/components/admin/image-upload";

import RichTextEditor from "@/components/admin/rich-text-editor";

export default function EditBlogPage() {
  const params = useParams();

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [blog, setBlog] =
    useState<any>(null);

  const [thumbnailUrl, setThumbnailUrl] =
    useState("");

  const [content, setContent] =
    useState("");

  async function fetchBlog() {
    try {
      const res = await fetch(
        "/api/blogs/list"
      );

      const data = await res.json();

      const foundBlog =
        data.blogs.find(
          (b: any) =>
            b.id === params.id
        );

      setBlog(foundBlog);

      setThumbnailUrl(
        foundBlog.thumbnail_url || ""
      );

      setContent(
        foundBlog.content || ""
      );
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchBlog();
  }, []);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(
      e.currentTarget
    );

    const body = {
      id: params.id,

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
        "/api/blogs/update",
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
          "/admin/blogs"
        );

        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (!blog) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">
        Edit Blog
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-10 space-y-4 rounded-2xl border bg-white p-6"
      >
        <input
          name="title"
          defaultValue={blog.title}
          className="w-full rounded-lg border p-3"
        />

        <input
          name="slug"
          defaultValue={blog.slug}
          className="w-full rounded-lg border p-3"
        />

        <textarea
          name="excerpt"
          defaultValue={blog.excerpt}
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

        {/* Content */}
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
          defaultValue={blog.category}
          className="w-full rounded-lg border p-3"
        />

        <input
          name="tags"
          defaultValue={
            blog.tags?.join(", ") || ""
          }
          className="w-full rounded-lg border p-3"
        />

        <input
          name="author"
          defaultValue={blog.author}
          className="w-full rounded-lg border p-3"
        />

        <input
          type="number"
          name="reading_time"
          defaultValue={
            blog.reading_time
          }
          className="w-full rounded-lg border p-3"
        />

        <input
          name="seo_title"
          defaultValue={
            blog.seo_title
          }
          className="w-full rounded-lg border p-3"
        />

        <textarea
          name="seo_description"
          defaultValue={
            blog.seo_description
          }
          className="w-full rounded-lg border p-3"
        />

        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={
                blog.featured
              }
            />

            Featured
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="published"
              defaultChecked={
                blog.published
              }
            />

            Published
          </label>
        </div>

        <button className="rounded-xl bg-black px-6 py-3 text-white">
          {loading
            ? "Updating..."
            : "Update Blog"}
        </button>
      </form>
    </div>
  );
}