"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  html?: string;
}

export function CodeBlock({ code, language = "typescript", filename, html }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="my-6 rounded-[18px] bg-[#150F29] border border-white/10 overflow-hidden font-mono text-sm">
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.03] border-b border-white/10">
        <div className="flex items-center gap-2 text-xs text-[#A89FC8]">
          <span className="w-2.5 h-2.5 rounded-full bg-white/20 inline-block" />
          <span>{filename || language}</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono text-[#A89FC8] hover:text-white hover:bg-white/[0.08] transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#C8FF3D]" />
              <span className="text-[#C8FF3D]">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="p-4 overflow-x-auto text-[13px] leading-relaxed text-[#F4F0FF]">
        {html ? (
          <div
            dangerouslySetInnerHTML={{ __html: html }}
            className="[&>pre]:!bg-transparent [&>pre]:!p-0 [&>pre]:!m-0 [&_code]:!font-mono"
          />
        ) : (
          <pre className="!bg-transparent !p-0 !m-0 font-mono">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
  );
}
