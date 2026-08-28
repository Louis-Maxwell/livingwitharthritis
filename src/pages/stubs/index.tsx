/**
 * Route stubs for navigation destinations that don't yet have full
 * editorial pages. Each export is a thin wrapper around `StubPage` so the
 * URL is indexable (AnswerBox + FAQ + Breadcrumb JSON-LD + MedicalReviewBadge)
 * instead of a 404 while we expand the content.
 *
 * Adding a new stub: add a new exported component below, then register
 * the route in `src/App.tsx` and append the URL to `public/sitemap.xml`.
 */
import StubPage, { type StubPageFAQ } from "@/components/StubPage";

const aboutCrumb = { label: "About Arthritis", href: "/conditions/arthritis" };
const treatmentsCrumb = { label: "Treatments", href: "/supplements" };
const guidesCrumb = { label: "Managing Arthritis", href: "/living-with-arthritis" };
const communityCrumb = { label: "Community & Support", href: "/community" };
const involvedCrumb = { label: "Get Involved", href: "/ways-to-help" };
const researchCrumb = { label: "Research", href: "/research" };
const home = { label: "Home", href: "/" };

const sharedRelated = [
  { label: "All conditions", href: "/conditions/arthritis" },
  { label: "Exercise hub", href: "/exercises" },
  { label: "Diet & nutrition", href: "/diet" },
  { label: "Supplements", href: "/supplements" },
];

// â”€â”€â”€â”€â”€ Treatments â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const DRUG_GUIDE_FAQS: StubPageFAQ[] = [
  { q: "What medications are used for arthritis?", a: "Common classes include simple analgesics (paracetamol), NSAIDs (ibuprofen, naproxen), corticosteroids, DMARDs (methotrexate, sulfasalazine, leflunomide), immunosuppressants (azathioprine), and biologic therapies (anti-TNF). Choice depends on the type of arthritis and disease activity." },
  { q: "Are NSAIDs safe to take long-term?", a: "NSAIDs can cause stomach, kidney and cardiovascular side effects when used for prolonged periods or at high doses. Use the lowest effective dose for the shortest time and review with your prescriber every 3–6 months." },
  { q: "What is a DMARD?", a: "A disease-modifying anti-rheumatic drug suppresses the underlying inflammatory process in rheumatoid, psoriatic, and other inflammatory arthritides — slowing or stopping joint damage rather than only treating pain." },
  { q: "How long do arthritis medications take to work?", a: "Paracetamol and NSAIDs work within hours. Steroid injections work within days. DMARDs and biologics typically take 6–12 weeks to reach full effect, which is why bridging therapy is often prescribed at the start." },
  { q: "Can I take supplements alongside arthritis medication?", a: "Some supplements (turmeric, omega-3, glucosamine) are generally well tolerated, but several interact with blood thinners, NSAIDs or DMARDs. Always tell your prescriber and pharmacist about supplements before starting them." },
  { q: "What if my medication isn't working?", a: "Speak to your rheumatology team — they may adjust the dose, swap to another agent in the same class, or step you up to a biologic. Don't stop suddenly without advice, especially with steroids or DMARDs." },
];

export const DrugGuideStub = () => (
  <StubPage
    slug="treatments/drug-guide"
    title="Arthritis Medications: Plain-English Drug Guide"
    description="What each arthritis medication does, how long it takes to work, common side effects, and what to ask your prescriber — covering NSAIDs, DMARDs and biologics."
    answer="Arthritis treatment usually combines pain-relief medication (paracetamol, NSAIDs) with disease-modifying drugs (DMARDs, biologics) for inflammatory types. Most DMARDs take 6–12 weeks to reach full effect, so steroids are often used as a bridge. Always review medications with your prescriber every few months."
    breadcrumbs={[home, treatmentsCrumb, { label: "Drug Guide", href: "/treatments/drug-guide" }]}
    faqs={DRUG_GUIDE_FAQS}
    relatedLinks={[
      { label: "Steroids for arthritis", href: "/guides/steroids-for-arthritis" },
      { label: "Azathioprine guide", href: "/guides/azathioprine-for-arthritis" },
      { label: "Supplements hub", href: "/supplements" },
      { label: "Complementary therapies", href: "/treatments/complementary-therapies" },
    ]}
  />
);

