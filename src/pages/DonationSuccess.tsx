import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import SeoHead from "@/components/SeoHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Heart, ArrowLeft, Home } from "lucide-react";

const DonationSuccess = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("donation");
  const isSuccess = status === "success";

  useEffect(() => {
    if (isSuccess) {
      document.title = "Thank You! | Living With Arthritis";
    }
  }, [isSuccess]);

  return (
    <>
      <Helmet>
        <title>{isSuccess ? "Thank You for Your Donation" : "Donation Cancelled"} | Living With Arthritis</title>
        <meta name="description" content={isSuccess ? "Thank you for supporting Living With Arthritis UK. Your donation funds free physiotherapy, exercise plans and AI support for people with arthritis." : "Your donation was cancelled — no charge was made. You can try again any time at Living With Arthritis UK."} />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/donation-success" />
        <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
      </Helmet>
      <Header />
      <main className="min-h-[70vh] flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full text-center space-y-6 animate-fade-in">
          {isSuccess ? (
            <>
              <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center animate-scale-in">
                <CheckCircle className="w-10 h-10 text-primary" />
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-foreground">Thank You!</h1>
                <p className="text-lg text-muted-foreground">
                  Your generous donation has been received. Every contribution helps us support people living with arthritis across the UK.
                </p>
              </div>

              <div className="rounded-2xl border border-primary/20 bg-primary/5 dark:bg-primary/10 p-5 space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  <p className="font-semibold text-foreground">Your impact matters</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  88p of every £1 goes directly to patient care and research. If you provided an email at checkout, a receipt from Stripe will arrive shortly.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/">
                    <Home className="w-4 h-4 mr-2" />
                    Back to Home
                  </Link>
                </Button>
                <Button asChild className="rounded-full btn-primary-cta">
                  <Link to="/blog">Explore Our Resources</Link>
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="mx-auto w-20 h-20 rounded-full bg-muted flex items-center justify-center animate-scale-in">
                <XCircle className="w-10 h-10 text-muted-foreground" />
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-foreground">Donation Cancelled</h1>
                <p className="text-lg text-muted-foreground">
                  No worries — your payment was not processed. You can try again anytime, or explore other ways to support our work.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Link>
                </Button>
                <Button asChild className="rounded-full btn-primary-cta">
                  <Link to="/#donate">Try Again</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DonationSuccess;
