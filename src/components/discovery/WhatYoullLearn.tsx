import { useEffect, useMemo, useState } from "react";
import { extractLearnItems } from "@/lib/articleDiscovery";

/**
 * First-screen "What you'll learn" box. Built only from the article's own
 * section headings, so it adds no new medical claims.
 */
export default function WhatYoullLearn({ html, minutes }: { html: string; minutes?: number }) {
  // Mount after the article's first commit so it never adds to hydration work.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(() => setReady(true), { timeout: 1500 });
    else setTimeout(() => setReady(true), 200);
  }, []);
  const items = useMemo(() => (ready ? extractLearnItems(html) : []), [html, ready]);
  if (items.length < 2) return null;
  return (
    <nav aria-labelledby="wyl-heading" className="not-prose mb-6 rounded-2xl border border-border/60 bg-muted/30 p-4 sm:p-5 print:hidden">
      <h2 id="wyl-heading" className="text-base font-bold text-foreground">
        What you&rsquo;ll learn{minutes ? <span className="font-normal text-muted-foreground"> &middot; {minutes} min read</span> : null}
      </h2>
      <ul className="mt-2 space-y-1 text-[0.95rem]">
        {items.map((it) => (
          <li key={it.id} className="flex gap-2">
            <span aria-hidden="true" className="text-primary">&#10003;</span>
            <a href={`#${it.id}`} className="text-foreground/90 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">
              {it.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
