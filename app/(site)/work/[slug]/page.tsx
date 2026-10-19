import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/lib/sanity/client";
import { projectBySlugQuery, projectSlugsQuery } from "@/lib/sanity/queries";
import { ProjectHero } from "@/components/project/ProjectHero";
import { ProjectMedia } from "@/components/project/ProjectMedia";
import { ProjectMetaCard } from "@/components/project/ProjectMetaCard";
import { ProjectOverview } from "@/components/project/ProjectOverview";
import { KnowledgeCheckSection } from "@/components/project/KnowledgeCheckSection";
import { TechStackSection } from "@/components/project/TechStackSection";
import { ArchitectureSection } from "@/components/project/ArchitectureSection";
import { GallerySection } from "@/components/project/GallerySection";
import { TryItSection } from "@/components/project/TryItSection";
import { DecisionsSection } from "@/components/project/DecisionsSection";
import { NextProjectBand } from "@/components/project/NextProjectBand";
import type { Project } from "@/lib/sanity/types";



interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await sanityFetch<{ slug: string }[]>({
      query: projectSlugsQuery,
      tags: ["projects"],
    });
    return slugs.map((item) => ({ slug: item.slug }));
  } catch (e) {
    console.error("Failed to fetch project slugs:", e);
    return [];
  }
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await sanityFetch<Project | null>({
    query: projectBySlugQuery,
    params: { slug },
    tags: ["projects", `project:${slug}`],
  }).catch(() => null);

  if (!project) {
    return { title: "Project Not Found — Aadi" };
  }

  return {
    title: `${project.title} — Aadi`,
    description: project.tagline || project.summary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await sanityFetch<(Project & { nextProject?: { title: string; slug: { current: string } } }) | null>({
    query: projectBySlugQuery,
    params: { slug },
    tags: ["projects", `project:${slug}`],
  }).catch(() => null);

  if (!project) {
    notFound();
  }

  return (
    <div className="site-container pt-8 md:pt-14 pb-16">
      {/* 1. Hero */}
      <ProjectHero project={project} />

      {/* 2. Hero Media */}
      <ProjectMedia project={project} />

      {/* Meta Card (ROLE, TIMELINE, PLATFORM, STATUS) */}
      <ProjectMetaCard project={project} />

      {/* 3. 01 / OVERVIEW */}
      <ProjectOverview project={project} />

      {/* 4. 02 / HONEST KNOWLEDGE CHECK */}
      <KnowledgeCheckSection project={project} />

      {/* 5. 03 / TECH STACK */}
      <TechStackSection project={project} />

      {/* 6. 04 / ARCHITECTURE */}
      <ArchitectureSection project={project} />

      {/* 7. 05 / SCREENSHOTS */}
      <GallerySection project={project} />

      {/* 8. 06 / TRY IT */}
      <TryItSection project={project} />

      {/* 9. 07 / DECISIONS & CHALLENGES */}
      <DecisionsSection project={project} />

      {/* 10. Next project lime band */}
      <NextProjectBand nextProject={project.nextProject} />
    </div>
  );
}
