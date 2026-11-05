import { Link } from "react-router-dom";
import GuideCards from "@/components/blog/GuideCards";
import { latestGuides, mostHelpfulGuides } from "@/lib/blog/guideLinks";

/** Homepage: latest + most helpful guides (lazy-loaded chunk). */
export default function HomeGuidesShowcase() {
  return (
    <section aria-labelledby="home-guides-heading" className="container mx-auto px-4 py-10">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
        <h2 id="home-guides-heading" className="font-display text-2xl md:text-3xl font-bold text-foreground">Latest guides</h2>
        <Link to="/blog/archive" className="text-primary font-semibold underline underline-offset-2">See all guides</Link>
      </div>
      <GuideCards guides={latestGuides(4)} />
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4">Most helpful guides</h2>
      <GuideCards guides={mostHelpfulGuides(4)} />
    </section>
  );
}
