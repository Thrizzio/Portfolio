import React from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Project } from "@/lib/sanity/types";

interface DecisionsSectionProps {
  project: Project;
}

export function DecisionsSection({ project }: DecisionsSectionProps) {
  const decisions = project.decisions;
  if (!decisions || decisions.length === 0) return null;

  return (
    <section className="mb-20">
      <SectionLabel number="07" label="DECISIONS & CHALLENGES" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {decisions.map((item, idx) => (
          <div
            key={`${item.title}-${idx}`}
            className="bg-[#1A1433] border border-white/10 rounded-[24px] p-6 md:p-8 flex flex-col justify-start shadow-md"
          >
            <h3 className="text-xl md:text-[22px] font-bold text-white mb-3 tracking-tight">
              {item.title}
            </h3>
            <p className="text-[17px] leading-relaxed text-[#D9D2F2]">
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
