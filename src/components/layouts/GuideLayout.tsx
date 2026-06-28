import { lazy, Suspense, type ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NextReadStrip = lazy(() => import("@/components/NextReadStrip"));

/**
 * Shared chrome for /guides/* pages. Adds Header, Footer and a
 * "Next read" strip — previously these long-form pillar pages
 * shipped with no global navigation, which crushed pages/session.
 */
interface GuideLayoutProps {
  children: ReactNode;
  currentPath: string;
}

export default function GuideLayout({ children, currentPath }: GuideLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Suspense fallback={null}>
        <NextReadStrip currentPath={currentPath} heading="Keep exploring" />
      </Suspense>
      <Footer />
    </div>
  );
}
