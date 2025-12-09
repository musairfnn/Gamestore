import Link from "next/link";
import { LayoutDashboard, Tag } from "lucide-react";

export default function AdminSidebar() {
  return (
    <aside className="w-60 bg-white border-r p-4 shadow min-h-screen">
      <h1 className="text-xl font-semibold mb-6">Admin Panel</h1>

      <nav className="flex flex-col gap-4">
        <Link href="/Dashboard" className="flex items-center gap-2">
          <LayoutDashboard size={20} />
          Pendapatan
        </Link>

        <Link href="/promo" className="flex items-center gap-2">
          <Tag size={20} />
          Promo
        </Link>
      </nav>
    </aside>
  );
}
