const DonationTiersSection = () => {
  const tiers = [
    {
      amount: "£150,000",
      color: "from-teal-700 to-teal-500",
      benefits: [
        "Thank you on Social Media",
        "Your logo on our website",
        "Our 'supporter' logo for your website",
        "Certificate"
      ]
    },
    {
      amount: "£1000+",
      color: "from-teal-800 to-teal-600",
      benefits: [
        "Thank you on Social Media",
        "Your logo on our website",
        "Our 'supporter' logo for your website",
        "Certificate",
        "Taster Mental Health at Work session"
      ]
    },
    {
      amount: "£5000+",
      color: "from-teal-900 to-teal-700",
      benefits: [
        "Thank you on Social Media",
        "Your logo on our website",
        "Our 'supporter' logo for your website",
        "Certificate",
        "Taster Mental Health at Work session",
        "Personal thank you from our CEO, photo opportunity and press release."
      ]
    }
  ];

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8 justify-start">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${tier.color} text-white p-8 rounded-lg shadow-lg relative overflow-hidden max-w-sm`}
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 95%, 95% 100%, 0 100%)"
              }}
            >
              <h3 className="text-3xl font-bold mb-6">
                Donation of {tier.amount}
              </h3>
              <ul className="space-y-3">
                {tier.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-white mt-1">•</span>
                    <span className="text-white">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DonationTiersSection;