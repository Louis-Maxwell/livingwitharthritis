import { Phone, Mail, MessageCircle, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import {
  CONTACT_PHONE,
  CONTACT_PHONE_TEL,
  CONTACT_EMAILS,
} from "@/config/contact";

const WHATSAPP_URL = `https://wa.me/44${CONTACT_PHONE_TEL.replace(/^0/, "")}`;

const trackClick = (channel: string) => {
  try {
    (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.(
      "event",
      "helpline_click",
      { channel },
    );
  } catch {
    /* no-op */
  }
};

/**
 * Full-width helpline strip — placed above the footer on every page.
 * Renders the four contact channels (phone, email, WhatsApp, form) with
 * shared GA tracking. Uses brand red token for the band itself; channel
 * cards use card surface so the band reads scannably on any page.
 */
export default function HelplineWidget() {
  return (
    <section
      aria-labelledby="helpline-heading"
      className="bg-primary text-primary-foreground"
    >
      <div className="container mx-auto px-4 md:px-6 py-10 md:py-12 max-w-6xl">
        <div className="text-center mb-8">
          <h2
            id="helpline-heading"
            className="font-display text-2xl md:text-3xl font-black tracking-tight"
          >
            We’re here to help
          </h2>
          <p className="mt-2 text-sm md:text-base text-primary-foreground/90 max-w-2xl mx-auto">
            A real person — not a chatbot — replies within 2 working days.
            Available Monday to Friday, 9am – 5pm.
          </p>
        </div>

        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <li>
            <a
              href={`tel:${CONTACT_PHONE_TEL}`}
              onClick={() => trackClick("phone")}
              className="flex flex-col items-center text-center gap-2 p-4 md:p-5 rounded-xl bg-background text-foreground hover:bg-background/95 transition-colors h-full"
            >
              <Phone className="w-6 h-6 text-primary" aria-hidden />
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Call
              </span>
              <span className="font-bold text-sm md:text-base text-foreground">
                {CONTACT_PHONE}
              </span>
            </a>
          </li>

          <li>
            <a
              href={`mailto:${CONTACT_EMAILS.info}`}
              onClick={() => trackClick("email")}
              className="flex flex-col items-center text-center gap-2 p-4 md:p-5 rounded-xl bg-background text-foreground hover:bg-background/95 transition-colors h-full"
            >
              <Mail className="w-6 h-6 text-primary" aria-hidden />
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Email
              </span>
              <span className="font-semibold text-xs md:text-sm break-all">
                {CONTACT_EMAILS.info}
              </span>
            </a>
          </li>

          <li>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick("whatsapp")}
              className="flex flex-col items-center text-center gap-2 p-4 md:p-5 rounded-xl bg-background text-foreground hover:bg-background/95 transition-colors h-full"
            >
              <MessageCircle className="w-6 h-6 text-primary" aria-hidden />
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                WhatsApp
              </span>
              <span className="font-bold text-sm md:text-base">
                Chat with us
              </span>
            </a>
          </li>

          <li>
            <Link
              to="/contact"
              onClick={() => trackClick("form")}
              className="flex flex-col items-center text-center gap-2 p-4 md:p-5 rounded-xl bg-background text-foreground hover:bg-background/95 transition-colors h-full"
            >
              <MessageSquare className="w-6 h-6 text-primary" aria-hidden />
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Contact form
              </span>
              <span className="font-bold text-sm md:text-base">
                Send a message
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
