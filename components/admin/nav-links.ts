import {
  LayoutDashboard,
  Briefcase,
  FolderKanban,
  Newspaper,
  CalendarDays,
  Store,
  BookOpen,
  FileText,
  Star,
  Settings,
} from "lucide-react";

export const navLinks = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Analytics",
    href: "/admin/stores/analytics",
    icon: Briefcase,
  },
  {
    title: "Services",
    href: "/admin/services",
    icon: Briefcase,
  },
  {
    title: "Portfolio",
    href: "/admin/portfolio",
    icon: FolderKanban,
  },
  {
    title: "Blogs",
    href: "/admin/blogs",
    icon: Newspaper,
  },
  {
    title: "Events",
    href: "/admin/events",
    icon: CalendarDays,
  },
  {
    title: "Stores",
    href: "/admin/stores",
    icon: Store,
  },
  {
    title: "Research",
    href: "/admin/research",
    icon: BookOpen,
  },
  {
    title: "Ebooks",
    href: "/admin/ebooks",
    icon: FileText,
  },
  {
    title: "Testimonials",
    href: "/admin/testimonials",
    icon: Star,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];