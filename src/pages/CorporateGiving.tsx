import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Building2, HeartHandshake, Users, ArrowRight, Mail, Check, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import SeoHead from "@/components/SeoHead";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT_EMAILS, mailto } from "@/config/contact";
import { submitContactInquiry } from "@/lib/backendSubmit";

const corporateRoutes = [
  { title: "Company donation or sponsorship", icon: Building2, text: "Explore a company gift or a sponsorship proposal, with the purpose and any recognition agreed in advance.", prompt: "Company donation or sponsorship" },
  { title: "Charity of the Year", icon: HeartHandshake, text: "Nominate Living With Arthritis and bring your team's fundraising ideas together around a shared cause.", prompt: "Charity of the Year" },
  { title: "Fund a project or programme", icon: Mail, text: "Discuss funding a specific project, campaign or educational programme. Its scope, budget and any restrictions need to be agreed first.", prompt: "Project, campaign or educational programme" },
  { title: "Community investment and ESG", icon: Users, text: "Explore support that fits your community investment or environmental, social and governance priorities. Agree meaningful objectives; no ESG rating or reporting credit is promised.", prompt: "Community investment and ESG" },
];
const employeeRoutes = [
  { title: "Payroll Giving", icon: Building2, text: "Ask whether your employer runs Payroll Giving, then check with its agency that it can accept Living With Arthritis as your chosen charity before authorising deductions.", prompt: "Payroll Giving" },
  { title: "Monthly employee giving", icon: HeartHandshake, text: "Discuss voluntary monthly gifts of £3, £5 or £10, or another affordable amount. These are suggested amounts, not subscriptions or a confirmed payment scheme.", prompt: "Monthly employee giving (£3–£10)" },
  { title: "Team fundraising", icon: Users, text: "Bring colleagues together for workplace fundraising activities or a charity challenge. Discuss the idea, practical arrangements and responsibilities before promoting it.", prompt: "Team fundraising" },
  { title: "Skills and practical support", icon: Mail, text: "Explore employee volunteering where appropriate, including skills such as design, accessibility or technology. Roles, supervision and any checks must be agreed; no placement is guaranteed.", prompt: "Skills and practical support" },
];
const matchedRoute = { title: "Employee matched giving", prompt: "Employee matched giving" };
const routes = [...corporateRoutes, ...employeeRoutes, matchedRoute];
const empty = { name: "", email: "", organisation: "", interest: "", budget: "", message: "" };

