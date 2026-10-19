"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, CornerDownRight, ArrowLeftRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { urlFor } from "@/lib/sanity/image";
import type { Project, ArchitectureNode } from "@/lib/sanity/types";

interface ArchitectureSectionProps {
  project: Project;
}

export function ArchitectureSection({ project }: ArchitectureSectionProps) {
  const arch = project.architecture;
  const mermaidRef = useRef<HTMLDivElement>(null);
  const [mermaidSvg, setMermaidSvg] = useState<string | null>(null);

  const kindColors: Record<ArchitectureNode["kind"], { border: string; text: string; bg: string }> = {
    entry: { border: "#FF5CA8", text: "#FF8FC4", bg: "#1F122B" },
    server: { border: "#7C8BFF", text: "#9AA7FF", bg: "#161633" },
    logic: { border: "#C8FF3D", text: "#D6FF66", bg: "#171F1A" },
    model: { border: "#FF9248", text: "#FFB07A", bg: "#231818" },
    storage: { border: "#B8A4FF", text: "#CEBFFF", bg: "#1C1630" },
    client: { border: "#7C8BFF", text: "#9AA7FF", bg: "#161633" },
  };

  useEffect(() => {
    if (arch?.mermaid) {
      let isMounted = true;
      import("mermaid").then((m) => {
        if (!isMounted) return;
        m.default.initialize({
          startOnLoad: false,
          theme: "dark",
          themeVariables: {
            darkMode: true,
            background: "#150F29",
            primaryColor: "#7C8BFF",
            primaryTextColor: "#F4F0FF",
            primaryBorderColor: "#C8FF3D",
            lineColor: "#A89FC8",
            secondaryColor: "#1A1433",
            tertiaryColor: "#150F29",
          },
        });
        const id = `mermaid-${Math.random().toString(36).substring(7)}`;
        m.default
          .render(id, arch.mermaid!)
          .then(({ svg }) => {
            if (isMounted) setMermaidSvg(svg);
          })
          .catch((err) => console.error("Mermaid render error:", err));
      });
      return () => {
        isMounted = false;
      };
    }
  }, [arch?.mermaid]);

  if (!arch) return null;

  const nodes = arch.nodes || [];
  const description =
    arch.description ||
    "[Replace with your real diagram. Two or three sentences on how a request moves through the system and the one design decision you're proudest of.]";

  // Split into 2 rows matching reference screen 2 if 6 nodes are present
  const firstRow = nodes.slice(0, 4);
  const secondRow = nodes.slice(4);

  return (
    <section className="mb-20">
      <SectionLabel number="04" label="ARCHITECTURE" />

      <div className="w-full bg-[#150F29] border border-white/10 rounded-[32px] p-6 md:p-12 shadow-xl">
        {/* Mermaid SVG Diagram if present */}
        {mermaidSvg ? (
          <div
            ref={mermaidRef}
            className="w-full overflow-x-auto flex justify-center py-6"
            dangerouslySetInnerHTML={{ __html: mermaidSvg }}
          />
        ) : arch.diagramImage?.asset ? (
          /* Diagram Image if present */
          <div className="w-full flex justify-center py-6">
            <Image
              src={urlFor(arch.diagramImage).width(1200).auto("format").url()}
              alt={`${project.title} architecture diagram`}
              width={1000}
              height={500}
              className="rounded-[18px] max-w-full h-auto object-contain"
            />
          </div>
        ) : (
          /* Structured Nodes Flow matching Reference Screen 2 */
          <div className="w-full py-4 mb-8">
            {/* First Row */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-6">
              {firstRow.map((node, idx) => {
                const colors = kindColors[node.kind] || kindColors.server;
                return (
                  <React.Fragment key={`${node.label}-${idx}`}>
                    <div
                      className="rounded-[18px] border px-5 py-3.5 flex flex-col justify-center min-w-[150px] shadow-sm"
                      style={{
                        borderColor: colors.border,
                        backgroundColor: colors.bg,
                      }}
                    >
                      <span className="font-mono text-[10px] uppercase tracking-wider text-white/50 mb-0.5">
                        {node.kind}
                      </span>
                      <span className="font-bold text-white text-base">
                        {node.label}
                      </span>
                      {node.sublabel && (
                        <span className="font-mono text-xs text-[#A89FC8]">
                          {node.sublabel}
                        </span>
                      )}
                    </div>

                    {idx < firstRow.length - 1 && (
                      <ArrowRight className="w-5 h-5 text-white/30 shrink-0" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Second Row */}
            {secondRow.length > 0 && (
              <div className="flex flex-wrap items-center gap-3 md:gap-4 pl-0 md:pl-8">
                <CornerDownRight className="w-5 h-5 text-white/30 shrink-0 hidden md:block" />
                {secondRow.map((node, idx) => {
                  const colors = kindColors[node.kind] || kindColors.storage;
                  return (
                    <React.Fragment key={`${node.label}-${idx}`}>
                      <div
                        className="rounded-[18px] border px-5 py-3.5 flex flex-col justify-center min-w-[150px] shadow-sm"
                        style={{
                          borderColor: colors.border,
                          backgroundColor: colors.bg,
                        }}
                      >
                        <span className="font-mono text-[10px] uppercase tracking-wider text-white/50 mb-0.5">
                          {node.kind}
                        </span>
                        <span className="font-bold text-white text-base">
                          {node.label}
                        </span>
                        {node.sublabel && (
                          <span className="font-mono text-xs text-[#A89FC8]">
                            {node.sublabel}
                          </span>
                        )}
                      </div>

                      {idx < secondRow.length - 1 && (
                        <ArrowLeftRight className="w-5 h-5 text-white/30 shrink-0" />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Request flow & design decision description */}
        <p className="text-[17px] md:text-[18px] leading-relaxed text-[#D9D2F2] border-t border-white/10 pt-6 max-w-4xl">
          {description}
        </p>
      </div>
    </section>
  );
}
