import React from "react";
import type { Project } from "@/lib/sanity/types";

interface ProjectMetaCardProps {
  project: Project;
}

export function ProjectMetaCard({ project }: ProjectMetaCardProps) {
  const roleValue = project.myRole || "[Solo / team role]";
  const timelineValue =
    project.startDate && project.endDate
      ? `${project.startDate} — ${project.endDate}`
      : project.startDate
      ? `${project.startDate} — Present`
      : "[Mon YYYY] — [Mon YYYY]";

  const platformValue =
    project.platform === "web"
      ? "Web · API"
      : project.platform === "mobile"
      ? "Mobile · App"
      : project.platform === "cli"
      ? "CLI · Terminal"
      : project.platform.toUpperCase();

  const statusLabel =
    project.status === "live"
      ? "[Live / In progress]"
      : project.status === "in-progress"
      ? "In Progress"
      : "Archived";

  return (
    <div className="w-full bg-[#1A1433] border border-white/10 rounded-[24px] p-6 md:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-20 shadow-lg">
      <div>
        <span className="block font-mono text-xs uppercase tracking-[0.14em] text-[#A89FC8] mb-2">
          ROLE
        </span>
        <span className="text-xl md:text-[22px] font-bold text-white tracking-tight">
          {roleValue}
        </span>
      </div>

      <div>
        <span className="block font-mono text-xs uppercase tracking-[0.14em] text-[#A89FC8] mb-2">
          TIMELINE
        </span>
        <span className="text-xl md:text-[22px] font-bold text-white tracking-tight">
          {timelineValue}
        </span>
      </div>

      <div>
        <span className="block font-mono text-xs uppercase tracking-[0.14em] text-[#A89FC8] mb-2">
          PLATFORM
        </span>
        <span className="text-xl md:text-[22px] font-bold text-white tracking-tight">
          {platformValue}
        </span>
      </div>

      <div>
        <span className="block font-mono text-xs uppercase tracking-[0.14em] text-[#A89FC8] mb-2">
          STATUS
        </span>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C8FF3D] animate-pulse inline-block" />
          <span className="text-xl md:text-[22px] font-bold text-[#C8FF3D] tracking-tight">
            {statusLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
