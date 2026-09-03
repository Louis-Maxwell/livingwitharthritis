import { Link } from "react-router-dom";
import SeoHead from "@/components/SeoHead";
import { CONTACT_EMAILS } from "@/config/contact";

export default function AdminPaused() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 p-4">
      <SeoHead
        title="Admin is paused"
        description="Member login and the admin tools are paused while Living With Arthritis UK runs as a static site."
        path="/admin"
        noindex
      />
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-8 shadow-sm text-center space-y-4">
        <p className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">
          Living With Arthritis UK
        </p>
        <h1 className="text-2xl font-bold text-foreground">
          Admin is paused until we add the backend back
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Sign-in, the CMS and the admin dashboards are not available on this
          static site. Public pages, guides and donations still work. If you
          need help, email{" "}
          <a
            className="text-primary underline underline-offset-2"
            href={`mailto:${CONTACT_EMAILS.info}`}
          >
            {CONTACT_EMAILS.info}
          </a>
          .
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Back to the homepage
        </Link>
      </div>
    </div>
  );
}
