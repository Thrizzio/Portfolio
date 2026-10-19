"use client";

import React, { useMemo, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Legend } from "./Legend";
import { ProjectCard } from "./ProjectCard";
import type { Project, Role } from "@/lib/sanity/types";

interface FilterBarProps {
  roles: Role[];
  initialProjects: Project[];
}

export function FilterBar({ roles, initialProjects }: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const selectedRole = searchParams.get("role") || "all";
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleRoleSelect = (roleSlug: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (roleSlug === "all") {
        params.delete("role");
      } else {
        params.set("role", roleSlug);
      }
      const newQuery = params.toString() ? `?${params.toString()}` : "/";
      router.replace(newQuery, { scroll: false });
    });
  };

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      // Role filter
      if (selectedRole !== "all") {
        const matchesRole = project.roles?.some(
          (r) => r.slug?.current === selectedRole
        );
        if (!matchesRole) return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleMatch = project.title.toLowerCase().includes(q);
        const taglineMatch = project.tagline?.toLowerCase().includes(q);
        const summaryMatch = project.summary?.toLowerCase().includes(q);
        const techMatch = project.techStack?.some((g) =>
          g.items?.some((i) => i.name.toLowerCase().includes(q))
        );

        if (!titleMatch && !taglineMatch && !summaryMatch && !techMatch) {
          return false;
        }
      }

      return true;
    });
  }, [initialProjects, selectedRole, searchQuery]);

  // Find active role title for count label
  const activeRoleDoc = roles.find((r) => r.slug.current === selectedRole);
  const roleDisplayTitle = activeRoleDoc ? activeRoleDoc.title : "";

  return (
    <div className="w-full">
      {/* Search & Role Filters Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-6">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#A89FC8] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="project-search"
            name="search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects or tech..."
            aria-label="Search projects or technologies"
            className="w-full bg-[#1A1433] border border-white/10 focus:border-[#C8FF3D] rounded-full pl-11 pr-5 py-3 text-sm text-white placeholder:text-[#A89FC8] outline-none transition-colors"
          />
        </div>

        {/* Role chips row */}
        <div
          role="group"
          aria-label="Filter by role"
          className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none"
        >
          <button
            type="button"
            onClick={() => handleRoleSelect("all")}
            className={`font-mono text-xs md:text-[13px] rounded-full px-5 py-2.5 transition-all duration-200 shrink-0 font-bold ${
              selectedRole === "all"
                ? "bg-[#C8FF3D] text-[#17112B] shadow-[0_0_15px_rgba(200,255,61,0.25)]"
                : "bg-[#1A1433] text-[#D9D2F2] border border-white/10 hover:border-white/30"
            }`}
          >
            All
          </button>

          {roles.map((r) => {
            const isActive = selectedRole === r.slug.current;
            return (
              <button
                key={r._id}
                type="button"
                onClick={() => handleRoleSelect(r.slug.current)}
                className={`font-mono text-xs md:text-[13px] rounded-full px-5 py-2.5 transition-all duration-200 shrink-0 font-bold ${
                  isActive
                    ? "bg-[#C8FF3D] text-[#17112B] shadow-[0_0_15px_rgba(200,255,61,0.25)]"
                    : "bg-[#1A1433] text-[#D9D2F2] border border-white/10 hover:border-white/30"
                }`}
              >
                {r.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend bar */}
      <div className="mb-6">
        <Legend />
      </div>

      {/* Projects count line */}
      <div className="font-mono text-xs text-[#A89FC8] tracking-widest uppercase mb-12">
        {filteredProjects.length}{" "}
        {filteredProjects.length === 1 ? "PROJECT" : "PROJECTS"}
        {selectedRole !== "all" && roleDisplayTitle && ` · ${roleDisplayTitle}`}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="py-20 text-center font-mono text-[#A89FC8] bg-[#1A1433]/40 border border-white/5 rounded-[26px]">
          No projects match your filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-16 pt-4">
          {filteredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