const SURGERY_FAQS: StubPageFAQ[] = [
  { q: "When is surgery considered for arthritis?", a: "Surgery is usually considered when joint pain is severe, mobility is significantly limited, and conservative treatment (medication, physiotherapy, weight management, injections) has failed to control symptoms over months or years." },
  { q: "What types of arthritis surgery exist?", a: "The most common are total joint replacement (hip, knee, shoulder), partial joint replacement, osteotomy (re-aligning bone), arthroscopy (keyhole clean-up), joint fusion (arthrodesis) and synovectomy (removing inflamed lining)." },
  { q: "How long does recovery take?", a: "Most people are walking with crutches within days of hip or knee replacement, drive at 6 weeks, and reach near-full function by 3–6 months. Full recovery and final outcome are typically judged at 12 months." },
  { q: "How long do joint replacements last?", a: "Modern hip and knee replacements last 15–25 years for most patients, with around 80–90% still functioning well at 20 years. Younger and more active patients may need revision surgery later in life." },
  { q: "What are the main risks of joint surgery?", a: "Infection (around 1%), blood clots, anaesthetic risks, nerve injury, persistent pain, dislocation (hip), implant loosening, and the small risk of needing further surgery. Your surgeon will quote your personal risk." },
  { q: "What can I do before surgery to improve outcomes?", a: "Strengthen the muscles around the joint (\"prehab\"), reach a healthy weight, stop smoking, optimise diabetes and blood pressure, and address any dental or skin infections — all reduce complications and speed recovery." },
];

export const SurgeryStub = () => (
  <StubPage
    slug="treatments/surgery-options"
    title="Arthritis Surgery: Joint Replacement & Alternatives"
    description="Plain-English guide to surgery for arthritis — when it's considered, what to expect from hip and knee replacement, recovery times, risks, and how to prepare."
    answer="Surgery for arthritis is usually considered after months of conservative treatment fail to control severe pain or disability. Joint replacement (most often hip or knee) is the most common operation and gives excellent results for the majority of people, with implants lasting 15–25 years."
    breadcrumbs={[home, treatmentsCrumb, { label: "Surgery Options", href: "/treatments/surgery-options" }]}
    faqs={SURGERY_FAQS}
    relatedLinks={[
      { label: "Knee replacement guide", href: "/guides/knee-replacement-surgery" },
      { label: "Newly diagnosed guide", href: "/guides/newly-diagnosed" },
      { label: "Pre-surgery exercises", href: "/exercises" },
      { label: "Arthritis pain relief", href: "/guides/arthritis-pain-relief" },
    ]}
  />
);

const COMPLEMENTARY_FAQS: StubPageFAQ[] = [
  { q: "Do complementary therapies work for arthritis?", a: "Evidence is strongest for acupuncture (knee OA), tai chi (knee OA, balance), yoga (general arthritis), and certain supplements (omega-3, turmeric/curcumin). They work best alongside — not instead of — conventional treatment." },
  { q: "Is acupuncture worth trying?", a: "Multiple trials show modest short-term pain relief for knee osteoarthritis. A typical course is 6–10 sessions. Look for a practitioner registered with the British Acupuncture Council." },
  { q: "What about CBD for arthritis pain?", a: "Evidence in humans is limited and inconsistent. If you try a CBD product, choose a UK-regulated isolate, start at the lowest dose, and tell your prescriber — CBD interacts with several arthritis medications." },
  { q: "Is hydrotherapy useful?", a: "Yes — warm-water exercise reduces joint load and is one of the best-evidenced therapies for pain and function in OA and inflammatory arthritis. Many leisure centres offer arthritis-friendly classes." },
  { q: "Can massage help?", a: "Massage can ease muscle tension around arthritic joints and improve sleep, though it doesn't change the underlying disease. Avoid deep pressure directly over actively inflamed joints." },
  { q: "Are TENS machines effective?", a: "TENS provides short-term pain relief for some people, especially with knee OA. They're cheap, non-invasive, and worth a trial — but should sit alongside exercise and medication, not replace them." },
];

export const ComplementaryTherapiesStub = () => (
  <StubPage
    slug="treatments/complementary-therapies"
    title="Complementary Therapies for Arthritis"
    description="Evidence-based overview of acupuncture, tai chi, yoga, hydrotherapy, massage, TENS and supplements — what works, what's safe, and what to expect."
    answer="Several complementary therapies have credible evidence for arthritis: acupuncture and tai chi for knee osteoarthritis, hydrotherapy for inflammatory arthritis, and omega-3 and turmeric supplements for symptom relief. They work best alongside — not instead of — medication and exercise."
    breadcrumbs={[home, treatmentsCrumb, { label: "Complementary Therapies", href: "/treatments/complementary-therapies" }]}
    faqs={COMPLEMENTARY_FAQS}
    relatedLinks={[
      { label: "Supplements hub", href: "/supplements" },
      { label: "Tai chi for arthritis", href: "/exercises/tai-chi-for-arthritis" },
      { label: "Exercise hub", href: "/exercises" },
      { label: "Drug guide", href: "/treatments/drug-guide" },
    ]}
  />
);

