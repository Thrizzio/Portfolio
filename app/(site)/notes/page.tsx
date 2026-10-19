import React from "react";
import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/client";
import { notesQuery } from "@/lib/sanity/queries";
import { NoteRow } from "@/components/notes/NoteRow";
import type { Note } from "@/lib/sanity/types";

export const metadata: Metadata = {
  title: "Notes — Aadi",
  description:
    "Short notes on things I'm building, breaking and learning — RAG, agents, evals, and the occasional mistake.",
};

const FALLBACK_NOTES: Note[] = [
  {
    _id: "note-1",
    title: "[Note title goes here]",
    slug: { current: "note-title-goes-here-1" },
    publishedAt: "[DATE]",
    tag: "[TAG]",
    hook: "[One-line hook that makes someone click.]",
    accent: "lime",
    featured: true,
  },
  {
    _id: "note-2",
    title: "[Note title goes here]",
    slug: { current: "note-title-goes-here-2" },
    publishedAt: "[DATE]",
    tag: "[TAG]",
    hook: "[One-line hook that makes someone click.]",
    accent: "pink",
    featured: false,
  },
  {
    _id: "note-3",
    title: "[Note title goes here]",
    slug: { current: "note-title-goes-here-3" },
    publishedAt: "[DATE]",
    tag: "[TAG]",
    hook: "[One-line hook that makes someone click.]",
    accent: "blue",
    featured: false,
  },
];

export default async function NotesPage() {
  let notes: Note[] = [];
  try {
    notes = await sanityFetch<Note[]>({
      query: notesQuery,
      tags: ["notes"],
    });
  } catch (e) {
    console.error("Failed to fetch notes:", e);
  }

  if (!notes || notes.length === 0) {
    notes = FALLBACK_NOTES;
  }

  return (
    <div className="site-container pt-8 md:pt-14 pb-24">
      <div className="max-w-[880px] mx-auto">
        {/* Header Section */}
        <div className="text-center">
          <h1
            className="font-extrabold tracking-[-0.05em] leading-[0.88] text-[#C8FF3D] select-none"
            style={{ fontSize: "clamp(64px, 14vw, 170px)" }}
          >
            Notes<span className="text-[#FF5CA8]">.</span>
          </h1>

          <p className="mt-6 md:mt-8 text-lg sm:text-xl md:text-2xl font-medium text-[#D9D2F2] max-w-xl mx-auto leading-snug">
            Things I&apos;m learning and building — RAG, agents, evals, and the occasional mistake.
          </p>
        </div>

        {/* List of Notes */}
        <div className="mt-12 md:mt-16 space-y-4 md:space-y-5">
          {notes.map((note) => (
            <NoteRow key={note._id} note={note} />
          ))}
        </div>

        {/* Footer caption */}
        <p className="mt-16 md:mt-20 text-center font-mono text-xs sm:text-[13px] text-[#A89FC8]/60">
          Written in the CMS &rarr; appears here automatically
        </p>
      </div>
    </div>
  );
}
