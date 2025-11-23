export function formatDate(
  dateString?: string | null,
  locale?: string
): string {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return dateString;

  try {
    return new Intl.DateTimeFormat(locale ?? undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(d);
  } catch (e) {
    return dateString;
  }
}

export function formatYear(dateString?: string | null): string {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return "";
  return String(d.getFullYear());
}
