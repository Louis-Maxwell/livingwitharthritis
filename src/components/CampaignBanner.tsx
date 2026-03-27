import { useState } from "react";
import { X, Heart, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CampaignBanner = () => {
  const [dismissed, setDismissed] = useState(() => sessionStorage.getItem("campaign-dismissed") === "true");
  const navigate = useNavigate();

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-[hsl(0,72%,51%)] to-[hsl(350,80%,55%)] text-white py-3 px-4 relative">
      <div className="container mx-auto flex items-center justify-center gap-3 text-center">
        <Heart className="w-4 h-4 fill-white/30 shrink-0 hidden sm:block" />
        <p className="text-xs sm:text-sm font-semibold">
          <span className="hidden sm:inline">Arthritis Awareness Month — </span>
          Help us reach <strong>1,000 new supporters</strong> this month
        </p>
        <button
          onClick={() => navigate("/zakat-appeal")}
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-[11px] font-bold transition-colors shrink-0"
        >
          Donate
          <ArrowRight className="w-3 h-3" />
        </button>
        <button
          onClick={() => {
            setDismissed(true);
            sessionStorage.setItem("campaign-dismissed", "true");
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Dismiss campaign banner"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

export default CampaignBanner;
