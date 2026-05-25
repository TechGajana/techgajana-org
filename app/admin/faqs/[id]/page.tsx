"use client";

import { useEffect, useState } from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import PageHeader from "@/components/admin/page-header";

export default function EditFaqPage() {
  const params = useParams();

  const router = useRouter();

  const [faq, setFaq] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  const [featured, setFeatured] =
    useState(false);

  const [active, setActive] =
    useState(true);

  async function fetchFaq() {
    try {
      const res = await fetch(
        "/api/faqs/list"
      );

      const data = await res.json();

      const found =
        data.faqs.find(
          (item: any) =>
            item.id === params.id
        );

      if (!found) return;

      setFaq(found);

      setFeatured(
        found.featured || false
      );

      setActive(
        found.active || true
      );
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchFaq();
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

      question:
        formData.get("question"),

      answer:
        formData.get("answer"),

      category:
        formData.get("category"),

      sort_order: Number(
        formData.get("sort_order")
      ),

      featured,

      active,
    };

    try {
      const res = await fetch(
        "/api/faqs/update",
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
          "/admin/faqs"
        );

        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (!faq) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Edit FAQ"
        description="Update FAQ details."
      />

      <form
        onSubmit={handleSubmit}
        className="mt-10 space-y-5 rounded-2xl border bg-white p-6"
      >
        <input
          name="question"
          defaultValue={faq.question}
          className="w-full rounded-lg border p-3"
        />

        <textarea
          name="answer"
          defaultValue={faq.answer}
          rows={5}
          className="w-full rounded-lg border p-3"
        />

        <input
          name="category"
          defaultValue={faq.category}
          className="w-full rounded-lg border p-3"
        />

        <input
          type="number"
          name="sort_order"
          defaultValue={
            faq.sort_order
          }
          className="w-full rounded-lg border p-3"
        />

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

          Featured FAQ
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
            : "Update FAQ"}
        </button>
      </form>
    </div>
  );
}