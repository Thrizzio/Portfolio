import React from "react";
import Link from "next/link";
import type { Note, AccentColor } from "@/lib/sanity/types";

interface NoteRowProps {
  note: Note;
}

const ACCENT_COLORS: Record<AccentColor, { text: string; bg: string; border: string }> = {
  lime: { text: "text-[#C8FF3D]", bg: "bg-[#C8FF3D]", border: "hover:border-[#C8FF3D]/50" },
  pink: { text: "text-[#FF5CA8]", bg: "bg-[#FF5CA8]", border: "hover:border-[#FF5CA8]/50" },
  blue: { text: "text-[#7C8BFF]", bg: "bg-[#7C8BFF]", border: "hover:border-[#7C8BFF]/50" },
  orange: { text: "text-[#FF9248]", bg: "bg-[#FF9248]", border: "hover:border-[#FF9248]/50" },
  lilac: { text: "text-[#B8A4FF]", bg: "bg-[#B8A4FF]", border: "hover:border-[#B8A4FF]/50" },
};

function formatDate(dateString: string): string {
  if (!dateString) return "[DATE]";
  if (dateString.includes("[DATE]")) return dateString;
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return dateString;
  }
}

export function NoteRow({ note }: NoteRowProps) {
  const accent = ACCENT_COLORS[note.accent] || ACCENT_COLORS.lime;
  const dateStr = formatDate(note.publishedAt);

  return (
    <Link
      href={`/notes/${note.slug.current}`}
      className={`group block p-6 sm:p-8 rounded-[26px] bg-[#1A1433] border border-white/10 ${accent.border} transition-all duration-200 hover:translate-x-2`}
    >
      <div className="flex items-center justify-between gap-6">
        {/* Left Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 font-mono text-[13px] tracking-wider uppercase">
            <span className={accent.text}>{dateStr}</span>
            <span className="text-[#A89FC8]">·</span>
            <span className={accent.text}>{note.tag || "[TAG]"}</span>
          </div>

          <h2 className="mt-2 text-2xl sm:text-[28px] font-bold text-white tracking-tight group-hover:text-white transition-colors">
            {note.title}
          </h2>

          <p className="mt-2 text-base text-[#D9D2F2]/80 leading-relaxed line-clamp-2">
            {note.hook}
          </p>
        </div>

        {/* Right Big Solid Colored Circle */}
        <div
          className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex-shrink-0 ${accent.bg} transition-transform duration-200 group-hover:scale-105`}
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
