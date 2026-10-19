import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PopOut } from "./PopOut";
import { KnowledgePill } from "./KnowledgePill";
import { ACCENT_COLORS } from "@/lib/constants";
import type { Project } from "@/lib/sanity/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const accentInfo = ACCENT_COLORS[project.accent] || ACCENT_COLORS.lime;
  const accentHex = accentInfo.hex;

  // Extract up to 4 tech items from the techStack groups
  const techItems =
    project.techStack?.flatMap((group) => group.items).slice(0, 4) || [];

  return (
    <Link
      href={`/work/${project.slug.current}`}
      className="group block bg-[#1A1433] border border-white/[0.09] hover:border-[#C8FF3D]/50 rounded-[26px] px-[26px] pb-[26px] pt-0 relative transition-all duration-300 ease-out hover:-translate-y-2 shadow-[0_12px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.55)] cursor-pointer"
    >
      {/* Pop-Out visual overflowing top by 36px */}
      <PopOut
        platform={project.platform}
        accent={project.accent}
        popOutImage={project.popOutImage}
        title={project.title}
      />

      {/* Card Content */}
      <div className="mt-3">
        {/* Knowledge Pill */}
        <div className="mb-3">
          <KnowledgePill level={project.knowledge.level} />
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-[30px] font-bold text-white tracking-[-0.02em] leading-tight mb-2 group-hover:text-[#C8FF3D] transition-colors">
          {project.title}
        </h3>

        {/* Description / Summary */}
        <p className="text-[17px] text-[#C9C0E6] line-clamp-2 leading-relaxed mb-6 font-normal">
          {project.summary || project.tagline}
        </p>

        {/* Footer: Tech chips & Arrow */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/[0.06]">
          <div className="flex flex-wrap items-center gap-1.5 overflow-hidden">
            {techItems.map((item, idx) => (
              <span
                key={`${item.name}-${idx}`}
                className="bg-white/[0.07] text-[#D9D2F2] border border-white/5 px-2.5 py-1 rounded-md text-xs font-mono font-medium"
              >
                {item.name}
              </span>
            ))}
          </div>

          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            style={{ color: accentHex }}
            aria-hidden="true"
          >
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
