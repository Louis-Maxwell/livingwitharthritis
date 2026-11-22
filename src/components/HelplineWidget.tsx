import { Phone, Mail, MessageCircle, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { trackHelplineEngagement, type ContactChannel } from "@/lib/analytics";
import {
  CONTACT_PHONE,
  CONTACT_PHONE_TEL,
  CONTACT_EMAILS,
} from "@/config/contact";

const WHATSAPP_URL = `https://wa.me/44${CONTACT_PHONE_TEL.replace(/^0/, "")}`;


/**
 * Full-width helpline strip — placed above the footer on every page.
 * Renders the four contact channels (phone, email, WhatsApp, form) with
 * shared GA tracking. Uses brand red token for the band itself; channel
 * cards use card surface so the band reads scannably on any page.
 */
type Channel = {
  Icon: typeof Phone;
  eyebrow: string;
  value: string;
  sub: string;
  href: string;
  external?: boolean;
  track: ContactChannel;
};

const channels: Channel[] = [
  {
    Icon: Phone,
    eyebrow: "Call",
    value: CONTACT_PHONE,
    sub: "Opens your phone app",
    href: `tel:${CONTACT_PHONE_TEL}`,
    track: "phone",
  },
  {
    Icon: Mail,
    eyebrow: "Email",
    value: CONTACT_EMAILS.info,
    sub: "Opens your email app",
    href: `mailto:${CONTACT_EMAILS.info}`,
    track: "email",
  },
  {
    Icon: MessageCircle,
    eyebrow: "WhatsApp",
    value: "Chat with us",
    sub: "Opens WhatsApp in a new tab",
    href: WHATSAPP_URL,
    external: true,
    track: "whatsapp",
  },
  {
    Icon: MessageSquare,
    eyebrow: "Contact form",
    value: "Prepare a message",
    sub: "Prepare an email draft to review and send",
    href: "/contact",
    track: "contact_form",
  },
];

export default function HelplineWidget() {
  return (
    <section
      aria-labelledby="helpline-heading"
      className="bg-primary text-primary-foreground min-h-[320px] sm:min-h-[300px] lg:min-h-[280px]"
    >
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 max-w-6xl">
        <div className="text-center mb-10">
          <h2
            id="helpline-heading"
            className="font-display text-3xl md:text-4xl font-black tracking-tight"
          >
            We’re here to help
          </h2>
          <p className="mt-3 text-sm md:text-base text-primary-foreground/90 max-w-2xl mx-auto">
            Choose a contact option below. Our contact form prepares an email
            draft for you to review and send from your own email app.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {channels.map(({ Icon, eyebrow, value, sub, href, external, track }) => {
            const cardClass =
              "group relative flex w-full min-w-0 flex-col items-center text-center gap-3 p-6 rounded-2xl bg-white text-foreground shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60";
            const inner = (
              <>
                <span
                  className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300"
                  aria-hidden
                >
                  <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                  {eyebrow}
                </span>
                <span className="w-full min-w-0 font-bold text-sm md:text-base text-foreground [overflow-wrap:anywhere] leading-snug">
                  {track === "email" ? (
                    value.split(/([@.])/).map((part, index) => (
                      <span key={index}>{part}{/[@.]/.test(part) && <wbr />}</span>
                    ))
                  ) : value}
                </span>
                <span className="text-xs text-muted-foreground">{sub}</span>
              </>
            );
            return (
              <li key={eyebrow} className="min-w-0">
                {external ? (
                  <a
                    id={track === 'whatsapp' ? 'footer-whatsapp' : undefined}
                    href={href}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    onClick={() => trackHelplineEngagement(track)}
                    className={cardClass}
                  >
                    {inner}
                  </a>
                ) : href.startsWith("/") ? (
                  <Link to={href} onClick={() => trackHelplineEngagement(track)} className={cardClass}>
                    {inner}
                  </Link>
                ) : (
                  <a href={href} onClick={() => trackHelplineEngagement(track)} className={cardClass}>
                    {inner}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
