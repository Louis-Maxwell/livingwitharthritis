import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, MapPin, Phone, Globe, Search, Hospital, Briefcase, GraduationCap, ShieldCheck, Heart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

type Resource = {
  name: string;
  description: string;
  region: string;
  url?: string;
  phone?: string;
  tags: string[];
  featured?: boolean;
};

const resources: Record<string, Resource[]> = {
  "Health Services": [
    { name: "Rheumatology Referral", description: "Ask your GP for an urgent referral if you have persistent joint swelling, morning stiffness lasting over 30 minutes, or rapid onset of multiple joint pain. Target: 18-week pathway.", region: "Nationwide", url: "https://www.nhs.uk/conditions/rheumatoid-arthritis/", tags: ["Referral", "the health service"], featured: true },
    { name: "First Contact Practitioners (FCPs)", description: "HCPC-registered physiotherapists based in GP surgeries who can assess, diagnose, and manage musculoskeletal conditions without needing a GP referral first.", region: "England", url: "https://www.csp.org.uk/professional-clinical/first-contact-physiotherapy", tags: ["Physio", "GP"], featured: true },
    { name: "the health service Physiotherapy Self-Referral", description: "In most areas of England, you can self-refer to the health service physiotherapy without seeing your GP first. Check your local local health trust website for details.", region: "England", tags: ["Physio", "Self-referral"] },
    { name: "Scottish Musculoskeletal Pathway", description: "Scotland's integrated musculoskeletal service provides direct access to physiotherapy, podiatry, and occupational therapy.", region: "Scotland", url: "https://www.nhsinform.scot/illnesses-and-conditions/muscle-bone-and-joints/", tags: ["Scotland", "MSK"] },
    { name: "Wales Musculoskeletal Services", description: "Wales's health service provides physiotherapy services through local health boards. Self-referral is available in most areas.", region: "Wales", tags: ["Wales", "Physio"] },
    { name: "Northern Ireland Rheumatology", description: "Rheumatology services are provided through HSC Trusts. The Belfast Trust has one of the largest rheumatology departments in the UK.", region: "Northern Ireland", tags: ["NI", "Rheumatology"] },
  ],
  "Charities & Support": [
    { name: "Versus Arthritis", description: "The UK's largest arthritis charity. Provides information, support services, helpline, research funding, and campaigning. Helpline: free, confidential advice from trained advisors.", region: "Nationwide", url: "https://www.versusarthritis.org", phone: "0800 5200 520", tags: ["Helpline", "Information"], featured: true },
    { name: "National Rheumatoid Arthritis Society (NRAS)", description: "Specialist support for people with RA and JIA. Offers helpline, publications, self-management programmes, and healthcare professional support.", region: "Nationwide", url: "https://nras.org.uk", phone: "0800 298 7650", tags: ["RA", "Helpline"], featured: true },
    { name: "Psoriasis Association", description: "Support and information for people with psoriasis and psoriatic arthritis. Offers fact sheets, forums, and healthcare professional resources.", region: "Nationwide", url: "https://www.psoriasis-association.org.uk", tags: ["PsA", "Psoriasis"] },
    { name: "Arthritis Action", description: "Self-management focused charity. Provides practical support including physiotherapy, dietetics, and self-management courses.", region: "Nationwide", url: "https://www.arthritisaction.org.uk", tags: ["Self-management"] },
    { name: "Pain Concern", description: "Scottish-based charity supporting people with chronic pain. Helpline, information resources, and the Airing Pain podcast.", region: "Nationwide", url: "https://painconcern.org.uk", phone: "0300 123 0789", tags: ["Pain", "Scotland"] },
    { name: "Disability Rights UK", description: "Information on disability benefits, employment rights, and independent living for people with long-term conditions.", region: "Nationwide", url: "https://www.disabilityrightsuk.org", tags: ["Benefits", "Rights"] },
  ],
  "Benefits & Financial": [
    { name: "Personal Independence Payment (PIP)", description: "UK disability benefit for people aged 16-66 with long-term health conditions or disabilities. Arthritis can qualify if it significantly affects daily living or mobility.", region: "England, Wales, Scotland", url: "https://www.gov.uk/pip", tags: ["PIP", "Benefits"], featured: true },
    { name: "Adult Disability Payment (ADP)", description: "Scotland's replacement for PIP, administered by Social Security Scotland. Similar eligibility criteria but with a different application process.", region: "Scotland", url: "https://www.socialsecurity.gov.scot/benefits/adult-disability-payment", tags: ["Scotland", "Benefits"] },
    { name: "Attendance Allowance", description: "For people over State Pension age who need help with personal care due to disability. Two rates: £72.65/week (daytime or night) or £108.55/week (both).", region: "Nationwide", url: "https://www.gov.uk/attendance-allowance", tags: ["Over 66", "Benefits"] },
    { name: "Access to Work", description: "Government programme funding workplace adjustments for disabled people. Can cover ergonomic equipment, support workers, and travel costs.", region: "England, Wales, Scotland", url: "https://www.gov.uk/access-to-work", tags: ["Employment", "Workplace"] },
    { name: "Blue Badge Scheme", description: "Parking concession for people with severe mobility problems. Arthritis patients may qualify depending on walking ability and pain levels.", region: "Nationwide", url: "https://www.gov.uk/apply-blue-badge", tags: ["Mobility", "Parking"] },
    { name: "Turn2us Benefits Calculator", description: "Free, independent tool to check which benefits you may be entitled to based on your circumstances.", region: "Nationwide", url: "https://benefits-calculator.turn2us.org.uk", tags: ["Calculator", "Free"] },
  ],
  "Equipment & Aids": [
    { name: "the health service Equipment Services", description: "Your local authority or local health trust can provide mobility aids, daily living equipment, and home adaptations through an occupational therapy assessment.", region: "Nationwide", tags: ["the health service", "OT"], featured: true },
    { name: "Disabled Living Foundation (DLF)", description: "Charity providing impartial advice on daily living equipment. Their website has product reviews, fact sheets, and a helpline.", region: "Nationwide", url: "https://www.dlf.org.uk", phone: "0300 999 0004", tags: ["Equipment", "Advice"] },
    { name: "Motability Scheme", description: "Lease a new car, powered wheelchair, or scooter using your mobility allowance from PIP or War Pensioners' Mobility Supplement.", region: "Nationwide", url: "https://www.motability.co.uk", tags: ["Mobility", "Vehicle"] },
    { name: "Disabled Facilities Grant", description: "Local authority grant for home adaptations (up to £30,000 in England) including stairlifts, bathroom modifications, and wider doorways.", region: "England", url: "https://www.gov.uk/disabled-facilities-grants", tags: ["Home", "Grant"] },
  ],
  "Research & Clinical Trials": [
    { name: "NIHR Be Part of Research", description: "Find and volunteer for arthritis-related clinical trials and research studies across the UK. Searchable database of active studies.", region: "Nationwide", url: "https://bepartofresearch.nihr.ac.uk", tags: ["Trials", "Research"], featured: true },
    { name: "Versus Arthritis Centre for Sport, Exercise & Osteoarthritis Research", description: "Multi-university research centre studying the role of exercise in OA prevention and management.", region: "Nationwide", url: "https://www.versusarthritis.org/research/", tags: ["Research", "Exercise"] },
    { name: "UK Biobank", description: "Large-scale biomedical database and research resource containing genetic, lifestyle, and health information from 500,000 UK participants.", region: "Nationwide", url: "https://www.ukbiobank.ac.uk", tags: ["Genetics", "Data"] },
    { name: "OMERACT", description: "International initiative to improve outcome measures in rheumatology clinical trials. Involves patient research partners.", region: "International", url: "https://omeract.org", tags: ["International", "Outcomes"] },
  ],
};

