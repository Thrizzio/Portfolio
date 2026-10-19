import { defineField, defineType } from "sanity";

export const note = defineType({
  name: "note",
  title: "Note",
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
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tag",
      title: "Tag",
      type: "string",
      description: "e.g. LLMS, RAG, ARCHITECTURE",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "hook",
      title: "One-line Hook",
      type: "text",
      rows: 2,
      description: "A hook that makes someone click",
      validation: (rule) => rule.required(),
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
      name: "cover",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "body",
      title: "Body Content (Portable Text)",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
          ],
        },
        {
          name: "code",
          title: "Code Block",
          type: "object",
          fields: [
            defineField({
              name: "language",
              title: "Language",
              type: "string",
              initialValue: "typescript",
            }),
            defineField({
              name: "filename",
              title: "Filename (optional)",
              type: "string",
            }),
            defineField({
              name: "code",
              title: "Code",
              type: "text",
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "hook",
      media: "cover",
    },
  },
});
