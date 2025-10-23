import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Users, Briefcase, Database } from "lucide-react";

const AboutSection = () => {
  const arthritisTypes = [
    {
      title: "Osteoarthritis",
      description: "The most common form of arthritis, affecting millions worldwide. Once thought of as simple 'wear and tear,' it's now recognized as a disease of the whole joint requiring comprehensive management.",
    },
    {
      title: "Rheumatoid Arthritis",
      description: "An inflammatory, autoimmune condition affecting joints and organs. With proper treatment, symptoms can be effectively controlled and quality of life maintained.",
    },
    {
      title: "Psoriatic Arthritis",
      description: "An inflammatory condition typically occurring with psoriasis, affecting skin, joints, and potentially internal organs. Early diagnosis is key to effective management.",
    },
    {
      title: "Gout",
      description: "Caused by high levels of uric acid in the body, leading to sudden, intense joint pain. Lifestyle changes and medication can help control symptoms.",
    },
    {
      title: "Juvenile Arthritis",
      description: "Affects hundreds of thousands of children and teens. These autoimmune conditions impact joints, skin, eyes, and internal organs but respond well to treatment.",
    },
    {
      title: "Axial Spondyloarthritis",
      description: "A family of inflammatory diseases primarily affecting the spine, but may also impact other joints and organs. Proper diagnosis leads to effective management.",
    },
  ];

  const statistics = [
    { number: "60M+", label: "Adults diagnosed with arthritis", icon: Users },
    { number: "1 in 4", label: "Adults have a type of arthritis", icon: Activity },
    { number: "52%", label: "Of those affected are working age (18-64)", icon: Briefcase },
    { number: "100+", label: "Arthritis-related conditions exist", icon: Database },
  ];

  return (
    <section className="bg-gradient-medical text-secondary-foreground py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Hero Content */}
        <div className="grid lg:grid-cols-5 gap-12 items-start mb-20">
          <div className="lg:col-span-2">
            <div className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-wider uppercase bg-background/20 rounded-full">
              Understanding Arthritis
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              About Arthritis
            </h2>
            <div className="h-1 w-20 bg-primary mb-6"></div>
            <p className="text-xl leading-relaxed opacity-90">
              Arthritis isn't a singular condition. Understanding it is the first step in managing it effectively.
            </p>
          </div>
          <div className="lg:col-span-3 space-y-6">
            <p className="text-lg leading-relaxed opacity-90">
              We represent 10 million people living with arthritis—healthcare professionals, 
              researchers, carers, and supporters. Together, we work to improve lives 
              affected by arthritis through education, support, and advocacy.
            </p>
            <p className="text-lg leading-relaxed opacity-90">
              Arthritis encompasses over 100 different types of conditions, each with unique 
              symptoms, causes, and treatment approaches. Whether you're newly diagnosed or 
              have been managing arthritis for years, comprehensive knowledge empowers better 
              health outcomes and improved quality of life.
            </p>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12">Arthritis by the Numbers</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {statistics.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card 
                  key={index} 
                  className="bg-background/90 backdrop-blur border-secondary-foreground/20 hover:border-secondary-foreground/40 transition-all duration-300 hover:shadow-lg animate-fade-in group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="pt-8 pb-6 text-center">
                    <Icon className="w-8 h-8 mx-auto mb-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                    <div className="text-5xl font-bold mb-3 text-primary">{stat.number}</div>
                    <p className="text-sm leading-relaxed opacity-80">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Types of Arthritis */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Common Types of Arthritis</h3>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Understanding the different types of arthritis is essential for proper diagnosis and effective treatment planning.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {arthritisTypes.map((type, index) => (
              <Card 
                key={index} 
                className="bg-background/90 backdrop-blur border-secondary-foreground/20 hover:border-secondary-foreground/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold">{type.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-secondary-foreground/85 leading-relaxed">
                    {type.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Information Boxes */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Essential Information</h3>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Expert guidance to help you navigate your arthritis journey with confidence.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-background/90 backdrop-blur border-secondary-foreground/20 hover:border-secondary-foreground/50 transition-all duration-300 hover:shadow-lg group">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold">Recognizing Symptoms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed opacity-85">
                  Arthritis symptoms are complex and varied. Joint pain, stiffness, swelling, 
                  and reduced range of motion are common indicators that warrant professional 
                  medical evaluation.
                </p>
                <Button variant="outline" size="sm" className="w-full group-hover:bg-secondary-foreground/10 transition-colors">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-background/90 backdrop-blur border-secondary-foreground/20 hover:border-secondary-foreground/50 transition-all duration-300 hover:shadow-lg group">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold">Getting Diagnosed</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed opacity-85">
                  Comprehensive information about your symptoms, health history, and lifestyle 
                  enables accurate diagnosis and helps determine the most effective treatment 
                  strategy for your condition.
                </p>
                <Button variant="outline" size="sm" className="w-full group-hover:bg-secondary-foreground/10 transition-colors">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-background/90 backdrop-blur border-secondary-foreground/20 hover:border-secondary-foreground/50 transition-all duration-300 hover:shadow-lg group">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold">Managing Pain</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed opacity-85">
                  Different types of arthritis generate distinct pain patterns. Understanding 
                  your specific pain sources is fundamental to finding effective relief and 
                  enhancing overall quality of life.
                </p>
                <Button variant="outline" size="sm" className="w-full group-hover:bg-secondary-foreground/10 transition-colors">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-background/40 backdrop-blur rounded-2xl p-12 border border-secondary-foreground/20">
          <blockquote className="text-2xl lg:text-3xl font-semibold mb-6 leading-relaxed italic">
            "You are not alone in your arthritis journey. Your team helps to advise, but you are in control."
          </blockquote>
          <p className="text-sm opacity-70 mb-8">— Healthcare Professional</p>
          <Button size="lg" className="px-8 py-6 text-base font-semibold hover-scale">
            Explore All Resources
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;