// â”€â”€â”€â”€â”€ Managing Arthritis â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const INSURANCE_FAQS: StubPageFAQ[] = [
  { q: "Is arthritis care free in the UK?", a: "Most arthritis care in the UK — GP appointments, rheumatology, prescribed medications (with standard prescription charges in England), surgery, physiotherapy and occupational therapy — is provided free at the point of use through public healthcare." },
  { q: "What's the typical wait for rheumatology?", a: "Routine rheumatology referrals are usually seen within 12–18 weeks. Suspected inflammatory arthritis should be seen within 6 weeks. If your symptoms worsen significantly while waiting, contact your GP — referrals can often be escalated." },
  { q: "Should I get private health insurance for arthritis?", a: "Most private policies exclude pre-existing conditions, so cover for established arthritis is limited. Private insurance is most useful before symptoms start, or to fund new musculoskeletal problems unrelated to your arthritis." },
  { q: "Can I claim PIP for arthritis?", a: "Personal Independence Payment may be available if arthritis significantly affects daily living or mobility. The claim is based on functional impact, not diagnosis. Our PIP guide walks through the process step by step." },
  { q: "Will I pay for my arthritis medication?", a: "In England, standard prescription charges apply unless you have an exemption (age 60+, certain benefits, medical exemption certificate). Pre-payment certificates are cost-effective if you collect more than one item per month. Scotland, Wales and Northern Ireland have free prescriptions." },
  { q: "Are there charity grants for arthritis equipment?", a: "Yes — several UK charities provide small grants for mobility aids, home adaptations and respite breaks. Eligibility varies; your occupational therapist or GP can signpost appropriate funds." },
];

export const InsuranceStub = () => (
  <StubPage
    slug="guides/insurance-coverage"
    title="Treatment Access & Costs: UK Arthritis Care Guide"
    description="What arthritis care costs in the UK, typical healthcare waiting times, when private insurance helps (and when it doesn't), PIP claims and charity grants for equipment."
    answer="Most arthritis care in the UK is provided free at the point of use, including specialist appointments, medication, surgery and physiotherapy. Private insurance has limited value for established arthritis as pre-existing conditions are usually excluded. PIP and equipment grants can help with daily living costs."
    breadcrumbs={[home, guidesCrumb, { label: "Treatment Access", href: "/guides/insurance-coverage" }]}
    faqs={INSURANCE_FAQS}
    relatedLinks={[
      { label: "PIP & benefits guide", href: "/guides/benefits-pip" },
      { label: "Waiting list help", href: "/arthritis-waiting-list-help" },
      { label: "Newly diagnosed", href: "/guides/newly-diagnosed" },
      { label: "Find a specialist", href: "/tools/find-specialist" },
    ]}
  />
);

const WORK_FAQS: StubPageFAQ[] = [
  { q: "Do I have to tell my employer I have arthritis?", a: "Legally, no — unless your condition affects safety-critical duties. Disclosing protects you under the Equality Act 2010 and opens the door to reasonable adjustments, but the choice and timing are yours." },
  { q: "What reasonable adjustments can I ask for?", a: "Common adjustments include an ergonomic chair and keyboard, sit/stand desk, voice-recognition software, flexible hours, working-from-home days, parking close to the entrance, extra breaks, lighter physical duties, and a phased return after a flare." },
  { q: "Can I claim Access to Work?", a: "Yes — Access to Work is a government scheme that pays for equipment, support workers, travel costs and mental health support if arthritis affects how you do your job. Apply online before starting a new role, or any time in your current job." },
  { q: "What if my job is too physical?", a: "Talk to your occupational health team if your employer has one, or your GP. Vocational rehabilitation, retraining, or a job role review may all be options. Don't soldier on silently — early adjustments prevent long-term harm." },
  { q: "Am I protected from being dismissed because of arthritis?", a: "If your arthritis substantially affects daily activities and is likely to last 12 months or more, you're protected as disabled under the Equality Act 2010. Employers must make reasonable adjustments and cannot dismiss you because of your condition." },
  { q: "How do I manage a flare at work?", a: "Plan ahead: have a flare-day script with your manager, identify which tasks you can drop or delegate, keep medication and a heat/cold pack at your desk, and use any flex you have to start later on bad days." },
];

export const WorkStub = () => (
  <StubPage
    slug="guides/work-with-arthritis"
    title="Working With Arthritis: Your Rights, Adjustments & Flare Plans"
    description="Reasonable adjustments, Access to Work, your legal protections under the Equality Act, and practical strategies for managing arthritis in any job."
    answer="UK workers with arthritis are protected under the Equality Act 2010 if the condition substantially affects daily activities for 12+ months. Employers must make reasonable adjustments — common ones include flexible hours, ergonomic equipment, and remote-working days. Access to Work funds equipment and support."
    breadcrumbs={[home, guidesCrumb, { label: "Work & Career", href: "/guides/work-with-arthritis" }]}
    faqs={WORK_FAQS}
    relatedLinks={[
      { label: "PIP & benefits", href: "/guides/benefits-pip" },
      { label: "Flare-up management", href: "/arthritis-flare-ups" },
      { label: "Mental health", href: "/arthritis-mental-health" },
      { label: "Living with arthritis", href: "/living-with-arthritis" },
    ]}
  />
);

