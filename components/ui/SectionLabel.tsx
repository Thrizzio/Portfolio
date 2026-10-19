import React from "react";

interface SectionLabelProps {
  number: string;
  label: string;
  className?: string;
}

export function SectionLabel({ number, label, className = "" }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-2 mb-6 ${className}`}>
      <span className="font-mono text-[13px] font-bold text-[#C8FF3D]">
        {number}
      </span>
      <span className="font-mono text-[13px] tracking-[0.14em] uppercase text-[#A89FC8]">
        / {label}
      </span>
      <span className="inline-block w-12 h-[2px] bg-[#C8FF3D] ml-2" />
    </div>
  );
}
