import {describe,it,expect} from 'vitest';
import {readFileSync,statSync} from 'node:fs';
import {chatRheumatoid,chatFoods,chatDoctor,chatExercise,founderPortrait} from '@/data/images';
const pairs=[
 [chatRheumatoid,'public/og/conditions-rheumatoid-arthritis.png'],
 [chatFoods,'public/openverse/nutrition-06-fruit-salad-or-fruit-bowl.webp'],
 [chatDoctor,'public/openverse/community-09-us-navy-100306-n-5319a-020-occupational-therapist-.webp'],
];
describe('right-sized chat suggestion images',()=>{
 it('embeds a smaller local WebP without external requests, scripts or missing originals',()=>{
  for(const [path,source]of pairs){
   const file='public'+path;const svg=readFileSync(file,'utf8');
   expect(svg).not.toMatch(/<script|onload=|https?:\/\/(?!www\.w3\.org)/i);
   const data=svg.match(/data:image\/webp;base64,([A-Za-z0-9+/=]+)/)?.[1];
   expect(data).toBeTruthy();
   const b=Buffer.from(data!,'base64');
   expect(b.subarray(0,4).toString()).toBe('RIFF');
   expect(b.subarray(8,12).toString()).toBe('WEBP');
   const frame=b.indexOf(Buffer.from([0x9d,0x01,0x2a]));
   expect(frame).toBeGreaterThan(0);
   expect(b.readUInt16LE(frame+3)&0x3fff).toBeLessThanOrEqual(640);
   expect(b.readUInt16LE(frame+5)&0x3fff).toBeLessThanOrEqual(640);
   expect(statSync(file).size).toBeLessThan(statSync(source).size/2);
  }
 });
 it('leaves other page references and the already-small exercise image unchanged',()=>{
  expect(chatExercise).toBe('/openverse/cover-0269-stretching-exercises.webp');
  expect(founderPortrait).toBe('/openverse/community-09-us-navy-100306-n-5319a-020-occupational-therapist-.webp');
 });
});
