import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { MessageSquareWarning, Clock, Mail, Phone } from "lucide-react";

export default function Complaints() {
  return (
    <>
      <Helmet>
        <title>Complaints Procedure | Living With Arthritis UK</title>
        <meta name="description" content="Our complaints procedure explains how to raise a concern about Living With Arthritis UK and how we will respond." />
      </Helmet>
      <Header />
      <main id="main-content" className="min-h-screen bg-background">
        <div className="container mx-auto px-6 md:px-10 py-16 max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <MessageSquareWarning className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Complaints Procedure</h1>
              <p className="text-sm text-muted-foreground">Last updated: March 2026</p>
            </div>
          </div>

          <div className="prose prose-sm dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-foreground">1. Our Commitment</h2>
              <p className="text-muted-foreground leading-relaxed">
                Living With Arthritis UK is committed to providing high-quality services and support. If something goes wrong, we want to know about it so we can put it right and learn from our mistakes. We treat all complaints seriously, fairly, and confidentially.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">2. What You Can Complain About</h2>
              <ul className="text-muted-foreground space-y-2">
                <li>The quality or standard of our services</li>
                <li>The behaviour or conduct of staff, volunteers, or trustees</li>
                <li>The content or accuracy of information we provide</li>
                <li>How we have handled your personal data</li>
                <li>How we have used charitable funds</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">3. How to Raise a Complaint</h2>
              <div className="bg-muted/30 border border-border/30 rounded-xl p-5 space-y-3">
                <p className="text-muted-foreground text-sm">You can contact us by:</p>
                <div className="space-y-2 text-sm">
                  <a href="mailto:complaints@livingwitharthritis.org.uk" className="flex items-center gap-2 text-primary hover:underline">
                    <Mail className="w-4 h-4" /> complaints@livingwitharthritis.org.uk
                  </a>
                  <a href="tel:07760512084" className="flex items-center gap-2 text-primary hover:underline">
                    <Phone className="w-4 h-4" /> 07760 512 084
                  </a>
                </div>
                <p className="text-muted-foreground text-sm">
                  Or write to: Living With Arthritis UK, Oswestry Health Centre, Thomas Savin Road, Off Gobowen Road, Oswestry SY11 1GA
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">4. Our Process</h2>
              <div className="space-y-4">
                {[
                  { step: "Step 1", title: "Acknowledgement", time: "Within 5 working days", desc: "We will acknowledge receipt of your complaint and assign a named person to investigate." },
                  { step: "Step 2", title: "Investigation", time: "Within 15 working days", desc: "We will investigate your complaint thoroughly, speaking with all relevant parties." },
                  { step: "Step 3", title: "Response", time: "Within 20 working days", desc: "We will provide a full written response explaining our findings and any actions we will take." },
                  { step: "Step 4", title: "Appeal", time: "Within 10 working days of response", desc: "If you are not satisfied, you can ask for the complaint to be reviewed by the Chair of Trustees." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 items-start">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{item.step}: {item.title}</h3>
                      <p className="text-xs text-primary font-medium">{item.time}</p>
                      <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">5. External Escalation</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you remain dissatisfied after completing our internal process, you may contact the Charity Commission for England and Wales at{" "}
                <a href="https://www.gov.uk/complain-about-charity" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  gov.uk/complain-about-charity
                </a>
                . For data protection concerns, you can contact the Information Commissioner's Office (ICO) at{" "}
                <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  ico.org.uk
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}