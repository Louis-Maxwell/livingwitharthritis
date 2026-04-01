import { memo } from "react";
import { MessageCircle, Mail, Phone, ArrowRight } from "lucide-react";
import { ContactFormModal } from "@/components/ContactFormModal";

const GetInTouchSection = memo(() => {
  return (
    <section aria-labelledby="get-in-touch-heading" className="section-spacer bg-warm">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="text-center mb-20">
          <span className="section-label text-primary/70 mb-5 block">We're Here For You</span>
          <h2
            id="get-in-touch-heading"
            className="text-3xl sm:text-4xl md:text-[3.25rem] font-display font-bold tracking-tight mb-5 leading-[1.08]"
          >
            Get in touch
          </h2>
          <p className="text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Whether you have a question, need support, or just want to chat — we'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* WhatsApp */}
          <a
            href="https://wa.me/447760512084"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-border/20 bg-card p-10 flex flex-col items-center text-center space-y-5 cursor-pointer hover:shadow-large hover:-translate-y-1 transition-all duration-500"
          >
            <div className="h-14 w-14 rounded-2xl bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:scale-105 transition-all duration-500">
              <MessageCircle className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
            </div>
            <h3 className="text-lg font-bold text-foreground tracking-tight">Chat on WhatsApp</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Quick and instant answers. We typically respond within minutes.
            </p>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary group-hover:gap-2.5 transition-all duration-300 tracking-wider uppercase">
              Chat now <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </a>

          {/* Enquiry */}
          <div
            className="group rounded-2xl border border-border/20 bg-card p-10 flex flex-col items-center text-center space-y-5 hover:shadow-large hover:-translate-y-1 transition-all duration-500"
          >
            <div className="h-14 w-14 rounded-2xl bg-secondary/5 flex items-center justify-center group-hover:bg-secondary group-hover:scale-105 transition-all duration-500">
              <Mail className="h-6 w-6 text-secondary group-hover:text-secondary-foreground transition-colors duration-500" />
            </div>
            <h3 className="text-lg font-bold text-foreground tracking-tight">Make an enquiry</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Send us a detailed message and our team will get back to you.
            </p>
            <ContactFormModal
              trigger={
                <button className="inline-flex items-center gap-1.5 text-[11px] font-bold text-secondary group-hover:gap-2.5 transition-all duration-300 cursor-pointer tracking-wider uppercase">
                  Send an enquiry <ArrowRight className="h-3.5 w-3.5" />
                </button>
              }
            />
          </div>

          {/* Phone */}
          <a
            href="tel:+447760512084"
            className="group rounded-2xl border border-border/20 bg-card p-10 flex flex-col items-center text-center space-y-5 cursor-pointer hover:shadow-large hover:-translate-y-1 transition-all duration-500"
          >
            <div className="h-14 w-14 rounded-2xl bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:scale-105 transition-all duration-500">
              <Phone className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
            </div>
            <h3 className="text-lg font-bold text-foreground tracking-tight">Give us a call</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Speak to our friendly team on
              <br />
              <strong className="text-foreground text-base">07760 512 084</strong>
            </p>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary group-hover:gap-2.5 transition-all duration-300 tracking-wider uppercase">
              Call now <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
});

GetInTouchSection.displayName = "GetInTouchSection";
export default GetInTouchSection;
