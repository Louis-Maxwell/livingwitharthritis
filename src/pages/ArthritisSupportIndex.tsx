import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { ukCities } from "@/data/ukCities";
import { MapPin, Search } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const BASE = "https://livingwitharthritis.org.uk";

const ArthritisSupportIndex = () => {
  const [search, setSearch] = useState("");
  const filtered = ukCities.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.region.toLowerCase().includes(search.toLowerCase())
  );

  const regions = [...new Set(ukCities.map((c) => c.region))].sort();

  return (
    <>
      <Helmet>
        <title>UK Arthritis Support Directory | Living With Arthritis</title>
        <meta name="description" content="Find arthritis support, rheumatology services, and local help in 50 UK cities. Comprehensive directory of the health service trusts, local resources, and community groups." />
        <link rel="canonical" href={`${BASE}/arthritis-support`} />
        <meta property="og:title" content="Arthritis Support Across the UK" />
        <meta property="og:description" content="Find rheumatology services and arthritis support groups in your UK city." />
        <meta property="og:url" content={`${BASE}/arthritis-support`} />
        <meta name="geo.region" content="GB" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Arthritis Support Across the UK — Find Local Health Services | Living With Arthritis" />
      <meta name="twitter:description" content="Find arthritis support, rheumatology services, and local help in 50 UK cities. Comprehensive directory of the health service trusts, local resources, and community groups." />
      <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
        <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
    </Helmet>

      <Header />
      <PageBreadcrumb segments={[{ label: "Arthritis Support" }]} />

      <main className="container mx-auto px-6 md:px-10 py-10 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Arthritis Support Across the UK
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Find rheumatology services, local support groups, and arthritis resources in your city.
            Select your city below to see tailored information.
          </p>

          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by city or region..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-xl bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          {/* City Grid */}
          {search ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((city) => (
                <Link
                  key={city.slug}
                  to={`/arthritis-support/${city.slug}`}
                  className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors">{city.name}</h2>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{city.region}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{city.localTrust}</p>
                </Link>
              ))}
              {filtered.length === 0 && (
                <p className="col-span-full text-center text-muted-foreground py-8">No cities found matching "{search}"</p>
              )}
            </div>
          ) : (
            regions.map((region) => (
              <div key={region} className="mb-8">
                <h2 className="text-lg font-semibold text-foreground mb-3 border-b border-border pb-2">{region}</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {ukCities
                    .filter((c) => c.region === region)
                    .map((city) => (
                      <div key={city.slug} className="p-3 rounded-lg hover:bg-primary/5 transition-colors">
                        <Link
                          to={`/arthritis-support/${city.slug}`}
                          className="flex items-center gap-2 group"
                        >
                          <MapPin className="w-4 h-4 text-primary shrink-0" />
                          <div>
                            <span className="font-medium text-foreground group-hover:text-primary transition-colors">{city.name}</span>
                            <p className="text-xs text-muted-foreground">{city.localTrust}</p>
                          </div>
                        </Link>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 ml-6 text-xs">
                          <Link to={`/arthritis-support/${city.slug}/osteoarthritis`} className="text-muted-foreground hover:text-primary">Osteoarthritis</Link>
                          <Link to={`/arthritis-support/${city.slug}/rheumatoid-arthritis`} className="text-muted-foreground hover:text-primary">Rheumatoid</Link>
                          <Link to={`/arthritis-support/${city.slug}/psoriatic-arthritis`} className="text-muted-foreground hover:text-primary">Psoriatic</Link>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))
          )}
        </motion.div>
      </main>

      <Footer />
    </>
  );
};

export default ArthritisSupportIndex;
