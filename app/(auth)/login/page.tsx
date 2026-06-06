"use client";

import { useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

export default function LoginPage() {

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


    const formData =
      new FormData(e.currentTarget);


    const body = {

      email:
        formData.get("email"),

      password:
        formData.get("password"),

    };


    try {

      const res = await fetch(
        "/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify(body),
        }
      );


      const data =
        await res.json();



      if (!res.ok) {

        setError(data.error);

        return;

      }



      if (data.role === "admin") {

        router.push(
          "/admin/dashboard"
        );

      } else {

        router.push(
          "/dashboard"
        );

      }



    } catch (error) {

      setError(
        "Login failed"
      );


    } finally {

      setLoading(false);

    }

  }



  return (

    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">


      <form

        onSubmit={handleSubmit}

        className="
        flex w-full max-w-md flex-col gap-4
        rounded-2xl border bg-white p-6 shadow-sm
        "

      >


        <h1 className="text-3xl font-bold">
          Login
        </h1>


        <p className="text-sm text-gray-500">
          Welcome back to TechGajana
        </p>



        <input

          type="email"

          name="email"

          placeholder="Email Address"

          required

          className="
          rounded-lg border p-3 outline-none
          focus:border-black
          "

        />



        <input

          type="password"

          name="password"

          placeholder="Password"

          required

          className="
          rounded-lg border p-3 outline-none
          focus:border-black
          "

        />


        {/* FORGOT PASSWORD */}

        <div className="flex justify-end">

          <Link

            href="/forgot-password"

            className="
            text-sm text-blue-600
            hover:underline
            "

          >

            Forgot Password?

          </Link>


        </div>



        {error && (

          <p className="text-sm text-red-500">

            {error}

          </p>

        )}



        <button

          className="
          rounded-lg bg-black p-3 text-white
          transition hover:opacity-90
          "

        >

          {
            loading
              ? "Logging in..."
              : "Login"
          }


        </button>




        <p className="text-center text-sm text-gray-500">

          Don&apos;t have an account?{" "}


          <Link

            href="/signup"

            className="
            font-medium text-black
            "

          >

            Signup

          </Link>


        </p>



      </form>


    </main>

  );

}