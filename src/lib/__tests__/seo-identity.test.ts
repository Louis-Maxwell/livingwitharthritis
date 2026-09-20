import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { CHARITY, hasCharityAddress } from "@/config/charity";
import { buildCharitySchema } from "@/lib/jsonLd";
import {
  ORGANIZATION_PAYLOAD,
  WEBSITE_PAYLOAD,
} from "@/lib/rootOrganizationSchema";

const indexHtml = readFileSync(resolve("index.html"), "utf8");
const robots = readFileSync(resolve("public/robots.txt"), "utf8");
const wellKnownAi = readFileSync(resolve("public/.well-known/ai.txt"), "utf8");
const cityPage = readFileSync(resolve("src/pages/CityArthritisPage.tsx"), "utf8");

function jsonLdFromIndex(id: string) {
  const re = new RegExp(
    `<script[^>]*id="${id}"[^>]*>([\\s\\S]*?)</script>`,
    "i",
  );
  const match = indexHtml.match(re);
  expect(match, `missing script#${id} in index.html`).toBeTruthy();
  return JSON.parse(match![1]);
}

describe("public SEO / AEO identity", () => {
  it("does not publish Oswestry coordinates or a street address", () => {
    expect(indexHtml).not.toMatch(/52\.8598/);
    expect(indexHtml).not.toMatch(/-3\.0538/);
    expect(indexHtml).not.toMatch(/Oswestry/i);
    expect(indexHtml).not.toMatch(/geo\.position/i);
    expect(indexHtml).not.toMatch(/ICBM/i);
    expect(CHARITY.address.street).toBe("");
    expect(CHARITY.address.postalCode).toBe("");
    expect(hasCharityAddress()).toBe(false);
  });

  it("ships one NGO + Organization + MedicalOrganization node with charity 1218461", () => {
    const org = jsonLdFromIndex("root-organization-jsonld");
    expect(org["@id"]).toBe("https://livingwitharthritis.org.uk/#organization");
    expect(org["@type"]).toEqual(
      expect.arrayContaining(["NGO", "Organization", "MedicalOrganization"]),
    );
    expect(JSON.stringify(org.identifier)).toContain("1218461");
    expect(org.sameAs).toEqual(
      expect.arrayContaining([
        "https://www.facebook.com/profile.php?id=61583723925315",
        "https://www.linkedin.com/company/112596569/",
        "https://www.instagram.com/livingwitharthritisuk/",
        "https://www.youtube.com/@livingwitharthritisuk",
      ]),
    );
    expect(ORGANIZATION_PAYLOAD["@id"]).toBe(org["@id"]);
    expect(ORGANIZATION_PAYLOAD["@type"]).toEqual(org["@type"]);
    expect(buildCharitySchema()["@id"]).toBe(org["@id"]);
  });

  it("ships a WebSite node with an EntryPoint SearchAction", () => {
    const site = jsonLdFromIndex("root-website-jsonld");
    expect(site["@id"]).toBe("https://livingwitharthritis.org.uk/#website");
    expect(site.potentialAction.target["@type"]).toBe("EntryPoint");
    expect(site.potentialAction.target.urlTemplate).toContain("/search?q=");
    expect(WEBSITE_PAYLOAD.potentialAction.target["@type"]).toBe("EntryPoint");
    expect(JSON.stringify(site.about)).toContain("United Kingdom");
    expect(site.speakable.cssSelector).toEqual(
      expect.arrayContaining(["h1", ".speakable-intro"]),
    );
    expect(WEBSITE_PAYLOAD.speakable.cssSelector).toEqual(site.speakable.cssSelector);
  });

  it("keeps Bytespider blocked and private paths disallowed for FacebookBot", () => {
    expect(robots).toMatch(/User-agent:\s*Bytespider[\s\S]*?Disallow:\s*\/\s*$/m);
    const facebook = robots.split(/User-agent:/i).find((b) => /FacebookBot/i.test(b));
    expect(facebook).toBeTruthy();
    expect(facebook).toMatch(/Disallow:\s*\/admin\//);
    expect(facebook).not.toMatch(/Allow:\s*\/\s*$[\s\S]*Disallow:\s*\/\s*$/m);
  });

  it("includes clinician identity on the machine-readable ai.txt", () => {
    expect(wellKnownAi).toMatch(/1218461/);
    expect(wellKnownAi).toMatch(/Independent of Arthritis UK/);
    expect(wellKnownAi).toMatch(/PH128483/);
  });

  it("does not mark city hubs as a MedicalBusiness", () => {
    expect(cityPage).not.toMatch(/MedicalBusiness/);
    expect(cityPage).not.toMatch(/14 to 22 weeks/);
  });
});