const TRAVEL_FAQS: StubPageFAQ[] = [
  { q: "How do I plan a flight with arthritis?", a: "Choose an aisle seat for legroom, request mobility assistance at booking, pack medications in hand luggage with a copy of your prescription, set up alerts to walk/stretch every hour, and consider compression socks for long-haul flights." },
  { q: "Will travel insurance cover my arthritis?", a: "Standard travel insurance often excludes pre-existing conditions unless declared. Specialist insurers cover arthritis at a higher premium; always declare your condition and medications when buying a policy to ensure claims are valid." },
  { q: "Can I take my medication abroad?", a: "Yes — keep medication in original labelled packaging and carry a letter from your GP listing each drug. Some controlled medications (strong painkillers) need a personal licence for trips over 3 months. Check destination rules before travel." },
  { q: "How do I manage pain on a long journey?", a: "Stand and stretch every 60–90 minutes, use a small lumbar cushion, pack a heat pad or hot-water bottle, take regular pain relief on schedule rather than waiting for pain, and use the airport's special-assistance service for transfers." },
  { q: "Are warm climates better for arthritis?", a: "Many people report less pain in warm, dry weather, though research evidence is mixed. Cold, damp conditions can worsen stiffness for some. There's no single 'best' climate — try short trips before committing to a major move." },
  { q: "Can I get a Blue Badge for travel?", a: "Yes — if arthritis severely affects walking, you may qualify for a Blue Badge that allows parking close to amenities. Apply through your local council; criteria include receiving certain PIP rates or a mobility assessment." },
];

export const TravelStub = () => (
  <StubPage
    slug="guides/travel-with-arthritis"
    title="Travel Tips for People With Arthritis"
    description="How to fly, drive and explore comfortably with arthritis — flight planning, travel insurance, taking medication abroad, in-journey pain control, and Blue Badge advice."
    answer="Travelling with arthritis takes planning but isn't a barrier. Book aisle seats and mobility assistance, declare your condition for travel insurance, pack medication in hand luggage with a GP letter, and break up long journeys with movement every hour. A Blue Badge eases parking and access."
    breadcrumbs={[home, guidesCrumb, { label: "Travel Tips", href: "/guides/travel-with-arthritis" }]}
    faqs={TRAVEL_FAQS}
    relatedLinks={[
      { label: "Flare-up planning", href: "/arthritis-flare-ups" },
      { label: "Pain relief", href: "/guides/arthritis-pain-relief" },
      { label: "Living with arthritis", href: "/living-with-arthritis" },
      { label: "Work & career", href: "/guides/work-with-arthritis" },
    ]}
  />
);

// â”€â”€â”€â”€â”€ Tools â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const FIND_SPECIALIST_FAQS: StubPageFAQ[] = [
  { q: "How do I find a rheumatologist in the UK?", a: "Ask your GP for a referral — this routes you into a local UK healthcare rheumatology service. For private appointments, the Royal College of Physicians and the British Society for Rheumatology both publish member directories you can search by region." },
  { q: "What about a physiotherapist?", a: "All UK physiotherapists must be registered with the HCPC. You can search the HCPC public register at hcpc-uk.org. For musculoskeletal specialists, the Chartered Society of Physiotherapy's 'Physio2U' directory lists qualified clinicians." },
  { q: "Do I need a referral for physio?", a: "Not for self-pay private physiotherapy — you can book directly. For UK healthcare physio in most areas you need a GP referral, though some regions offer self-referral. Check your local musculoskeletal service's website." },
  { q: "What's an occupational therapist?", a: "An OT helps you manage daily activities (work, dressing, cooking) when arthritis affects function. They can prescribe equipment, recommend home adaptations and support phased work returns. Ask your GP or social services for a referral." },
  { q: "Are private clinics worth it?", a: "Private appointments are faster (often days vs weeks) and longer (30–60 mins vs 10–15). They're useful for second opinions, fast injections, or detailed assessments — but ongoing arthritis care is usually best continued through your registered UK healthcare team." },
  { q: "How do I check a clinician's credentials?", a: "Doctors: the General Medical Council register (gmc-uk.org). Physiotherapists and occupational therapists: the HCPC register (hcpc-uk.org). Always verify before paying privately." },
];

export const FindSpecialistStub = () => (
  <StubPage
    slug="tools/find-specialist"
    title="Find a UK Arthritis Specialist"
    description="How to find a rheumatologist, physiotherapist or occupational therapist in the UK — official registers, GP referrals, self-referral routes and what to expect from each."
    answer="UK arthritis specialists work through both UK healthcare and private routes. Rheumatology and complex care usually require a GP referral. Physiotherapists can be seen privately without referral. Always check professional registers (GMC, HCPC) before paying, and verify UK healthcare specialists through your local trust."
    breadcrumbs={[home, guidesCrumb, { label: "Find a Specialist", href: "/tools/find-specialist" }]}
    faqs={FIND_SPECIALIST_FAQS}
    relatedLinks={[
      { label: "Symptom checker", href: "/symptom-checker" },
      { label: "Newly diagnosed", href: "/guides/newly-diagnosed" },
      { label: "Health tools", href: "/health-tools" },
      { label: "Waiting list help", href: "/arthritis-waiting-list-help" },
    ]}
  />
);

