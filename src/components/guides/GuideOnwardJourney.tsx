import { lazy, Suspense } from "react";
import RelatedGuidesBlock from "./RelatedGuidesBlock";

const NextReadStrip = lazy(() => import("@/components/NextReadStrip"));

interface GuideOnwardJourneyProps {
  currentPath: string;
}

/**
 * Bottom-of-page onward navigation for every /guides page:
 *  1) Related guides — peer pillars in the same cluster
 *  2) Next read — curated mixed content
 *
 * Render directly before <Footer /> on standalone guide pages,
 * or rely on GuideLayout which composes this automatically.
 */
export default function GuideOnwardJourney({ currentPath }: GuideOnwardJourneyProps) {
  return (
    <>
      <RelatedGuidesBlock currentPath={currentPath} />
      <Suspense fallback={null}>
        <NextReadStrip currentPath={currentPath} heading="Next read" />
      </Suspense>
    </>
  );
}
