import { describe, expect, it } from "vitest";
import { sanitizeHtml } from "@/utils/sanitizeHtml";

describe("sanitised outbound article links", () => {
  it.each([
    ["WhatsApp", "https://api.whatsapp.com/send?text=hello"],
    ["WhatsApp shortlink", "https://wa.me/440000000000"],
    ["Threads", "https://www.threads.net/intent/post?text=hello"],
    ["Threads .com", "https://www.threads.com/intent/post?text=hello"],
  ])("adds nofollow and opener protection to %s", (_name, href) => {
    const result = sanitizeHtml(`<a target="_blank" href="${href}">Share</a>`);
    const el = document.createElement("div");
    el.innerHTML = result;
    const link = el.querySelector("a");
    expect(link?.getAttribute("rel")?.split(/\s+/)).toEqual(expect.arrayContaining(["nofollow", "noopener", "noreferrer"]));
  });

  it("protects other external links without unnecessary nofollow", () => {
    const html = sanitizeHtml('<a href="https://www.nhs.uk/conditions/osteoarthritis/" target="_blank">NHS</a>');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).not.toContain("nofollow");
  });

  it("removes scripts and javascript URLs before insertion", () => {
    const html = sanitizeHtml('<a href="javascript:alert(1)">bad</a><script>alert(1)</script>');
    expect(html).not.toMatch(/javascript:|<script/i);
  });
});
