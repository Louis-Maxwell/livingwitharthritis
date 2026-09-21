import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { CHARITY, hasCharityAddress } from "@/config/charity";
import {
  CONTACT_EMAILS,
  CONTACT_PHONE,
  CONTACT_PHONE_E164,
} from "@/config/contact";
import { FACEBOOK_PAGE_ID, getSchemaOrgSameAs } from "@/config/social-media";
import { buildCharitySchema } from "@/lib/jsonLd";
import {
  ORGANIZATION_PAYLOAD,
  WEBSITE_PAYLOAD,
} from "@/lib/rootOrganizationSchema";

const indexHtml = readFileSync(resolve("index.html"), "utf8");
const robots = readFileSync(resolve("public/robots.txt"), "utf8");
const wellKnownAi = readFileSync(resolve("public/.well-known/ai.txt"), "utf8");
const llms = readFileSync(resolve("public/llms.txt"), "utf8");
const aboutUs = readFileSync(resolve("src/pages/AboutUs.tsx"), "utf8");
const homepage = readFileSync(resolve("src/pages/Index.tsx"), "utf8");
const trustStrip = readFileSync(
  resolve("src/components/landing/HomeTrustStrip.tsx"),
  "utf8",
);
const cityPage = readFileSync(resolve("src/pages/CityArthritisPage.tsx"), "utf8");
const cityOptimized = readFileSync(
  resolve("src/pages/CityPageOptimized.tsx"),
  "utf8",
);
const schemaTs = readFileSync(resolve("src/lib/rootOrganizationSchema.ts"), "utf8");

