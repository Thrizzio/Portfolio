import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "One-line description shown on detail page",
    }),
    defineField({
      name: "summary",
      title: "Card Summary",
      type: "text",
      rows: 2,
      description: "Card description on home grid (<= 120 chars)",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "roles",
      title: "Roles",
      type: "array",
      of: [{ type: "reference", to: [{ type: "role" }] }],
    }),
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      options: {
        list: [
          { title: "Web", value: "web" },
          { title: "Mobile", value: "mobile" },
          { title: "Desktop", value: "desktop" },
          { title: "CLI", value: "cli" },
          { title: "API", value: "api" },
        ],
      },
      initialValue: "web",
    }),
    defineField({
      name: "accent",
      title: "Accent Color",
      type: "string",
      options: {
        list: [
          { title: "Lime (#C8FF3D)", value: "lime" },
          { title: "Pink (#FF5CA8)", value: "pink" },
          { title: "Blue (#7C8BFF)", value: "blue" },
          { title: "Orange (#FF9248)", value: "orange" },
          { title: "Lilac (#B8A4FF)", value: "lilac" },
        ],
      },
      initialValue: "lime",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "popOutImage",
      title: "Pop-out Image (transparent PNG / WebP)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "knowledge",
      title: "Honest Knowledge Check",
      type: "object",
      fields: [
        defineField({
          name: "level",
          title: "Level",
          type: "string",
          options: {
            list: [
              { title: "Built it, own the code", value: "built" },
              { title: "Know the architecture", value: "architecture" },
              { title: "Vibe-coded, still learning", value: "vibe" },
            ],
          },
          initialValue: "built",
        }),
        defineField({
          name: "code",
          title: "Code (0-5)",
          type: "number",
          validation: (rule) => rule.min(0).max(5),
          initialValue: 3,
        }),
        defineField({
          name: "architecture",
          title: "Architecture (0-5)",
          type: "number",
          validation: (rule) => rule.min(0).max(5),
          initialValue: 3,
        }),
        defineField({
          name: "logic",
          title: "Logic (0-5)",
          type: "number",
          validation: (rule) => rule.min(0).max(5),
          initialValue: 3,
        }),
        defineField({
          name: "codeCaption",
          title: "Code Caption",
          type: "string",
          initialValue: "can read & edit",
        }),
        defineField({
          name: "architectureCaption",
          title: "Architecture Caption",
          type: "string",
          initialValue: "can explain it",
        }),
        defineField({
          name: "logicCaption",
          title: "Logic Caption",
          type: "string",
          initialValue: "still learning",
        }),
        defineField({
          name: "canExplain",
          title: "I Can Explain",
          type: "text",
        }),
        defineField({
          name: "stillLearning",
          title: "Still Learning",
          type: "text",
        }),
      ],
    }),
    defineField({
      name: "myRole",
      title: "My Role / Team Role",
      type: "string",
    }),
    defineField({
      name: "startDate",
      title: "Start Date (e.g. Oct 2025)",
      type: "string",
    }),
    defineField({
      name: "endDate",
      title: "End Date (empty = Present)",
      type: "string",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Live", value: "live" },
          { title: "In Progress", value: "in-progress" },
          { title: "Archived", value: "archived" },
        ],
      },
      initialValue: "live",
    }),
    defineField({
      name: "problem",
      title: "01 Problem (Overview)",
      type: "text",
    }),
    defineField({
      name: "solution",
      title: "01 Solution (What I built)",
      type: "text",
    }),
    defineField({
      name: "outcome",
      title: "01 Outcome (What happened)",
      type: "text",
    }),
    defineField({
      name: "techStack",
      title: "Tech Stack Groups",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "group", title: "Group Name", type: "string" }),
            defineField({
              name: "items",
              title: "Items",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({ name: "name", title: "Tech Name", type: "string" }),
                    defineField({ name: "icon", title: "Icon / Short Key", type: "string" }),
                    defineField({ name: "color", title: "Accent Color", type: "string" }),
                    defineField({ name: "why", title: "Why (1 line)", type: "string" }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "architecture",
      title: "Architecture",
      type: "object",
      fields: [
        defineField({
          name: "mermaid",
          title: "Mermaid Definition",
          type: "text",
        }),
        defineField({
          name: "diagramImage",
          title: "Diagram Image",
          type: "image",
        }),
        defineField({
          name: "nodes",
          title: "Structured Nodes Flow",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "label", title: "Label", type: "string" }),
                defineField({ name: "sublabel", title: "Sublabel", type: "string" }),
                defineField({
                  name: "kind",
                  title: "Kind",
                  type: "string",
                  options: {
                    list: [
                      { title: "Entry", value: "entry" },
                      { title: "Server", value: "server" },
                      { title: "Logic", value: "logic" },
                      { title: "Model", value: "model" },
                      { title: "Storage", value: "storage" },
                      { title: "Client", value: "client" },
                    ],
                  },
                }),
              ],
            },
          ],
        }),
        defineField({
          name: "description",
          title: "Request Flow / Decision Description",
          type: "text",
        }),
      ],
    }),
    defineField({
      name: "gallery",
      title: "Gallery Screenshots",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "demo",
      title: "Demo & Run",
      type: "object",
      fields: [
        defineField({ name: "liveUrl", title: "Live URL", type: "url" }),
        defineField({
          name: "embedAllowed",
          title: "Allow Embed in Iframe",
          type: "boolean",
          initialValue: false,
        }),
        defineField({ name: "videoUrl", title: "Video Walkthrough URL", type: "url" }),
        defineField({
          name: "runLocally",
          title: "Run It Locally Terminal Commands",
          type: "text",
        }),
      ],
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "object",
      fields: [
        defineField({ name: "github", title: "GitHub URL", type: "url" }),
        defineField({ name: "docs", title: "Docs URL", type: "url" }),
        defineField({
          name: "other",
          title: "Other Links",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "label", title: "Label", type: "string" }),
                defineField({ name: "url", title: "URL", type: "url" }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "decisions",
      title: "07 Decisions & Challenges",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "body", title: "Body", type: "text" }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "tagline",
      level: "knowledge.level",
      media: "heroImage",
    },
    prepare({ title, subtitle, level, media }) {
      const levelLabels: Record<string, string> = {
        built: "Built it",
        architecture: "Architecture",
        vibe: "Vibe-coded",
      };
      return {
        title,
        subtitle: `[${levelLabels[level] || "Level"}] ${subtitle || ""}`,
        media,
      };
    },
  },
});
