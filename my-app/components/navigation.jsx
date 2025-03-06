"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Users", href: "/users" },
  { name: "Analytics", href: "/analytics" },
  { name: "Settings", href: "/settings" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md",
            pathname === item.href
              ? "text-foreground bg-primary/10 font-semibold"
              : "text-muted-foreground"
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
