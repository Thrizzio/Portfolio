import React from "react";

interface ChipProps {
  children: React.ReactNode;
  active?: boolean;
  variant?: "tech" | "filter" | "knowledge";
  onClick?: () => void;
  className?: string;
  dotColor?: string;
}

export function Chip({
  children,
  active = false,
  variant = "tech",
  onClick,
  className = "",
  dotColor,
}: ChipProps) {
  const baseStyles =
    "font-mono text-xs md:text-[13px] rounded-full inline-flex items-center gap-1.5 transition-all duration-200";

  let variantStyles = "";

  if (variant === "filter") {
    variantStyles = active
      ? "bg-[#C8FF3D] text-[#17112B] font-bold px-4 py-2 cursor-pointer shadow-[0_0_15px_rgba(200,255,61,0.3)]"
      : "bg-[#1A1433] text-[#D9D2F2] border border-white/10 hover:border-white/30 px-4 py-2 cursor-pointer";
  } else if (variant === "tech") {
    variantStyles =
      "bg-white/[0.07] text-[#D9D2F2] border border-white/5 px-2.5 py-1 text-xs";
  } else if (variant === "knowledge") {
    variantStyles =
      "bg-transparent border border-white/15 text-[#D9D2F2] px-3 py-1 text-xs";
  }

  return (
    <span
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {dotColor && (
        <span
          className="w-2 h-2 rounded-full inline-block shrink-0"
          style={{ backgroundColor: dotColor }}
        />
      )}
      {children}
    </span>
  );
}
