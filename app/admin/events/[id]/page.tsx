"use client";

import { useEffect, useState } from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import ImageUpload from "@/components/admin/image-upload";

import RichTextEditor from "@/components/admin/rich-text-editor";

import SeoFields from "@/components/admin/seo-fields";

import PageHeader from "@/components/admin/page-header";

export default function EditEventPage() {
  const params = useParams();

  const router = useRouter();

  const [event, setEvent] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  const [bannerUrl, setBannerUrl] =
    useState("");

  const [content, setContent] =
    useState("");

  const [featured, setFeatured] =
    useState(false);

  async function fetchEvent() {
    try {
      const res = await fetch(
        "/api/events/list"
      );

      const data = await res.json();

      const foundEvent =
        data.events.find(
          (item: any) =>
            item.id === params.id
        );

      if (!foundEvent) return;

      setEvent(foundEvent);

      setBannerUrl(
        foundEvent.banner_url || ""
      );

      setContent(
        foundEvent.full_description ||
          ""
      );

      setFeatured(
        foundEvent.featured || false
      );
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchEvent();
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

      short_description:
        formData.get(
          "short_description"
        ),

      full_description: content,

      banner_url: bannerUrl,

      location:
        formData.get("location"),

      event_date:
        formData.get("event_date"),

      event_time:
        formData.get("event_time"),

      registration_link:
        formData.get(
          "registration_link"
        ),

      status:
        formData.get("status"),

      featured,

      seo_title:
        formData.get("seo_title"),

      seo_description:
        formData.get(
          "seo_description"
        ),
    };

    try {
      const res = await fetch(
        "/api/events/update",
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
          "/admin/events"
        );

        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (!event) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Edit Event"
        description="Update your event details."
      />

      <form
        onSubmit={handleSubmit}
        className="mt-10 space-y-5 rounded-2xl border bg-white p-6"
      >
        <input
          name="title"
          defaultValue={event.title}
          className="w-full rounded-lg border p-3"
        />

        <input
          name="slug"
          defaultValue={event.slug}
          className="w-full rounded-lg border p-3"
        />

        <textarea
          name="short_description"
          defaultValue={
            event.short_description
          }
          className="w-full rounded-lg border p-3"
        />

        {/* Banner Upload */}
        <div>
          <p className="mb-2 text-sm font-medium">
            Event Banner
          </p>

          <ImageUpload
            value={bannerUrl}
            onChange={setBannerUrl}
            uploadEndpoint="/api/upload/event-banner"
          />
        </div>

        {/* Full Description */}
        <div>
          <p className="mb-2 text-sm font-medium">
            Full Description
          </p>

          <RichTextEditor
            value={content}
            onChange={setContent}
          />
        </div>

        <input
          name="location"
          defaultValue={event.location}
          className="w-full rounded-lg border p-3"
        />

        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="date"
            name="event_date"
            defaultValue={
              event.event_date
            }
            className="w-full rounded-lg border p-3"
          />

          <input
            type="time"
            name="event_time"
            defaultValue={
              event.event_time
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <input
          name="registration_link"
          defaultValue={
            event.registration_link
          }
          className="w-full rounded-lg border p-3"
        />

        <select
          name="status"
          defaultValue={event.status}
          className="w-full rounded-lg border p-3"
        >
          <option value="upcoming">
            Upcoming
          </option>

          <option value="completed">
            Completed
          </option>

          <option value="cancelled">
            Cancelled
          </option>
        </select>

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

          Featured Event
        </label>

        {/* SEO */}
        <SeoFields
          seoTitle={event.seo_title}
          seoDescription={
            event.seo_description
          }
        />

        <button className="rounded-xl bg-black px-6 py-3 text-white">
          {loading
            ? "Updating..."
            : "Update Event"}
        </button>
      </form>
    </div>
  );
}