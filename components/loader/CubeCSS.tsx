"use client";

import React from "react";

export function CubeCSS() {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center select-none pointer-events-none">
      {/* Orbit Ring 1 (lime tilted) */}
      <div
        className="absolute w-60 h-60 rounded-full border border-dashed border-[#C8FF3D]/40"
        style={{
          transform: "rotateX(75deg) rotateY(20deg)",
          animation: "spinSlow 8s linear infinite",
        }}
      />

      {/* Orbit Ring 2 (blue tilted opposing) */}
      <div
        className="absolute w-72 h-72 rounded-full border border-dashed border-[#7C8BFF]/35"
        style={{
          transform: "rotateX(65deg) rotateY(-30deg)",
          animation: "spinReverse 12s linear infinite",
        }}
      />

      {/* 3D Scene */}
      <div
        className="w-28 h-28 relative"
        style={{
          perspective: "800px",
        }}
      >
        <div
          className="w-full h-full relative"
          style={{
            transformStyle: "preserve-3d",
            animation: "cubeSpin 6s linear infinite",
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 bg-[#1A1433]/50 border-2 border-[#C8FF3D] backdrop-blur-[2px]"
            style={{ transform: "translateZ(56px)" }}
          />
          {/* Back */}
          <div
            className="absolute inset-0 bg-[#1A1433]/50 border-2 border-[#7C8BFF] backdrop-blur-[2px]"
            style={{ transform: "rotateY(180deg) translateZ(56px)" }}
          />
          {/* Right */}
          <div
            className="absolute inset-0 bg-[#1A1433]/50 border-2 border-[#FF5CA8] backdrop-blur-[2px]"
            style={{ transform: "rotateY(90deg) translateZ(56px)" }}
          />
          {/* Left */}
          <div
            className="absolute inset-0 bg-[#1A1433]/50 border-2 border-[#B8A4FF] backdrop-blur-[2px]"
            style={{ transform: "rotateY(-90deg) translateZ(56px)" }}
          />
          {/* Top */}
          <div
            className="absolute inset-0 bg-[#1A1433]/50 border-2 border-[#C8FF3D] backdrop-blur-[2px]"
            style={{ transform: "rotateX(90deg) translateZ(56px)" }}
          />
          {/* Bottom */}
          <div
            className="absolute inset-0 bg-[#1A1433]/50 border-2 border-[#FF9248] backdrop-blur-[2px]"
            style={{ transform: "rotateX(-90deg) translateZ(56px)" }}
          />
        </div>
      </div>

    </div>
  );
}

