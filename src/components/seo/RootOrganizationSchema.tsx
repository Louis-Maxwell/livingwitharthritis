import { useEffect } from "react";
import { getSchemaOrgSameAs } from "@/config/social-media";

/**
 * Sitewide MedicalOrganization JSON-LD with sameAs links.
 * Strengthens entity disambiguation for LLMs and search engines.
 * Mounted once at root via App.tsx. Injected via useEffect (per project
 * memory — never via Helmet).
 */
const BASE = "https://livingwitharthritis.org.uk";

const PAYLOAD = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "@id": `${BASE}/#organization`,
  name: "Living With Arthritis UK",
  alternateName: "Living With Arthritis",
  url: BASE,
  logo: {
    "@type": "ImageObject",
    url: `${BASE}/favicon.ico`,
  },
  description:
    "UK charity providing free virtual physiotherapy, NICE-aligned exercise programmes, anti-inflammatory diet guidance, benefits advice and peer support for the ~10 million people living with arthritis across the United Kingdom.",
  email: "info@livingwitharthritis.org.uk",
  areaServed: {
    "@type": "Country",
    name: "United Kingdom",
  },
  medicalSpecialty: ["Rheumatology", "Physiotherapy", "Nutrition"],
  identifier: {
    "@type": "PropertyValue",
    propertyID: "GB-CHC",
    value: "1218461",
    url: "https://register-of-charities.charitycommission.gov.uk/en/charity-search/-/charity-details/5274747/charity-overview",
  },
  founder: {
    "@type": "Person",
    name: "Maxwell",
    jobTitle: "First Contact Practitioner",
    identifier: "HCPC PH128483",
    url: `${BASE}/authors/maxwell`,
  },
  member: [
    {
      "@type": "Person",
      name: "Maxwell",
      jobTitle: "First Contact Practitioner",
      identifier: "HCPC PH128483",
      url: `${BASE}/authors/maxwell`,
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
  ],
  // sameAs strengthens the entity graph for LLMs and search engines.
  // Only include URLs that resolve to a real, publicly-visible profile
  // owned by this charity. Generated from centralized social-media.ts config.
  sameAs: [
    ...getSchemaOrgSameAs(),
    "https://register-of-charities.charitycommission.gov.uk/en/charity-search/-/charity-details/5274747/charity-overview",
  ],
};

export default function RootOrganizationSchema() {
  useEffect(() => {
    const id = "root-organization-jsonld";
    const existing = document.getElementById(id);
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    script.text = JSON.stringify(PAYLOAD);
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, []);
  return null;
}
