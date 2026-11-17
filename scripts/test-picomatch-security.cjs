'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const { createRequire } = require('node:module');
const { readFileSync } = require('node:fs');
const { dirname, join } = require('node:path');
const pm = require('../vendor/picomatch');
const rejectsUnsafe = error => error instanceof SyntaxError && error.code === 'PICOMATCH_UNSAFE_REPEATED_EXTGLOB';
const hostile = ['+(*)b','+(*a)b','*(*)b','*(*a)b','prefix/+(*a)b','+(a|*a)b','+(*(a))b','+([ab])b'];
for (const optionSource of ['{}','{maxExtglobRecursion:false}','{maxExtglobRecursion:Infinity}','{fastpaths:false}','{capture:true}']) {
 test('reported repeated wildcard patterns fail explicitly with '+optionSource,()=>{
  const script=`const assert=require('node:assert/strict');const pm=require(${JSON.stringify(require.resolve('../vendor/picomatch'))});for(const p of ${JSON.stringify(hostile)})for(const api of ['makeRe','parse','isMatch','matcher']){const call=api==='matcher'?()=>pm(p,${optionSource}):api==='isMatch'?()=>pm.isMatch('a'.repeat(200)+'!',p,${optionSource}):()=>pm[api](p,${optionSource});assert.throws(call,e=>e.code==='PICOMATCH_UNSAFE_REPEATED_EXTGLOB');}`;
  const result=spawnSync(process.execPath,['-e',script],{timeout:1500,encoding:'utf8'});
  assert.ifError(result.error);assert.equal(result.status,0,result.stderr);
 });
}
test('ordinary globs and plain repeated alternatives keep useful behavior',()=>{
 assert.equal(pm.isMatch('src/a.ts','src/*.{ts,tsx}'),true);
 assert.equal(pm.isMatch('src/lib/a.tsx','src/**/*.{ts,tsx}'),true);
 assert.equal(pm.isMatch('src/a.js','src/*.{ts,tsx}'),false);
 assert.equal(pm.isMatch('abab','+(ab)'),true);
 assert.equal(pm.isMatch('abab','+(ab|cd)'),true);
 assert.equal(pm.isMatch('x.md','!(*.ts)'),true);
 assert.equal(pm.isMatch('x.ts','!(*.ts)'),false);
 assert.throws(()=>pm('+(*a)b'),rejectsUnsafe);
});
test('installed root and consumers execute the reviewed private fork',()=>{
 for(const consumer of [null,'micromatch','tinyglobby','readdirp','fast-glob','vite','vitest']){
  const r=consumer?createRequire(require.resolve(consumer)):require;
  const entry=r.resolve('picomatch');const dir=dirname(entry);
  const meta=JSON.parse(readFileSync(join(dir,'package.json'),'utf8'));
  assert.equal(meta.name,'@livingwitharthritis/picomatch',consumer||'root');
  assert.equal(meta.version,'4.0.7-lwa.1');
  assert.equal(readFileSync(join(dir,'lib/parse.js'),'utf8'),readFileSync(join(__dirname,'../vendor/picomatch/lib/parse.js'),'utf8'));
  assert.throws(()=>r('picomatch')('+(*a)b'),rejectsUnsafe);
 }
 const mm=require('micromatch');assert.deepEqual(mm(['a.ts','b.tsx','c.js'],'*.{ts,tsx}'),['a.ts','b.tsx']);
 assert.throws(()=>mm(['a.ts'],'+(*a)b'),rejectsUnsafe);
 const fg=require('fast-glob');assert.throws(()=>fg.sync('+(*a)b'),rejectsUnsafe);
});
test('representative normal patterns match upstream behavior',{skip:!process.env.PICOMATCH_UPSTREAM_PATH},()=>{
 const upstream=require(process.env.PICOMATCH_UPSTREAM_PATH);
 const patterns=['**/*.{ts,tsx}','src/**/test?.js','*.md','!(*.ts)','+(ab|cd)','a/[a-z].js','**/node_modules/**','./src/*','**/*.test.{ts,tsx}','**/!(*.d).ts'];
 const files=['a.ts','src/a.tsx','src/lib/test1.js','README.md','abcd','a/b.js','x/node_modules/a.ts','./src/a','src/a.test.ts','src/a.d.ts'];
 for(const pattern of patterns)for(const file of files)assert.equal(pm.isMatch(file,pattern),upstream.isMatch(file,pattern),pattern+' '+file);
});
