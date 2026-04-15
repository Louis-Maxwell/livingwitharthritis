import { memo } from "react";

const SkeletonSection = memo(() => (
  <div className="py-20 space-y-4 max-w-3xl mx-auto px-4" aria-hidden="true" role="presentation">
    <div className="h-6 w-48 bg-muted rounded animate-pulse mx-auto" />
    <div className="h-10 w-96 bg-muted rounded animate-pulse mx-auto" />
    <div className="h-4 w-full bg-muted rounded animate-pulse" />
    <div className="h-4 w-3/4 bg-muted rounded animate-pulse mx-auto" />
  </div>
));

SkeletonSection.displayName = "SkeletonSection";
export default SkeletonSection;
