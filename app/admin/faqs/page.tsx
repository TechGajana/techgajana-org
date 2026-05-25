"use client";

import { useEffect, useState } from "react";

import PageHeader from "@/components/admin/page-header";

import FaqsTable from "@/components/admin/faqs-table";

export default function FaqsPage() {
  const [faqs, setFaqs] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [featured, setFeatured] =
    useState(false);

  const [active, setActive] =
    useState(true);

  async function fetchFaqs() {
    try {
      const res = await fetch(
        "/api/faqs/list"
      );

      const data = await res.json();

      setFaqs(data.faqs || []);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchFaqs();
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
        "/api/faqs/create",
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

        setFeatured(false);

        setActive(true);

        fetchFaqs();
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
        title="FAQs"
        description="Manage all FAQs here."
      />

      {/* CREATE FORM */}
      <form
        onSubmit={handleSubmit}
        className="mt-10 space-y-5 rounded-2xl border bg-white p-6"
      >
        <input
          name="question"
          placeholder="Question"
          className="w-full rounded-lg border p-3"
          required
        />

        <textarea
          name="answer"
          placeholder="Answer"
          className="w-full rounded-lg border p-3"
          rows={5}
          required
        />

        <input
          name="category"
          placeholder="Category"
          className="w-full rounded-lg border p-3"
        />

        <input
          type="number"
          name="sort_order"
          placeholder="Sort Order"
          defaultValue={0}
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
            ? "Creating..."
            : "Create FAQ"}
        </button>
      </form>

      {/* TABLE */}
      <FaqsTable
        faqs={faqs}
        fetchFaqs={fetchFaqs}
      />
    </div>
  );
}