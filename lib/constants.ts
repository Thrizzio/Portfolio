export interface KnowledgeLevelInfo {
  key: "built" | "architecture" | "vibe";
  label: string;
  pillLabel: string;
  color: string;
  dotClass: string;
  badgeClass: string;
}

export const KNOWLEDGE_LEVELS: Record<"built" | "architecture" | "vibe", KnowledgeLevelInfo> = {
  built: {
    key: "built",
    label: "Built it, own the code",
    pillLabel: "Built it · own the code",
    color: "#C8FF3D",
    dotClass: "bg-[#C8FF3D]",
    badgeClass: "border-[#C8FF3D]/40 text-[#C8FF3D]",
  },
  architecture: {
    key: "architecture",
    label: "Know the architecture",
    pillLabel: "Know the architecture",
    color: "#7C8BFF",
    dotClass: "bg-[#7C8BFF]",
    badgeClass: "border-[#7C8BFF]/40 text-[#7C8BFF]",
  },
  vibe: {
    key: "vibe",
    label: "Vibe-coded, still learning",
    pillLabel: "Vibe-coded · learning",
    color: "#FF5CA8",
    dotClass: "bg-[#FF5CA8]",
    badgeClass: "border-[#FF5CA8]/40 text-[#FF5CA8]",
  },
};

export const ACCENT_COLORS: Record<string, { hex: string; textHex: string; borderHex: string }> = {
  lime: {
    hex: "#C8FF3D",
    textHex: "#C8FF3D",
    borderHex: "rgba(200, 255, 61, 0.4)",
  },
  pink: {
    hex: "#FF5CA8",
    textHex: "#FF8FC4",
    borderHex: "rgba(255, 92, 168, 0.4)",
  },
  blue: {
    hex: "#7C8BFF",
    textHex: "#7C8BFF",
    borderHex: "rgba(124, 139, 255, 0.4)",
  },
  orange: {
    hex: "#FF9248",
    textHex: "#FF9248",
    borderHex: "rgba(255, 146, 72, 0.4)",
  },
  lilac: {
    hex: "#B8A4FF",
    textHex: "#B8A4FF",
    borderHex: "rgba(184, 164, 255, 0.4)",
  },
};
