# ONE-SHOT BUILD PROMPT — Aadi's Portfolio

You are a senior full-stack engineer and front-end designer. Build the complete personal portfolio site described below, end to end, in one pass. Think through the whole architecture before writing code. Then scaffold, build in the order given in **§14 Build order**, and finish by running type-check, lint and a production build and fixing everything that fails. Do not stop at a skeleton: every page, component and CMS schema below must exist and work.

**Hard rules**
- Never invent facts about me. Anything written in `[square brackets]` is a placeholder: render it exactly as written and make it trivially editable in the CMS. No lorem ipsum.
- Do not use emoji in the UI. Icons are inline SVG (or `lucide-react`, stroke style).
- Honour `prefers-reduced-motion` everywhere.
- Everything editable (projects, notes, experience, links, resume) lives in the CMS, never hard-coded in components.

---

## 1. What this is

A personal portfolio for **Aadi**, a second-year CS undergraduate (MIT ADT University) who builds AI/LLM-powered products (Node.js/Express, Next.js/React, Claude API, RAG, agents, evals, Flutter/Firebase mobile). Audience: recruiters and hiring managers. Personality: confident, funky, unmistakable, to the point.

Two features make it unusual and must be prominent:
1. **Role filter.** A recruiter picks the role they're hiring for and only the relevant projects are shown.
2. **Honest knowledge check.** Every project shows how well I actually know its code. Many projects started vibe-coded; the site says so openly.

## 2. Tech stack

| Concern | Choice |
|---|---|
| Framework | Next.js (latest stable), App Router, React Server Components, TypeScript strict |
| Styling | Tailwind CSS + CSS variables for design tokens (§4) |
| Fonts | `next/font/google`: **Bricolage Grotesque** (500, 700, 800) and **DM Mono** (400, 500) |
| Animation / UI motion | `motion` (the package formerly named `framer-motion`) |
| Loading screen 3D | `three`, `@react-three/fiber`, `@react-three/drei` (+ `@types/three`) |
| Smooth scroll (optional, subtle) | `lenis` |
| CMS | **Sanity** (`sanity`, `next-sanity`, `@sanity/vision`, `@sanity/image-url`), Studio embedded at `/studio` |
| Code highlighting in notes | `shiki` |
| Icons | `lucide-react` |
| Hosting | Vercel (assume it; no vendor lock-in code) |

Use the latest stable version of each package at install time. Pin nothing exotic. If any of the above cannot work together, pick the closest working alternative and note it in `README.md`.

## 3. Why a CMS (and why Sanity)

I want to add projects and notes without touching code or redeploying. So: yes, use a headless CMS. Sanity gives an embeddable Studio inside the same Next.js repo, a generous free tier, an image CDN with hotspot crop, rich text (Portable Text) for notes, and webhooks for instant revalidation. Content model is in §9.

- Fetch with GROQ via `next-sanity` in server components, using tagged fetches.
- Set up an on-demand revalidation route handler `POST /api/revalidate` verified with `SANITY_REVALIDATE_SECRET`, wired to a Sanity webhook (document the setup in the README).
- Provide a `scripts/seed.ts` that imports seed content (§10) so the site renders fully on first run. Provide `.env.example`.

## 4. Design system

Dark, saturated, high-contrast. Deep aubergine ground with four loud accents. One accent is "the main one" (lime).

**Color tokens (CSS variables, and mirrored in Tailwind theme):**
```
--bg:        #0F0B1E   /* page */
--surface:   #1A1433   /* cards, inputs */
--surface-2: #150F29   /* large panels (timeline, architecture) */
--line:      rgba(255,255,255,0.09)
--text:      #F4F0FF
--text-soft: #D9D2F2
--text-mute: #C9C0E6
--text-dim:  #A89FC8
--text-faint:#8A80AD
--lime:      #C8FF3D   /* primary accent, active nav, CTAs, "Built it" level */
--ink:       #17112B   /* text on lime */
--pink:      #FF5CA8   /* secondary accent, "Vibe-coded" level */
--pink-text: #FF8FC4   /* pink used as text on dark */
--blue:      #7C8BFF   /* "Know the architecture" level */
--orange:    #FF9248
--lilac:     #B8A4FF
```
Background decoration: two or three large blurred radial gradients (blue top-right, pink lower-left, ~500–650px, 20–38% opacity fading to transparent). No noise textures, no gradient-text.

