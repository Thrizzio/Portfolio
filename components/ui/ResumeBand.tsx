import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ResumeBandProps {
  className?: string;
  resumeUrl?: string;
}

export function ResumeBand({ className = "", resumeUrl = "/resume" }: ResumeBandProps) {
  return (
    <section className={`w-full my-20 ${className}`}>
      <div className="bg-[#C8FF3D] rounded-[32px] p-8 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-[0_20px_50px_rgba(200,255,61,0.18)]">
        <div>
          <p className="font-mono text-xs md:text-[13px] font-bold tracking-[0.14em] text-[#17112B]/70 uppercase mb-3">
            THE SHORT VERSION
          </p>
          <h2 className="text-3xl md:text-[56px] font-extrabold text-[#17112B] tracking-[-0.03em] leading-[1.0]">
            Want the full story?
          </h2>
        </div>

        <Link
          href={resumeUrl}
          className="inline-flex items-center gap-2 bg-[#17112B] text-[#C8FF3D] hover:bg-[#231a42] px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 shrink-0 shadow-lg group"
        >
          <span>View resume</span>
          <ArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </section>
  );
}
