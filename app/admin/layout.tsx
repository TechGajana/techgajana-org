import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { getUser } from "@/lib/auth/get-user";

import Sidebar from "@/components/admin/sidebar";
import Navbar from "@/components/admin/navbar";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Navbar />

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}