/**
 * Route stubs for navigation destinations that don't yet have full
 * editorial pages. Each export is a thin wrapper around `StubPage` so the
 * URL remains useful to visitors while editorial work is in progress.
 * StubPage enforces noindex; do not add a stub URL to any sitemap.
 */
import StubPage, { type StubPageFAQ } from "@/components/StubPage";
import HubGuidePage from "@/components/HubGuidePage";
import { drugGuide } from "@/data/hubGuides/drugGuide";
import { surgeryOptions } from "@/data/hubGuides/surgeryOptions";
import { complementaryTherapies } from "@/data/hubGuides/complementaryTherapies";
import { workWithArthritis } from "@/data/hubGuides/workWithArthritis";
import { travelWithArthritis } from "@/data/hubGuides/travelWithArthritis";

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
  { label: "Diet & nutrition", href: "/guides/diet" },
  { label: "Supplements", href: "/supplements" },
];

// â”€â”€â”€â”€â”€ Treatments â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const DrugGuideStub = () => <HubGuidePage guide={drugGuide} />;

export const SurgeryStub = () => <HubGuidePage guide={surgeryOptions} />;

export const ComplementaryTherapiesStub = () => <HubGuidePage guide={complementaryTherapies} />;

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

// Work and travel are full editorial guides now (src/data/hubGuides).
export const WorkStub = () => <HubGuidePage guide={workWithArthritis} />;

export const TravelStub = () => <HubGuidePage guide={travelWithArthritis} />;

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
    answer="Connect groups are free, facilitated peer communities for people living with arthritis. They meet online or in person, organised by condition (OA, RA, gout, lupus) or life stage (young adults, parents, retirees). Every group is moderated, and joining is free. The former buddy programme now points here."
    breadcrumbs={[home, communityCrumb, { label: "Connect Groups", href: "/community/connect-groups" }]}
    faqs={CONNECT_GROUPS_FAQS}
    intro={
      <>
        <p>
          Peer support helps when medical appointments are short and friends or family do not fully understand flares, pacing or treatment side effects.
          Our connect groups give you a regular, moderated space to share what is working, ask practical questions and feel less isolated — online or in person.
        </p>
        <p>
          Groups are organised by condition and by life stage, so you can join an osteoarthritis or rheumatoid arthritis circle and also a young-adult or carer group if that fits.
          Facilitators are trained volunteers; they do not give medical advice, and they will signpost to clinical or helpline support when needed.
        </p>
        <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Looking for a buddy?</h2>
        <p>
          One-to-one buddy matching has moved into connect groups so support stays moderated and sustainable.
          Bookmarks to <code>/buddy</code> redirect here. Join a small group first; facilitators can help you find a regular peer contact within that community.
        </p>
        <p className="mt-4">
          Alongside groups, explore <a href="/guides/exercise" className="text-primary underline">exercise guides</a>,{" "}
          <a href="/guides/diet" className="text-primary underline">diet guidance</a>,{" "}
          <a href="/advocacy" className="text-primary underline">patient advocacy</a>, and the{" "}
          <a href="/helpline" className="text-primary underline">helpline</a> if you need a quieter conversation.
        </p>
      </>
    }
    relatedLinks={[
      { label: "Community hub", href: "/community" },
      { label: "Patient advocacy", href: "/advocacy" },
      { label: "Patient stories", href: "/stories" },
      { label: "Helpline & support", href: "/helpline" },
      { label: "Exercise hub", href: "/guides/exercise" },
      { label: "Diet hub", href: "/guides/diet" },
    ]}
  />
);

const EVENTS_FAQS: StubPageFAQ[] = [
  { q: "Do you run events?", a: "Not at the moment. There is no public webinar series, exercise class or community day to book." },
  { q: "What can I use instead?", a: "The free written guides, and the phone line on 07760 512 084, Monday to Friday, 9am to 5pm." },
  { q: "Will you record events?", a: "There are no events to record. We will only say there is a recording when one exists." },
  { q: "Can I ask for an event in my area?", a: "You can email info@livingwitharthritis.org.uk. That is a suggestion, not a booking." },
  { q: "Is there a cost?", a: "There is nothing to buy on this page. The guides and the weekday phone line are free." },
  { q: "Where should I go for urgent help?", a: "This page is not an emergency service. Call 999 if someone is in immediate danger, or NHS 111 if you need urgent health advice." },
];

