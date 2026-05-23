import { getProfile } from "@/lib/auth/get-profile";

export default async function Navbar() {
  const profile = await getProfile();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <h2 className="text-xl font-semibold">
        Admin Dashboard
      </h2>

      <div className="flex items-center gap-3">
        <div className="flex flex-col text-right">
          <span className="font-medium">
            {profile?.name}
          </span>

          <span className="text-sm text-gray-500">
            {profile?.role}
          </span>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
          {profile?.name?.charAt(0)}
        </div>
      </div>
    </header>
  );
}