// â”€â”€â”€â”€â”€ Community & Support â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const CONNECT_GROUPS_FAQS: StubPageFAQ[] = [
  { q: "What are connect groups?", a: "Connect groups are small, peer-led communities of people living with arthritis who meet regularly — online or in person — to share experiences, swap tips, and support each other through flares, treatment changes and life events." },
  { q: "Are the groups moderated?", a: "Yes — every group has a trained volunteer facilitator who follows our community guidelines. Medical advice is never given peer-to-peer; the facilitator signposts to appropriate clinical resources where needed." },
  { q: "Do I need to book?", a: "Most groups ask you to register once so they can send the meeting link and a welcome note. Drop-in spaces are also available for people who prefer to attend anonymously." },
  { q: "Can I join more than one?", a: "Yes. Many members join a condition-specific group (e.g., rheumatoid arthritis) and a life-stage group (e.g., parents with arthritis, young adults, retirees) to cover different aspects of their experience." },
  { q: "Is it free?", a: "Yes — all groups are free to join. Donations are welcomed but never required, and no one is turned away on cost grounds." },
  { q: "Can I start my own group?", a: "Yes. We provide a facilitator training pack, group resources and ongoing support. Get in touch through our contact form to express interest." },
];

export const ConnectGroupsStub = () => (
  <StubPage
    slug="community/connect-groups"
    title="Connect Groups: UK Arthritis Peer Support Communities"
    description="Free, volunteer-led peer support groups for people with arthritis across the UK — meet online or in person, by condition, life stage or location."
    answer="Connect groups are free, facilitated peer communities for people living with arthritis. They meet online or in person, organised by condition (OA, RA, gout, lupus) or life stage (young adults, parents, retirees). Every group is moderated, and joining is free."
    breadcrumbs={[home, communityCrumb, { label: "Connect Groups", href: "/community/connect-groups" }]}
    faqs={CONNECT_GROUPS_FAQS}
    relatedLinks={[
      { label: "Community hub", href: "/community" },
      { label: "Buddy programme", href: "/buddy" },
      { label: "Patient stories", href: "/stories" },
      { label: "Helpline & support", href: "/helpline" },
    ]}
  />
);

const EVENTS_FAQS: StubPageFAQ[] = [
  { q: "What kinds of events do you run?", a: "Monthly online webinars with clinicians and researchers, condition-specific Q&As, exercise demonstrations, family workshops, and occasional in-person community days across the UK." },
  { q: "Are events free?", a: "Yes — all our educational events are free. Some specialist workshops invite a voluntary donation to cover speaker costs, but this is never a condition of attendance." },
  { q: "Can I watch recordings?", a: "Yes. All webinars are recorded and added to our on-demand library within a week, so you can catch up at any time." },
  { q: "How do I find an event near me?", a: "Use the filter at the top of the events page to see online-only, in-person, or both. In-person events list the city, accessibility details and travel notes." },
  { q: "Will events be accessible?", a: "We provide live captions on all online events and select wheelchair-accessible venues for in-person events. Email us in advance if you need British Sign Language interpretation or other adjustments." },
  { q: "Can my carer attend with me?", a: "Yes — carers, partners and family are welcome at all our community events at no extra cost." },
];

export const EventsStub = () => (
  <StubPage
    slug="events"
    title="Events & Webinars: Living With Arthritis"
    description="Monthly online webinars, condition Q&As, exercise demos and UK community days — all free, captioned, and led by clinicians and people living with arthritis."
    answer="We run monthly online webinars with clinicians and researchers, condition-specific Q&As, exercise classes and UK community days. Events are free, recorded, captioned, and open to everyone — including carers and family."
    breadcrumbs={[home, communityCrumb, { label: "Events", href: "/events" }]}
    faqs={EVENTS_FAQS}
    relatedLinks={[
      { label: "Connect groups", href: "/community/connect-groups" },
      { label: "Patient stories", href: "/stories" },
      { label: "Podcasts", href: "/podcasts" },
      { label: "Community hub", href: "/community" },
    ]}
  />
);

const PODCAST_FAQS: StubPageFAQ[] = [
  { q: "When does the podcast launch?", a: "Our first season is in production now, with episodes scheduled to start releasing soon. Subscribe to our updates to be notified when episode one drops." },
  { q: "What will the podcast cover?", a: "Episode topics include living with newly-diagnosed arthritis, pain management approaches that work, navigating medication choices, work and family with chronic illness, and conversations with leading UK rheumatologists and researchers." },
  { q: "Who are the hosts?", a: "Episodes are hosted by Maxwell, a HCPC-registered physiotherapist (PH128483), alongside rotating guest experts and people sharing their own arthritis experiences." },
  { q: "Where will it be available?", a: "Spotify, Apple Podcasts, Google Podcasts, and as a direct stream from this page. Full transcripts will be published alongside every episode for accessibility." },
  { q: "Can I suggest a topic?", a: "Yes — we'd love to hear what you want covered. Email suggestions through our contact form and we'll add them to the editorial calendar." },
  { q: "Will there be a video version?", a: "Yes, video episodes will be published on our YouTube channel with closed captions for those who prefer to watch rather than listen." },
];

