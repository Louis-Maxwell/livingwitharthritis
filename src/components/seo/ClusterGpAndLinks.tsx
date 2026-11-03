import { Link } from "react-router-dom";
import MedicalReviewBadge from "@/components/MedicalReviewBadge";

type L = { to: string; label: string };
type Entry = { name: string; gp: string[]; related: L[] };

const JOINT_GP = [
  "pain, stiffness or swelling has lasted more than a few weeks",
  "it is stopping you sleeping, working or doing everyday tasks",
  "painkillers you can buy and gentle exercise are not helping",
];

/** Routine "see a GP" guidance (NHS wording, signposting only) + hub and sideways links. */
const CLUSTER: Record<string, Entry> = {
  "/conditions/back-pain": { name: "back pain", gp: [
    "back pain has not started to improve after a few weeks",
    "the pain is stopping you doing day-to-day activities",
    "the pain is very bad or getting worse over time",
    "back pain and stiffness have lasted more than 3 months, started before age 45 and are worse in the morning"], related: [
    { to: "/conditions/axial-spondyloarthritis", label: "Axial spondyloarthritis" }, { to: "/conditions/ankylosing-spondylitis", label: "Ankylosing spondylitis" },
    { to: "/conditions/early-arthritis-symptoms", label: "Early signs of arthritis" }, { to: "/blog/spinal-arthritis-back-pain-uk", label: "Spinal arthritis guide" }] },
  "/conditions/early-arthritis-symptoms": { name: "early arthritis symptoms", gp: [
    ...JOINT_GP, "a joint is swollen, or several joints are stiff for more than 30 minutes in the morning"], related: [
    { to: "/conditions/osteoarthritis", label: "Osteoarthritis" }, { to: "/conditions/rheumatoid-arthritis", label: "Rheumatoid arthritis" },
    { to: "/conditions/back-pain", label: "Back pain and arthritis" }, { to: "/symptom-checker", label: "Symptom checker" }] },
  "/conditions/osteoarthritis": { name: "osteoarthritis", gp: [...JOINT_GP, "a joint keeps giving way or locking"], related: [
    { to: "/conditions/knee-arthritis", label: "Knee arthritis" }, { to: "/conditions/hip-arthritis", label: "Hip arthritis" },
    { to: "/conditions/hand-arthritis", label: "Hand arthritis" }, { to: "/guides/can-exercise-make-osteoarthritis-worse", label: "Can exercise make osteoarthritis worse?" }] },
  "/conditions/rheumatoid-arthritis": { name: "rheumatoid arthritis", gp: [
    "several joints are swollen, warm or tender, especially in the hands or feet",
    "your joints are stiff for more than 30 minutes in the morning",
    "symptoms have lasted a few weeks, or keep coming back",
    "you already have RA and a flare is not settling with your usual plan"], related: [
    { to: "/conditions/psoriatic-arthritis", label: "Psoriatic arthritis" }, { to: "/conditions/lupus", label: "Lupus" },
    { to: "/conditions/hand-arthritis", label: "Hand arthritis" }, { to: "/arthritis-flare-ups", label: "Managing flare-ups" }] },
  "/conditions/gout": { name: "gout", gp: [
    "you think you have had a gout attack, even if it has settled",
    "attacks keep coming back",
    "you have lumps (tophi) under the skin near joints",
    "you take medicine for gout and still get attacks"], related: [
    { to: "/conditions/foot-and-ankle-arthritis", label: "Foot and ankle arthritis" }, { to: "/conditions/osteoarthritis", label: "Osteoarthritis" },
    { to: "/guides/diet", label: "Arthritis diet guide" }, { to: "/diet/foods-to-avoid-with-arthritis", label: "Foods to avoid" }] },
  "/conditions/psoriatic-arthritis": { name: "psoriatic arthritis", gp: [
    "you have psoriasis and joint pain, swelling or stiffness",
    "a whole finger or toe has become swollen",
    "you have heel pain or back stiffness that is worse in the morning",
    "your nails have changed (pitting or lifting) alongside joint pain"], related: [
    { to: "/conditions/rheumatoid-arthritis", label: "Rheumatoid arthritis" }, { to: "/conditions/ankylosing-spondylitis", label: "Ankylosing spondylitis" },
    { to: "/conditions/hand-arthritis", label: "Hand arthritis" }, { to: "/arthritis-flare-ups", label: "Managing flare-ups" }] },
  "/conditions/ankylosing-spondylitis": { name: "ankylosing spondylitis", gp: [
    "back pain has lasted more than 3 months and started before age 45",
    "back pain and stiffness are worse in the morning and ease with movement",
    "back pain wakes you in the second half of the night",
    "you also have painful red eyes, heel pain or psoriasis"], related: [
    { to: "/conditions/axial-spondyloarthritis", label: "Axial spondyloarthritis" }, { to: "/conditions/psoriatic-arthritis", label: "Psoriatic arthritis" },
    { to: "/conditions/reactive-arthritis", label: "Reactive arthritis" }, { to: "/guides/exercise", label: "Exercise guide" }] },
  "/conditions/knee-arthritis": { name: "knee arthritis", gp: [...JOINT_GP, "your knee keeps giving way, locking or swelling up"], related: [
    { to: "/conditions/osteoarthritis", label: "Osteoarthritis" }, { to: "/conditions/hip-arthritis", label: "Hip arthritis" },
    { to: "/guides/knee-exercises-for-osteoarthritis", label: "Knee exercises for osteoarthritis" }, { to: "/conditions/gout", label: "Gout" }] },
  "/conditions/hip-arthritis": { name: "hip arthritis", gp: [...JOINT_GP, "you are limping or struggling with stairs, socks or shoes"], related: [
    { to: "/conditions/osteoarthritis", label: "Osteoarthritis" }, { to: "/conditions/knee-arthritis", label: "Knee arthritis" },
    { to: "/guides/hip-exercises-for-osteoarthritis", label: "Hip exercises for osteoarthritis" }, { to: "/conditions/ankylosing-spondylitis", label: "Ankylosing spondylitis" }] },
  "/conditions/hand-arthritis": { name: "hand arthritis", gp: [...JOINT_GP, "your finger joints are swollen and stiff in the morning, or you are losing grip"], related: [
    { to: "/conditions/osteoarthritis", label: "Osteoarthritis" }, { to: "/conditions/rheumatoid-arthritis", label: "Rheumatoid arthritis" },
    { to: "/conditions/psoriatic-arthritis", label: "Psoriatic arthritis" }, { to: "/conditions/elbow-arthritis", label: "Elbow arthritis" }] },
};

