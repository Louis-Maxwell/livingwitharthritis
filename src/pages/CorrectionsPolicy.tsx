import { Link } from "react-router-dom";
import GovernancePolicyPage from "./GovernancePolicyPage";
import { CHARITY } from "@/config/charity";
import { REVIEW_CYCLE_MONTHS } from "@/lib/reviewDates";

const CorrectionsPolicy = () => (
  <GovernancePolicyPage
    path="/corrections-policy"
    title={`Corrections Policy | ${CHARITY.shortName}`}
    heading="Corrections policy"
    subtitle="How to tell us about a mistake, and what we do about it."
    description="How to report an error on Living With Arthritis and how we correct it: clinical review by Louis Maxwell (HCPC PH128483) against NHS and NICE sources, with updated review dates."
  >
    <section>
      <h2>How to report an error</h2>
      <p>
        Email <a href={`mailto:${CHARITY.contactEmail}`}>{CHARITY.contactEmail}</a>. Please include the page address,
        the text you think is wrong and, if you can, a source such as an NHS or NICE page.
      </p>
    </section>
    <section>
      <h2>Who checks it</h2>
      <p>
        Reports about health content are checked by our clinical reviewer, Louis Maxwell (HCPC PH128483), against
        current NHS and NICE guidance.
      </p>
    </section>
    <section>
      <h2>What we do</h2>
      <ul>
        <li>If the information is wrong or out of date, we correct the page.</li>
        <li>A corrected guide gets a new &ldquo;Last reviewed&rdquo; date, and its &ldquo;Next review&rdquo; date moves to {REVIEW_CYCLE_MONTHS} months later.</li>
        <li>If the content is accurate, we may still make it clearer, and we will reply to explain.</li>
      </ul>
    </section>
    <section>
      <h2>Regular reviews</h2>
      <p>
        Separately from corrections, every guide is reviewed at least every {REVIEW_CYCLE_MONTHS} months. See our{" "}
        <Link to="/clinical-governance">clinical governance</Link> page for details.
      </p>
    </section>
    <section>
      <h2>Medical advice</h2>
      <p>
        We cannot give personal medical advice by email. If you are worried about your health, contact your GP or NHS 111,
        or call 999 in an emergency.
      </p>
    </section>
  </GovernancePolicyPage>
);

export default CorrectionsPolicy;
