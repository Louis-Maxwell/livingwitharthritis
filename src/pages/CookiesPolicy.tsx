import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CookiesPolicy = () => (
  <>
    <Helmet>
      <title>Cookies Policy | Living With Arthritis UK</title>
      <meta name="description" content="Cookies Policy for Living With Arthritis UK. Learn about the cookies we use, why we use them, and how you can manage your preferences." />
      <link rel="canonical" href="https://livingwitharthritis.org.uk/cookies" />
    </Helmet>
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 md:px-10 py-16 md:py-24 max-w-4xl">
        <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-8 tracking-tight">Cookies Policy</h1>
        <p className="text-muted-foreground mb-6 text-sm">Last updated: March 2026</p>

        <div className="prose prose-lg max-w-none space-y-8 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">1. What Are Cookies?</h2>
            <p>Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work more efficiently, improve user experience and provide information to site owners. Cookies may be set by the website you are visiting ("first-party cookies") or by third parties whose services appear on the page ("third-party cookies").</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">2. How We Use Cookies</h2>
            <p>Living With Arthritis UK uses cookies for the following purposes:</p>

            <h3 className="text-lg font-semibold text-foreground mt-5 mb-2">Essential Cookies</h3>
            <p>These cookies are strictly necessary for the website to function. They enable core features such as security, form submissions, user authentication and accessibility. You cannot opt out of these cookies as the website would not work properly without them.</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Session management and authentication tokens</li>
              <li>Security and fraud prevention</li>
              <li>Cookie consent preferences</li>
            </ul>

            <h3 className="text-lg font-semibold text-foreground mt-5 mb-2">Functional Cookies</h3>
            <p>These cookies allow us to remember your preferences and choices (such as your language or region) to provide a more personalised experience. They may also be used to provide services you have requested, such as remembering items in a donation form.</p>

            <h3 className="text-lg font-semibold text-foreground mt-5 mb-2">Analytics Cookies</h3>
            <p>We use analytics cookies to understand how visitors interact with our website. This helps us improve our content, navigation and overall experience. The information collected is aggregated and anonymous. We do not use this data to identify individual visitors.</p>

            <h3 className="text-lg font-semibold text-foreground mt-5 mb-2">Payment Cookies</h3>
            <p>When you make a donation, our payment provider (Stripe) may set cookies to process the transaction securely. These cookies are necessary for the payment process and are subject to Stripe's own privacy and cookie policies.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">3. Third-Party Cookies</h2>
            <p>Some cookies on our site are set by third-party services that appear on our pages. We do not control these cookies. The third parties we work with include:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><strong>Stripe:</strong> For secure donation payment processing.</li>
              <li><strong>Google Fonts:</strong> For typography delivery (no tracking cookies set).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">4. Managing Your Cookie Preferences</h2>
            <p>You can control and manage cookies in several ways:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Browser settings:</strong> Most browsers allow you to refuse or delete cookies through their settings. Please note that blocking all cookies may affect the functionality of our website.</li>
              <li><strong>Cookie consent banner:</strong> When you first visit our website, you can accept or decline non-essential cookies through our consent banner.</li>
            </ul>
            <p className="mt-3">For more information about managing cookies in your browser, visit <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">aboutcookies.org</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">5. How Long Do Cookies Last?</h2>
            <p>Cookies can be either "session" or "persistent":</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><strong>Session cookies:</strong> Deleted automatically when you close your browser.</li>
              <li><strong>Persistent cookies:</strong> Remain on your device for a set period or until you delete them. Our persistent cookies typically last between 30 days and 12 months.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">6. Updates to This Policy</h2>
            <p>We may update this Cookies Policy from time to time to reflect changes in technology or legislation. Any updates will be published on this page with a revised date.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">7. Contact Us</h2>
            <p>If you have questions about our use of cookies, please contact us:</p>
            <p className="mt-2">
              Email: <a href="mailto:info@livingwitharthritis.org.uk" className="text-primary hover:underline">info@livingwitharthritis.org.uk</a><br />
              Phone: 07760 512 084
            </p>
            <p className="mt-3">For more information about your data rights, see our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  </>
);

export default CookiesPolicy;