export default function ClusterGpAndLinks({ path, badge = false }: { path: string; badge?: boolean }) {
  const e = CLUSTER[path];
  if (!e) return null;
  return (
    <div className="container mx-auto px-6 md:px-10 max-w-3xl my-10 space-y-8" data-testid="cluster-gp-links">
      <section id="see-a-gp" aria-labelledby="see-a-gp-heading">
        <h2 id="see-a-gp-heading" className="text-xl font-semibold text-foreground mb-3">When to see a GP about {e.name}</h2>
        <p className="mb-3 text-foreground">Book a routine GP appointment, or contact an NHS physiotherapist (many areas let you refer yourself), if:</p>
        <ul className="list-disc pl-6 space-y-1 text-foreground">{e.gp.map((t) => <li key={t}>{t}</li>)}</ul>
        <p className="mt-3 text-sm text-muted-foreground">Not sure if you need to be seen? Use NHS 111 online. For urgent symptoms, see the red flags below.</p>
      </section>
      <section aria-labelledby="cluster-links-heading" className="rounded-lg bg-muted p-6 border-l-4 border-primary">
        <h2 id="cluster-links-heading" className="text-xl font-semibold text-foreground mb-3">Part of our arthritis guide</h2>
        <p className="mb-3"><Link to="/conditions/arthritis" className="text-primary underline">Arthritis: types, symptoms and treatment</Link>: start here for an overview of every type.</p>
        <ul className="list-disc pl-6 space-y-1">{e.related.map((l) => <li key={l.to}><Link to={l.to} className="text-primary underline">{l.label}</Link></li>)}</ul>
      </section>
      {badge && <MedicalReviewBadge reviewer="Louis Maxwell" title="First Contact Practitioner" credential="HCPC PH128483" date="October 2026" />}
    </div>
  );
}
