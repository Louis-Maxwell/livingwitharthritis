/**
 * Complete PIP guide for arthritis: eligibility, points, claiming and challenges (UK)
 * Content for /guides/benefits-pip (Benefits & UK Support batch 3, Oct 2026).
 * Facts checked on GOV.UK / official sources on 11 November 2026 (phone line, form, timescales,
 * 8/12 point thresholds from the DWP PIP assessment guide part 1). Clinically reviewed by Louis Maxwell (HCPC PH128483).
 */

export const PIP_GUIDE_TITLE = "Complete PIP guide for arthritis: eligibility, points, claiming and challenges (UK)";

export const PIP_GUIDE_META_TITLE = "How to Claim PIP for Arthritis: Step-by-Step Guide (2026)";

export const PIP_GUIDE_DESCRIPTION = "Claim PIP for arthritis step by step: call 0800 917 2222, fill in the form, send evidence, prepare for the assessment and appeal if you are refused.";

export const PIP_GUIDE_QUICK_ANSWER = "Daily living and mobility are scored separately across 12 activities. In each part, 8 to 11 points gives the standard rate and 12 or more the enhanced rate. PIP is not means-tested and you can claim while working. In Scotland you claim Adult Disability Payment instead.";

export const PIP_GUIDE_ANSWER =
  "To claim PIP in England or Wales, call the DWP PIP new claims line on 0800 917 2222 (Monday to Friday, 8am to 5pm). DWP sends the PIP2 \"How your disability affects you\" form: return it within 1 month with evidence. You may have an assessment before the decision. If you disagree, ask for mandatory reconsideration within 1 month, then appeal to a tribunal.";

export const PIP_GUIDE_CHECKED = "11 November 2026";

/** Numbered claim steps: rendered as the visible <ol> and as HowTo JSON-LD. */
export const PIP_HOWTO_STEPS: { id: string; name: string; text: string }[] = [
  {
    id: "step-1",
    name: "Check you can claim",
    text: "You must be 16 or over, usually under State Pension age for a new claim, and have difficulty with everyday tasks or getting around that you expect to last at least 12 months from when it started. In Scotland, apply for Adult Disability Payment instead.",
  },
  {
    id: "step-2",
    name: "Call the PIP new claims line",
    text: "In England and Wales, call the DWP PIP new claims line on 0800 917 2222 (Relay UK: 18001 then 0800 917 2222), Monday to Friday, 8am to 5pm, or write to Freepost DWP PIP 1. Have your National Insurance number, bank details and your GP or health worker's details ready. In some areas you can apply fully online.",
  },
  {
    id: "step-3",
    name: "Fill in the PIP2 \"How your disability affects you\" form",
    text: "DWP emails you a link if you applied by phone, or posts the form, usually within 2 weeks. Return it within 1 month, or contact the PIP enquiry line if you need more time. For each activity, say whether you can do it safely, to an acceptable standard, repeatedly and in a reasonable time, on typical and flare days.",
  },
  {
    id: "step-4",
    name: "Send supporting evidence",
    text: "Include what you already have, such as prescription lists, care plans, clinic letters, physiotherapy or occupational therapy reports, and a symptom diary. Do not miss the form deadline while waiting for new evidence.",
  },
  {
    id: "step-5",
    name: "Go to the assessment if you are invited",
    text: "If DWP needs more information, a health professional assesses you at a centre, at home, by phone or by video call. It usually takes about 1 hour, the audio is recorded and you can bring someone with you.",
  },
  {
    id: "step-6",
    name: "Read your decision letter",
    text: "Daily living and mobility are scored separately: 8 to 11 points gives the standard rate and 12 or more the enhanced rate of that part. The letter gives your award, first payment date and when it will be reviewed. A first award lasts between 9 months and 10 years.",
  },
  {
    id: "step-7",
    name: "Ask for mandatory reconsideration if you disagree",
    text: "Ask DWP to look at the decision again, usually within 1 month of the date on your decision letter. It is free. Explain which activities you think were scored wrongly and send any new evidence.",
  },
  {
    id: "step-8",
    name: "Appeal to a tribunal",
    text: "If you still disagree, appeal to the Social Security and Child Support Tribunal within 1 month of the date of your mandatory reconsideration notice. It is free and independent of DWP.",
  },
];

const escHtml = (v: string) => v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const PIP_HOWTO_HTML = `<ol class="pip-howto">
${PIP_HOWTO_STEPS.map((s, i) => `<li id="${s.id}"><strong>${i + 1}. ${escHtml(s.name)}.</strong> ${escHtml(s.text)}</li>`).join("\n")}
</ol>`;

