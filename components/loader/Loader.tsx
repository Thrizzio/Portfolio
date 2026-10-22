"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { useSessionOnce } from "./useSessionOnce";
import { Cube3D } from "./Cube3D";

const STATUS_STAGES = [
  { threshold: 0, text: "INITIALIZING..." },
  { threshold: 30, text: "LOADING ASSETS..." },
  { threshold: 65, text: "COMPILING PROJECTS..." },
  { threshold: 95, text: "READY" },
];

function subscribeToLocation(callback: () => void) {
  window.addEventListener("popstate", callback);
  return () => window.removeEventListener("popstate", callback);
}

function getDebugSnapshot(): boolean {
  return typeof window !== "undefined" && window.location.search.includes("debug_loader");
}

function getServerDebugSnapshot(): boolean {
  return false;
}

export function Loader({ forceShow }: { forceShow?: boolean } = {}) {
  const { shouldShow, markShown } = useSessionOnce();
  const isUrlDebug = useSyncExternalStore(subscribeToLocation, getDebugSnapshot, getServerDebugSnapshot);
  const isDebug = Boolean(forceShow) || isUrlDebug;

  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    if (isDebug || !shouldShow) {
      return;
    }

    // Run progress timer for ~1.6s
    const startTime = performance.now();
    const duration = 1600;
    let fadeTimeout: ReturnType<typeof setTimeout> | null = null;

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(rawProgress);

      if (rawProgress >= 100) {
        clearInterval(interval);
        markShown();
        // Start fade out
        setIsFadingOut(true);
        fadeTimeout = setTimeout(() => {
          setIsMounted(false);
        }, 350);
      }
    }, 25);

    return () => {
      clearInterval(interval);
      if (fadeTimeout) {
        clearTimeout(fadeTimeout);
      }
    };
  }, [shouldShow, isDebug, markShown]);

  if (!isDebug && (!shouldShow || !isMounted)) {
    return null;
  }

  const effectiveProgress = isDebug ? 72 : progress;
  const currentStatus =
    [...STATUS_STAGES].reverse().find((s) => effectiveProgress >= s.threshold)?.text || "INITIALIZING...";

  return (
    <aside
      aria-label="Loading portfolio"
      className={`fixed inset-0 z-[9999] bg-[#0F0B1E] flex flex-col justify-between p-6 sm:p-10 transition-all duration-300 pointer-events-auto select-none ${
        isFadingOut ? "opacity-0 scale-[1.04] pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between text-xs font-mono tracking-widest text-[#A89FC8]/60 uppercase">
        <span>PORTFOLIO / 2026</span>
        <span>v1.0</span>
      </div>

      {/* Center 3D Content */}
      <div className="flex flex-col items-center justify-center my-auto">
        <Cube3D />

        {/* Wordmark */}
        <div className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center">
          Aadi<span className="text-[#C8FF3D]">.</span>
        </div>

        {/* Status Text */}
        <p className="mt-3 font-mono text-xs sm:text-[13px] tracking-[0.16em] uppercase text-[#A89FC8]">
          {currentStatus}
        </p>

        {/* Progress Bar */}
        <div className="w-56 sm:w-64 h-1 rounded-full bg-white/10 overflow-hidden mt-3 relative">
          <div
            className="h-full bg-gradient-to-r from-[#C8FF3D] to-[#FF5CA8] transition-all duration-75"
            style={{ width: `${effectiveProgress}%` }}
          />
        </div>
      </div>

      {/* Bottom Subtitle Caption */}
      <div className="text-center font-mono text-xs text-[#A89FC8]/60">
        {effectiveProgress}% · shows for ~1.5s, then the Work page fades in
      </div>
    </aside>
  );
}
