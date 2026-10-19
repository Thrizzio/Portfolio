import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "resume" | "dark";
  href?: string;
  icon?: React.ReactNode;
  external?: boolean;
}

export function Button({
  children,
  variant = "primary",
  href,
  icon,
  external,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-[#C8FF3D] text-[#17112B] hover:bg-[#d4ff61] px-6 py-3.5 text-lg font-bold shadow-[0_0_20px_rgba(200,255,61,0.25)] hover:shadow-[0_0_28px_rgba(200,255,61,0.4)]",
    secondary:
      "bg-transparent text-white border-[1.5px] border-white/30 hover:border-white/60 hover:bg-white/5 px-6 py-3 text-base font-medium",
    resume:
      "bg-transparent text-[#FF8FC4] border-[1.5px] border-[#FF5CA8] hover:bg-[#FF5CA8]/10 px-5 py-2.5 text-base font-medium",
    dark:
      "bg-[#17112B] text-[#C8FF3D] hover:bg-[#20183b] px-7 py-3.5 text-lg font-bold",
  };

  const combinedClass = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClass}
        >
          {icon}
          <span>{children}</span>
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClass}>
        {icon}
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button className={combinedClass} {...props}>
      {icon}
      <span>{children}</span>
    </button>
  );
}
