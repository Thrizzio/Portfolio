import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site Settings")
        ),
      S.divider(),
      S.listItem()
        .title("Projects")
        .schemaType("project")
        .child(
          S.documentTypeList("project")
            .title("Projects")
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),
      S.listItem()
        .title("Roles")
        .schemaType("role")
        .child(
          S.documentTypeList("role")
            .title("Roles")
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),
      S.listItem()
        .title("Notes")
        .schemaType("note")
        .child(
          S.documentTypeList("note")
            .title("Notes")
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
        ),
      S.listItem()
        .title("Experience & Education")
        .schemaType("experience")
        .child(
          S.documentTypeList("experience")
            .title("Experience & Education")
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),
      // Filter out types handled explicitly above
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !["siteSettings", "project", "role", "note", "experience"].includes(
            listItem.getId() || ""
          )
      ),
    ]);
