/**
 * text.com-style logo proof band — cream background, evenly spaced
 * trust marks (HCPC, CSP, NICE, Charity Commission, Stripe). Renders
 * as plain text wordmarks in Fraunces so we don't fabricate logos.
 */
const marks = [
  { name: "HCPC", note: "Registered" },
  { name: "CSP", note: "Member" },
  { name: "NICE", note: "Aligned" },
  { name: "Charity Commission", note: "Governed" },
  { name: "Stripe", note: "Secure" },
];

const LogoProofBand = () => {
  return (
    <section
      aria-label="Trust and accreditation"
      className="bg-background py-12 md:py-16"
    >
      <div className="container mx-auto px-6 md:px-10">
        <p className="text-center font-sans text-[11px] tracking-[0.3em] uppercase text-foreground/60 mb-8">
          Clinically governed by
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-10 items-center">
          {marks.map((m) => (
            <div key={m.name} className="flex flex-col items-center text-center">
              <span className="font-display font-black text-2xl md:text-3xl text-foreground/85 tracking-tight">
                {m.name}
              </span>
              <span className="mt-1 font-sans text-[10px] tracking-[0.25em] uppercase text-foreground/50">
                {m.note}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoProofBand;
