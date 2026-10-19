import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { sanityFetch } from "@/lib/sanity/client";
import { noteBySlugQuery, noteSlugsQuery } from "@/lib/sanity/queries";
import { PortableTextRenderer } from "@/components/notes/PortableTextRenderer";
import { ResumeBand } from "@/components/ui/ResumeBand";
import type { Note, AccentColor, PortableTextBlock } from "@/lib/sanity/types";


interface NotePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await sanityFetch<{ slug: string }[]>({
      query: noteSlugsQuery,
      tags: ["notes"],
    });
    return slugs.map((item) => ({ slug: item.slug }));
  } catch (e) {
    console.error("Failed to fetch note slugs:", e);
    return [];
  }
}

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = await sanityFetch<Note | null>({
    query: noteBySlugQuery,
    params: { slug },
    tags: ["notes", `note:${slug}`],
  }).catch(() => null);

  if (!note) {
    return { title: "Note Not Found — Aadi" };
  }

  return {
    title: `${note.title} — Aadi`,
    description: note.hook,
  };
}

const ACCENT_PERIOD_COLORS: Record<AccentColor, string> = {
  lime: "text-[#C8FF3D]",
  pink: "text-[#FF5CA8]",
  blue: "text-[#7C8BFF]",
  orange: "text-[#FF9248]",
  lilac: "text-[#B8A4FF]",
};

function calculateReadingTime(blocks?: PortableTextBlock[]): string {
  if (!blocks || blocks.length === 0) return "2 min read";
  let wordCount = 0;
  for (const block of blocks) {
    if (block.children) {
      for (const child of block.children) {
        if (child.text) {
          wordCount += child.text.split(/\s+/).filter(Boolean).length;
        }
      }
    }
  }
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
}

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

interface NoteDetail extends Note {
  prevNote?: { title: string; slug: { current: string }; accent: AccentColor };
  nextNote?: { title: string; slug: { current: string }; accent: AccentColor };
}

export default async function NoteDetailPage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = await sanityFetch<NoteDetail | null>({
    query: noteBySlugQuery,
    params: { slug },
    tags: ["notes", `note:${slug}`],
  }).catch(() => null);

  if (!note) {
    notFound();
  }

  const periodColor = ACCENT_PERIOD_COLORS[note.accent] || "text-[#C8FF3D]";
  const readingTime = calculateReadingTime(note.body);
  const dateFormatted = formatDate(note.publishedAt);

  return (
    <article className="site-container pt-8 md:pt-14 pb-20">
      <div className="max-w-[720px] mx-auto">
        {/* Back Link */}
        <Link
          href="/notes"
          className="inline-flex items-center gap-2 font-mono text-[13px] tracking-wider uppercase text-[#A89FC8] hover:text-[#C8FF3D] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All notes</span>
        </Link>

        {/* Metadata row: Date, Tag pill, Reading time */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs md:text-[13px] text-[#A89FC8] mb-6">
          <span>{dateFormatted}</span>
          <span>·</span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/10 uppercase tracking-wider text-white">
            {note.tag || "[TAG]"}
          </span>
          <span>·</span>
          <span>{readingTime}</span>
        </div>

        {/* Title */}
        <h1
          className="font-extrabold tracking-tight leading-[1.05] text-white"
          style={{ fontSize: "clamp(36px, 5vw, 60px)" }}
        >
          {note.title}
          <span className={periodColor}>.</span>
        </h1>

        {/* Hook */}
        <p className="mt-6 text-xl md:text-2xl font-medium text-[#D9D2F2] leading-relaxed italic border-b border-white/10 pb-8">
          {note.hook}
        </p>

        {/* Body content */}
        <div className="mt-8">
          {note.body && note.body.length > 0 ? (
            <PortableTextRenderer value={note.body} />
          ) : (
            <p className="text-base text-[#D9D2F2]/70 italic my-6">
              [Note content in progress. Written in the CMS and synced automatically.]
            </p>
          )}
        </div>

        {/* Prev / Next Note Navigation */}
        <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {note.prevNote ? (
            <Link
              href={`/notes/${note.prevNote.slug.current}`}
              className="p-5 rounded-[20px] bg-[#1A1433] border border-white/10 hover:border-[#C8FF3D]/50 transition-all duration-200 group flex flex-col justify-between"
            >
              <div className="flex items-center gap-1.5 font-mono text-xs text-[#A89FC8] uppercase">
                <ArrowLeft className="w-3.5 h-3.5 text-[#C8FF3D] group-hover:-translate-x-1 transition-transform" />
                <span>Previous Note</span>
              </div>
              <p className="mt-2 text-base font-bold text-white group-hover:text-[#C8FF3D] transition-colors line-clamp-1">
                {note.prevNote.title}
              </p>
            </Link>
          ) : (
            <div />
          )}

          {note.nextNote ? (
            <Link
              href={`/notes/${note.nextNote.slug.current}`}
              className="p-5 rounded-[20px] bg-[#1A1433] border border-white/10 hover:border-[#C8FF3D]/50 transition-all duration-200 group flex flex-col justify-between text-right"
            >
              <div className="flex items-center justify-end gap-1.5 font-mono text-xs text-[#A89FC8] uppercase">
                <span>Next Note</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C8FF3D] group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="mt-2 text-base font-bold text-white group-hover:text-[#C8FF3D] transition-colors line-clamp-1">
                {note.nextNote.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Resume CTA Band */}
        <div className="mt-16">
          <ResumeBand />
        </div>
      </div>
    </article>
  );
}
