import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import { ShoppingBag } from "lucide-react";

const Shop = () => {
  return (
    <>
      <Helmet>
        <title>Supplements & Arthritis Shop — Coming Soon | Living With Arthritis UK</title>
        <meta name="description" content="Our Shopify store for arthritis supplements and products is launching soon. Stay tuned for carefully curated items to support your joint health journey." />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/shop" />
      <meta property="og:title" content="Supplements & Arthritis Shop — Coming Soon | Living With Arthritis UK" />
      <meta property="og:description" content="Our Shopify store for arthritis supplements and products is launching soon. Stay tuned for carefully curated items to support your joint health journey." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://livingwitharthritis.org.uk/shop" />
      <meta property="og:site_name" content="Living With Arthritis UK" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-community.webp" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Supplements & Arthritis Shop — Coming Soon | Living With Arthritis UK" />
      <meta name="twitter:description" content="Our Shopify store for arthritis supplements and products is launching soon. Stay tuned for carefully curated items to support your joint health journey." />
      <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-community.webp" />
    </Helmet>
      <Header />
      <main className="min-h-screen bg-background">
        <PageHero
          title="Supplements & Arthritis Shop"
          subtitle="Carefully curated products to support your joint health journey"
        />

        <div className="container mx-auto px-6 py-24 max-w-2xl text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-8">
            <ShoppingBag className="w-10 h-10 text-primary" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Shopify Store Launching Soon
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            We're building a dedicated Shopify store with evidence-based supplements, compression aids, and daily living products — all selected by our physiotherapy team.
          </p>
          <p className="text-sm text-muted-foreground/70">
            Check back soon or subscribe to our newsletter to be the first to know when we launch.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Shop;
