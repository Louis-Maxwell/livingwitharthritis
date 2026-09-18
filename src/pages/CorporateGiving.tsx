import { submitContactInquiry } from "@/lib/backendSubmit";
import { CONTACT_EMAILS } from "@/config/contact";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Building2, Heart, Users, Award, Handshake, CheckCircle, ArrowRight, Shield, Mail } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const inquirySchema = z.object({
  contact_name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  organization_name: z.string().trim().max(200).optional(),
  inquiry_type: z.string().min(1, "Please select a partnership type"),
  phone: z.string().trim().max(20).optional(),
  message: z.string().trim().max(5000).optional(),
});

const tiers = [
  {
    name: "Bronze Partner",
    amount: "£1,000 – £4,999",
    color: "from-primary/10 to-primary/5 border-primary/20",
    icon: "text-primary",
    benefits: [
      "Logo on our website",
      "Social media recognition",
      "Quarterly impact report",
      "Certificate of partnership",
    ],
  },
  {
    name: "Silver Partner",
    amount: "£5,000 – £14,999",
    color: "from-primary/10 to-primary/5 border-primary/20",
    icon: "text-primary",
    benefits: [
      "Everything in Bronze",
      "Featured case study",
      "Staff wellness workshops",
      "Co-branded materials",
      "Annual impact presentation",
    ],
  },
  {
    name: "Gold Partner",
    amount: "£15,000 – £49,999",
    color: "from-primary/10 to-primary/5 border-primary/20",
    icon: "text-primary",
    benefits: [
      "Everything in Silver",
      "Named programme sponsorship",
      "VIP event invitations",
      "Executive board briefings",
      "PR & media opportunities",
      "Matched giving programme",
    ],
  },
  {
    name: "Platinum Partner",
    amount: "£50,000+",
    color: "from-primary/10 to-primary/5 border-primary/20",
    icon: "text-primary",
    benefits: [
      "Everything in Gold",
      "Strategic advisory seat",
      "Custom impact programme",
      "National campaign partnership",
      "Employee volunteering days",
      "Annual gala table",
      "Bespoke reporting dashboard",
    ],
  },
];

