import { getBlogMeta } from "@/lib/blog/catalog";

const LEAF_LABELS: Record<string, string> = {
  symptoms: "Symptoms",
  treatment: "Treatment",
  exercises: "Exercises",
  diet: "Diet",
};

/** Visible label for an internal path. Blog URLs use the published title. */
export function visibleLinkLabel(path: string): string {
  const blog = /^\/blog\/([^/]+)$/.exec(path);
  if (blog) {
    const title = getBlogMeta(blog[1])?.title?.trim();
    if (title) return title;
  }
  const leaf = path.split("/").filter(Boolean).pop() ?? path;
  if (LEAF_LABELS[leaf]) return LEAF_LABELS[leaf];
  return leaf
    .replace(/-uk$/, "")
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
