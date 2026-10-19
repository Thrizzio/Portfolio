import React from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import { ACCENT_COLORS } from "@/lib/constants";
import type { Project } from "@/lib/sanity/types";

interface ProjectMediaProps {
  project: Project;
}

export function ProjectMedia({ project }: ProjectMediaProps) {
  const accentInfo = ACCENT_COLORS[project.accent] || ACCENT_COLORS.lime;
  const accentHex = accentInfo.hex;

  return (
    <div
      className="w-full min-h-[380px] md:h-[560px] rounded-[36px] border border-white/10 relative overflow-hidden flex items-center justify-center p-6 md:p-12 mb-8"
      style={{
        background: `linear-gradient(135deg, ${accentHex}40 0%, ${accentHex}08 100%)`,
      }}
    >
      {/* Centered Device / Browser frame rotated -2deg with heavy shadow */}
      <div className="relative w-full max-w-3xl transform -rotate-2 drop-shadow-[0_30px_70px_rgba(0,0,0,0.8)]">
        {project.heroImage?.asset ? (
          <div
            className="w-full rounded-[24px] border bg-[#140E29] p-3 shadow-2xl overflow-hidden"
            style={{ borderColor: accentHex }}
          >
            {/* Window bar */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentHex }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentHex }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentHex }} />
            </div>
            <Image
              src={urlFor(project.heroImage).width(1200).auto("format").url()}
              alt={project.title}
              width={1000}
              height={500}
              className="w-full h-auto rounded-[14px] object-cover"
            />
          </div>
        ) : (
          /* Graceful stylized browser mockup matching Reference 2 */
          <div
            className="w-full rounded-[24px] border bg-[#140E29] p-4 md:p-6 shadow-2xl"
            style={{ borderColor: accentHex }}
          >
            {/* Top dots */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-4">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: accentHex }} />
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: accentHex }} />
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: accentHex }} />
            </div>

            {/* Inner window layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2 hidden md:block">
                <div className="w-3/4 h-3 rounded bg-white/20" />
                <div className="w-1/2 h-3 rounded bg-white/15" />
                <div className="w-2/3 h-3 rounded bg-white/10" />
              </div>
              <div className="md:col-span-2 space-y-4">
                <div
                  className="w-full h-32 md:h-44 rounded-[14px]"
                  style={{ backgroundColor: accentHex, opacity: 0.55 }}
                />
                <div className="space-y-2">
                  <div className="w-4/5 h-2.5 rounded bg-white/25" />
                  <div className="w-3/5 h-2.5 rounded bg-white/15" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Looping GIF / Hero Screenshot Mono Caption */}
      <span className="absolute bottom-5 right-6 font-mono text-[11px] md:text-xs text-white/50 tracking-wider">
        [HERO SCREENSHOT / LOOPING GIF]
      </span>
    </div>
  );
}
