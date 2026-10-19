import React from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";

interface TechItem {
  name: string;
  badge: string;
  badgeColor: string;
}

interface StackGroup {
  name: string;
  items: TechItem[];
}

const STACK_GROUPS: StackGroup[] = [
  {
    name: "Frontend",
    items: [
      { name: "React", badge: "R", badgeColor: "bg-[#7C8BFF] text-[#17112B]" },
      { name: "Next.js", badge: "N", badgeColor: "bg-white text-[#17112B]" },
      { name: "Tailwind", badge: "T", badgeColor: "bg-[#38BDF8] text-[#17112B]" },
    ],
  },
  {
    name: "Backend",
    items: [
      { name: "Node.js", badge: "N", badgeColor: "bg-[#22C55E] text-[#17112B]" },
      { name: "Express", badge: "E", badgeColor: "bg-[#A855F7] text-white" },
      { name: "PostgreSQL", badge: "P", badgeColor: "bg-[#336791] text-white" },
    ],
  },
  {
    name: "AI / LLM",
    items: [
      { name: "Claude API", badge: "C", badgeColor: "bg-[#FF9248] text-[#17112B]" },
      { name: "RAG", badge: "R", badgeColor: "bg-[#FF5CA8] text-[#17112B]" },
      { name: "Vector DBs", badge: "V", badgeColor: "bg-[#C8FF3D] text-[#17112B]" },
    ],
  },
  {
    name: "Mobile",
    items: [
      { name: "Flutter", badge: "F", badgeColor: "bg-[#02569B] text-white" },
      { name: "Firebase", badge: "F", badgeColor: "bg-[#FFA000] text-[#17112B]" },
    ],
  },
];

export function StackGroups() {
  return (
    <section className="mt-16 md:mt-24" aria-labelledby="stack-heading">
      <SectionLabel number="01" label="STACK" />

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {STACK_GROUPS.map((group) => (
          <div
            key={group.name}
            className="p-6 md:p-7 rounded-[26px] bg-[#1A1433] border border-white/10 hover:border-[#C8FF3D]/50 transition-colors duration-200"
          >
            <h3 className="text-xl font-bold text-white tracking-tight">{group.name}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item.name}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-white font-mono text-[13px] hover:border-white/25 transition-colors"
                >
                  <span
                    className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                  <span>{item.name}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
