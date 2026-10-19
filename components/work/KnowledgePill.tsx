import React from "react";
import { KNOWLEDGE_LEVELS } from "@/lib/constants";
import type { KnowledgeLevel } from "@/lib/sanity/types";

interface KnowledgePillProps {
  level: KnowledgeLevel;
  className?: string;
}

export function KnowledgePill({ level, className = "" }: KnowledgePillProps) {
  const info = KNOWLEDGE_LEVELS[level] || KNOWLEDGE_LEVELS.built;

  return (
    <span
      className={`inline-flex items-center gap-2 border border-white/15 bg-white/[0.02] px-3 py-1 rounded-full text-xs font-mono text-[#D9D2F2] tracking-wide ${className}`}
    >
      <span
        className="w-2 h-2 rounded-full inline-block shrink-0"
        style={{ backgroundColor: info.color }}
        aria-hidden="true"
      />
      <span>{info.pillLabel}</span>
    </span>
  );
}