**Typography**
- Display and body: Bricolage Grotesque. Labels, tags, metadata, code: DM Mono.
- Giant page titles ("Work.", "Notes.", "Hi, I'm Aadi."): weight 800, letter-spacing -0.05em, line-height 0.85–0.9, `clamp(96px, 14vw, 200px)`. The trailing period is coloured (lime title + pink period, or the reverse).
- Section label: DM Mono 13px, uppercase, letter-spacing .14em, colour `--text-dim`, in the form `01 / STACK ——` where the number is lime and a 48×2px lime rule follows.
- Body 17–20px, line-height 1.45–1.55. Card titles 28–30px/700, letter-spacing -0.02em.
- Tags and chips: DM Mono 12–13px.

**Shape and spacing**
- Container: `max-width: 1296px`, horizontal padding 32px (16px on mobile).
- Radii: cards 26px, big panels 28–36px, inputs/chips/buttons fully pill (999px).
- Card border: `1px solid var(--line)`; hover border becomes lime at 50% opacity.
- Primary button: lime fill, `--ink` text, 700 weight, pill, 18–22px text. Secondary: transparent, 1.5px border `rgba(255,255,255,.3)`. Resume button: transparent, 1.5px `--pink` border, `--pink-text` text, with a file icon.

**Motion**
- Cards lift `translateY(-8px)` on hover (250ms ease); the pop-out image lifts a further 10px and rotates -3deg.
- Note rows nudge `translateX(8px)` on hover.
- Route changes: 200ms fade/slide. Entry animations are subtle and run once. All of it disabled under reduced motion.

## 5. Global header (identical on every page)

Plain, basic, sticky top bar. **No left sidebar anywhere on the site.**

- Sticky, `top:0`, background `rgba(15,11,30,.88)` with backdrop blur, 1px bottom border `--line`. Inner container max 1296px, vertical padding 12px, flex, wraps gracefully.
- Left: wordmark **`Aadi.`** (32px/800, lime period), links to `/`.
- Centre-left: nav links **Work, About, Notes, Contact**. 17px/500, pill-shaped hit areas (9px 18px). The active page has a lime pill with `--ink` text, 700. "Contact" smooth-scrolls to the footer contact block.
- Right, in a row (gap 10px): three 44×44 circular icon buttons with a 1px `rgba(255,255,255,.18)` border: **GitHub, LinkedIn, Email** (each has an `aria-label`), then the pink **Resume** button with file icon.
- All URLs come from `siteSettings` in the CMS.
- **Mobile (<768px):** header shows wordmark + icon buttons; the nav moves to a fixed bottom pill bar (Work / About / Notes / Resume), 16px inset, dark translucent, lime active pill. Page bottom padding accounts for it.

## 6. Pages and routes

### 6.1 Loading screen (intro)
A full-screen intro, shown **once per session** (`sessionStorage`), skipped for crawlers and when `prefers-reduced-motion`. It must feel designed, not like a spinner.

- Background `--bg` with a large blue radial glow behind the centre and a pink glow bottom-right. Top-left mono label `PORTFOLIO / 2026`, top-right `v1.0`.
- Centre: a **3D wireframe cube** rotating on Y (≈9s per turn) with a fixed -24° tilt. Faces are outlined (2px) and tinted translucent: lime, pink, blue, orange on different faces. Around it two dashed elliptical orbit rings rotating in opposite directions (lilac and lime at ~50% opacity).
- Implement with `@react-three/fiber` (`<Canvas>` with `dpr={[1,2]}`, orthographic or narrow-FOV perspective camera, `EdgesGeometry`/`LineSegments` for the wireframe plus low-opacity `MeshBasicMaterial` faces). Load it with `next/dynamic` and `ssr:false`. Keep it under ~150KB of added JS where possible.
- Below it: `Aadi.` (72px/800, lime period), mono caption `COMPILING PROJECTS…` (letter-spacing .12em), and a 360×6px progress bar (lime→pink gradient).
- Progress is real: drive it from `useProgress()` (drei) and from fonts + first-route data being ready, with a minimum visible time of ~1.2s and a maximum of ~3s. On complete, fade the whole screen out (400ms) to reveal the page.
- Fallback for no-WebGL or reduced motion: a pure CSS version (static cube drawn with CSS 3D transforms, no spinning) or skip entirely.

