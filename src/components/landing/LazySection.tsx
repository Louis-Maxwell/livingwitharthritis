import { Component, ReactNode, Suspense } from "react";
import SkeletonSection from "@/components/landing/SkeletonSection";

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  name?: string;
}

interface BoundaryState {
  hasError: boolean;
}

class SectionErrorBoundary extends Component<
  { children: ReactNode; name?: string },
  BoundaryState
> {
  state: BoundaryState = { hasError: false };

  static getDerivedStateFromError(): BoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
     
    console.error(`[LazySection${this.props.name ? `:${this.props.name}` : ""}] failed`, error);
  }

  reset = () => this.setState({ hasError: false });

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="mx-auto my-8 max-w-2xl rounded-2xl border border-border bg-card p-6 text-center shadow-sm"
        >
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            This section couldn't load
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Something went wrong loading this part of the page. The rest of the page is fine.
          </p>
          <button
            onClick={this.reset}
            className="rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function LazySection({
  children,
  fallback,
  name,
}: LazySectionProps) {
  return (
    <SectionErrorBoundary name={name}>
      <Suspense fallback={fallback === undefined ? <SkeletonSection /> : fallback}>
        {children}
      </Suspense>
    </SectionErrorBoundary>
  );
}
