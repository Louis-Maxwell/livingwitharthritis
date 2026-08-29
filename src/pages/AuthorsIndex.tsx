import { Link } from 'react-router-dom';
import { ShieldCheck, ChevronRight } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import authors from '@/data/medical-authors.json';

const BASE = 'https://livingwitharthritis.org.uk';

interface AuthorRecord {
  slug: string;
  kind: 'author' | 'reviewer';
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

interface AuthorsIndexProps {
  /** Which index this renders: the writers list or the clinical reviewers list. */
  variant: 'author' | 'reviewer';
}

const isPlaceholder = (value: string) => value.includes('[PLACEHOLDER');

/**
 * Renders /authors and /reviewers as real, named index pages.
 *
 * These URLs previously fell through to the SPA shell (a soft 404 with
 * index,follow), which damages E-E-A-T signals for AI citation. Each entry
 * links to its full bio page and is expressed in ItemList + Person JSON-LD.
 */
export default function AuthorsIndex({ variant }: AuthorsIndexProps) {
  const allRecords = Object.values(authors as Record<string, AuthorRecord>);
  // Maxwell writes and clinically reviews, so an HCPC-registered author also
  // appears on the reviewers index. No one is invented for either list.
  const records = allRecords.filter((record) =>
    variant === 'reviewer'
      ? record.kind === 'reviewer' || /HCPC|GMC|NMC/i.test(record.credential)
      : record.kind === 'author',
  );

  const prefix = variant === 'reviewer' ? 'reviewers' : 'authors';
  const heading =
    variant === 'reviewer'
      ? 'Our medical reviewers'
      : 'Our authors and editorial team';
  const title =
    variant === 'reviewer'
      ? 'Medical reviewers | Living With Arthritis UK'
      : 'Authors and editorial team | Living With Arthritis UK';
  const description =
    variant === 'reviewer'
      ? 'The registered clinicians who review Living With Arthritis UK content, including Louis Maxwell, First Contact Practitioner (HCPC PH128483).'
      : 'The people who write Living With Arthritis UK guides, led by Louis Maxwell, First Contact Practitioner (HCPC PH128483).';

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: heading,
    url: `${BASE}/${prefix}`,
    inLanguage: 'en-GB',
    itemListElement: records.map((record, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Person',
        name: record.name,
        jobTitle: record.title,
        url: `${BASE}/${prefix}/${record.slug}`,
        ...(isPlaceholder(record.credential)
          ? {}
          : { identifier: record.credential }),
      },
    })),
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SeoHead title={title} includeSiteName={false} description={description} path={`/${prefix}`} />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <Header />
      <main id="main-content" role="main" tabIndex={-1} className="flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{heading}</h1>
          <p className="text-lg text-foreground/80 mb-10">{description}</p>

          <ul className="space-y-6">
            {records.map((record) => (
              <li key={record.slug}>
                <Link
                  to={`/${prefix}/${record.slug}`}
                  className="block rounded-2xl bg-muted/40 p-6 transition-colors hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-primary" aria-hidden="true" />
                    </span>
                    <h2 className="text-xl font-bold">{record.name}</h2>
                  </div>
                  <p className="text-sm font-semibold text-foreground/80 mb-2">
                    {record.title}
                    {!isPlaceholder(record.credential) && <> · {record.credential}</>}
                  </p>
                  {!isPlaceholder(record.bio) && (
                    <p className="text-base leading-relaxed text-foreground/80">
                      {record.bio}
                    </p>
                  )}
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Read full bio <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-sm text-muted-foreground">
            How we research, write and review our guides:{' '}
            <Link to="/editorial-standards" className="text-primary font-semibold hover:underline">
              editorial standards
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