const CorporateGiving = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    contact_name: "",
    email: "",
    organization_name: "",
    inquiry_type: "",
    phone: "",
    message: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = inquirySchema.safeParse(formData);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0]?.message || "Please check your input");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitContactInquiry({
        name: parsed.data.contact_name,
        email: parsed.data.email,
        phone: parsed.data.phone || undefined,
        subject: "Corporate giving enquiry",
        message: [
          parsed.data.organization_name ? "Organisation: " + parsed.data.organization_name : "",
          "Type: " + parsed.data.inquiry_type,
          parsed.data.message ? parsed.data.message : "",
        ].filter(Boolean).join("\n"),
      });
      if (result.via === "mailto") {
        toast.message(result.message);
        setFormData({ contact_name: "", email: "", organization_name: "", inquiry_type: "", phone: "", message: "" });
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error(`Something went wrong. Please email ${CONTACT_EMAILS.info}.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Corporate Giving & Partnerships UK | Living With Arthritis</title>
        <meta name="description" content="Partner with Living With Arthritis UK (charity 1218461) through corporate sponsorship, matched giving, employee wellness and CSR partnerships." />
        <meta name="keywords" content="corporate giving arthritis UK, arthritis charity partnership, CSR arthritis UK, corporate sponsorship charity, employee wellness arthritis, matched giving UK, arthritis fundraising corporate, charity partnership UK" />
        <meta property="og:title" content="Corporate Giving & Partnerships UK | Living With Arthritis" />
        <meta property="og:description" content="Partner with Living With Arthritis UK through corporate sponsorship, matched giving and employee wellness." />
        <meta property="og:url" content="https://livingwitharthritis.org.uk/corporate-giving" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:site_name" content="Living With Arthritis UK" />
        <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Corporate Giving & Partnerships | Living With Arthritis UK" />
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Corporate Giving & Partnerships UK" />
        <meta name="twitter:description" content="Corporate partnerships with Living With Arthritis UK charity 1218461." />
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="United Kingdom" />
        <link rel="alternate" hrefLang="en-GB" href="https://livingwitharthritis.org.uk/corporate-giving" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Corporate Giving & Partnerships UK",
          "description": "Corporate sponsorship and partnership opportunities with Living With Arthritis UK charity.",
          "url": "https://livingwitharthritis.org.uk/corporate-giving",
          "inLanguage": "en-GB",
          "isPartOf": { "@type": "WebSite", "name": "Living With Arthritis UK", "url": "https://livingwitharthritis.org.uk" },
          "audience": { "@type": "Audience", "audienceType": "Corporate Partners", "geographicArea": { "@type": "Country", "name": "United Kingdom" } }
        })}</script>
      </Helmet>
      <Header />
      <main id="main-content" className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-br from-primary/8 via-accent/30 to-background overflow-hidden">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-6">
                <Handshake className="w-4 h-4" />
                Corporate Partnerships
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mb-5 leading-tight">
                Together, we can make a <span className="text-primary italic">bigger impact</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Join organisations supporting people in the UK living with arthritis. 
                From matched giving to employee wellness, we'll tailor a partnership that aligns with your CSR goals.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 border-b border-border/20">
          <div className="container mx-auto px-6 md:px-10 max-w-4xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: "10M+", label: "People affected in UK", icon: Users },
                { value: "88p", label: "Of every £1 to patients", icon: Heart },
                { value: "100%", label: "Tax deductible", icon: Shield },
                { value: "CSR", label: "Partnership routes", icon: Building2 },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-1"
                >
                  <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership Tiers */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-6 md:px-10 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-foreground mb-3">Partnership Tiers</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Choose the level that fits your organisation. Every tier includes meaningful impact and recognition.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {tiers.map((tier, i) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`rounded-2xl border bg-gradient-to-b ${tier.color} p-6 flex flex-col`}
                >
                  <Award className={`w-8 h-8 ${tier.icon} mb-3`} />
                  <h3 className="text-lg font-bold text-foreground mb-1">{tier.name}</h3>
                  <p className="text-sm font-semibold text-primary mb-4">{tier.amount}</p>
                  <ul className="space-y-2 flex-1">
                    {tier.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    className="mt-5 rounded-full text-sm"
                    onClick={() => {
                      handleChange("inquiry_type", `Corporate Partnership - ${tier.name}`);
                      document.getElementById("partnership-form")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Get Started <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Ways to Partner */}
        <section className="py-16 bg-accent/30">
          <div className="container mx-auto px-6 md:px-10 max-w-4xl">
            <h2 className="text-3xl font-display font-bold text-foreground text-center mb-10">Ways to Partner</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { title: "Matched Giving", desc: "Double your employees' charitable donations with a company-matched giving programme." },
                { title: "Payroll Giving", desc: "Enable tax-efficient donations directly from employee salaries through Give As You Earn." },
                { title: "Charity of the Year", desc: "Nominate us as your Charity of the Year for a focused, high-impact partnership." },
                { title: "Sponsored Events", desc: "Sponsor or host fundraising events — from corporate runs to gala dinners." },
                { title: "Employee Wellness", desc: "Arthritis awareness workshops and ergonomic assessments for your workforce." },
                { title: "Pro Bono Support", desc: "Contribute your team's expertise in marketing, tech, legal, or finance." },
              ].map((way, i) => (
                <motion.div
                  key={way.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card rounded-xl border border-border/40 p-5"
                >
                  <h3 className="font-bold text-foreground mb-1.5">{way.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{way.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enquiry Form */}
        <section id="partnership-form" className="py-16 lg:py-20">
          <div className="container mx-auto px-6 md:px-10 max-w-xl">
            <div className="text-center mb-10">
              <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-display font-bold text-foreground mb-3">Get in Touch</h2>
              <p className="text-muted-foreground">
                Tell us about your organisation and we'll design a partnership that works for you.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Your Name *</label>
                  <Input
                    value={formData.contact_name}
                    onChange={(e) => handleChange("contact_name", e.target.value)}
                    required
                    maxLength={100}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Email *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                    maxLength={255}
                    className="rounded-xl"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Organisation</label>
                  <Input
                    value={formData.organization_name}
                    onChange={(e) => handleChange("organization_name", e.target.value)}
                    maxLength={200}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    maxLength={20}
                    className="rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Partnership Type *</label>
                <Select value={formData.inquiry_type} onValueChange={(v) => handleChange("inquiry_type", v)}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select a partnership type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Corporate Partnership - Bronze">Bronze Partner (£1k–£5k)</SelectItem>
                    <SelectItem value="Corporate Partnership - Silver">Silver Partner (£5k–£15k)</SelectItem>
                    <SelectItem value="Corporate Partnership - Gold">Gold Partner (£15k–£50k)</SelectItem>
                    <SelectItem value="Corporate Partnership - Platinum">Platinum Partner (£50k+)</SelectItem>
                    <SelectItem value="Matched Giving">Matched Giving Programme</SelectItem>
                    <SelectItem value="Charity of the Year">Charity of the Year</SelectItem>
                    <SelectItem value="Payroll Giving">Payroll Giving</SelectItem>
                    <SelectItem value="Other">Other / General Enquiry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder="Tell us about your CSR goals and how you'd like to partner..."
                  maxLength={5000}
                  rows={4}
                  className="rounded-xl"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-full btn-primary-cta text-base font-semibold"
              >
                {isSubmitting ? "Sending..." : "Send Partnership Enquiry"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                We'll respond within 2 business days. Your data is handled per our privacy policy.
              </p>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CorporateGiving;
