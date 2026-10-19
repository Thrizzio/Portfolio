import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    name,
    tagline,
    introHeadline,
    introBody,
    email,
    github,
    linkedin,
    otherLinks,
    "resumeFile": {
      "asset": resumeFile.asset-> {
        url,
        originalFilename
      }
    },
    availabilityText,
    techGroups
  }
`;

export const rolesQuery = groq`
  *[_type == "role"] | order(order asc) {
    _id,
    title,
    slug,
    order
  }
`;

export const projectsQuery = groq`
  *[_type == "project"] | order(order asc) {
    _id,
    title,
    slug,
    order,
    featured,
    tagline,
    summary,
    roles[]-> {
      _id,
      title,
      slug,
      order
    },
    platform,
    accent,
    heroImage,
    popOutImage,
    knowledge,
    myRole,
    startDate,
    endDate,
    status,
    problem,
    solution,
    outcome,
    techStack,
    architecture,
    gallery,
    demo,
    links,
    decisions
  }
`;

export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)] {
    "slug": slug.current
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    order,
    featured,
    tagline,
    summary,
    roles[]-> {
      _id,
      title,
      slug,
      order
    },
    platform,
    accent,
    heroImage,
    popOutImage,
    knowledge,
    myRole,
    startDate,
    endDate,
    status,
    problem,
    solution,
    outcome,
    techStack,
    architecture,
    gallery,
    demo,
    links,
    decisions,
    "nextProject": *[_type == "project" && order > ^.order] | order(order asc)[0] {
      title,
      slug,
      accent,
      tagline
    }
  }
`;

export const notesQuery = groq`
  *[_type == "note"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    tag,
    hook,
    accent,
    cover,
    featured
  }
`;

export const noteSlugsQuery = groq`
  *[_type == "note" && defined(slug.current)] {
    "slug": slug.current
  }
`;

export const noteBySlugQuery = groq`
  *[_type == "note" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    tag,
    hook,
    accent,
    cover,
    body,
    featured,
    "nextNote": *[_type == "note" && publishedAt < ^.publishedAt] | order(publishedAt desc)[0] {
      title,
      slug,
      accent
    },
    "prevNote": *[_type == "note" && publishedAt > ^.publishedAt] | order(publishedAt asc)[0] {
      title,
      slug,
      accent
    }
  }
`;

export const experiencesQuery = groq`
  *[_type == "experience"] | order(order asc) {
    _id,
    title,
    organization,
    type,
    startDate,
    endDate,
    description,
    kind,
    order
  }
`;
