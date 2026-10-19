import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Play } from "lucide-react";
import { KnowledgePill } from "@/components/work/KnowledgePill";
import { ACCENT_COLORS } from "@/lib/constants";
import type { Project } from "@/lib/sanity/types";

interface ProjectHeroProps {
  project: Project;
}

export function ProjectHero({ project }: ProjectHeroProps) {
  const accentInfo = ACCENT_COLORS[project.accent] || ACCENT_COLORS.lime;
  const accentHex = accentInfo.hex;

  const liveUrl = project.demo?.liveUrl || "#try-it";
  const videoUrl = project.demo?.videoUrl || "#try-it";
  const githubUrl = project.links?.github;

  return (
    <section className="mb-12">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 font-mono text-xs md:text-[13px] tracking-[0.14em] uppercase text-[#A89FC8] hover:text-[#C8FF3D] transition-colors mb-6 group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>ALL WORK</span>
      </Link>

      {/* Tags row: Knowledge pill + Role tags */}
      <div className="flex flex-wrap items-center gap-2.5 mb-6">
        <KnowledgePill level={project.knowledge.level} />
        {project.roles?.map((role) => (
          <span
            key={role._id}
            className="font-mono text-xs text-[#D9D2F2] border border-white/15 px-3 py-1 rounded-full uppercase"
          >
            {role.title}
          </span>
        ))}
      </div>

      {/* Giant Title with coloured period */}
      <h1 className="text-5xl sm:text-7xl lg:text-[100px] xl:text-[120px] font-extrabold text-white tracking-[-0.04em] leading-[0.9] mb-6">
        {project.title}
        <span style={{ color: accentHex }}>.</span>
      </h1>

      {/* Tagline */}
      <p className="text-xl md:text-[26px] text-[#D9D2F2] font-normal leading-relaxed max-w-4xl mb-8">
        {project.tagline || project.summary}
      </p>

      {/* CTA Action Buttons */}
      <div className="flex flex-wrap items-center gap-4">
        {liveUrl && (
          <a
            href={liveUrl}
            target={liveUrl.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#C8FF3D] text-[#17112B] hover:bg-[#d5ff64] px-7 py-3.5 rounded-full font-bold text-base md:text-lg transition-all duration-200 shadow-[0_0_20px_rgba(200,255,61,0.25)]"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Try the live demo</span>
          </a>
        )}

        {videoUrl && (
          <a
            href="#try-it"
            className="inline-flex items-center gap-2 bg-transparent text-white border-[1.5px] border-white/30 hover:border-white/60 hover:bg-white/5 px-6 py-3.5 rounded-full font-medium text-base transition-all duration-200"
          >
            <span>Watch walkthrough</span>
          </a>
        )}

        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-transparent text-white border-[1.5px] border-white/30 hover:border-white/60 hover:bg-white/5 px-6 py-3.5 rounded-full font-medium text-base transition-all duration-200"
          >
            <span>Source on GitHub</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        )}
      </div>
    </section>
  );
}
