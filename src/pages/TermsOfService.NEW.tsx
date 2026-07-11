import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import PageHero from "@/components/ui/PageHero";
import { Scale } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CONTACT_EMAILS } from "@/config/contact";

const Footer = lazy(() => import("@/components/Footer"));

/**
 * Terms of Service — the one legal document the site was missing.
 * Structure and imports intentionally mirror src/pages/PrivacyPolicy.tsx
 * so this drops in with zero new dependencies.
 *
 * Register at /terms in App.tsx and link it in the footer next to Privacy.
 *
 * NOTE: This is a solid baseline drafted for a UK registered charity
 * health-information website. It is not a substitute for review by a
 * solicitor — have one read it before you rely on it in a dispute.
 */
const TermsOfService = () => (
  <>
    <Helmet>
      <title>Terms of Service | Living With Arthritis UK</title>
      <meta name="description" content="Terms of service for Living With Arthritis UK: acceptable use, medical information disclaimer, intellectual property and liability." />
      <link rel="canonical" href="https://livingwitharthritis.org.uk/terms" />
      <meta name="robots" content="index, follow" />
    </Helmet>
    <div className="min-h-screen bg-background">
      <Header />
      <PageHero
        gradient="from-muted/30 via-background to-muted/10"
        pattern="grid"
        badge={
          <Badge className="bg-muted text-muted-foreground border-0 text-xs font-bold px-3 py-1.5">
            <Scale className="w-3 h-3 mr-1.5" /> Last updated: July 2026
          </Badge>
        }
        title="Terms of Service"
        subtitle="The rules for using this website and our free services."
      />
      <main className="w-full px-6 md:px-10 lg:px-20 py-10 md:py-16 max-w-5xl mx-auto">
        <div className="prose prose-lg max-w-none space-y-8 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">1. Who we are and acceptance of these terms</h2>
            <p>Living With Arthritis UK ("we", "us", "our") is a charity registered in England and Wales (charity number 1218461). By accessing or using livingwitharthritis.org.uk (the "Site"), you agree to these Terms of Service. If you do not agree, please do not use the Site.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">2. Medical information disclaimer — please read carefully</h2>
            <p>The Site provides general health information about arthritis and musculoskeletal conditions. It is <strong>not medical advice</strong>, and it is not a substitute for professional diagnosis, treatment or care from a qualified healthcare professional. Always consult your GP, rheumatology team, pharmacist or other qualified clinician before starting, stopping or changing any treatment, medication, exercise programme or diet. Never delay seeking medical advice because of something you have read on this Site.</p>
            <p className="mt-3">Our AI chat assistant provides general information only. It is not a clinician, cannot diagnose you, and its responses may contain errors. In an emergency, call 999. For urgent medical concerns, contact NHS 111 or your GP.</p>
            <p className="mt-3">Content about arthritis in animals is general information for pet owners and is not veterinary advice. Never give pets human medication; always consult a qualified veterinary surgeon.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">3. Acceptable use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Use the Site in any way that breaks the law or infringes anyone's rights.</li>
              <li>Attempt to gain unauthorised access to the Site, its servers, databases or any connected system, or probe, scan or test their vulnerability without our written permission (see our responsible disclosure policy in SECURITY.md).</li>
              <li>Introduce malware, submit malicious code through forms or the chat assistant, or interfere with the Site's normal operation, including by scraping at volume or attempting denial-of-service.</li>
              <li>Use our community, buddy or feedback features to harass, abuse or harm others, impersonate any person, or post content that is unlawful, defamatory or obscene.</li>
              <li>Misuse the donation system, including making fraudulent payments or false Gift Aid declarations.</li>
            </ul>
            <p className="mt-3">We may suspend or withdraw access to any feature, remove content, and report unlawful activity to relevant authorities.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">4. Donations</h2>
            <p>Donations are processed by third-party payment providers; we never store your full card details. Donations are generally non-refundable, but if you believe a donation was made in error, contact us within 14 days at <a href={`mailto:${CONTACT_EMAILS.info}`} className="text-primary hover:underline">{CONTACT_EMAILS.info}</a> and we will consider refund requests in good faith and in line with our obligations as a charity. Gift Aid declarations must be accurate; you are responsible for telling us if your tax status changes.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">5. Intellectual property</h2>
            <p>The Site's content — text, guides, graphics, logos, videos and software — is owned by or licensed to Living With Arthritis UK and protected by copyright and other intellectual property laws. You may view, download and print content for personal, non-commercial use. You may not republish, sell or redistribute our content without written permission, except for brief quotations with attribution and a link. Content derived from NHS or NICE sources is used under the Open Government Licence where applicable.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">6. User content</h2>
            <p>If you submit content to the Site (for example community stories, feedback or chat messages), you grant us a non-exclusive, royalty-free licence to use it to operate and improve our services. You confirm your content is yours to share and doesn't infringe anyone else's rights. We may moderate, edit or remove user content at our discretion. We will never publish your personal story publicly without your explicit consent.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">7. Third-party links and services</h2>
            <p>The Site links to third-party websites (including NHS, NICE and other charities) and uses third-party services for payments, analytics and email. We are not responsible for the content, availability or privacy practices of third parties. Links do not imply endorsement.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">8. Availability and changes</h2>
            <p>The Site is provided free of charge on an "as is" and "as available" basis. We do not guarantee uninterrupted availability and may change, suspend or withdraw any part of the Site without notice. We may update these terms from time to time; the "Last updated" date above shows the current version, and continued use after changes means you accept them.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">9. Limitation of liability</h2>
            <p>Nothing in these terms excludes or limits our liability for death or personal injury caused by our negligence, fraud, or any other liability that cannot be excluded under the law of England and Wales. Subject to that, we exclude all implied conditions, warranties and representations, and we will not be liable for any loss or damage — including indirect or consequential loss — arising from your use of, or inability to use, the Site or reliance on its content. Your use of the information on the Site is at your own risk; see the medical disclaimer in section 2.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">10. Governing law</h2>
            <p>These terms are governed by the law of England and Wales, and the courts of England and Wales have exclusive jurisdiction over any dispute, except that if you are a consumer resident in Scotland or Northern Ireland you may also bring proceedings in your local courts.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">11. Contact</h2>
            <p>
              <strong>Living With Arthritis UK</strong> — Registered Charity 1218461 (England &amp; Wales)<br />
              Email: <a href={`mailto:${CONTACT_EMAILS.info}`} className="text-primary hover:underline">{CONTACT_EMAILS.info}</a>
            </p>
          </section>
        </div>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  </>
);

export default TermsOfService;