/** The 12 PIP activities (DWP PIP assessment guide part 2) with arthritis examples. */
export const PIP_ACTIVITY_ROWS: { activity: string; part: "Daily living" | "Mobility"; arthritis: string }[] = [
  { activity: "1. Preparing food", part: "Daily living", arthritis: "Gripping and lifting pans, chopping, opening jars and packets, standing at the cooker; needing a perching stool or relying on a microwave." },
  { activity: "2. Taking nutrition (eating and drinking)", part: "Daily living", arthritis: "Cutting up food or lifting a cup with painful, stiff hands; needing adapted cutlery." },
  { activity: "3. Managing therapy or monitoring a health condition", part: "Daily living", arthritis: "Help with injections such as methotrexate or biologics, opening blister packs, applying creams or doing prescribed exercises." },
  { activity: "4. Washing and bathing", part: "Daily living", arthritis: "Getting in and out of the bath or shower, reaching feet, back and hair; needing a shower seat, bath board or someone nearby." },
  { activity: "5. Managing toilet needs or incontinence", part: "Daily living", arthritis: "Getting on and off the toilet and wiping; needing a raised seat, frame or rails." },
  { activity: "6. Dressing and undressing", part: "Daily living", arthritis: "Buttons, zips, socks, shoes and bras; how long it takes, and whether you need aids or another person's help." },
  { activity: "7. Communicating verbally", part: "Daily living", arthritis: "Arthritis does not usually affect this directly. Mention it if another condition affects speaking, hearing or understanding." },
  { activity: "8. Reading and understanding signs, symbols and words", part: "Daily living", arthritis: "Arthritis does not usually affect this directly. Mention eye conditions linked to inflammatory arthritis, such as uveitis, if they affect reading." },
  { activity: "9. Engaging with other people face to face", part: "Daily living", arthritis: "Scored for mental health or cognitive difficulties. Mention it if pain-related anxiety or depression means you need support to be with people." },
  { activity: "10. Making budgeting decisions", part: "Daily living", arthritis: "Scored for cognitive or mental health difficulties, not physical ones. Mention it only if this applies to you." },
  { activity: "11. Planning and following journeys", part: "Mobility", arthritis: "Scored for mental health, cognitive or sensory difficulties, such as overwhelming anxiety about going out. Physical walking problems belong under moving around." },
  { activity: "12. Moving around", part: "Mobility", arthritis: "How far you can walk reliably and repeatedly, at what pace, with what aid, and how you feel afterwards. More than 200 metres scores 0; 50 to 200 metres scores 4; 20 to 50 metres scores 8 unaided or 10 with an aid; 20 metres or less scores 12." },
];

const PIP_ACTIVITY_TABLE_HTML = `<table>
<caption>The 12 PIP activities and how arthritis can affect them</caption>
<thead><tr><th scope="col">PIP activity</th><th scope="col">Part</th><th scope="col">How arthritis can affect it: what to describe</th></tr></thead>
<tbody>
${PIP_ACTIVITY_ROWS.map((r) => `<tr><th scope="row">${escHtml(r.activity)}</th><td>${r.part}</td><td>${escHtml(r.arthritis)}</td></tr>`).join("\n")}
</tbody>
</table>`;

