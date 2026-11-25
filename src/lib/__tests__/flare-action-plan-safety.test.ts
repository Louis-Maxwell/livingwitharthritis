import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { FLARE_PLAN_HTML, FLARE_PLAN_FAQS, FLARE_PLAN_UPDATED, FLARE_HOT_JOINT_ADVICE } from '../../data/resources/flareActionPlanContent';
import { UK_URGENT_CARE } from '@/data/reviewedPublicCopy';
import { headDataFor, rewriteHead } from '../../../scripts/inject-canonicals.mjs';

const html = FLARE_PLAN_HTML.replace(/&amp;/g, '&');
const page = readFileSync(resolve(process.cwd(), 'src/pages/resources/FlareActionPlan.tsx'), 'utf8');
const css = readFileSync(resolve(process.cwd(), 'src/pages/resources/FlareActionPlan.css'), 'utf8');
const row = (label: string) => html.match(new RegExp(`<tr><td>${label}.*?</tr>`, 's'))?.[0] ?? '';
const route = '/resources/flare-action-plan';

describe('Bounded flare-plan editorial safety correction', () => {
  it('retains the reviewed neurological emergency wording in both places', () => {
    expect(html.split(UK_URGENT_CARE[1].a)).toHaveLength(3);
    const emergency = row('Back pain with new neurological warning signs');
    expect(emergency).toContain('call 999 or go to A&E immediately.');
    expect(emergency).not.toContain('111');
  });
  it('seeks urgent advice for sudden severe joint pain alone without requiring swelling or fever', () => {
    expect(html.split(FLARE_HOT_JOINT_ADVICE)).toHaveLength(4);
    expect(FLARE_HOT_JOINT_ADVICE).toContain('severe joint pain that started suddenly, usually in one joint');
    expect(FLARE_HOT_JOINT_ADVICE).toContain('These signs do not all need to occur together.');
    expect(FLARE_HOT_JOINT_ADVICE).toContain('Do not wait for a fever.');
    expect(FLARE_HOT_JOINT_ADVICE).not.toContain('painful and swollen');
    expect(row('Sudden severe joint pain or other possible signs of infection')).toContain(FLARE_HOT_JOINT_ADVICE);
    expect(html).toContain('Fever is not always present with a joint infection.');
    expect(html).not.toContain('A single hot, swollen joint with fever');
  });
  it('uses the existing national urgent-care wording in contacts and help summary', () => {
    expect(html.split(UK_URGENT_CARE[4].a)).toHaveLength(3);
    expect(html).not.toContain('111.nhs.uk');
    expect(html).toContain('Northern Ireland: contact your GP or local GP out-of-hours service');
  });
  it('does not offer 111 first for the identified injury emergencies', () => {
    const injury = row('Unable to walk or put weight on a joint');
    expect(injury).toContain('Go to A&E or call 999.');
    expect(injury).not.toContain('111');
  });
  it('separates an editorial update from any clinical-review claim', () => {
    expect(FLARE_PLAN_UPDATED).toBe('2026-11-22');
    expect(page).toContain('dateModified: FLARE_PLAN_UPDATED');
    expect(page).toContain('reviewStatus="pending"');
    expect(page).not.toMatch(/clinically reviewed by|PH128483|lastReviewed=/i);
    expect(page).toContain('not independent clinical review');
    expect(page).toContain('REVIEWED_DISCLAIMER_SHORT');
  });
  it('preserves six tables and FAQs, makes wide worksheets scrollable and keeps print instructions together', () => {
    expect(html.match(/<table(?:\s[^>]*)?>/g)).toHaveLength(6);
    expect(html).toContain('Medicines agreed with my clinician for a flare');
    expect(html).toContain('Part 7: Flare tracking table');
    expect(html).toContain('tracking table (Part 7)');
    expect(FLARE_PLAN_FAQS).toHaveLength(6);
    expect(html).toContain('flare-tracker-table');
    expect(html).toContain('scroll this tracker sideways');
    expect(css).toContain('min-width: 42rem !important');
    expect(css).toMatch(/\.flare-plan-content li\s*\{\s*break-inside: avoid/s);
    expect(page.match(/className="[^"]*"/g)?.join(' ')).not.toContain('fixed');
  });
  it('aligns the route head data with the full React article without an inherited review claim', () => {
    const data = headDataFor(route);
    expect(data.bodyHtml).toContain(FLARE_PLAN_HTML);
    expect(data.answer).not.toMatch(/with fever|NHS 111 or urgent care/);
    expect(data.faqs).toHaveLength(6);
    expect(data.reviewedBy).toBeUndefined();
    expect(data.lastReviewed).toBeUndefined();
    expect(data.bodyHtml).not.toMatch(/checked on 23 October|111\.nhs\.uk|clinically reviewed/i);
    expect(data.bodyHtml).toContain(FLARE_HOT_JOINT_ADVICE);
    expect(data.bodyHtml).toContain('not independent clinical review');
  });
  it('rewrites the real non-JavaScript route output with the same corrected safety message', () => {
    const output = rewriteHead('<html><head><title>Home</title></head><body><div id="root"></div></body></html>', route);
    expect(output).toContain('severe joint pain that started suddenly, usually in one joint');
    expect(output).toContain('These signs do not all need to occur together.');
    expect(output).toContain('Do not wait for a fever.');
    expect(output).toContain('Northern Ireland: contact your GP or local GP out-of-hours service');
    expect(output).toContain('not independent clinical review');
    expect(output).not.toMatch(/checked on 23 October|111\.nhs\.uk|"reviewedBy"/);
    expect(output).toContain('call 999 or go to A&amp;E immediately.');
  });
  it('ships route-only static CSS and six focusable table regions without changing other routes', () => {
    const shell = '<html><head><title>Home</title></head><body><div id="root"></div></body></html>';
    const output = rewriteHead(shell, route);
    expect(output).toContain('id="flare-plan-static-layout"');
    expect(output).toContain(css);
    expect(output).toContain('flare-plan-static flare-plan-content prose');
    expect(output.match(/class="table-scroll"/g)).toHaveLength(6);
    expect(output.match(/tabindex="0" role="region" aria-label="Scrollable data table/g)).toHaveLength(6);
    expect(rewriteHead(shell, '/contact')).not.toContain('flare-plan-static-layout');
  });

});
