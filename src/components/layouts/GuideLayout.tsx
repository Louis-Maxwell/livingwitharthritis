import { lazy, Suspense, type ReactNode } from "react";
import Header from "@/components/Header";
import GuideOnwardJourney from "@/components/guides/GuideOnwardJourney";

// Lazy, matching the same pattern already used for Footer in Index.tsx.
// GuideLayout is itself eagerly imported by App.tsx (alongside Index, to
// avoid a Suspense round-trip on first paint for /guides/* pages), so an
// eager Footer import here gave the Supabase client (which Footer reaches
// via FooterMostRead) a genuine synchronous path into the main entry
// bundle — confirmed via a real build: removing Supabase's manual chunk
// assignment without this fix inlined all 212 KB of it directly into the
// render-blocking entry chunk (230 KB -> 441 KB) instead of splitting it
// out. Lazy-loading Footer here removes that path entirely.
const Footer = lazy(() => import("@/components/Footer"));

interface GuideLayoutProps {
  children: ReactNode;
  currentPath: string;
}

/**
 * Shared chrome for /guides/* pages: Header, main content,
 * onward-journey blocks (Related guides + Next read), and Footer.
 * Standalone guide pages that already render their own
 * Header/Footer should import GuideOnwardJourney directly
 * instead of using this wrapper.
 */
export default function GuideLayout({ children, currentPath }: GuideLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <GuideOnwardJourney currentPath={currentPath} />
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
