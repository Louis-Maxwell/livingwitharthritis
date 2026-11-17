import {readFileSync} from "node:fs";
import {createHash} from "node:crypto";
import {describe,it,expect} from "vitest";
import {headDataFor,rewriteHead} from "../../../scripts/inject-canonicals.mjs";
const slugs=["rheumatology-waiting-times-uk", "questions-to-ask-your-consultant-arthritis", "hospital-appointments-frailty-arthritis-uk", "expert-qa-how-to-talk-to-your-gp-about-medication-worries", "activity-diary-arthritis-frailty-uk", "arthritis-symptoms-what-to-do-next"];
const baselines: Record<string,{body:string;meta:string}>={"rheumatology-waiting-times-uk": {"body": "36962a07f4855aa4649318730b94682bda40e93ab90ac63985f55aa142a4bf5a", "meta": "ed4ec12619f6d38a61ba472eb39943028939b79c01ce8adf57e11edfacebd224"}, "questions-to-ask-your-consultant-arthritis": {"body": "870ff31559e60df03356befdb82ff60d43cb40fc21b393200328983f3ac3e1aa", "meta": "5022123f4b4fef7791704cef17d39b421c3de6ca794303136425abe3f1741da7"}, "hospital-appointments-frailty-arthritis-uk": {"body": "c0435f5b5c09acc8b9c9035bd48567b36ce48d6da98e8aed98dbd4f1c19b6ddb", "meta": "70701be9ae2021e579ac065e84ebd886bd0b17f664ec3084ad16076959a3b954"}, "expert-qa-how-to-talk-to-your-gp-about-medication-worries": {"body": "6b37e157f7d8e81dfb92b1aa267d985506616d052aec087cc5014ac43a90279a", "meta": "d63bff60eca90e5e9be220877f9ac2515a6234f223150f8aed3221e4aff73acd"}, "activity-diary-arthritis-frailty-uk": {"body": "fcbf03993d3d3a1d30e9f2c69a793fe4ed1f770274d5c9b2d0b16af207f7333b", "meta": "a6bf504dfd372b8282553bf3b93e7925ac40920a62f6de99b7bbb50ccf44a87e"}, "arthritis-symptoms-what-to-do-next": {"body": "41befea26ca81c90481bafd26c0f83035a7c4d05d86dedbdf2ffec2cc0522da1", "meta": "a14ad21f5f943c56628a9cae95aa750b1cbb36b890be966c3626a85576eb8c31"}};
const hash=(s:string)=>createHash("sha256").update(s).digest("hex");
describe("contextual blank-record link expansion",()=>{
 it.each(slugs)("preserves existing guide content and dates in %s",slug=>{
  const path=`src/content/blog/posts/${slug}.json`;
  const post=JSON.parse(readFileSync(path,"utf8"));
  const clean=post.content.replace(/<section aria-label="Blank printable records">[\s\S]*?<\/section>\n\n/,"");
  expect(hash(clean)).toBe(baselines[slug].body);
  const newMeta={...post}; delete newMeta.content;
  expect(hash(JSON.stringify(newMeta))).toBe(baselines[slug].meta);
  expect(post.content).toContain("earlier review dates apply to the existing guide, not these sheets");
  expect(post.content).toContain("do not send your entries");
  expect(post.content).toContain("Do not delay medical help");
  const html=rewriteHead('<html><head></head><body><div id="root"></div></body></html>',`/blog/${slug}`);
  expect(html).toContain('href="/resources/symptom-flare-tracker"');
  expect(html).toMatch(/href="\/resources\/(?:gp-appointment-symptom-medication-tracker|flare-up-daily-log)\.pdf"/);
  expect(html).not.toMatch(/<meta[^>]+name="robots"[^>]+content="noindex/);
  expect((headDataFor(`/blog/${slug}`).article as {content:string}).content).toBe(post.content);
 });
});
