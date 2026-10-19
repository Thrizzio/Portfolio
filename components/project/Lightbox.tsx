"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor } from "@/lib/sanity/image";
import type { ProjectGalleryItem } from "@/lib/sanity/types";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  items: ProjectGalleryItem[];
  currentIndex: number;
  onNavigate: (newIndex: number) => void;
  title: string;
}

export function Lightbox({
  isOpen,
  onClose,
  items,
  currentIndex,
  onNavigate,
  title,
}: LightboxProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        onNavigate((currentIndex - 1 + items.length) % items.length);
      } else if (e.key === "ArrowRight") {
        onNavigate((currentIndex + 1) % items.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Lock body scroll
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, currentIndex, items.length, onClose, onNavigate]);

  if (!isOpen || items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} screenshot lightbox`}
      ref={modalRef}
      className="fixed inset-0 z-50 bg-[#0F0B1E]/95 backdrop-blur-2xl flex flex-col items-center justify-between p-6 animate-in fade-in duration-200"
    >
      {/* Top Header: Caption & Close */}
      <div className="w-full max-w-6xl flex items-center justify-between z-10">
        <span className="font-mono text-xs md:text-sm text-[#A89FC8] tracking-widest uppercase">
          {currentItem.caption || `SCREENSHOT ${currentIndex + 1} OF ${items.length}`}
        </span>

        <button
          onClick={onClose}
          aria-label="Close lightbox"
          className="w-11 h-11 rounded-full border border-white/20 hover:border-white/50 bg-white/5 flex items-center justify-center text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Viewport */}
      <div className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-4 overflow-hidden">
        {currentItem.image?.asset ? (
          <Image
            src={urlFor(currentItem.image).width(1600).auto("format").url()}
            alt={currentItem.caption || `${title} screenshot`}
            width={1200}
            height={700}
            className="max-h-[75vh] w-auto object-contain rounded-[18px] shadow-2xl"
          />
        ) : (
          <div className="w-full h-80 md:h-[500px] rounded-[24px] bg-[#1A1433] border border-white/10 flex flex-col items-center justify-center p-8 text-center">
            <span className="font-mono text-base md:text-lg text-[#C8FF3D] font-bold tracking-wider mb-2">
              {currentItem.caption || "[SCREENSHOT]"}
            </span>
            <span className="font-mono text-xs text-[#A89FC8]">
              {title} preview mock
            </span>
          </div>
        )}

        {/* Prev Button */}
        {items.length > 1 && (
          <button
            onClick={() =>
              onNavigate((currentIndex - 1 + items.length) % items.length)
            }
            aria-label="Previous screenshot"
            className="absolute left-2 md:left-6 w-12 h-12 rounded-full border border-white/20 bg-[#1A1433]/80 hover:bg-[#1A1433] hover:border-[#C8FF3D] flex items-center justify-center text-white transition-all shadow-xl"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button */}
        {items.length > 1 && (
          <button
            onClick={() => onNavigate((currentIndex + 1) % items.length)}
            aria-label="Next screenshot"
            className="absolute right-2 md:right-6 w-12 h-12 rounded-full border border-white/20 bg-[#1A1433]/80 hover:bg-[#1A1433] hover:border-[#C8FF3D] flex items-center justify-center text-white transition-all shadow-xl"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Counter */}
      <div className="font-mono text-xs text-[#A89FC8]">
        {currentIndex + 1} / {items.length} · Press ESC to exit, ← / → to navigate
      </div>
    </div>
  );
}
