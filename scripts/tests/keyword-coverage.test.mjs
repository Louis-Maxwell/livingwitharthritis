import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { classifyKeyword, tokens } from '../generate-keyword-coverage.mjs';
function fixture(body) {const pages=[{path:'/conditions/osteoarthritis',body,head:'osteoarthritis',headTokens:new Set(['osteoarthritis'])}];const index=new Map(tokens(body).map(w=>[w,[0]]));return [pages,index];}
test('local query cannot be labelled covered by a national overview',()=>{assert.equal(classifyKeyword('osteoarthritis leeds',...fixture('osteoarthritis symptoms treatment')).status,'content_gap');});
test('token co-occurrence requires intent review',()=>{assert.equal(classifyKeyword('osteoarthritis diet',...fixture('osteoarthritis symptoms. exercise and diet')).status,'intent_review');});
test('literal phrase gets content evidence rather than a ranking claim',()=>{assert.equal(classifyKeyword('osteoarthritis symptoms',...fixture('osteoarthritis symptoms treatment')).status,'phrase_present');});
test('all generated navigation and aliases reference canonical sitemap paths',()=>{const paths=new Set([...readFileSync('public/sitemap.xml','utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>new URL(m[1]).pathname.replace(/\/$/,'')||'/'));const links=JSON.parse(readFileSync('src/data/keywordRelatedLinks.generated.json'));for(const [path,rows] of Object.entries(links)){assert.ok(paths.has(path));assert.ok(rows.length<=3);for(const r of rows){assert.ok(paths.has(r.href),r.href);assert.notEqual(r.href,path);}}const aliases=JSON.parse(readFileSync('src/data/keywordSearchAliases.generated.json'));for(const [path,rows] of Object.entries(aliases)){assert.ok(paths.has(path));assert.ok(rows.length<=12);}});
