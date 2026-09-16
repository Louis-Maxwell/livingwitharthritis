import { useEffect } from "react";
import { getSchemaOrgSameAs } from "@/config/social-media";

/**
 * Sitewide NGO + MedicalOrganization + WebSite JSON-LD.
 * Strengthens entity disambiguation for LLMs and search engines.
 * Mounted once at root via App.tsx. Injected via useEffect (per project
 * memory — never via Helmet). Static copies with the same script ids live
 * in index.html for non-JS crawlers; this component refreshes those nodes
 * instead of emitting a second Organization / WebSite block.
 */
const BASE = "https://livingwitharthritis.org.uk";
const REGISTER_URL =
  "https://register-of-charities.charitycommission.gov.uk/charity-details/?regId=1218461&subId=0";

export const ORGANIZATION_PAYLOAD = {
  "@context": "https://schema.org",
  "@type": ["MedicalOrganization", "NGO", "Organization"],
  "@id": `${BASE}/#organization`,
  name: "Living With Arthritis UK",
  legalName: "Living With Arthritis",
  alternateName: ["Living With Arthritis UK", "Living With Arthritis charity"],
  url: BASE,
  logo: {
    "@type": "ImageObject",
    url: `${BASE}/icons/icon-512.png`,
    width: 512,
    height: 512,
  },
  // Primary share/photo for platforms that misuse Organization.logo as a preview.
  image: {
    "@type": "ImageObject",
    url: `${BASE}/og/landing-share.png`,
    width: 1200,
    height: 630,
  },
  foundingDate: "2026-06-15",
  founder: {
    "@type": "Person",
    name: "Louis Maxwell",
    alternateName: "Maxwell",
    jobTitle: "First Contact Practitioner",
    identifier: {
      "@type": "PropertyValue",
      propertyID: "HCPC",
      value: "PH128483",
    },
    url: `${BASE}/authors/maxwell`,
  },
  description:
    "Living With Arthritis is a registered charity in England and Wales no. 1218461, independent of Arthritis UK, providing free virtual physiotherapy, NICE-aligned exercises, anti-inflammatory nutrition guidance and peer support for people living with joint pain across the United Kingdom.",
  email: "info@livingwitharthritis.org.uk",
  areaServed: [
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "AdministrativeArea", name: "England" },
    { "@type": "AdministrativeArea", name: "Scotland" },
    { "@type": "AdministrativeArea", name: "Wales" },
    { "@type": "AdministrativeArea", name: "Northern Ireland" },
  ],
  medicalSpecialty: ["Rheumatology", "Physiotherapy", "Nutrition"],
  identifier: [
    {
      "@type": "PropertyValue",
      propertyID: "GB-CHC",
      value: "1218461",
      url: REGISTER_URL,
    },
  ],
  subjectOf: {
    "@type": "CreativeWork",
    name: "UK Charity Commission Register entry",
    url: REGISTER_URL,
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+44-7760-512-084",
      email: "info@livingwitharthritis.org.uk",
      contactType: "customer support",
      availableLanguage: ["English", "en-GB"],
      areaServed: "GB",
    },
  ],
  knowsAbout: [
    "Osteoarthritis",
    "Rheumatoid arthritis",
    "Psoriatic arthritis",
    "Gout",
    "Ankylosing spondylitis",
    "Fibromyalgia",
    "Lupus",
    "Polymyalgia rheumatica",
    "Anti-inflammatory diet",
    "Mediterranean diet",
    "Joint exercises",
    "PIP arthritis benefits",
    "Adult Disability Payment Scotland",
    "Blue Badge arthritis",
    "Access to Work",
    "Equality Act reasonable adjustments",
    "Rheumatology waiting lists UK",
    "Methotrexate side effects",
    "NICE osteoarthritis exercise",
  ],
  // sameAs strengthens the entity graph for LLMs and search engines.
  // Only include URLs that resolve to a real, publicly-visible profile
  // owned by this charity. Generated from centralized social-media.ts config.
  sameAs: [
    ...getSchemaOrgSameAs(),
    REGISTER_URL,
    "https://findthatcharity.uk/orgid/GB-CHC-1218461",
    "https://ngoexplorer.org/charity/1218461",
  ],
};

export const WEBSITE_PAYLOAD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE}/#website`,
  name: "Living With Arthritis UK",
  url: `${BASE}/`,
  inLanguage: "en-GB",
  description:
    "Expert arthritis support, virtual physiotherapy, anti-inflammatory nutrition and community resources for UK residents.",
  publisher: { "@id": `${BASE}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

function upsertJsonLd(id: string, payload: unknown): HTMLScriptElement | null {
  const existing = document.getElementById(id);
  const json = JSON.stringify(payload);
  if (existing instanceof HTMLScriptElement) {
    existing.type = "application/ld+json";
    existing.text = json;
    return null;
  }
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = id;
  script.text = json;
  document.head.appendChild(script);
  return script;
}

export default function RootOrganizationSchema() {
  useEffect(() => {
    const created = [
      upsertJsonLd("root-organization-jsonld", ORGANIZATION_PAYLOAD),
      upsertJsonLd("root-website-jsonld", WEBSITE_PAYLOAD),
    ].filter((node): node is HTMLScriptElement => Boolean(node));
    return () => {
      for (const script of created) script.remove();
    };
  }, []);
  return null;
}
