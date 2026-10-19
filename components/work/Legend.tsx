import React from "react";
import { KNOWLEDGE_LEVELS } from "@/lib/constants";

export function Legend({ className = "" }: { className?: string }) {
  const levels = [
    KNOWLEDGE_LEVELS.built,
    KNOWLEDGE_LEVELS.architecture,
    KNOWLEDGE_LEVELS.vibe,
  ];

  return (
    <div
      className={`w-full rounded-full bg-white/[0.04] border border-white/[0.06] px-6 py-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs md:text-sm font-mono text-[#A89FC8] ${className}`}
    >
      <span className="font-semibold text-white/90">HOW WELL I KNOW IT →</span>

      {levels.map((lvl) => (
        <div key={lvl.key} className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
            style={{ backgroundColor: lvl.color }}
            aria-hidden="true"
          />
          <span className="text-[#D9D2F2]">{lvl.label}</span>
        </div>
      ))}
    </div>
  );
}
