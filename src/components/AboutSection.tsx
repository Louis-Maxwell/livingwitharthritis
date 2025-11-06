import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Users, Briefcase, Database } from "lucide-react";

const AboutSection = () => {
  const arthritisTypes = [
    {
      title: "Osteoarthritis",
      description: "Osteoarthritis (OA) is the most prevalent form of arthritis, affecting millions of individuals worldwide, especially as they age. OA occurs when the protective cartilage that cushions the ends of your bones gradually wears down over time. It commonly affects joints such as the knees, hips, hands, and spine, causing symptoms like pain, stiffness, and swelling. While OA was once thought to be a simple result of \"wear and tear,\" it is now understood to be a chronic condition requiring long-term management. Regular exercise, physical therapy, weight management, and medications are key to managing symptoms. In severe cases, joint replacement surgery may be considered. Early intervention and a well-rounded treatment plan can help you maintain mobility and manage pain effectively, enabling you to live a more active and fulfilling life.",
    },
    {
      title: "Rheumatoid Arthritis",
      description: "Rheumatoid arthritis (RA) is a chronic autoimmune disease that occurs when the body's immune system mistakenly attacks the lining of the joints, causing inflammation, pain, and eventual joint damage. Unlike osteoarthritis, which primarily affects the cartilage, RA affects the synovial membrane—the lining of the joints—leading to swelling and stiffness, which often worsens in the mornings. It typically affects joints in the hands, wrists, and knees and can lead to permanent damage if not treated. RA is more common in women than men, and its symptoms may be systemic, affecting other organs, including the heart and lungs. Early and aggressive treatment with disease-modifying anti-rheumatic drugs (DMARDs), biologics, and physical therapy can significantly reduce symptoms, slow disease progression, and help you live a normal life with fewer flare-ups.",
    },
    {
      title: "Psoriatic Arthritis",
      description: "Psoriatic arthritis (PsA) is an inflammatory arthritis associated with psoriasis, a skin condition that causes red, scaly patches. PsA can affect both the skin and the joints, often leading to painful swelling and stiffness. It typically affects the fingers, toes, and lower back but can impact any joint in the body. In some cases, it can also affect the eyes and cause inflammation in other parts of the body. The severity of PsA can vary from mild to severe and may include episodes of flare-ups followed by periods of remission. Managing PsA requires a comprehensive treatment plan that targets both skin symptoms (psoriasis) and joint symptoms. Medications like nonsteroidal anti-inflammatory drugs (NSAIDs), biologics, and immune-suppressing drugs can help control inflammation and prevent joint damage. Early diagnosis and a personalized treatment plan are essential to achieving long-term control and improving your quality of life.",
    },
    {
      title: "Gout",
      description: "Gout is a form of arthritis caused by the buildup of uric acid in the bloodstream. When uric acid forms crystals in the joints, it leads to sudden and severe pain, swelling, and redness, often in the big toe. Gout flare-ups can be triggered by consuming purine-rich foods like red meat, shellfish, and alcohol. It is more common in men and typically occurs in middle-aged individuals, though it can affect anyone. Gout is a progressive condition that can lead to joint damage if not properly managed. Treatment involves medications to reduce inflammation and pain during flare-ups, as well as lifestyle changes like avoiding purine-rich foods, staying hydrated, and maintaining a healthy weight. Uric acid-lowering medications may also be prescribed to prevent future attacks. Managing gout effectively requires a combination of medication and lifestyle adjustments to prevent flare-ups and improve long-term joint health.",
    },
    {
      title: "Juvenile Arthritis",
      description: "Juvenile arthritis (JA) refers to a group of autoimmune and inflammatory conditions that affect children and teenagers under the age of 16. Unlike adult arthritis, JA can cause joint pain, swelling, and stiffness, and in some cases, it can also affect other organs such as the eyes and internal organs. The exact cause of JA is unknown, but it is thought to involve a combination of genetic and environmental factors. Children with JA may experience periods of remission and flare-ups. The condition can impact their growth, development, and overall quality of life, making early diagnosis and intervention crucial. Treatment for JA typically includes medications to control inflammation and prevent joint damage, as well as physical therapy to maintain joint function. With the right care and management plan, most children with JA can lead normal, active lives.",
    },
    {
      title: "Axial Spondyloarthritis",
      description: "Axial spondyloarthritis (AxSpA) is a form of inflammatory arthritis that primarily affects the spine and sacroiliac joints—the joints that connect the spine to the pelvis. This condition leads to pain, stiffness, and inflammation in the lower back and can cause the spine to become fused over time, leading to a loss of mobility. AxSpA often starts in early adulthood and tends to affect men more than women. In addition to spinal symptoms, it can also cause inflammation in the eyes (uveitis), tendons, and other joints. The exact cause of AxSpA is unknown, but genetics play a significant role. Early diagnosis and treatment are essential to manage symptoms, prevent long-term complications, and improve mobility. Nonsteroidal anti-inflammatory drugs (NSAIDs) and biologic medications are commonly used to manage inflammation, and physical therapy can help maintain joint flexibility and improve posture. With the right treatment plan, most individuals with AxSpA can manage the condition and continue living active, fulfilling lives.",
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