import { login } from "@/lib/actions/auth-actions";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <form
        action={login}
        className="flex w-full max-w-md flex-col gap-4 rounded-xl border p-6"
      >
        <h1 className="text-2xl font-bold">Login</h1>

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
          Login
        </button>
      </form>
    </main>
  );
}