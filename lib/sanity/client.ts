import { createClient } from "next-sanity";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "gtch96k9";
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token:
    process.env.SANITY_API_WRITE_TOKEN ||
    process.env.SANITY_API_TOKEN ||
    process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
});

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: Record<string, string | number | boolean | null | undefined>;
  tags?: string[];
}): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, params, {
    next: {
      tags,
      revalidate: 60,
    },
  });
}
