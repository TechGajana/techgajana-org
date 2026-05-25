"use client";

import { useEffect, useState } from "react";

import TestimonialsTable from "@/components/admin/testimonials-table";

import ImageUpload from "@/components/admin/image-upload";

import PageHeader from "@/components/admin/page-header";

import SeoFields from "@/components/admin/seo-fields";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [clientImage, setClientImage] =
    useState("");

  const [featured, setFeatured] =
    useState(false);

  const [active, setActive] =
    useState(true);

  const [rating, setRating] =
    useState(5);

  async function fetchTestimonials() {
    try {
      const res = await fetch(
        "/api/testimonials/list"
      );

      const data = await res.json();

      setTestimonials(
        data.testimonials || []
      );
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const form =
      e.currentTarget;

    const formData = new FormData(form);

    const body = {
      client_name:
        formData.get("client_name"),

      company_name:
        formData.get("company_name"),

      review_text:
        formData.get("review_text"),

      client_image: clientImage,

      rating,

      featured,

      active,
    };

    try {
      const res = await fetch(
        "/api/testimonials/create",
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

        setClientImage("");

        setFeatured(false);

        setActive(true);

        setRating(5);

        fetchTestimonials();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <PageHeader
        title="Testimonials"
        description="Manage all testimonials here."
      />

      {/* CREATE FORM */}
      <form
        onSubmit={handleSubmit}
        className="mt-10 space-y-5 rounded-2xl border bg-white p-6"
      >
        <input
          name="client_name"
          placeholder="Client Name"
          className="w-full rounded-lg border p-3"
          required
        />

        <input
          name="company_name"
          placeholder="Company Name"
          className="w-full rounded-lg border p-3"
        />

        <textarea
          name="review_text"
          placeholder="Review Text"
          className="w-full rounded-lg border p-3"
          required
        />

        {/* IMAGE */}
        <div>
          <p className="mb-2 text-sm font-medium">
            Client Image
          </p>

          <ImageUpload
            value={clientImage}
            onChange={setClientImage}
            uploadEndpoint="/api/upload/testimonial-image"
          />
        </div>

        {/* RATING */}
        <div>
          <p className="mb-2 text-sm font-medium">
            Rating
          </p>

          <select
            value={rating}
            onChange={(e) =>
              setRating(
                Number(e.target.value)
              )
            }
            className="w-full rounded-lg border p-3"
          >
            <option value={1}>
              ⭐ 1
            </option>

            <option value={2}>
              ⭐⭐ 2
            </option>

            <option value={3}>
              ⭐⭐⭐ 3
            </option>

            <option value={4}>
              ⭐⭐⭐⭐ 4
            </option>

            <option value={5}>
              ⭐⭐⭐⭐⭐ 5
            </option>
          </select>
        </div>

        {/* FEATURED */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) =>
              setFeatured(
                e.target.checked
              )
            }
          />

          Featured Testimonial
        </label>

        {/* ACTIVE */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={active}
            onChange={(e) =>
              setActive(
                e.target.checked
              )
            }
          />

          Active
        </label>

        <button className="rounded-xl bg-black px-6 py-3 text-white">
          {loading
            ? "Creating..."
            : "Create Testimonial"}
        </button>
      </form>

      {/* TABLE */}
      <TestimonialsTable
        testimonials={testimonials}
        fetchTestimonials={
          fetchTestimonials
        }
      />
    </div>
  );
}