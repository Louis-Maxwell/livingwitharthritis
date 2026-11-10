import { Link } from "react-router-dom";
import { FileText, Printer } from "lucide-react";
import EmailSignupForm from "@/components/EmailSignupForm";

interface ResourceDownloadCardProps {
  title: string;
  description: string;
  /** EmailSignupForm `sequence` — recorded as the signup source. */
  sequence: string;
  /** Existing on-site resource (route or /public file). */
  link?: { href: string; label: string };
  /** Offer the browser's print / save-as-PDF for this page. */
  printable?: boolean;
}

/**
 * Keep-this-guide card. It only links resources that already exist on the
 * site and reuses the existing EmailSignupForm (FormSubmit to the charity
 * inbox, no website database). It never promises an emailed PDF.
 */
export default function ResourceDownloadCard({
  title,
  description,
  sequence,
  link,
  printable = false,
}: ResourceDownloadCardProps) {
  const isFile = link ? /\.[a-z0-9]{2,4}$/i.test(link.href) : false;
  const buttonClass =
    "inline-flex min-h-11 items-center gap-2 rounded-full border border-primary/40 bg-background px-5 text-sm font-semibold text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

  return (
    <aside
      aria-labelledby={`resource-card-${sequence}`}
      className="not-prose my-8 rounded-2xl border-2 border-primary/20 bg-card p-5 sm:p-6 shadow-sm print:hidden"
      data-testid="resource-download-card"
    >
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary" aria-hidden="true">
          <FileText className="h-5 w-5" />
        </span>
        <div>
          <p id={`resource-card-${sequence}`} className="m-0 text-base font-semibold text-foreground">
            {title}
          </p>
          <p className="m-0 mt-1 text-sm text-foreground/80">{description}</p>
        </div>
      </div>

      {(link || printable) && (
        <div className="mt-4 flex flex-wrap gap-3">
          {link &&
            (isFile ? (
              <a href={link.href} className={buttonClass} download>
                <FileText className="h-4 w-4" aria-hidden="true" />
                {link.label}
              </a>
            ) : (
              <Link to={link.href} className={buttonClass}>
                <FileText className="h-4 w-4" aria-hidden="true" />
                {link.label}
              </Link>
            ))}
          {printable && (
            <button type="button" onClick={() => window.print()} className={buttonClass}>
              <Printer className="h-4 w-4" aria-hidden="true" />
              Print or save this guide
            </button>
          )}
        </div>
      )}

      <EmailSignupForm
        className="mt-5"
        label="Free practical guides by email"
        buttonText="Send me free guides"
        sequence={sequence}
      />
    </aside>
  );
}
