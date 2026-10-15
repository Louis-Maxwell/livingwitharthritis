import type { HubGuide } from "./types";

export const drugGuide: HubGuide = {
  slug: "treatments/drug-guide",
  title: "Arthritis medicines explained: a plain-English guide",
  metaTitle: "Arthritis Medicines Explained: A Plain-English UK Guide",
  description:
    "What each type of arthritis medicine does, from painkillers to DMARDs and biologics, how long they take to work, typical monitoring and what to ask your team.",
  answer:
    "Arthritis medicines fall into two broad groups: those that ease symptoms such as pain and stiffness, and those that calm the underlying disease in inflammatory arthritis. Painkillers work within hours; disease-modifying medicines usually take weeks to months. Your rheumatology team or GP will choose and adjust them with you, so never start, stop or change a dose on your own.",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Treatments", href: "/blog/arthritis-treatment-hub" },
    { label: "Medicines guide", href: "/treatments/drug-guide" },
  ],
  updated: "2026-09-25",
  reviewStatus: "pending-clinical-review",
  sections: [
    {
      heading: "Two jobs: easing symptoms and controlling the disease",
      paragraphs: [
        "It helps to sort arthritis medicines by the job they do. Some ease symptoms. Painkillers, anti-inflammatory tablets and gels, and steroid injections all fall into this group. They can make a real difference to how you feel today, but they do not change the long-term course of inflammatory arthritis.",
        "Others control the disease itself. In rheumatoid arthritis, psoriatic arthritis, axial spondyloarthritis, lupus and related conditions, the immune system attacks the body's own tissues. Disease-modifying medicines calm that process and help protect joints and organs from damage over time. They work slowly, which is why people are sometimes given a short course of steroids as a bridge while they wait for them to take effect.",
        "Osteoarthritis is different. There is no medicine that reverses it, so treatment focuses on exercise, weight, footwear and aids, with painkillers used to help you stay active rather than as the main treatment.",
      ],
      links: [
        { label: "Osteoarthritis vs rheumatoid arthritis", href: "/guides/osteoarthritis-vs-rheumatoid-arthritis" },
        { label: "Inflammatory arthritis guide", href: "/blog/inflammatory-arthritis-guide" },
      ],
    },
    {
      heading: "Painkillers and anti-inflammatories",
      paragraphs: [
        "Paracetamol is widely used, although for osteoarthritis its benefit is often modest. Anti-inflammatory gels rubbed onto a sore knee or hand are a sensible early option for many people, because much less of the medicine reaches the rest of the body than with tablets.",
        "Anti-inflammatory tablets (NSAIDs) such as ibuprofen and naproxen can ease pain and stiffness, especially in inflammatory conditions. They can irritate the stomach and affect the kidneys, blood pressure and heart, so they are usually given at the lowest dose that helps, for the shortest time needed, sometimes with a stomach-protecting tablet. Check with a pharmacist before combining them with other medicines, including ones bought over the counter.",
        "Stronger painkillers such as codeine are used cautiously, because they often cause constipation, drowsiness and dependence and tend to help long-term joint pain less than people hope.",
      ],
      links: [
        { label: "Painkillers and NSAIDs guide", href: "/guides/painkillers-and-nsaids" },
        { label: "Paracetamol vs ibuprofen", href: "/guides/paracetamol-vs-ibuprofen-for-arthritis" },
        { label: "Topical NSAIDs: often overlooked", href: "/blog/topical-nsaids-often-overlooked-often-effective" },
        { label: "When you need stomach protection", href: "/blog/nsaid-stomach-protection-when-you-need-a-ppi" },
      ],
    },
    {
      heading: "Steroids",
      paragraphs: [
        "Steroids (corticosteroids) are powerful anti-inflammatories. They can be injected into a joint, given as an injection into muscle, or taken as tablets. They often work quickly, which makes them useful for flares and for bridging the gap before a slower medicine starts working.",
        "Longer courses can raise blood sugar and blood pressure, thin the bones, increase infection risk and affect mood and sleep. If you have taken steroid tablets for more than a few weeks, stopping suddenly can be dangerous, so your team will reduce them gradually. You may be given a steroid emergency card to carry.",
      ],
      links: [
        { label: "Steroids for arthritis", href: "/guides/steroids-for-arthritis" },
        { label: "Steroid injections vs tablets", href: "/blog/steroid-injections-vs-oral-steroids-when-each-makes-sense" },
      ],
    },
    {
      heading: "Conventional DMARDs",
      paragraphs: [
        "Disease-modifying anti-rheumatic drugs (DMARDs) are usually the first long-term treatment for inflammatory arthritis. Methotrexate is the most commonly used. Others include sulfasalazine, leflunomide and hydroxychloroquine, and some people take two or three together.",
        "They typically take several weeks to a few months to reach their full effect. Most need regular blood tests to check your blood count, liver and kidneys, often more frequently at the start. The tests are how your team spots problems early, so it matters to keep the appointments even when you feel well.",
        "Some DMARDs are not suitable around pregnancy, and some interact with alcohol or other medicines. Your team will talk you through what applies to your medicine.",
      ],
      links: [
        { label: "DMARDs and methotrexate explained", href: "/blog/dmards-explained-how-methotrexate-slows-rheumatoid-arthritis" },
        { label: "Managing methotrexate side effects", href: "/blog/managing-methotrexate-side-effects-practical-tips" },
        { label: "Azathioprine guide", href: "/guides/azathioprine-for-arthritis" },
        { label: "Should you start DMARDs at diagnosis?", href: "/blog/expert-qa-should-you-start-dmards-at-diagnosis" },
      ],
    },
    {
      heading: "Biologics, biosimilars and JAK inhibitors",
      paragraphs: [
        "If conventional DMARDs do not control your disease well enough, your specialist may suggest a targeted treatment. Biologics are injections or drips that block specific signals in the immune system, such as TNF, IL-6, IL-17 or IL-23. Biosimilars are close copies of branded biologics that work in the same way and are widely used in the NHS.",
        "JAK inhibitors are tablets that block signals inside immune cells. They are an option for some people with rheumatoid arthritis, psoriatic arthritis and axial spondyloarthritis.",
        "In England and Wales, access to these medicines is guided by NICE, and your specialist will check whether you meet the criteria. Because they dampen parts of the immune system, you will be screened for infections such as tuberculosis beforehand and advised about vaccines.",
      ],
      links: [
        { label: "DMARDs vs biologics", href: "/guides/dmards-vs-biologics" },
        { label: "Biologics: a year-one roadmap", href: "/blog/biologics-for-ra-a-realistic-year-one-roadmap" },
        { label: "JAK inhibitors explained", href: "/blog/jak-inhibitors-the-next-wave-of-ra-treatment" },
        { label: "How NHS access to biologics works", href: "/blog/nhs-access-to-biologics-how-the-approval-pathway-works" },
      ],
    },
    {
      heading: "Medicines for gout, bones and nerve pain",
      paragraphs: [
        "Gout is treated in two ways: medicines to settle a flare, such as colchicine, anti-inflammatories or steroids, and long-term urate-lowering medicines such as allopurinol or febuxostat that stop crystals forming. Urate-lowering treatment is usually started at a low dose and increased gradually, with blood tests to guide the dose.",
        "If you are at risk of osteoporosis, for example after long courses of steroids, you may be offered bone-protecting medicines alongside calcium and vitamin D. For pain that has become widespread or nerve-like, low doses of medicines such as amitriptyline are sometimes used for their effect on pain signals and sleep rather than on mood.",
      ],
      links: [
        { label: "Gout medication in the UK", href: "/blog/gout-medication-uk" },
        { label: "Febuxostat for gout", href: "/guides/febuxostat-for-gout" },
        { label: "Amitriptyline for pain", href: "/library/amitriptyline" },
      ],
    },
    {
      heading: "Staying safe on long-term medicines",
      paragraphs: [
        "A few habits make long-term treatment safer and easier:",
      ],
      bullets: [
        "Follow the plan your own rheumatology team or GP gives you, and never start, stop or change a dose yourself.",
        "Keep your blood-test appointments and know how to reach your rheumatology advice line.",
        "Tell every doctor, dentist and pharmacist what you take, including supplements and herbal remedies.",
        "Ask what to do if you become unwell with an infection, as some medicines are paused during illness only on your team's advice.",
        "Check vaccine advice before any jab, especially live vaccines.",
        "Raise pregnancy plans early, whatever your sex, as some medicines need changing months ahead.",
        "If you pay for prescriptions in England, look into a prepayment certificate.",
      ],
      links: [
        { label: "Supplement and medicine interactions", href: "/blog/medication-supplement-interactions-arthritis" },
        { label: "Prescription costs and prepayment certificates", href: "/blog/prescription-costs-and-arthritis-nhs-prepayment-certificates" },
        { label: "Stopping arthritis medication safely", href: "/blog/stopping-arthritis-medication-safely-a-step-by-step-guide" },
        { label: "Talking to your GP about medication worries", href: "/blog/expert-qa-how-to-talk-to-your-gp-about-medication-worries" },
      ],
    },
    {
      heading: "Questions worth asking when a new medicine is suggested",
      paragraphs: [
        "It is normal to feel uncertain about a new medicine. Writing questions down before your appointment helps. Useful ones include: what is this for and what should I notice if it is working; how long before I can tell; what side effects should I report and how quickly; which blood tests do I need and how often; can I drink alcohol; what about pregnancy, vaccines and infections; and what happens if it does not work.",
        "The NHS website, the British National Formulary (BNF) patient information and the leaflet in your medicine box are all reliable places to read more.",
      ],
    },
  ],
  faqs: [
    {
      q: "How long do arthritis medicines take to work?",
      a: "Painkillers and anti-inflammatories usually help within hours. Steroid injections often help within days. DMARDs, biologics and JAK inhibitors typically take weeks to a few months to reach their full effect, so your team will usually review you after a set period before deciding whether it is working.",
    },
    {
      q: "Why do I need blood tests on some arthritis medicines?",
      a: "Several disease-modifying medicines can affect your blood count, liver or kidneys, often without symptoms at first. Regular tests let your team spot changes early and adjust treatment safely. The schedule depends on the medicine and how long you have been taking it.",
    },
    {
      q: "Can I stop my medicine if I feel better?",
      a: "Please do not stop without talking to your rheumatology team or GP. Feeling better often means the medicine is working. Stopping suddenly can trigger a flare, and stopping steroids suddenly can be dangerous. Some people can reduce treatment later, but only with a planned approach agreed with their team.",
    },
    {
      q: "Is it safe to take supplements with arthritis medicines?",
      a: "Some supplements interact with arthritis medicines or affect the liver or bleeding. Always tell your pharmacist and rheumatology team before starting a supplement or herbal remedy, and bring the packet with you if you are unsure what it contains.",
    },
    {
      q: "What should I do if I get an infection while on a DMARD or biologic?",
      a: "Contact your GP or rheumatology advice line promptly and tell them what you take. Some medicines are paused during an infection, but only on professional advice. Seek urgent help for high fever, breathlessness, confusion or feeling very unwell.",
    },
    {
      q: "Do I have to pay for arthritis prescriptions?",
      a: "Prescriptions are free in Scotland, Wales and Northern Ireland. In England, charges apply unless you are exempt, for example because of age or certain benefits. A prescription prepayment certificate can reduce the cost if you need several items regularly.",
    },
  ],
  related: [
    { label: "Arthritis treatment hub", href: "/blog/arthritis-treatment-hub" },
    { label: "Arthritis medication guide", href: "/blog/arthritis-medication-guide" },
    { label: "Surgery options", href: "/treatments/surgery-options" },
    { label: "Complementary therapies", href: "/treatments/complementary-therapies" },
  ],
};
