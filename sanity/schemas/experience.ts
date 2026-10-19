import { defineField, defineType } from "sanity";

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Role Title / Degree",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "organization",
      title: "Organization / University",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "type",
      title: "Type (e.g. Full-time, Internship, B.Tech)",
      type: "string",
    }),
    defineField({
      name: "startDate",
      title: "Start Date (e.g. Mon YYYY)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End Date (empty = Present)",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "kind",
      title: "Kind",
      type: "string",
      options: {
        list: [
          { title: "Work Experience", value: "work" },
          { title: "Education", value: "education" },
        ],
      },
      initialValue: "work",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "organization",
      kind: "kind",
    },
    prepare({ title, subtitle, kind }) {
      return {
        title,
        subtitle: `[${kind === "education" ? "Education" : "Work"}] ${subtitle || ""}`,
      };
    },
  },
});
