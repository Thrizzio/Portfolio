"use client";

import React, { useState } from "react";
import { Copy, Check, Play, ExternalLink } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Project } from "@/lib/sanity/types";

interface TryItSectionProps {
  project: Project;
}

export function TryItSection({ project }: TryItSectionProps) {
  const [copied, setCopied] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const demo = project.demo;
  if (!demo) return null;

  const liveUrl = demo.liveUrl || "https://demo.example.com";
  const displayHost = liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const runCommands =
    demo.runLocally || "$ git clone [repo-url]\n$ npm install && npm run dev";

  const handleCopy = () => {
    navigator.clipboard.writeText(runCommands);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="try-it" className="mb-20">
      <SectionLabel number="06" label="TRY IT" />

      <p className="text-xl md:text-[22px] text-[#D9D2F2] mb-8 font-normal">
        No sign-in needed. Poke around with sample data.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Browser frame demo (spans 2 columns) */}
        <div className="lg:col-span-2 bg-[#140E29] border border-white/10 rounded-[28px] overflow-hidden flex flex-col shadow-xl">
          {/* Top Chrome Bar */}
          <div className="bg-[#1A1433] px-5 py-3 border-b border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5CA8]" />
              <span className="w-3 h-3 rounded-full bg-[#FF9248]" />
              <span className="w-3 h-3 rounded-full bg-[#C8FF3D]" />
            </div>

            {/* URL input pill */}
            <div className="flex-1 max-w-md bg-[#0F0B1E] border border-white/10 rounded-full px-4 py-1.5 font-mono text-xs text-[#D9D2F2] flex items-center justify-between">
              <span className="truncate">{displayHost}</span>
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-[#C8FF3D] hover:underline shrink-0 ml-2"
              >
                <span>OPEN</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Iframe or Interactive fallback */}
          <div className="relative w-full h-[360px] md:h-[440px] bg-[#0C081A] flex items-center justify-center p-6">
            {demo.embedAllowed ? (
              <iframe
                src={liveUrl}
                sandbox="allow-scripts allow-same-origin allow-forms"
                loading="lazy"
                referrerPolicy="no-referrer"
                title={`${project.title} live demo`}
                className="w-full h-full border-0 rounded-[14px]"
              />
            ) : (
              <div className="text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-[#C8FF3D]/10 border border-[#C8FF3D]/30 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(200,255,61,0.2)]">
                  <ExternalLink className="w-8 h-8 text-[#C8FF3D]" />
                </div>
                <div>
                  <p className="font-mono text-xs md:text-sm text-[#A89FC8] tracking-widest uppercase mb-2">
                    [EMBEDDED LIVE DEMO · IFRAME]
                  </p>
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#C8FF3D] text-[#17112B] hover:bg-[#d5ff64] px-6 py-2.5 rounded-full font-bold text-sm transition-all"
                  >
                    <span>Launch external preview</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Video walkthrough + Run it locally (1 column) */}
        <div className="flex flex-col justify-between gap-6">
          {/* Video Walkthrough Card */}
          <div className="bg-[#24152A] border border-[#FF5CA8]/30 rounded-[28px] p-6 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[220px] shadow-lg group">
            {isPlayingVideo && demo.videoUrl ? (
              <iframe
                src={demo.videoUrl}
                title="Video walkthrough"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0 rounded-[28px]"
              />
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    if (demo.videoUrl?.startsWith("http")) {
                      setIsPlayingVideo(true);
                    }
                  }}
                  aria-label="Play video walkthrough"
                  className="w-16 h-16 rounded-full bg-[#FF5CA8] hover:bg-[#ff75b7] text-white flex items-center justify-center mb-4 transition-all duration-300 transform group-hover:scale-110 shadow-[0_0_25px_rgba(255,92,168,0.4)] cursor-pointer"
                >
                  <Play className="w-7 h-7 fill-current ml-1" />
                </button>
                <h3 className="font-bold text-lg md:text-xl text-white">
                  2-min video walkthrough
                </h3>
              </>
            )}
          </div>

          {/* Run it locally terminal block */}
          <div className="bg-[#07050F] border border-white/10 rounded-[28px] p-6 font-mono text-xs shadow-lg">
            <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
              <span className="text-[#A89FC8] tracking-widest uppercase text-[11px] font-bold">
                RUN IT LOCALLY
              </span>
              <button
                type="button"
                onClick={handleCopy}
                aria-label="Copy run locally commands"
                className="text-[#A89FC8] hover:text-[#C8FF3D] transition-colors p-1"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-[#C8FF3D]" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <pre className="text-[#D9D2F2] leading-relaxed overflow-x-auto whitespace-pre-wrap select-all">
              {runCommands}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
