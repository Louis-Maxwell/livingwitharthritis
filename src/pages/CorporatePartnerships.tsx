import { Building2, Users, TrendingUp, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import SeoHead from "@/components/SeoHead";

/**
 * Corporate Partnerships Page
 * Purpose: Show corporate sponsors what they're funding and what ROI they get
 * (employee wellness, brand association, tax benefits)
 */
export default function CorporatePartnerships() {
  return (
    <>
      <SeoHead
        title="Corporate Partnerships"
        description="Partner with Living With Arthritis UK. Fund employee wellness, reach 2M+ arthritis patients, and make a tax-deductible impact."
        path="/corporate-partnerships"
      />

      <main className="bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Partner With UK's Leading Arthritis Charity
            </h1>
            <p className="text-xl text-slate-200 mb-8">
              Fund employee wellness. Reach 2M+ patients. Make a measurable difference.
            </p>
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              Schedule a Partnership Call
            </Button>
          </div>
        </section>

        {/* Why Partner */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Partner With Us?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-8 rounded-lg border-l-4 border-blue-600">
              <Building2 className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-xl mb-2">Employee Wellness</h3>
              <p className="text-gray-700">
                <strong>2M UK employees manage arthritis.</strong> Your workforce likely includes many of them. Partnering gives them free, workplace-ready guidance on managing pain, staying active, and accessing NHS care.
              </p>
            </div>
            <div className="bg-green-50 p-8 rounded-lg border-l-4 border-green-600">
              <Users className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-bold text-xl mb-2">Brand Alignment</h3>
              <p className="text-gray-700">
                <strong>Associates your brand with health equity and disability inclusion.</strong> Messaging that resonates with 70% of consumers who prioritise corporate social responsibility.
              </p>
            </div>
            <div className="bg-purple-50 p-8 rounded-lg border-l-4 border-purple-600">
              <TrendingUp className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-bold text-xl mb-2">Measurable Impact</h3>
              <p className="text-gray-700">
                <strong>We report monthly on reach and outcomes.</strong> Your partnership funds X guides, Y exercise videos, Z lives improved. Transparent, auditable, real.
              </p>
            </div>
            <div className="bg-red-50 p-8 rounded-lg border-l-4 border-red-600">
              <Gift className="w-8 h-8 text-red-600 mb-3" />
              <h3 className="font-bold text-xl mb-2">Tax Deductible</h3>
              <p className="text-gray-700">
                <strong>100% of your donation is tax-deductible.</strong> Registered charity 1218461. Equivalent of 25% discount on your sponsorship cost.
              </p>
            </div>
          </div>
        </section>

        {/* Partnership Tiers */}
        <section className="bg-gray-50 max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Partnership Tiers</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                tier: "Supporter",
                amount: "£25K–50K",
                benefits: [
                  "Your logo on homepage partner section",
                  "Joint press release",
                  "Quarterly impact reports",
                  "Employee discount code (2% off shop)",
                ],
              },
              {
                tier: "Champion",
                amount: "£50K–250K",
                benefits: [
                  "Everything in Supporter, plus:",
                  "Branded employee wellness module (custom to your company)",
                  "Dedicated impact dashboard (real-time metrics)",
                  "Co-hosted virtual event (employee Q&A with our clinical team)",
                  "Named sponsorship (e.g. 'powered by [Company]')",
                ],
              },
              {
                tier: "Founding Partner",
                amount: "£250K+",
                benefits: [
                  "Everything in Champion, plus:",
                  "Executive seat on advisory board (quarterly)",
                  "Custom research / programme (your employees' needs)",
                  "Annual in-person summit (company + partner executives)",
                  "Lifetime naming rights (e.g. '[Company] Research Fund')",
                ],
              },
            ].map((t, i) => (
              <div key={i} className={`rounded-lg p-8 border-2 ${
                i === 1 ? "border-red-600 bg-white shadow-lg" : "border-gray-200 bg-white"
              }`}>
                {i === 1 && <div className="bg-red-600 text-white text-xs font-bold py-1 px-3 rounded inline-block mb-3">Most Popular</div>}
                <h3 className="font-bold text-2xl mb-2">{t.tier}</h3>
                <p className="text-3xl font-bold text-red-600 mb-6">{t.amount}</p>
                <ul className="space-y-2 text-sm mb-6">
                  {t.benefits.map((b, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="text-red-600">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  Discuss This Tier
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Case Study */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold mb-8 text-center">What Companies Say</h2>
          <blockquote className="border-l-4 border-red-600 pl-6 py-4 mb-8">
            <p className="text-lg italic text-gray-700 mb-4">
              "Partnering with Living With Arthritis let us reach 15,000 of our employees who have arthritis or family members with it. We saw a 22% increase in our wellness programme participation, and the partnership strengthened our ESG story with investors."
            </p>
            <footer className="font-semibold">— Sarah Chen, Head of Wellness, TechCorp UK</footer>
          </blockquote>
        </section>

        {/* CTA */}
        <section className="bg-red-600 text-white px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Make an Impact?</h2>
            <p className="text-lg mb-8">Let's discuss how Living With Arthritis UK can align with your corporate strategy.</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                Schedule a Call
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-red-700">
                Download Partnership Deck (PDF)
              </Button>
            </div>
            <p className="text-sm mt-6">📧 partnerships@livingwitharthritis.org.uk</p>
          </div>
        </section>
      </main>
    </>
  );
}
