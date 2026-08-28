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
      { heading: 'What Arthritis Fatigue Feels Like', content: "Arthritis fatigue is a persistent, body-wide exhaustion that rest does not fix. Patients describe it as 'wading through treacle' or waking unrefreshed despite a full night in bed. It often arrives in waves, peaking in the afternoon, and is reported by 40-80% of people with inflammatory arthritis. Unlike normal tiredness it can flatten motivation, concentration and short-term memory, and is frequently rated as more disabling than joint pain itself. Recognising it as a genuine symptom — not laziness — is the first step to managing it well." },
      { heading: 'Why the Immune System Drives Tiredness', content: "Inflammatory cytokines such as TNF-alpha, IL-6 and IL-1 cross the blood-brain barrier and trigger 'sickness behaviour' — the same fog you feel during flu. In rheumatoid arthritis, psoriatic arthritis and lupus these chemicals are chronically raised, so the brain receives a constant 'be tired' signal. Anaemia of chronic disease, low iron or low vitamin D often compound the effect. Treating the underlying inflammation with DMARDs or biologics frequently reduces fatigue even when pain scores stay the same." },
      { heading: 'The Pain-Sleep-Fatigue Loop', content: "Night-time joint pain fragments deep sleep, raising morning inflammatory markers and lowering pain tolerance the next day. This three-way loop is one of the strongest predictors of poor quality of life. Our guide to arthritis and sleep covers practical fixes — supportive pillows, pre-bed analgesia, and a cool dark bedroom. Treat sleep as medicine, not a luxury." },
      { heading: 'Movement is the Counter-Intuitive Fix', content: "Trial evidence is consistent: graded aerobic exercise reduces fatigue by 20-30% within 8-12 weeks. Begin with 10 minutes of walking, cycling or pool work most days and build slowly. See our best exercises for arthritis for a safe starting plan. Resistance work twice a week also restores the muscle mass that chronic inflammation strips away." },
      { heading: 'Diet, Hydration and Energy', content: "Anti-inflammatory eating patterns — oily fish, leafy greens, olive oil, nuts and legumes — are linked to lower fatigue scores. Spread protein across meals to support muscle, and keep blood sugar steady with whole grains rather than refined carbohydrates. Mild dehydration alone can drop energy by 10%, so aim for 1.5-2 litres of fluid daily unless your doctor has advised otherwise." },
      { heading: 'Mental Health Matters', content: "Depression and anxiety roughly double in chronic arthritis and amplify fatigue. Cognitive behavioural therapy, mindfulness and peer support all show measurable benefit. Read more in our arthritis and mental health hub. Speak to your GP if low mood lasts more than two weeks — treatment for the mood often lifts the fatigue too." },
      { heading: 'When Fatigue Needs Urgent Review', content: "Book a GP appointment if fatigue is worsening rapidly, accompanied by unexplained fever, weight loss, breathlessness or a new rash, or if you cannot complete basic daily tasks. These can signal a flare, anaemia, thyroid dysfunction or medication side-effect that needs prompt investigation." },
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
      { heading: 'Are You Protected by the Equality Act?', content: "Arthritis counts as a disability under the Equality Act 2010 when it has a 'substantial and long-term adverse effect' on day-to-day activities — meaning symptoms expected to last 12 months or more that affect tasks like typing, walking, lifting or concentrating. Protection applies from day one of employment, including during recruitment. You do not need to label yourself 'disabled' to claim these rights; the legal test is functional, not diagnostic. This protection covers direct and indirect discrimination, harassment and victimisation." },
      { heading: 'Do You Have to Disclose?', content: "There is no legal duty to disclose arthritis to a prospective or current employer, but rights to reasonable adjustments only begin once the employer knows — or could reasonably be expected to know — about your condition. Disclosure can be made to HR or occupational health in confidence, separately from your line manager. Health questions before a job offer are generally unlawful except for specific roles, so any pressure to declare at interview is usually a red flag." },
      { heading: 'What Counts as a Reasonable Adjustment', content: "Common adjustments include flexible or staggered hours, working from home, ergonomic seating and keyboards, voice-activated software, a parking space close to the entrance, lifts or ground-floor relocation, additional rest breaks, modified duties, and phased returns after a flare. 'Reasonable' is judged on the size of the business, cost, practicality and effect on others. Employers cannot charge you for adjustments and cannot use cost alone as a routine refusal." },
      { heading: 'Access to Work — A Government Grant', content: "Access to Work is a UK government scheme that funds equipment, travel-to-work costs, support workers and mental-health support that an employer would otherwise have to provide. Self-employed people are eligible too. Apply online at gov.uk; assessments are usually remote and grants can run to several thousand pounds per year. Many people use it for specialist chairs, dictation software or taxi fares during flares." },
      { heading: 'Occupational Health and Phased Returns', content: "Ask your GP or HR for an occupational health referral. The OH report is independent and carries weight in negotiating adjustments. After a flare or surgery a phased return — reduced hours building back over 4-12 weeks — is standard practice. See our returning to work guide for practical pacing tips." },
      { heading: 'Flexible Working Requests', content: "From April 2024 all employees can request flexible working from day one, twice in any 12-month period. Submit in writing; the employer must respond within two months and can only refuse on one of eight statutory business grounds. Combining a flexible working request with a reasonable-adjustment request strengthens your position." },
      { heading: 'Where to Get Help', content: "ACAS offers free confidential advice on 0300 123 1100. Citizens Advice helps with written requests and grievances. Disability Rights UK runs an advice line and produces detailed factsheets. If discrimination is suspected, raise an internal grievance first, then consider an Employment Tribunal claim within three months less one day of the incident." },
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
      { heading: 'Can You Have Children With Arthritis?', content: "Yes. Most women with arthritis have safe, healthy pregnancies and healthy babies. The condition itself rarely affects fertility, although some medications can. The key is planning ahead with a rheumatologist who specialises in pregnancy — ideally three to six months before trying to conceive — so disease activity is low and any teratogenic medication has been safely switched. Men with arthritis should also have a preconception review because some drugs (notably methotrexate and leflunomide) need stopping before conception." },
      { heading: 'How Pregnancy Changes Arthritis', content: "Around 60-70% of women with rheumatoid arthritis improve during pregnancy, often dramatically in the second and third trimesters, due to immune-modulating effects of pregnancy hormones. Lupus and axial spondyloarthritis can be less predictable and may flare. Osteoarthritis tends to stay the same or worsen mechanically as weight increases and ligaments soften. Hand and knee pain in late pregnancy are common and usually settle within months of delivery." },
      { heading: 'Medication Safety in Pregnancy', content: "Hydroxychloroquine, sulfasalazine, azathioprine, ciclosporin and most TNF-inhibitor biologics (especially certolizumab) have substantial safety data and can usually continue. Methotrexate, leflunomide, mycophenolate, cyclophosphamide and JAK inhibitors must be stopped before conception. NSAIDs are best avoided after 20 weeks. Low-dose prednisolone, paracetamol and short courses of opioids are generally considered safe. Never stop a DMARD without specialist advice — uncontrolled disease is itself a pregnancy risk." },
      { heading: 'Labour, Delivery and Pain Relief', content: "Most women can plan a vaginal delivery. Hip, knee or spine involvement may need extra positioning support — discuss this in advance with your midwife. Epidural anaesthesia is usually possible but a senior anaesthetic review is wise if the cervical spine, jaw or hips are affected. A short antenatal physiotherapy appointment to practise labour positions is invaluable." },
      { heading: 'The Postpartum Flare', content: "Rheumatoid arthritis flares within three to six months of delivery in roughly half of women, partly driven by falling pregnancy hormones and broken sleep. Restart maintenance DMARDs promptly — most are compatible with breastfeeding, including hydroxychloroquine, sulfasalazine and TNF inhibitors. Arrange extra help with lifting and night feeds, and book a rheumatology review within the first six weeks." },
      { heading: 'Breastfeeding With Arthritis', content: "Breastfeeding is possible for almost all women with arthritis. Side-lying positions and supportive cushions protect sore wrists, elbows and shoulders. Most modern DMARDs and biologics transfer in minimal amounts and are considered compatible. Methotrexate, leflunomide and cyclophosphamide remain contraindicated. The Breastfeeding Network Drugs in Breastmilk service offers free written advice." },
      { heading: 'Emotional Support and Looking Ahead', content: "Postnatal depression is twice as common in mothers with chronic illness. Build a support network early, accept help with childcare, and read our arthritis and mental health guide. With planning, most parents with arthritis raise children safely and confidently — the disease shapes the journey, it does not prevent it." },
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
      { heading: 'Recognising a Flare Early', content: "A flare is a sudden worsening of joint pain, swelling, stiffness and fatigue that lasts more than 24 hours and is clearly out of pattern for you. Early warning signs include heavier morning stiffness, low-grade fever, sleep disturbance, brain fog and a 'flu-ish' malaise the day before joints swell. Keeping a simple symptom diary — sleep, steps, mood, stress, food, weather — helps you spot triggers and intervene 24-48 hours earlier each time, which shortens flare duration significantly." },
      { heading: 'Common Triggers to Audit', content: "The most reported triggers are viral infections, emotional stress, missed or late medication, sudden weather changes, sleep loss, alcohol binges, ultra-processed food, dehydration and overdoing activity on a good day. Hormonal shifts and travel are also frequent. You cannot avoid every trigger, but identifying your top two or three lets you build prevention into normal life rather than reacting after the flare has started." },
      { heading: 'The First 48 Hours: Rest, Ice, Elevate', content: "Reduce load on the affected joints — sit when possible, swap a long walk for pool work or none at all. Apply a wrapped ice pack for 15-20 minutes every 2-3 hours for the first day to settle acute swelling, then switch to heat for morning stiffness. Take regular pain relief as prescribed rather than waiting for pain to peak. Aim for 8-9 hours of sleep and prioritise hydration." },
      { heading: '48-72 Hour Protocol', content: "Begin gentle range-of-motion movement every couple of hours — even five slow circles or stretches stops joints stiffening. Eat anti-inflammatory meals (oily fish, leafy greens, berries, olive oil) and avoid alcohol. Use splints only briefly to rest very painful hands or wrists; prolonged immobilisation weakens muscle and worsens recovery. Cancel non-essential commitments without guilt — recovery is the priority." },
      { heading: 'When to Contact Your GP or Rheumatology Team', content: "Call within 24 hours if you develop a fever above 38°C, a new hot swollen joint that could indicate infection, chest pain, breathlessness, a new rash, or if symptoms are not improving after 72 hours of self-care. Septic arthritis is an emergency. If you are on biologics or DMARDs, your rheumatology helpline can often adjust medication or arrange a steroid injection or short oral steroid course." },
      { heading: 'Activity Pacing and the Return to Normal', content: "Reintroduce activity at 50% of your pre-flare baseline and add roughly 10% per day. Use the 'two-day rule' — if pain is worse two days after an activity, the dose was too high. Our best exercises for arthritis guide includes gentle resumption plans for knees, hips and hands." },
      { heading: 'Preventing the Next Flare', content: "After every flare, review what came before it and pick one change for next time — earlier medication, better sleep, more hydration, or saying no to one extra commitment. Long-term, consistent low-impact exercise, anti-inflammatory eating, stress management and never skipping DMARDs cut flare frequency by 30-50% in most studies." },
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
      { heading: 'UK healthcare & Hospital Services', content: 'Many rheumatology services run patient support groups, patient education sessions, physiotherapy classes, nurse telephone lines.' },
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
      { heading: 'Why Arthritis and Low Mood Travel Together', content: "Chronic pain, fatigue and uncertainty are powerful drivers of depression and anxiety. People with inflammatory arthritis are two to three times more likely to experience clinical depression than the general population, and roughly one in three has significant anxiety. The same inflammatory cytokines that attack joints also act on the brain's mood circuits, which is why mental-health symptoms often track flare activity. Mental-health changes are a feature of the disease — not a personal failing." },
      { heading: 'The Identity Shift', content: "A diagnosis often forces a renegotiation of self-image: the runner who can no longer run, the parent who needs help lifting their child, the senior professional who suddenly needs adjustments. Grief for the pre-arthritis self is normal and predictable. Allowing that grief — rather than pushing through it — speeds psychological adjustment. Many people describe arriving at a new, more compassionate identity within 12-24 months of diagnosis." },
      { heading: 'Spotting Depression and Anxiety Early', content: "Warning signs include persistent low mood for more than two weeks, loss of interest in things you once enjoyed, sleep changes beyond what pain explains, social withdrawal, irritability, panic symptoms, or thoughts that life is not worth living. If any of these are present, contact your GP. UK healthcare Talking Therapies accepts self-referral in most areas and offers CBT specifically adapted for long-term physical conditions." },
      { heading: 'Treatments That Work', content: "Cognitive behavioural therapy, acceptance and commitment therapy, mindfulness-based stress reduction and graded activity scheduling all have strong evidence in arthritis populations. Antidepressants — particularly duloxetine — can reduce both mood symptoms and pain. Treatment usually combines therapy, lifestyle change and, where needed, medication. None of these are 'soft options' — they produce measurable changes in inflammatory markers as well as mood." },
      { heading: 'Movement as Antidepressant', content: "Regular low-impact exercise produces antidepressant effects comparable to mild-to-moderate medication. Pool exercise, walking, yoga and tai chi all qualify. The dose that helps mood is lower than the dose that builds fitness — 20-30 minutes most days is enough. Our best exercises for arthritis guide has safe starting points for stiff or painful joints." },
      { heading: 'Connection Beats Isolation', content: "Loneliness amplifies pain and slows recovery. Peer support — whether a local group, an online forum or a single trusted friend who 'gets it' — lowers depression scores within weeks. Telling one person about a bad day breaks the spiral. Read our full arthritis mental health hub for support directories and self-help tools." },
      { heading: 'When to Seek Urgent Help', content: "If you have thoughts of suicide or self-harm, contact your GP urgently, call 999 or 112, or call Samaritans free on 116 123 any time, day or night. In immediate danger call 999. Asking for help is a clinical step, not a weakness — and it works." },
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
  {
    id: 20,
    slug: 'arthritis-and-cold-weather',
    title: 'Why Cold Weather Worsens Arthritis',
    question: 'Why does arthritis get worse in cold weather?',
    quickAnswer:
      'Cold reduces blood flow, thickens joint fluid, tightens muscles, and lowers activity levels — all of which stiffen joints and amplify pain signals.',
    sections: [
      { heading: 'What the Science Actually Shows', content: "Large weather-tracking studies, including the Cloudy with a Chance of Pain project that followed 13,000 UK patients, found a small but consistent link between low temperature, low pressure, high humidity and increased joint pain. The effect is real but modest — roughly a 20% rise in pain on the worst weather days. It is not 'all in your head': peripheral nerve receptors respond to barometric change long before you notice the weather has turned." },
      { heading: 'Barometric Pressure and Joint Fluid', content: "When atmospheric pressure drops ahead of a cold front, tissues inside the joint capsule expand very slightly. In already-damaged joints this is enough to irritate nerve endings. Synovial fluid also becomes more viscous in the cold, so joints move with more internal drag, which the brain interprets as stiffness and pain." },
      { heading: 'Blood Vessels and Muscles in the Cold', content: "Cold causes peripheral blood vessels to constrict, reducing oxygen delivery to muscles around the joint. Muscles tighten reflexively to conserve heat, pulling on already-sensitive structures. People with Raynaud's — common alongside lupus, scleroderma and rheumatoid arthritis — feel this most sharply in fingers and toes." },
      { heading: 'The Hidden Trigger: Inactivity', content: "Most people simply move less in winter. Daily step counts can drop by 30-40% between July and January in the UK. Reduced movement means stiffer joints, weaker supporting muscles and lower mood — a triple hit that explains a large portion of 'winter arthritis'." },
      { heading: 'Five Practical Cold-Weather Strategies', content: "1. Layer up — thermal base layers, fingerless gloves indoors, heated insoles. 2. Warm the joint before activity with a hot shower, wheat bag or paraffin wax bath for hands. 3. Keep moving indoors — chair-based exercise, stairs, or a 10-minute walk after every meal. 4. Eat warm anti-inflammatory meals — soups, stews, oily fish, ginger and turmeric. 5. Top up vitamin D between October and March, as low levels worsen musculoskeletal pain." },
      { heading: 'When Winter Pain is Something More', content: "If a single joint becomes hot, red and very swollen, or if you develop fever, chest pain or breathlessness, do not blame the weather — contact your GP urgently. Sudden severe winter joint pain can occasionally indicate gout, infection or a new inflammatory diagnosis." },
    ],
    relatedArticles: ['arthritis-flare-management', 'best-exercises-arthritis', 'arthritis-footwear'],
    category: 'Symptom Management',
  },
  {
    id: 21,
    slug: 'best-pain-relief-creams-arthritis',
    title: 'Pain Relief Creams That Work for Arthritis',
    question: 'What pain relief creams work for arthritis?',
    quickAnswer:
      'Topical NSAIDs, capsaicin and menthol-based rubs all have evidence in arthritis — they work locally with far fewer side effects than tablets.',
    sections: [
      { heading: 'Why Choose a Topical First', content: "International guidelines now recommend topical anti-inflammatories as first-line drug treatment for hand and knee osteoarthritis. Drug levels in the bloodstream are roughly 5% of those reached by tablets, so stomach, kidney and cardiovascular risks are dramatically reduced. For people over 65 or with high blood pressure, ulcers or kidney disease, a cream is often the safer route to comparable pain relief." },
      { heading: 'Topical NSAIDs (Diclofenac, Ibuprofen, Ketoprofen)', content: "Topical diclofenac gel has the strongest evidence base for knee and hand OA, with pain reduction comparable to oral ibuprofen in head-to-head trials. Apply a 2-4 g dose (roughly the length of the affected joint) three to four times a day for at least two weeks before judging effect. Wash hands after use and avoid broken skin." },
      { heading: 'Capsaicin Cream', content: "Capsaicin, derived from chilli peppers, depletes the pain neurotransmitter substance P over 1-2 weeks of consistent use. Low-strength 0.025% creams are available without prescription. Expect a warm tingling for the first few applications. Best for hand OA and small-joint pain; not suitable for broken skin or near the eyes." },
      { heading: 'Menthol, Camphor and Methyl Salicylate Rubs', content: "These create a cooling or warming counter-irritant effect that distracts the nervous system from joint pain for 30-60 minutes. Evidence is modest but real, and they are useful before exercise or sleep. Avoid combining with a heat pad — burns can occur." },
      { heading: 'How to Apply for Best Results', content: "Wash and dry the skin. Massage in for 1-2 minutes until absorbed. Do not bandage tightly or apply heat over the top. Use consistently for at least two weeks before deciding whether it works. Combine with paced activity, splints or our hand exercises for hand OA." },
      { heading: 'When Creams Are Not Enough', content: "If pain still wakes you at night, prevents stairs or limits dressing despite two weeks of consistent use, see your GP. Options include oral medication, physiotherapy, joint injection or surgical review. Read our pain management guide for the full ladder of treatments." },
    ],
    relatedArticles: ['arthritis-pain-management', 'arthritis-hand-exercises', 'arthritis-medication-explained'],
    category: 'Pain Management',
  },
  {
    id: 22,
    slug: 'arthritis-exercise-myths',
    title: 'Common Myths About Exercise and Arthritis',
    question: 'What are common myths about exercise and arthritis?',
    quickAnswer:
      'The biggest myths — that exercise wears joints out, that rest is best, and that pain means damage — are wrong. Movement is one of the most effective arthritis treatments.',
    sections: [
      { heading: "Myth 1: 'Exercise Wears Joints Out'", content: "Cartilage is living tissue and depends on movement for nutrition — joint fluid is squeezed in and out like a sponge with every step. Decades of research, including long-term running studies, show that regular low-impact exercise does not cause or worsen osteoarthritis. It is inactivity, not activity, that accelerates joint degeneration." },
      { heading: "Myth 2: 'Rest is Best During a Flare'", content: "Brief rest for 24-48 hours during an acute flare is sensible, but complete bed rest is harmful. Muscles weaken within days, joints stiffen, mood drops and pain sensitivity rises. Gentle range-of-motion exercise even during a flare preserves function. Our flare management guide shows what to do day-by-day." },
      { heading: "Myth 3: 'No Pain, No Gain'", content: "In arthritis the opposite applies. Mild discomfort during exercise that settles within an hour is acceptable; sharp pain or pain still worse 24 hours later means the dose was too high. The right exercise intensity makes you breathe a little harder but does not flare you the next day." },
      { heading: "Myth 4: 'Painkillers Before Exercise Are a Cheat'", content: "For some people, a planned dose of paracetamol or a topical NSAID 30 minutes before activity is the difference between exercising and not exercising. Discuss with your GP, but using analgesia strategically to enable movement is good practice, not weakness." },
      { heading: "Myth 5: 'Strength Training Is Dangerous'", content: "Progressive resistance training is one of the strongest evidence-based treatments for knee and hip OA, reducing pain by 30-50% in trials. Start with bodyweight or light bands, two to three sessions per week, and progress gradually. Strong quadriceps absorb load that would otherwise hit the knee joint." },
      { heading: "Myth 6: 'I'm Too Old / Too Stiff to Start'", content: "Studies in people over 80 with severe OA show meaningful gains in strength, balance and pain within 8-12 weeks. It is never too late. Begin with chair-based exercise, pool work or 5-minute walks and build slowly." },
      { heading: 'What the Evidence Actually Recommends', content: "150 minutes of moderate aerobic activity per week, two strength sessions and daily flexibility work — the same prescription as for the general population, adapted to your joints. Our best exercises for arthritis guide gives a starter plan for every joint." },
    ],
    relatedArticles: ['best-exercises-arthritis', 'arthritis-flare-management', 'arthritis-hand-exercises'],
    category: 'Exercise & Movement',
  },
  {
    id: 23,
    slug: 'young-people-arthritis',
    title: 'Why Young People Get Arthritis',
    question: 'Why do young people get arthritis?',
    quickAnswer:
      'Arthritis is not just an older person\'s condition. Inflammatory, autoimmune, post-injury and genetic forms all affect children, teenagers and young adults.',
    sections: [
      { heading: 'Arthritis Affects All Ages', content: "Around 15,000 children and young people in the UK live with juvenile idiopathic arthritis, and many more young adults are diagnosed with rheumatoid arthritis, ankylosing spondylitis, psoriatic arthritis or lupus before the age of 40. Early-onset osteoarthritis also occurs after sports injuries, joint hypermobility or genetic cartilage disorders. The 'old person's disease' label is one of the biggest barriers to early diagnosis." },
      { heading: 'Juvenile Idiopathic Arthritis (JIA)', content: "JIA is an umbrella term for several autoimmune forms of arthritis starting before age 16. Symptoms include joint swelling lasting more than six weeks, morning stiffness, limping, fever and a salmon-pink rash in some subtypes. Eye inflammation (uveitis) is a hidden complication that requires regular screening. Modern biologics have transformed outcomes — most children now reach adulthood with little or no joint damage." },
      { heading: 'Inflammatory Arthritis in Young Adults', content: "Rheumatoid arthritis can begin in the 20s and 30s, often presenting with symmetrical small-joint pain, prolonged morning stiffness and fatigue. Axial spondyloarthritis typically starts with deep buttock or lower-back pain that wakes the second half of the night and improves with movement. Early specialist referral within 12 weeks of symptom onset dramatically improves long-term outcome." },
      { heading: 'Post-Traumatic Osteoarthritis', content: "Anterior cruciate ligament tears, meniscal injuries, ankle fractures and recurrent shoulder dislocations all raise the risk of OA decades earlier than the general population. Roughly half of footballers with a major knee injury develop knee OA within 10-20 years. Rehabilitation, weight management and ongoing strength work reduce that risk." },
      { heading: 'Genetic and Metabolic Causes', content: "Conditions such as Ehlers-Danlos syndrome, haemochromatosis, alkaptonuria and familial early OA can cause joint damage in teenagers and young adults. A family history of early arthritis warrants specialist review." },
      { heading: 'School, Work and Identity', content: "Young people with arthritis face unique challenges: missed school, visible joint swelling, restrictions in sport, and the social weight of looking 'fine' while feeling exhausted. Reasonable adjustments for exams, university and early career are available. Read our mental health guide — psychological support should be part of every young person's care plan." },
      { heading: 'The Outlook is Better Than Ever', content: "Earlier diagnosis, targeted biologics and structured rehabilitation mean most young people with arthritis now live active, full lives. The goal is no longer just symptom control but full remission and normal function." },
    ],
    relatedArticles: ['what-is-juvenile-arthritis', 'when-to-see-a-rheumatologist', 'arthritis-and-mental-health'],
    category: 'Conditions',
  },
  {
    id: 24,
    slug: 'weight-management-osteoarthritis',
    title: 'How Weight Loss Helps Osteoarthritis',
    question: 'Does weight loss help arthritis?',
    quickAnswer:
      'Yes. Losing 5-10% of body weight typically reduces knee pain by 20-50% and lowers systemic inflammation — one of the most effective non-drug treatments available.',
    sections: [
      { heading: 'The Mechanics: Every Pound Counts Fourfold', content: "Walking on level ground puts roughly four times your body weight through each knee with every step, and up to six times when going downstairs. Losing 5 kg therefore takes 20-30 kg of repetitive load off the joint with every step you take. This is why even modest weight loss produces large symptom changes in knee and hip OA." },
      { heading: 'Beyond Mechanics: Inflammation', content: "Fat tissue, particularly around the abdomen, is metabolically active and releases inflammatory cytokines that travel through the bloodstream to joints throughout the body. This explains why weight loss also improves symptoms in hand OA, where mechanical load is unaffected. C-reactive protein and IL-6 levels fall measurably within weeks of starting weight loss." },
      { heading: 'The 5-10% Threshold', content: "Trial evidence consistently shows that losing 5% of body weight gives measurable benefit, 10% gives substantial benefit, and combining weight loss with exercise is more effective than either alone. For an 85 kg person that is 4-8 kg — an achievable target over six to twelve months." },
      { heading: 'What to Eat', content: "Mediterranean-style eating — vegetables, legumes, whole grains, oily fish, nuts, olive oil, modest dairy, minimal ultra-processed food — produces sustainable loss without calorie counting and reduces inflammation independently. Our arthritis nutrition guide and foods to avoid page have practical meal templates. Crash diets fail and accelerate muscle loss." },
      { heading: 'Movement That Works With Painful Joints', content: "Pool exercise, stationary cycling, recumbent bikes and chair-based strength work all burn calories without stressing knees and hips. Start with 10 minutes most days and build. Combining cardio with twice-weekly resistance work preserves muscle, which is the main determinant of long-term function." },
      { heading: 'Sleep, Stress and Sustainable Habits', content: "Poor sleep raises ghrelin (hunger hormone) and lowers leptin (fullness hormone), making weight loss harder. Stress drives emotional eating. Address both alongside diet — they are not separate problems." },
      { heading: 'When to Seek Specialist Support', content: "If BMI is above 35 with significant joint pain, ask your GP about Tier 3 weight-management services, GLP-1 medication, or bariatric surgery. These options now sit firmly within mainstream arthritis care, not as a last resort." },
    ],
    relatedArticles: ['arthritis-and-nutrition', 'best-exercises-arthritis', 'what-is-osteoarthritis'],
    category: 'Life with Arthritis',
  },
  {
    id: 25,
    slug: 'arthritis-driving-adaptations',
    title: 'Driving Adaptations for Arthritis',
    question: 'What adaptations help with driving and arthritis?',
    quickAnswer:
      'Power steering, automatic transmission, swivel cushions, hand controls and steering aids can keep most people with arthritis driving safely for years longer.',
    sections: [
      { heading: 'Choosing the Right Vehicle', content: "An automatic gearbox removes one of the most painful tasks for a stiff left knee, hip or wrist. Look for light power steering, generous door openings, high seats that meet the hip rather than dropping below it, and a low boot lip. Many people find compact SUVs and 'crossover' models the easiest to get in and out of." },
      { heading: 'Getting In and Out', content: "A swivel cushion lets you sit first and then rotate your legs in as a unit, protecting hip and knee joints. A grab handle on the door pillar, or a portable handle that clips into the door latch, gives extra leverage when standing up. Park further out so the door can open fully." },
      { heading: 'Steering, Pedals and Gears', content: "Steering balls or 'spinner knobs' let people with weak grip or wrist arthritis steer with one hand. Pedal extensions help short drivers reach without overstretching. Full hand controls — accelerator and brake operated by hand — are available for people who cannot use their legs. All of these are fittable to most modern cars." },
      { heading: 'Long-Drive Strategies', content: "Plan a break every 60-90 minutes to walk for two or three minutes; static joints stiffen fast. Use a lumbar support cushion, keep cabin temperature warm, and time pain relief so the peak effect covers the drive. Avoid driving in the first hour after waking when morning stiffness is worst." },
      { heading: 'Getting a Professional Assessment', content: "Driving Mobility centres across the UK offer free or low-cost assessments by occupational therapists and driving instructors. They can recommend adaptations, trial vehicles and provide a formal report — useful evidence for Access to Work, Motability or DVLA discussions. Self-referral is allowed." },
      { heading: 'When Driving is No Longer Safe', content: "Warning signs include difficulty turning the head to check blind spots, slow reaction time, severe morning stiffness, or pain that distracts you. You must notify the DVLA of any condition that affects safe driving. Stopping driving is a major life adjustment — explore taxis, community transport, Motability schemes and family support before isolation sets in." },
    ],
    relatedArticles: ['arthritis-walking-aids', 'arthritis-employment-rights-uk', 'arthritis-travel-tips'],
    category: 'Life with Arthritis',
  },
  {
    id: 26,
    slug: 'arthritis-sleeping-positions',
    title: 'Best Sleeping Positions for Arthritis Pain',
    question: 'What are the best sleeping positions for arthritis pain?',
    quickAnswer:
      'Side-lying with a pillow between the knees, or back-lying with a pillow under the knees, takes pressure off most painful joints and improves sleep quality.',
    sections: [
      { heading: 'Why Position Matters', content: "Joints held in awkward positions for hours overnight stiffen and inflame. Choosing a posture that keeps the spine neutral and unloads inflamed joints can reduce morning pain by 30-40% without any medication change. Small props — a rolled towel, an extra pillow — often make a bigger difference than a new mattress." },
      { heading: 'Side-Lying — The All-Rounder', content: "Lie on the less painful side with knees slightly bent and a firm pillow between them to keep hips, pelvis and lumbar spine in line. Hug a second pillow with your top arm to support a painful shoulder. This position suits most hip, knee and lower-back arthritis." },
      { heading: 'Back-Lying for Hips, Knees and Lower Back', content: "Lie supine with a pillow under the knees to flatten the lumbar curve, and a small rolled towel under the neck (not the head) to support the cervical spine. Avoid stacking pillows under the head as this pushes the chin forward and aggravates neck arthritis." },
      { heading: 'Positions to Avoid', content: "Front-lying forces the neck into 90° rotation for hours and over-extends the lumbar spine — it is the worst position for neck, back, hip and shoulder arthritis. If you cannot break the habit, try a thin pillow under the pelvis to reduce lumbar arch." },
      { heading: 'Mattresses and Pillows', content: "Medium-firm mattresses outperform very soft or very hard ones in arthritis trials. Memory-foam or pocket-sprung hybrids reduce pressure points. Replace pillows every 18-24 months; flat pillows are a common hidden cause of morning neck pain." },
      { heading: 'Temperature, Bedding and Pre-Sleep Routine', content: "Cold joints stiffen overnight. A warm bath 60-90 minutes before bed, a heated mattress topper on a low setting, or a hot-water bottle on a sore joint all help. Keep the bedroom around 18°C with breathable bedding. Take any night-time analgesia 30 minutes before lying down so it peaks as you settle." },
      { heading: 'When to Get Help', content: "If pain wakes you more than three nights a week despite these changes, see your GP — uncontrolled night pain often signals that disease activity, medication or mood needs review. See our arthritis and sleep guide for more." },
    ],
    relatedArticles: ['arthritis-and-sleep', 'can-arthritis-cause-fatigue', 'reduce-arthritis-pain-naturally'],
    category: 'Symptom Management',
  },
  {
    id: 27,
    slug: 'arthritis-hand-exercises',
    title: 'Hand Exercises for Arthritis',
    question: 'What hand exercises help arthritis?',
    quickAnswer:
      'Daily gentle range-of-motion, grip and pinch exercises maintain dexterity, preserve grip strength and reduce pain in both osteoarthritis and rheumatoid arthritis of the hands.',
    sections: [
      { heading: 'Why Hand Exercise Matters', content: "Hands contain 27 small joints that stiffen fast without daily movement. Trial evidence shows that 10-15 minutes of hand exercise per day improves grip strength by 25%, reduces pain by 20% and preserves the ability to do everyday tasks like opening jars, dressing and writing. The effect is comparable to splinting and additional to any medication." },
      { heading: 'Warm Up First', content: "Always warm the hands first — five minutes in warm water, with a wheat bag, or with a paraffin wax bath. Cold stiff joints are more likely to flare during exercise. Apply a topical NSAID 30 minutes beforehand if recommended by your GP." },
      { heading: 'Range-of-Motion Exercises', content: "Make a slow fist then open the fingers wide, ten repetitions. Touch the thumb to each fingertip in turn, ten cycles. Bend each finger one knuckle at a time ('claw' then 'table-top' then 'straight'). Rotate the wrists in slow circles, ten each direction. These maintain joint glide." },
      { heading: 'Strengthening', content: "Squeeze a soft therapy ball or piece of putty for three seconds, release, repeat ten times. Progress to a firmer putty as comfort allows. Pinch putty between thumb and each finger in turn. Avoid heavy gripping during a flare — light putty is enough." },
      { heading: 'Dexterity Drills', content: "Pick up small objects (dried pasta, coins, beads) and transfer them between cups. Roll a pen between palms. These maintain fine motor control, which declines silently long before strength does." },
      { heading: 'How Often and How Much', content: "Aim for one or two short sessions a day, every day. Consistency beats intensity. If pain is worse 24 hours later, reduce the resistance or repetitions — never push through sharp pain. A hand therapist can tailor a programme to your specific joints." },
      { heading: 'When to Stop and Seek Help', content: "Stop if a joint becomes hot, red or visibly swollen mid-session. Persistent night pain, sudden loss of grip or a 'locked' finger needs prompt review. Read our hand arthritis condition guide for more support." },
    ],
    relatedArticles: ['best-exercises-arthritis', 'best-pain-relief-creams-arthritis', 'arthritis-exercise-myths'],
    category: 'Exercise & Movement',
  },
  {
    id: 28,
    slug: 'osteoarthritis-vs-rheumatoid-arthritis',
    title: 'Osteoarthritis vs Rheumatoid Arthritis',
    question: 'What is the difference between osteoarthritis and rheumatoid arthritis?',
    quickAnswer:
      'OA is mechanical wear of cartilage, usually in older adults and a few joints; RA is an autoimmune disease that attacks the joint lining symmetrically and can affect any age.',
    sections: [
      { heading: 'The Core Difference', content: "Osteoarthritis is a degenerative condition: cartilage thins and bone reshapes over decades, driven by load, injury, genetics and ageing. Rheumatoid arthritis is an autoimmune condition: the body's immune system attacks the synovial lining of joints, causing inflammation, swelling and eventual joint destruction. They share the word 'arthritis' but the biology, treatment and outlook are very different." },
      { heading: 'Who Gets Each Condition', content: "OA most commonly affects people over 50, often after a previous joint injury or in those carrying extra weight. RA can begin at any age — peak onset is 30-60 — affects women three times more often than men, and may follow infections, smoking or significant stress in genetically susceptible people." },
      { heading: 'Symptom Patterns', content: "OA pain is typically worse with activity and eases with rest; morning stiffness lasts under 30 minutes. It usually affects a few joints — most often knees, hips, hands and lower back — and is not symmetrical. RA causes prolonged morning stiffness over an hour, fatigue, low-grade fever and symmetrical swelling of small joints (knuckles, wrists, feet). Pain often eases with gentle activity." },
      { heading: 'How Doctors Tell Them Apart', content: "RA shows raised inflammatory markers (CRP, ESR) and often positive rheumatoid factor or anti-CCP antibodies in blood tests. Ultrasound and MRI show synovitis. OA blood tests are usually normal; X-rays show joint space narrowing, bone spurs and subchondral sclerosis. RA needs urgent rheumatology referral within 12 weeks of symptom onset." },
      { heading: 'Treatment Paths', content: "OA treatment focuses on weight loss, exercise, topical NSAIDs, occasional injections and ultimately joint replacement when function is lost. RA requires disease-modifying drugs (DMARDs) and often biologics to suppress the immune attack — early aggressive treatment prevents joint damage. Both benefit hugely from exercise, anti-inflammatory eating and mental-health support." },
      { heading: 'Outlook', content: "OA progresses slowly over years; modern joint replacements give excellent function. RA, treated early, often reaches remission and most patients live full active lives. Untreated RA causes irreversible joint damage within months — early diagnosis is everything." },
      { heading: 'What They Share', content: "Both respond to exercise, weight management, anti-inflammatory eating, sleep and mental-health care. Our living with arthritis pillar covers the lifestyle ground that helps every form of arthritis." },
    ],
    relatedArticles: ['what-is-osteoarthritis', 'what-is-rheumatoid-arthritis', 'when-to-see-a-rheumatologist'],
    category: 'Conditions',
  },
  {
    id: 29,
    slug: 'arthritis-and-nutrition',
    title: 'Nutrients That Help Arthritis',
    question: 'What nutrients help with arthritis?',
    quickAnswer:
      'Omega-3 fats, vitamin D, polyphenol-rich plants and a Mediterranean eating pattern have the strongest evidence for reducing arthritis pain and inflammation.',
    sections: [
      { heading: 'The Mediterranean Pattern Wins', content: "Of all the diets studied in arthritis, the Mediterranean pattern has the most consistent evidence. It reduces inflammatory markers, lowers pain scores, supports weight loss and improves cardiovascular health — important because RA itself raises heart-disease risk. The pattern is built on vegetables, legumes, whole grains, oily fish, nuts, olive oil and modest dairy, with minimal ultra-processed food." },
      { heading: 'Omega-3 Fatty Acids', content: "EPA and DHA from oily fish — salmon, mackerel, sardines, herring, anchovies — reduce inflammatory prostaglandins. Aim for two portions a week, or consider a 1-2 g daily fish-oil supplement if you do not eat fish. Plant sources (flaxseed, walnuts, chia) provide ALA, which converts only modestly to EPA but still adds anti-inflammatory value." },
      { heading: 'Vitamin D', content: "Around half of UK adults are vitamin-D insufficient in winter, and low levels are linked to higher musculoskeletal pain and worse arthritis outcomes. UK healthcare advice is to take 10 micrograms (400 IU) daily from October to March — many people with arthritis are advised to take this year-round. Have levels checked if pain is poorly controlled." },
      { heading: 'Polyphenols and Antioxidants', content: "Berries, dark leafy greens, green tea, extra-virgin olive oil, turmeric, ginger and dark chocolate (70%+) are rich in polyphenols that dampen inflammatory pathways. Variety matters more than chasing a single 'superfood'." },
      { heading: 'Protein and Muscle', content: "Chronic inflammation accelerates muscle loss. Spread 20-30 g of protein across each main meal — eggs, fish, poultry, dairy, legumes, tofu — to support the muscle that protects your joints. Older adults often need more, around 1.0-1.2 g per kg body weight daily." },
      { heading: 'What to Limit', content: "Ultra-processed food, added sugar, refined grains, processed meat, excess alcohol and trans fats all raise inflammatory markers. See our foods to avoid with arthritis guide for specifics. Small consistent swaps work better than restrictive 'detox' phases." },
      { heading: 'When Supplements Help', content: "Most nutrients should come from food, but vitamin D, omega-3 (if fish intake is low) and sometimes glucosamine or curcumin extracts have a reasonable evidence base. Discuss with your GP if you take blood thinners, immunosuppressants or have kidney disease before starting any supplement." },
    ],
    relatedArticles: ['weight-management-osteoarthritis', 'reduce-arthritis-pain-naturally', 'best-exercises-arthritis'],
    category: 'Diet & Nutrition',
  },
  {
    id: 30,
    slug: 'arthritis-walking-aids',
    title: 'When to Use a Walking Aid With Arthritis',
    question: 'When should I use a walking aid with arthritis?',
    quickAnswer:
      'Use a walking aid as soon as it lets you walk further, more confidently and with less pain — it preserves independence rather than reducing it.',
    sections: [
      { heading: 'Walking Aids Enable, They Do Not Disable', content: "Many people delay using a stick or frame because they fear becoming dependent. The opposite is true. A correctly chosen aid takes 20-25% of body weight off a painful hip or knee, lets you walk further, reduces fall risk and protects energy for the activities that matter. Most users wish they had started earlier." },
      { heading: 'The Walking Stick', content: "A single stick suits mild-to-moderate single-joint pain. Always hold it in the hand opposite the painful leg and move stick and bad leg together. Correct height: handle level with your wrist crease when arm hangs straight. A rubber ferrule, replaced annually, prevents slips." },
      { heading: 'Crutches and Forearm Crutches', content: "Two crutches suit short-term post-surgical use or bilateral joint pain. Forearm crutches give better posture and reduce wrist load compared with underarm crutches, which can damage nerves with prolonged use." },
      { heading: 'Walking Frames and Rollators', content: "A standard Zimmer frame suits indoor use when balance is poor. A wheeled rollator with brakes and a seat is the better choice for outdoor walking — it allows a natural gait, carries shopping, and provides a rest stop. Three-wheel rollators are lighter; four-wheel models more stable." },
      { heading: 'Getting Fitted Properly', content: "A 15-minute appointment with a physiotherapist or occupational therapist ensures correct height, technique and aid choice. Self-referral is available in many UK healthcare areas. Wrong-height sticks cause shoulder, back and wrist pain — a common but preventable problem." },
      { heading: 'The Psychological Step', content: "Using an aid in public can feel like a public admission of disability. Most people report that within a few weeks the freedom it brings — longer walks, less fear of falling, more energy at the destination — outweighs the self-consciousness. A folding stick that lives in a bag is often a useful starter step." },
      { heading: 'When You Need More Than a Stick', content: "If you are falling, struggling on stairs or limited indoors, ask your GP about a community OT assessment. Stairlifts, grab rails, perching stools and powered mobility scooters all sit on the same spectrum — tools that protect independence." },
    ],
    relatedArticles: ['arthritis-driving-adaptations', 'arthritis-footwear', 'living-well-arthritis-tips'],
    category: 'Life with Arthritis',
  },
  {
    id: 31,
    slug: 'arthritis-return-to-work',
    title: 'Returning to Work After an Arthritis Flare',
    question: 'How do I return to work after an arthritis flare?',
    quickAnswer:
      'A phased return, occupational health input, reasonable adjustments and honest pacing in the first month protect both your health and your job.',
    sections: [
      { heading: 'Plan Before You Return', content: "Book a GP appointment in the final week of sick leave to confirm fitness, agree any medication changes and request a fit note that recommends a phased return. Contact your line manager or HR a week before to share the proposed plan — surprises on day one help nobody. Ask for an occupational health referral if one has not already happened." },
      { heading: 'The Phased Return', content: "A typical phased return runs 4-12 weeks, starting at 40-60% of normal hours and building gradually. Mornings off can suit those with severe morning stiffness; shorter days suit those with afternoon fatigue. Use the fit note to formalise the schedule. Most employers cover full pay during a properly documented phased return." },
      { heading: 'Workstation and Environment', content: "Before day one, ask occupational health to assess your workstation. Common adjustments include an ergonomic chair, footrest, monitor riser, split keyboard, vertical mouse, voice-recognition software and a parking spot near the entrance. Access to Work funds equipment your employer would otherwise have to provide." },
      { heading: 'Pacing Through the Day', content: "Use the 'movement minute' rule — stand, stretch and walk for one minute every 30. Schedule the hardest task for the time of day your joints work best. Take your full lunch break away from the desk. Plan recovery evenings in the first fortnight — no commitments after work." },
      { heading: 'Talking to Your Manager', content: "Share what you need them to know, not necessarily a full diagnosis. 'I need a 5-minute break every hour to prevent stiffness' is more useful to a manager than a clinical history. Agree weekly check-ins for the first month, then monthly." },
      { heading: 'Reasonable Adjustments — Your Legal Right', content: "Under the Equality Act 2010 your employer must make reasonable adjustments. See our employment rights guide for full detail. Requests should be in writing and confirmed in writing — useful evidence if problems arise later." },
      { heading: 'When to Escalate', content: "If adjustments are refused without good reason, raise a formal grievance, contact ACAS on 0300 123 1100 for free advice, and consider a Disability Rights UK consultation. Most disputes resolve through dialogue, but knowing your options strengthens your position from the start." },
    ],
    relatedArticles: ['arthritis-employment-rights-uk', 'arthritis-flare-management', 'returning-to-work-arthritis'],
    category: 'Work & Support',
  },
  {
    id: 32,
    slug: 'arthritis-footwear',
    title: 'Footwear That Helps Arthritis Pain',
    question: 'What footwear helps arthritis pain?',
    quickAnswer:
      "A wide toe box, cushioned sole, rigid mid-foot, low heel and secure fastening cut foot, knee, hip and back pain in arthritis — far more than any 'orthopaedic' label.",
    sections: [
      { heading: 'Why Shoes Matter Beyond the Feet', content: "Every step travels a shock wave from the heel up through the knees, hips and spine. Hard, thin-soled or unstable shoes amplify that shock; well-cushioned shoes absorb it. Trial evidence shows that good footwear alone can reduce knee OA pain by 10-15% and dramatically improves walking distance." },
      { heading: 'The Five Features to Look For', content: "1. Wide rounded toe box — no pressure on bunions or swollen toe joints. 2. Cushioned sole, especially under the heel and ball of the foot. 3. Firm mid-foot ('twist test' — the shoe should resist twisting). 4. Heel height under 3 cm. 5. Laces, velcro or buckles for secure fit — never slip-on shoes that force the toes to grip." },
      { heading: 'Trainers Are Often the Best Choice', content: "Modern cushioned running and walking trainers tick most arthritis boxes. Look for 'stability' or 'motion control' models rather than minimalist or racing flats. Replace every 600-800 km or 12 months — the cushioning compresses long before the upper wears out." },
      { heading: 'Sandals, Slippers and Indoor Shoes', content: "Most flip-flops, mules and unsupportive slippers worsen arthritis pain. Choose adjustable strap sandals (the kind with a back strap) for summer and structured indoor shoes for home. Walking barefoot on hard floors aggravates foot, knee and hip OA in many people." },
      { heading: 'Insoles and Orthotics', content: "Off-the-shelf cushioned insoles (gel or foam) help most people and cost little. Custom orthotics, made after a podiatry assessment, are valuable for severe flat feet, leg-length differences, hallux rigidus or post-surgical change. UK healthcare podiatry referrals are available via your GP." },
      { heading: 'When Custom Footwear is Needed', content: "Severe foot deformity from rheumatoid arthritis, ulcers, dropped foot or fused joints may need bespoke shoes. UK healthcare orthotic services provide these. Bespoke shoes look more normal than they used to and dramatically extend independent walking." },
      { heading: 'A Quick Test', content: "Pick up the shoe. Twist the sole — it should bend at the toes, not in the middle. Bend the toe upwards — it should hinge near the ball of the foot, not in the arch. Press the heel area — it should feel cushioned. If a shoe passes all three, it is probably arthritis-friendly." },
    ],
    relatedArticles: ['arthritis-walking-aids', 'best-exercises-arthritis', 'arthritis-driving-adaptations'],
    category: 'Life with Arthritis',
  },
  {
    id: 33,
    slug: 'arthritis-travel-tips',
    title: 'How to Travel With Arthritis',
    question: 'How do I travel with arthritis?',
    quickAnswer:
      'With planning — medication, insurance, accessible transport, pacing and a flare kit — most people with arthritis can travel comfortably and safely worldwide.',
    sections: [
      { heading: 'Before You Book', content: "Choose destinations and seasons that suit your joints — warm dry climates often suit OA, while extreme heat can flare inflammatory disease. Direct flights reduce time on your feet at airports. Ground-floor or lift-served accommodation removes a major source of pain. Read reviews specifically for accessibility — published star ratings rarely tell the full story." },
      { heading: 'Travel Insurance', content: "Standard policies often exclude pre-existing conditions. Declare arthritis and any medications honestly — specialist insurers cover chronic conditions at fair prices. Without disclosure a claim involving your arthritis (including unrelated falls or infections) can be refused entirely." },
      { heading: 'Medication and Customs', content: "Carry medication in original labelled packaging in your hand luggage, with a copy of the prescription or a GP letter — especially for controlled drugs, injectables and biologics. Check destination country rules; some painkillers legal in the UK are prohibited elsewhere. For biologics, carry a cool bag and check temperature requirements with your rheumatology nurse." },
      { heading: 'Surviving the Journey', content: "On long flights, stand and walk every 60-90 minutes, do ankle and shoulder circles in your seat, and wear compression socks. Aisle seats give more freedom to move. On long drives, break every 90 minutes. Carry a small lumbar cushion and a wheat bag. Request airport assistance in advance — it is free, dignified and dramatically reduces flare risk." },
      { heading: 'Your Flare Kit', content: "Pack regular and rescue medication for double the days you will be away, plus a topical NSAID, a heat patch, a small ice pack, compression sleeves, a list of medications and doses, and your rheumatology helpline number. A short letter from your GP describing your condition is invaluable if you need overseas medical care." },
      { heading: 'Pacing on Holiday', content: "Plan one main activity per day, not three. Build in rest mornings or afternoons. Use taxis or public transport rather than walking everything. A holiday is not the time to push through pain — recovery time on return is often much longer than the trip itself." },
      { heading: 'If You Flare Away From Home', content: "Most pharmacists abroad can help with simple pain relief. The GHIC (replaces EHIC) covers state healthcare in EU countries. For serious flares, contact your travel insurer's 24-hour line first — they will guide you to an approved clinic and authorise costs." },
    ],
    relatedArticles: ['arthritis-flare-management', 'arthritis-driving-adaptations', 'arthritis-footwear'],
    category: 'Life with Arthritis',
  },
  {
    id: 34,
    slug: 'when-to-see-a-rheumatologist',
    title: 'When to Ask for a Rheumatology Referral',
    question: 'When should I ask my GP for a rheumatology referral?',
    quickAnswer:
      'Ask for urgent referral if you have joint swelling lasting more than six weeks, morning stiffness over an hour, or multiple symmetrical joints affected — early specialist review prevents permanent damage.',
    sections: [
      { heading: 'The Red Flags That Need Urgent Referral', content: "Persistent swelling in one or more joints for more than six weeks, morning stiffness lasting over an hour, symmetrical small-joint involvement (knuckles, wrists, toes), unexplained fatigue with joint pain, a new psoriasis or eye inflammation alongside joint symptoms, or a positive family history of inflammatory arthritis. Any of these warrants referral within weeks, not months." },
      { heading: 'Why Early Referral Matters', content: "In rheumatoid arthritis and other inflammatory arthritides, irreversible joint damage can occur within the first 12 weeks of symptoms. NICE guidance is referral within three working days of suspicion, with rheumatology assessment within three weeks. Starting DMARDs in this 'window of opportunity' can put many patients into long-term remission." },
      { heading: 'How to Have the Conversation With Your GP', content: "Be specific: 'I have had swelling in three knuckles on both hands for nine weeks, and morning stiffness for about 90 minutes most days.' Bring a symptom diary if possible. Ask directly: 'Should I be referred to rheumatology?' If you feel unheard, request a second opinion — it is your right." },
      { heading: 'What to Bring to a Rheumatology Appointment', content: "A list of all symptoms with start dates, a medication list including supplements, any blood test or X-ray results, your symptom diary, and a list of questions. Wear clothing easy to remove for joint examination. A friend or family member as a second pair of ears is valuable." },
      { heading: 'UK healthcare vs Private Pathways', content: "UK healthcare rheumatology waits vary; urgent referrals are usually seen within weeks. If wait times exceed NICE targets, ask your GP about referral to a neighbouring trust. Private consultation (typically £200-300) gives faster access and a written report you can share with the UK healthcare system team — many people use it to expedite diagnosis, then continue UK healthcare treatment." },
      { heading: 'Questions Worth Asking the Specialist', content: "What is the most likely diagnosis? Which blood tests and imaging are needed? What is the treatment plan and when will we know it is working? What are the side effects and monitoring requirements? What lifestyle changes will help? Will I need ongoing follow-up, and how often?" },
      { heading: 'After the Appointment', content: "Most rheumatology services provide a nurse-led helpline for flares, medication queries and urgent advice — use it. Read our arthritis medication guide so you understand what is being prescribed. Treatment works best when you are an informed partner in your care." },
    ],
    relatedArticles: ['osteoarthritis-vs-rheumatoid-arthritis', 'arthritis-flare-management', 'arthritis-medication-explained'],
    category: 'Diagnosis & Specialist Care',
  },
];
