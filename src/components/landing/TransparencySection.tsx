import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Shield, Users, FileText, Heart } from "lucide-react";

const fundAllocation = [
  { name: "Patient Support & Services", value: 45, color: "hsl(0, 72%, 46%)" },
  { name: "Research & Education", value: 25, color: "hsl(210, 40%, 14%)" },
  { name: "Community Programmes", value: 18, color: "hsl(42, 92%, 56%)" },
  { name: "Operations & Admin", value: 12, color: "hsl(210, 12%, 75%)" },
];

const teamMembers = [
  { name: "Dr. Sarah Maxwell", role: "Founder & Clinical Lead", credential: "BSc (Hons), MSc, MCSP, HCPC" },
  { name: "James Thornton", role: "Trustee – Finance", credential: "ACCA Chartered Accountant" },
  { name: "Dr. Priya Patel", role: "Trustee – Research", credential: "PhD Rheumatology" },
  { name: "Helen Brooks", role: "Trustee – Community", credential: "Patient Advocate" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-foreground text-background px-4 py-2.5 rounded-xl text-sm shadow-xl">
        <p className="font-bold">{payload[0].name}</p>
        <p className="text-background/60">{payload[0].value}% of funds</p>
      </div>
    );
  }
  return null;
};

const TransparencySection = () => {
  return (
    <section className="py-16 md:py-20" aria-labelledby="transparency-heading">
      <div className="text-center mb-12 md:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-bold tracking-wide uppercase mb-4">
          <Shield className="w-3.5 h-3.5" />
          Transparency
        </div>
        <h2 id="transparency-heading" className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-3">
          Where Your Money Goes
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto text-sm md:text-base leading-relaxed">
          We believe in full transparency. Every pound you donate directly supports people living with arthritis.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Financial Breakdown */}
        <div className="bg-card rounded-3xl border border-border/60 p-8 md:p-10 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Fund Allocation 2024/25</h3>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="w-48 h-48 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={fundAllocation}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={80}
                    dataKey="value"
                    strokeWidth={3}
                    stroke="hsl(0, 0%, 100%)"
                  >
                    {fundAllocation.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3.5 flex-1">
              {fundAllocation.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm font-medium text-foreground">{item.name}</span>
                      <span className="text-sm font-bold text-foreground ml-3">{item.value}%</span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border/50 flex items-center gap-3">
            <Heart className="w-4 h-4 text-primary flex-shrink-0" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">88p of every £1</strong> goes directly to supporting people with arthritis. Our admin costs are among the lowest in the sector.
            </p>
          </div>
        </div>

        {/* Team & Governance */}
        <div className="bg-card rounded-3xl border border-border/60 p-8 md:p-10 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Our Team & Governance</h3>
          </div>

          <div className="space-y-4">
            {teamMembers.map((member, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-muted/40 hover:bg-muted/70 transition-colors">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
                  {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{member.name}</p>
                  <p className="text-xs text-primary font-semibold mt-0.5">{member.role}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{member.credential}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-border/50">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Our board of trustees meets quarterly to review finances, impact, and strategy. We are regulated by the <strong className="text-foreground">Charity Commission</strong> and publish annual accounts publicly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransparencySection;
