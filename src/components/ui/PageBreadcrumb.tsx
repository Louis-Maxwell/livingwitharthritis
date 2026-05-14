import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

export interface BreadcrumbSegment {
  label: string;
  href?: string;
}

interface PageBreadcrumbProps {
  segments: BreadcrumbSegment[];
  className?: string;
}

const SITE_URL = "https://livingwitharthritis.org.uk";

const PageBreadcrumb = ({ segments, className = "" }: PageBreadcrumbProps) => {
  // Inject BreadcrumbList JSON-LD for SEO. Manual injection avoids Helmet
  // race conditions on route changes.
  useEffect(() => {
    const items = [
      { name: "Home", item: `${SITE_URL}/` },
      ...segments.map((s, i) => ({
        name: s.label,
        item: s.href
          ? `${SITE_URL}${s.href.startsWith("/") ? s.href : `/${s.href}`}`
          : `${SITE_URL}${typeof window !== "undefined" ? window.location.pathname : ""}`,
        last: i === segments.length - 1,
      })),
    ];

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((it, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: it.name,
        item: it.item,
      })),
    };

    const id = "breadcrumb-jsonld";
    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = id;
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);

    return () => {
      const existing = document.getElementById(id);
      if (existing) existing.remove();
    };
  }, [segments]);

  return (
    <div className={`container mx-auto px-6 md:px-10 pt-4 pb-2 ${className}`}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Home"
              >
                <Home className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="sr-only sm:not-sr-only">Home</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {segments.map((segment, i) => (
            <Fragment key={i}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {segment.href ? (
                  <BreadcrumbLink asChild>
                    <Link
                      to={segment.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {segment.label}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{segment.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default PageBreadcrumb;
