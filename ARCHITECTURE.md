# Architecture Documentation

## 1. System Overview & Technology Stack

The portfolio is built as an end-to-end, high-performance web application designed for engineering recruiters and hiring managers. It balances rich visual aesthetics (high contrast aubergine ground `#0F0B1E`, vivid lime `#C8FF3D` and pink `#FF5CA8` accents) with technical transparency ("Honest Knowledge Checks" and real-time "Role Filters").

- **Framework**: Next.js 16 (App Router, Turbopack, React Server Components, TypeScript Strict).
- **Styling**: Tailwind CSS v4 design tokens via CSS variables in `app/globals.css`.
- **Typography**: Next.js Google Font optimization (`Bricolage_Grotesque` display font, `DM_Mono` code/meta font).
- **CMS / Headless Data Layer**: Sanity Studio v3 embedded at `/studio`, queried via GROQ and strongly typed schemas.
- **On-Demand Cache Revalidation**: Route handler at `/api/revalidate` with HMAC/token verification and tagged tag revalidation.
- **Syntax Highlighting**: Shiki with `tokyo-night` theme and copy-to-clipboard functionality.
- **3D Graphics & Animations**: Three.js + React Three Fiber (`@react-three/fiber`, `@react-three/drei`) with pure CSS 3D fallback (`CubeCSS.tsx`) and WebGL capability detection.
- **Accessibility & Motion**: Fully respects `prefers-reduced-motion` and provides touch targets $\ge 44\text{px}$.

---

## 2. Directory Structure & Key Modules

```
Aadi-Portfolio/
├── app/
│   ├── (site)/                       # Main public application route group
│   │   ├── layout.tsx                # Site layout (sticky Header, 3D Loader, Footer, MobileNav)
│   │   ├── page.tsx                  # Work page (Hero, FilterBar, Legend, Project Cards)
│   │   ├── work/[slug]/page.tsx      # Deep dive Project Detail page
│   │   ├── about/page.tsx            # About page, stack groups, experience & education timeline
│   │   ├── notes/
│   │   │   ├── page.tsx              # Notes index (slugs, hooks, tags, read times)
│   │   │   └── [slug]/page.tsx       # Note reader with Shiki syntax highlighting
│   │   └── resume/page.tsx           # Resume viewer & download route
│   ├── api/revalidate/route.ts       # On-demand cache revalidation endpoint
│   ├── studio/[[...tool]]/page.tsx   # Embedded Sanity Studio
│   ├── globals.css                   # Tailwind v4 theme tokens and ambient glows
│   ├── layout.tsx                    # Root HTML/body shell, Google fonts, background ambient radial glows
│   ├── not-found.tsx                 # Custom 404 page with high-contrast styling
│   ├── opengraph-image.tsx           # Dynamic 1200x630 OG image generation
│   ├── robots.ts                     # SEO robots configuration
│   └── sitemap.ts                    # Dynamic XML sitemap generator
├── components/
│   ├── about/                        # StackGroups, Timeline
│   ├── header/                       # Header (sticky desktop bar), MobileNav (bottom pill bar)
│   ├── loader/                       # Loader, Cube3D, CubeCSS (fallback), useSessionOnce
│   ├── notes/                        # NoteRow, CodeBlock, PortableTextRenderer
│   ├── project/                      # Hero, MetaCard, KnowledgeCheck, TechStack, Architecture, Gallery, Lightbox, TryIt, Decisions, NextProject
│   ├── ui/                           # Button, Chip, SectionLabel, ResumeBand, Footer, Icons
│   └── work/                         # FilterBar, ProjectCard, PopOut, KnowledgePill, Legend
├── lib/
│   ├── constants.ts                  # Shared KNOWLEDGE_LEVELS definitions and color tokens
│   ├── sanity/
│   │   ├── client.ts                 # Sanity client & tagged sanityFetch helper
│   │   ├── image.ts                  # Sanity image URL builder with crop/hotspot
│   │   ├── queries.ts                # GROQ queries for projects, notes, timeline, settings
│   │   └── types.ts                  # TypeScript domain models
├── sanity/
│   ├── schemas/                      # project, role, note, experience, siteSettings
│   ├── structure.ts                  # Sanity desk structure with siteSettings singleton
│   └── sanity.config.ts              # Sanity Studio configuration
└── scripts/
    └── seed.ts                       # CLI seed script populating 4 roles, 6 projects, 3 notes, 3 experiences, and settings
```

---

## 3. Data & Control Flow

1. **Content Authoring & Persistence**:
   - Editors manage roles, projects, notes, timeline entries, and site settings directly inside `/studio`.
   - All editable content is persisted in Sanity's global Content Lake.
2. **Data Fetching & Static Generation**:
   - Server Components execute GROQ queries at build time via `sanityFetch`.
   - Every project and note route (`/work/[slug]` and `/notes/[slug]`) implements `generateStaticParams` to pre-render static HTML.
   - Sanity tags (`project`, `note`, `experience`, `siteSettings`, `role`) are attached to Next.js fetch cache.
3. **Cache Invalidation & Freshness**:
   - When content updates in Sanity, a webhook posts to `/api/revalidate?tag=project&secret=...`.
   - The route handler verifies `SANITY_REVALIDATE_SECRET` and triggers `revalidateTag(tag)`.
4. **Client-Side Interactivity**:
   - `FilterBar.tsx` synchronizes role selections with the browser URL (`?role=...`), computes project counts, and filters the grid with zero network latency.
   - `Loader.tsx` executes once per browser session using `sessionStorage`, automatically skipping for users with `prefers-reduced-motion` enabled.
   - Interactive pop-outs on project cards feature custom CSS device frames for Web, Mobile, and CLI/Desktop targets.
