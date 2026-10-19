import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0F0B1E] flex items-center justify-center p-6 text-center">
      <div className="max-w-md mx-auto">
        <h1
          className="font-extrabold tracking-[-0.05em] leading-[0.88] text-[#C8FF3D] select-none"
          style={{ fontSize: "clamp(80px, 16vw, 160px)" }}
        >
          404<span className="text-[#FF5CA8]">.</span>
        </h1>

        <h2 className="mt-6 text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Page not found
        </h2>

        <p className="mt-3 text-base sm:text-lg text-[#A89FC8] leading-relaxed">
          The page you are looking for doesn&apos;t exist, was moved, or is still being coded.
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C8FF3D] text-[#17112B] font-bold text-base hover:brightness-110 active:scale-95 transition-all shadow-[0_0_24px_rgba(200,255,61,0.25)]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Work</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
