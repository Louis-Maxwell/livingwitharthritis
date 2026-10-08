import StubPage, { type StubPageFAQ } from '@/components/StubPage';
import BuddySignupForm from '@/components/community/BuddySignupForm';

const FAQS: StubPageFAQ[] = [
  { q: 'What is the Buddy Programme?', a: 'A free peer support scheme that pairs someone living with arthritis with a volunteer who has the same condition, so you can talk to someone who understands day-to-day life with it.' },
  { q: 'Is there rheumatoid arthritis peer support?', a: 'Yes. You can choose rheumatoid arthritis on the form and we will try to match you with a volunteer who also lives with rheumatoid arthritis.' },
  { q: 'Can I get a psoriatic arthritis buddy?', a: 'Yes. Choose psoriatic arthritis on the form. Matching depends on volunteers being available, so we will tell you honestly if it may take a while.' },
  { q: 'How are people matched?', a: 'Our team matches by hand, looking at the type of arthritis, where you live and how you prefer to talk (phone, video or email).' },
  { q: 'Do buddies give medical advice?', a: 'No. Buddies share their own experience and listen. Questions about medicines or treatment should go to your GP, rheumatology team or pharmacist.' },
  { q: 'Who can volunteer?', a: 'Adults in the UK who live with arthritis and feel ready to support someone else. Volunteers have a conversation with our team and a check before being matched.' },
  { q: 'Is it free?', a: 'Yes. The Buddy Programme is free for everyone.' },
  { q: 'What happens to my details?', a: 'We use them only to arrange the Buddy Programme. You can ask us to delete them at any time by emailing info@livingwitharthritis.org.uk.' },
];

export default function BuddyProgramme() {
  return (
    <StubPage
      slug="buddy"
      title="Arthritis Peer Support Buddy Programme UK | RA & PsA"
      description="Free UK arthritis peer support: get matched with a buddy who lives with rheumatoid arthritis, psoriatic arthritis or osteoarthritis. Sign up or volunteer."
      answer="The Buddy Programme is free peer support for people with arthritis in the UK. Tell us about yourself and our team will try to match you by hand with a volunteer who lives with the same condition — including rheumatoid arthritis and psoriatic arthritis peer support."
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Community & Support', href: '/community' },
        { label: 'Buddy Programme', href: '/buddy' },
      ]}
      faqs={FAQS}
      intro={
        <div className="space-y-8">
          <section aria-labelledby="how-it-works">
            <h2 id="how-it-works" className="text-2xl font-semibold">How it works</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-6">
              <li>Fill in the short form below, as someone looking for a buddy or as a volunteer.</li>
              <li>Our team gets in touch by email. Volunteers have a short chat and a check first.</li>
              <li>We match you by hand with someone who has the same type of arthritis where we can.</li>
              <li>You talk in the way that suits you — phone, video or email.</li>
            </ol>
          </section>
          <section aria-labelledby="ra-psa">
            <h2 id="ra-psa" className="text-2xl font-semibold">
              Rheumatoid and psoriatic arthritis peer support
            </h2>
            <p className="mt-3">
              Inflammatory types of arthritis such as rheumatoid arthritis and
              psoriatic arthritis can bring flares, fatigue and changes in
              medicine that are hard to explain to people who haven't lived
              with them. A buddy with the same condition can listen and share
              what has helped them. We also support people with osteoarthritis,
              gout and axial spondyloarthritis.
            </p>
          </section>
          <section aria-labelledby="signup" id="sign-up">
            <h2 id="signup" className="text-2xl font-semibold">Sign up</h2>
            <div className="mt-4"><BuddySignupForm /></div>
          </section>
        </div>
      }
      relatedLinks={[
        { label: 'Connect groups', href: '/community/connect-groups' },
        { label: 'Community hub', href: '/community' },
        { label: 'Podcasts', href: '/podcasts' },
        { label: 'Helpline & support', href: '/helpline' },
      ]}
    />
  );
}
