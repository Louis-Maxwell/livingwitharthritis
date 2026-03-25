import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-border/30 bg-card p-6 space-y-4 animate-fade-in">
      <div className="skeleton-premium h-40 w-full rounded-xl" />
      <div className="skeleton-premium h-5 w-3/4 rounded-lg" />
      <div className="skeleton-premium h-4 w-full rounded-lg" />
      <div className="skeleton-premium h-4 w-2/3 rounded-lg" />
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3 animate-fade-in">
      <div className="flex gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="skeleton-premium h-4 flex-1 rounded-lg" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4" style={{ animationDelay: `${i * 60}ms` }}>
          {[1, 2, 3, 4].map((j) => (
            <div key={j} className="skeleton-premium h-10 flex-1 rounded-lg" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="rounded-2xl border border-border/30 bg-card p-6 space-y-3 animate-fade-in"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div className="flex justify-between">
            <div className="skeleton-premium h-4 w-24 rounded-lg" />
            <div className="skeleton-premium h-4 w-4 rounded-full" />
          </div>
          <div className="skeleton-premium h-8 w-20 rounded-lg" />
          <div className="skeleton-premium h-3 w-32 rounded-lg" />
        </div>
      ))}
    </div>
  );
}

/* Hero skeleton for full-page loading */
export function SkeletonHero() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 p-8 animate-fade-in">
      <div className="skeleton-premium h-5 w-48 rounded-full" />
      <div className="skeleton-premium h-14 w-[80%] max-w-xl rounded-2xl" />
      <div className="skeleton-premium h-6 w-[60%] max-w-md rounded-xl" />
      <div className="flex gap-4 mt-4">
        <div className="skeleton-premium h-14 w-48 rounded-full" />
        <div className="skeleton-premium h-14 w-40 rounded-full" />
      </div>
    </div>
  );
}
