import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { trackEvent } from "../analytics";
import { classifyLink, installAutoEvents } from "../auto-events";

const a = (href: string, extra: Record<string, string> = {}) => {
  const el = document.createElement("a");
  el.setAttribute("href", href);
  for (const [k, v] of Object.entries(extra)) el.setAttribute(k, v);
  el.textContent = "Link";
  return el;
};

describe("classifyLink", () => {
  it("phone links only record a click, not a lead or number", () => {
    const ev = classifyLink(a("tel:08009172222"));
    expect(ev.map((e) => e.name)).toEqual(["phone_click"]);
    expect(JSON.stringify(ev)).not.toContain("0800");
  });
  it("mailto fires email_click without the address; recipient-less mailto is a share", () => {
    const ev = classifyLink(a("mailto:hello@example.org"));
    expect(ev.map((e) => e.name)).toEqual(["email_click"]);
    expect(JSON.stringify(ev)).not.toContain("@");
    expect(classifyLink(a("mailto:?subject=x"))[0].name).toBe("social_share");
  });
  it("does not send contact details shown in text or accessible labels", () => {
    const phone = a("tel:+447760512084", { "aria-label": "Call +44 7760 512084" });
    phone.textContent = "+44 7760 512084";
    const email = a("mailto:info@example.org?subject=Private", { "aria-label": "Email info@example.org" });
    email.textContent = "info@example.org";
    expect(classifyLink(phone)).toEqual([{ name: "phone_click", params: { method: "phone" } }]);
    expect(classifyLink(email)).toEqual([{ name: "email_click", params: { method: "email" } }]);
  });
  it("pdf and download links fire file_download", () => {
    expect(classifyLink(a("/downloads/pip-diary.pdf"))[0]).toMatchObject({ name: "file_download", params: { file_extension: "pdf", file_name: "pip-diary.pdf" } });
    expect(classifyLink(a("/x/plan", { download: "" }))[0].name).toBe("file_download");
  });
  it("share URLs record platform/location without shared text", () => {
    expect(classifyLink(a("https://www.facebook.com/sharer/sharer.php?u=x"))[0]).toMatchObject({ name: "social_media_click", params: { platform: "facebook", link_location: "article_share_bar", target_url: "https://www.facebook.com/sharer/sharer.php" } });
    expect(classifyLink(a("https://wa.me/?text=x"))[0].params.platform).toBe("whatsapp");
  });
  it("WhatsApp contact intent never sends its recipient or message", () => {
    const events = classifyLink(a("https://wa.me/447760512084?text=private"));
    expect(events).toEqual([{ name: "helpline_engagement", params: { channel: "whatsapp", interaction_type: "intent" } }]);
    expect(JSON.stringify(events)).not.toContain("private");
    expect(JSON.stringify(events)).not.toContain("447760");
  });
  it("ordinary links fire nothing", () => {
    expect(classifyLink(a("/guides/benefits-pip"))).toEqual([]);
  });
});

type GtagWindow = { gtag: ReturnType<typeof vi.fn> };
const w = () => window as unknown as GtagWindow;

describe("installAutoEvents", () => {
  beforeEach(() => { localStorage.setItem("lwa_cv3", JSON.stringify({ a: true })); w().gtag = vi.fn(); });
  afterEach(() => { localStorage.clear(); document.body.innerHTML = ""; });
  it("sends events with page_location on a real click and video end", () => {
    installAutoEvents();
    const link = a("tel:0800");
    link.addEventListener("click", (e) => e.preventDefault());
    document.body.appendChild(link);
    link.click();
    const v = document.createElement("video");
    document.body.appendChild(v);
    v.dispatchEvent(new Event("ended"));
    const names = w().gtag.mock.calls.map((c: unknown[]) => c[1]);
    expect(names).toEqual(expect.arrayContaining(["helpline_engagement", "video_complete"]));
    expect(names).not.toContain("generate_lead");
    const params = w().gtag.mock.calls[0][2];
    expect(params.page_location).toMatch(/^https?:\/\//);
  });
  it("deduplicates a delegated and manual download within one click, not two genuine clicks", () => {
    installAutoEvents();
    const link = a("/downloads/unique-plan.pdf");
    link.addEventListener("click", event => { event.preventDefault(); trackEvent("file_download", { file_name: "unique-plan.pdf" }); });
    document.body.appendChild(link);
    link.click(); link.click();
    expect(w().gtag.mock.calls.filter(call => call[1] === "resource_download")).toHaveLength(2);
  });
});
