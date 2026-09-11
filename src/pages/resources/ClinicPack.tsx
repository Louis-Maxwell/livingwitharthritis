import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import { CHARITY } from "@/config/charity";
import { CONTACT_EMAILS, CONTACT_PHONE } from "@/config/contact";

const PATH = "/resources/clinic-pack";

const QR_LINKS = [
  {
    label: "Exercises hub",
    path: "/exercises",
    utm: "utm_source=clinic-pack&utm_medium=qr&utm_campaign=hcp-month1&utm_content=exercises",
  },
  {
    label: "Flare-ups guide",
    path: "/arthritis-flare-ups",
    utm: "utm_source=clinic-pack&utm_medium=qr&utm_campaign=hcp-month1&utm_content=flare",
  },
  {
    label: "PIP & benefits",
    path: "/guides/benefits-pip",
    utm: "utm_source=clinic-pack&utm_medium=qr&utm_campaign=hcp-month1&utm_content=pip",
  },
  {
    label: "Newly diagnosed",
    path: "/guides/newly-diagnosed",
    utm: "utm_source=clinic-pack&utm_medium=qr&utm_campaign=hcp-month1&utm_content=newly-diagnosed",
  },
];

/**
 * HCP / clinic waiting-room one-pager. No postal address.
 */
export default function ClinicPack() {
  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="Clinic pack for HCPs (waiting-room one-pager)"
        description="Free printable clinic pack from Living With Arthritis UK: waiting-room QR links to exercises, flares, PIP and newly diagnosed guides. Charity 1218461."
        path={PATH}
      />
      <Header />
      <main id="main-content" className="container mx-auto max-w-3xl px-6 py-12 md:px-10 md:py-16">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Resources · HCP clinic pack
          </p>
          <button
            type="button"
            onClick={() => window.print()}
            className="min-h-11 rounded-full border border-border bg-background px-5 text-sm font-semibold hover:border-primary/40"
          >
            Print one-pager
          </button>
        </div>

        <article className="rounded-2xl border border-border bg-card p-6 md:p-10 print:border-0 print:p-0">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
            For clinics · Waiting room
          </p>
          <h1 className="font-display mt-2 text-3xl font-extrabold text-foreground md:text-4xl">
            Living With Arthritis UK — free patient resources
          </h1>
          <p className="mt-3 text-base leading-relaxed text-foreground/85">
            Practical, plain-English UK guides for people living with arthritis. Educational only —
            not a substitute for clinical care. Independent charity (CIO {CHARITY.number}).
          </p>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {QR_LINKS.map((item) => {
              const url = `https://livingwitharthritis.org.uk${item.path}?${item.utm}`;
              return (
                <li
                  key={item.path}
                  className="rounded-xl border border-border/60 bg-background p-4 print:break-inside-avoid"
                >
                  <p className="font-semibold text-foreground">{item.label}</p>
                  <p className="mt-1 break-all text-xs text-muted-foreground">{url}</p>
                  <Link
                    to={`${item.path}?${item.utm}`}
                    className="mt-2 inline-block text-sm font-medium text-primary underline underline-offset-2 print:hidden"
                  >
                    Open page
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 border-t border-border pt-6 text-sm text-foreground/85">
            <p className="font-semibold">{CHARITY.shortName}</p>
            <p>Registered charity in England &amp; Wales No. {CHARITY.number}</p>
            <p>
              Phone {CONTACT_PHONE} · Email {CONTACT_EMAILS.info}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              No postal address on this sheet — contact us online or by phone.
              Clinicians: please share only with patient consent and local information-governance rules.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
