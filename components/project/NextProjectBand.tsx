import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface NextProjectBandProps {
  nextProject?: {
    title: string;
    slug: { current: string };
  } | null;
}

export function NextProjectBand({ nextProject }: NextProjectBandProps) {
  if (!nextProject) return null;

  return (
    <section className="w-full my-20">
      <Link
        href={`/work/${nextProject.slug.current}`}
        className="group block bg-[#C8FF3D] rounded-[32px] p-8 md:p-14 transition-all duration-300 hover:shadow-[0_25px_60px_rgba(200,255,61,0.3)] shadow-[0_20px_50px_rgba(200,255,61,0.18)]"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-mono text-xs md:text-[13px] font-bold tracking-[0.14em] text-[#17112B]/70 uppercase mb-2">
              NEXT PROJECT
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-[48px] font-extrabold text-[#17112B] tracking-[-0.03em] leading-tight">
              {nextProject.title} →
            </h2>
          </div>

          <span className="inline-flex items-center gap-2 bg-[#17112B] text-[#C8FF3D] group-hover:bg-[#231a42] px-8 py-4 rounded-full font-bold text-base md:text-lg transition-all duration-200 shrink-0 shadow-lg">
            <span>Open</span>
            <ArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </section>
  );
}
