export type Locale = "en" | "ko";

export function formatDate(
  date: Date | undefined,
  locale: Locale,
  weekday: "long" | "short" | "narrow" | undefined = undefined,
): string {
  if (!date) return "";

  return date.toLocaleDateString(locale === "ko" ? "ko-KR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...(weekday && { weekday }),
  });
}
