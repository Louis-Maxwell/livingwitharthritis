import { useState } from 'react';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

const ARTHRITIS_TYPES = [
  { value: 'rheumatoid', label: 'Rheumatoid arthritis' },
  { value: 'psoriatic', label: 'Psoriatic arthritis' },
  { value: 'osteoarthritis', label: 'Osteoarthritis' },
  { value: 'gout', label: 'Gout' },
  { value: 'axial_spa', label: 'Axial spondyloarthritis' },
  { value: 'other', label: 'Other or not sure yet' },
] as const;

const CONTACT = [
  { value: 'any', label: 'Any' },
  { value: 'phone', label: 'Phone' },
  { value: 'video', label: 'Video call' },
  { value: 'email', label: 'Email' },
] as const;

const schema = z.object({
  role: z.enum(['volunteer', 'seeker']),
  full_name: z.string().trim().min(2, 'Please enter your name').max(100),
  email: z.string().trim().email('Please enter a valid email').max(255),
  arthritis_type: z.enum(['osteoarthritis', 'rheumatoid', 'psoriatic', 'gout',
    'axial_spa', 'other']),
  region: z.string().trim().min(2, 'Please enter your town or region').max(60),
  contact_preference: z.enum(['phone', 'video', 'email', 'any']),
  about: z.string().trim().max(1000).optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Please agree so we can contact you' }),
  }),
});

const selectClass =
  'flex h-11 w-full rounded-md border border-input bg-background px-3 text-base';

export default function BuddySignupForm() {
  const [role, setRole] = useState<'seeker' | 'volunteer'>('seeker');
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      role,
      full_name: fd.get('full_name'),
      email: fd.get('email'),
      arthritis_type: fd.get('arthritis_type'),
      region: fd.get('region'),
      contact_preference: fd.get('contact_preference'),
      about: (fd.get('about') as string) || undefined,
      consent: fd.get('consent') === 'on',
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setIsSending(true);
    const { error: dbError } = await supabase
      .from('buddy_signups' as never)
      .insert(parsed.data as never);
    setIsSending(false);
    if (dbError) {
      setError('Sorry, something went wrong. Please try again or email us.');
      return;
    }
    setIsDone(true);
  };

  if (isDone) {
    return (
      <div role="status" className="rounded-lg bg-muted p-6">
        <h3 className="text-xl font-semibold">Thank you — we have your details</h3>
        <p className="mt-2">
          A member of our team will email you to talk through the next steps.
          {role === 'volunteer'
            ? ' Volunteers have a short chat and a check before being matched.'
            : ' We match by hand, so it can take a little while to find the right person.'}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <fieldset>
        <legend className="mb-2 font-semibold">I would like to…</legend>
        <div className="flex flex-wrap gap-3">
          <Button type="button" variant={role === 'seeker' ? 'default' : 'outline'}
            aria-pressed={role === 'seeker'} onClick={() => setRole('seeker')}>
            Find a buddy
          </Button>
          <Button type="button" variant={role === 'volunteer' ? 'default' : 'outline'}
            aria-pressed={role === 'volunteer'} onClick={() => setRole('volunteer')}>
            Volunteer as a buddy
          </Button>
        </div>
      </fieldset>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="full_name">Your name</Label>
          <Input id="full_name" name="full_name" autoComplete="name" required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <div>
          <Label htmlFor="arthritis_type">Your type of arthritis</Label>
          <select id="arthritis_type" name="arthritis_type" className={selectClass}>
            {ARTHRITIS_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="region">Town or region</Label>
          <Input id="region" name="region" placeholder="e.g. Shropshire" required />
        </div>
        <div>
          <Label htmlFor="contact_preference">How you'd like to talk</Label>
          <select id="contact_preference" name="contact_preference" className={selectClass}>
            {CONTACT.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <Label htmlFor="about">Anything you'd like us to know (optional)</Label>
        <Textarea id="about" name="about" maxLength={1000} rows={4} />
      </div>
      <div className="flex items-start gap-3">
        <Checkbox id="consent" name="consent" className="mt-1" />
        <Label htmlFor="consent" className="font-normal">
          I agree that Living With Arthritis UK can store these details and
          contact me about the Buddy Programme. I can ask for them to be
          deleted at any time.
        </Label>
      </div>
      {error && <p role="alert" className="font-medium">{error}</p>}
      <Button type="submit" disabled={isSending} className="min-h-11">
        {isSending ? 'Sending…' : 'Send my details'}
      </Button>
    </form>
  );
}
