"use client";

import Image from "next/image";

import {
  useRef,
  useState,
} from "react";

interface Props {
  value: string;

  onChange: (
    value: string
  ) => void;
}

export default function ImageUpload({
  value,
  onChange,
}: Props) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const [uploading, setUploading] =
    useState(false);

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      e.target.files?.[0];

    if (!file) return;

    setUploading(true);

    const formData = new FormData();

    formData.append("file", file);

    const res = await fetch(
      "/api/upload/service-image",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (data.url) {
      onChange(data.url);
    }

    setUploading(false);
  }

  return (
    <div className="space-y-4">
      {value && (
        <Image
          src={value}
          alt="Preview"
          width={300}
          height={200}
          className="rounded-xl object-cover"
        />
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />

      <button
        type="button"
        onClick={() =>
          inputRef.current?.click()
        }
        className="rounded-lg bg-blue-600 px-4 py-2 text-white"
      >
        {uploading
          ? "Uploading..."
          : "Upload Image"}
      </button>
    </div>
  );
}