export const PIP_GUIDE_HTML = `<p class="checked-note"><strong>Last checked: 11 November 2026</strong> against <a href="https://www.gov.uk/pip" rel="noopener">GOV.UK: Personal Independence Payment</a>, <a href="https://www.gov.uk/pip/how-to-claim" rel="noopener">GOV.UK: How to claim PIP</a>, the <a href="https://www.gov.uk/government/publications/personal-independence-payment-assessment-guide-for-assessment-providers/pip-assessment-guide-part-1-the-assessment-process" rel="noopener">DWP PIP assessment guide</a> and the DWP <a href="https://www.gov.uk/government/publications/benefit-and-pension-rates-2026-to-2027" rel="noopener">benefit and pension rates 2026 to 2027</a>. Benefit rules can change, so always check the official pages before you claim.</p>

<p><strong>Before you apply:</strong> if you are still deciding whether arthritis may qualify, read <a href="/blog/pip-for-arthritis-uk">Can you get PIP for arthritis?</a> That page is about eligibility, including rates checked against GOV.UK. This page is the claim itself. Use the <a href="/resources/pip-evidence-diary">Printable PIP evidence diary</a> to record daily living and mobility for two to four weeks before you fill in the form.</p>

<p>Arthritis can make ordinary tasks harder, slower or more painful: getting dressed, cooking a meal, washing, managing tablets or walking to the shops. Personal Independence Payment (PIP) exists to help with the extra costs that come with this. Many people with arthritis are eligible but never claim, or are turned down because their form did not show the real impact. This guide covers the whole process, from checking whether you qualify to challenging a decision, so you know what to expect at each stage.</p>

<h2 id="what-pip-is">What is PIP, and what is it not?</h2>
<ul>
<li><strong>It is for extra living costs</strong> if you have a long-term physical or mental health condition or disability and find everyday tasks or getting around difficult.</li>
<li><strong>It is not means-tested.</strong> GOV.UK states that the amount you get is not affected by your income or savings.</li>
<li><strong>You can claim while working.</strong> PIP is not an out-of-work benefit.</li>
<li><strong>It is tax free</strong> and usually paid every 4 weeks.</li>
<li><strong>It is based on how your condition affects you,</strong> not on your diagnosis.</li>
</ul>
<p>PIP has two parts. You can get one or both:</p>
<ul>
<li>a <strong>daily living part</strong>, if you need help with everyday tasks</li>
<li>a <strong>mobility part</strong>, if you need help getting around</li>
</ul>

<h2 id="rates">How much is PIP in 2026/27?</h2>
<table>
<thead><tr><th>Part</th><th>Standard (lower) weekly rate</th><th>Enhanced (higher) weekly rate</th></tr></thead>
<tbody>
<tr><td>Daily living</td><td>£76.70</td><td>£114.60</td></tr>
<tr><td>Mobility</td><td>£30.30</td><td>£80.00</td></tr>
</tbody>
</table>
<p>Source: <a href="https://www.gov.uk/pip" rel="noopener">GOV.UK PIP guide</a> and the DWP rates publication for 2026 to 2027, checked on 11 November 2026. Adult Disability Payment in Scotland is paid at the same rates for 2026/27, according to <a href="https://www.mygov.scot/adult-disability-payment" rel="noopener">mygov.scot</a>.</p>

<h2 id="eligibility">Who can claim PIP?</h2>
<p>According to GOV.UK, you can get PIP if all of the following apply:</p>
<ul>
<li>you are 16 or over</li>
<li>you have a long-term physical or mental health condition or disability</li>
<li>you have difficulty doing certain everyday tasks or getting around</li>
<li>you expect the difficulties to last for at least 12 months from when they started</li>
</ul>
<p>You usually also need to be under State Pension age to make a new claim. If you are over State Pension age, you usually claim Attendance Allowance instead, unless you got PIP or Adult Disability Payment in the last 12 months. There are also residence rules: you usually need to have lived in England, Scotland or Wales for at least 2 of the last 3 years and be living in England or Wales when you apply.</p>
<p>The difficulty must happen <strong>most of the time</strong>. GOV.UK explains this means you expect to have difficulty on more than half of the days over a 12-month period. For arthritis with flares, this is the most important rule to understand, and it is explained below.</p>

<h2 id="nations">England, Wales, Scotland and Northern Ireland</h2>
<table>
<thead><tr><th>Where you live</th><th>Benefit</th><th>Run by</th><th>Key differences</th></tr></thead>
<tbody>
<tr><td>England and Wales</td><td>PIP</td><td>Department for Work and Pensions (DWP)</td><td>The process described in this guide</td></tr>
<tr><td>Scotland</td><td>Adult Disability Payment (ADP)</td><td>Social Security Scotland</td><td>Separate application (online, phone or paper); its own process for consultations and challenging decisions. Same 2026/27 rates as PIP</td></tr>
<tr><td>Northern Ireland</td><td>PIP</td><td>Department for Communities</td><td>Separate phone lines and processes; see nidirect</td></tr>
</tbody>
</table>
<p>If you move between Scotland and England or Wales, GOV.UK says you must tell the relevant agency and make a new claim for the other benefit. For example, if you move from England or Wales to Scotland, your PIP stops 13 weeks after you move, so apply for ADP as soon as possible.</p>

<h2 id="points">How does the PIP points system work?</h2>
<p>PIP is assessed against 12 activities: 10 daily living activities and 2 mobility activities. Each activity has a list of statements (called descriptors) worth different points. The PIP regulations set the thresholds, and the DWP assessment guide confirms them: 8 points for the standard rate and 12 points for the enhanced rate of each part.</p>
<ul>
<li><strong>8 to 11 points</strong> in the daily living activities = standard rate of the daily living part</li>
<li><strong>12 points or more</strong> in the daily living activities = enhanced rate</li>
<li>The same thresholds (8 and 12) apply separately to the mobility activities</li>
</ul>
<table>
<thead><tr><th>Daily living activities</th><th>Mobility activities</th></tr></thead>
<tbody>
<tr><td>Preparing food; eating and drinking; managing medicines or treatments; washing and bathing; using the toilet; dressing and undressing; communicating; reading; mixing with other people; making budgeting decisions</td><td>Planning and following a journey; moving around</td></tr>
</tbody>
</table>

<h3 id="reliably">The "reliably" test</h3>
<p>This is where many arthritis claims are won or lost. The DWP assessment guide says you should only be treated as able to do an activity if you can do it <strong>reliably</strong>, which means:</p>
<ul>
<li><strong>safely</strong>, in a way that is unlikely to cause harm to you or anyone else</li>
<li><strong>to an acceptable standard</strong></li>
<li><strong>repeatedly</strong>, as often as is reasonably needed</li>
<li><strong>in a reasonable time</strong>, which means no more than twice as long as someone without your condition would normally take</li>
</ul>
<p>So if you can get dressed, but it takes you 40 minutes and leaves you exhausted and in pain, or you can walk 50 metres once but not again that day, you should explain that.</p>

<h3 id="fluctuating">Flares and fluctuating arthritis</h3>
<p>The regulations look at which descriptor applies on <strong>more than 50% of days</strong> over the relevant period. If different descriptors apply on different days and none reaches 50% on its own, but scoring descriptors together cover more than half the days, the descriptor that applies for the highest proportion of days is used. In practice, describe what a typical week and month look like: how many bad days, what you can and cannot do on them, and how long flares last. A diary is the best way to show this; use our <a href="/resources/pip-evidence-diary">Printable PIP evidence diary</a>.</p>

<h3 id="medicines-aids">Painkillers, aids and timing</h3>
<p>The assessment guide also says assessors should consider whether you can do an activity when you need to. If painkillers let you get washed and dressed soon after waking, you may not score; if you have to wait a couple of hours for them to work, a scoring descriptor may apply. Using aids such as a perching stool, long-handled sponge, grab rails or a walking stick can score points if you need them to complete an activity reliably.</p>

<h2 id="arthritis-examples">How can arthritis affect each PIP activity?</h2>
<p>PIP scores 12 activities. This table lists each one, as named in the DWP assessment guide, with examples of what people with arthritis often need to describe. Only include what is true for you.</p>
${PIP_ACTIVITY_TABLE_HTML}

<h2 id="claim">How do I claim PIP for arthritis, step by step?</h2>
${PIP_HOWTO_HTML}
<p>You can ask for someone to join your call or to call on your behalf (you need to be with them). You may also be able to get a home visit from a DWP officer to help with your claim; ask when you call.</p>

<h2 id="form">Filling in the form: practical tips</h2>
<ul>
<li>Answer every question that applies to you, even if it seems obvious.</li>
<li>Describe a typical week, including bad days and how often they happen. Avoid describing only your best or worst day.</li>
<li>For each task, say whether you can do it safely, to an acceptable standard, repeatedly and in a reasonable time, and what happens if you try.</li>
<li>Mention pain, stiffness, fatigue, dropping things and falls.</li>
<li>List aids and adaptations you use or need, and help you get from other people (or need, even if you do not get it).</li>
<li>Give real examples: "On 4 or 5 days a week I cannot do up buttons or a bra; my partner helps me. Getting dressed takes me about 30 minutes and I have to sit down to rest."</li>
</ul>

<h2 id="evidence">What evidence helps a PIP claim?</h2>
<ul>
<li>Clinic letters from rheumatology, orthopaedics or pain services that describe your condition, treatment and its effects</li>
<li>Reports from a physiotherapist or occupational therapist describing function, aids and limits</li>
<li>Your prescription list, including injections and side effects</li>
<li>A statement from a carer, family member or friend who sees how you manage</li>
<li>A symptom and activity diary covering at least a couple of weeks</li>
</ul>
<p>You do not need to pay for new medical reports. Send what you have and explain the gaps in your own words.</p>

<h2 id="assessment">What happens at the PIP assessment?</h2>
<p>GOV.UK says you might be invited to an assessment with a health professional if more information is needed. It can take place at an assessment centre, at your home, over the phone or by video call, and usually takes about 1 hour. You can have someone with you, such as a friend or support worker. The audio is recorded; if you do not want it recorded, contact the assessment provider using the details in your invitation letter. They may ask you to do some simple movements. Only do what you can do safely and without causing more pain, and say if something would hurt or you could not repeat it.</p>

<h2 id="decision">The decision and reviews</h2>
<p>You will get a letter saying whether you will get PIP, the date of your first payment and when your claim will be reviewed. GOV.UK says a first award is between 9 months and 10 years, depending on whether your needs are likely to change. You keep getting PIP while a review is being carried out. Tell the PIP enquiry line straight away if your needs change, you go into hospital or a care home, or you plan to go abroad for more than 4 weeks.</p>

<h2 id="challenge">What can I do if I disagree with the PIP decision?</h2>
<ol>
<li><strong>Mandatory reconsideration.</strong> Ask DWP to look at the decision again, usually within one month of the date on your decision letter. It is free.</li>
<li><strong>Appeal to a tribunal.</strong> If you are still unhappy, appeal to the Social Security and Child Support Tribunal within one month of your mandatory reconsideration notice. It is free and independent of DWP.</li>
</ol>
<p>Our step-by-step <a href="/blog/appeal-rejected-pip-arthritis">PIP appeal guide</a> explains how to build a strong challenge. In Scotland, ADP decisions are challenged through Social Security Scotland; in Northern Ireland, through the Department for Communities and The Appeals Service.</p>

<h2 id="what-pip-unlocks">What else can a PIP award help you get?</h2>
<p>GOV.UK lists extra help linked to PIP. Depending on your award, this can include:</p>
<ul>
<li>a <strong>Blue Badge</strong> (in England you automatically qualify if you score 8 points or more in the "moving around" activity)</li>
<li>a <strong>vehicle tax discount or exemption</strong></li>
<li>the <strong>Motability Scheme</strong>, if you get the enhanced (higher) mobility rate</li>
<li>a <strong>Disabled Persons Railcard</strong>, if you get either part</li>
<li><strong>Carer's Allowance</strong> for someone who cares for you at least 35 hours a week, if you get the daily living part</li>
<li>extra amounts (disability premiums) in some means-tested benefits, and possible Council Tax and bus travel help from your council</li>
</ul>
<p>You can get PIP at the same time as all other benefits except Armed Forces Independence Payment.</p>

<h2 id="free-help">Free, independent help</h2>
<p>These organisations give free benefits advice or information. We are not connected to them:</p>
<ul>
<li><strong>Citizens Advice</strong> (England, Wales), <strong>Citizens Advice Scotland</strong> and <strong>Advice NI</strong> for form-filling and challenges</li>
<li><strong>Turn2us</strong> for a free benefits calculator and grants search</li>
<li><strong>Scope</strong> and <strong>Disability Rights UK</strong> for disability benefits information</li>
<li>Your council's <strong>welfare rights service</strong>, if it has one</li>
</ul>

<p>If this guide helped you, you can help keep free arthritis information available: <a href="/ways-to-help">volunteer, fundraise or partner with us</a>, or <a href="/donate">support our charity with a donation</a>.</p>
<p>If you are not sure whether to apply, <a href="/blog/pip-for-arthritis-uk">Can you get PIP for arthritis?</a> covers eligibility. Stay on this page for the application itself, and use the <a href="/resources/pip-evidence-diary">Printable PIP evidence diary</a> while you fill in the form.</p>
<h2 id="sources">Sources and further reading</h2>
<ul>
<li><a href="https://www.gov.uk/pip" rel="noopener">GOV.UK: Personal Independence Payment (full guide)</a></li>
<li><a href="https://www.gov.uk/pip/eligibility" rel="noopener">GOV.UK: PIP eligibility</a></li>
<li><a href="https://www.gov.uk/pip/how-to-claim" rel="noopener">GOV.UK: How to claim PIP</a></li>
<li><a href="https://www.gov.uk/government/publications/benefit-and-pension-rates-2026-to-2027" rel="noopener">DWP: Benefit and pension rates 2026 to 2027</a></li>
<li><a href="https://www.gov.uk/government/publications/personal-independence-payment-assessment-guide-for-assessment-providers/pip-assessment-guide-part-2-the-assessment-criteria" rel="noopener">DWP: PIP assessment guide part 2 – the assessment criteria</a></li>
<li><a href="https://www.legislation.gov.uk/uksi/2013/377/regulation/5" rel="noopener">The Social Security (Personal Independence Payment) Regulations 2013, regulations 5–7</a></li>
<li><a href="https://www.gov.uk/government/publications/personal-independence-payment-assessment-guide-for-assessment-providers/pip-assessment-guide-part-1-the-assessment-process" rel="noopener">DWP: PIP assessment guide part 1 – the assessment process (8 and 12 point thresholds)</a></li>
<li><a href="https://www.gov.uk/government/publications/example-pip2-how-your-disability-affects-you" rel="noopener">GOV.UK: Example PIP2 – How your disability affects you</a></li>
<li><a href="https://www.gov.uk/mandatory-reconsideration" rel="noopener">GOV.UK: Challenge a benefit decision (mandatory reconsideration)</a></li>
<li><a href="https://www.gov.uk/appeal-benefit-decision" rel="noopener">GOV.UK: Appeal a benefit decision</a></li>
<li><a href="https://www.citizensadvice.org.uk/benefits/sick-or-disabled-people-and-carers/pip/before-claiming/check-you-are-eligible/" rel="noopener">Citizens Advice: Check if you're eligible for PIP</a></li>
<li><a href="https://www.citizensadvice.org.uk/benefits/sick-or-disabled-people-and-carers/pip/help-with-your-claim/fill-in-form-pip/" rel="noopener">Citizens Advice: Check how to fill in your claim form</a></li>
<li><a href="https://www.citizensadvice.org.uk/benefits/sick-or-disabled-people-and-carers/pip/help-with-your-claim/your-supporting-evidence/" rel="noopener">Citizens Advice: Getting evidence to support your PIP claim</a></li>
<li><a href="https://www.mygov.scot/adult-disability-payment" rel="noopener">mygov.scot: Adult Disability Payment</a></li>
<li><a href="https://www.nidirect.gov.uk/articles/personal-independence-payment-pip" rel="noopener">nidirect: Personal Independence Payment (Northern Ireland)</a></li>
</ul>`;