export const EventsStub = () => (
  <StubPage
    slug="events"
    title="Events"
    description="Living With Arthritis does not currently run public events or webinars. Free written guides and a weekday phone line are what the charity offers now."
    answer="There is no public events programme at the moment. Please use the free written guides or the weekday phone line instead of waiting for a webinar."
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
  { q: "How do I contact the helpline?", a: "Email info@livingwitharthritis.org.uk or call 07760 512 084, Monday to Friday, 9am to 5pm. We aim to reply within two working days. This is not a 24-hour service." },
  { q: "What can the helpline help with?", a: "Signposting to UK services, understanding your diagnosis, questions about medications, support during a flare, accessing benefits and equipment, and general emotional support. We don't replace your clinical team but help you navigate the system." },
  { q: "Is the helpline confidential?", a: "Yes. Conversations are private and only shared if there's a safeguarding concern. We don't share your contact details with third parties." },
  { q: "Can you give me medical advice?", a: "No — we can't diagnose, prescribe or recommend specific treatments. We can explain what your clinician has told you, suggest questions to ask, and signpost evidence-based resources." },
  { q: "How quickly will I get a reply?", a: "We aim to reply to email within two working days. The phone line is staffed Monday to Friday, 9am to 5pm. A complicated question may take longer, and we will say so." },
  { q: "Is there a cost?", a: "No — all our support is free. We're funded by donations and grants, never by selling your data or by advertising." },
];

export const HelplineStub = () => (
  <StubPage
    slug="helpline"
    title="Helpline"
    description="Call 07760 512 084, Monday to Friday, 9am to 5pm, or email us. We aim to reply within two working days. We do not give personal medical advice."
    answer="The phone line is open Monday to Friday, 9am to 5pm, on 07760 512 084. Email info@livingwitharthritis.org.uk if you prefer. We aim to reply within two working days. We cannot diagnose or prescribe."
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
  { q: "What volunteer roles are available?", a: "None are advertised here. Email info@livingwitharthritis.org.uk and we will say whether anything is open." },
  { q: "Do I need experience?", a: "We cannot say until there is a real role. Please do not assume a vacancy, training or a regular commitment." },
  { q: "How much time does it take?", a: "There is no standing rota. If a role is offered later, the time needed would be agreed then." },
  { q: "Will I be reimbursed for expenses?", a: "We do not ask anyone to spend money while there is no role. Any future expenses would be agreed in writing first." },
  { q: "Will it affect my benefits?", a: "We cannot advise on benefits. If you are offered a role, check with the DWP or an advice agency before you start." },
  { q: "How do I ask?", a: "Email info@livingwitharthritis.org.uk. A reply means we have read your message, not that a role exists." },
];

