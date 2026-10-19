import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "One line summary under the hero title or in metadata",
    }),
    defineField({
      name: "introHeadline",
      title: "Intro Headline",
      type: "string",
      description: "About page intro headline (e.g. 32px paragraph)",
    }),
    defineField({
      name: "introBody",
      title: "Intro Body",
      type: "text",
      description: "About page honesty paragraph about vibe-coding experiments",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "github",
      title: "GitHub URL",
      type: "url",
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn URL",
      type: "url",
    }),
    defineField({
      name: "otherLinks",
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
    defineField({
      name: "resumeFile",
      title: "Resume File (PDF)",
      type: "file",
      options: {
        accept: "application/pdf",
      },
    }),
    defineField({
      name: "availabilityText",
      title: "Availability Status",
      type: "string",
      description: "e.g. Open to opportunities",
    }),
    defineField({
      name: "techGroups",
      title: "Tech Groups (About Page)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Group Title", type: "string" }),
            defineField({
              name: "items",
              title: "Items",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({ name: "name", title: "Name", type: "string" }),
                    defineField({
                      name: "color",
                      title: "Accent Color",
                      type: "string",
                    }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
  ],
});
