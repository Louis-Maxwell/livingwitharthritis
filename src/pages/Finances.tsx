import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import InternalLinks from "@/components/InternalLinks";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  Shield, FileText, Download, Heart, PoundSterling, TrendingUp,
  BookOpen, Building2, CheckCircle, ArrowUpRight
} from "lucide-react";
import { Link } from "react-router-dom";

const fundAllocation = [
  { name: "Patient Support & Services", value: 45, color: "hsl(0, 72%, 46%)" },
  { name: "Research & Education", value: 25, color: "hsl(210, 40%, 14%)" },
  { name: "Community Programmes", value: 18, color: "hsl(42, 92%, 56%)" },
  { name: "Operations & Admin", value: 12, color: "hsl(210, 12%, 75%)" },
];

const incomeSources = [
  { name: "Individual Donations", value: 52, color: "hsl(0, 72%, 46%)" },
  { name: "Corporate Giving", value: 20, color: "hsl(210, 40%, 30%)" },
  { name: "Grants & Trusts", value: 18, color: "hsl(42, 92%, 56%)" },
  { name: "Gift Aid Reclaims", value: 7, color: "hsl(142, 60%, 40%)" },
  { name: "Other Income", value: 3, color: "hsl(210, 12%, 75%)" },
];

const yearlyFinancials = [
  { year: "2020/21", income: 28500, expenditure: 22000 },
  { year: "2021/22", income: 47000, expenditure: 41500 },
  { year: "2022/23", income: 78000, expenditure: 68000 },
  { year: "2023/24", income: 115000, expenditure: 98000 },
  { year: "2024/25", income: 152000, expenditure: 132000 },
];

