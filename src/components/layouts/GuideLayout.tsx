import { lazy, Suspense, type ReactNode } from "react";
import Header from "@/components/Header";
import GuideOnwardJourney from "@/components/guides/GuideOnwardJourney";
import MedicalDisclaimerStrip from "@/components/MedicalDisclaimerStrip";

// Lazy Footer, matching Index.tsx, keeps the entry chunk small.
const Footer = lazy(() => import("@/components/Footer"));

interface GuideLayoutProps {
  children: ReactNode;
  currentPath: string;
}

/**
 * Shared chrome for /guides/* pages: Header, medical disclaimer strip,
 * main content, onward-journey blocks, and Footer.
 */
export default function GuideLayout({ children, currentPath }: GuideLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <div className="container mx-auto px-6 md:px-10 pt-4 max-w-5xl">
        <MedicalDisclaimerStrip variant="short" />
      </div>
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