### 6.2 Work — `/` (home)
- Hero block: mono eyebrow `HI, I'M AADI — CS UNDERGRAD BUILDING AI-POWERED PRODUCTS`, giant title **`Work.`**, one-line prompt "Hiring for a role? Pick it below and I'll only show what's relevant."
- **Filter bar:** a pill search input (searches title, tagline and tech names) and role chips: **All, AI / LLM, Full-stack, Mobile, Backend** (chips are generated from the `role` values in the CMS, "All" first). Active chip: lime fill, ink text. Selecting a chip filters instantly on the client and updates the URL (`/?role=ai-llm`) so a filtered view is shareable. Show a mono count line, e.g. `4 PROJECTS · AI / LLM`.
- **Legend bar** (rounded rectangle, 4% white): `HOW WELL I KNOW IT →` then three dots with labels: lime *Built it, own the code*, blue *Know the architecture*, pink *Vibe-coded, still learning*.
- **Project grid:** `repeat(auto-fill, minmax(340px, 1fr))`, column gap 28px, row gap 64px, 36px top padding (room for the pop-out).
- **Project card** (the whole card is a link to `/work/[slug]`):
  - `surface` background, 26px radius, padding `0 26px 26px`.
  - A **pop-out visual** sits in the top 190px and overflows the card by 36px (`margin-top:-36px`), rotated -2deg with a soft drop shadow. It is the project's `popOutImage` if provided, otherwise a generated device frame in the project's accent colour: a phone frame (104×212) for mobile, a browser window (250×170) for web, a terminal (250×150) for CLI/desktop. Each frame is simple CSS shapes in the accent colour, as a graceful fallback.
  - Knowledge pill (outlined, mono 12px, coloured dot) with the level label.
  - Title 30px/700, one-line description 17px in `--text-mute`, then up to 4 tech chips (mono 12px, 7% white fill) and an arrow-up-right icon in the accent colour at the end.
- **Resume band** at the bottom: full-width lime panel (radius 32px, padding 56px) with mono label `THE SHORT VERSION`, 56px/800 "Want the full story?", and a dark pill button **View resume ↗** (ink background, lime text). This band appears at the bottom of Work and About.
- **Footer** (`#contact`): `© 2026 Aadi`, GitHub / LinkedIn / Email links, plus a large email link.

### 6.3 Project detail — `/work/[slug]`
A full page (not a modal). Statically generated from the CMS, with `generateStaticParams` and metadata/OG image per project. Sections in this order (omit a section gracefully if its CMS data is empty):

1. **Hero:** `← ALL WORK` mono link; row of pills (knowledge level + role tags); title at `clamp(64px, 11vw, 150px)`/800 with coloured period in the accent colour; tagline (26px); three buttons: lime **▶ Try the live demo**, outlined **Watch walkthrough**, outlined **Source on GitHub ↗**.
2. **Hero media:** a 560px-tall panel (radius 36px) with a diagonal gradient from the accent at ~50% to ~8% opacity, the hero screenshot/GIF centred inside a device or browser frame rotated -2deg with heavy shadow. Below it a 4-column meta card: **ROLE, TIMELINE, PLATFORM, STATUS** (mono labels, 22px/700 values; status in lime).
3. **`01 / OVERVIEW`:** three columns — *The problem* (pink heading), *What I built* (lime), *What happened* (blue). 30px/700 headings, 19px body.
4. **`02 / HONEST KNOWLEDGE CHECK`:** a panel with three 5-segment bars — **Code** (lime), **Architecture** (blue), **Logic** (pink) — with filled segments from the 0–5 CMS value and a mono caption to the right (`can read & edit`, `can explain it`, `still learning` or custom). Beside it two cards: *I can explain* (lime border at 30%) and *Still learning* (pink border at 30%) with free text. Bars must have accessible text (e.g. `aria-label="Code: 3 out of 5"`).
5. **`03 / TECH STACK`:** grid of group cards (Runtime & API, AI, Data, Frontend & hosting, etc. — from CMS). Each lists logo-style chips (a coloured circle with the letter, or the real brand icon via `simple-icons` when available) and a **Why:** line explaining the choice.
6. **`04 / ARCHITECTURE`:** a large `surface-2` panel (radius 32px). Render the architecture as a **diagram**: if the CMS has a Mermaid source, render it client-side with `mermaid` themed to the palette; else if it has a diagram image, show that; else render the node-box flow from structured `architecture.nodes` (each node: label, sublabel, kind → border colour; with arrows between them, wrapping to a second row). Below it a paragraph explaining the request flow and the best design decision.
7. **`05 / SCREENSHOTS`:** a 3-column masonry-ish grid (first tile spans 2 columns), 24px radius tiles, captions in mono, click opens an accessible lightbox with keyboard navigation (Esc, ←, →) and focus trapping.
8. **`06 / TRY IT`:** "No sign-in needed. Poke around with sample data." A **browser-frame iframe** embedding the live demo (only if `demo.embedAllowed`; otherwise a big card linking out), a **video walkthrough** card (YouTube/Loom/MP4 — lazy-loaded, click-to-play, thumbnail with large pink play button), and a **"Run it locally"** terminal block (mono, dark `#07050F`) with a copy button. Every demo must be publicly viewable; the CMS validates that a live URL is present before `status` can be "Live".
9. **`07 / DECISIONS & CHALLENGES`:** three cards (title + body) — includes "What I'd do next".
10. **Next project** lime band linking to the next project in CMS order, then footer.

