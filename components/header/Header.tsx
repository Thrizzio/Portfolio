"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, FileText } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";
import type { SiteSettings } from "@/lib/sanity/types";

interface HeaderProps {
  siteSettings?: SiteSettings | null;
}

export function Header({ siteSettings }: HeaderProps) {
  const pathname = usePathname();

  const isWork = pathname === "/" || pathname.startsWith("/work");
  const isAbout = pathname.startsWith("/about");
  const isNotes = pathname.startsWith("/notes");

  const githubUrl = siteSettings?.github || "https://github.com";
  const linkedinUrl = siteSettings?.linkedin || "https://linkedin.com";
  const email = siteSettings?.email || "you@example.com";

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0F0B1E]/88 backdrop-blur-md border-b border-white/[0.09]">
      <div className="site-container py-3 flex items-center justify-between gap-4">
        {/* Left: Wordmark */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-[32px] font-extrabold tracking-[-0.05em] text-[#F4F0FF] hover:opacity-90 transition-opacity flex items-baseline"
          >
            Aadi<span className="text-[#C8FF3D]">.</span>
          </Link>

          {/* Centre-left: Desktop Nav links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-1 text-[17px] font-medium"
          >
            <Link
              href="/"
              className={`px-[18px] py-[9px] rounded-full transition-all duration-200 ${
                isWork
                  ? "bg-[#C8FF3D] text-[#17112B] font-bold shadow-[0_0_12px_rgba(200,255,61,0.25)]"
                  : "text-[#D9D2F2] hover:text-white hover:bg-white/5"
              }`}
            >
              Work
            </Link>
            <Link
              href="/about"
              className={`px-[18px] py-[9px] rounded-full transition-all duration-200 ${
                isAbout
                  ? "bg-[#C8FF3D] text-[#17112B] font-bold shadow-[0_0_12px_rgba(200,255,61,0.25)]"
                  : "text-[#D9D2F2] hover:text-white hover:bg-white/5"
              }`}
            >
              About
            </Link>
            <Link
              href="/notes"
              className={`px-[18px] py-[9px] rounded-full transition-all duration-200 ${
                isNotes
                  ? "bg-[#C8FF3D] text-[#17112B] font-bold shadow-[0_0_12px_rgba(200,255,61,0.25)]"
                  : "text-[#D9D2F2] hover:text-white hover:bg-white/5"
              }`}
            >
              Notes
            </Link>
            <a
              href="#contact"
              className="px-[18px] py-[9px] rounded-full text-[#D9D2F2] hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              Contact
            </a>
          </nav>
        </div>

        {/* Right: Icon buttons & Resume */}
        <div className="flex items-center gap-2.5">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="w-11 h-11 rounded-full border border-white/18 flex items-center justify-center text-[#D9D2F2] hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-200"
          >
            <GitHubIcon className="w-5 h-5" />
          </a>

          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="w-11 h-11 rounded-full border border-white/18 flex items-center justify-center text-[#D9D2F2] hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-200"
          >
            <LinkedInIcon className="w-5 h-5" />
          </a>

          <a
            href={`mailto:${email}`}
            aria-label="Send email"
            className="w-11 h-11 rounded-full border border-white/18 flex items-center justify-center text-[#D9D2F2] hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-200"
          >
            <Mail className="w-5 h-5" />
          </a>

          <Link
            href="/resume"
            className="hidden sm:inline-flex items-center gap-2 border-[1.5px] border-[#FF5CA8] text-[#FF8FC4] hover:bg-[#FF5CA8]/15 px-5 py-2.5 rounded-full font-medium text-base transition-all duration-200"
          >
            <FileText className="w-4 h-4 text-[#FF5CA8]" />
            <span>Resume</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
