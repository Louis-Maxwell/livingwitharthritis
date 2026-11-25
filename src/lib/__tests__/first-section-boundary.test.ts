import { describe, expect, it } from 'vitest';
import { splitHtmlAfterFirstSection } from '../splitHtmlAtMiddleH2';

describe('article first-section boundary',()=>{
 it('keeps the first heading and its paragraphs together',()=>{
 const first='<p>Opening answer.</p><h2>First section</h2><p>Full explanation.</p><ul><li>Important detail.</li></ul>';
 const second='<h2>Second section</h2><p>More detail.</p>';
 expect(splitHtmlAfterFirstSection(first+second)).toEqual({first,second});
 });
 it('does not cut an authored section, including nested headings and lists',()=>{
 const first='<section aria-label="First"><h2>First section</h2><div><h3>Details</h3><ul><li>One</li></ul></div><p>Conclusion.</p></section>';
 const second='<section><h2>Next section</h2><p>Two</p></section>';
 expect(splitHtmlAfterFirstSection(first+second)).toEqual({first,second});
 });
 it('leaves a single wrapped article intact if no safe boundary exists',()=>{
 const html='<div><h2>First</h2><p>One</p><h2>Second</h2><p>Two</p></div>';
 expect(splitHtmlAfterFirstSection(html)).toEqual({first:html,second:''});
 });
 it.each(['','<p>No heading</p>','<h2>Only section</h2><p>All text</p>'])('preserves a guide with no second boundary',html=>{
 expect(splitHtmlAfterFirstSection(html)).toEqual({first:html,second:''});
 });
});
