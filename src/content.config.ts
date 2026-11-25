import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Reusable schemas

const optionalUrl = z.preprocess((value) => {
  if (typeof value !== "string") return value;

  const url = value.trim();

  if (!url) return undefined;

  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }

  return url;
}, z.string().url().optional());

const optionalString = z.string().optional().or(z.literal(""));

const optionalDate = z.preprocess(
  (value) => (value === "" || value === null ? undefined : value),
  z.coerce.date().optional(),
);

const optionalNumber = z.preprocess(
  (value) => (value === "" || value === null ? undefined : value),
  z.coerce.number().optional(),
);

// Posts
const posts = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx,mdoc}",
    base: "./src/content/posts",
  }),
  schema: z.object({
    title: z.string(),
    excerpt: optionalString,
    publishDate: optionalDate,
    coverImage: optionalString,
  }),
});

// Games
const games = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx,mdoc}",
    base: "./src/content/games",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    developer: z.string(),
    developerWebsite: optionalUrl,

    status: z.enum(["Prototype", "In Development", "Released"]),

    genre: z.string(),
    cover: optionalString,

    platforms: z.array(z.string()).default([]),

    engine: optionalString,
    teamSize: optionalNumber,

    website: optionalUrl,
    github: optionalUrl,
    itch: optionalUrl,
    steam: optionalUrl,
    discord: optionalUrl,

    tags: z.array(z.string()).default([]),

    media: z
      .array(
        z.discriminatedUnion("type", [
          z.object({
            type: z.literal("image"),
            src: z.string(),
          }),
          z.object({
            type: z.literal("youtube"),
            id: z.string(),
          }),
        ]),
      )
      .optional(),

    publishDate: optionalDate,
    draft: z.boolean().optional(),
  }),
});

// Meetups
const meetups = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx,mdoc}",
    base: "./src/content/meetups",
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    startTime: optionalString,
    endTime: optionalString,
    fee: z.string(),
    location: z.string(),
    address: z.string(),

    mapEmbedUrl: optionalUrl,
    registrationUrl: optionalUrl,

    cover: optionalString,
  }),
});

// Friends
const friends = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx,mdoc}",
    base: "./src/content/friends",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: optionalString,
    website: optionalUrl,

    socials: z
      .array(
        z.object({
          platform: z.enum([
            "instagram",
            "youtube",
            "twitter",
            "facebook",
            "discord",
            "tiktok",
            "twitch",
          ]),
          url: z.string().url(),
        }),
      )
      .default([]),
  }),
});

export const collections = {
  posts,
  games,
  meetups,
  friends,
};
