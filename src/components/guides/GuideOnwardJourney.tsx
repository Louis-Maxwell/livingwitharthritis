import { lazyWithRetry } from "@/lib/chunkRecovery";
import { Suspense } from "react";
import RelatedGuidesBlock from "./RelatedGuidesBlock";
import RecommendedNextStep from "@/components/RecommendedNextStep";

const NextReadStrip = lazyWithRetry(() => import("@/components/NextReadStrip"));

interface GuideOnwardJourneyProps {
  currentPath: string;
}

/**
 * Bottom-of-page onward navigation for every /guides page:
 *  0) Recommended next step — 1–2 hand-picked onward links (prerendered)
 *  1) Related guides — peer pillars in the same cluster
 *  2) Next read — curated mixed content
 *
 * Render directly before <Footer /> on standalone guide pages,
 * or rely on GuideLayout which composes this automatically.
 */
export default function GuideOnwardJourney({ currentPath }: GuideOnwardJourneyProps) {
  return (
    <>
      <div className="container mx-auto px-5 md:px-10 max-w-3xl">
        <RecommendedNextStep path={currentPath} placement="end" />
      </div>
      <RelatedGuidesBlock currentPath={currentPath} />
      <Suspense fallback={null}>
        <NextReadStrip currentPath={currentPath} heading="Next read" />
      </Suspense>
    </>
  );
}
