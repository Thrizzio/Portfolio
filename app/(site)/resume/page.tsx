import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Download, Printer, ArrowLeft } from "lucide-react";
import { sanityFetch } from "@/lib/sanity/client";
import { siteSettingsQuery } from "@/lib/sanity/queries";
import type { SiteSettings } from "@/lib/sanity/types";

export const metadata: Metadata = {
  title: "Resume — Aadi",
  description: "Resume and experience of Aadi, CS undergraduate building AI-powered products.",
};

export default async function ResumePage() {
  const siteSettings = await sanityFetch<SiteSettings | null>({
    query: siteSettingsQuery,
    tags: ["siteSettings"],
  }).catch(() => null);

  const resumeUrl =
    siteSettings?.resumeFile?.asset?.url || siteSettings?.resumeUrl || "/resume.pdf";

  return (
    <div className="site-container pt-8 md:pt-14 pb-24">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/10">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-[13px] tracking-wider uppercase text-[#A89FC8] hover:text-[#C8FF3D] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to home</span>
          </Link>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
            Resume<span className="text-[#C8FF3D]">.</span>
          </h1>
          <p className="mt-2 text-base text-[#D9D2F2]">
            Aadi &bull; CS Undergrad &bull; AI / LLM & Full-Stack Developer
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <a
            href={resumeUrl}
            download="Aadi_Resume.pdf"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C8FF3D] text-[#17112B] font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-[0_0_24px_rgba(200,255,61,0.25)]"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </a>

          <button
            type="button"
            onClick={undefined}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/20 text-white font-medium text-sm hover:border-white/50 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* PDF / Resume Container */}
      <div className="mt-8 rounded-[26px] bg-[#1A1433] border border-white/10 p-4 sm:p-8 min-h-[750px] flex flex-col items-center justify-center">
        <object
          data={resumeUrl}
          type="application/pdf"
          className="w-full h-[850px] rounded-[18px] border border-white/10 hidden md:block"
        >
          <div className="p-8 text-center max-w-md mx-auto">
            <p className="text-lg text-white font-medium mb-4">
              PDF viewer is not supported on this device.
            </p>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C8FF3D] text-[#17112B] font-bold text-sm hover:brightness-110 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Open / Download Resume</span>
            </a>
          </div>
        </object>

        {/* Mobile View Card */}
        <div className="md:hidden w-full text-center py-12 px-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#C8FF3D]/10 border border-[#C8FF3D]/30 flex items-center justify-center mb-6">
            <Download className="w-8 h-8 text-[#C8FF3D]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Resume (PDF)</h2>
          <p className="text-sm text-[#A89FC8] mb-8 max-w-xs mx-auto">
            Optimized for viewing or downloading directly to your mobile device.
          </p>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full max-w-xs py-3.5 px-6 rounded-full bg-[#C8FF3D] text-[#17112B] font-bold text-base hover:brightness-110 transition-all shadow-[0_0_20px_rgba(200,255,61,0.3)]"
          >
            <Download className="w-5 h-5" />
            <span>Download Resume PDF</span>
          </a>
        </div>
      </div>
    </div>
  );
}
