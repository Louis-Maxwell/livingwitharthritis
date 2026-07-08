import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import PageHero from "@/components/ui/PageHero";
import { Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CONTACT_EMAILS } from "@/config/contact";
import { CONTACT_PHONE } from "@/config/contact";
import {
  getCharity,
  hasCharityAddress,
  canonicalUrl,
  pageTitle,
  registeredCharityPhrase,
} from "@/config/charity";

const Footer = lazy(() => import("@/components/Footer"));

/**
 * UPGRADED PRIVACY POLICY — replaces src/pages/PrivacyPolicy.tsx
 * Legally significant items covered:
 *  - Data controller legal identity (charity number from CHARITY config)
 *  - UK GDPR Article 9 treatment of SPECIAL CATEGORY (health) data
 *  - Named processors and international transfer safeguards
 *  - AI chatbot processing disclosure
 *  - Buddy-profile visibility disclosure
 *  - Complaint route to the ICO
 *
 * Postal address renders only when `hasCharityAddress()` is true, so no
 * placeholder address ships. An ICO registration reference will be added
 * to section 1 once the data protection fee is registered — no placeholder
 * number is published in the meantime. Not legal advice — have a solicitor
 * review before relying on it.
 */
const PrivacyPolicy = () => {
  const {
    legalName,
    shortName,
    type,
    jurisdiction,
    regulator,
    number,
    websiteDomain,
    address,
  } = getCharity();
  const canonical = canonicalUrl("/privacy");
  const showAddress = hasCharityAddress();
  const title = pageTitle("Privacy Policy");

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta
          name="description"
          content={`How ${shortName} (${registeredCharityPhrase()}) collects, uses and protects your personal data, including health information, under UK GDPR.`}
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />

        <meta
          property="og:description"
          content="How we collect, use and protect your personal data, including health information, under UK GDPR and the Data Protection Act 2018."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:locale" content="en_GB" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <PageHero
          gradient="from-muted/30 via-background to-muted/10"
          pattern="grid"
          badge={
            <Badge className="bg-muted text-muted-foreground border-0 text-xs font-bold px-3 py-1.5">
              <Shield className="w-3 h-3 mr-1.5" /> Last updated: July 2026
            </Badge>
          }
          title="Privacy Policy"
          subtitle="How we collect, use and protect your personal data — including health information — under UK GDPR."
        />
        <main className="w-full px-6 md:px-10 lg:px-20 py-10 md:py-16 max-w-5xl mx-auto">
          <div className="prose prose-lg max-w-none space-y-8 text-foreground/80 leading-relaxed">

            <section>
              <h2 className="text-xl font-bold text-foreground mt-8 mb-3">1. Who we are (data controller)</h2>
              <p>
                {CHARITY.legalName} ("we", "us", "our") is a{" "}
                {CHARITY.type} registered in {CHARITY.jurisdiction},{" "}
                {CHARITY.regulator} number <strong>{CHARITY.number}</strong>. We are the{" "}
                <strong>data controller</strong> for personal data collected through{" "}
                {CHARITY.websiteDomain}.
              </p>
              {showAddress && (
                <p>
                  Registered address: {[address.street, address.locality, address.region, address.postalCode]
                    .filter(Boolean)
                    .join(", ")}.
                </p>
              )}
              <p>
                We comply with the UK General Data Protection Regulation (UK GDPR) and the Data
                Protection Act 2018.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mt-8 mb-3">2. Information we collect</h2>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Contact details:</strong> name, email address and phone number when you use our contact form, subscribe to updates, or make an enquiry.</li>
                <li><strong>Account data:</strong> email address and authentication details if you create an account.</li>
                <li><strong>Health information (special category data):</strong> details you choose to share about your condition — for example your arthritis type, pain levels or mobility — when you use our self-help tools, quizzes, buddy peer-support service, or chat assistant. See section 3.</li>
                <li><strong>Donation data:</strong> your name, contact details, donation amount and Gift Aid declaration. Card payments are processed by Stripe and PayPal; <strong>we never see or store your full card details</strong>.</li>
                <li><strong>Usage data:</strong> pages visited, approximate location (city level), device and browser information, collected via cookies and Google Analytics 4 only if you accept analytics cookies.</li>
                <li><strong>Communications:</strong> the content of messages you send us, including messages typed into our chat assistant.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mt-8 mb-3">3. Health data — special protections</h2>
              <p>
                Information about your health is <strong>special category data</strong> under Article 9 UK
                GDPR and receives extra protection. We only process it with your <strong>explicit
                consent</strong>, which we ask for at the point you provide it (for example when completing
                a health quiz or creating a buddy profile). You can withdraw that consent at any time by
                contacting us or deleting your account, and we will delete the associated health data.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Buddy peer-support:</strong> if you create a buddy profile, the details you include (such as your arthritis type and interests) are visible to your matched buddy only — never publicly. Please share only what you are comfortable with.</li>
                <li><strong>Chat assistant:</strong> our help chat uses a language model to generate responses. Messages you send are processed by our provider to produce a reply and are subject to safety checks. The assistant provides general information only — it is not a medical professional, does not make decisions about you, and its conversations are not used to build a health profile of you. Please avoid sharing information that could identify other people.</li>
                <li>We never sell health data, never use it for advertising, and never share it with insurers or employers.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mt-8 mb-3">4. How and why we use your information</h2>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>To provide our services and tools (legal basis: contract; explicit consent for health data).</li>
                <li>To respond to enquiries and provide support (legitimate interests).</li>
                <li>To process donations, Gift Aid and maintain financial records (contract; legal obligation).</li>
                <li>To send newsletters and updates you have opted in to (consent — withdraw anytime via the unsubscribe link).</li>
                <li>To keep the website secure and prevent fraud and abuse, including rate limiting (legitimate interests).</li>
                <li>To understand how the site is used, via anonymised, consent-based analytics (consent).</li>
              </ul>
              <p className="mt-3">We do not carry out automated decision-making that has legal or similarly significant effects on you, and we do not use your data for profiling for marketing purposes.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mt-8 mb-3">5. Who we share data with</h2>
              <p>We never sell personal data. We share it only with service providers ("processors") who help us run the website, under data processing agreements:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Supabase</strong> — secure database, authentication and serverless functions (hosting of account, form and profile data).</li>
                <li><strong>Stripe and PayPal</strong> — donation payment processing (they act as independent controllers of payment data under their own policies).</li>
                <li><strong>Resend</strong> — transactional email delivery.</li>
                <li><strong>Google Analytics 4</strong> — consent-based, anonymised usage analytics.</li>
                <li><strong>Our chat gateway provider</strong> — processes chat messages to generate assistant replies.</li>
                <li><strong>HMRC</strong> — Gift Aid claims (legal obligation).</li>
                <li>Regulators, law enforcement or professional advisers where required by law or to protect vital interests.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mt-8 mb-3">6. International transfers</h2>
              <p>
                Some of our providers process data outside the UK, including in the United States and the
                European Economic Area. Where they do, transfers are protected by UK-approved safeguards:
                the UK Extension to the EU-US Data Privacy Framework, UK adequacy regulations, or the
                International Data Transfer Agreement / Addendum (IDTA) with standard contractual clauses.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mt-8 mb-3">7. How long we keep data</h2>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Donation and Gift Aid records:</strong> 7 years (financial and HMRC requirements).</li>
                <li><strong>Contact enquiries:</strong> up to 2 years after resolution.</li>
                <li><strong>Accounts, buddy profiles and health data:</strong> until you delete your account or withdraw consent, after which they are deleted or irreversibly anonymised within 30 days.</li>
                <li><strong>Newsletter data:</strong> until you unsubscribe.</li>
                <li><strong>Analytics data:</strong> up to 14 months, in aggregated form.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mt-8 mb-3">8. Cookies</h2>
              <p>
                We use strictly necessary cookies to run the site and optional analytics cookies only with
                your consent, which you can give or refuse via our cookie banner and change at any time.
                Full details, including a list of cookies and durations, are in our{" "}
                <a href="/cookies-policy" className="text-primary hover:underline">Cookies Policy</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mt-8 mb-3">9. Your rights</h2>
              <p>Under UK GDPR you have the right to: access your data; correct it; delete it; restrict or object to processing; data portability; and withdraw consent at any time (including for health data). We respond within one month.</p>
              <p className="mt-3">To exercise any right, email <a href={`mailto:${CONTACT_EMAILS.info}`} className="text-primary hover:underline">{CONTACT_EMAILS.info}</a>. We may need to verify your identity first.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mt-8 mb-3">10. Security</h2>
              <p>All traffic is encrypted (TLS). Data is stored with row-level security so users can only access their own records; administrative access is restricted and logged. Payment card data never touches our servers. We review our security measures regularly and will notify you and the ICO of any breach where legally required.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mt-8 mb-3">11. Children</h2>
              <p>Our services are aimed at adults. We do not knowingly collect personal data from children under 13, and users must be 18 or over to create buddy profiles or donate. If you believe a child has provided us personal data, contact us and we will delete it.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mt-8 mb-3">12. Changes, contact and complaints</h2>
              <p>We may update this policy; material changes will be highlighted on this page with a new "last updated" date.</p>
              <p className="mt-2">
                <strong>{CHARITY.legalName}</strong> (registered charity {CHARITY.number})
                {showAddress && (
                  <>
                    <br />
                    {[address.street, address.locality, address.region, address.postalCode]
                      .filter(Boolean)
                      .join(", ")}
                  </>
                )}
                <br />
                Email: <a href={`mailto:${CONTACT_EMAILS.info}`} className="text-primary hover:underline">{CONTACT_EMAILS.info}</a> · Phone: {CONTACT_PHONE}
              </p>
              <p className="mt-3">If you are unhappy with how we handle your data, you can complain to the Information Commissioner's Office at <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ico.org.uk/make-a-complaint</a> or 0303 123 1113.</p>
            </section>
          </div>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default PrivacyPolicy;
