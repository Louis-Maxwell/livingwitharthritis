// Local, opt-in controls only. No network requests, tracking or canvas.
const svg = document.getElementById('knee-map');
const card = document.getElementById('diagram-card');
const output = document.getElementById('selected-part');
const buttons = [...document.querySelectorAll('[aria-label="Knee diagram labels"] button')];
const explanations = [...document.querySelectorAll('dl>div')].map(el => el.querySelector('dt').textContent + ': ' + el.querySelector('dd').textContent);
const checkbox = document.getElementById('enable-tilt');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
let bounds = null;
function reset(){card.style.removeProperty('--tilt-x');card.style.removeProperty('--tilt-y');}
function select(index){svg.dataset.selected=String(index);buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));output.textContent=explanations[index];}
buttons.forEach((button,index)=>{
 button.addEventListener('click',()=>select(index));
 button.addEventListener('keydown',event=>{
  const next=['ArrowRight','ArrowDown'].includes(event.key)?(index+1)%buttons.length:['ArrowLeft','ArrowUp'].includes(event.key)?(index+buttons.length-1)%buttons.length:event.key==='Home'?0:event.key==='End'?buttons.length-1:-1;
  if(next<0)return;event.preventDefault();select(next);buttons[next].focus();
 });
});
function motion(){checkbox.disabled=reduce.matches;if(reduce.matches){checkbox.checked=false;reset();}}
reduce.addEventListener('change',motion);motion();
checkbox.addEventListener('change',()=>{if(!checkbox.checked)reset();});
card.addEventListener('pointerenter',()=>{bounds=card.getBoundingClientRect();});
card.addEventListener('pointerleave',reset);
card.addEventListener('pointermove',event=>{
 if(!checkbox.checked||reduce.matches||!fine.matches||event.pointerType!=='mouse'||!bounds){reset();return;}
 card.style.setProperty('--tilt-x',Math.max(-4,Math.min(4,-(event.clientY-bounds.top-bounds.height/2)/bounds.height*8))+'deg');
 card.style.setProperty('--tilt-y',Math.max(-4,Math.min(4,(event.clientX-bounds.left-bounds.width/2)/bounds.width*8))+'deg');
});
