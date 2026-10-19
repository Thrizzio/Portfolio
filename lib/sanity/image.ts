import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import { projectId, dataset } from "./client";

const imageClient = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  useCdn: true,
});

const builder = createImageUrlBuilder(imageClient);

type ImageSource = Parameters<ReturnType<typeof createImageUrlBuilder>["image"]>[0];

export function urlFor(source: ImageSource) {
  return builder.image(source);
}