export const VolunteerStub = () => (
  <StubPage
    slug="volunteer"
    title="Volunteer"
    description="There is no open volunteer vacancy list. Email the charity if you want to help, and we will say whether anything is available."
    answer="We do not advertise a standing list of volunteer roles. If you would like to help, email info@livingwitharthritis.org.uk and we will reply with what, if anything, is open."
    breadcrumbs={[home, involvedCrumb, { label: "Volunteer", href: "/volunteer" }]}
    faqs={VOLUNTEER_FAQS}
    relatedLinks={[
      { label: "Ways to help", href: "/ways-to-help" },
      { label: "Donate", href: "https://www.gofundme.com/f/help-fund-critical-arthritis-research" },
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
    title="Patient Advocacy & Awareness for Arthritis"
    description="Shape UK arthritis research and services: share your story, join patient panels, respond to consultations and raise awareness — strictly non-partisan, consent-first."
    answer="Advocacy here means putting lived experience at the centre of arthritis research, NHS service design and public understanding. You can share a story, join a patient panel, answer a consultation or help a local awareness event — always non-partisan, and never without your consent."
    breadcrumbs={[home, involvedCrumb, { label: "Advocacy", href: "/advocacy" }]}
    faqs={ADVOCACY_FAQS}
    intro={
      <>
        <p>
          Living with arthritis often means navigating long waits, fragmented services and advice that does not match day-to-day life with pain, fatigue or flares.
          Patient advocacy closes that gap: it brings real experience into research priorities, clinic design and public conversation so decisions reflect what people actually need.
        </p>
        <p>
          You do not need to be a campaigner. Most people start with one small step — a short story, a survey, a research panel meeting, or feedback on a local rheumatology pathway.
          We are strictly non-partisan. We do not endorse parties or candidates. Stories are used only with explicit, withdrawable consent, and anonymous contributions are welcome.
        </p>
        <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Ways to take part</h2>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li><strong className="text-foreground">Share your story</strong> — help others feel less alone and show clinicians what good support looks like. Start on our <a href="/stories" className="text-primary underline">patient stories</a> page or contact us.</li>
          <li><strong className="text-foreground">Join a patient panel</strong> — advise researchers and service teams on plain-English materials, trial design and access barriers.</li>
          <li><strong className="text-foreground">Respond to consultations</strong> — when UK musculoskeletal or disability policy asks for public input, we summarise the ask and how to reply.</li>
          <li><strong className="text-foreground">Local awareness</strong> — talks, workplace education or community events that explain arthritis without stigma.</li>
        </ul>
        <p className="mt-4">
          Advocacy sits alongside practical support: <a href="/community/connect-groups" className="text-primary underline">connect groups</a>, the{" "}
          <a href="/helpline" className="text-primary underline">helpline</a>, and guides on{" "}
          <a href="/guides/exercise" className="text-primary underline">exercise</a> and{" "}
          <a href="/guides/diet" className="text-primary underline">diet</a>. If you want to get involved, email{" "}
          <a href="mailto:info@livingwitharthritis.org.uk" className="text-primary underline">info@livingwitharthritis.org.uk</a>.
        </p>
      </>
    }
    relatedLinks={[
      { label: "Patient stories", href: "/stories" },
      { label: "Connect groups", href: "/community/connect-groups" },
      { label: "Volunteer", href: "/volunteer" },
      { label: "Research", href: "/research" },
      { label: "Exercise hub", href: "/guides/exercise" },
      { label: "Diet hub", href: "/guides/diet" },
      { label: "Contact us", href: "/contact" },
    ]}
  />
);

// â”€â”€â”€â”€â”€ Research â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const RESEARCH_FAQS: StubPageFAQ[] = [
  { q: "Do you fund research?", a: "No. This website does not award grants or commission studies." },
  { q: "Can I join a trial here?", a: "No. We do not recruit to clinical trials. Ask your own clinician or look at NHS and university trial listings." },
  { q: "Do you set research priorities with the James Lind Alliance?", a: "No. We have not run a priority-setting partnership." },
  { q: "What does the charity publish instead?", a: "Free written guides, and a phone line on weekdays. Those are information, not a research programme." },
  { q: "Can a researcher contact you?", a: "Yes, by email. A reply is not an offer of funding or a partnership." },
  { q: "Is this medical advice?", a: "No. Nothing on this page is a diagnosis or a personal treatment plan." },
];

export const ResearchStub = () => (
  <StubPage
    slug="research"
    title="Research"
    description="This page does not award research grants or list trials. The charity publishes free guides and can be contacted on the weekday phone line."
    answer="Living With Arthritis does not award research grants from this website and does not run a trials service. Read the published guides, or contact us on weekdays."
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
  { q: "What grants do you offer?", a: "None. This website does not award research grants." },
  { q: "Who can apply?", a: "There is no application round. Please do not send a proposal expecting funding." },
  { q: "Will that change?", a: "If the charity ever offers a grant, it will say so on this page with a real deadline and a real amount. Until then, there is nothing to apply for." },
  { q: "Where else can researchers look?", a: "UK funders such as the National Institute for Health and Care Research publish their own schemes. We do not run one of those schemes." },
  { q: "Can I still contact you?", a: "Yes, by email. A reply is not an offer of money." },
  { q: "Is this medical advice?", a: "No. This page is about funding, and there is no funding programme here." },
];

export const GrantsStub = () => (
  <StubPage
    slug="research/grants"
    title="Research grants"
    description="Living With Arthritis does not offer research grants on this website. There is no funding round and no sum of money to apply for."
    answer="This page does not offer research grants. There is no funding round to apply to."
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
