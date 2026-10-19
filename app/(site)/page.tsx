import React, { Suspense } from "react";
import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/client";
import { projectsQuery, rolesQuery } from "@/lib/sanity/queries";
import { FilterBar } from "@/components/work/FilterBar";
import { ResumeBand } from "@/components/ui/ResumeBand";
import type { Project, Role } from "@/lib/sanity/types";

export const metadata: Metadata = {
  title: "Work — Aadi",
  description:
    "Explore projects built by Aadi: AI/LLM products, full-stack architectures, and honest knowledge checks.",
};

export default async function WorkPage() {
  const [projects, roles] = await Promise.all([
    sanityFetch<Project[]>({
      query: projectsQuery,
      tags: ["projects"],
    }).catch(() => []),
    sanityFetch<Role[]>({
      query: rolesQuery,
      tags: ["role"],
    }).catch(() => []),
  ]);

  return (
    <div className="site-container pt-8 md:pt-16 pb-12">
      {/* Hero Section */}
      <section className="mb-10 md:mb-14">
        <p className="font-mono text-xs md:text-[13px] tracking-[0.14em] uppercase text-[#A89FC8] mb-4">
          HI, I&apos;M AADI — CS UNDERGRAD BUILDING AI-POWERED PRODUCTS
        </p>

        <h1 className="giant-title text-[#C8FF3D] mb-4">
          Work<span className="text-[#FF5CA8]">.</span>
        </h1>

        <p className="text-lg md:text-[20px] text-[#D9D2F2] max-w-2xl font-normal leading-relaxed">
          Hiring for a role? Pick it below and I&apos;ll only show what&apos;s relevant.
        </p>
      </section>

      {/* Interactive Filter & Project Grid */}
      <Suspense
        fallback={
          <div className="py-24 text-center font-mono text-[#A89FC8]">
            Loading projects...
          </div>
        }
      >
        <FilterBar roles={roles} initialProjects={projects} />
      </Suspense>

      {/* Resume Band */}
      <ResumeBand />
    </div>
  );
}
