import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import PageHero from "@/components/ui/PageHero";
import { FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Footer = lazy(() => import("@/components/Footer"));

const TermsConditions = () => (
  <>
    <Helmet>
      <title>Terms & Conditions | Living With Arthritis UK</title>
      <meta name="description" content="Terms and Conditions for using the Living With Arthritis UK website. Covers use of the site, intellectual property, donations, refunds, and liability." />
      <link rel="canonical" href="https://livingwitharthritis.org.uk/terms" />
      <meta property="og:title" content="Terms & Conditions | Living With Arthritis UK" />
      <meta property="og:description" content="Terms and Conditions governing the use of the Living With Arthritis UK website." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://livingwitharthritis.org.uk/terms" />
      <meta property="og:locale" content="en_GB" />
      <meta name="robots" content="index, follow" />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Terms & Conditions",
        "description": "Terms and Conditions for Living With Arthritis UK.",
        "url": "https://livingwitharthritis.org.uk/terms",
        "inLanguage": "en-GB",
        "isPartOf": { "@type": "WebSite", "name": "Living With Arthritis UK", "url": "https://livingwitharthritis.org.uk" }
      })}</script>
    </Helmet>
    <div className="min-h-screen bg-background">
      <Header />
      <PageHero
        gradient="from-muted/30 via-background to-muted/10"
        pattern="grid"
        badge={
          <Badge className="bg-muted text-muted-foreground border-0 text-xs font-bold px-3 py-1.5">
            <FileText className="w-3 h-3 mr-1.5" /> Last updated: March 2026
          </Badge>
        }
        title="Terms & Conditions"
        subtitle="Please read these terms carefully before using our website."
      />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">

          <section>
            <h2 className="text-2xl font-bold text-foreground">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms and Conditions govern your use of the Living With Arthritis UK website
              (livingwitharthritis.org.uk). By accessing or using this website, you agree to be
              bound by these terms. If you do not agree, please do not use the site.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Living With Arthritis UK is a charitable organisation registered in England &amp; Wales.
              References to "we", "us", or "our" refer to Living With Arthritis UK.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">2. Use of the Website</h2>
            <p className="text-muted-foreground leading-relaxed">
              You may use this website for lawful purposes only. You must not use it in any way that
              breaches any applicable local, national, or international law or regulation, or that is
              fraudulent or harmful.
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>You must not misuse the site by knowingly introducing viruses, trojans, or other malicious material.</li>
              <li>You must not attempt to gain unauthorised access to our servers or any connected database.</li>
              <li>You must not use automated systems to scrape or extract data from the website without our written consent.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">3. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              All content on this website — including text, graphics, logos, images, and software — is
              the property of Living With Arthritis UK or its content suppliers and is protected by
              UK and international copyright laws. You may not reproduce, distribute, or create
              derivative works without our prior written permission.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              You may print or download extracts from our site for your personal, non-commercial use,
              provided you acknowledge us as the source and do not modify the content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">4. Health Information Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              The information provided on this website is for general educational purposes only and does
              not constitute medical advice. It is not intended to replace professional healthcare
              guidance. Always consult a qualified healthcare provider before making decisions about
              your health or treatment.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We make every effort to ensure our content is accurate, evidence-based, and up to date,
              but we do not guarantee the completeness or reliability of any information on the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">5. Donations & Refunds</h2>
            <p className="text-muted-foreground leading-relaxed">
              All donations made through our website are voluntary and processed securely via
              third-party payment providers (e.g. Stripe). By donating, you confirm that you are
              authorised to use the payment method provided.
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Donations are generally non-refundable. If you believe a donation was made in error, please contact us within 30 days at <a href="mailto:info@livingwitharthritis.org.uk" className="text-primary underline">info@livingwitharthritis.org.uk</a>.</li>
              <li>Gift Aid declarations are subject to HMRC rules. You must be a UK taxpayer for Gift Aid to apply.</li>
              <li>We are committed to transparent use of funds. See our <a href="/governance" className="text-primary underline">Governance</a> and <a href="/finances" className="text-primary underline">Finances</a> pages for details.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">6. User-Generated Content</h2>
            <p className="text-muted-foreground leading-relaxed">
              Where you submit content to our website (e.g. forum posts, comments, or feedback),
              you grant us a non-exclusive, royalty-free licence to use, reproduce, and display
              that content in connection with our charitable purposes.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to moderate, edit, or remove any user-generated content that we
              consider inappropriate, offensive, or in breach of these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">7. External Links</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website may contain links to external websites. These links are provided for your
              convenience and do not signify endorsement. We have no control over the content or
              availability of external sites and accept no responsibility for them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">8. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              To the fullest extent permitted by law, Living With Arthritis UK excludes all liability
              for any loss or damage arising from your use of, or inability to use, this website.
              This includes, without limitation, indirect or consequential loss, loss of data, or
              loss of profits.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Nothing in these terms excludes or limits our liability for death or personal injury
              caused by our negligence, or for fraud or fraudulent misrepresentation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">9. Changes to These Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may revise these terms at any time by updating this page. You are expected to
              check this page periodically to take notice of any changes. Your continued use of the
              site after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">10. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These terms are governed by and construed in accordance with the laws of England and
              Wales. Any disputes arising under these terms shall be subject to the exclusive
              jurisdiction of the courts of England and Wales.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">11. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms and Conditions, please contact us at:
            </p>
            <div className="bg-muted/30 rounded-xl p-6 mt-4">
              <p className="text-foreground font-semibold">Living With Arthritis UK</p>
              <p className="text-muted-foreground">Email: <a href="mailto:info@livingwitharthritis.org.uk" className="text-primary underline">info@livingwitharthritis.org.uk</a></p>
              <p className="text-muted-foreground">Website: <a href="https://livingwitharthritis.org.uk" className="text-primary underline">livingwitharthritis.org.uk</a></p>
            </div>
          </section>

        </div>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  </>
);

export default TermsConditions;
