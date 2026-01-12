import physioMyth1 from "@/assets/physio-myth-1.jpg";
import physioMyth2 from "@/assets/physio-myth-2.jpg";
import physioMyth3 from "@/assets/physio-myth-3.jpg";
import physioMyth4 from "@/assets/physio-myth-4.jpg";

const myths = [
  {
    id: 1,
    myth: "You can't get proper treatment without seeing a physio in person.",
    fact: "Total game-changer! Over 85–90% of patients report the same (or even higher) satisfaction with virtual sessions! Most physio magic happens through smart guided exercises, clear education, and lifestyle tweaks — and those work brilliantly over video.",
    emoji: "😤",
    image: physioMyth1,
  },
  {
    id: 2,
    myth: "Virtual physio won't touch real pain or serious injuries.",
    fact: "It absolutely does! NHS-backed research + multiple studies show similar (sometimes identical) results for back pain, neck issues, sports injuries, and more — whether in-clinic or online. Pain drops, movement improves, life gets better.",
    emoji: "🤕",
    image: physioMyth2,
  },
  {
    id: 3,
    myth: "It's only for people who can't travel.",
    fact: "Convenience is KING! Busy professionals, parents, people in rural spots, night-shift workers… they all choose virtual because it fits their life — not the other way around. No more rushing across town after work!",
    emoji: "🚗",
    image: null,
  },
  {
    id: 4,
    myth: "Online feels cold and less personal.",
    fact: "Many say it's MORE personal! One-to-one focus, no waiting room chaos, no distractions. Your physio is literally looking right at you — and patients often feel they get deeper attention and better chats online.",
    emoji: "😕",
    image: physioMyth3,
  },
  {
    id: 5,
    myth: "You need fancy gym equipment at home.",
    fact: "Nope! Just YOU. Most plans use bodyweight, a chair, a towel, or £5–10 resistance bands. Your physio customises everything to what you've already got. Easy-peasy!",
    emoji: "🏋",
    image: null,
  },
  {
    id: 6,
    myth: "Long-term recovery? Virtual won't cut it.",
    fact: "It often wins! Studies show people who do virtual physio stick with it longer (hello, easier follow-ups!), get better adherence, and sometimes recover faster/better over time. Ongoing support = winning streak!",
    emoji: "📅",
    image: physioMyth4,
  },
];

const VirtualPhysioSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-4xl mb-4 block">🚀</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Virtual Physiotherapy: Myths BUSTED!
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Think online physio is just a "nice-to-have" or second-best? Think again!
            Thousands of people are recovering faster, feeling better, and loving the freedom — all from their living room.
          </p>
        </div>

        {/* Myths Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {myths.map((item) => (
            <div
              key={item.id}
              className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3 mb-4">
                <span className="text-2xl">{item.emoji}</span>
                <div>
                  <span className="text-xs font-semibold text-destructive uppercase tracking-wider">
                    Myth #{item.id}
                  </span>
                  <p className="text-foreground font-medium mt-1">
                    "{item.myth}"
                  </p>
                </div>
              </div>
              
              {item.image && (
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img
                    src={item.image}
                    alt={`Virtual physiotherapy illustration ${item.id}`}
                    className="w-full h-40 object-cover"
                  />
                </div>
              )}
              
              <div className="bg-primary/5 rounded-lg p-4">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-1">
                  ✓ FACT
                </span>
                <p className="text-muted-foreground text-sm mt-2">
                  {item.fact}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8">
          <p className="text-xl font-semibold text-foreground mb-2">
            Virtual physiotherapy isn't the future — it's the now.
          </p>
          <p className="text-muted-foreground mb-6">
            Flexible. Effective. Personal. And seriously convenient.
          </p>
          <p className="text-lg text-primary font-medium">
            Why wait to feel better? Talk to a physio today and see how easy (and powerful) healing from home can be! 🌟
          </p>
        </div>
      </div>
    </section>
  );
};

export default VirtualPhysioSection;
