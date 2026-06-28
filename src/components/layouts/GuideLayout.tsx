import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GuideOnwardJourney from "@/components/guides/GuideOnwardJourney";

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
      <Footer />
    </div>
  );
}
