/**
 * Site-wide GA4 key events wired by event delegation, so every real
 * tel:/mailto: link, downloadable file, share link and <video> is covered
 * without each component remembering to call a tracker.
 *
 * Privacy: never sends the phone number, email address or query strings.
 */
import { trackEvent } from "@/lib/analytics";

const FILE_RE = /\.(pdf|docx?|xlsx?|pptx?|csv|zip|epub|txt|mp3)$/i;
const SHARE_RE =
  /^(https?:\/\/)?(www\.)?(wa\.me|api\.whatsapp\.com|facebook\.com\/sharer|linkedin\.com\/sharing|twitter\.com\/intent|x\.com\/intent|bsky\.app\/intent|reddit\.com\/submit|pinterest\.[a-z.]+\/pin\/create)/i;

export type AutoEvent = { name: string; params: Record<string, unknown> };

/** Pure classifier (unit-tested): what a click on this anchor means. */
export function classifyLink(a: Pick<HTMLAnchorElement, "getAttribute" | "textContent">, origin = "https://livingwitharthritis.org.uk"): AutoEvent[] {
  const raw = (a.getAttribute("href") || "").trim();
  if (!raw) return [];
  const label = (a.getAttribute("aria-label") || a.textContent || "").trim().slice(0, 80);
  const lower = raw.toLowerCase();
  if (lower.startsWith("tel:")) {
    return [
      { name: "phone_click", params: { link_text: label, method: "phone" } },
      { name: "generate_lead", params: { method: "phone" } },
    ];
  }
  if (lower.startsWith("mailto:")) {
    // mailto:?subject=… with no recipient is the e-mail share button.
    if (/^mailto:\?/.test(lower)) return [{ name: "social_share", params: { method: "email", link_text: label } }];
    return [
      { name: "email_click", params: { link_text: label, method: "email" } },
      { name: "generate_lead", params: { method: "email" } },
    ];
  }
  if (SHARE_RE.test(raw)) {
    const host = new URL(raw, origin).hostname.replace(/^www\./, "");
    return [{ name: "social_share", params: { method: host.split(".")[0] === "wa" ? "whatsapp" : host.split(".")[0], link_text: label } }];
  }
  let url: URL;
  try { url = new URL(raw, origin); } catch { return []; }
  const m = FILE_RE.exec(url.pathname);
  if (m || a.getAttribute("download") != null) {
    const file_name = decodeURIComponent(url.pathname.split("/").pop() || "file");
    return [{
      name: "file_download",
      params: {
        file_name,
        file_extension: (m?.[1] || file_name.split(".").pop() || "unknown").toLowerCase(),
        file_url: `${url.origin}${url.pathname}`,
        link_text: label,
      },
    }];
  }
  return [];
}

let installed = false;

export function installAutoEvents(doc: Document = document): void {
  if (installed || typeof window === "undefined") return;
  installed = true;
  doc.addEventListener("click", (e) => {
    const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
    if (!a) return;
    for (const ev of classifyLink(a, window.location.origin)) trackEvent(ev.name, ev.params);
  }, { capture: true });

  // Native Web Share button(s) mark themselves with data-share="native".
  doc.addEventListener("click", (e) => {
    const b = (e.target as Element | null)?.closest?.("[data-share]") as HTMLElement | null;
    if (b && b.tagName !== "A") trackEvent("social_share", { method: b.dataset.share || "native" });
  }, { capture: true });

  const videoName = (v: HTMLVideoElement) =>
    v.getAttribute("aria-label") || v.getAttribute("title") || (v.currentSrc || v.src || "").split("/").pop() || "video";
  const started = new WeakSet<HTMLVideoElement>();
  doc.addEventListener("play", (e) => {
    const v = e.target as HTMLVideoElement;
    if (!(v instanceof HTMLVideoElement) || started.has(v)) return;
    started.add(v);
    trackEvent("video_start", { video_title: videoName(v), video_provider: "self_hosted" });
  }, true);
  doc.addEventListener("ended", (e) => {
    const v = e.target as HTMLVideoElement;
    if (!(v instanceof HTMLVideoElement)) return;
    trackEvent("video_complete", { video_title: videoName(v), video_provider: "self_hosted", video_percent: 100 });
  }, true);
}
