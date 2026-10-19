import React from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Project } from "@/lib/sanity/types";

interface ProjectOverviewProps {
  project: Project;
}

export function ProjectOverview({ project }: ProjectOverviewProps) {
  const problem =
    project.problem ||
    "[What was painful or missing, and for whom. Two or three sentences.]";
  const solution =
    project.solution ||
    "[The solution in plain words — what a user does and what happens.]";
  const outcome =
    project.outcome ||
    "[Result, number, or lesson. Skip if there's no honest number.]";

  return (
    <section className="mb-20">
      <SectionLabel number="01" label="OVERVIEW" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {/* The problem */}
        <div>
          <h2 className="text-2xl md:text-[30px] font-bold text-[#FF5CA8] tracking-[-0.02em] mb-3">
            The problem
          </h2>
          <p className="text-[19px] leading-[1.5] text-[#D9D2F2] font-normal">
            {problem}
          </p>
        </div>

        {/* What I built */}
        <div>
          <h2 className="text-2xl md:text-[30px] font-bold text-[#C8FF3D] tracking-[-0.02em] mb-3">
            What I built
          </h2>
          <p className="text-[19px] leading-[1.5] text-[#D9D2F2] font-normal">
            {solution}
          </p>
        </div>

        {/* What happened */}
        <div>
          <h2 className="text-2xl md:text-[30px] font-bold text-[#7C8BFF] tracking-[-0.02em] mb-3">
            What happened
          </h2>
          <p className="text-[19px] leading-[1.5] text-[#D9D2F2] font-normal">
            {outcome}
          </p>
        </div>
      </div>
    </section>
  );
}