### 6.4 About — `/about`
- Giant title **`Hi, I'm Aadi.`**; a 32px intro paragraph; a 20px honesty paragraph ("Some of my projects started as vibe-coded experiments. On each one I say how much of the code I actually understand.").
- **`01 / STACK`:** four group cards (Frontend, Backend, AI / LLM, Mobile) with logo chips, all from the CMS (`techGroup` docs or fields on `siteSettings`).
- **`02 / EXPERIENCE`:** giant `Experience.` title, then one rounded `surface-2` panel (radius 32px, 44px padding) containing a **vertical timeline**: each entry has a 18px hollow circle (3px border, rotating lime / pink / blue) joined by a 2px line at 50% opacity, the role (30px/700), organisation (18px, `--text-mute`), dates in mono 13px, and a one-sentence description. A narrow right column (hidden below 900px) with a left border carries two short mono taglines. Education is the last entry. Entries come from the `experience` documents, ordered by `startDate` desc.
- Resume band and footer as in §6.2.
- **No sidebar.**

### 6.5 Notes — `/notes` and `/notes/[slug]`
- Index: centred layout (max-width 900px). Giant `Notes.` title (lime, pink period), a 26px centred subtitle, then a vertical list of note rows. Each row: 28px radius, `surface` background, coloured 1px border at ~35% (cycling lime / pink / blue), a mono meta line `DATE · TAG` in the same accent, 34px/700 title, 19px one-line hook, and a 96px accent-coloured circle (or the note's cover image cropped to a circle) on the right. Hover nudges right.
- Detail: readable article column (max 720px), cover image, Portable Text rendering with styled headings, blockquote, lists, images with captions, and `shiki`-highlighted code blocks with a copy button; reading time; previous/next note links.
- Notes are authored entirely in the CMS.

### 6.6 Resume — `/resume`
Embeds the PDF from `siteSettings.resumeFile` in a full-height viewer with a **Download** button, and falls back to a link on mobile. The header Resume button and every "View resume" button go here.

### 6.7 Misc
- Custom 404 in the same visual language. `sitemap.xml`, `robots.txt`, per-page metadata and Open Graph images (`next/og`, dark background, lime title).

## 7. Responsive behaviour
- ≥1100px: layouts as described. 700–1100px: grids drop to 2 columns, giant titles scale via `clamp`. <700px: single column, header becomes logo + icons with a bottom nav bar, project cards stack with the pop-out preserved (smaller), filter chips scroll horizontally, detail-page columns stack, the architecture flow wraps vertically.
- Touch targets ≥44px. No horizontal page scroll at 360px width.

## 8. Accessibility and quality bar
- Semantic landmarks (`header`, `nav`, `main`, `footer`), one `h1` per page, real `<a>`/`<button>` elements, visible focus ring (2px lime, 2px offset), skip-to-content link.
- Text contrast ≥4.5:1 (check `--text-faint` usage: only for non-essential decoration).
- Colour is never the only signal for knowledge level: the pill always includes the text label.
- Lighthouse targets on production build: Performance ≥90 (mobile), Accessibility ≥95, SEO ≥95. The loader must not block LCP for returning visitors (session skip).
- Images through `next/image` with CMS-provided dimensions and blur placeholders.

## 9. CMS content model (Sanity schemas, TypeScript)

Create these document types under `sanity/schemas/` with sensible titles, descriptions and validation.

**`siteSettings`** (singleton): `name`, `tagline`, `introHeadline`, `introBody`, `email`, `github`, `linkedin`, `otherLinks[{label,url}]`, `resumeFile` (file, pdf), `availabilityText`, `techGroups[{title, items[{name, color}]}]` (for the About stack).

**`role`** (so chips are editable): `title` (e.g. "AI / LLM"), `slug`, `order`.

**`project`**:
- `title`, `slug`, `order`, `featured`
- `tagline` (one line), `summary` (card description, ≤120 chars)
- `roles[]` → references to `role`
- `platform`: web | mobile | desktop | cli | api (drives the fallback pop-out frame)
- `accent`: list (lime `#C8FF3D`, pink `#FF5CA8`, blue `#7C8BFF`, orange `#FF9248`, lilac `#B8A4FF`)
- `heroImage`, `popOutImage` (optional, transparent PNG/WebP, with a hint that it overflows the card)
- `knowledge`: `level` (built | architecture | vibe), `code` (0–5), `architecture` (0–5), `logic` (0–5), `codeCaption`, `architectureCaption`, `logicCaption`, `canExplain` (text), `stillLearning` (text)
- `myRole`, `startDate`, `endDate`, `status` (live | in-progress | archived)
- `problem`, `solution`, `outcome` (text)
- `techStack[]`: `{ group, items[{ name, icon?, color?, why? }] }`
- `architecture`: `mermaid` (text), `diagramImage` (image), `nodes[{ label, sublabel, kind: entry|server|logic|model|storage|client }]`, `description`
- `gallery[]`: `{ image, caption }`
- `demo`: `liveUrl`, `embedAllowed` (bool), `videoUrl`, `runLocally` (text)
- `links`: `github`, `docs`, `other[]`
- `decisions[]`: `{ title, body }`

**`note`**: `title`, `slug`, `publishedAt`, `tag`, `hook`, `accent`, `cover`, `body` (Portable Text with image and code blocks), `featured`.

**`experience`**: `title`, `organization`, `type`, `startDate`, `endDate` (empty = Present), `description`, `kind` (work | education).

Add Studio desk structure: Site settings (singleton), Projects (ordered), Roles, Notes, Experience. Add document previews showing the knowledge level.

## 10. Seed content (use exactly; keep `[brackets]` as placeholders)

Roles: `AI / LLM`, `Full-stack`, `Mobile`, `Backend`.

Projects (in order):
1. **AI Ticket Triage** — "Sorts and routes incoming support tickets using the Claude API." Roles: AI / LLM, Backend, Full-stack. Platform web. Accent blue. Level *architecture* (code 3, architecture 4, logic 2). Tech: Node.js, Express, SQLite, Claude API. Architecture nodes: Ticket intake (entry) → Express API (server) → Triage service (logic) → Claude API (model); Express API → SQLite (storage); Dashboard (client) ⇄ Express API.
2. **Dairy Collection App** — "Digitizes milk collection and batch traceability for a dairy co-op." Roles: Mobile. Platform mobile. Accent lime. Level *built*. Tech: Flutter, Firebase.
3. **AI GM Copilot** — "A tabletop RPG assistant where the human GM stays in control." Roles: AI / LLM, Full-stack. Platform web. Accent pink. Level *vibe*. Tech: Claude API, Next.js.
4. **Chronolog** — "A time-logging app, now getting a mobile version." Roles: Mobile, Full-stack. Platform mobile. Accent orange. Level *architecture*. Tech: `[Stack]`.
5. **CRIEYA Site** — `[One-line description of the project]`. Roles: Full-stack. Platform web. Accent lilac. Level *built*. Tech: React, Node.js.
6. **`[Desktop / CLI tool]`** — `[Screenshot or terminal pops out of the card here]`. Roles: Backend. Platform cli. Accent pink. Level *vibe*. Tech: `[Stack]`.

All other project fields (problem/solution/outcome, decisions, demo URLs, gallery) are placeholders in `[brackets]`. Knowledge levels above are dummy values I will edit.

Notes: three placeholder notes titled `[Note title goes here]` with hook `[One-line hook that makes someone click.]`, dates `[DATE]` rendered as today's date in the seed, tags `[TAG]`.

Experience: two entries titled `[Role title]` with `[Organization]`, dates `[Mon YYYY]`, description `[One sentence on what you did and shipped.]`; plus education: **B.Tech, Computer Science — MIT ADT University — 2nd year**.

Site settings: name Aadi; tagline "CS undergrad building AI-powered products — RAG, agents, evals."; availability "Open to opportunities"; email/GitHub/LinkedIn as placeholders (`you@example.com`, etc.).

Stack groups: Frontend (React, Next.js, Tailwind), Backend (Node.js, Express, PostgreSQL), AI / LLM (Claude API, RAG, Vector DBs), Mobile (Flutter, Firebase).

## 11. Project structure

```
app/
  (site)/layout.tsx, page.tsx            # Work
  (site)/work/[slug]/page.tsx
  (site)/about/page.tsx
  (site)/notes/page.tsx, notes/[slug]/page.tsx
  (site)/resume/page.tsx
  api/revalidate/route.ts
  studio/[[...tool]]/page.tsx            # Sanity Studio
  not-found.tsx, sitemap.ts, robots.ts, opengraph-image.tsx
components/
  header/, loader/ (Loader.tsx, Cube3D.tsx, useSessionOnce.ts)
  work/ (FilterBar, ProjectCard, PopOut, KnowledgePill, Legend)
  project/ (Hero, MetaCard, KnowledgeCheck, TechStack, Architecture, Gallery, Lightbox, Demo, Decisions)
  about/ (StackGroups, Timeline), notes/ (NoteRow, PortableTextRenderer, CodeBlock)
  ui/ (Button, Chip, SectionLabel, ResumeBand, Footer)
lib/ sanity client, queries (GROQ), image helpers, types
sanity/ schemas, structure, sanity.config.ts
scripts/seed.ts
```
Share a single `KNOWLEDGE_LEVELS` constant (label, colour) used by cards, legend and detail pages. Share a single `Header` component.

## 12. Performance, SEO, security
- Server-render everything except the loader, filters, lightbox, iframes and video.
- ISR with tags; webhook revalidation. No secrets in client bundles. `.env.example` lists `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN`, `SANITY_REVALIDATE_SECRET`, `NEXT_PUBLIC_SITE_URL`.
- Sandbox embedded demos: `iframe sandbox="allow-scripts allow-same-origin allow-forms"`, `loading="lazy"`, `referrerpolicy="no-referrer"`.
- Add `README.md`: setup, env vars, how to add a project and a note in the Studio, how to wire the webhook, how to deploy to Vercel.

## 13. Acceptance checklist (verify before finishing)
- [x] No left sidebar on any page; the same sticky header with page links, GitHub/LinkedIn/Email icon buttons and Resume button appears on every page.
- [x] Loader shows once per session with the rotating 3D cube, real progress, and skips for reduced motion.
- [x] Role chips filter the grid and sync with `?role=`; search works; counts update.
- [x] Each card shows the pop-out visual, knowledge pill, description and tech chips; hover motion works.
- [x] Project detail pages render all sections (overview, knowledge check with bars, tech stack with "why", architecture diagram, screenshots + lightbox, live demo iframe, video, run-locally block, decisions, next project).
- [x] About renders stack groups and the timeline from CMS data; Notes list and article pages work with code highlighting.
- [x] Everything editable from `/studio`; seed script populates all of it; revalidation works.
- [x] Mobile layout works at 360px with the bottom nav bar.
- [x] `tsc --noEmit`, lint and `next build` pass with zero errors.

## 14. Build order
1. Scaffold Next.js + TypeScript + Tailwind; set tokens, fonts, global styles.
2. Sanity project, schemas, Studio route, client, GROQ queries, seed script, `.env.example`.
3. Header, footer, resume band, buttons, chips, section label.
4. Work page: filter bar, legend, project card with pop-out.
5. Project detail page and all its sections.
6. About page and timeline.
7. Notes index and article pages.
8. Resume route, 404, metadata, sitemap, OG image.
9. Loading screen (3D cube) last, so it can wire to real readiness signals.
10. Responsive pass, accessibility pass, performance pass, then the §13 checklist.

When done, reply with a short summary: what was built, what you chose differently from this brief and why, and the exact commands to run it locally.
