import React from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Experience } from "@/lib/sanity/types";

interface TimelineProps {
  experiences: Experience[];
}

export function Timeline({ experiences }: TimelineProps) {
  // Map node accent colors based on index or kind
  const getNodeColor = (index: number) => {
    if (index === 0) return { border: "border-[#C8FF3D]", spine: "bg-[#C8FF3D]" };
    if (index === 1) return { border: "border-[#FF5CA8]", spine: "bg-[#FF5CA8]" };
    return { border: "border-[#7C8BFF]", spine: "bg-[#7C8BFF]" };
  };

  const getTagline = (index: number) => {
    if (index === 0) return { text: "BUILDS THINGS THAT SHIP.", color: "bg-[#C8FF3D]" };
    if (index === 1) return { text: "LEARNING IN PUBLIC.", color: "bg-[#FF5CA8]" };
    return null;
  };

  return (
    <section className="mt-20 md:mt-28" aria-labelledby="experience-heading">
      <SectionLabel number="02" label="EXPERIENCE" />

      <h2
        id="experience-heading"
        className="mt-6 text-4xl md:text-5xl font-extrabold text-white tracking-tight"
      >
        Experience<span className="text-[#C8FF3D]">.</span>
      </h2>

      <div className="mt-8 p-6 sm:p-8 md:p-12 rounded-[28px] md:rounded-[36px] bg-[#150F29] border border-white/10">
        <div className="flex flex-col">
          {experiences.map((exp, index) => {
            const isLast = index === experiences.length - 1;
            const colors = getNodeColor(index);
            const tagline = getTagline(index);

            return (
              <div key={exp._id} className="relative flex items-start gap-5 md:gap-8">
                {/* Node & Spine */}
                <div className="flex flex-col items-center flex-shrink-0 pt-1.5">
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${colors.border} bg-transparent z-10`}
                    aria-hidden="true"
                  />
                  {!isLast && (
                    <div
                      className={`w-[2px] min-h-[120px] h-full ${colors.spine} opacity-70 my-1`}
                      aria-hidden="true"
                    />
                  )}
                </div>

                {/* Content & Right Tagline */}
                <div className={`flex-1 flex flex-col md:flex-row md:items-start justify-between gap-4 ${isLast ? "pb-2" : "pb-12 md:pb-16"}`}>
                  <div className="max-w-2xl">
                    <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                      {exp.title}
                    </h3>

                    <p className="mt-1 text-base font-medium text-[#D9D2F2]">
                      {exp.organization}
                      {exp.type && <span className="text-[#A89FC8]"> · {exp.type}</span>}
                    </p>

                    <p className="mt-1 font-mono text-[13px] text-[#A89FC8]">
                      {exp.startDate} {exp.endDate ? `— ${exp.endDate}` : ""}
                    </p>

                    {exp.description && (
                      <p className="mt-3 text-[15px] leading-relaxed text-[#D9D2F2]/90">
                        {exp.description}
                      </p>
                    )}
                  </div>

                  {tagline && (
                    <div className="hidden md:block flex-shrink-0 text-right pt-1 pl-4">
                      <p className="font-mono text-xs tracking-widest text-[#A89FC8] uppercase">
                        {tagline.text.split(" ").slice(0, 2).join(" ")}
                        <br />
                        {tagline.text.split(" ").slice(2).join(" ")}
                      </p>
                      <div className={`mt-2 h-0.5 w-6 ml-auto ${tagline.color}`} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
