# Aadi's Portfolio

A personal portfolio built for **Aadi**, a second-year Computer Science undergraduate at MIT ADT University who builds AI/LLM-powered products (Node.js/Express, Next.js/React, Claude API, RAG, agents, evals, and Flutter/Firebase mobile).

Designed specifically for technical recruiters and hiring managers with high visual contrast, playful typography, and full transparency.

---

## Key Features

1. **Role Filtering**: Technical recruiters can select the specific role they are hiring for (`AI / LLM`, `Full-stack`, `Mobile`, `Backend`), instantly filtering the project grid with bidirectional URL search parameter synchronization (`?role=...`).
2. **Honest Knowledge Check**: Every project clearly displays how well the codebase is known:
   - 🟢 **Built it, own the code** (Green / Lime `#C8FF3D`)
   - 🔵 **Know the architecture** (Blue `#7C8BFF`)
   - 🔴 **Vibe-coded, still learning** (Pink `#FF5CA8`)
3. **Interactive Project Pop-Outs**: Visual cards feature stylized 3D CSS frames (Mac-style browser for web, notch smartphone for mobile, retro terminal for CLI/desktop) with subtle lift and tilt micro-interactions.
4. **Embedded Sanity Studio**: Full headless CMS management directly accessible at `/studio` with tagged on-demand cache revalidation.
5. **Notes with Syntax Highlighting**: Engineering notes rendered with Portable Text and Shiki syntax highlighting using the `tokyo-night` theme.
6. **Wireframe 3D Cube Loading Screen**: Three.js / React Three Fiber wireframe cube with orbit rings, status stages, and progress bar. Runs once per session via `sessionStorage` and skips automatically for `prefers-reduced-motion`. Includes a pure CSS 3D fallback.
7. **Mobile-First Experience**: Clean responsive layout down to 360px viewport with a floating frosted bottom navigation bar and touch targets $\ge 44\text{px}$.

---

## Tech Stack & Architecture Choices

| Concern | Choice | Rationale |
|---|---|---|
| Framework | **Next.js 16** (App Router, Turbopack) | Latest React Server Components for fast initial paint and SSG/ISR static export. |
| Styling | **Tailwind CSS v4** + CSS variables | High-contrast aubergine palette (`#0F0B1E`), loud accents, zero runtime CSS overhead. |
| Typography | **Bricolage Grotesque** & **DM Mono** | Bold personality for giant titles (`clamp(96px, 14vw, 200px)`) and crisp monospace metadata. |
| CMS | **Sanity v3** (`sanity`, `next-sanity`) | Studio embedded inside `/studio`, CDN image pipeline, and GROQ querying. |
| 3D Loader | **Three.js** + **R3F** + **Pure CSS Fallback** | Smooth 60fps canvas cube with graceful fallback for devices without WebGL. |
| Syntax Highlighting | **Shiki** (`tokyo-night`) | Build-time syntax highlighting for clean, accurate code blocks. |
| Icons | **lucide-react** & Inline SVG | Clean stroke icons for GitHub, LinkedIn, email, external links, and resume. |

---

## Environment Variables

Copy `.env.example` to `.env.local` and provide your credentials:

```bash
cp .env.example .env.local
```

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity Project ID | `gtch96k9` |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset name | `production` |
| `SANITY_API_READ_TOKEN` | Sanity API token (Viewer/Editor) | `sk...` |
| `SANITY_REVALIDATE_SECRET` | Secret token for revalidation webhook | `portfolio_secret_...` |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (for metadata and OG images) | `http://localhost:3000` |

---

## Getting Started Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Seed Sanity CMS Content
Populate all 4 roles, 6 projects, 3 notes, 3 experience/education items, and site settings:
```bash
npm run seed
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

To inspect the 3D loader at any time without resetting `sessionStorage`, append `?debug_loader=true`:
[http://localhost:3000/?debug_loader=true](http://localhost:3000/?debug_loader=true)

---

## Managing Content in Sanity Studio

1. Navigate to [http://localhost:3000/studio](http://localhost:3000/studio).
2. Sign in with your Sanity credentials.
3. In the sidebar:
   - **Projects**: Add or edit projects. Configure roles, platform visual (web / mobile / CLI), knowledge level sliders (Code, Architecture, Logic), tech stack list with rationale, problem / solution / outcome, and architecture flowchart nodes.
   - **Roles**: Create and manage target hiring roles (`AI / LLM`, `Full-stack`, `Mobile`, `Backend`).
   - **Notes**: Write articles using the rich Portable Text editor, include code snippets with language selection.
   - **Experience & Education**: Manage timeline milestones, organization, and bullet points.
   - **Site Settings**: Configure the global tagline, availability status, resume URL, and social links.

---

## On-Demand Webhook Revalidation

To automatically invalidate Next.js caches when content is published or edited in Sanity Studio:

1. Go to your Sanity management dashboard at [sanity.io/manage](https://www.sanity.io/manage).
2. Select your project -> **API** -> **Webhooks** -> **Create Webhook**.
3. Set the webhook URL to:
   ```
   https://your-domain.vercel.app/api/revalidate
   ```
4. Trigger on: `Create`, `Update`, `Delete`.
5. Set the HTTP method to `POST`.
6. Add Header:
   ```
   x-revalidate-secret: <YOUR_SANITY_REVALIDATE_SECRET>
   ```
7. Or append as a query param:
   ```
   https://your-domain.vercel.app/api/revalidate?secret=<YOUR_SANITY_REVALIDATE_SECRET>&tag=project
   ```

---

## Production Verification & Build

To verify type safety, linting, and build output:

```bash
# Type-check
npx tsc --noEmit

# ESLint
npm run lint

# Production Next.js build
npm run build

# Start production server
npm run start
```

---

## Deployment to Vercel

1. Push your repository to GitHub.
2. Import the project in [Vercel](https://vercel.com/new).
3. Configure Environment Variables in Vercel project settings:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_API_READ_TOKEN`
   - `SANITY_REVALIDATE_SECRET`
   - `NEXT_PUBLIC_SITE_URL` (set to your Vercel deployment URL)
4. Deploy! Next.js will build all pages with static generation and incremental on-demand revalidation.



cd "C:\DEV WORK\Physioget"
.\.venv\Scripts\uvicorn services.research_api.app:app --host 127.0.0.1 --port 8000 --reload


cd "C:\DEV WORK\Physioget"
.\.venv\Scripts\uvicorn services.ingestion_service.app:app --host 127.0.0.1 --port 8001 --reload


cd "C:\DEV WORK\Physioget"
.\.venv\Scripts\python.exe -m http.server 8080 --directory web/research

cd "C:\DEV WORK\Physioget"
.\.venv\Scripts\python.exe -m http.server 8081 --directory web/admin