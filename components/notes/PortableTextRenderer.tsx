import React from "react";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { codeToHtml } from "shiki";
import { CodeBlock } from "./CodeBlock";
import type { PortableTextBlock } from "@/lib/sanity/types";

// Helper component for async code highlighting
async function HighlightedCode({ value }: { value: { code?: string; language?: string; filename?: string } }) {
  const code = value.code || "";
  const lang = value.language || "typescript";
  let html = "";
  try {
    html = await codeToHtml(code, {
      lang,
      theme: "tokyo-night",
    });
  } catch {
    html = `<pre><code>${code}</code></pre>`;
  }

  return (
    <CodeBlock
      code={code}
      language={lang}
      filename={value.filename}
      html={html}
    />
  );
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 text-2xl md:text-3xl font-bold tracking-tight text-white group flex items-center gap-2">
        <span>{children}</span>
        <span className="text-[#C8FF3D] opacity-0 group-hover:opacity-100 transition-opacity">#</span>
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-xl md:text-2xl font-bold tracking-tight text-white">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="my-5 text-base md:text-lg leading-[1.65] text-[#D9D2F2]">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-[3px] border-[#C8FF3D] bg-white/[0.03] pl-5 pr-4 py-4 rounded-r-xl text-base md:text-lg text-white/90 italic leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-5 pl-6 space-y-2 text-base md:text-lg text-[#D9D2F2] list-disc marker:text-[#C8FF3D]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-5 pl-6 space-y-2 text-base md:text-lg text-[#D9D2F2] list-decimal marker:text-[#C8FF3D] font-mono">
        {children}
      </ol>
    ),
  },
  marks: {
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 rounded bg-white/[0.08] text-[#C8FF3D] font-mono text-[0.88em]">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const href = value?.href || "#";
      const isExternal = href.startsWith("http");
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C8FF3D] underline underline-offset-4 hover:text-white transition-colors"
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          href={href}
          className="text-[#C8FF3D] underline underline-offset-4 hover:text-white transition-colors"
        >
          {children}
        </Link>
      );
    },
    strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
    em: ({ children }) => <em className="italic text-white/90">{children}</em>,
  },
  types: {
    code: ({ value }) => <HighlightedCode value={value} />,
  },
};

interface PortableTextRendererProps {
  value: PortableTextBlock[];
}

export function PortableTextRenderer({ value }: PortableTextRendererProps) {
  if (!value || value.length === 0) return null;

  // Cast value to any because sanity's PortableText expects TypedObject
  return (
    <div className="prose prose-invert max-w-none">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <PortableText value={value as any} components={components} />
    </div>
  );
}
