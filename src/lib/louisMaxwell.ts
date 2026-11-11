/**
 * Single source of truth for Louis Maxwell's Person schema.
 * Keep this limited to identity facts verified for public use.
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
  jobTitle: ["First Contact Physiotherapist", "Operations Director, Living With Arthritis"],
  identifier: HCPC,
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "Professional registration",
    name: "HCPC registered physiotherapist (PH128483)",
    recognizedBy: {
      "@type": "Organization",
      name: "Health and Care Professions Council",
      url: "https://www.hcpc-uk.org",
    },
  },
  hasOccupation: {
    "@type": "Occupation",
    name: "First Contact Physiotherapist",
  },
  worksFor: { "@id": `${BASE}/#organization` },
  knowsAbout: [
    "Arthritis",
    "Osteoarthritis",
    "Rheumatoid arthritis",
    "Musculoskeletal physiotherapy",
    "Exercise therapy",
  ],
  sameAs: [] as string[],
} as Record<string, unknown>;

/** Charity node attached on the profile page. Founder is David Williams (no invented credentials). */
export const LIVING_WITH_ARTHRITIS_ORG = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "@id": `${BASE}/#organization`,
  name: "Living With Arthritis",
  url: BASE,
  identifier: {
    "@type": "PropertyValue",
    propertyID: "Charity Commission for England and Wales",
    value: "1218461",
  },
  founder: {
    "@type": "Person",
    name: "David Williams",
  },
  employee: { "@id": LOUIS_MAXWELL_ID },
};

/** Compact reference for author / reviewedBy in guide schema. */
export const LOUIS_MAXWELL_REF = {
  "@type": "Person",
  "@id": LOUIS_MAXWELL_ID,
  name: "Louis Maxwell",
  url: LOUIS_MAXWELL_PROFILE_URL,
  jobTitle: "First Contact Physiotherapist",
  identifier: "HCPC PH128483",
} as const;

export function isLouisMaxwell(name?: string | null, identifier?: string | null): boolean {
  return /maxwell/i.test(name ?? "") || /PH128483/.test(identifier ?? "");
}
