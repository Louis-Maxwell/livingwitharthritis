import { lazyWithRetry } from "@/lib/chunkRecovery";
import { Suspense, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import PageHero from "@/components/ui/PageHero";
import { CHARITY } from "@/config/charity";

const Footer = lazyWithRetry(() => import("@/components/Footer"));

export default function GovernancePolicyPage(props: {
  path: string;
  title: string;
  heading: string;
  subtitle: string;
  description: string;
  children: ReactNode;
}) {
  const url = `${CHARITY.siteUrl}${props.path}`;
  return (
    <>
      <Helmet>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={props.title} />
        <meta property="og:description" content={props.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:locale" content="en_GB" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${url}#webpage`,
          url,
          name: props.heading,
          description: props.description,
          inLanguage: "en-GB",
          publisher: { "@id": `${CHARITY.siteUrl}/#organization` },
        })}</script>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <PageHero gradient="from-muted/30 via-background to-muted/10" pattern="grid" title={props.heading} subtitle={props.subtitle} />
        <main id="main-content" className="w-full px-6 md:px-10 lg:px-20 py-10 md:py-16 max-w-3xl mx-auto space-y-8 text-foreground/85 leading-relaxed [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_a]:text-primary [&_a]:underline">
          {props.children}
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
}