export const PodcastsStub = () => (
  <StubPage
    slug="podcasts"
    title="The Living With Arthritis Podcast"
    description="A new UK podcast on living well with arthritis — practical advice, expert interviews and real-life stories, hosted by a HCPC-registered physiotherapist."
    answer="Our podcast launches soon, with episodes on managing newly-diagnosed arthritis, medication choices, pain relief, work, family life, and interviews with leading UK rheumatologists. Subscribe to be notified when episode one releases."
    breadcrumbs={[home, communityCrumb, { label: "Podcasts", href: "/podcasts" }]}
    faqs={PODCAST_FAQS}
    relatedLinks={[
      { label: "Events & webinars", href: "/events" },
      { label: "Patient stories", href: "/stories" },
      { label: "Expert articles", href: "/expert-articles" },
      { label: "Connect groups", href: "/community/connect-groups" },
    ]}
  />
);

const HELPLINE_FAQS: StubPageFAQ[] = [
  { q: "How do I contact the helpline?", a: "Email info@livingwitharthritis.org.uk, call 07760 512 084 (Mon–Fri, 9am–5pm), or message us on WhatsApp. A real person — not a chatbot — responds within 2 working days." },
  { q: "What can the helpline help with?", a: "Signposting to UK services, understanding your diagnosis, questions about medications, support during a flare, accessing benefits and equipment, and general emotional support. We don't replace your clinical team but help you navigate the system." },
  { q: "Is the helpline confidential?", a: "Yes. Conversations are private and only shared if there's a safeguarding concern. We don't share your contact details with third parties." },
  { q: "Can you give me medical advice?", a: "No — we can't diagnose, prescribe or recommend specific treatments. We can explain what your clinician has told you, suggest questions to ask, and signpost evidence-based resources." },
  { q: "How quickly will I get a reply?", a: "Email and WhatsApp: within 2 working days. Phone: within office hours, or leave a voicemail and we'll call back. Complex queries that need research may take longer — we'll let you know." },
  { q: "Is there a cost?", a: "No — all our support is free. We're funded by donations and grants, never by selling your data or by advertising." },
];

export const HelplineStub = () => (
  <StubPage
    slug="helpline"
    title="Support & Helpline: Talk to a Real Person"
    description="Free UK arthritis helpline — email, call or WhatsApp. A real person responds within 2 working days for signposting, emotional support and help navigating services."
    answer="Our free helpline is staffed by trained people, not a chatbot. Email info@livingwitharthritis.org.uk, call 07760 512 084 (Mon–Fri 9–5), or message us on WhatsApp. We respond within 2 working days for signposting, emotional support and help understanding your diagnosis."
    breadcrumbs={[home, communityCrumb, { label: "Helpline", href: "/helpline" }]}
    faqs={HELPLINE_FAQS}
    relatedLinks={[
      { label: "Contact us", href: "/contact" },
      { label: "Connect groups", href: "/community/connect-groups" },
      { label: "Newly diagnosed", href: "/guides/newly-diagnosed" },
      { label: "Mental health support", href: "/arthritis-mental-health" },
    ]}
  />
);

// â”€â”€â”€â”€â”€ Get Involved â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const VOLUNTEER_FAQS: StubPageFAQ[] = [
  { q: "What volunteer roles are available?", a: "Connect-group facilitators, helpline responders, content reviewers (lived-experience), event hosts, social media volunteers, and translation/accessibility reviewers. Most roles can be done remotely from anywhere in the UK." },
  { q: "Do I need experience?", a: "No prior experience is needed — only lived experience of arthritis (your own or a loved one's) and a few hours a month. We provide training, supervision and a peer-volunteer community." },
  { q: "How much time does it take?", a: "Most roles are 2–4 hours per month, with full flexibility around flares, treatment days and life events. We never expect a fixed schedule." },
  { q: "Will I be reimbursed for expenses?", a: "Yes — reasonable out-of-pocket expenses (travel, equipment, accessibility costs) are reimbursed. Volunteering should never cost you money." },
  { q: "Will it affect my benefits?", a: "Volunteering doesn't affect most UK disability or sickness benefits provided you continue to meet the eligibility criteria. If you're unsure, ask the DWP or your Job Centre before starting." },
  { q: "How do I apply?", a: "Express interest through our contact form. We'll send an information pack and arrange an informal chat to find the role that fits you best." },
];

