export function formatRating(value?: number | null): string {
  if (value === null || value === undefined) return "";
  // show one decimal if not integer, else no decimals
  return Number.isInteger(value) ? `${value}` : `${value.toFixed(1)}`;
}

export function ratingColor(value?: number | null): string {
  if (value === null || value === undefined) return "#999";
  // TMDB ratings are usually 0-10
  if (value >= 7.5) return "#27ae60"; // darker green
  if (value >= 5) return "#f39c12"; // warmer yellow
  return "#c0392b"; // darker red
}
