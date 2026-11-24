export type Locale = "en" | "ko";

/**
 * Remove the locale prefix from an Astro content ID.
 * Example: "ko/my-post" -> "my-post"
 */
export function getLocalizedSlug(id: string): string {
  return id.replace(/^(en|ko)\//, "");
}

/**
 * Generate a localized URL for a content entry.
 */
export function getLocalizedUrl(
  id: string,
  locale: Locale,
  collection: string,
): string {
  const prefix = locale === "ko" ? "/ko" : "";
  const slug = getLocalizedSlug(id);

  return `${prefix}/${collection}/${slug}/`;
}

/**
 * Filter content entries by their folder-based locale.
 */
export function filterByLocale<T extends { id: string }>(
  entries: T[],
  locale: Locale,
): T[] {
  return entries.filter((entry) => entry.id.startsWith(`${locale}/`));
}
