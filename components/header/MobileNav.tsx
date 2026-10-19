"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

export function MobileNav() {
  const pathname = usePathname();

  const isWork = pathname === "/" || pathname.startsWith("/work");
  const isAbout = pathname.startsWith("/about");
  const isNotes = pathname.startsWith("/notes");
  const isResume = pathname.startsWith("/resume");

  const navItems = [
    { label: "Work", href: "/", active: isWork },
    { label: "About", href: "/about", active: isAbout },
    { label: "Notes", href: "/notes", active: isNotes },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-[#1A1433]/92 backdrop-blur-lg border border-white/15 rounded-full p-1.5 flex items-center gap-1 shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
    >
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
            item.active
              ? "bg-[#C8FF3D] text-[#17112B] shadow-[0_0_12px_rgba(200,255,61,0.3)]"
              : "text-[#D9D2F2] hover:text-white"
          }`}
        >
          {item.label}
        </Link>
      ))}

      <Link
        href="/resume"
        className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
          isResume
            ? "bg-[#FF5CA8] text-[#17112B] border-[#FF5CA8]"
            : "border-[#FF5CA8] text-[#FF8FC4] hover:bg-[#FF5CA8]/15"
        }`}
      >
        <span>Resume</span>
        <ArrowUpRight className="w-3.5 h-3.5" />
      </Link>
    </nav>
  );
}
