import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Mono } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aadi — CS Undergrad Building AI-Powered Products",
  description:
    "Personal portfolio of Aadi: CS undergrad building AI/LLM products with honest knowledge checks and role filters.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bricolage.variable} ${dmMono.variable}`}>
      <body className="font-sans antialiased bg-[#0F0B1E] text-[#F4F0FF] selection:bg-[#C8FF3D] selection:text-[#17112B]">
        <div className="ambient-glows" aria-hidden="true">
          <div className="ambient-glow-blue" />
          <div className="ambient-glow-pink" />
          <div className="ambient-glow-lilac" />
        </div>
        <div className="relative z-10 flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
