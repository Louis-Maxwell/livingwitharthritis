import { useEffect } from "react";

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
  // owned by this charity. Do NOT add placeholder or guessed URLs.
  sameAs: [
    "https://www.pinterest.co.uk/livingwitharthritis",
    "https://register-of-charities.charitycommission.gov.uk/en/charity-search/-/charity-details/5274747/charity-overview",
    // TODO: add Companies House page URL if the charity has a registered company number
    // TODO: add LinkedIn company page URL (https://www.linkedin.com/company/<slug>)
    // TODO: add X / Twitter profile URL
    // TODO: add Facebook page URL
    // TODO: add Instagram profile URL
    // TODO: add YouTube channel URL
    // TODO: add Wikipedia article URL if one exists
  ],
};

const WEBSITE_PAYLOAD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE}/#website`,
  name: "Living With Arthritis UK",
  url: BASE,
  inLanguage: "en-GB",
  publisher: { "@id": `${BASE}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE}/library?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

function injectJsonLd(id: string, payload: unknown) {
  const existing = document.getElementById(id);
  if (existing) existing.remove();
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = id;
  script.text = JSON.stringify(payload);
  document.head.appendChild(script);
}

export default function RootOrganizationSchema() {
  useEffect(() => {
    injectJsonLd("root-organization-jsonld", PAYLOAD);
    injectJsonLd("root-website-jsonld", WEBSITE_PAYLOAD);
    return () => {
      document.getElementById("root-organization-jsonld")?.remove();
      document.getElementById("root-website-jsonld")?.remove();
    };
  }, []);
  return null;
}
