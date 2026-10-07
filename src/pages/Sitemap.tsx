import { useId, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import pages from "@/data/public-page-index.generated.json";
export default function Sitemap() {
  const id = useId();
  const [filter, setFilter] = useState("");
  const groups = useMemo(() => {
    const matching = pages.filter(p => p.title.toLowerCase().includes(filter.toLowerCase()));
    const byLetter: Record<string, typeof pages> = {};
    for (const p of matching.sort((a,b) => a.title.localeCompare(b.title, "en"))) {
      const letter = p.title[0]?.toUpperCase() ?? "#";
      (byLetter[letter] ??= []).push(p);
    }
    return byLetter;
  }, [filter]);
  return <><SeoHead title="Site Index: All Public Pages" description="Find Living With Arthritis conditions, guides, exercises, articles and resources in a searchable alphabetical index." path="/site-index" noindex />
    <Header /><main id="main-content" className="container mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">Site index</h1>
      <p className="mb-4">Browse our public pages, or <Link className="underline" to="/guides">explore guides by topic</Link>.</p>
      <label htmlFor={id} className="block font-semibold mb-2">Filter page titles</label>
      <input id={id} value={filter} onChange={e => setFilter(e.target.value)} type="search" className="border border-border rounded-lg min-h-11 px-3 w-full mb-6" />
      <p role="status" className="text-sm mb-4">{Object.values(groups).reduce((n, rows) => n + rows.length, 0)} pages</p>
      <nav aria-label="Alphabetical sections" className="flex flex-wrap gap-2 mb-6">{Object.keys(groups).sort().map(letter => <a key={letter} className="min-h-11 min-w-11 inline-flex items-center justify-center underline" href={`#index-${letter}`}>{letter}</a>)}</nav>
      {Object.entries(groups).sort(([a],[b]) => a.localeCompare(b)).map(([letter,rows]) => <section key={letter} id={`index-${letter}`} className="mb-8 scroll-mt-24">
        <h2 className="text-2xl font-bold mb-3">{letter}</h2><ul className="grid sm:grid-cols-2 gap-2">{rows.map(p => <li key={p.path}><Link className="inline-flex min-h-11 items-center underline underline-offset-4" to={p.path}>{p.title}</Link></li>)}</ul>
      </section>)}
      <a href="/sitemap-index.xml" className="underline">XML sitemap index</a>
    </main><Footer /></>;
}
