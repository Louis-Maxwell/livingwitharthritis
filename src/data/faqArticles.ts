/**
 * FAQ article cluster — 19 evidence-based answers feeding the
 * "Living With Arthritis" pillar page. Each entry powers a static
 * route at /faq/:slug rendered by src/pages/FaqArticle.tsx.
 */
export interface FaqSection {
  heading: string;
  content: string;
}

export interface FaqArticle {
  id: number;
  slug: string;
  title: string;
  question: string;
  quickAnswer: string;
  sections: FaqSection[];
  relatedArticles: string[];
  category: string;
}

export const faqArticles: FaqArticle[] = [
  {
    id: 1,
    slug: 'can-arthritis-cause-fatigue',
    title: 'Can Arthritis Cause Fatigue?',
    question: 'Can arthritis cause fatigue?',
    quickAnswer:
      "Yes. Arthritis fatigue is real and common. It's caused by inflammation, chronic pain, poor sleep, and the body fighting disease.",
    sections: [
      { heading: 'What is Arthritis Fatigue?', content: "Arthritis fatigue is different from regular tiredness. It's a persistent, overwhelming exhaustion that doesn't improve with rest. People describe it as 'bone-deep tiredness' or feeling like they're moving through water. It can be more limiting than joint pain itself." },
      { heading: 'What Causes It?', content: 'Several factors contribute: inflammation releases chemicals that make you tired, chronic pain disrupts sleep, some medications cause fatigue, and the stress of managing arthritis drains energy. Depression and anxiety, common with arthritis, also cause fatigue.' },
      { heading: 'How to Manage Arthritis Fatigue', content: "Pace your activities (rest before you're exhausted), exercise gently (improves energy long-term), improve sleep hygiene, manage stress, eat anti-inflammatory foods, and talk to your doctor about medication side effects." },
      { heading: 'When to See Your GP', content: 'See your GP if fatigue is worsening, preventing daily activities, or accompanied by fever or depression.' },
    ],
    relatedArticles: ['arthritis-and-sleep', 'arthritis-and-mental-health'],
    category: 'Symptom Management',
  },
  {
    id: 2,
    slug: 'arthritis-employment-rights-uk',
    title: 'Arthritis and Employment Rights in the UK',
    question: 'What are my employment rights with arthritis in the UK?',
    quickAnswer:
      "The Equality Act 2010 protects you from discrimination and requires employers to make 'reasonable adjustments' for your arthritis.",
    sections: [
      { heading: 'Your Legal Rights', content: 'Under the Equality Act 2010, arthritis is a disability if it substantially limits your ability to do normal activities. This means employers must protect you from discrimination and make adjustments to help you work.' },
      { heading: 'Reasonable Adjustments', content: "Employers must make changes like: flexible working hours, ergonomic equipment, allowing breaks, remote working, modified tasks, accessible facilities. They don't have to make adjustments that cause 'undue hardship.'" },
      { heading: 'Your Right to Flexible Working', content: 'After 26 weeks in a job, you can request flexible working (reduced hours, working from home, different schedule). Your employer must consider it. They can refuse only if it causes business hardship.' },
      { heading: 'What to Do if Discriminated Against', content: 'Document incidents, speak with HR or your manager, seek advice from ACAS (free), consider a grievance, and if needed, take a claim to an employment tribunal.' },
    ],
    relatedArticles: ['arthritis-disability-benefits-uk', 'returning-to-work-arthritis'],
    category: 'Work & Support',
  },
  {
    id: 3,
    slug: 'arthritis-disability-benefits-uk',
    title: 'Arthritis and Disability Benefits in the UK',
    question: 'What disability benefits can I get with arthritis in the UK?',
    quickAnswer:
      'Depending on how arthritis affects you, you may qualify for Personal Independence Payment (PIP), Employment Support Allowance (ESA), or other benefits.',
    sections: [
      { heading: 'Personal Independence Payment (PIP)', content: "For people aged 16-64. It's not means-tested. You get money if arthritis affects your ability to move around or care for yourself. Two rates: Standard (low difficulty) or Enhanced (significant difficulty). Average payment £184-627/month." },
      { heading: 'Employment Support Allowance (ESA)', content: "If arthritis prevents you working. Contributory ESA (based on National Insurance) or Income-related ESA (means-tested). You'll need medical evidence and a Work Capability Assessment." },
      { heading: 'Other Benefits', content: "Attendance Allowance (65+), Disability Living Allowance (under 16), Carer's Allowance (if someone cares for you). Each has different eligibility criteria." },
      { heading: 'How to Apply', content: 'Contact DWP, request claim packs, provide medical evidence (GP letters help), attend assessments, and appeal if refused. Citizens Advice can help with applications.' },
    ],
    relatedArticles: ['arthritis-employment-rights-uk'],
    category: 'Support & Benefits',
  },
  {
    id: 4,
    slug: 'best-exercises-arthritis',
    title: 'Best Exercises for Arthritis Sufferers',
    question: 'What are the best exercises for people with arthritis?',
    quickAnswer:
      'Low-impact exercises like walking, swimming, and gentle strength training are ideal. They reduce pain, improve mobility, and strengthen muscles around joints.',
    sections: [
      { heading: 'Low-Impact Cardio', content: 'Walking (30 mins, 5 days/week), swimming, water aerobics, cycling, elliptical trainer. These get your heart rate up without stressing joints.' },
      { heading: 'Strength Training', content: 'Strong muscles support joints. Use light weights, resistance bands, or bodyweight (push-ups against wall, squats). Do 2-3 times/week. Start light and progress gradually.' },
      { heading: 'Flexibility & Stretching', content: 'Yoga (gentle classes), tai chi, daily stretching. Hold stretches 15-30 seconds. This reduces stiffness and improves range of motion.' },
      { heading: 'Tips for Safe Exercise', content: 'Warm up 5 mins first, stop if sharp pain develops (mild discomfort OK), ice after if swollen, rest days between workouts, work with a physiotherapist initially.' },
    ],
    relatedArticles: ['arthritis-pain-management', 'can-arthritis-cause-fatigue'],
    category: 'Exercise & Movement',
  },
  {
    id: 5,
    slug: 'reduce-arthritis-pain-naturally',
    title: 'How to Reduce Arthritis Pain Naturally',
    question: 'How can I reduce arthritis pain naturally?',
    quickAnswer:
      'Heat therapy, gentle exercise, anti-inflammatory foods, weight management, sleep, and stress reduction all reduce arthritis pain without medication.',
    sections: [
      { heading: 'Heat & Cold Therapy', content: 'Heat (hot water bottle, warm bath, heating pad) reduces stiffness. Cold (ice pack) reduces swelling. Use 15-20 mins at a time. Test which helps you most.' },
      { heading: 'Anti-Inflammatory Foods', content: 'Omega-3 fish, olive oil, colourful vegetables, berries, nuts, turmeric, ginger. These contain natural compounds that reduce inflammation.' },
      { heading: 'Gentle Movement', content: 'Walking, swimming, yoga, tai chi. Movement reduces pain more than rest in most cases. Start gently.' },
      { heading: 'Sleep, Stress, Weight', content: 'Good sleep helps inflammation. Stress worsens pain (try meditation). Extra weight stresses joints (even 5kg loss helps).' },
    ],
    relatedArticles: ['best-exercises-arthritis', 'arthritis-pain-management'],
    category: 'Pain Management',
  },
  {
    id: 6,
    slug: 'what-is-osteoarthritis',
    title: 'What is Osteoarthritis?',
    question: 'What is osteoarthritis?',
    quickAnswer:
      'Osteoarthritis is the most common type of arthritis, caused by wear and tear of cartilage. It typically affects the knees, hips, hands, and spine.',
    sections: [
      { heading: 'How Osteoarthritis Develops', content: 'Cartilage (smooth tissue covering bones) gradually wears away, causing pain, stiffness, and inflammation. It usually develops slowly over years. Risk factors: age, female sex, previous injury, obesity, family history.' },
      { heading: 'Symptoms', content: 'Joint pain (especially with activity), stiffness (especially morning), swelling, reduced movement, creaking sounds, pain in bad weather.' },
      { heading: 'Treatment', content: 'Pain relief, anti-inflammatory drugs, injections, exercise, weight management, heat therapy. Surgery for severe cases.' },
      { heading: 'Can It Be Prevented?', content: 'No guaranteed prevention, but manage weight, stay active, protect joints from injury, eat well, and manage related conditions.' },
    ],
    relatedArticles: ['what-is-rheumatoid-arthritis', 'best-exercises-arthritis'],
    category: 'Condition Guides',
  },
  {
    id: 7,
    slug: 'what-is-rheumatoid-arthritis',
    title: 'What is Rheumatoid Arthritis?',
    question: 'What is rheumatoid arthritis?',
    quickAnswer:
      'Rheumatoid arthritis is an autoimmune condition where the immune system attacks joints, causing swelling, pain, and fatigue.',
    sections: [
      { heading: 'What Happens in RA', content: "Your immune system mistakenly attacks the joints' protective lining, causing inflammation, swelling, pain, and eventually joint damage. Affects hands, feet, and other joints. More serious than OA." },
      { heading: 'Symptoms', content: 'Joint pain and swelling (usually hands, feet, wrists), morning stiffness (over 30 mins), fatigue, low-grade fever, depression.' },
      { heading: 'Diagnosis & Treatment', content: 'Blood tests (rheumatoid factor, CCP), ultrasound, X-rays. Treatment: DMARDs (disease-modifying drugs), biologics, pain relief, physiotherapy, lifestyle changes.' },
      { heading: 'Living Well with RA', content: 'Early aggressive treatment is key. Most people can achieve remission or low disease activity with modern drugs. Work closely with your rheumatologist.' },
    ],
    relatedArticles: ['what-is-osteoarthritis', 'arthritis-and-mental-health'],
    category: 'Condition Guides',
  },
  {
    id: 8,
    slug: 'what-is-juvenile-arthritis',
    title: 'What is Juvenile Arthritis?',
    question: 'What is juvenile arthritis?',
    quickAnswer:
      'Juvenile arthritis is arthritis in children under 16. Despite the name, it can persist into adulthood and requires early, aggressive treatment.',
    sections: [
      { heading: 'Types of Juvenile Arthritis', content: 'Oligoarticular JA (1-4 joints affected), polyarticular JA (5+ joints), systemic JA (fever, rash, whole-body symptoms). Each requires different treatment.' },
      { heading: 'Impact on Children', content: 'Can affect growth, school attendance, social development, self-esteem. Early diagnosis and treatment are crucial to prevent permanent joint damage.' },
      { heading: 'Treatment', content: 'DMARDs, biologics, physiotherapy, occupational therapy, psychology support. Prognosis has improved dramatically with modern medications.' },
      { heading: 'Support Available', content: 'Specialist paediatric rheumatologists, school support, summer camps for kids with JA, benefits/allowances, family counselling.' },
    ],
    relatedArticles: ['what-is-rheumatoid-arthritis'],
    category: 'Condition Guides',
  },
  {
    id: 9,
    slug: 'can-arthritis-affect-young-people',
    title: 'Can Arthritis Affect Younger People?',
    question: 'Can arthritis affect younger people?',
    quickAnswer:
      "Yes. Arthritis isn't just for older people. Rheumatoid arthritis often develops in people 40-60, but any type can develop at any age, including teenagers.",
    sections: [
      { heading: 'Arthritis in Young Adults', content: 'Rheumatoid arthritis commonly develops in 30-50 year olds (more women). Osteoarthritis can develop in people 30+ with previous injuries. Living with arthritis as a young person brings unique challenges: work, relationships, appearance concerns.' },
      { heading: 'Arthritis in Children', content: "Juvenile arthritis affects about 12,000 UK children. It's an autoimmune condition. Early treatment prevents permanent damage." },
      { heading: 'Impact on Young People', content: 'Young people often feel isolated, struggle with peer relationships, worry about future, face barriers at work, manage medication side effects. Psychological support is important.' },
      { heading: 'Support & Resources', content: "Young people's arthritis services, online support groups, workplace support, school assistance, benefits if eligible." },
    ],
    relatedArticles: ['what-is-juvenile-arthritis', 'arthritis-and-mental-health'],
    category: 'Life with Arthritis',
  },
  {
    id: 10,
    slug: 'is-arthritis-a-disability',
    title: 'Is Arthritis a Disability?',
    question: 'Is arthritis considered a disability?',
    quickAnswer:
      "Legally, yes — if it substantially limits your ability to do normal activities. This means you're protected by the Equality Act 2010.",
    sections: [
      { heading: 'Legal Definition', content: 'Under UK law, arthritis is a disability if it substantially and long-term limits your ability to carry out normal day-to-day activities. This includes work, self-care, mobility, relationships.' },
      { heading: "What 'Substantial' Means", content: "More than minor or trivial impact. If arthritis stops you doing something most people do, it's substantial. Examples: unable to walk far, can't dress yourself, can't work full-time." },
      { heading: 'Your Rights', content: 'Protection from discrimination, access to reasonable adjustments, eligibility for benefits, right to flexible working, occupational health support at work.' },
      { heading: 'Telling People', content: "You don't have to disclose disability to employers unless you need adjustments. Some people worry about stigma, but disclosure often helps." },
    ],
    relatedArticles: ['arthritis-employment-rights-uk', 'arthritis-disability-benefits-uk'],
    category: 'Legal & Support',
  },
  {
    id: 11,
    slug: 'arthritis-and-pregnancy',
    title: 'Arthritis and Pregnancy',
    question: 'How does arthritis affect pregnancy?',
    quickAnswer:
      'Many women find arthritis improves during pregnancy due to immune changes. However, some find it worsens. Plan ahead with your rheumatologist.',
    sections: [
      { heading: 'How Pregnancy Affects Arthritis', content: "Hormonal changes often improve RA symptoms (70% improve). OA symptoms usually stay the same. But some people worsen. Everyone's different." },
      { heading: 'Medication & Pregnancy', content: 'Some arthritis drugs are safe in pregnancy (talk to rheumatologist). Others must be stopped. Plan pregnancy with your doctor. Most biological drugs are safe during pregnancy and breastfeeding.' },
      { heading: 'Pregnancy Planning', content: 'See rheumatologist before trying to conceive. Discuss medication, discuss contraception if not ready, arrange prenatal care with awareness of arthritis, prepare for postpartum flare (common).' },
      { heading: 'After Pregnancy', content: 'Flares are common in postpartum period. Breastfeeding is possible (most drugs safe). Support with baby care as soon as possible. Postpartum depression more likely with arthritis.' },
    ],
    relatedArticles: ['arthritis-and-mental-health'],
    category: 'Life with Arthritis',
  },
  {
    id: 12,
    slug: 'arthritis-and-sleep',
    title: 'Arthritis and Sleep Problems',
    question: 'Why does arthritis cause sleep problems?',
    quickAnswer:
      'Pain and inflammation keep you awake and reduce sleep quality. Poor sleep worsens arthritis. Breaking this cycle is important.',
    sections: [
      { heading: 'Why Arthritis Disrupts Sleep', content: 'Joint pain wakes you at night, morning stiffness worse with poor sleep, inflammation rises at night, anxiety/depression reduce sleep quality, some medications disrupt sleep.' },
      { heading: 'The Sleep-Arthritis Cycle', content: 'Poor sleep worsens inflammation, which worsens pain, which worsens sleep. Breaking this cycle is crucial.' },
      { heading: 'Sleep Tips for Arthritis', content: 'Take pain relief before bed, use pillows for joint support, keep bedroom cool and dark, try relaxation (meditation, breathing), avoid caffeine after 2pm, establish routine, exercise during day (not evening).' },
      { heading: 'When to Seek Help', content: 'If sleep problems persist, ask GP about sleep aids (short-term), cognitive behavioural therapy for insomnia (CBT-I), review medications, check for sleep apnoea.' },
    ],
    relatedArticles: ['can-arthritis-cause-fatigue', 'reduce-arthritis-pain-naturally'],
    category: 'Symptom Management',
  },
  {
    id: 13,
    slug: 'arthritis-flare-management',
    title: 'What to Do During an Arthritis Flare',
    question: 'What should I do when I have an arthritis flare?',
    quickAnswer:
      'Rest affected joints, use ice, take pain relief, maintain some gentle movement, rest more than usual, and contact your doctor if it worsens.',
    sections: [
      { heading: 'What is a Flare?', content: 'A sudden increase in pain, swelling, and inflammation. Flares vary in length (days to weeks). Triggers: infections, stress, weather changes, overactivity, stopping medication.' },
      { heading: 'Immediate Actions', content: 'Rest affected joint, ice for 15-20 mins (reduces swelling), take usual pain relief, reduce activities, sleep if possible.' },
      { heading: 'During the Flare', content: 'Protect the joint (splint if needed), apply heat later (24 hours after swelling), do gentle range-of-motion (keep moving gently), maintain nutrition and sleep.' },
      { heading: 'When to See Doctor', content: "If new joints affected, if fever develops, if flare doesn't improve in 2-3 days, if you can't manage pain, if you're distressed. May need medication adjustment." },
    ],
    relatedArticles: ['reduce-arthritis-pain-naturally', 'arthritis-pain-management'],
    category: 'Flare Management',
  },
  {
    id: 14,
    slug: 'returning-to-work-arthritis',
    title: 'Returning to Work with Arthritis',
    question: 'How do I return to work after arthritis diagnosis?',
    quickAnswer:
      'Work with occupational health, request reasonable adjustments, plan gradual return, communicate with your manager, and take breaks as needed.',
    sections: [
      { heading: 'Preparing to Return', content: 'Talk to occupational health, plan adjustments needed (equipment, hours, tasks), inform manager/HR (if you choose), get medical support letter, plan gradual return if needed.' },
      { heading: 'Reasonable Adjustments', content: 'Flexible hours, remote working, ergonomic equipment (chair, desk, keyboard), frequent breaks, modified duties, accessible facilities, understanding manager.' },
      { heading: 'Managing Work', content: "Pacing (don't overdo first week back), communicate if struggling, use lunch breaks to rest, don't hide pain (management helps), attend occupational health reviews." },
      { heading: 'Long-Term Work Success', content: 'Build good relationships, maintain open communication, review adjustments regularly, manage stress and workload, think long-term not short-term, consider career development alongside arthritis.' },
    ],
    relatedArticles: ['arthritis-employment-rights-uk', 'arthritis-and-mental-health'],
    category: 'Work & Support',
  },
  {
    id: 15,
    slug: 'arthritis-support-groups-uk',
    title: 'Arthritis Support Groups in the UK',
    question: 'Where can I find arthritis support groups in the UK?',
    quickAnswer:
      'Versus Arthritis runs local groups, online communities, and telephone support. Local hospital rheumatology services also run groups.',
    sections: [
      { heading: 'National Charity Support', content: 'Versus Arthritis runs local support groups (face-to-face), online communities, helplines, magazine subscriptions, educational webinars. Free to join.' },
      { heading: 'Online Communities', content: "Facebook groups (search 'arthritis UK' for moderated groups), Reddit r/arthritis, patient forums, condition-specific communities (RA, OA, JA)." },
      { heading: 'NHS & Hospital Services', content: 'Many rheumatology services run patient support groups, patient education sessions, physiotherapy classes, nurse telephone lines.' },
      { heading: 'Benefits of Support Groups', content: 'Connect with others who understand, share coping strategies, reduce isolation, learn about treatments, emotional support, practical tips.' },
    ],
    relatedArticles: ['arthritis-and-mental-health'],
    category: 'Support & Resources',
  },
  {
    id: 16,
    slug: 'arthritis-pain-management',
    title: 'Pain Management Strategies for Arthritis',
    question: 'What are the best ways to manage arthritis pain?',
    quickAnswer:
      'A combination approach works best: medication, exercise, heat/cold, lifestyle changes, and psychological support.',
    sections: [
      { heading: 'Medication', content: 'Over-the-counter: paracetamol, ibuprofen. Prescription: stronger painkillers, anti-inflammatories, DMARDs for autoimmune types. Discuss with GP.' },
      { heading: 'Physical Methods', content: 'Heat/cold, massage, acupuncture, TENS machines, splints, ergonomic equipment. Different things work for different people.' },
      { heading: 'Movement & Exercise', content: 'Gentle exercise reduces pain long-term more than rest. Walking, swimming, yoga, strength training. Start gently.' },
      { heading: 'Psychological Support', content: 'Pain is partly psychological. Stress increases pain. Meditation, mindfulness, CBT, counselling, support groups all help pain.' },
    ],
    relatedArticles: ['best-exercises-arthritis', 'reduce-arthritis-pain-naturally'],
    category: 'Pain Management',
  },
  {
    id: 17,
    slug: 'arthritis-and-mental-health',
    title: 'Arthritis and Mental Health',
    question: 'How does arthritis affect mental health?',
    quickAnswer:
      'Chronic pain, fatigue, and lifestyle changes often lead to depression and anxiety. These are common, treatable, and important to address.',
    sections: [
      { heading: 'Arthritis & Depression', content: 'Chronic arthritis increases depression risk 2-3x. Caused by pain, fatigue, lifestyle limitations, isolation, uncertainty about future. Symptoms: persistent low mood, loss of interest, sleep problems, fatigue.' },
      { heading: 'Arthritis & Anxiety', content: 'Common with new diagnosis, flares, work worries, fear of disability, social anxiety. Anxiety worsens pain (vicious cycle).' },
      { heading: 'Getting Help', content: 'Talk to GP (not weakness), counselling/psychotherapy, CBT (proven effective), antidepressants if needed, support groups, friends/family support, occupational psychology.' },
      { heading: 'Self-Care', content: 'Maintain social connections, do enjoyable activities despite pain, exercise, sleep well, eat well, practise mindfulness, set achievable goals.' },
    ],
    relatedArticles: ['arthritis-support-groups-uk', 'returning-to-work-arthritis'],
    category: 'Mental Health',
  },
  {
    id: 18,
    slug: 'arthritis-medication-explained',
    title: 'Understanding Arthritis Medications',
    question: 'What medications are used to treat arthritis?',
    quickAnswer:
      'Medications range from pain relief to disease-modifying drugs (DMARDs) and biologics. Each works differently and has different benefits/risks.',
    sections: [
      { heading: 'Pain Relief', content: 'Paracetamol (safe, mild), NSAIDs (ibuprofen, naproxen — stronger but side effects), opioids (strong, for severe pain). Start lowest effective dose.' },
      { heading: 'DMARDs (Disease-Modifying Antirheumatic Drugs)', content: 'Used for autoimmune arthritis (RA, PsA). Slow disease progression. Examples: methotrexate, sulfasalazine, leflunomide. Need regular blood tests.' },
      { heading: 'Biologics', content: 'Newer medications targeting immune system. TNF inhibitors, IL-6 inhibitors, JAK inhibitors. Very effective but expensive. Given by injection or infusion.' },
      { heading: 'Steroid Injections', content: "Anti-inflammatory injections into joints. Provide short-term relief. Can't be used too frequently (risks joint damage)." },
    ],
    relatedArticles: ['arthritis-pain-management'],
    category: 'Treatment',
  },
  {
    id: 19,
    slug: 'living-well-arthritis-tips',
    title: '20 Tips for Living Well With Arthritis',
    question: 'What are practical tips for living well with arthritis?',
    quickAnswer:
      'Exercise regularly, manage weight, eat anti-inflammatory foods, pace activities, sleep well, manage stress, maintain relationships, and seek support.',
    sections: [
      { heading: 'Daily Living', content: '1. Exercise gently (swimming, walking). 2. Use heat therapy for stiffness. 3. Take breaks before exhaustion. 4. Use helpful equipment (jar openers, grab bars). 5. Manage weight if needed. 6. Eat anti-inflammatory foods. 7. Sleep 7-9 hours.' },
      { heading: 'Emotional Wellbeing', content: '8. Join support groups. 9. Talk to someone (counsellor, GP). 10. Practise meditation/mindfulness. 11. Maintain hobbies you enjoy. 12. Stay connected with friends. 13. Be kind to yourself. 14. Plan for flares.' },
      { heading: 'Practical Strategies', content: '15. Work with your doctor. 16. Use aids and equipment. 17. Plan ahead for activities. 18. Communicate your needs. 19. Celebrate small wins. 20. Remember: arthritis is a journey — adjustments happen gradually.' },
      { heading: 'Key Takeaway', content: 'Living well with arthritis is possible. It requires self-management, support, and patience. Most people adapt and continue doing meaningful activities.' },
    ],
    relatedArticles: ['arthritis-and-mental-health', 'returning-to-work-arthritis'],
    category: 'Life with Arthritis',
  },
];