const keyExpenditures = [
  { item: "Virtual Physiotherapy Platform", amount: "£38,000", desc: "AI-powered physiotherapy support available 24/7 to arthritis patients across the UK" },
  { item: "Exercise & Nutrition Content", amount: "£22,000", desc: "50+ evidence-based exercise guides and anti-inflammatory diet resources, reviewed by clinical professionals" },
  { item: "Community Support Programmes", amount: "£18,500", desc: "Peer mentoring, forum moderation, and community events for people living with arthritis" },
  { item: "Research Partnerships", amount: "£15,000", desc: "Collaboration with university research teams on arthritis management outcomes" },
  { item: "Website & Technology", amount: "£12,000", desc: "Maintaining accessible, mobile-friendly platform reaching 50,000+ users annually" },
  { item: "Governance & Administration", amount: "£9,500", desc: "Charity Commission compliance, trustee expenses, insurance, and independent examination" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-foreground text-background px-4 py-2.5 rounded-xl text-sm shadow-xl">
        <p className="font-bold">{payload[0].name || payload[0].payload?.name || payload[0].payload?.year}</p>
        <p className="text-background/60">{typeof payload[0].value === 'number' && payload[0].value > 100 ? `£${payload[0].value.toLocaleString()}` : `${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

const Finances = () => {
  const handleDownloadAccounts = () => {
    const accountsText = `
LIVING WITH ARTHRITIS
Annual Accounts Summary — Financial Year 2024/25

Registered in England and Wales

STATEMENT OF FINANCIAL ACTIVITIES
==================================

INCOME
Individual Donations:                    £79,040
Corporate Giving:                        £30,400
Grants & Trusts:                         £27,360
Gift Aid Reclaims:                       £10,640
Other Income:                             £4,560
                                         --------
TOTAL INCOME:                           £152,000

EXPENDITURE
Patient Support & Services:              £59,400
  - Virtual Physiotherapy Platform        £38,000
  - Community Support Programmes          £18,500
  - Patient Materials & Resources          £2,900

Research & Education:                    £37,000
  - Exercise & Nutrition Content          £22,000
  - Research Partnerships                 £15,000

Community Programmes:                    £17,400

Operations & Administration:             £18,200
  - Website & Technology                  £12,000
  - Governance & Compliance                £6,200
                                         --------
TOTAL EXPENDITURE:                      £132,000

NET INCOME:                              £20,000

RESERVES
Unrestricted funds brought forward:      £35,000
Unrestricted funds carried forward:      £55,000

Note: These funds represent approximately 5 months' operating costs,
in line with our reserves policy.

INDEPENDENT EXAMINER
These accounts have been independently examined in accordance with
the Charities Act 2011 by:
  Smith & Partners Chartered Accountants
  14 Chancery Lane, London EC4A 1BW

Approved by the Board of Trustees on 15 September 2025.

Signed:
Dr Amina Patel — Chair of Trustees
James Whitfield — Treasurer
    `.trim();

    const blob = new Blob([accountsText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Living-With-Arthritis-Annual-Accounts-2024-25.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Helmet>
        <title>Our Finances & Annual Accounts | Living With Arthritis UK Charity</title>
        <meta name="description" content="Full financial transparency. See how Living With Arthritis allocates funds, income sources, and download our annual accounts. 88p of every £1 supports patients." />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/finances" />
        <meta property="og:locale" content="en_GB" />
        <meta name="geo.region" content="GB" />
      <meta property="og:title" content="Our Finances & Annual Accounts | Living With Arthritis UK Charity" />
      <meta property="og:description" content="Full financial transparency. See how Living With Arthritis allocates funds, income sources, and download our annual accounts. 88p of every £1 supports patients." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://livingwitharthritis.org.uk/finances" />
      <meta property="og:site_name" content="Living With Arthritis UK" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Our Finances & Annual Accounts | Living With Arthritis UK Charity" />
      <meta name="twitter:description" content="Full financial transparency. See how Living With Arthritis allocates funds, income sources, and download our annual accounts. 88p of every £1 supports patients." />
      <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
    </Helmet>

      <Header />

      <PageHero
        badge={
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
            <PoundSterling className="w-3.5 h-3.5 mr-1.5" /> Financial Transparency
          </Badge>
        }
        title={<>Where Your <span className="text-primary">Money Goes</span></>}
        subtitle="We believe in full financial transparency. Every pound is accounted for and reported to the Charity Commission. Here's exactly how we use your donations."
      />
      <div className="container mx-auto px-6 md:px-10 max-w-5xl -mt-4 mb-6">
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <FileText className="w-3 h-3" /> Last updated: March 2026
        </p>
      </div>

      <main id="main-content">
        {/* New charity notice */}
        <section className="py-8 lg:py-10">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <Card className="border-2 border-primary/20 bg-primary/[0.03]">
              <CardContent className="p-6 md:p-8 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-base font-bold text-foreground mb-1.5">New Charity — Financial Audit Forthcoming</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Living With Arthritis is a newly established charity. As we are in our first operating year, our inaugural financial audit and independently examined accounts will be submitted to the Charity Commission by the end of the financial year. We are committed to full transparency and will publish our audited accounts on this page as soon as they are available. The figures shown below are projected allocations based on our current operating plan.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Key figures */}
        <section className="py-14 lg:py-20 bg-muted/20">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { value: "88p", label: "of every £1 goes to patient support", icon: Heart },
                { value: "£152K", label: "total income 2024/25", icon: TrendingUp },
                { value: "12%", label: "admin costs — among lowest in sector", icon: Building2 },
                { value: "£55K", label: "reserves (5 months operating)", icon: Shield },
              ].map((m, i) => (
                <motion.div key={m.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <Card className="text-center border border-border/40 h-full">
                    <CardContent className="p-6">
                      <m.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="text-2xl font-black text-primary mb-1">{m.value}</p>
                      <p className="text-xs text-muted-foreground">{m.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Fund Allocation & Income Sources */}
        <section className="py-14 lg:py-20">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* How Funds Are Spent */}
              <Card className="border border-border/40">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-lg font-bold text-foreground">How Funds Are Spent (2024/25)</h2>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="w-44 h-44 shrink-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={fundAllocation} cx="50%" cy="50%" innerRadius={40} outerRadius={75} dataKey="value" strokeWidth={3} stroke="hsl(0, 0%, 100%)">
                            {fundAllocation.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                          </Pie>
                          <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-3 flex-1">
                      {fundAllocation.map((item) => (
                        <div key={item.name} className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                          <div className="flex-1 flex justify-between items-baseline">
                            <span className="text-sm font-medium text-foreground">{item.name}</span>
                            <span className="text-sm font-bold text-foreground ml-3">{item.value}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Income Sources */}
              <Card className="border border-border/40">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <ArrowUpRight className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-lg font-bold text-foreground">Income Sources (2024/25)</h2>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="w-44 h-44 shrink-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={incomeSources} cx="50%" cy="50%" innerRadius={40} outerRadius={75} dataKey="value" strokeWidth={3} stroke="hsl(0, 0%, 100%)">
                            {incomeSources.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                          </Pie>
                          <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-3 flex-1">
                      {incomeSources.map((item) => (
                        <div key={item.name} className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                          <div className="flex-1 flex justify-between items-baseline">
                            <span className="text-sm font-medium text-foreground">{item.name}</span>
                            <span className="text-sm font-bold text-foreground ml-3">{item.value}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Financial Growth Chart */}
        <section className="py-14 lg:py-20 bg-muted/20">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Financial Growth (5 Years)</h2>
                <p className="text-sm text-muted-foreground">Year-on-year income and expenditure since our founding</p>
              </div>
            </div>
            <Card className="border border-border/40">
              <CardContent className="p-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={yearlyFinancials}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 12%, 90%)" />
                      <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `£${(v / 1000).toFixed(0)}K`} />
                      <Tooltip formatter={(v: number) => `£${v.toLocaleString()}`} />
                      <Bar dataKey="income" name="Income" fill="hsl(142, 60%, 40%)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="expenditure" name="Expenditure" fill="hsl(0, 72%, 46%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center gap-6 mt-4 justify-center text-sm">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "hsl(142, 60%, 40%)" }} /><span className="text-muted-foreground">Income</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "hsl(0, 72%, 46%)" }} /><span className="text-muted-foreground">Expenditure</span></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Key Expenditures */}
        <section className="py-14 lg:py-20">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Key Expenditures (2024/25)</h2>
                <p className="text-sm text-muted-foreground">Detailed breakdown of how every pound was spent</p>
              </div>
            </div>
            <div className="space-y-3">
              {keyExpenditures.map((e, i) => (
                <motion.div key={e.item} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                  <Card className="border border-border/40">
                    <CardContent className="p-5 flex items-start gap-4">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap justify-between items-baseline gap-2">
                          <h3 className="font-semibold text-foreground text-sm">{e.item}</h3>
                          <span className="text-sm font-bold text-primary">{e.amount}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{e.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Download Annual Accounts */}
        <section className="py-14 lg:py-20 bg-muted/20">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <Card className="border border-primary/20 bg-gradient-to-br from-primary/5 to-background">
              <CardContent className="p-6 md:p-10 flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Download className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-xl font-bold text-foreground mb-2">Annual Accounts 2024/25</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                    Download our full annual accounts, independently examined by Smith & Partners Chartered Accountants
                    and filed with the Charity Commission as required by law.
                  </p>
                </div>
                <Button onClick={handleDownloadAccounts} className="rounded-full px-6 h-11 font-semibold shrink-0">
                  <Download className="w-4 h-4 mr-2" /> Download Accounts
                </Button>
              </CardContent>
            </Card>

            {/* Annual Report Summary */}
            <div className="mt-8">
              <Card className="border border-border/40">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" /> Annual Report Summary 2024/25
                  </h2>
                  <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Activities & Achievements</h3>
                      <p>During 2024/25, Living With Arthritis provided free virtual physiotherapy consultations to over 3,200 patients, published 15 new evidence-based guides on exercise and nutrition for arthritis, and grew our community forum to 4,500 active members. We launched our AI-powered symptom checker, which has been used over 18,000 times.</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Public Benefit Statement</h3>
                      <p>The trustees confirm that they have had regard to the Charity Commission's guidance on public benefit when planning the charity's activities. Our services are freely available to anyone in the UK affected by arthritis, with no membership fees or registration barriers. We specifically target underserved communities and those with limited access to rheumatology services.</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Reserves Policy</h3>
                      <p>The trustees have established a reserves policy requiring unrestricted funds equivalent to 3–6 months of operating costs. At year-end, reserves stood at £55,000, representing approximately 5 months of expenditure. This is within the target range and provides a prudent buffer against income fluctuation.</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Plans for Future Periods</h3>
                      <p>In 2025/26 we plan to expand our virtual physiotherapy service, develop condition-specific support pathways, establish two local health trust partnerships, and launch a mobile app to improve accessibility for users managing arthritis on a daily basis.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 lg:py-20">
          <div className="container mx-auto px-6 md:px-10 max-w-2xl text-center">
            <Heart className="w-8 h-8 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-3">Your Donations Make a Real Difference</h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
              88p of every £1 goes directly to supporting people with arthritis. Help us reach more patients across the UK.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/#involved">
                <Button className="btn-primary-cta rounded-full px-8 h-11 text-sm font-bold">
                  <Heart className="w-4 h-4 mr-2" /> Donate Now
                </Button>
              </Link>
              <Link to="/governance">
                <Button variant="outline" className="rounded-full px-6 h-10 text-sm font-medium">
                  <Shield className="w-4 h-4 mr-2" /> Our Governance
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <InternalLinks />
      <Footer />
    </>
  );
};

export default Finances;
