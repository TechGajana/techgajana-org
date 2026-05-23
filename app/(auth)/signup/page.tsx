import { signup } from "@/lib/actions/auth-actions";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <form
        action={signup}
        className="flex w-full max-w-md flex-col gap-4 rounded-xl border p-6"
      >
        <h1 className="text-2xl font-bold">Signup</h1>

        <input
          name="name"
          type="text"
          placeholder="Name"
          className="rounded-md border p-3"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="rounded-md border p-3"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="rounded-md border p-3"
          required
        />

        <button className="rounded-md bg-black p-3 text-white">
          Create Account
        </button>
      </form>
    </main>
  );
}