const categoryIcons: Record<string, React.ElementType> = {
  "Health Services": Hospital,
  "Charities & Support": Heart,
  "Benefits & Financial": Briefcase,
  "Equipment & Aids": ShieldCheck,
  "Research & Clinical Trials": GraduationCap,
};

export default function ResourceDirectory() {
  const [search, setSearch] = useState("");

  const categories = Object.keys(resources);

  const filterResources = (items: Resource[]) =>
    items.filter(r =>
      !search || r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase()) ||
      r.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    );

  return (
    <>
      <Helmet>
        <title>UK Arthritis Resource Directory – the health service, Charities, Benefits | Living With Arthritis</title>
        <meta name="description" content="Comprehensive directory of UK arthritis resources: health services, charities, benefits, equipment, and research. Curated by healthcare professionals for patients and carers." />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/resources-directory" />
      <meta property="og:title" content="UK Arthritis Resource Directory – the health service, Charities, Benefits | Living With Arthritis" />
      <meta property="og:description" content="Comprehensive directory of UK arthritis resources: health services, charities, benefits, equipment, and research. Curated by healthcare professionals for patients and carers." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://livingwitharthritis.org.uk/resources-directory" />
      <meta property="og:site_name" content="Living With Arthritis UK" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="UK Arthritis Resource Directory – the health service, Charities, Benefits | Living With Arthritis" />
      <meta name="twitter:description" content="Comprehensive directory of UK arthritis resources: health services, charities, benefits, equipment, and research. Curated by healthcare professionals for patients and carers." />
      <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
    </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main id="main-content">
          <PageHero
            title="UK Arthritis Resource Directory"
            subtitle="A curated directory of health services, charities, benefits, equipment, and research opportunities — everything you need in one place."
          />

          {/* Search */}
          <section className="py-6 bg-muted/30 border-y border-border/50">
            <div className="container mx-auto px-4 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search resources by name, keyword, or region..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </section>

          {/* Directory */}
          <section className="py-12">
            <div className="container mx-auto px-4 max-w-5xl">
              <Tabs defaultValue={categories[0]} className="space-y-6">
                <TabsList className="flex flex-wrap h-auto gap-1 bg-transparent p-0">
                  {categories.map(cat => {
                    const Icon = categoryIcons[cat] || Globe;
                    return (
                      <TabsTrigger key={cat} value={cat} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-1.5 text-xs sm:text-sm">
                        <Icon className="w-3.5 h-3.5" />{cat}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                {categories.map(cat => (
                  <TabsContent key={cat} value={cat} className="space-y-4">
                    {filterResources(resources[cat]).length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">No resources match your search.</p>
                    ) : (
                      filterResources(resources[cat]).map(r => (
                        <Card key={r.name} className={`border-border/50 ${r.featured ? "ring-1 ring-primary/20" : ""}`}>
                          <CardContent className="p-5">
                            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                              <div className="flex-1 space-y-2">
                                <div className="flex items-start gap-2">
                                  <h3 className="font-semibold text-foreground">{r.name}</h3>
                                  {r.featured && <Badge className="bg-primary/10 text-primary text-xs">Featured</Badge>}
                                </div>
                                <p className="text-sm text-foreground/80 leading-relaxed">{r.description}</p>
                                <div className="flex flex-wrap items-center gap-2">
                                  <Badge variant="outline" className="gap-1 text-xs"><MapPin className="w-3 h-3" />{r.region}</Badge>
                                  {r.tags.map(t => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
                                </div>
                              </div>
                              <div className="flex flex-col gap-2 sm:items-end shrink-0">
                                {r.url && (
                                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
                                    Visit website <ExternalLink className="w-3 h-3" />
                                  </a>
                                )}
                                {r.phone && (
                                  <a href={`tel:${r.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                                    <Phone className="w-3 h-3" />{r.phone}
                                  </a>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </section>

          {/* Cross-links */}
          <section className="bg-primary/5 py-12">
            <div className="container mx-auto px-4 text-center max-w-2xl space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Can't Find What You Need?</h2>
              <p className="text-muted-foreground">Our AI assistant can help you find specific resources, or browse our local support pages for your area.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild><Link to="/chat">Ask Our AI Assistant</Link></Button>
                <Button variant="outline" asChild><Link to="/arthritis-support">Find Local Support</Link></Button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
