import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Heart, ArrowLeft, Home } from "lucide-react";
import { motion } from "framer-motion";


const DonationSuccess = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("donation");
  const isSuccess = status === "success";

  useEffect(() => {
    if (isSuccess) {
      // Simple confetti-like celebration
      document.title = "Thank You! | Living With Arthritis";
    }
  }, [isSuccess]);

  return (
    <>
      <Helmet>
        <title>{isSuccess ? "Thank You for Your Donation" : "Donation Cancelled"} | Living With Arthritis</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Header />
      <main className="min-h-[70vh] flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full text-center space-y-6"
        >
          {isSuccess ? (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center"
              >
                <CheckCircle className="w-10 h-10 text-emerald-600" />
              </motion.div>

              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-foreground">Thank You!</h1>
                <p className="text-lg text-muted-foreground">
                  Your generous donation has been received. Every contribution helps us support people living with arthritis across the UK.
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-50 dark:bg-emerald-900/10 p-5 space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  <p className="font-semibold text-foreground">Your impact matters</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  88p of every £1 goes directly to patient care and research. You'll receive a confirmation email from Stripe with your receipt.
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
                  <Link to="/blog">
                    Explore Our Resources
                  </Link>
                </Button>
              </div>
            </>
          ) : (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto w-20 h-20 rounded-full bg-muted flex items-center justify-center"
              >
                <XCircle className="w-10 h-10 text-muted-foreground" />
              </motion.div>

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
                  <Link to="/#donate">
                    Try Again
                  </Link>
                </Button>
              </div>
            </>
          )}
        </motion.div>
      </main>
      <Footer />
    </>
  );
};

export default DonationSuccess;