export const PIP_GUIDE_FAQS: { question: string; answer: string }[] = [
  { question: "Can I get PIP for arthritis?", answer: "Yes, if arthritis makes everyday tasks or getting around difficult on most days and you expect this to last at least 12 months from when it started. PIP is based on how your condition affects you, not the diagnosis itself. Check the current rules on GOV.UK." },
  { question: "What is the PIP new claims phone number?", answer: "In England and Wales, call the DWP PIP new claims line on 0800 917 2222 (Relay UK: 18001 then 0800 917 2222), Monday to Friday, 8am to 5pm. You can also start a claim by writing to Freepost DWP PIP 1. Checked on GOV.UK on 11 November 2026." },
  { question: "What is the PIP2 form?", answer: "PIP2 is the \"How your disability affects you\" form. DWP sends it after you start your claim, as an online link or by post (usually within 2 weeks). You should return it within 1 month; contact the PIP enquiry line if you need more time." },
  { question: "How many points do I need for PIP?", answer: "Daily living and mobility are scored separately. In each part, 8 to 11 points gives the standard rate and 12 or more gives the enhanced rate, according to the DWP PIP assessment guide." },
  { question: "How much PIP could I get in 2026/27?", answer: "The daily living part is £76.70 a week (standard) or £114.60 (enhanced). The mobility part is £30.30 (standard) or £80 (enhanced). These figures were checked on GOV.UK on 11 November 2026." },
  { question: "Will I need a PIP assessment?", answer: "Not always. GOV.UK says you might be invited to an assessment if DWP needs more information. It can be at an assessment centre, at home, by phone or by video call, usually takes about 1 hour, and you can bring someone with you." },
  { question: "Can I work and claim PIP?", answer: "Yes. PIP is not means-tested and is not an out-of-work benefit, so you can claim whether or not you work. Your income and savings do not affect it." },
  { question: "How do I show that my arthritis flares?", answer: "Describe a typical week and month: how many bad days you have, what you cannot do on them and how long flares last. PIP looks at which descriptor applies on more than half of days, so a diary covering several weeks is very helpful." },
  { question: "How long do I have to challenge a PIP decision?", answer: "You usually need to ask for mandatory reconsideration within one month of the date on your decision letter, and appeal to the tribunal within one month of your mandatory reconsideration notice." },
  { question: "What if I live in Scotland?", answer: "Working-age adults in Scotland apply for Adult Disability Payment from Social Security Scotland instead of PIP. It has daily living and mobility parts at the same 2026/27 rates." },
];
