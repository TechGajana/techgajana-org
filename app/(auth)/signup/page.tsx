"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    setError("");

    const formData = new FormData(
      e.currentTarget
    );

    const body = {
      name: formData.get("name"),

      email: formData.get("email"),

      password:
        formData.get("password"),
    };

    try {
      const res = await fetch(
        "/api/auth/signup",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(body),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      router.push("/login");
    } catch (error) {
      setError("Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-4 rounded-2xl border bg-white p-6 shadow-sm"
      >
        <h1 className="text-3xl font-bold">
          Create Account
        </h1>

        <input
          name="name"
          placeholder="Full Name"
          required
          className="rounded-lg border p-3"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          className="rounded-lg border p-3 outline-none focus:border-black"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="rounded-lg border p-3 outline-none focus:border-black"
        />

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        <button className="rounded-lg bg-black p-3 text-white transition hover:opacity-90">
          {loading
            ? "Creating..."
            : "Create Account"}
        </button>
      </form>
    </main>
  );
}