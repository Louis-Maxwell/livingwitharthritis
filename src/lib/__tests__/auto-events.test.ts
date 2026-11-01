import { describe, it, expect, vi, beforeEach } from "vitest";
import { classifyLink, installAutoEvents } from "../auto-events";

const a = (href: string, extra: Record<string, string> = {}) => {
  const el = document.createElement("a");
  el.setAttribute("href", href);
  for (const [k, v] of Object.entries(extra)) el.setAttribute(k, v);
  el.textContent = "Link";
  return el;
};

describe("classifyLink", () => {
  it("phone links record engagement without counting an unconfirmed lead", () => {
    const ev = classifyLink(a("tel:08009172222"));
    expect(ev.map((e) => e.name)).toEqual(["phone_click"]);
    expect(JSON.stringify(ev)).not.toContain("0800");
  });
  it("mailto records engagement without counting an unconfirmed lead; recipient-less mailto is a share", () => {
    const ev = classifyLink(a("mailto:hello@example.org"));
    expect(ev.map((e) => e.name)).toEqual(["email_click"]);
    expect(JSON.stringify(ev)).not.toContain("@");
    expect(classifyLink(a("mailto:?subject=x"))[0].name).toBe("social_share");
  });
  it("pdf and download links fire file_download", () => {
    expect(classifyLink(a("/downloads/pip-diary.pdf"))[0]).toMatchObject({ name: "file_download", params: { file_extension: "pdf", file_name: "pip-diary.pdf" } });
    expect(classifyLink(a("/x/plan", { download: "" }))[0].name).toBe("file_download");
  });
  it("share URLs fire social_share", () => {
    expect(classifyLink(a("https://www.facebook.com/sharer/sharer.php?u=x"))[0]).toMatchObject({ name: "social_share", params: { method: "facebook" } });
    expect(classifyLink(a("https://wa.me/?text=x"))[0].params.method).toBe("whatsapp");
  });
  it("ordinary links fire nothing", () => {
    expect(classifyLink(a("/guides/benefits-pip"))).toEqual([]);
  });
});

type GtagWindow = { gtag: ReturnType<typeof vi.fn> };
const w = () => window as unknown as GtagWindow;

describe("installAutoEvents", () => {
  beforeEach(() => { w().gtag = vi.fn(); });
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
    expect(names).toEqual(expect.arrayContaining(["phone_click", "video_complete"]));
    expect(names).not.toContain("generate_lead");
    const params = w().gtag.mock.calls[0][2];
    expect(params.page_location).toMatch(/^https?:\/\//);
  });
});
