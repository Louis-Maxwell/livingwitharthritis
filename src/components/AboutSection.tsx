import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Users, Briefcase, Database, ArrowRight, Quote } from "lucide-react";
import { motion } from "framer-motion";

const AboutSection = () => {
  const arthritisTypes = [
    {
      title: "Osteoarthritis",
      description: "The most common form, often called \"wear and tear\" arthritis. Affects cartilage in joints, leading to pain and stiffness. Manageable with lifestyle changes.",
    },
    {
      title: "Rheumatoid Arthritis",
      description: "An autoimmune disorder where the immune system attacks healthy joints. Early diagnosis and treatment prevent permanent damage.",
    },
    {
      title: "Psoriatic Arthritis",
      description: "Linked to psoriasis, affecting both skin and joints. Personalized treatment plans are crucial for managing symptoms.",
    },
    {
      title: "Gout",
      description: "Caused by excess uric acid forming crystals in joints. Lifestyle changes and medications effectively control flare-ups.",
    },
    {
      title: "Juvenile Arthritis",
      description: "Affects children with persistent joint inflammation. Comprehensive treatment helps children lead active lives.",
    },
    {
      title: "Axial Spondyloarthritis",
      description: "Inflammatory diseases primarily affecting the spine. Early diagnosis prevents further complications.",
    },
  ];

  const statistics = [
    { number: "60M+", label: "Adults diagnosed with arthritis", icon: Users },
    { number: "1 in 4", label: "Adults have a type of arthritis", icon: Activity },
    { number: "52%", label: "Working age adults affected", icon: Briefcase },
    { number: "100+", label: "Arthritis-related conditions", icon: Database },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-secondary via-secondary/95 to-secondary text-secondary-foreground relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative max-w-7xl">
        {/* Hero Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              Understanding Arthritis
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-[1.1]">
              Knowledge Is
              <span className="block text-white/90">Power</span>
            </h2>
            <div className="w-20 h-1.5 bg-primary rounded-full mb-8" />
            <p className="text-xl text-white/80 leading-relaxed">
              Arthritis isn't a singular condition—it's a complex family of over 100 different types. 
              Understanding your specific condition is the first step toward effective management.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg text-white/75 leading-relaxed">
              We represent 10 million people living with arthritis—healthcare professionals, 
              researchers, carers, and supporters united by a common goal: improving lives.
            </p>
            <p className="text-lg text-white/75 leading-relaxed">
              Whether you're newly diagnosed or have been managing arthritis for years, 
              comprehensive knowledge empowers better health outcomes.
            </p>
            <Button 
              size="lg" 
              className="mt-4 bg-white text-secondary hover:bg-white/90 font-bold px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              Explore Resources
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>

        {/* Statistics Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">By the Numbers</h3>
            <p className="text-white/60 text-lg">The scope of arthritis impact worldwide</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {statistics.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="glass-card bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-500 group rounded-2xl">
                    <CardContent className="pt-8 pb-6 text-center">
                      <div className="mb-4 mx-auto w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                        <Icon className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
                      </div>
                      <div className="text-4xl lg:text-5xl font-display font-bold mb-2 text-white">{stat.number}</div>
                      <p className="text-sm text-white/60 leading-relaxed">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Types of Arthritis */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">Common Types</h3>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Understanding different types is essential for proper diagnosis and treatment.
            </p>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {arthritisTypes.map((type, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 group rounded-2xl overflow-hidden">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-display font-semibold text-white group-hover:text-primary-foreground transition-colors">
                      {type.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {type.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-10 lg:p-14 border border-white/10 overflow-hidden">
            <Quote className="absolute top-8 left-8 w-16 h-16 text-white/10" />
            <div className="relative text-center max-w-3xl mx-auto">
              <blockquote className="text-2xl lg:text-3xl font-display font-medium mb-6 leading-relaxed text-white/90 italic">
                "You are not alone in your arthritis journey. Your healthcare team advises, but you are in control of your path forward."
              </blockquote>
              <cite className="text-sm text-white/50 not-italic">— Healthcare Professional</cite>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
