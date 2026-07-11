import { lazy, Suspense, useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import PageHero from "@/components/ui/PageHero";
import { Newspaper } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Footer = lazy(() => import("@/components/Footer"));

/**
 * Press & Updates page.
 *
 * HONEST NOTE: this ships with an empty state, not fabricated news items.
 * A charity page full of invented press mentions would be actively
 * damaging if a funder or journalist checked it. The `updates` array
 * below is intentionally empty — add real entries as they happen.
 *
 * Register at /press or /updates in App.tsx once you have at least one
 * real entry to publish. An empty updates page live on the site reads
 * worse than no page at all — build the array up first, THEN route it.
 */

interface UpdateEntry {
  date: string; // "2026-08-01"
  title: string;
  summary: string;
  link?: string;
}

// Add real entries here as they happen. Do not fill with placeholder content.
const updates: UpdateEntry[] = [];

const PressMedia = () => (
  <>
    <Helmet>
      <title>Press &amp; Updates | Living With Arthritis UK</title>
      <meta name="description" content="News, partnerships and updates from Living With Arthritis UK, registered charity 1218461." />
      <link rel="canonical" href="https://livingwitharthritis.org.uk/press" />
      <meta name="robots" content="index, follow" />
    </Helmet>
    <div className="min-h-screen bg-background">
      <Header />
      <PageHero
        gradient="from-muted/30 via-background to-muted/10"
        pattern="grid"
        badge={
          <Badge className="bg-muted text-muted-foreground border-0 text-xs font-bold px-3 py-1.5">
            <Newspaper className="w-3 h-3 mr-1.5" /> Charity 1218461
          </Badge>
        }
        title="Press &amp; Updates"
        subtitle="What we're working on, and who we're working with."
      />
      <main className="w-full px-6 md:px-10 lg:px-20 py-10 md:py-16 max-w-4xl mx-auto">
        {updates.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border rounded-xl">
            <p className="text-foreground/70 text-lg">
              We're just getting started — check back soon for updates on our work and partnerships.
            </p>
            <p className="text-sm text-foreground/50 mt-3">
              Press enquiries: <a href="mailto:info@livingwitharthritis.org.uk" className="text-primary hover:underline">info@livingwitharthritis.org.uk</a>
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {updates.map((u, i) => (
              <article key={i} className="border-b border-border pb-8">
                <time className="text-sm text-foreground/50">{u.date}</time>
                <h2 className="text-xl font-bold mt-1 mb-2">{u.title}</h2>
                <p className="text-foreground/70">{u.summary}</p>
                {u.link && (
                  <a href={u.link} className="text-primary hover:underline text-sm mt-2 inline-block">
                    Read more →
                  </a>
                )}
              </article>
            ))}
          </div>
        )}
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  </>
);

export default PressMedia;
