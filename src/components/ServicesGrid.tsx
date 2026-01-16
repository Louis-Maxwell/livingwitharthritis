import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Users, MessageCircle, BookOpen, Stethoscope, Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: Phone,
    title: "Helpline",
    description: "You don't need to face arthritis alone. Our advisors provide expert information and personalized advice.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Users,
    title: "Online Community",
    description: "Connect with thousands affected by arthritis. Share experiences, find support, and build lasting connections.",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    icon: MessageCircle,
    title: "Chat to AVA",
    description: "Get instant access to trusted information 24/7 from our AI-powered virtual assistant.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: BookOpen,
    title: "Conditions A-Z",
    description: "Browse our comprehensive library of arthritis conditions with trusted symptoms and treatment guides.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Stethoscope,
    title: "Self Help Tool",
    description: "Explore our interactive body map to learn about specific conditions and management strategies.",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: Calendar,
    title: "Book Appointment",
    description: "Schedule a consultation with our healthcare professionals for personalized care and guidance.",
    gradient: "from-green-500 to-emerald-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const ServicesGrid = () => {
  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-8 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
            How We Can{" "}
            <span className="text-gradient">Help You</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Comprehensive support designed around your needs. From expert advice to community connection, 
            we're with you every step of your journey.
          </p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="group relative h-full bg-card hover:shadow-large transition-all duration-500 cursor-pointer border-border/50 hover:border-primary/20 overflow-hidden rounded-2xl">
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
                  
                  <CardHeader className="pb-4">
                    <div className={`mb-5 w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} p-0.5`}>
                      <div className="w-full h-full rounded-[14px] bg-card flex items-center justify-center group-hover:bg-transparent transition-all duration-300">
                        <IconComponent className="w-6 h-6 text-foreground group-hover:text-white transition-colors duration-300" />
                      </div>
                    </div>
                    <CardTitle className="text-xl font-display font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-muted-foreground leading-relaxed text-[15px]">
                      {service.description}
                    </CardDescription>
                    <div className="flex items-center text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-0">
                      Learn more
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;
