import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CryptoDonationForm = () => {
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const [selectedCurrency, setSelectedCurrency] = useState("Bitcoin (BTC)");
  const [donationType, setDonationType] = useState("crypto");

  const cryptoOptions = [
    { value: "BTC", label: "BTC", full: "Bitcoin (BTC)" },
    { value: "ETH", label: "ETH", full: "Ethereum (ETH)" },
    { value: "USDC", label: "USDC", full: "USD Coin (USDC)" },
  ];

  return (
    <section className="py-8 bg-muted/30">
      <div className="container mx-auto px-4 flex justify-center">
        <Card className="w-full max-w-md shadow-medium">
          <CardHeader className="text-center border-b">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground text-xs font-bold">LWA</span>
              </div>
              <span className="text-sm text-muted-foreground">Living With Arthritis</span>
            </div>
            <CardTitle className="text-2xl">Make a Donation</CardTitle>
          </CardHeader>
          
          <CardContent className="pt-6 space-y-4">
            <Tabs value={donationType} onValueChange={setDonationType} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger 
                  value="crypto" 
                  className="data-[state=active]:bg-[hsl(45_93%_47%)] data-[state=active]:text-white"
                >
                  Crypto
                </TabsTrigger>
                <TabsTrigger value="daf">DAF</TabsTrigger>
                <TabsTrigger value="stock">Stock</TabsTrigger>
              </TabsList>

              <TabsContent value="crypto" className="space-y-4 mt-4">
                <div className="grid grid-cols-3 gap-2">
                  {cryptoOptions.map((crypto) => (
                    <Button
                      key={crypto.value}
                      variant={selectedCrypto === crypto.value ? "default" : "outline"}
                      className={selectedCrypto === crypto.value ? "bg-muted hover:bg-muted" : ""}
                      onClick={() => {
                        setSelectedCrypto(crypto.value);
                        setSelectedCurrency(crypto.full);
                      }}
                    >
                      {crypto.label}
                    </Button>
                  ))}
                </div>

                <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                  <SelectTrigger className="w-full">
                    <SelectValue>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-[hsl(24_95%_53%)] flex items-center justify-center">
                          <span className="text-white text-xs font-bold">₿</span>
                        </div>
                        {selectedCurrency}
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {cryptoOptions.map((crypto) => (
                      <SelectItem key={crypto.value} value={crypto.full}>
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-[hsl(24_95%_53%)] flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              {crypto.value === "BTC" ? "₿" : crypto.value === "ETH" ? "Ξ" : "$"}
                            </span>
                          </div>
                          {crypto.full}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="bg-muted/50 rounded-md p-4 flex justify-between items-center">
                  <span className="font-mono text-sm">0.09856101</span>
                  <span className="text-sm text-muted-foreground">≈ $10,000....</span>
                </div>

                <Button 
                  className="w-full bg-[hsl(45_93%_47%)] hover:bg-[hsl(45_93%_40%)] text-white font-bold py-6 text-base"
                >
                  Donate 💝
                </Button>
              </TabsContent>

              <TabsContent value="daf" className="space-y-4 mt-4">
                <div className="text-center py-8 text-muted-foreground">
                  <p>Donor-Advised Fund donation options will appear here.</p>
                </div>
              </TabsContent>

              <TabsContent value="stock" className="space-y-4 mt-4">
                <div className="text-center py-8 text-muted-foreground">
                  <p>Stock donation options will appear here.</p>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex items-center justify-center gap-2 pt-2 border-t text-xs text-muted-foreground">
              <span>Powered by</span>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded bg-primary/20"></div>
                <span className="font-semibold">Giving Block</span>
              </div>
              <span>•</span>
              <button className="hover:text-foreground transition-colors">Help</button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CryptoDonationForm;
