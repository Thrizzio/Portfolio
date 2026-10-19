import React from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ResumeBand } from "@/components/ui/ResumeBand";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";

export default function Home() {
  return (
    <div className="site-container py-12">
      <SectionLabel number="01" label="STACK" />
      <div className="flex flex-wrap gap-3 my-6">
        <Chip active variant="filter">
          All
        </Chip>
        <Chip variant="filter">AI / LLM</Chip>
        <Chip variant="tech">React</Chip>
        <Chip variant="knowledge" dotColor="#C8FF3D">
          Built it
        </Chip>
      </div>
      <div className="flex gap-4 my-6">
        <Button variant="primary">▶ Try the live demo</Button>
        <Button variant="secondary">Watch walkthrough</Button>
        <Button variant="resume">Resume</Button>
      </div>
      <ResumeBand />
    </div>
  );
}
