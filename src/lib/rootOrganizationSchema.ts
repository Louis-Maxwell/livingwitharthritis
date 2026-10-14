import { getSchemaOrgSameAs } from "@/config/social-media";

/**
 * Sitewide Organization + WebSite JSON-LD payloads.
 * Consumed by <RootOrganizationSchema /> at runtime and by the static
 * copies in index.html (kept in lockstep via seo-identity tests).
 */
const BASE = "https://livingwitharthritis.org.uk";
const REGISTER_URL =
  "https://register-of-charities.charitycommission.gov.uk/charity-details/?regId=1218461&subId=0";

export const ORGANIZATION_PAYLOAD = {
  "@context": "https://schema.org",
  "@type": ["MedicalOrganization", "NGO", "Organization"],
  "@id": `${BASE}/#organization`,
  name: "Living With Arthritis",
  legalName: "Living With Arthritis",
  alternateName: ["Living With Arthritis charity", "Living With Arthritis (charity 1218461)"],
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
  disambiguatingDescription:
    "UK charity 1218461 providing free arthritis guidance, with clinical-review status shown on each page — not Arthritis UK (formerly Versus Arthritis).",
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
  keywords:
    "Living With Arthritis, arthritis support UK, arthritis charity UK, arthritis help UK, living with arthritis UK, osteoarthritis exercises, rheumatoid arthritis support, joint pain advice, frailty support, PIP arthritis guidance, NICE aligned exercise, arthritis pain relief UK, arthritis waiting list help, arthritis disability benefits UK, Mediterranean diet for arthritis",
  email: "info@livingwitharthritis.org.uk",
  knowsLanguage: ["en-GB", "English"],
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
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Free UK arthritis support from Living With Arthritis",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Arthritis exercise and movement guides",
        url: `${BASE}/guides/exercise`,
        availability: "https://schema.org/InStock",
        price: "0",
        priceCurrency: "GBP",
        itemOffered: {
          "@type": "Service",
          serviceType: "NICE-aligned arthritis exercise guidance",
          areaServed: "GB",
          audience: {
            "@type": "MedicalAudience",
            audienceType: "People living with arthritis",
          },
        },
      },
      {
        "@type": "Offer",
        name: "Benefits and PIP guidance for arthritis",
        url: `${BASE}/guides/benefits-pip`,
        availability: "https://schema.org/InStock",
        price: "0",
        priceCurrency: "GBP",
        itemOffered: {
          "@type": "Service",
          serviceType: "UK benefits information for arthritis and disability",
          areaServed: "GB",
        },
      },
      {
        "@type": "Offer",
        name: "Waiting-list and appointment preparation help",
        url: `${BASE}/arthritis-waiting-list-help`,
        availability: "https://schema.org/InStock",
        price: "0",
        priceCurrency: "GBP",
        itemOffered: {
          "@type": "Service",
          serviceType: "Plain-English UK healthcare navigation support",
          areaServed: "GB",
        },
      },
      {
        "@type": "Offer",
        name: "AI-readable arthritis content export",
        url: `${BASE}/llms.txt`,
        availability: "https://schema.org/InStock",
        price: "0",
        priceCurrency: "GBP",
        itemOffered: {
          "@type": "DigitalDocument",
          encodingFormat: "text/plain",
          name: "Living With Arthritis llms.txt",
        },
      },
    ],
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
    "Arthritis pain relief UK",
    "Arthritis waiting list help UK",
    "Arthritis disability benefits UK",
    "Arthritis charity UK",
    "Frailty and arthritis exercises",
    "Working with arthritis UK rights",
    "Mediterranean diet for arthritis",
    "Knee exercises for osteoarthritis",
    "Free arthritis resources UK",
    "Newly diagnosed arthritis UK",
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
  name: "Living With Arthritis",
  url: `${BASE}/`,
  inLanguage: "en-GB",
  description:
    "Free UK arthritis guidance from Living With Arthritis (registered charity 1218461), with clinical-review status shown on each page — NICE-aligned exercise, diet, PIP and waiting-list help. Independent of Arthritis UK.",
  about: [
    "Living With Arthritis",
    "Arthritis support UK",
    "Living with arthritis in the United Kingdom",
    "Osteoarthritis",
    "Rheumatoid arthritis",
    "Joint pain",
    "Frailty and musculoskeletal health",
    "UK disability benefits for arthritis",
  ],
  mainEntity: [
    { "@type": "MedicalWebPage", "@id": `${BASE}/conditions/arthritis#medicalwebpage`, name: "Arthritis" },
    { "@type": "Article", "@id": `${BASE}/living-with-arthritis#article`, name: "Living With Arthritis: A Complete UK Guide" },
  ],
  mentions: [
    { "@type": "Thing", name: "NICE osteoarthritis exercise guidance" },
    { "@type": "Thing", name: "NHS rheumatology and physiotherapy pathways" },
    { "@type": "Thing", name: "PIP, Attendance Allowance and Access to Work" },
  ],
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", ".speakable-intro"],
  },
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
