import { useLocation } from "react-router-dom";
import GuideCards from "@/components/blog/GuideCards";
import { relatedGuidesForPath } from "@/lib/blog/guideLinks";

/** "Related guides" for every non-blog page; rendered lazily from the footer. */
export default function RelatedGuidesBlock() {
  const { pathname } = useLocation();
  if (pathname === "/" || pathname.startsWith("/blog")) return null;
  const guides = relatedGuidesForPath(pathname, 4);
  if (!guides.length) return null;
  return (
    <section aria-labelledby="related-guides-heading" className="container mx-auto px-4 py-10 print:hidden">
      <h2 id="related-guides-heading" className="font-display text-2xl font-bold text-foreground mb-4">Related guides</h2>
      <GuideCards guides={guides} />
    </section>
  );
}
