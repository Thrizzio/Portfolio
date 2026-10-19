"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Lightbox } from "./Lightbox";
import { urlFor } from "@/lib/sanity/image";
import type { Project } from "@/lib/sanity/types";

interface GallerySectionProps {
  project: Project;
}

export function GallerySection({ project }: GallerySectionProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const gallery = project.gallery;
  if (!gallery || gallery.length === 0) return null;

  const handleTileClick = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  // Subtle aesthetic tint colors for mockup cards if no image uploaded
  const tileGradients = [
    "bg-gradient-to-br from-[#1C1636] to-[#120D24]",
    "bg-gradient-to-br from-[#23152E] to-[#120D24]",
    "bg-gradient-to-br from-[#151D28] to-[#120D24]",
    "bg-gradient-to-br from-[#241C1E] to-[#120D24]",
    "bg-gradient-to-br from-[#1A1A35] to-[#120D24]",
  ];

  return (
    <section className="mb-20">
      <SectionLabel number="05" label="SCREENSHOTS" />

      {/* 3-Column Masonry-Style Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {gallery.map((item, idx) => {
          // First tile spans 2 columns on medium+ screens
          const isFirstTile = idx === 0;
          const spanClass = isFirstTile ? "md:col-span-2" : "md:col-span-1";
          const gradientClass = tileGradients[idx % tileGradients.length];

          return (
            <button
              key={`${item.caption}-${idx}`}
              type="button"
              onClick={() => handleTileClick(idx)}
              className={`${spanClass} ${gradientClass} group relative h-64 md:h-80 rounded-[24px] border border-white/10 hover:border-[#C8FF3D]/50 overflow-hidden transition-all duration-300 ease-out flex flex-col justify-end p-6 text-left cursor-pointer shadow-md hover:shadow-2xl`}
            >
              {item.image?.asset ? (
                <Image
                  src={urlFor(item.image).width(900).auto("format").url()}
                  alt={item.caption || `${project.title} screenshot`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : null}

              {/* Dark subtle gradient overlay to ensure caption readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0B1E]/90 via-[#0F0B1E]/30 to-transparent pointer-events-none" />

              {/* Caption in DM Mono */}
              <span className="relative z-10 font-mono text-xs md:text-[13px] tracking-wider text-[#A89FC8] group-hover:text-white transition-colors">
                {item.caption || `[SCREENSHOT ${idx + 1}]`}
              </span>
            </button>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={gallery}
        currentIndex={activeIndex}
        onNavigate={setActiveIndex}
        title={project.title}
      />
    </section>
  );
}
