import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { projectId, dataset } from "./client";

const imageClient = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(imageClient);

type ImageSource = Parameters<ReturnType<typeof imageUrlBuilder>["image"]>[0];

export function urlFor(source: ImageSource) {
  return builder.image(source);
}