export const VolunteerStub = () => (
  <StubPage
    slug="volunteer"
    title="Volunteer With Living With Arthritis"
    description="Flexible UK volunteer roles for people living with arthritis — facilitate groups, support our helpline, review content. Training provided, expenses paid, no fixed hours."
    answer="We offer flexible UK volunteer roles around lived experience: connect-group facilitators, helpline support, content reviewers, event hosts and social media volunteers. Most roles take 2–4 hours a month, can be done remotely, and don't affect most benefits."
    breadcrumbs={[home, involvedCrumb, { label: "Volunteer", href: "/volunteer" }]}
    faqs={VOLUNTEER_FAQS}
    relatedLinks={[
      { label: "Ways to help", href: "/ways-to-help" },
      { label: "Donate", href: "/donate" },
      { label: "Connect groups", href: "/community/connect-groups" },
      { label: "Contact us", href: "/contact" },
    ]}
  />
);

const ADVOCACY_FAQS: StubPageFAQ[] = [
  { q: "What does advocacy mean here?", a: "Advocacy means amplifying the voices of people living with arthritis in research, service design and public conversation — so that what gets funded, studied and provided reflects what patients actually need." },
  { q: "How can I get involved?", a: "Share your story, complete patient-experience surveys, join a research panel, contribute to consultations on UK musculoskeletal services, or speak at local awareness events. Most opportunities take an hour or less." },
  { q: "Is this political?", a: "No. We're strictly non-partisan and don't endorse parties, candidates or specific manifestos. Our advocacy is evidence-based and focused on improving care, access and understanding of arthritis." },
  { q: "Will my story be used publicly?", a: "Only with your explicit, written consent — and you can withdraw consent at any time. We never share names, photos or details without sign-off, and you can choose to contribute anonymously." },
  { q: "Can I influence research priorities?", a: "Yes — we run regular priority-setting exercises feeding into UK research funders, and patient representatives sit on several active research projects. Sign up through our contact form to express interest." },
  { q: "Do you support charity-wide campaigns?", a: "We focus on lived-experience advocacy rather than political campaigning. Where alignment exists with broader awareness work led by other neutral bodies, we may signpost — but we don't run political or fundraising campaigns ourselves." },
];

export const AdvocacyStub = () => (
  <StubPage
    slug="advocacy"
    title="Patient Advocacy & Awareness"
    description="Help shape arthritis research, services and public understanding by sharing your story, joining patient panels and contributing to consultations — strictly non-partisan."
    answer="Our advocacy work amplifies patient voices in research and service design — sharing stories, joining research panels and contributing to UK consultations. We're strictly non-partisan and never use your story without explicit, withdrawable consent."
    breadcrumbs={[home, involvedCrumb, { label: "Advocacy", href: "/advocacy" }]}
    faqs={ADVOCACY_FAQS}
    relatedLinks={[
      { label: "Patient stories", href: "/stories" },
      { label: "Volunteer", href: "/volunteer" },
      { label: "Research", href: "/research" },
      { label: "Contact us", href: "/contact" },
    ]}
  />
);

// â”€â”€â”€â”€â”€ Research â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const RESEARCH_FAQS: StubPageFAQ[] = [
  { q: "What research does Living With Arthritis support?", a: "We focus on patient-priority research: real-world outcomes from existing treatments, self-management interventions, exercise and diet programmes, mental health and arthritis, and equity of access to UK musculoskeletal care." },
  { q: "Do you fund research directly?", a: "We provide small seed grants and patient-and-public-involvement (PPI) support for early-stage UK research, partnering with academic institutions and established UK funders for larger studies." },
  { q: "Can I take part in a study?", a: "Yes — see our clinical trials page for active UK studies recruiting people with arthritis. We highlight studies with ethical approval and clear, plain-English participant information." },
  { q: "How are research priorities decided?", a: "Through structured priority-setting partnerships with patients, clinicians and researchers — using established methods (e.g., the James Lind Alliance framework) to ensure patient voice drives the agenda." },
  { q: "Is the research independent?", a: "Yes. We have no commercial ties to pharmaceutical or device companies. Funding sources for any project we promote are disclosed transparently." },
  { q: "How can researchers apply for support?", a: "Apply through the grants page for seed funding, or contact us about patient-involvement partnerships, dissemination support, or co-design workshops." },
];

export const ResearchStub = () => (
  <StubPage
    slug="research"
    title="Arthritis Research at Living With Arthritis"
    description="Patient-priority arthritis research — seed grants, patient-and-public-involvement, UK clinical trials and transparent reporting, independent of commercial interests."
    answer="Our research work supports patient-priority studies in UK arthritis care: seed grants, patient-and-public-involvement, clinical-trials listings and dissemination. We're independent of pharmaceutical and device companies, with priorities set through structured patient–clinician–researcher partnerships."
    breadcrumbs={[home, researchCrumb]}
    faqs={RESEARCH_FAQS}
    relatedLinks={[
      { label: "Clinical trials", href: "/research/clinical-trials" },
      { label: "Grant opportunities", href: "/research/grants" },
      { label: "Patient stories", href: "/stories" },
      { label: "AI transparency", href: "/about/ai-transparency" },
    ]}
  />
);