const BRAND_STRING = "Living With Arthritis UK (charity 1218461)";
const HOME_TITLE = "Living With Arthritis UK | Evidence-Based Health Guides";
const OFFICIAL_SAME_AS = [
  ...getSchemaOrgSameAs(),
  "https://register-of-charities.charitycommission.gov.uk/charity-details/?regId=1218461&subId=0",
  "https://findthatcharity.uk/orgid/GB-CHC-1218461",
  "https://ngoexplorer.org/charity/1218461",
];

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
  it("locks canonical charity contact facts", () => {
    expect(CHARITY.number).toBe("1218461");
    expect(CHARITY.siteUrl).toBe("https://livingwitharthritis.org.uk");
    expect(CHARITY.contactEmail).toBe("info@livingwitharthritis.org.uk");
    expect(CONTACT_EMAILS.info).toBe("info@livingwitharthritis.org.uk");
    expect(CONTACT_PHONE).toBe("07760 512 084");
    expect(CONTACT_PHONE_E164).toBe("+447760512084");
    expect(FACEBOOK_PAGE_ID).toBe("61583723925315");
    expect(ORGANIZATION_PAYLOAD.founder.identifier.value).toBe("PH128483");
    expect(ORGANIZATION_PAYLOAD.contactPoint[0].telephone.replace(/\D/g, "")).toBe(
      "447760512084",
    );
    expect(ORGANIZATION_PAYLOAD.email).toBe("info@livingwitharthritis.org.uk");
  });

  it("does not publish Oswestry coordinates or a street address", () => {
    expect(indexHtml).not.toMatch(/52\.8598/);
    expect(indexHtml).not.toMatch(/-3\.0538/);
    expect(indexHtml).not.toMatch(/Oswestry/i);
    expect(indexHtml).not.toMatch(/geo\.position/i);
    expect(indexHtml).not.toMatch(/ICBM/i);
    expect(indexHtml).not.toMatch(/Thomas Savin/i);
    expect(indexHtml).not.toMatch(/SY11 1GA/i);
    expect(aboutUs).not.toMatch(/Oswestry|Thomas Savin|SY11 1GA/i);
    expect(homepage).not.toMatch(/Oswestry|Thomas Savin|SY11 1GA/i);
    expect(schemaTs).not.toMatch(/Oswestry|Thomas Savin|SY11 1GA/i);
    expect(llms).not.toMatch(/Oswestry|Thomas Savin|SY11 1GA/i);
    expect(wellKnownAi).not.toMatch(/Oswestry|Thomas Savin|SY11 1GA/i);
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
    expect(org.name).toBe("Living With Arthritis UK");
    expect(org.legalName).toBe("Living With Arthritis");
    expect(org.alternateName).toEqual(
      expect.arrayContaining([
        "Living With Arthritis UK",
        "Living With Arthritis charity",
      ]),
    );
    expect(org.founder.name).toBe("Louis Maxwell");
    expect(org.founder.identifier.value).toBe("PH128483");
    expect(ORGANIZATION_PAYLOAD.founder.identifier.value).toBe("PH128483");
    expect(org.sameAs).toEqual(OFFICIAL_SAME_AS);
    expect(org.sameAs).toEqual(ORGANIZATION_PAYLOAD.sameAs);
    expect(org).not.toHaveProperty("address");
    expect(ORGANIZATION_PAYLOAD["@id"]).toBe(org["@id"]);
    expect(ORGANIZATION_PAYLOAD["@type"]).toEqual(org["@type"]);
    expect(buildCharitySchema()["@id"]).toBe(org["@id"]);
  });

  it("keeps static index.html Organization JSON-LD in lockstep with the TS payload", () => {
    const org = jsonLdFromIndex("root-organization-jsonld");
    expect(org.name).toBe(ORGANIZATION_PAYLOAD.name);
    expect(org.legalName).toBe(ORGANIZATION_PAYLOAD.legalName);
    expect(org.sameAs).toEqual(ORGANIZATION_PAYLOAD.sameAs);
    expect(org.founder).toEqual(ORGANIZATION_PAYLOAD.founder);
    expect(org.identifier).toEqual(ORGANIZATION_PAYLOAD.identifier);
    expect(org.email).toBe(ORGANIZATION_PAYLOAD.email);
  });

  it("ships a WebSite node with an EntryPoint SearchAction", () => {
    const site = jsonLdFromIndex("root-website-jsonld");
    expect(site["@id"]).toBe("https://livingwitharthritis.org.uk/#website");
    expect(site.potentialAction.target["@type"]).toBe("EntryPoint");
    expect(site.potentialAction.target.urlTemplate).toContain("/search?q=");
    expect(WEBSITE_PAYLOAD.potentialAction.target["@type"]).toBe("EntryPoint");
  });

  it("uses brand-first homepage titles and a crawlable brand string", () => {
    expect(indexHtml).toContain(`<title>${HOME_TITLE}</title>`);
    expect(indexHtml).toContain(`content="${HOME_TITLE}"`);
    expect(homepage).toContain(`<title>${HOME_TITLE}</title>`);
    expect(homepage).toContain(HOME_TITLE);
    expect(homepage).toMatch(/index,\s*follow/);
    expect(homepage).not.toMatch(/noindex/);
    expect(trustStrip).toMatch(/Living With Arthritis UK \(charity \{CHARITY\.number\}\)/);
    expect(indexHtml).toContain(BRAND_STRING);
    expect(indexHtml).toMatch(/Living With Arthritis UK — evidence-based health guides/i);
  });

  it("keeps About brand-first, indexable, and address-free", () => {
    expect(aboutUs).toContain(
      "About Living With Arthritis UK | Registered charity 1218461",
    );
    expect(aboutUs).toMatch(/Living With Arthritis UK \(charity \{CHARITY\.number\}\)/);
    expect(aboutUs).toContain("info@livingwitharthritis.org.uk");
    expect(aboutUs).toMatch(/CONTACT_PHONE/);
    expect(aboutUs).toContain("07760 512 084");
    expect(aboutUs).toMatch(/index,\s*follow/);
    expect(aboutUs).not.toMatch(/noindex/);
  });

  it("does not invent social sameAs URLs", () => {
    expect(cityOptimized.toLowerCase().includes("twitter.com/livingwarthritis")).toBe(
      false,
    );
    expect(cityOptimized.includes("getSchemaOrgSameAs")).toBe(true);
    expect(indexHtml.toLowerCase().includes("facebook.com/livingwitharthritis")).toBe(
      false,
    );
    const sameAsHosts = ORGANIZATION_PAYLOAD.sameAs.map((url) => {
      const host = new URL(url).hostname;
      return host.startsWith("www.") ? host.slice(4) : host;
    });
    expect(sameAsHosts.includes("twitter.com")).toBe(false);
    expect(sameAsHosts.includes("x.com")).toBe(false);
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
    expect(wellKnownAi).toContain("Living With Arthritis UK (charity 1218461)");
    expect(llms).toContain("Living With Arthritis UK (charity 1218461)");
  });

  it("does not mark city hubs as a MedicalBusiness", () => {
    expect(cityPage).not.toMatch(/MedicalBusiness/);
    expect(cityPage).not.toMatch(/14 to 22 weeks/);
  });
});
