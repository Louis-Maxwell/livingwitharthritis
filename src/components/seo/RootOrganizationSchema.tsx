import { useEffect } from "react";
import { ORGANIZATION_PAYLOAD, WEBSITE_PAYLOAD } from "@/lib/rootOrganizationSchema";

/**
 * Sitewide NGO + MedicalOrganization + WebSite JSON-LD.
 * Strengthens entity disambiguation for LLMs and search engines.
 * Mounted once at root via App.tsx. Injected via useEffect (per project
 * memory — never via Helmet). Static copies with the same script ids live
 * in index.html for non-JS crawlers; this component refreshes those nodes
 * instead of emitting a second Organization / WebSite block.
 */
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
