import React from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ACCENT_COLORS } from "@/lib/constants";
import type { Project } from "@/lib/sanity/types";

interface TechStackSectionProps {
  project: Project;
}

export function TechStackSection({ project }: TechStackSectionProps) {
  const groups = project.techStack;

  if (!groups || groups.length === 0) {
    return null;
  }

  return (
    <section className="mb-20">
      <SectionLabel number="03" label="TECH STACK" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {groups.map((group, idx) => {
          // If any item in the group has a "why", pick the first non-empty why
          const whyText = group.items?.find((i) => i.why)?.why;

          return (
            <div
              key={`${group.group}-${idx}`}
              className="bg-[#1A1433] border border-white/10 rounded-[24px] p-6 flex flex-col justify-between shadow-md"
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-4 tracking-tight">
                  {group.group}
                </h3>

                <div className="flex flex-wrap items-center gap-2 mb-6">
                  {group.items?.map((item, itemIdx) => {
                    const colorHex =
                      item.color && ACCENT_COLORS[item.color]
                        ? ACCENT_COLORS[item.color].hex
                        : "#7C8BFF";
                    const initial =
                      item.icon || item.name.charAt(0).toUpperCase();

                    return (
                      <div
                        key={`${item.name}-${itemIdx}`}
                        className="inline-flex items-center gap-2 bg-[#21193D] border border-white/10 px-3 py-1.5 rounded-full text-xs font-mono text-white"
                      >
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] text-[#17112B] shrink-0"
                          style={{ backgroundColor: colorHex }}
                        >
                          {initial}
                        </span>
                        <span>{item.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {whyText && (
                <div className="font-mono text-xs border-t border-white/10 pt-3 mt-auto">
                  <span className="font-bold text-white/90">Why: </span>
                  <span className="text-[#A89FC8]">{whyText}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
