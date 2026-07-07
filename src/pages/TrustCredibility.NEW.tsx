import { Helmet } from "react-helmet-async";

/**
 * Trust, Governance & Clinical Review
 * ------------------------------------
 * Directly answers the #1 "High Impact" gap in the Semrush/consultant audit:
 * trust + charity/company-status clarity, and E-E-A-T for health content.
 *
 * FACTS BAKED IN (verified against the public register on build date):
 *  - Registered charity: LIVING WITH ARTHRITIS, Charity Commission (E&W) no. 1218461
 *  - Registered address: Oswestry Primary Care Centre, Thomas Savin Road, Oswestry SY11 1GA
 *
 * PLACEHOLDERS to fill before publishing (search for "TODO:"):
 *  - Companies House number for "Living With Arthritis Ltd"
 *  - Whether the Ltd is the charity's incorporated body or a trading subsidiary
 *  - HMRC Gift Aid recognition reference (Gift Aid ≠ charity registration)
 *  - Trustee names / clinical reviewer names + registration numbers
 *  - Fundraising Regulator registration status
 */
const BASE = "https://livingwitharthritis.org.uk";

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
        <title>Trust, Governance & Clinical Review | Living With Arthritis UK</title>
        <meta
          name="description"
          content="How Living With Arthritis UK is governed, funded and clinically reviewed. Registered charity 1218461, our editorial policy, and how your donations are used."
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
        exactly who we are, how we are regulated, who reviews our content, and how every donation is
        used — so you can rely on our guidance and give with confidence.
      </p>

      {/* Key takeaways — answer-first for AEO */}
      <section className="mb-10 rounded-lg border bg-muted/40 p-5">
        <h2 className="mb-3 text-lg font-semibold">Key takeaways</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm">
          <li>
            We are a <strong>registered charity in England &amp; Wales</strong> — Charity Commission
            number <strong>1218461</strong>.
          </li>
          <li>
            All health content is written in plain English and <strong>reviewed by HCPC-registered
            clinicians</strong>, with a named reviewer and review date on every guide.
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
          Living With Arthritis is a charity registered with the Charity Commission for England and
          Wales under number <strong>1218461</strong>. Our registered address is Oswestry Primary Care
          Centre, Thomas Savin Road, Oswestry SY11 1GA. You can verify our entry directly on the{" "}
          <a
            className="text-primary underline"
            href="https://register-of-charities.charitycommission.gov.uk/charity-search?p_p_id=uk_gov_ccew_onereg_charitydetails_web_portlet_CharityDetailsPortlet&_uk_gov_ccew_onereg_charitydetails_web_portlet_CharityDetailsPortlet_mvcRenderCommandName=%2Fsearch-results&_uk_gov_ccew_onereg_charitydetails_web_portlet_CharityDetailsPortlet_keywords=1218461"
            target="_blank"
            rel="noopener noreferrer"
          >
            Charity Commission register
          </a>.
        </p>
        <p className="mb-3">
          {/* TODO: confirm and complete before publishing */}
          Like most UK charities, we also operate through a company registered at Companies House
          (Living With Arthritis Ltd, company number <strong>TODO: 00000000</strong>). The company is
          the charity&rsquo;s incorporated legal body{" "}
          <span className="text-muted-foreground">
            (TODO: confirm wording — &ldquo;the incorporated body of the charity&rdquo; vs &ldquo;a
            wholly owned trading subsidiary that gift-aids its profits to the charity&rdquo;)
          </span>
          . Registering at both Companies House and the Charity Commission is standard for a charitable
          company and does not change our charitable purpose or obligations.
        </p>
        <p>
          We are recently registered as a charity, so if you checked us on Companies House before that
          registration completed you may have seen only the company. Both records are now maintained
          and public.
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
            or First Contact Practitioner</strong>{" "}
            <span className="text-muted-foreground">(TODO: reviewer name, HCPC registration number)</span>.
          </li>
          <li>Each page shows a <strong>&ldquo;Medically reviewed by&rdquo;</strong> line, the reviewer&rsquo;s credentials and the <strong>last-reviewed date</strong>.</li>
          <li>We align with <strong>NICE guidance</strong> (e.g. NG226 for osteoarthritis) and cite primary sources — NHS, NICE, peer-reviewed research — rather than making unsupported claims.</li>
          <li>We never present our content as a substitute for personalised medical advice. For urgent symptoms we always signpost to a GP, NHS 111, or 999.</li>
        </ul>
        <p>
          Read our full <a className="text-primary underline" href="/editorial-policy">editorial &amp; medical review policy</a>.
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
        <p className="mb-3">
          {/* TODO: only keep this paragraph if HMRC Gift Aid recognition is confirmed */}
          If you are a UK taxpayer, Gift Aid lets us reclaim 25p for every £1 you give, at no extra
          cost to you{" "}
          <span className="text-muted-foreground">
            (TODO: confirm HMRC Gift Aid recognition and reference before making this claim live).
          </span>
        </p>
        <p>
          We follow the Fundraising Regulator&rsquo;s Code of Fundraising Practice{" "}
          <span className="text-muted-foreground">(TODO: add Fundraising Regulator registration once complete)</span>.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold">Governance &amp; accountability</h2>
        <p className="mb-3">
          Our trustees are responsible for the charity&rsquo;s strategy, finances and compliance.
          {" "}<span className="text-muted-foreground">(TODO: list trustee names / roles, or link to the Charity Commission trustee list.)</span>
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
          Email <a className="text-primary underline" href="mailto:info@livingwitharthritis.org.uk">info@livingwitharthritis.org.uk</a>{" "}
          or use our <a className="text-primary underline" href="/contact">contact form</a>. We aim to reply within 5 working days.
        </p>
      </section>
    </main>
  );
}
