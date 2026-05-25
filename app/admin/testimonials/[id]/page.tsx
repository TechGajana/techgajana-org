"use client";

import { useEffect, useState } from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import ImageUpload from "@/components/admin/image-upload";

import PageHeader from "@/components/admin/page-header";

export default function EditTestimonialPage() {
  const params = useParams();

  const router = useRouter();

  const [testimonial, setTestimonial] =
    useState<any>(null);

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

  async function fetchTestimonial() {
    try {
      const res = await fetch(
        "/api/testimonials/list"
      );

      const data = await res.json();

      const found =
        data.testimonials.find(
          (item: any) =>
            item.id === params.id
        );

      if (!found) return;

      setTestimonial(found);

      setClientImage(
        found.client_image || ""
      );

      setFeatured(
        found.featured || false
      );

      setActive(
        found.active || true
      );

      setRating(found.rating || 5);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchTestimonial();
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
        "/api/testimonials/update",
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
          "/admin/testimonials"
        );

        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (!testimonial) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Edit Testimonial"
        description="Update testimonial details."
      />

      <form
        onSubmit={handleSubmit}
        className="mt-10 space-y-5 rounded-2xl border bg-white p-6"
      >
        <input
          name="client_name"
          defaultValue={
            testimonial.client_name
          }
          className="w-full rounded-lg border p-3"
        />

        <input
          name="company_name"
          defaultValue={
            testimonial.company_name
          }
          className="w-full rounded-lg border p-3"
        />

        <textarea
          name="review_text"
          defaultValue={
            testimonial.review_text
          }
          className="w-full rounded-lg border p-3"
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

          Featured
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
            ? "Updating..."
            : "Update Testimonial"}
        </button>
      </form>
    </div>
  );
}