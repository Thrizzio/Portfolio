import React from "react";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/ui/Footer";
import { MobileNav } from "@/components/header/MobileNav";
import { Loader } from "@/components/loader/Loader";
import { sanityFetch } from "@/lib/sanity/client";
import { siteSettingsQuery } from "@/lib/sanity/queries";
import type { SiteSettings } from "@/lib/sanity/types";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let siteSettings: SiteSettings | null = null;
  try {
    siteSettings = await sanityFetch<SiteSettings>({
      query: siteSettingsQuery,
      tags: ["siteSettings"],
    });
  } catch (e) {
    console.error("Failed to load siteSettings:", e);
  }

  return (
    <>
      <Loader />
      <Header siteSettings={siteSettings} />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <Footer
        github={siteSettings?.github}
        linkedin={siteSettings?.linkedin}
        email={siteSettings?.email}
      />
      <MobileNav />
    </>
  );
}