const TRIALS_FAQS: StubPageFAQ[] = [
  { q: "What is a clinical trial?", a: "A clinical trial is a research study testing whether a new treatment, device, or care approach is safe and effective in people. Trials follow strict ethical approval, run in phases, and involve careful monitoring." },
  { q: "Are clinical trials safe?", a: "Trials are heavily regulated by the UK Medicines and Healthcare products Regulatory Agency (MHRA) and ethics committees. Risks are explained in plain English before you consent, and you can withdraw at any time without affecting your care." },
  { q: "Will I be paid?", a: "Most NHS-hosted trials don't pay participants beyond reasonable expenses. Some commercial studies offer modest payments. The participant information sheet always states this clearly." },
  { q: "Will I receive the experimental treatment?", a: "Many trials are randomised — participants are assigned to the new treatment or standard care by chance. This is the most reliable way to know if a new approach works. Some trials offer the experimental treatment to all participants." },
  { q: "How do I find a trial near me?", a: "The UK's central registry is the Be Part of Research portal (run by the NIHR). You can search by condition, location and trial type. Your rheumatologist may also know of local studies recruiting." },
  { q: "What if something goes wrong?", a: "Trials have clear safety monitoring and an independent committee that can pause or stop studies if harm is detected. You'll have a named research nurse to contact, and standard UK healthcare care continues alongside any trial." },
];

export const ClinicalTrialsStub = () => (
  <StubPage
    slug="research/clinical-trials"
    title="UK Arthritis Clinical Trials: How to Find & Join"
    description="Plain-English guide to UK arthritis clinical trials — how they work, how to find one near you, what to expect, your rights, and how trials are kept safe."
    answer="UK arthritis clinical trials test new treatments under strict ethical oversight by the MHRA and research ethics committees. The Be Part of Research portal (NIHR) lists active studies you can search by condition and location. You can withdraw at any time without affecting your care."
    breadcrumbs={[home, researchCrumb, { label: "Clinical Trials", href: "/research/clinical-trials" }]}
    faqs={TRIALS_FAQS}
    relatedLinks={[
      { label: "Research overview", href: "/research" },
      { label: "Grant opportunities", href: "/research/grants" },
      { label: "Drug guide", href: "/treatments/drug-guide" },
      { label: "Advocacy", href: "/advocacy" },
    ]}
  />
);

const GRANTS_FAQS: StubPageFAQ[] = [
  { q: "What grants do you offer?", a: "Small seed grants (typically £1,000–£5,000) for early-stage UK arthritis research, with a strong patient-priority and patient-and-public-involvement focus. Funding rounds open periodically — register for alerts to be notified." },
  { q: "Who can apply?", a: "UK-based researchers (academic or clinical) and patient organisations partnering with research teams. Lived-experience co-applicants are encouraged on every application." },
  { q: "What's the application process?", a: "A short expression of interest followed (if shortlisted) by a longer proposal. Reviewers include patients, clinicians and academics. Decisions are typically announced within 12 weeks of the deadline." },
  { q: "What do you not fund?", a: "We don't fund commercial product development, lobbying activity, or projects without meaningful patient involvement. Animal research and high-risk first-in-human trials sit outside our scope." },
  { q: "Are there reporting requirements?", a: "Yes — funded projects submit a brief mid-point update and a plain-English final report. We share results publicly with appropriate accessibility (transcripts, summaries) so patients can benefit from what's learned." },
  { q: "Can I co-apply as a patient?", a: "Yes, and we encourage it. Patient co-applicants share equal status with academic co-applicants in our review process, with paid time recognised in the budget." },
];

export const GrantsStub = () => (
  <StubPage
    slug="research/grants"
    title="Arthritis Research Grant Opportunities"
    description="UK seed grants (£1k–£5k) for early-stage arthritis research with strong patient involvement — open to academic, clinical and patient-organisation co-applicants."
    answer="We award small seed grants (typically £1,000–£5,000) for early-stage UK arthritis research that includes meaningful patient-and-public-involvement. Funding rounds open periodically; lived-experience co-applicants are encouraged on every application."
    breadcrumbs={[home, researchCrumb, { label: "Grants", href: "/research/grants" }]}
    faqs={GRANTS_FAQS}
    relatedLinks={[
      { label: "Research overview", href: "/research" },
      { label: "Clinical trials", href: "/research/clinical-trials" },
      { label: "Volunteer", href: "/volunteer" },
      { label: "Contact us", href: "/contact" },
    ]}
  />
);

// Re-export shared related links for any future custom stub
// eslint-disable-next-line react-refresh/only-export-components
export { sharedRelated };
