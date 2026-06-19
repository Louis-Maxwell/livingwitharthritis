import { Link } from 'react-router-dom';
import { trackEvent } from '@/lib/analytics';
import MedicalReviewBadge from '@/components/MedicalReviewBadge';

interface Joint {
  id: string;
  label: string;
  route: string;
  description: string;
}

const joints: Joint[] = [
  {
    id: 'knee',
    label: 'Knee',
    route: '/conditions/osteoarthritis',
    description: 'Knee pain & arthritis',
  },
  {
    id: 'hip',
    label: 'Hip',
    route: '/conditions/osteoarthritis',
    description: 'Hip joint arthritis',
  },
  {
    id: 'hand',
    label: 'Hand',
    route: '/blog/hand-osteoarthritis-keeping-hands-functional',
    description: 'Hand & finger arthritis',
  },
  {
    id: 'shoulder',
    label: 'Shoulder',
    route: '/conditions/osteoarthritis',
    description: 'Shoulder joint pain',
  },
  {
    id: 'elbow',
    label: 'Elbow',
    route: '/conditions/osteoarthritis',
    description: 'Elbow arthritis',
  },
  {
    id: 'spine',
    label: 'Spine',
    route: '/conditions/osteoarthritis',
    description: 'Spine & neck arthritis',
  },
];

export default function JointSelector() {
  const handleJointClick = (jointId: string) => {
    trackEvent('joint_selector_click', {
      joint: jointId,
      source: 'homepage_hero',
    });
  };

  return (
    <section className="w-full py-12 md:py-16 bg-muted/30 rounded-lg">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">
            FIND YOUR GUIDE
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Where does it hurt?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Tap a joint to jump straight to the clinically-reviewed guide for that area.
          </p>
          <MedicalReviewBadge />
        </div>

        {/* Joint Grid - Text Only */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {joints.map((joint) => (
            <Link
              key={joint.id}
              to={joint.route}
              onClick={() => handleJointClick(joint.id)}
              className="group relative"
              aria-label={`${joint.label}: ${joint.description}`}
            >
              <div className="flex flex-col items-center justify-center p-4 md:p-6 rounded-lg border-2 border-transparent hover:border-primary bg-white hover:bg-accent/10 transition-all duration-300 cursor-pointer min-h-24 md:min-h-28">
                
                {/* Label - Text Only */}
                <h3 className="font-bold text-center text-base md:text-lg group-hover:text-primary transition-colors">
                  {joint.label}
                </h3>

                {/* Description (hidden on small screens) */}
                <p className="text-xs text-muted-foreground text-center mt-2 hidden md:block">
                  {joint.description}
                </p>

                {/* Hover indicator */}
                <div className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Below */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-6">
            Can't find your joint? <Link to="/living-with-arthritis" className="text-primary font-semibold hover:underline">
              View our complete guide
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
