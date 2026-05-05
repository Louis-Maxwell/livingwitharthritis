import { useNavigate } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";

/**
 * Slim single-CTA donation strip.
 * Replaces the previous busy toolbar (currency/amounts/fund picker) with one
 * confident "Donate" button — the editorial / charity-sector standard
 * (Dogs Trust, Macmillan, Cats Protection). Amount selection now happens
 * on the dedicated /donate page, where conversion intent is highest.
 */
const DonationBanner = () => {
  const navigate = useNavigate();

  return (
    <aside
      className="bg-primary text-primary-foreground"
      aria-label="Support our mission"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3 py-2">
          <button
            onClick={() => navigate("/donate")}
            className="group inline-flex items-center gap-1.5 bg-white text-primary px-4 sm:px-5 h-7 rounded-full text-[11px] sm:text-[12px] font-bold tracking-widest uppercase hover:bg-white/90 transition-all duration-200"
          >
            Donate
            <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default DonationBanner;
