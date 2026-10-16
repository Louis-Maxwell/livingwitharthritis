#!/usr/bin/env node
/**
 * Read-only catalogue audit. Does not assert that citations, licences, or reviews are valid.
 * Run: node scripts/audit-catalog-remediation.mjs
 */
import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = 'src/content/blog/posts';
const out = 'docs/audits';
const files = (await readdir(root)).filter(f => f.endsWith('.json')).sort();
const rows = [];
for (const file of files) {
  let p;
  try { p = JSON.parse(await readFile(join(root, file), 'utf8')); }
  catch (e) { rows.push({file, parse_error:String(e), status:'blocked'}); continue; }
  if (p.is_published === false) continue;
  const html = typeof p.content === 'string' ? p.content : '';
  const inlineImages = [...html.matchAll(/<img\b[^>]*>/gi)].map(m => m[0]);
  const missingAlt = inlineImages.filter(tag => !/\balt\s*=\s*["'][^"']+["']/i.test(tag)).length;
  const citations = Array.isArray(p.citations) ? p.citations : [];
  const hasReviewer = Boolean(String(p.reviewed_by ?? '').trim()) && !/pending|tbd|placeholder|not reviewed/i.test(p.reviewed_by);
  const hasReviewDate = Boolean(p.last_reviewed);
  const cover = p.cover ?? null;
  // No metadata means UNVERIFIED, never infer ownership from an image path.
  const provenance = Array.isArray(p.article_images) ? p.article_images : [];
  const licensedInline = provenance.filter(i => i?.src && i?.alt && i?.licence && (i?.credit || i?.source_url)).length;
  const coverLicenceVerified = Boolean(p.cover_licence && (p.cover_credit || p.cover_source_url));
  const blockers = [];
  if (!cover) blockers.push('missing_cover');
  if (inlineImages.length < 2) blockers.push('fewer_than_two_inline_images');
  if (missingAlt) blockers.push('missing_inline_alt');
  if (!coverLicenceVerified) blockers.push('cover_licence_unverified');
  if (licensedInline < 2) blockers.push('inline_licences_unverified');
  if (!citations.length) blockers.push('missing_structured_citations');
  if (!hasReviewer || !hasReviewDate || p.reviewStatus !== 'reviewed') blockers.push('clinical_review_not_documented');
  const highRisk = /\b(methotrexate|biologic|steroid|pregnan|cauda equina|suicid|sepsis|dosage|dose|injection)\b/i.test(p.title + ' ' + html);
  rows.push({
    slug:p.slug ?? file.replace(/\.json$/,''),title:p.title ?? '',category:p.category ?? '',
    published:p.is_published !== false,cover_present:Boolean(cover),inline_image_count:inlineImages.length,
    inline_images_missing_alt:missingAlt,inline_provenance_records:licensedInline,
    cover_licence_verified_by_metadata:coverLicenceVerified,
    structured_citation_count:citations.length,review_status:p.reviewStatus ?? null,
    reviewer_recorded:hasReviewer,review_date_recorded:hasReviewDate,
    high_risk_keyword_flag:highRisk,pdf_button_expected_from_shared_blogpost:true,
    pdf_download_browser_verified:false,
    status:blockers.length?'needs_evidence_and_review':'ready_for_human_validation',
    blockers,priority_score:blockers.length+(highRisk?5:0),
    reviewer_signoff_evidence:null,asset_licence_evidence:null,citation_fact_check_evidence:null
  });
}
rows.sort((a,b)=>(b.priority_score??0)-(a.priority_score??0)||String(a.slug).localeCompare(String(b.slug)));
const valid=rows.filter(r=>!r.parse_error);
const count=fn=>valid.filter(fn).length;
const summary={
  generated_at:new Date().toISOString(),published_articles:valid.length,parse_errors:rows.length-valid.length,
  missing_two_inline_images:count(r=>r.inline_image_count<2),
  zero_inline_images:count(r=>r.inline_image_count===0),
  missing_structured_citations:count(r=>r.structured_citation_count===0),
  unverified_cover_licence_metadata:count(r=>!r.cover_licence_verified_by_metadata),
  undocumented_clinical_review:count(r=>!r.reviewer_recorded||!r.review_date_recorded||r.review_status!=='reviewed'),
  all_four_gaps:count(r=>r.inline_image_count===0&&r.structured_citation_count===0&&!r.cover_licence_verified_by_metadata&&(!r.reviewer_recorded||!r.review_date_recorded)),
  note:'Metadata-only triage. Image topic relevance, actual rights, citation accuracy and clinical safety require human verification.'
};
await mkdir(out,{recursive:true});
await writeFile(join(out,'remediation-manifest.json'),JSON.stringify({summary,articles:rows},null,2)+'\n');
const keys=['slug','title','category','inline_image_count','structured_citation_count','cover_licence_verified_by_metadata','review_status','high_risk_keyword_flag','status','blockers'];
const csv=v=>'"'+String(v??'').replaceAll('"','""')+'"';
await writeFile(join(out,'remediation-manifest.csv'),[keys.join(','),...rows.map(r=>keys.map(k=>csv(Array.isArray(r[k])?r[k].join(';'):r[k])).join(','))].join('\n')+'\n');
await writeFile(join(out,'remediation-summary.json'),JSON.stringify(summary,null,2)+'\n');
console.log(JSON.stringify(summary,null,2));
