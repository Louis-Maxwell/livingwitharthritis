import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import authors from "@/data/medical-authors.json";
import NotFound from "@/pages/NotFound";

const BASE = "https://livingwitharthritis.org.uk";

interface AuthorRecord {
  slug: string;
  kind: "author" | "reviewer";
  name: string;
  title: string;
  credential: string;
  organization: string;
  specialties: string[];
  bio: string;
  credentials: string[];
  image: string | null;
  sameAs: string[];
}

type AuthorsMap = Record<string, AuthorRecord>;

interface AuthorProfileProps {
  /** Which URL prefix this component is rendering under — controls canonical + heading label. */
  variant: "author" | "reviewer";
}

/**
 * Renders /authors/:slug and /reviewers/:slug bio pages.
 *
 * Content comes from src/data/medical-authors.json. Placeholder fields
 * (marked [PLACEHOLDER - ...]) are rendered visibly so unfinished bios are
 * obvious in QA, and are NOT emitted into the Person JSON-LD.
 */
export default function AuthorProfile({ variant }: AuthorProfileProps) {
  const { slug = "" } = useParams<{ slug: string }>();
  const record = (authors as AuthorsMap)[slug];

  // Unknown slug: render the real 404 page (noindex) instead of redirecting
  // to a 200 page — soft 404s on author URLs damage E-E-A-T signals.
  if (!record) return <NotFound />;

  const prefix = variant === "reviewer" ? "reviewers" : "authors";
  const url = `${BASE}/${prefix}/${slug}`;
  const isPlaceholder = (v: string) => v.includes("[PLACEHOLDER");

  // Real (non-placeholder) credential strings only, for JSON-LD.
  const realCredentials = record.credentials.filter((c) => !isPlaceholder(c));
  const realCredential = isPlaceholder(record.credential) ? undefined : record.credential;
  const realOrg = isPlaceholder(record.organization) ? undefined : record.organization;

  const personLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: record.name,
    jobTitle: record.title,
    url,
    mainEntityOfPage: url,
    description: isPlaceholder(record.bio) ? undefined : record.bio,
    knowsAbout: record.specialties,
    // NOTE: sameAs is intentionally an empty array until the client
    // provides verified profile URLs (LinkedIn, HCPC register listing,
    // GMC listing, ORCID). Do NOT fabricate.
    sameAs: record.sameAs,
  };
  if (realCredential) personLd.identifier = realCredential;
  if (realCredentials.length) personLd.hasCredential = realCredentials;
  if (realOrg) {
    personLd.affiliation = {
      "@type": "Organization",
      name: realOrg,
    };
  }
  // Strip undefined keys
  Object.keys(personLd).forEach((k) => personLd[k] === undefined && delete personLd[k]);

  const badgeLabel = variant === "reviewer" ? "Medical reviewer" : "Author";
  const title = `${record.name} — ${record.title} | Living With Arthritis UK`;
  const description = isPlaceholder(record.bio)
    ? `${record.name}, ${record.title}. ${badgeLabel} on Living With Arthritis UK.`
    : record.bio.slice(0, 155);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="profile" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          url,
          mainEntity: personLd,
          dateModified: new Date().toISOString().slice(0, 10),
          inLanguage: "en-GB",
        })}</script>
        <script type="application/ld+json">{JSON.stringify(personLd)}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
            { "@type": "ListItem", position: 2, name: "Editorial standards", item: `${BASE}/editorial-standards` },
            { "@type": "ListItem", position: 3, name: record.name, item: url },
          ],
        })}</script>
      </Helmet>

      <Header />
      <main id="main-content" role="main" tabIndex={-1} className="bg-white">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            to="/editorial-standards"
            className="inline-flex items-center gap-1 text-sm text-primary font-semibold mb-6 hover:underline"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" /> Editorial standards
          </Link>

          <div className="flex items-center gap-3 mb-3">
            <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-primary" aria-hidden="true" />
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
              {badgeLabel}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-2">{record.name}</h1>
          <p className="text-lg text-foreground/80 mb-8">
            {record.title}
            {realOrg && <> · {realOrg}</>}
            {realCredential && <> · {realCredential}</>}
          </p>

          {record.image && (
            <div className="w-full max-w-xs aspect-[4/5] overflow-hidden rounded-2xl mb-8">
              <img
                src={record.image}
                alt={`Portrait of ${record.name}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          )}

          <section className="prose prose-slate max-w-none mb-10">
            <h2 className="text-xl font-bold mb-3">Biography</h2>
            <p className="text-base leading-relaxed whitespace-pre-line">{record.bio}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold mb-3">Credentials</h2>
            <ul className="space-y-2">
              {record.credentials.map((c) => (
                <li
                  key={c}
                  className={
                    isPlaceholder(c)
                      ? "text-sm italic text-muted-foreground"
                      : "text-sm text-foreground"
                  }
                >
                  {c}
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold mb-3">Specialist areas</h2>
            <ul className="flex flex-wrap gap-2">
              {record.specialties.map((s) => (
                <li
                  key={s}
                  className="px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-xs font-medium text-foreground"
                >
                  {s}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-border p-6 bg-secondary/40 mb-10">
            <h2 className="text-lg font-bold mb-2">How we review content</h2>
            <p className="text-sm text-muted-foreground">
              Every clinical article on Living With Arthritis is written or reviewed
              by a qualified UK healthcare professional and updated on a rolling
              schedule. Read the full{" "}
              <Link to="/editorial-standards" className="text-primary underline">
                editorial standards
              </Link>{" "}
              for the review process, correction policy and conflict-of-interest
              declarations.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
