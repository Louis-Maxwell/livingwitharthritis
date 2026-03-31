import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Shield, AlertTriangle, Phone, Mail } from "lucide-react";

export default function Safeguarding() {
  return (
    <>
      <Helmet>
        <title>Safeguarding Policy | Living With Arthritis UK</title>
        <meta name="description" content="Our safeguarding policy outlines how Living With Arthritis UK protects vulnerable adults and ensures the safety of everyone who engages with our services." />
      </Helmet>
      <Header />
      <main id="main-content" className="min-h-screen bg-background">
        <div className="container mx-auto px-6 md:px-10 py-16 max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Safeguarding Policy</h1>
              <p className="text-sm text-muted-foreground">Last updated: March 2026</p>
            </div>
          </div>

          <div className="prose prose-sm dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-foreground">1. Our Commitment</h2>
              <p className="text-muted-foreground leading-relaxed">
                Living With Arthritis UK is committed to safeguarding and promoting the welfare of all individuals who engage with our services. We recognise our responsibility to take all reasonable steps to promote safe practice and to protect vulnerable adults from harm, abuse and exploitation.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">2. Scope</h2>
              <p className="text-muted-foreground leading-relaxed">
                This policy applies to all trustees, staff, volunteers, and anyone working on behalf of Living With Arthritis UK, including those providing services through our website, community forums, and virtual physiotherapy sessions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">3. Definitions</h2>
              <p className="text-muted-foreground leading-relaxed">
                A <strong>vulnerable adult</strong> is a person aged 18 or over who may be unable to take care of themselves or protect themselves from harm or exploitation due to mental or physical disability, age, or illness. Abuse includes physical, emotional, financial, sexual abuse, neglect, and discriminatory abuse.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">4. Principles</h2>
              <ul className="text-muted-foreground space-y-2">
                <li>The welfare of adults at risk is paramount</li>
                <li>All adults have the right to be protected from abuse regardless of age, disability, gender, racial heritage, religious belief, sexual orientation, or identity</li>
                <li>All suspicions and allegations of abuse will be taken seriously and responded to swiftly and appropriately</li>
                <li>We will work in partnership with other agencies to safeguard adults at risk</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">5. Online Safety</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our community forums and AI health assistant are moderated. All user-generated content is reviewed for harmful material. Our chatbot provides evidence-based health information only and explicitly directs users to NHS 111 or emergency services for urgent concerns. We do not provide medical diagnoses.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">6. Reporting Concerns</h2>
              <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  <span className="font-semibold text-foreground">If someone is in immediate danger, call 999.</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  For non-emergency safeguarding concerns about our services, please contact:
                </p>
                <div className="space-y-2 text-sm">
                  <a href="mailto:safeguarding@livingwitharthritis.org.uk" className="flex items-center gap-2 text-primary hover:underline">
                    <Mail className="w-4 h-4" /> safeguarding@livingwitharthritis.org.uk
                  </a>
                  <a href="tel:07760512084" className="flex items-center gap-2 text-primary hover:underline">
                    <Phone className="w-4 h-4" /> 07760 512 084
                  </a>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">7. Review</h2>
              <p className="text-muted-foreground leading-relaxed">
                This policy is reviewed annually by the Board of Trustees and updated as necessary to reflect changes in legislation, best practice, or organisational structure.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}