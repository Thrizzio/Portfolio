import React from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import { ACCENT_COLORS } from "@/lib/constants";
import type { AccentColor, SanityImageReference } from "@/lib/sanity/types";

interface PopOutProps {
  platform: "web" | "mobile" | "desktop" | "cli" | "api";
  accent: AccentColor;
  popOutImage?: SanityImageReference;
  title: string;
}

export function PopOut({ platform, accent, popOutImage, title }: PopOutProps) {
  const accentInfo = ACCENT_COLORS[accent] || ACCENT_COLORS.lime;
  const accentHex = accentInfo.hex;

  if (popOutImage?.asset) {
    return (
      <div className="relative w-full h-[190px] flex items-center justify-center -mt-[36px] overflow-visible pointer-events-none">
        <div className="transform -rotate-2 group-hover:-rotate-3 group-hover:-translate-y-2.5 transition-all duration-300 ease-out drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)]">
          <Image
            src={urlFor(popOutImage).width(300).auto("format").url()}
            alt={`${title} visual`}
            width={260}
            height={180}
            className="object-contain max-h-[190px]"
          />
        </div>
      </div>
    );
  }

  // Graceful CSS Device Frame Fallbacks
  return (
    <div className="relative w-full h-[190px] flex items-center justify-center -mt-[36px] overflow-visible pointer-events-none">
      <div className="transform -rotate-2 group-hover:-rotate-3 group-hover:-translate-y-2.5 transition-all duration-300 ease-out drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)]">
        {platform === "mobile" ? (
          // Phone frame (104 × 212)
          <div
            className="w-[104px] h-[190px] rounded-[24px] border-2 bg-[#120D24] p-2 flex flex-col items-center justify-between shadow-2xl relative"
            style={{ borderColor: accentHex }}
          >
            {/* Speaker / Dynamic Island notch */}
            <div
              className="w-8 h-2 rounded-full mb-1"
              style={{ backgroundColor: accentHex, opacity: 0.8 }}
            />
            {/* Screen Content Box */}
            <div
              className="w-full h-16 rounded-[12px] mb-2"
              style={{ backgroundColor: accentHex, opacity: 0.85 }}
            />
            {/* Content lines */}
            <div className="w-full space-y-1.5 px-0.5 mb-auto">
              <div className="w-4/5 h-1.5 rounded-full bg-white/20" />
              <div className="w-3/5 h-1.5 rounded-full bg-white/15" />
            </div>
            {/* Bottom home bar */}
            <div className="w-10 h-1 rounded-full bg-white/30 mt-2" />
          </div>
        ) : platform === "cli" ? (
          // Terminal (250 × 150)
          <div
            className="w-[245px] h-[150px] rounded-[16px] border bg-[#090615] p-3 font-mono text-[11px] text-white/80 shadow-2xl flex flex-col justify-between"
            style={{ borderColor: accentHex }}
          >
            <div className="flex items-center gap-1.5 mb-2 border-b border-white/10 pb-1.5">
              <span className="w-2 h-2 rounded-full bg-white/20" />
              <span className="w-2 h-2 rounded-full bg-white/20" />
              <span className="w-2 h-2 rounded-full bg-white/20" />
            </div>
            <div className="space-y-1 leading-relaxed">
              <p className="text-white/90">
                <span style={{ color: accentHex }}>$</span> run --demo
              </p>
              <p className="text-white/60">▸ starting...</p>
              <p className="text-white/80">✓ ready</p>
              <div
                className="w-2 h-3.5 inline-block animate-pulse mt-0.5"
                style={{ backgroundColor: accentHex }}
              />
            </div>
          </div>
        ) : (
          // Browser window (250 × 165) for web / api / desktop
          <div
            className="w-[250px] h-[165px] rounded-[18px] border bg-[#140E29] p-3 shadow-2xl flex flex-col justify-between"
            style={{ borderColor: accentHex }}
          >
            {/* Top Chrome Bar */}
            <div className="flex items-center gap-1.5 border-b border-white/10 pb-2 mb-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: accentHex }}
              />
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: accentHex }}
              />
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: accentHex }}
              />
            </div>

            {/* Inner Window Preview Block */}
            <div
              className="w-full h-16 rounded-[10px] mb-2"
              style={{ backgroundColor: accentHex, opacity: 0.65 }}
            />

            {/* Simulated content lines */}
            <div className="w-full space-y-1.5 mb-1">
              <div className="w-4/5 h-2 rounded-full bg-white/20" />
              <div className="w-2/3 h-2 rounded-full bg-white/15" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
