import Link from "next/link";
import { navLinks } from "./nav-links";

export default function Sidebar() {
  return (
    <aside className="hidden w-64 border-r bg-white lg:flex lg:flex-col">
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold">
          TechGajana
        </h1>
      </div>

      <nav className="flex flex-1 flex-col gap-2 p-4">
        {navLinks.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-gray-100"
            >
              <Icon size={20} />

              <span>{link.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}