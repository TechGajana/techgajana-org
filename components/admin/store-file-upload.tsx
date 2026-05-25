"use client";

import { useState } from "react";

interface Props {
  value: string;

  onChange: (url: string) => void;
}

export default function StoreFileUpload({
  value,
  onChange,
}: Props) {
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

    try {
      const res = await fetch(
        "/api/upload/store-file",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.path) {
        onChange(data.path);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      <input
        type="file"
        accept=".zip,.rar,.7z"
        onChange={handleUpload}
        className="w-full rounded-lg border p-3"
      />

      {uploading && (
        <p className="text-sm text-gray-500">
          Uploading...
        </p>
      )}

      {value && (
        <div className="rounded-lg border bg-green-50 p-3 text-sm">
          ✅ File uploaded successfully
        </div>
      )}
    </div>
  );
}