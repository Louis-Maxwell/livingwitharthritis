const AboutSection = () => {
  return (
    <section className="bg-gradient-medical text-secondary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-2">
              LIVING WITH ARTHRITIS
            </h2>
          </div>
          <div className="space-y-4">
            <p className="text-lg leading-relaxed opacity-95">
              We're 10 million people living with arthritis. We're healthcare 
              professionals, researchers, carers and supporters. All of us 
              living with arthritis.
            </p>
            <a 
              href="#" 
              className="inline-block text-secondary-foreground underline hover:no-underline transition-all duration-300 font-medium"
            >
              Learn more about us.
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;