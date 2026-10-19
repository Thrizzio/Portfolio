import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "gtch96k9";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token =
  process.env.SANITY_API_WRITE_TOKEN ||
  process.env.SANITY_API_TOKEN ||
  process.env.SANITY_API_READ_TOKEN;

if (!token) {
  console.error("Error: SANITY_API_WRITE_TOKEN or SANITY_API_TOKEN is missing in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

async function seed() {
  console.log(`🌱 Seeding Sanity dataset '${dataset}' for project '${projectId}'...`);

  // 1. Roles
  const rolesData = [
    { _id: "role-ai-llm", title: "AI / LLM", slug: "ai-llm", order: 1 },
    { _id: "role-full-stack", title: "Full-stack", slug: "full-stack", order: 2 },
    { _id: "role-mobile", title: "Mobile", slug: "mobile", order: 3 },
    { _id: "role-backend", title: "Backend", slug: "backend", order: 4 },
  ];

  for (const r of rolesData) {
    await client.createOrReplace({
      _id: r._id,
      _type: "role",
      title: r.title,
      slug: { _type: "slug", current: r.slug },
      order: r.order,
    });
    console.log(`✓ Role: ${r.title}`);
  }

  // 2. Site Settings
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    name: "Aadi",
    tagline: "CS undergrad building AI-powered products — RAG, agents, evals.",
    introHeadline:
      "I'm a second-year CS student who likes shipping things — mostly AI/LLM features on a Node and React stack. [Two honest lines about what you're learning and what you want to work on next.]",
    introBody:
      "Some of my projects started as vibe-coded experiments. On each one I say how much of the code I actually understand — so you know what you're getting.",
    availabilityText: "Open to opportunities",
    email: "you@example.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    otherLinks: [],
    techGroups: [
      {
        _key: "group-frontend",
        title: "Frontend",
        items: [
          { _key: "item-react", name: "React", color: "blue" },
          { _key: "item-next", name: "Next.js", color: "lilac" },
          { _key: "item-tailwind", name: "Tailwind", color: "blue" },
        ],
      },
      {
        _key: "group-backend",
        title: "Backend",
        items: [
          { _key: "item-node", name: "Node.js", color: "lime" },
          { _key: "item-express", name: "Express", color: "lilac" },
          { _key: "item-postgres", name: "PostgreSQL", color: "blue" },
        ],
      },
      {
        _key: "group-aillm",
        title: "AI / LLM",
        items: [
          { _key: "item-claude", name: "Claude API", color: "orange" },
          { _key: "item-rag", name: "RAG", color: "pink" },
          { _key: "item-vectordb", name: "Vector DBs", color: "lime" },
        ],
      },
      {
        _key: "group-mobile",
        title: "Mobile",
        items: [
          { _key: "item-flutter", name: "Flutter", color: "blue" },
          { _key: "item-firebase", name: "Firebase", color: "orange" },
        ],
      },
    ],
  });
  console.log("✓ Site Settings singleton created");

  // 3. Projects
  const projectsData = [
    {
      _id: "project-ai-ticket-triage",
      title: "AI Ticket Triage",
      slug: "ai-ticket-triage",
      order: 1,
      featured: true,
      tagline:
        "Sorts and routes incoming support tickets using the Claude API. [One or two sentences: who it's for and what changed because of it.]",
      summary: "Sorts and routes incoming support tickets using the Claude API.",
      roles: [{ _type: "reference", _ref: "role-ai-llm", _key: "r1" }, { _type: "reference", _ref: "role-backend", _key: "r2" }, { _type: "reference", _ref: "role-full-stack", _key: "r3" }],
      platform: "web",
      accent: "blue",
      myRole: "[Solo / team role]",
      startDate: "[Mon YYYY]",
      endDate: "[Mon YYYY]",
      status: "live",
      knowledge: {
        level: "architecture",
        code: 3,
        architecture: 4,
        logic: 2,
        codeCaption: "can read & edit",
        architectureCaption: "can explain it",
        logicCaption: "still learning",
        canExplain:
          "[e.g. the request flow, how the prompt and output schema work, why the data model looks like this.]",
        stillLearning:
          "[e.g. testing strategy, error handling at scale, parts that were generated and I'm working through.]",
      },
      problem: "[What was painful or missing, and for whom. Two or three sentences.]",
      solution: "[The solution in plain words — what a user does and what happens.]",
      outcome: "[Result, number, or lesson. Skip if there's no honest number.]",
      techStack: [
        {
          _key: "tg-1",
          group: "Runtime & API",
          items: [
            { _key: "t1", name: "Node.js", icon: "N", color: "lime", why: "[one line on the choice]" },
            { _key: "t2", name: "Express", icon: "E", color: "blue", why: "[one line on the choice]" },
          ],
        },
        {
          _key: "tg-2",
          group: "AI",
          items: [
            { _key: "t3", name: "Claude API", icon: "C", color: "orange", why: "[one line on the choice]" },
          ],
        },
        {
          _key: "tg-3",
          group: "Data",
          items: [
            { _key: "t4", name: "SQLite", icon: "S", color: "blue", why: "[one line on the choice]" },
          ],
        },
        {
          _key: "tg-4",
          group: "Frontend & hosting",
          items: [
            { _key: "t5", name: "[React]", icon: "R", color: "blue", why: "[one line on the choice]" },
            { _key: "t6", name: "[Host]", icon: "H", color: "lilac", why: "[one line on the choice]" },
          ],
        },
      ],
      architecture: {
        nodes: [
          { _key: "n1", label: "Ticket intake", sublabel: "form / webhook", kind: "entry" },
          { _key: "n2", label: "Express API", sublabel: "validate · route", kind: "server" },
          { _key: "n3", label: "Triage service", sublabel: "prompt · schema", kind: "logic" },
          { _key: "n4", label: "Claude API", sublabel: "classify · priority", kind: "model" },
          { _key: "n5", label: "SQLite", sublabel: "tickets · labels · audit", kind: "storage" },
          { _key: "n6", label: "Dashboard", sublabel: "review · override", kind: "client" },
        ],
        description:
          "[Replace with your real diagram. Two or three sentences on how a request moves through the system and the one design decision you're proudest of.]",
      },
      gallery: [
        { _key: "g1", caption: "[SCREENSHOT · DASHBOARD]" },
        { _key: "g2", caption: "[SCREENSHOT · TICKET VIEW]" },
        { _key: "g3", caption: "[SCREENSHOT]" },
        { _key: "g4", caption: "[SCREENSHOT]" },
        { _key: "g5", caption: "[SCREENSHOT]" },
      ],
      demo: {
        liveUrl: "https://demo.example.com",
        embedAllowed: false,
        videoUrl: "https://youtube.com/watch?v=placeholder",
        runLocally: "$ git clone [repo-url]\n$ npm install && npm run dev",
      },
      links: {
        github: "https://github.com/example/ai-ticket-triage",
        docs: "https://docs.example.com",
      },
      decisions: [
        {
          _key: "d1",
          title: "[Decision or challenge 1]",
          body: "[What was hard, what you tried, what you picked and why.]",
        },
        {
          _key: "d2",
          title: "[Decision or challenge 2]",
          body: "[What was hard, what you tried, what you picked and why.]",
        },
        {
          _key: "d3",
          title: "[What I'd do next]",
          body: "[One honest next step or thing you'd change.]",
        },
      ],
    },
    {
      _id: "project-dairy-collection-app",
      title: "Dairy Collection App",
      slug: "dairy-collection-app",
      order: 2,
      featured: true,
      tagline: "Digitizes milk collection and batch traceability for a dairy co-op. [One or two sentences: who it's for and what changed because of it.]",
      summary: "Digitizes milk collection and batch traceability for a dairy co-op.",
      roles: [{ _type: "reference", _ref: "role-mobile", _key: "r1" }],
      platform: "mobile",
      accent: "lime",
      myRole: "[Solo / team role]",
      startDate: "[Mon YYYY]",
      endDate: "[Mon YYYY]",
      status: "live",
      knowledge: {
        level: "built",
        code: 5,
        architecture: 4,
        logic: 4,
        codeCaption: "own the code",
        architectureCaption: "can explain it",
        logicCaption: "thorough understanding",
        canExplain: "[e.g. state management, offline-first sync, Firebase rules.]",
        stillLearning: "[e.g. advanced Bluetooth hardware scale, CI/CD pipeline nuances.]",
      },
      problem: "[What was painful or missing, and for whom. Two or three sentences.]",
      solution: "[The solution in plain words — what a user does and what happens.]",
      outcome: "[Result, number, or lesson. Skip if there's no honest number.]",
      techStack: [
        {
          _key: "tg-1",
          group: "Client & Backend",
          items: [
            { _key: "t1", name: "Flutter", icon: "F", color: "blue", why: "[Fast cross-platform mobile UI]" },
            { _key: "t2", name: "Firebase", icon: "F", color: "orange", why: "[Auth and real-time database]" },
          ],
        },
      ],
      architecture: {
        nodes: [
          { _key: "n1", label: "Mobile App", sublabel: "Flutter UI", kind: "client" },
          { _key: "n2", label: "Local DB", sublabel: "offline cache", kind: "storage" },
          { _key: "n3", label: "Firebase Cloud", sublabel: "Firestore sync", kind: "server" },
        ],
        description: "[Offline-first architecture handling rural milk collection points.]",
      },
      gallery: [{ _key: "g1", caption: "[SCREENSHOT · COLLECTION]" }],
      demo: {
        liveUrl: "https://demo.example.com",
        embedAllowed: false,
        runLocally: "$ flutter run",
      },
      links: { github: "https://github.com/example/dairy-app" },
      decisions: [
        { _key: "d1", title: "[Decision or challenge 1]", body: "[Why offline-first was chosen over online-only.]" },
        { _key: "d2", title: "[Decision or challenge 2]", body: "[Batch validation logic at intake.]" },
        { _key: "d3", title: "[What I'd do next]", body: "[Direct thermal printer Bluetooth pairing.]" },
      ],
    },
    {
      _id: "project-ai-gm-copilot",
      title: "AI GM Copilot",
      slug: "ai-gm-copilot",
      order: 3,
      featured: true,
      tagline: "A tabletop RPG assistant where the human GM stays in control. [One or two sentences: who it's for and what changed because of it.]",
      summary: "A tabletop RPG assistant where the human GM stays in control.",
      roles: [{ _type: "reference", _ref: "role-ai-llm", _key: "r1" }, { _type: "reference", _ref: "role-full-stack", _key: "r2" }],
      platform: "web",
      accent: "pink",
      myRole: "[Solo / team role]",
      startDate: "[Mon YYYY]",
      endDate: "[Mon YYYY]",
      status: "live",
      knowledge: {
        level: "vibe",
        code: 2,
        architecture: 3,
        logic: 2,
        codeCaption: "still learning",
        architectureCaption: "know the architecture",
        logicCaption: "iterating prompts",
        canExplain: "[Prompt chaining, world state JSON, GM approval flow.]",
        stillLearning: "[Complex state synchronization, latency optimizations.]",
      },
      problem: "[What was painful or missing, and for whom. Two or three sentences.]",
      solution: "[The solution in plain words — what a user does and what happens.]",
      outcome: "[Result, number, or lesson. Skip if there's no honest number.]",
      techStack: [
        {
          _key: "tg-1",
          group: "Core Tech",
          items: [
            { _key: "t1", name: "Claude API", icon: "C", color: "orange", why: "[Rich storytelling reasoning]" },
            { _key: "t2", name: "Next.js", icon: "N", color: "lilac", why: "[App Router & streaming responses]" },
          ],
        },
      ],
      architecture: {
        nodes: [
          { _key: "n1", label: "GM Input", sublabel: "UI prompt", kind: "entry" },
          { _key: "n2", label: "Next.js API", sublabel: "context assembler", kind: "server" },
          { _key: "n3", label: "Claude 3.5 Sonnet", sublabel: "story generator", kind: "model" },
        ],
        description: "[Streaming story completions with structured JSON schema state.]",
      },
      gallery: [{ _key: "g1", caption: "[SCREENSHOT · CAMPAIGN]" }],
      demo: {
        liveUrl: "https://demo.example.com",
        embedAllowed: false,
        runLocally: "$ npm run dev",
      },
      links: { github: "https://github.com/example/ai-gm-copilot" },
      decisions: [
        { _key: "d1", title: "[Decision or challenge 1]", body: "[Keeping the GM in the loop rather than auto-resolving.]" },
        { _key: "d2", title: "[Decision or challenge 2]", body: "[Managing multi-turn inventory & NPC memory.]" },
        { _key: "d3", title: "[What I'd do next]", body: "[Map generation with SVG overlays.]" },
      ],
    },
    {
      _id: "project-chronolog",
      title: "Chronolog",
      slug: "chronolog",
      order: 4,
      featured: false,
      tagline: "A time-logging app, now getting a mobile version. [One or two sentences: who it's for and what changed because of it.]",
      summary: "A time-logging app, now getting a mobile version.",
      roles: [{ _type: "reference", _ref: "role-mobile", _key: "r1" }, { _type: "reference", _ref: "role-full-stack", _key: "r2" }],
      platform: "mobile",
      accent: "orange",
      myRole: "[Solo / team role]",
      startDate: "[Mon YYYY]",
      endDate: "[Mon YYYY]",
      status: "in-progress",
      knowledge: {
        level: "architecture",
        code: 3,
        architecture: 4,
        logic: 3,
        codeCaption: "can read & edit",
        architectureCaption: "designed data model",
        logicCaption: "interval aggregation",
        canExplain: "[Interval trees, audit logs, background timers.]",
        stillLearning: "[Cross-platform mobile push notification scheduling.]",
      },
      problem: "[What was painful or missing, and for whom. Two or three sentences.]",
      solution: "[The solution in plain words — what a user does and what happens.]",
      outcome: "[Result, number, or lesson. Skip if there's no honest number.]",
      techStack: [
        {
          _key: "tg-1",
          group: "Stack",
          items: [{ _key: "t1", name: "[Stack]", icon: "S", color: "orange", why: "[Flexible time intervals]" }],
        },
      ],
      architecture: {
        nodes: [
          { _key: "n1", label: "Timer Client", sublabel: "mobile / web", kind: "client" },
          { _key: "n2", label: "Sync API", sublabel: "time server", kind: "server" },
        ],
        description: "[Interval-based time calculation with offline continuity.]",
      },
      gallery: [{ _key: "g1", caption: "[SCREENSHOT · TIMELINE]" }],
      demo: {
        liveUrl: "https://demo.example.com",
        embedAllowed: false,
        runLocally: "$ npm run dev",
      },
      links: { github: "https://github.com/example/chronolog" },
      decisions: [
        { _key: "d1", title: "[Decision or challenge 1]", body: "[Handling cross-timezone timestamps in UTC.]" },
        { _key: "d2", title: "[Decision or challenge 2]", body: "[Micro-aggregations for reporting.]" },
        { _key: "d3", title: "[What I'd do next]", body: "[Automatic idle detection.]" },
      ],
    },
    {
      _id: "project-crieya-site",
      title: "CRIEYA Site",
      slug: "crieya-site",
      order: 5,
      featured: false,
      tagline: "[One-line description of the project]",
      summary: "[One-line description of the project]",
      roles: [{ _type: "reference", _ref: "role-full-stack", _key: "r1" }],
      platform: "web",
      accent: "lilac",
      myRole: "[Solo / team role]",
      startDate: "[Mon YYYY]",
      endDate: "[Mon YYYY]",
      status: "live",
      knowledge: {
        level: "built",
        code: 5,
        architecture: 4,
        logic: 5,
        codeCaption: "built from scratch",
        architectureCaption: "full stack control",
        logicCaption: "complete grasp",
        canExplain: "[Responsive layouts, backend API routes, component system.]",
        stillLearning: "[Automated E2E testing pipelines.]",
      },
      problem: "[What was painful or missing, and for whom. Two or three sentences.]",
      solution: "[The solution in plain words — what a user does and what happens.]",
      outcome: "[Result, number, or lesson. Skip if there's no honest number.]",
      techStack: [
        {
          _key: "tg-1",
          group: "Stack",
          items: [
            { _key: "t1", name: "React", icon: "R", color: "blue", why: "[Component reusability]" },
            { _key: "t2", name: "Node.js", icon: "N", color: "lime", why: "[Fast backend endpoints]" },
          ],
        },
      ],
      architecture: {
        nodes: [
          { _key: "n1", label: "Browser Client", sublabel: "React SPA", kind: "client" },
          { _key: "n2", label: "Node API", sublabel: "Express server", kind: "server" },
        ],
        description: "[Modern responsive portfolio / showcase platform.]",
      },
      gallery: [{ _key: "g1", caption: "[SCREENSHOT · HOMEPAGE]" }],
      demo: {
        liveUrl: "https://demo.example.com",
        embedAllowed: false,
        runLocally: "$ npm run dev",
      },
      links: { github: "https://github.com/example/crieya-site" },
      decisions: [
        { _key: "d1", title: "[Decision or challenge 1]", body: "[Design system component tokens.]" },
        { _key: "d2", title: "[Decision or challenge 2]", body: "[Performance optimization for image loads.]" },
        { _key: "d3", title: "[What I'd do next]", body: "[Interactive 3D showreel.]" },
      ],
    },
    {
      _id: "project-desktop-cli-tool",
      title: "[Desktop / CLI tool]",
      slug: "desktop-cli-tool",
      order: 6,
      featured: false,
      tagline: "[Screenshot or terminal pops out of the card here]",
      summary: "[Screenshot or terminal pops out of the card here]",
      roles: [{ _type: "reference", _ref: "role-backend", _key: "r1" }],
      platform: "cli",
      accent: "pink",
      myRole: "[Solo / team role]",
      startDate: "[Mon YYYY]",
      endDate: "[Mon YYYY]",
      status: "in-progress",
      knowledge: {
        level: "vibe",
        code: 2,
        architecture: 2,
        logic: 2,
        codeCaption: "still learning",
        architectureCaption: "basic understanding",
        logicCaption: "learning streams",
        canExplain: "[Command line argument parsing, exit codes, stdout output.]",
        stillLearning: "[Cross-platform file locking, low-level process management.]",
      },
      problem: "[What was painful or missing, and for whom. Two or three sentences.]",
      solution: "[The solution in plain words — what a user does and what happens.]",
      outcome: "[Result, number, or lesson. Skip if there's no honest number.]",
      techStack: [
        {
          _key: "tg-1",
          group: "Stack",
          items: [{ _key: "t1", name: "[Stack]", icon: "S", color: "pink", why: "[one line on the choice]" }],
        },
      ],
      architecture: {
        nodes: [
          { _key: "n1", label: "CLI Command", sublabel: "terminal execution", kind: "entry" },
          { _key: "n2", label: "Core Engine", sublabel: "worker threads", kind: "logic" },
        ],
        description: "[Command line utility streaming results to terminal.]",
      },
      gallery: [{ _key: "g1", caption: "[SCREENSHOT · TERMINAL]" }],
      demo: {
        liveUrl: "https://demo.example.com",
        embedAllowed: false,
        runLocally: "$ [tool] --help",
      },
      links: { github: "https://github.com/example/cli-tool" },
      decisions: [
        { _key: "d1", title: "[Decision or challenge 1]", body: "[Why CLI was picked over desktop GUI.]" },
        { _key: "d2", title: "[Decision or challenge 2]", body: "[Error formatting in terminal.]" },
        { _key: "d3", title: "[What I'd do next]", body: "[Auto-updater via npm/homebrew.]" },
      ],
    },
  ];

  for (const p of projectsData) {
    await client.createOrReplace({
      _id: p._id,
      _type: "project",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      order: p.order,
      featured: p.featured,
      tagline: p.tagline,
      summary: p.summary,
      roles: p.roles,
      platform: p.platform,
      accent: p.accent,
      myRole: p.myRole,
      startDate: p.startDate,
      endDate: p.endDate,
      status: p.status,
      knowledge: p.knowledge,
      problem: p.problem,
      solution: p.solution,
      outcome: p.outcome,
      techStack: p.techStack,
      architecture: p.architecture,
      gallery: p.gallery,
      demo: p.demo,
      links: p.links,
      decisions: p.decisions,
    });
    console.log(`✓ Project: ${p.title}`);
  }

  // 4. Notes
  const today = new Date().toISOString();
  const notesData = [
    {
      _id: "note-1",
      title: "[Note title goes here]",
      slug: "note-title-goes-here-1",
      publishedAt: today,
      tag: "[TAG]",
      hook: "[One-line hook that makes someone click.]",
      accent: "lime",
      featured: true,
      body: [
        {
          _key: "b1",
          _type: "block",
          children: [
            {
              _key: "c1",
              _type: "span",
              text: "This is a seeded note body explaining technical architecture, lessons learned, and code patterns.",
            },
          ],
        },
        {
          _key: "b2",
          _type: "code",
          language: "typescript",
          filename: "lib/triage.ts",
          code: `export async function routeTicket(ticket: Ticket) {\n  const classification = await claude.messages.create({\n    model: "claude-3-5-sonnet-20241022",\n    messages: [{ role: "user", content: ticket.body }]\n  });\n  return classification;\n}`,
        },
      ],
    },
    {
      _id: "note-2",
      title: "[Note title goes here]",
      slug: "note-title-goes-here-2",
      publishedAt: new Date(Date.now() - 86400000).toISOString(),
      tag: "[TAG]",
      hook: "[One-line hook that makes someone click.]",
      accent: "pink",
      featured: false,
      body: [
        {
          _key: "b1",
          _type: "block",
          children: [
            {
              _key: "c1",
              _type: "span",
              text: "Second seeded note exploring practical prompt engineering, schema validations, and UI feedback loops.",
            },
          ],
        },
      ],
    },
    {
      _id: "note-3",
      title: "[Note title goes here]",
      slug: "note-title-goes-here-3",
      publishedAt: new Date(Date.now() - 172800000).toISOString(),
      tag: "[TAG]",
      hook: "[One-line hook that makes someone click.]",
      accent: "blue",
      featured: false,
      body: [
        {
          _key: "b1",
          _type: "block",
          children: [
            {
              _key: "c1",
              _type: "span",
              text: "Third seeded note documenting debugging strategies and honest lessons learned from production errors.",
            },
          ],
        },
      ],
    },
  ];

  for (const n of notesData) {
    await client.createOrReplace({
      _id: n._id,
      _type: "note",
      title: n.title,
      slug: { _type: "slug", current: n.slug },
      publishedAt: n.publishedAt,
      tag: n.tag,
      hook: n.hook,
      accent: n.accent,
      featured: n.featured,
      body: n.body,
    });
    console.log(`✓ Note: ${n.title}`);
  }

  // 5. Experience
  const experienceData = [
    {
      _id: "exp-1",
      title: "[Role title]",
      organization: "[Organization]",
      type: "[Type]",
      startDate: "[Mon YYYY]",
      endDate: "Present",
      description: "[One sentence on what you did and shipped.]",
      kind: "work",
      order: 1,
    },
    {
      _id: "exp-2",
      title: "[Role title]",
      organization: "[Organization]",
      type: "[Type]",
      startDate: "[Mon YYYY]",
      endDate: "[Mon YYYY]",
      description: "[One sentence on what you did and shipped.]",
      kind: "work",
      order: 2,
    },
    {
      _id: "exp-3",
      title: "B.Tech, Computer Science",
      organization: "MIT ADT University",
      type: "2nd year · [Expected grad year]",
      startDate: "2nd year",
      endDate: "[Expected grad year]",
      description: "Undergraduate study focusing on AI/LLM engineering, data structures, and full-stack software development.",
      kind: "education",
      order: 3,
    },
  ];

  for (const e of experienceData) {
    await client.createOrReplace({
      _id: e._id,
      _type: "experience",
      title: e.title,
      organization: e.organization,
      type: e.type,
      startDate: e.startDate,
      endDate: e.endDate,
      description: e.description,
      kind: e.kind,
      order: e.order,
    });
    console.log(`✓ Experience: ${e.title}`);
  }

  console.log("✨ Seeding completed successfully!");
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
