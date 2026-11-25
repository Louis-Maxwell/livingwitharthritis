import safety from "./childArthritisSafety.json";

export const childSubpageFaqs = {
  symptoms: [
    { question: "Should I wait six weeks before seeking help?", answer: safety.gp },
    { question: "When does a child's limp need emergency help?", answer: safety.emergency },
    { question: "Can eye inflammation happen without symptoms?", answer: safety.eyes },
  ],
  exercises: [
    { question: "Can I use an adult arthritis exercise plan for my child?", answer: safety.exercise },
    { question: "Should my child exercise through a new unexplained limp?", answer: safety.gp + " " + safety.emergency },
    { question: "Who should adapt school sport?", answer: "Ask the paediatric physiotherapy or occupational therapy team to advise school staff. Activities and rest breaks should fit the child's condition and abilities. A general activity target is not a personalised rehabilitation prescription." },
  ],
  treatment: [
    { question: "Who plans treatment for JIA?", answer: "The paediatric rheumatology team plans treatment and monitoring with the child and family. Do not use adult doses, over-the-counter medicines or supplements based on this page. Ask the child's prescriber or pharmacist what is suitable." },
    { question: "Does feeling better mean eye screening can stop?", answer: "No. JIA-related eye inflammation can occur without symptoms. Keep specialist screening appointments and ask the team before changing medicines or follow-up." },
    { question: "What if my child develops new joint or eye symptoms?", answer: safety.emergency + " " + safety.eyes },
  ],
  diet: [
    { question: "Should my child follow an adult arthritis diet?", answer: "Do not apply adult weight-loss plans or restrictive arthritis diets to a growing child. NHS Eatwell proportions do not apply below age two; children move towards them after age two. Ask the paediatric team or registered dietitian about age-appropriate food, growth, appetite and any need for supplements." },
    { question: "Can supplements replace JIA treatment?", answer: "No. Do not replace the child's prescribed treatment with a supplement or exclusion diet. Check any product with the child's pharmacist or paediatric team first." },
    { question: "What if eating or growth becomes a concern?", answer: "Contact the paediatric team about poor appetite, weight changes or concerns about growth. They can assess the cause and whether dietitian support is needed." },
  ],
};
