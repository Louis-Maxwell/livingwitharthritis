import { Helmet } from "react-helmet-async";
import { CHARITY } from "@/config/charity";

/**
 * Trust, Governance & Clinical Review
 * ------------------------------------
 * Staged replacement candidate for /trust. All facts on this page are drawn
 * from `src/config/charity.ts` (single source of truth) so registration
 * details cannot drift between surfaces. Sub-sections that would require
 * information we cannot independently substantiate (Companies House details
 * for a CIO, individual clinician HCPC numbers, Gift Aid recognition, named
 * Fundraising Regulator registration, individual trustee names) are
 * intentionally omitted rather than shown as placeholders.
 */
const BASE = CHARITY.siteUrl;

export default function TrustCredibility() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${BASE}/trust-credibility#webpage`,
    url: `${BASE}/trust-credibility`,
    name: "Trust, Governance & Clinical Review",
    inLanguage: "en-GB",
    isPartOf: { "@id": `${BASE}/#website` },
    about: { "@id": `${BASE}/#organization` },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
        { "@type": "ListItem", position: 2, name: "Trust & Governance", item: `${BASE}/trust-credibility` },
      ],
    },
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Helmet>
        <title>Trust, Governance &amp; Clinical Review | Living With Arthritis UK</title>
        <meta
          name="description"
          content={`How ${CHARITY.shortName} is governed and clinically reviewed. Registered charity ${CHARITY.number}, our editorial policy, and how your donations are used.`}
        />
        <link rel="canonical" href={`${BASE}/trust-credibility`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
        <a href="/" className="hover:underline">Home</a> <span aria-hidden>›</span> Trust &amp; Governance
      </nav>

      <h1 className="mb-3 text-3xl font-bold tracking-tight">Trust, Governance &amp; Clinical Review</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Health information is only useful if you can trust where it comes from. This page explains
        who we are, how we are regulated, who reviews our content, and how donations are used — so
        you can rely on our guidance and give with confidence.
      </p>

      {/* Key takeaways — answer-first for AEO */}
      <section className="mb-10 rounded-lg border bg-muted/40 p-5">
        <h2 className="mb-3 text-lg font-semibold">Key takeaways</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm">
          <li>
            We are a <strong>registered charity in {CHARITY.jurisdiction}</strong> — Charity
            Commission number <strong>{CHARITY.number}</strong>.
          </li>
          <li>
            All health content is written in plain English and <strong>reviewed by HCPC-registered
            clinicians</strong>, with a &ldquo;Medically reviewed by&rdquo; line and review date
            on every clinical guide.
          </li>
          <li>
            Everything on this site is <strong>free at the point of use</strong>. There is no paywall
            and no sign-up wall.
          </li>
          <li>
            Donations are voluntary and fund content, exercise videos and accessibility work — never
            required to access help.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold">Our legal status</h2>
        <p className="mb-3">
          {CHARITY.legalName} is a <strong>{CHARITY.type}</strong> registered with the{" "}
          {CHARITY.regulator} under number <strong>{CHARITY.number}</strong>. As a CIO, we are a
          single legal entity regulated by the Charity Commission — there is no separate company
          filing at Companies House. You can verify our entry directly on the{" "}
          <a
            className="text-primary underline"
            href={CHARITY.registerUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Charity Commission register
          </a>.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold">How our health content is reviewed</h2>
        <p className="mb-3">
          Arthritis guidance sits in what search engines call &ldquo;Your Money or Your Life&rdquo;
          territory — content where accuracy matters for people&rsquo;s health. We take that seriously:
        </p>
        <ul className="mb-3 list-disc space-y-2 pl-5">
          <li>
            Every clinical guide is reviewed by an <strong>HCPC-registered chartered physiotherapist
            or First Contact Practitioner</strong> before publication.
          </li>
          <li>
            Each page shows a <strong>&ldquo;Medically reviewed by&rdquo;</strong> line, the
            reviewer&rsquo;s credentials and the <strong>last-reviewed date</strong>.
          </li>
          <li>
            We align with <strong>NICE guidance</strong> (e.g. NG226 for osteoarthritis) and cite
            primary sources — NHS, NICE, peer-reviewed research — rather than making unsupported
            claims.
          </li>
          <li>
            We never present our content as a substitute for personalised medical advice. For urgent
            symptoms we always signpost to a GP, NHS 111, or 999.
          </li>
        </ul>
        <p>
          Read our full{" "}
          <a className="text-primary underline" href="/editorial-policy">
            editorial &amp; medical review policy
          </a>
          .
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold">How your donations are used</h2>
        <p className="mb-3">
          Every page is free, and we keep it that way through voluntary donations and partnership
          funding. Here is roughly where a donation goes:
        </p>
        <ul className="mb-3 list-disc space-y-2 pl-5">
          <li><strong>Content &amp; clinical review</strong> — writing and updating evidence-based guides.</li>
          <li><strong>Exercise videos</strong> — physiotherapist-led routines filmed for home use.</li>
          <li><strong>Accessibility</strong> — keeping the site usable for people with pain, low vision and limited mobility.</li>
          <li><strong>Local support mapping</strong> — maintaining city and region resource pages.</li>
        </ul>
        <p>
          Our fundraising follows the Fundraising Regulator&rsquo;s{" "}
          <a
            className="text-primary underline"
            href={CHARITY.fundraisingCodeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Code of Fundraising Practice
          </a>
          .
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold">Governance &amp; accountability</h2>
        <p className="mb-3">
          Our trustees are responsible for the charity&rsquo;s strategy, finances and compliance.
          The current trustee list is published and maintained on the{" "}
          <a
            className="text-primary underline"
            href={CHARITY.registerUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Charity Commission register
          </a>
          .
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li><a className="text-primary underline" href="/governance">Governance &amp; trustees</a></li>
          <li><a className="text-primary underline" href="/safeguarding">Safeguarding policy</a></li>
          <li><a className="text-primary underline" href="/complaints">Complaints procedure</a></li>
          <li><a className="text-primary underline" href="/accessibility">Accessibility statement</a></li>
        </ul>
      </section>

      <section className="rounded-lg border p-5">
        <h2 className="mb-2 text-lg font-semibold">Questions about our credibility?</h2>
        <p className="text-sm text-muted-foreground">
          Email{" "}
          <a className="text-primary underline" href="mailto:info@livingwitharthritis.org.uk">
            info@livingwitharthritis.org.uk
          </a>{" "}
          or use our <a className="text-primary underline" href="/contact">contact form</a>. We aim
          to reply within 5 working days.
        </p>
      </section>
    </main>
  );
}
