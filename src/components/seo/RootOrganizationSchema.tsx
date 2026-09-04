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
  address: {
    "@type": "PostalAddress",
    streetAddress: "Oswestry Primary Care Centre, Thomas Savin Road",
    addressLocality: "Oswestry",
    addressRegion: "Shropshire",
    postalCode: "SY11 1GA",
    addressCountry: "GB",
  },
  description:
    "Living With Arthritis is a registered charity in England and Wales no. 1218461, independent of Arthritis UK, providing free virtual physiotherapy, NICE-aligned exercises, anti-inflammatory nutrition guidance and peer support for people living with joint pain across the United Kingdom.",
  email: "info@livingwitharthritis.org.uk",
  availableLanguage: ["en-GB", "English"],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+44-7760-512-084",
    email: "info@livingwitharthritis.org.uk",
    contactType: "customer support",
    availableLanguage: ["English", "en-GB"],
    areaServed: "GB",
  },
  areaServed: [
    { "@type": "Country", name: "United Kingdom", identifier: "GB" },
    { "@type": "AdministrativeArea", name: "England" },
    { "@type": "AdministrativeArea", name: "Scotland" },
    { "@type": "AdministrativeArea", name: "Wales" },
    { "@type": "AdministrativeArea", name: "Northern Ireland" },
  ],
  medicalSpecialty: ["Rheumatology", "Physiotherapy", "Nutrition"],
  identifier: {
    "@type": "PropertyValue",
    propertyID: "GB-CHC",
    value: "1218461",
    url: "https://register-of-charities.charitycommission.gov.uk/charity-details/?regId=1218461&subId=0",
  },
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
    "https://register-of-charities.charitycommission.gov.uk/charity-details/?regId=1218461&subId=0",
    "https://findthatcharity.uk/orgid/GB-CHC-1218461",
    "https://ngoexplorer.org/charity/1218461",
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
