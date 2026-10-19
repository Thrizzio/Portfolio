import React from "react";
import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/client";
import { experiencesQuery } from "@/lib/sanity/queries";
import { StackGroups } from "@/components/about/StackGroups";
import { Timeline } from "@/components/about/Timeline";
import { ResumeBand } from "@/components/ui/ResumeBand";
import type { Experience } from "@/lib/sanity/types";

export const metadata: Metadata = {
  title: "About — Aadi",
  description:
    "Second-year CS undergrad building AI-powered products with Node.js, Next.js, Claude API, RAG, and Flutter.",
};

const FALLBACK_EXPERIENCES: Experience[] = [
  {
    _id: "exp-1",
    title: "[Role title]",
    organization: "[Organization]",
    type: "[Type]",
    startDate: "[Mon YYYY]",
    endDate: "Present",
    description: "[One sentence on what you did and shipped.]",
    kind: "work",
    order: 1,
  },
  {
    _id: "exp-2",
    title: "[Role title]",
    organization: "[Organization]",
    startDate: "[Mon YYYY]",
    endDate: "[Mon YYYY]",
    description: "[One sentence on what you did and shipped.]",
    kind: "work",
    order: 2,
  },
  {
    _id: "exp-3",
    title: "B.Tech, Computer Science",
    organization: "MIT ADT University",
    type: "2nd year · [Expected grad year]",
    startDate: "2nd year",
    endDate: "[Expected grad year]",
    description: "Undergraduate study focusing on AI/LLM engineering, data structures, and full-stack software development.",
    kind: "education",
    order: 3,
  },
];

export default async function AboutPage() {
  let experiences: Experience[] = [];
  try {
    experiences = await sanityFetch<Experience[]>({
      query: experiencesQuery,
      tags: ["experience"],
    });
  } catch (e) {
    console.error("Failed to fetch experiences:", e);
  }

  if (!experiences || experiences.length === 0) {
    experiences = FALLBACK_EXPERIENCES;
  }

  return (
    <div className="site-container pt-8 md:pt-14 pb-20">
      {/* Giant Page Title: lime text + pink period */}
      <h1
        className="font-extrabold tracking-[-0.05em] leading-[0.88] text-[#C8FF3D] select-none"
        style={{ fontSize: "clamp(64px, 12vw, 180px)" }}
      >
        Hi, I&apos;m Aadi<span className="text-[#FF5CA8]">.</span>
      </h1>

      {/* Intro Paragraphs */}
      <div className="mt-8 md:mt-12 max-w-4xl space-y-4">
        <p className="text-xl sm:text-2xl md:text-[28px] font-medium leading-[1.35] text-white">
          I&apos;m a second-year CS student who likes shipping things — mostly AI/LLM features on
          a Node and React stack. [Two honest lines about what you&apos;re learning and what you want
          to work on next.]
        </p>

        <p className="text-base sm:text-lg md:text-xl text-[#A89FC8] leading-relaxed max-w-3xl">
          Some of my projects started as vibe-coded experiments. On each one I say how much of the
          code I actually understand — so you know what you&apos;re getting.
        </p>
      </div>

      {/* 01 / STACK */}
      <StackGroups />

      {/* 02 / EXPERIENCE */}
      <Timeline experiences={experiences} />

      {/* Resume CTA Band */}
      <div className="mt-20 md:mt-28">
        <ResumeBand />
      </div>
    </div>
  );
}