export default function CorporateGiving({ path = "/corporate-giving" }: { path?: string }) {
  const isPartnerships = path === "/corporate-partnerships";
  const pageTitle = isPartnerships ? "Corporate Partnerships" : "Corporate Giving";
  const pageHeading = isPartnerships ? "Company donation or sponsorship" : "Your business can help keep arthritis information free.";
  const pageDescription = isPartnerships ? corporateRoutes[0].text : "Explore corporate giving, employee donations and matched giving. Discuss sponsorship, fundraising or skills support with Living With Arthritis today.";
  const [form, setForm] = useState(empty);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const change = (key: keyof typeof empty, value: string) => setForm(previous => ({ ...previous, [key]: value }));
  const choose = (interest: string) => {
    change("interest", interest);
    const target = document.getElementById("partnership-form");
    target?.scrollIntoView({ behavior: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    document.getElementById("corporate-name")?.focus({ preventScroll: true });
  };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim()) { setStatus("Please enter your name."); return; }
    setBusy(true);
    setStatus("");
    try {
      const result = await submitContactInquiry({
        name: form.name.trim(), email: form.email.trim(), subject: "Corporate giving enquiry", formId: "corporate-giving",
        message: [form.organisation.trim() && `Organisation: ${form.organisation.trim()}`, `Interest: ${form.interest}`, form.budget.trim() && `Indicative budget: ${form.budget.trim()}`, form.message.trim()].filter(Boolean).join("\n"),
      });
      setStatus(result.via === "mailto" ? "Your email app should open with a draft for you to review and send. Nothing has been sent by this website. If no app opened, use the email link on this page. Your details remain here so you can copy them." : result.message);
    } catch {
      setStatus(`The draft could not be opened. Your details are still here. Please email ${CONTACT_EMAILS.info}.`);
    } finally { setBusy(false); }
  };
  return <>
    <SeoHead title={pageTitle} description={pageDescription} path={path} />
    <Helmet>
      <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", name: pageTitle, url: `https://livingwitharthritis.org.uk${path}`, inLanguage: "en-GB" })}</script>
    </Helmet>
    <Header />
    <main id="main-content" className="min-h-dvh bg-background">
      <section className="border-b border-border bg-gradient-to-br from-primary/5 via-background to-accent/30 py-12 sm:py-20">
        <div className="container max-w-6xl px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
          <div>
            <p className="text-sm font-semibold tracking-widest uppercase mb-4">For businesses and teams</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight">{pageHeading}</h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-2xl">{isPartnerships ? corporateRoutes[2].text : "Support Living With Arthritis through corporate giving, employee giving or matched donations. Start with an idea that fits your organisation."}</p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Button asChild size="lg" className="rounded-full h-auto min-h-12 whitespace-normal text-center"><a href="#partnership-form">Discuss your idea <ArrowRight aria-hidden="true" className="ml-2 w-4 h-4 shrink-0" /></a></Button>
              <Button asChild size="lg" variant="outline" className="rounded-full h-auto min-h-12 whitespace-normal text-center"><Link to="/donate">Explore donation options</Link></Button>
            </div>
          </div>
          <aside className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm" aria-label="About the charity">
            <HeartHandshake className="w-10 h-10 mb-5 text-primary" aria-hidden="true" />
            <h2 className="text-2xl font-bold">A practical place to start</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">Our website shares educational information about arthritis, movement and everyday life. Explore the resources before deciding how you would like to help.</p>
            <Link className="inline-block mt-5 underline underline-offset-4 font-medium" to="/guides">See the free guides</Link>
            <div className="mt-6 pt-5 border-t border-border text-sm space-y-2"><p>Registered charity in England and Wales</p><p className="text-xl font-bold">No. 1218461</p><p className="text-muted-foreground">Independent of Arthritis UK</p></div>
          </aside>
        </div>
      </section>
      <section className="container max-w-6xl px-5 sm:px-8 py-14 sm:py-20" aria-labelledby="ways-title">
        <p className="text-sm font-semibold uppercase tracking-widest mb-3">Choose your starting point</p>
        <h2 id="ways-title" className="text-3xl sm:text-4xl font-display font-bold">More than one way to give</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">These are ideas to discuss, not pre-agreed packages. We agree every partnership in writing, including any sponsorship, recognition, activity or reporting, before you commit.</p>
        <h3 className="text-2xl font-bold mt-8 mb-5">Corporate Giving</h3><div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{corporateRoutes.map(route => <article key={route.title} className="rounded-2xl border border-border bg-card p-6 flex flex-col"><route.icon className="w-7 h-7 text-primary mb-5" aria-hidden="true" /><h4 className="text-xl font-bold">{route.title}</h4><p className="text-muted-foreground leading-relaxed mt-3 mb-6 flex-1">{route.text}</p><Button variant="outline" className="h-auto min-h-11 whitespace-normal" onClick={() => choose(route.prompt)}>Discuss {route.title.toLowerCase()}</Button></article>)}</div>
      </section>
      {!isPartnerships && <><section className="container max-w-6xl px-5 sm:px-8 pb-14 sm:pb-20" aria-labelledby="employee-title"><h2 id="employee-title" className="text-3xl sm:text-4xl font-display font-bold">Employee Giving</h2><p className="mt-4 mb-8 max-w-2xl text-muted-foreground leading-relaxed">Make giving a voluntary choice that works for your colleagues. Start with a small regular gift, a team activity or an offer of time and skills.</p><div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{employeeRoutes.map(route => <article key={route.title} className="rounded-2xl border border-border bg-card p-6 flex flex-col"><route.icon className="w-7 h-7 text-primary mb-5" aria-hidden="true" /><h3 className="text-xl font-bold">{route.title}</h3><p className="text-muted-foreground leading-relaxed mt-3 mb-6 flex-1">{route.text}</p><Button variant="outline" className="h-auto min-h-11 whitespace-normal" onClick={() => choose(route.prompt)}>Discuss {route.title.toLowerCase()}</Button></article>)}</div>
        <aside className="mt-6 rounded-2xl border border-border p-6 bg-accent/30" aria-label="How UK Payroll Giving works"><h3 className="text-xl font-bold">How UK Payroll Giving works</h3><p className="mt-3 text-muted-foreground leading-relaxed">Through an employer-run scheme and a Payroll Giving agency, donations come from PAYE wages or a pension before Income Tax, but after National Insurance. Tax relief depends on the donor's tax rate. Agency fees may apply and Gift Aid cannot be added.</p><p className="mt-3 text-muted-foreground leading-relaxed">The receiving charity must be recognised by HMRC. Payroll Giving availability for Living With Arthritis is not confirmed on this page; check eligibility with the agency and contact us before setting it up.</p><a className="inline-block mt-4 underline underline-offset-4" href="https://www.gov.uk/payroll-giving">Read the GOV.UK Payroll Giving guidance</a></aside>
      </section>
      <section className="container max-w-6xl px-5 sm:px-8 pb-14 sm:pb-20" aria-labelledby="matched-title"><div className="rounded-3xl border border-border bg-card p-6 sm:p-10"><HeartHandshake className="w-9 h-9 text-primary mb-5" aria-hidden="true" /><h2 id="matched-title" className="text-3xl sm:text-4xl font-display font-bold">Matched Giving</h2><p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">Invite your organisation to match employee donations or fundraising. With a full £1-for-£1 match, a £10 employee gift plus £10 from the employer means £20 donated before any fees.</p><p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">Matching can give colleagues a shared fundraising goal. Check the employer's scheme, eligibility, match rate, cap and claim deadline first. No employer match or increase in staff engagement is guaranteed.</p><Button variant="outline" className="mt-6 h-auto min-h-11 whitespace-normal" onClick={() => choose(matchedRoute.prompt)}>Discuss employee matched giving</Button></div></section>
      </>}
      {isPartnerships && <section className="container max-w-6xl px-5 sm:px-8 pb-14"><h2 className="text-2xl font-bold">Employee Giving</h2><p className="mt-4 text-muted-foreground">Make giving a voluntary choice that works for your colleagues. Start with a small regular gift, a team activity or an offer of time and skills.</p><Link className="inline-block mt-4 underline underline-offset-4" to="/corporate-giving">Corporate Giving</Link></section>}
      <section className="bg-accent/30 border-y border-border py-14">
        <div className="container max-w-6xl px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div><h2 className="text-3xl font-display font-bold">A clear conversation, before a commitment</h2><ol className="mt-7 space-y-5">{[
            ["Share your idea", "Tell us what your organisation has in mind, your timescale and any indicative budget."],
            ["Discuss what is possible", "Check the proposed activity, responsibilities and any recognition or reporting you would need."],
            ["Agree the details", "Do not assume a package, event, service or use of the charity's name is confirmed until the details are agreed in writing."],
          ].map(([title, text], i) => <li key={title} className="flex gap-4"><span className="shrink-0 flex items-center justify-center rounded-full border border-border bg-background w-9 h-9 font-bold">{i + 1}</span><div><h3 className="font-bold">{title}</h3><p className="mt-1 text-muted-foreground leading-relaxed">{text}</p></div></li>)}</ol></div>
          <aside className="rounded-2xl bg-card border border-border p-6 sm:p-8"><ShieldCheck aria-hidden="true" className="w-7 h-7 text-primary mb-4" /><h2 className="text-2xl font-bold">Support with clear boundaries</h2><ul className="mt-5 space-y-4">{["A donation or sponsorship is not a clinical endorsement of a product or business.", "Please do not include patient details, health records or other sensitive information in an enquiry.", "Company gifts, sponsorship and employee giving may have different tax treatment. Check with your finance team or professional adviser; no tax saving is promised here."].map(text => <li key={text} className="flex gap-3 text-muted-foreground leading-relaxed"><Check className="w-4 h-4 shrink-0 mt-1 text-primary" aria-hidden="true" />{text}</li>)}</ul><Link className="inline-block underline underline-offset-4 mt-6" to="/governance">Read about our governance</Link></aside>
        </div>
      </section>
      <section id="partnership-form" className="container max-w-6xl px-5 sm:px-8 py-14 sm:py-20 scroll-mt-40" aria-labelledby="enquiry-title">
        <div className="grid grid-cols-1 lg:grid-cols-[.8fr_1.2fr] gap-10">
          <div><p className="uppercase tracking-widest text-sm font-semibold mb-3">Take the next step</p><h2 id="enquiry-title" className="text-3xl sm:text-4xl font-display font-bold">Tell us what you have in mind</h2><p className="mt-5 leading-relaxed text-muted-foreground">This form prepares an email draft in your own email app. Review it and press Send there. The website does not send or store your enquiry.</p><a className="inline-block mt-5 underline underline-offset-4 break-all" href={mailto("info", "Corporate giving enquiry")}>{CONTACT_EMAILS.info}</a><p className="text-sm text-muted-foreground mt-4">Prefer not to use the form? Email the same address directly.</p></div>
          <form onSubmit={submit} className="rounded-2xl border border-border p-5 sm:p-8 bg-card space-y-5">
            <p className="text-sm text-muted-foreground">Fields marked * are required.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5"><div><label htmlFor="corporate-name" className="block font-medium text-sm mb-2">Your name *</label><Input id="corporate-name" name="name" autoComplete="name" required maxLength={100} value={form.name} onChange={e => change("name", e.target.value)} /></div><div><label htmlFor="corporate-email" className="block font-medium text-sm mb-2">Work email *</label><Input id="corporate-email" name="email" type="email" autoComplete="email" required maxLength={255} value={form.email} onChange={e => change("email", e.target.value)} /></div></div>
            <div><label htmlFor="corporate-organisation" className="block font-medium text-sm mb-2">Organisation</label><Input id="corporate-organisation" name="organisation" autoComplete="organization" maxLength={200} value={form.organisation} onChange={e => change("organisation", e.target.value)} /></div>
            <div><label htmlFor="corporate-interest" className="block font-medium text-sm mb-2">I am interested in *</label><select id="corporate-interest" name="interest" required value={form.interest} onChange={e => change("interest", e.target.value)} className="flex min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"><option value="">Choose an option</option>{routes.map(route => <option key={route.prompt}>{route.prompt}</option>)}<option>Other / not sure yet</option></select></div>
            <div><label htmlFor="corporate-budget" className="block font-medium text-sm mb-2">Indicative budget, if known (optional)</label><Input id="corporate-budget" name="budget" maxLength={100} placeholder="For example, an amount or a fundraising goal" value={form.budget} onChange={e => change("budget", e.target.value)} /><p className="text-xs text-muted-foreground mt-2">An indication only, not a pledge or payment.</p></div>
            <div><label htmlFor="corporate-message" className="block font-medium text-sm mb-2">Your idea</label><Textarea id="corporate-message" name="message" maxLength={3500} rows={5} value={form.message} onChange={e => change("message", e.target.value)} placeholder="What would you like to do, and when? Please leave out sensitive personal information." /></div>
            <Button type="submit" disabled={busy} className="w-full min-h-12 h-auto whitespace-normal rounded-full">{busy ? "Preparing draft..." : "Prepare enquiry email"}</Button>
            <p role="status" aria-live="polite" className="text-sm leading-relaxed break-words">{status}</p>
            <p className="text-xs leading-relaxed text-muted-foreground">Nothing is sent until you send the draft from your email app. <Link to="/privacy" className="underline underline-offset-4">Privacy policy</Link>.</p>
          </form>
        </div>
      </section>
      <section className="container max-w-6xl px-5 sm:px-8 pb-16"><h2 className="text-2xl font-bold mb-5">Before you get in touch</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-5"><details className="rounded-xl border border-border p-5"><summary className="font-semibold cursor-pointer">Can we discuss support without choosing a tier?</summary><p className="mt-3 text-muted-foreground leading-relaxed">Yes. Use the enquiry form to describe your idea and any budget you have in mind. No package or contribution is agreed by opening a draft.</p></details><details className="rounded-xl border border-border p-5"><summary className="font-semibold cursor-pointer">Can we use the charity's name or logo?</summary><p className="mt-3 text-muted-foreground leading-relaxed">Ask first. Any logo use, publicity or sponsorship wording needs to be agreed before it is used.</p></details></div></section>
    </main>
    <Footer />
  </>;
}
