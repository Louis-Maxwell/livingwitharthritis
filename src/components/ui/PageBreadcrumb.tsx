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

const PageBreadcrumb = ({ segments, className = "" }: PageBreadcrumbProps) => (
  <div className={`container mx-auto px-6 md:px-10 pt-4 pb-2 ${className}`}>
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
              <Home className="w-3.5 h-3.5" />
              <span className="sr-only sm:not-sr-only">Home</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {segments.map((segment, i) => (
          <span key={i} className="contents">
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {segment.href ? (
                <BreadcrumbLink asChild>
                  <Link to={segment.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {segment.label}
                  </Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{segment.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </span>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  </div>
);

export default PageBreadcrumb;
