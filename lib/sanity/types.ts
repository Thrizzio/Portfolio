export type AccentColor = "lime" | "pink" | "blue" | "orange" | "lilac";

export type KnowledgeLevel = "built" | "architecture" | "vibe";

export interface Role {
  _id: string;
  title: string;
  slug: { current: string };
  order: number;
}

export interface TechItem {
  name: string;
  icon?: string;
  color?: string;
  why?: string;
}

export interface TechStackGroup {
  group: string;
  items: TechItem[];
}

export interface ArchitectureNode {
  label: string;
  sublabel?: string;
  kind: "entry" | "server" | "logic" | "model" | "storage" | "client";
}

export interface ProjectDecision {
  title: string;
  body: string;
}

export interface SanityImageReference {
  _type?: string;
  asset?: {
    _ref?: string;
    _type?: string;
    url?: string;
  };
}

export interface ProjectGalleryItem {
  image?: SanityImageReference;
  caption?: string;
}

export interface KnowledgeCheck {
  level: KnowledgeLevel;
  code: number;
  architecture: number;
  logic: number;
  codeCaption?: string;
  architectureCaption?: string;
  logicCaption?: string;
  canExplain?: string;
  stillLearning?: string;
}

export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  order: number;
  featured?: boolean;
  tagline: string;
  summary: string;
  roles?: Role[];
  platform: "web" | "mobile" | "desktop" | "cli" | "api";
  accent: AccentColor;
  heroImage?: SanityImageReference;
  popOutImage?: SanityImageReference;
  knowledge: KnowledgeCheck;
  myRole?: string;
  startDate?: string;
  endDate?: string;
  status: "live" | "in-progress" | "archived";
  problem?: string;
  solution?: string;
  outcome?: string;
  techStack?: TechStackGroup[];
  architecture?: {
    mermaid?: string;
    diagramImage?: SanityImageReference;
    nodes?: ArchitectureNode[];
    description?: string;
  };
  gallery?: ProjectGalleryItem[];
  demo?: {
    liveUrl?: string;
    embedAllowed?: boolean;
    videoUrl?: string;
    runLocally?: string;
  };
  links?: {
    github?: string;
    docs?: string;
    other?: { label: string; url: string }[];
  };
  decisions?: ProjectDecision[];
}

export interface PortableTextBlock {
  _key?: string;
  _type: string;
  children?: { _key?: string; _type?: string; text?: string; marks?: string[] }[];
  language?: string;
  code?: string;
  filename?: string;
  caption?: string;
  alt?: string;
  asset?: { _ref?: string; url?: string };
}

export interface Note {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  tag: string;
  hook: string;
  accent: AccentColor;
  cover?: SanityImageReference;
  body?: PortableTextBlock[];
  featured?: boolean;
}

export interface Experience {
  _id: string;
  title: string;
  organization: string;
  type?: string;
  startDate: string;
  endDate?: string;
  description?: string;
  kind: "work" | "education";
  order: number;
}

export interface SiteSettings {
  name: string;
  tagline?: string;
  introHeadline?: string;
  introBody?: string;
  email?: string;
  github?: string;
  linkedin?: string;
  otherLinks?: { label: string; url: string }[];
  resumeFile?: {
    asset?: {
      url: string;
      originalFilename?: string;
    };
  };
  availabilityText?: string;
  techGroups?: {
    title: string;
    items: { name: string; color?: string }[];
  }[];
}
