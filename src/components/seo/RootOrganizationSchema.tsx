import { useEffect } from "react";
import { getSchemaOrgSameAs } from "@/config/social-media";

/**
 * Sitewide organisation JSON-LD with sameAs links.
 * Strengthens entity disambiguation for search engines and knowledge systems.
 * Mounted once at root via App.tsx. Injected via useEffect (per project
 * convention — never via Helmet).
 */
const BASE = "https://livingwitharthritis.org.uk";

const PAYLOAD = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "@id": `${BASE}/#organization`,
  name: "Living With Arthritis",
  legalName: "Living With Arthritis",
  alternateName: [
    "Living With Arthritis UK",
    "Living With Arthritis charity",
    "Living With Arthritis UK charity",
  ],
  url: BASE,
  logo: {
    "@type": "ImageObject",
    url: `${BASE}/icons/icon-512.png`,
    width: 512,
    height: 512,
  },
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
    "Living With Arthritis is an independent registered charity in England and Wales (charity no. 1218461) working to improve awareness, understanding and self-management of arthritis and frailty. We provide free, evidence-based health information, exercise, nutrition, support and practical resources for people across the United Kingdom.",
  mission:
    "To improve awareness and understanding of arthritis and frailty and help people stay informed, active, independent and supported through evidence-based information and practical resources.",
  email: "info@livingwitharthritis.org.uk",
  areaServed: [
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "AdministrativeArea", name: "England" },
    { "@type": "AdministrativeArea", name: "Scotland" },
    { "@type": "AdministrativeArea", name: "Wales" },
    { "@type": "AdministrativeArea", name: "Northern Ireland" },
  ],
  knowsAbout: [
    "Arthritis",
    "Osteoarthritis",
    "Rheumatoid arthritis",
    "Psoriatic arthritis",
    "Gout",
    "Ankylosing spondylitis",
    "Fibromyalgia",
    "Lupus",
    "Polymyalgia rheumatica",
    "Arthritis awareness",
    "Frailty",
    "Frailty awareness",
    "Frailty prevention",
    "Falls prevention",
    "Sarcopenia and muscle loss",
    "Healthy ageing",
    "Bone health and osteoporosis",
    "Mobility and independence",
    "Physical activity for older adults",
    "Nutrition and healthy ageing",
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
  identifier: {
    "@type": "PropertyValue",
    propertyID: "GB-CHC",
    value: "1218461",
    url: "https://register-of-charities.charitycommission.gov.uk/charity-details/?regId=1218461&subId=0",
  },
  sameAs: [
    ...getSchemaOrgSameAs(),
    "https://register-of-charities.charitycommission.gov.uk/charity-details/?regId=1218461&subId=0",
    "https://findthatcharity.uk/orgid/GB-CHC-1218461",
    "https://ngoexplorer.org/charity/1218461",
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
    target: `${BASE}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootOrganizationSchema() {
  useEffect(() => {
    const ids = [
      { id: "root-organization-jsonld", payload: PAYLOAD },
      { id: "root-website-jsonld", payload: WEBSITE_PAYLOAD },
    ];
    const created: HTMLScriptElement[] = [];
    for (const { id, payload } of ids) {
      document.getElementById(id)?.remove();
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = id;
      script.text = JSON.stringify(payload);
      document.head.appendChild(script);
      created.push(script);
    }
    return () => {
      for (const script of created) script.remove();
    };
  }, []);
  return null;
}
