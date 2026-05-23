import {
  Briefcase,
  Newspaper,
  FolderKanban,
  Users,
} from "lucide-react";

import DashboardCard from "@/components/admin/dashboard-card";

export default function DashboardPage() {
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Welcome back to TechGajana Admin Panel
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title="Services"
          value="12"
          icon={<Briefcase />}
        />

        <DashboardCard
          title="Blogs"
          value="24"
          icon={<Newspaper />}
        />

        <DashboardCard
          title="Portfolio"
          value="18"
          icon={<FolderKanban />}
        />

        <DashboardCard
          title="Users"
          value="154"
          icon={<Users />}
        />
      </div>
    </div>
  );
}