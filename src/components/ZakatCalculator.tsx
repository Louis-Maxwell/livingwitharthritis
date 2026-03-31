import { useState, useMemo } from "react";
import { Calculator, ArrowRight, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const NISAB_GOLD_GBP = 4_500; // approximate nisab threshold (gold) in GBP
const ZAKAT_RATE = 0.025;

const ASSET_FIELDS = [
  { key: "savings", label: "Cash & Bank Savings", placeholder: "e.g. 12000" },
  { key: "investments", label: "Investments & Shares", placeholder: "e.g. 5000" },
  { key: "gold", label: "Gold & Silver (market value)", placeholder: "e.g. 3000" },
  { key: "property", label: "Rental / Investment Property", placeholder: "e.g. 0" },
  { key: "owed", label: "Money Owed to You", placeholder: "e.g. 0" },
] as const;

type AssetKey = (typeof ASSET_FIELDS)[number]["key"];

const ZakatCalculator = () => {
  const [assets, setAssets] = useState<Record<AssetKey, string>>({
    savings: "",
    investments: "",
    gold: "",
    property: "",
    owed: "",
  });
  const [debts, setDebts] = useState("");
  const [calculated, setCalculated] = useState(false);

  const parseNum = (v: string) => {
    const n = parseFloat(v.replace(/[^0-9.]/g, ""));
    return isNaN(n) || n < 0 ? 0 : Math.min(n, 999_999_999);
  };

  const { totalAssets, totalDebts, netWealth, zakatDue, meetsNisab } = useMemo(() => {
    const total = Object.values(assets).reduce((sum, v) => sum + parseNum(v), 0);
    const debt = parseNum(debts);
    const net = Math.max(0, total - debt);
    const meets = net >= NISAB_GOLD_GBP;
    return {
      totalAssets: total,
      totalDebts: debt,
      netWealth: net,
      zakatDue: meets ? net * ZAKAT_RATE : 0,
      meetsNisab: meets,
    };
  }, [assets, debts]);

  const handleChange = (key: AssetKey, value: string) => {
    setAssets((prev) => ({ ...prev, [key]: value }));
    setCalculated(false);
  };

  return (
    <section className="py-14 bg-background" id="zakat-calculator">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald/10 flex items-center justify-center">
            <Calculator className="w-6 h-6 text-emerald" />
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground">
            Zakat Calculator
          </h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
            Enter your assets and liabilities to calculate your Zakat obligation (2.5% of net wealth above nisab).
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          {/* Assets */}
          <div className="p-5 sm:p-6 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Your Assets</h3>
            {ASSET_FIELDS.map(({ key, label, placeholder }) => (
              <div key={key}>
                <label htmlFor={`zakat-${key}`} className="text-xs font-medium text-muted-foreground">
                  {label}
                </label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">£</span>
                  <Input
                    id={`zakat-${key}`}
                    type="number"
                    min="0"
                    max="999999999"
                    placeholder={placeholder}
                    value={assets[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="pl-7 h-9 text-sm"
                  />
                </div>
              </div>
            ))}

            <div className="pt-2 border-t border-border">
              <label htmlFor="zakat-debts" className="text-xs font-medium text-muted-foreground">
                Deduct: Outstanding Debts & Liabilities
              </label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">£</span>
                <Input
                  id="zakat-debts"
                  type="number"
                  min="0"
                  max="999999999"
                  placeholder="e.g. 2000"
                  value={debts}
                  onChange={(e) => {
                    setDebts(e.target.value);
                    setCalculated(false);
                  }}
                  className="pl-7 h-9 text-sm"
                />
              </div>
            </div>

            <Button
              onClick={() => setCalculated(true)}
              className="w-full bg-emerald hover:bg-emerald/90 text-white font-semibold rounded-xl h-11 mt-2"
            >
              <Calculator className="mr-2 h-4 w-4" />
              Calculate My Zakat
            </Button>
          </div>

          {/* Results */}
          {calculated && (
            <div className="border-t border-border bg-muted/20 p-5 sm:p-6 space-y-3 animate-fade-in">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Assets</span>
                <span className="font-medium text-foreground">£{totalAssets.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Less Debts</span>
                <span className="font-medium text-foreground">−£{totalDebts.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-sm border-t border-border pt-2">
                <span className="text-muted-foreground">Net Zakatable Wealth</span>
                <span className="font-semibold text-foreground">£{netWealth.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Nisab Threshold (approx.)</span>
                <span className="text-foreground">£{NISAB_GOLD_GBP.toLocaleString()}</span>
              </div>

              {meetsNisab ? (
                <div className="bg-emerald/10 border border-emerald/20 rounded-xl p-4 mt-2 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Your Zakat Due (2.5%)</p>
                  <p className="text-3xl font-display font-bold text-emerald">
                    £{zakatDue.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  <a
                    href="#donation-form"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald mt-3 hover:underline"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  >
                    Donate your Zakat now <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              ) : (
                <div className="bg-muted/50 rounded-xl p-4 mt-2 text-center">
                  <p className="text-sm text-muted-foreground">
                    Your net wealth is below the nisab threshold. Zakat is not obligatory, but voluntary charity (sadaqah) is always rewarded.
                  </p>
                </div>
              )}

              <div className="flex items-start gap-2 pt-2">
                <Info className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  This calculator provides an estimate based on approximate nisab values. For precise calculations, consult a qualified Islamic scholar. Nisab is based on the gold standard (approx. 87.48g of gold).
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ZakatCalculator;
