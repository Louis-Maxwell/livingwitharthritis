import { memo } from "react";
import { MessageCircle, Mail, Phone, ArrowRight } from "lucide-react";
import { ContactFormModal } from "@/components/ContactFormModal";

const GetInTouchSection = memo(() => {
  return (
    <section aria-labelledby="get-in-touch-heading" className="section-spacer">
      <div className="container mx-auto px-6 md:px-10 max-w-6xl">
        <div className="text-center mb-14">
          <span className="section-label text-primary mb-4 block">We're Here For You</span>
          <h2
            id="get-in-touch-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-5"
          >
            Get in touch
          </h2>
          <p className="text-base text-muted-foreground max-w-lg mx-auto">
            Whether you have a question, need support, or just want to chat — we'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {/* WhatsApp */}
          <a
            href="https://wa.me/447760512084"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-border/30 bg-card p-8 flex flex-col items-center text-center space-y-4 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: "50ms" }}
          >
            <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-105 transition-all duration-300">
              <MessageCircle className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Chat on WhatsApp</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Quick and instant answers. We typically respond within minutes.
            </p>
            <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:gap-2.5 transition-all duration-300">
              Chat now <ArrowRight className="h-4 w-4" />
            </span>
          </a>

          {/* Enquiry */}
          <div
            className="group rounded-2xl border border-border/30 bg-card p-8 flex flex-col items-center text-center space-y-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: "100ms" }}
          >
            <div className="h-14 w-14 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary group-hover:scale-105 transition-all duration-300">
              <Mail className="h-6 w-6 text-secondary group-hover:text-secondary-foreground transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Make an enquiry</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Send us a detailed message and our team will get back to you.
            </p>
            <ContactFormModal
              trigger={
                <button className="inline-flex items-center gap-1.5 text-sm font-bold text-secondary group-hover:gap-2.5 transition-all duration-300 cursor-pointer">
                  Send an enquiry <ArrowRight className="h-4 w-4" />
                </button>
              }
            />
          </div>

          {/* Phone */}
          <a
            href="tel:+447760512084"
            className="group rounded-2xl border border-border/30 bg-card p-8 flex flex-col items-center text-center space-y-4 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: "150ms" }}
          >
            <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-105 transition-all duration-300">
              <Phone className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Give us a call</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Speak to our friendly team on
              <br />
              <strong className="text-foreground text-base">07760 512 084</strong>
            </p>
            <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:gap-2.5 transition-all duration-300">
              Call now <ArrowRight className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
});

GetInTouchSection.displayName = "GetInTouchSection";
export default GetInTouchSection;
