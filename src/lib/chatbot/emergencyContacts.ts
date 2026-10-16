/**
 * Country-aware emergency signposting for the help chat.
 *
 * Only national, publicly listed numbers are used. These are NOT local
 * branches, offices or clinicians of Living With Arthritis — the charity
 * operates in the UK only. Re-check these numbers before each release.
 */
export type ChatCountry = 'UK' | 'IN' | 'US';

export interface EmergencyLine {
  number: string;
  /** Digits for the tel: link. */
  dial: string;
  label: string;
  kind: 'emergency' | 'urgent' | 'crisis';
}

export interface CountrySafety {
  country: ChatCountry;
  name: string;
  lines: EmergencyLine[];
  /** One-line footer summary. */
  summary: string;
  /** Who to ask for personal, non-urgent advice. */
  routineCare: string;
}

export const COUNTRY_SAFETY: Record<ChatCountry, CountrySafety> = {
  UK: {
    country: 'UK',
    name: 'United Kingdom',
    lines: [
      { number: '999', dial: '999', label: 'Life-threatening emergency', kind: 'emergency' },
      { number: 'NHS 111', dial: '111', label: 'Urgent but not life-threatening', kind: 'urgent' },
      { number: 'Samaritans 116 123', dial: '116123', label: 'Free, 24/7 emotional support', kind: 'crisis' },
    ],
    summary: '999 emergency · NHS 111 urgent',
    routineCare: 'your GP, pharmacist or rheumatology team',
  },
  IN: {
    country: 'IN',
    name: 'India',
    lines: [
      { number: '112', dial: '112', label: 'National emergency number', kind: 'emergency' },
      { number: '108', dial: '108', label: 'Ambulance in many states', kind: 'urgent' },
      { number: 'Tele-MANAS 14416', dial: '14416', label: 'Government mental-health helpline, 24/7', kind: 'crisis' },
    ],
    summary: '112 emergency · 108 ambulance in many states',
    routineCare: 'a registered doctor or your nearest hospital',
  },
  US: {
    country: 'US',
    name: 'United States',
    lines: [
      { number: '911', dial: '911', label: 'Life-threatening emergency', kind: 'emergency' },
      { number: '988', dial: '988', label: 'Suicide & Crisis Lifeline, call or text, 24/7', kind: 'crisis' },
    ],
    summary: '911 emergency · 988 crisis line',
    routineCare: 'your doctor, or an urgent care clinic if it cannot wait',
  },
};

export const CHAT_COUNTRY_KEY = 'lwa_chat_country_v1';

export function isChatCountry(v: unknown): v is ChatCountry {
  return v === 'UK' || v === 'IN' || v === 'US';
}

/** UK is the default: it is the only country the charity currently serves. */
export function loadChatCountry(): ChatCountry {
  try {
    const v = window.localStorage.getItem(CHAT_COUNTRY_KEY);
    return isChatCountry(v) ? v : 'UK';
  } catch {
    return 'UK';
  }
}

export function saveChatCountry(c: ChatCountry): void {
  try {
    window.localStorage.setItem(CHAT_COUNTRY_KEY, c);
  } catch {
    /* storage unavailable — keep in memory only */
  }
}

export function emergencyLineFor(c: ChatCountry): EmergencyLine {
  return COUNTRY_SAFETY[c].lines.find((l) => l.kind === 'emergency')!;
}

/** Shown if both the chat engine and its offline answers fail. */
export function serviceUnavailableMessage(c: ChatCountry): string {
  const s = COUNTRY_SAFETY[c];
  return (
    'Sorry, the help chat is not working right now. You can still browse our ' +
    `guides, or speak to ${s.routineCare}. If this is an emergency call ` +
    `${emergencyLineFor(c).number} now.`
  );
}
