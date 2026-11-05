/**
 * Single source of truth for Louis Maxwell's Person schema.
 * Facts supplied by Louis; do not add unverified claims or sameAs URLs.
 */
const BASE = "https://livingwitharthritis.org.uk";
export const LOUIS_MAXWELL_PROFILE_URL = `${BASE}/authors/maxwell`;
export const LOUIS_MAXWELL_ID = `${LOUIS_MAXWELL_PROFILE_URL}#person`;

const HCPC = {
  "@type": "PropertyValue",
  propertyID: "HCPC registration number",
  value: "PH128483",
} as const;

/** Full Person node, emitted on the profile page. */
export const LOUIS_MAXWELL_PERSON = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": LOUIS_MAXWELL_ID,
  name: "Louis Maxwell",
  url: LOUIS_MAXWELL_PROFILE_URL,
  mainEntityOfPage: LOUIS_MAXWELL_PROFILE_URL,
  jobTitle: ["Band 8 Advanced Practice Physiotherapist", "AI Engineer", "Founder, Living With Arthritis"],
  identifier: HCPC,
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "Professional registration",
    name: "HCPC registered physiotherapist (PH128483)",
    recognizedBy: { "@type": "Organization", name: "Health and Care Professions Council", url: "https://www.hcpc-uk.org" },
  },
  hasOccupation: [
    { "@type": "Occupation", name: "Advanced Practice Physiotherapist (Band 8)" },
    { "@type": "Occupation", name: "AI Engineer" },
  ],
  founder: undefined,
  worksFor: { "@id": `${BASE}/#organization` },
  knowsAbout: ["Arthritis", "Osteoarthritis", "Rheumatoid arthritis", "Musculoskeletal physiotherapy", "Exercise prescription", "Artificial intelligence"],
  memberOf: { "@type": "Organization", name: "Chartered Society of Physiotherapy" },
  sameAs: [] as string[],
} as Record<string, unknown>;
delete LOUIS_MAXWELL_PERSON.founder;

/** Founding relationship, attached to the charity node on the profile page. */
export const LIVING_WITH_ARTHRITIS_ORG = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "@id": `${BASE}/#organization`,
  name: "Living With Arthritis",
  url: BASE,
  identifier: { "@type": "PropertyValue", propertyID: "Charity Commission for England and Wales", value: "1218461" },
  founder: { "@id": LOUIS_MAXWELL_ID },
};

/** Compact reference for author / reviewedBy in guide schema. */
export const LOUIS_MAXWELL_REF = {
  "@type": "Person",
  "@id": LOUIS_MAXWELL_ID,
  name: "Louis Maxwell",
  url: LOUIS_MAXWELL_PROFILE_URL,
  jobTitle: "Band 8 Advanced Practice Physiotherapist",
  identifier: "HCPC PH128483",
} as const;

export function isLouisMaxwell(name?: string | null, identifier?: string | null): boolean {
  return /maxwell/i.test(name ?? "") || /PH128483/.test(identifier ?? "");
}
