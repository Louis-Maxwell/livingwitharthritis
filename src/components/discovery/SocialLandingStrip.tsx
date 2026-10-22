import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSessionReferral } from "@/lib/discoveryTracking";
import { getDiscoveryItem, POPULAR_SLUGS, type DiscoveryItem } from "@/lib/articleDiscovery";


const LABEL: Record<string, string> = { facebook: "Facebook", linkedin: "LinkedIn", instagram: "Instagram", x: "X", youtube: "YouTube", threads: "Threads" };

/**
 * Compact, inline "Popular guides" strip for visitors arriving from social media.
 * Not a popup: it sits in the page flow, client-only, and can be dismissed.
 */
export default function SocialLandingStrip({ currentSlug }: { currentSlug?: string }) {
  const [source, setSource] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const ref = getSessionReferral();
    if (ref) setSource(ref.source);
  }, []);
  if (!source || hidden) return null;
  const items = POPULAR_SLUGS.filter((s) => s !== currentSlug)
    .map(getDiscoveryItem)
    .filter((x): x is DiscoveryItem => !!x)
    .slice(0, 4);
  if (!items.length) return null;
  return (
    <aside aria-labelledby="popular-strip-heading" data-track="popular" data-track-placement={`social_strip_${source}`} className="not-prose mb-6 rounded-2xl border border-primary/20 bg-primary/[0.04] p-4 print:hidden">
      <div className="flex items-start justify-between gap-3">
        <h2 id="popular-strip-heading" className="text-sm font-bold text-foreground">
          Welcome{LABEL[source] ? ` from ${LABEL[source]}` : ""}. Popular guides readers find useful:
        </h2>
        <button type="button" onClick={() => setHidden(true)} className="min-h-[44px] min-w-[44px] -mt-3 -mr-2 text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded" aria-label="Hide popular guides">
          &times;
        </button>
      </div>
      <ul className="mt-1 flex flex-wrap gap-2">
        {items.map((it) => (
          <li key={it.slug}>
            <Link to={`/blog/${it.slug}`} className="inline-flex min-h-[44px] items-center rounded-full border border-border/70 bg-background px-3 text-sm hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {it.title}
            </Link>
          </li>
        ))}
        <li>
          <Link to="/blog" className="inline-flex min-h-[44px] items-center rounded-full px-3 text-sm font-semibold text-primary underline-offset-2 hover:underline">
            Browse all guides
          </Link>
        </li>
      </ul>
    </aside>
  );
}
