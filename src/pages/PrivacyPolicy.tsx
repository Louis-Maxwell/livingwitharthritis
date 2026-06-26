import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import PageHero from "@/components/ui/PageHero";
import { Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CONTACT_EMAILS } from "@/config/contact";

const Footer = lazy(() => import("@/components/Footer"));

const PrivacyPolicy = () => (
  <>
    <Helmet>
      <title>Privacy Policy | Living With Arthritis UK</title>
      <meta name="description" content="Privacy policy & data protection: How we protect your data. GDPR compliant, no third-party selling. Your privacy matters to us." />
      <link rel="canonical" href="https://livingwitharthritis.org.uk/privacy" />
      <meta property="og:title" content="Privacy Policy | Living With Arthritis UK" />
      <meta property="og:description" content="Privacy policy & data protection: How we protect your data. GDPR compliant, no third-party selling. Your privacy matters to us." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://livingwitharthritis.org.uk/privacy" />
      <meta property="og:locale" content="en_GB" />
      <meta name="robots" content="index, follow" />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Privacy Policy",
        "description": "Privacy Policy for Living With Arthritis UK — UK GDPR compliant data protection.",
        "url": "https://livingwitharthritis.org.uk/privacy",
        "inLanguage": "en-GB",
        "isPartOf": { "@type": "WebSite", "name": "Living With Arthritis UK", "url": "https://livingwitharthritis.org.uk" }
      })}</script>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Privacy Policy – UK GDPR Data Protection | Living With Arthritis UK" />
      <meta name="twitter:description" content="Privacy policy & data protection: How we protect your data. GDPR compliant, no third-party selling. Your privacy matters to us." />
      <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
        <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
    </Helmet>
    <div className="min-h-screen bg-background">
      <Header />
      <PageHero
        gradient="from-muted/30 via-background to-muted/10"
        pattern="grid"
        badge={
          <Badge className="bg-muted text-muted-foreground border-0 text-xs font-bold px-3 py-1.5">
            <Shield className="w-3 h-3 mr-1.5" /> Last updated: March 2026
          </Badge>
        }
        title="Privacy Policy"
        subtitle="How we collect, use and protect your personal data in accordance with UK GDPR."
      />
      <main className="w-full px-6 md:px-10 lg:px-20 py-10 md:py-16 max-w-5xl mx-auto">
        <div className="prose prose-lg max-w-none space-y-8 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">1. Who We Are</h2>
            <p>Living With Arthritis UK ("we", "us", "our") is committed to protecting your personal data. This policy explains how we collect, use and safeguard information when you use our website and services. We operate in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">2. Information We Collect</h2>
            <p>We may collect the following types of personal information:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Contact details:</strong> Your name, email address and phone number when you fill in forms, book appointments or subscribe to our newsletter.</li>
              <li><strong>Health-related information:</strong> Details you voluntarily share about your arthritis condition when using our self-help tools or chatbot.</li>
              <li><strong>Usage data:</strong> Information about how you navigate our website, including pages visited, time spent and device information, collected through cookies and similar technologies.</li>
              <li><strong>Donation data:</strong> Payment information processed securely through our payment provider when you make a donation. We do not store full card details.</li>
              <li><strong>Communication records:</strong> Content of messages you send us via contact forms or our virtual assistant.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">3. How We Use Your Information</h2>
            <p>We use your personal data to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Provide our services, including virtual physiotherapy guidance, self-help tools and online assistance.</li>
              <li>Process appointment bookings and respond to enquiries.</li>
              <li>Process and acknowledge donations, including Gift Aid claims where applicable.</li>
              <li>Send newsletters and updates you have opted in to receive.</li>
              <li>Improve our website, services and user experience through anonymised analytics.</li>
              <li>Comply with legal obligations and protect against fraud.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">4. Legal Basis for Processing</h2>
            <p>We process your data based on one or more of the following grounds:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Consent:</strong> Where you have given clear consent for us to process your personal data for a specific purpose (e.g. newsletter sign-up).</li>
              <li><strong>Contract:</strong> Where processing is necessary to fulfil a service you have requested (e.g. booking an appointment).</li>
              <li><strong>Legitimate interests:</strong> Where we have a genuine reason to use your data and this does not override your rights (e.g. improving our services).</li>
              <li><strong>Legal obligation:</strong> Where we are required to process data by law.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">5. Sharing Your Information</h2>
            <p>We do not sell your personal information to third parties. We may share data with:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Service providers who help us deliver our website and services (e.g. hosting, payment processing, email delivery), under strict data protection agreements.</li>
              <li>Regulatory or law enforcement bodies where required by law.</li>
              <li>HMRC for Gift Aid processing where applicable.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">6. Data Retention</h2>
            <p>We retain personal data only for as long as necessary to fulfil the purposes for which it was collected. Donation records are kept for up to 7 years for financial compliance. Newsletter subscriptions are retained until you unsubscribe. Contact enquiries are kept for up to 2 years unless ongoing communication is required.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">7. Your Rights</h2>
            <p>Under UK GDPR, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate or incomplete data.</li>
              <li>Request deletion of your data (right to be forgotten).</li>
              <li>Restrict or object to certain processing activities.</li>
              <li>Data portability — receive your data in a structured, machine-readable format.</li>
              <li>Withdraw consent at any time where processing is based on consent.</li>
            </ul>
            <p className="mt-3">To exercise any of these rights, please contact us at <a href={`mailto:${CONTACT_EMAILS.info}`} className="text-primary hover:underline">{CONTACT_EMAILS.info}</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">8. Security</h2>
            <p>We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure or destruction. All data transmitted through our website is encrypted using industry-standard TLS/SSL protocols.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">9. Children's Privacy</h2>
            <p>Our services are not directed at children under 13. We do not knowingly collect personal data from children under 13. If you believe a child has provided us with personal data, please contact us and we will take steps to delete it.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">10. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">11. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy or our data practices, please contact:</p>
            <p className="mt-2">
              <strong>Living With Arthritis UK</strong><br />
              Email: <a href={`mailto:${CONTACT_EMAILS.info}`} className="text-primary hover:underline">{CONTACT_EMAILS.info}</a><br />
              Phone: 07760 512 084
            </p>
            <p className="mt-3">You also have the right to lodge a complaint with the Information Commissioner's Office (ICO) at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ico.org.uk</a>.</p>
          </section>
        </div>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  </>
);

export default PrivacyPolicy;