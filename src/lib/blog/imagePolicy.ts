/**
 * Image policy for guides. Shared by the catalog build (fails the build) and
 * the guide-images test (fails CI). Guides must self-host every image under
 * public/; add a host here only after confirming it is stable and licensed.
 */
export const ALLOWED_EXTERNAL_IMAGE_HOSTS: readonly string[] = [];

export interface GuideImageProblem {
  slug: string;
  src: string;
  problem: "missing-local-file" | "external-host-not-allowed" | "missing-alt" | "empty-src";
}

export function inlineImageTags(html: string): { src: string; hasAlt: boolean }[] {
  return [...(html || "").matchAll(/<img\b[^>]*>/gi)].map(([tag]) => ({
    src: (tag.match(/\ssrc=["']([^"']*)["']/i)?.[1] ?? "").trim(),
    hasAlt: /\salt=["'][^"']*["']/i.test(tag),
  }));
}

export function checkGuideImages(
  slug: string,
  cover: string | undefined,
  html: string,
  fileExists: (publicPath: string) => boolean,
): GuideImageProblem[] {
  const out: GuideImageProblem[] = [];
  if (!cover || !cover.trim()) out.push({ slug, src: "", problem: "empty-src" });
  else if (!fileExists(`/openverse/${cover}`)) out.push({ slug, src: `/openverse/${cover}`, problem: "missing-local-file" });
  for (const { src, hasAlt } of inlineImageTags(html)) {
    if (!src) out.push({ slug, src, problem: "empty-src" });
    else if (/^(?:https?:)?\/\//i.test(src)) {
      const host = src.replace(/^(?:https?:)?\/\//i, "").split("/")[0].toLowerCase();
      if (host !== "livingwitharthritis.org.uk" && !ALLOWED_EXTERNAL_IMAGE_HOSTS.includes(host)) {
        out.push({ slug, src, problem: "external-host-not-allowed" });
      }
    } else if (!src.startsWith("data:") && !fileExists(src.split(/[?#]/)[0])) {
      out.push({ slug, src, problem: "missing-local-file" });
    }
    if (!hasAlt) out.push({ slug, src, problem: "missing-alt" });
  }
  return out;
}
