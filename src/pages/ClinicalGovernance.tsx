import { Link } from "react-router-dom";
import GovernancePolicyPage from "./GovernancePolicyPage";
import { CHARITY } from "@/config/charity";
import { REVIEW_CYCLE_MONTHS } from "@/lib/reviewDates";

const ClinicalGovernance = () => (
  <GovernancePolicyPage
    path="/clinical-governance"
    title={`Clinical Governance | ${CHARITY.shortName}`}
    heading="Clinical governance"
    subtitle="Who reviews our health guides, which sources we use and how often we check them."
    description="How Living With Arthritis clinically reviews its arthritis guides: reviewer Louis Maxwell (HCPC PH128483), NHS and NICE sources, a 12-month review cycle and how to report an error."
  >
    <section>
      <h2>Who reviews our guides</h2>
      <p>
        Every health guide on this site is clinically reviewed by Louis Maxwell, an HCPC-registered
        physiotherapist (registration number PH128483). You can read more on his{" "}
        <Link to="/authors/maxwell">reviewer profile</Link>. Each guide shows who reviewed it, the date it
        was last reviewed and the date its next review is due.
      </p>
    </section>
    <section>
      <h2>Sources we use</h2>
      <p>We base our guides on UK clinical sources, mainly:</p>
      <ul>
        <li>
          <a href="https://www.nhs.uk/" target="_blank" rel="noopener">NHS</a> health information
        </li>
        <li>
          <a href="https://www.nice.org.uk/" target="_blank" rel="noopener">NICE</a> (National Institute for Health and Care Excellence) guidelines
        </li>
      </ul>
      <p>
        Where a guide cites other sources, they are listed on the page. Our{" "}
        <Link to="/evidence-register">evidence register</Link> lists every NHS, NICE and research source cited
        across the site, with the pages that cite it. See also our{" "}
        <Link to="/sources">clinical sources</Link> and <Link to="/editorial-standards">editorial standards</Link>.
      </p>
    </section>
    <section>
      <h2>Review cycle</h2>
      <p>
        Each guide is reviewed at least every {REVIEW_CYCLE_MONTHS} months. The &ldquo;Next review&rdquo; date shown
        on a guide is its last review date plus {REVIEW_CYCLE_MONTHS} months. We review a guide sooner if NHS or NICE
        guidance changes or if someone reports a problem.
      </p>
    </section>
    <section>
      <h2>Educational, not diagnostic</h2>
      <p>
        Our guides are general educational information, not a diagnosis or personal medical advice. Always follow
        the advice of your GP, physiotherapist or rheumatology team. For emergencies call 999; for urgent advice use NHS 111.
      </p>
    </section>
    <section>
      <h2>How to report an error</h2>
      <p>
        If you think something on our site is wrong or out of date, email{" "}
        <a href={`mailto:${CHARITY.contactEmail}`}>{CHARITY.contactEmail}</a> with the page address and what you think
        needs changing. Read how we handle reports in our <Link to="/corrections-policy">corrections policy</Link>.
      </p>
    </section>
  </GovernancePolicyPage>
);

export default ClinicalGovernance;
