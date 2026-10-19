import React from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Project } from "@/lib/sanity/types";

interface KnowledgeCheckSectionProps {
  project: Project;
}

export function KnowledgeCheckSection({ project }: KnowledgeCheckSectionProps) {
  const k = project.knowledge;
  const codeScore = k?.code ?? 3;
  const archScore = k?.architecture ?? 3;
  const logicScore = k?.logic ?? 2;

  const codeCaption = k?.codeCaption || "can read & edit";
  const archCaption = k?.architectureCaption || "can explain it";
  const logicCaption = k?.logicCaption || "still learning";

  const canExplain =
    k?.canExplain ||
    "[e.g. the request flow, how the prompt and output schema work, why the data model looks like this.]";

  const stillLearning =
    k?.stillLearning ||
    "[e.g. testing strategy, error handling at scale, parts that were generated and I'm working through.]";

  const renderSegments = (score: number, fillColor: string, label: string) => {
    return (
      <div
        className="flex items-center gap-1.5"
        role="progressbar"
        aria-label={`${label}: ${score} out of 5`}
        aria-valuenow={score}
        aria-valuemin={0}
        aria-valuemax={5}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className="w-8 sm:w-10 h-2.5 sm:h-3 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i <= score ? fillColor : "rgba(255, 255, 255, 0.1)",
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="mb-20">
      <SectionLabel number="02" label="HONEST KNOWLEDGE CHECK" />

      {/* Top Grid: Segmented bars panel + I can explain card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: 5-segment bars panel */}
        <div className="bg-[#1A1433] border border-white/10 rounded-[24px] p-6 md:p-8 flex flex-col justify-center space-y-6 shadow-md">
          {/* Code Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="font-bold text-white text-base md:text-lg sm:w-28">
              Code
            </span>
            <div className="flex items-center gap-4">
              {renderSegments(codeScore, "#C8FF3D", "Code")}
              <span className="font-mono text-xs text-[#A89FC8] whitespace-nowrap min-w-[110px]">
                {codeCaption}
              </span>
            </div>
          </div>

          {/* Architecture Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="font-bold text-white text-base md:text-lg sm:w-28">
              Architecture
            </span>
            <div className="flex items-center gap-4">
              {renderSegments(archScore, "#7C8BFF", "Architecture")}
              <span className="font-mono text-xs text-[#A89FC8] whitespace-nowrap min-w-[110px]">
                {archCaption}
              </span>
            </div>
          </div>

          {/* Logic Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="font-bold text-white text-base md:text-lg sm:w-28">
              Logic
            </span>
            <div className="flex items-center gap-4">
              {renderSegments(logicScore, "#FF5CA8", "Logic")}
              <span className="font-mono text-xs text-[#A89FC8] whitespace-nowrap min-w-[110px]">
                {logicCaption}
              </span>
            </div>
          </div>
        </div>

        {/* Right: I can explain card */}
        <div className="bg-[#1A1433] border border-[#C8FF3D]/30 rounded-[24px] p-6 md:p-8 flex flex-col justify-center shadow-md">
          <h3 className="text-xl md:text-2xl font-bold text-[#C8FF3D] mb-3">
            I can explain
          </h3>
          <p className="text-[17px] leading-relaxed text-[#D9D2F2]">
            {canExplain}
          </p>
        </div>
      </div>

      {/* Bottom: Still learning card */}
      <div className="bg-[#1A1433] border border-[#FF5CA8]/30 rounded-[24px] p-6 md:p-8 mt-6 shadow-md">
        <h3 className="text-xl md:text-2xl font-bold text-[#FF5CA8] mb-3">
          Still learning
        </h3>
        <p className="text-[17px] leading-relaxed text-[#D9D2F2]">
          {stillLearning}
        </p>
      </div>
    </section>
  );
}
