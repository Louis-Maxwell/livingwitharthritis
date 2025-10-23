import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
    { number: "60M+", label: "Adults diagnosed with arthritis" },
    { number: "1 in 4", label: "Adults have a type of arthritis" },
    { number: "52%", label: "Of those affected are working age (18-64)" },
    { number: "100+", label: "Arthritis-related conditions exist" },
  ];

  return (
    <section className="bg-gradient-medical text-secondary-foreground py-16">
      <div className="container mx-auto px-4">
        {/* Hero Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              ABOUT ARTHRITIS
            </h2>
            <p className="text-xl mb-4 opacity-95">
              Arthritis isn't a singular condition. Understanding it is the first step in managing it.
            </p>
          </div>
          <div className="space-y-4">
            <p className="text-lg leading-relaxed opacity-95">
              We're 10 million people living with arthritis. We're healthcare 
              professionals, researchers, carers and supporters. All of us 
              working together to improve lives affected by arthritis.
            </p>
            <p className="text-lg leading-relaxed opacity-95">
              Arthritis is not one disease. There are over 100 different types of arthritis 
              and related conditions, each with its own symptoms, causes, and treatments. 
              Whether you're newly diagnosed or have been living with arthritis for years, 
              knowledge is power.
            </p>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">Arthritis by the Numbers</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {statistics.map((stat, index) => (
              <Card key={index} className="bg-background/80 backdrop-blur border-secondary-foreground/20">
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl font-bold mb-2 text-primary">{stat.number}</div>
                  <p className="text-sm opacity-90">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Types of Arthritis */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-center mb-8">Common Types of Arthritis</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {arthritisTypes.map((type, index) => (
              <Card key={index} className="bg-background/80 backdrop-blur border-secondary-foreground/20 hover:border-secondary-foreground/40 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl">{type.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-secondary-foreground/90">
                    {type.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Information Boxes */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-background/80 backdrop-blur border-secondary-foreground/20">
            <CardHeader>
              <CardTitle className="text-lg">Recognizing Symptoms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm opacity-90 mb-4">
                Arthritis symptoms are complex and varied. Joint pain, stiffness, swelling, 
                and reduced range of motion are common signs that warrant medical attention.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Learn More
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur border-secondary-foreground/20">
            <CardHeader>
              <CardTitle className="text-lg">Getting Diagnosed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm opacity-90 mb-4">
                Information about your symptoms, health history, and lifestyle habits helps 
                determine the type of arthritis you have and the best treatment approach.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Learn More
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur border-secondary-foreground/20">
            <CardHeader>
              <CardTitle className="text-lg">Managing Pain</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm opacity-90 mb-4">
                Different types of arthritis create different kinds of pain. Understanding 
                your pain source is key to finding effective relief and improving quality of life.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Learn More
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-lg mb-4 opacity-95">
            "You are not alone in your arthritis journey. Your team helps to advise, but you are in control."
          </p>
          <Button size="lg" variant="default" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
            Explore All Resources
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;