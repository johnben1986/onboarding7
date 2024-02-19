import { withAuth } from "components/Auth/authMiddleware";
import MetadataHelper from "components/MetadataHelper";

function PrivacyPolicy() {
  return (
    <>
      <MetadataHelper title="Terms of Use & Privacy Policy" />
      <div className="bg-image3 py-5">
        <div className="mx-auto w-10/12 space-y-3 text-justify font-brand-tomorrow text-white">
          <h1 className="text-center font-brand-heading text-2xl">
            PRIVACY POLICY
          </h1>
          <br />
          <p>
            <strong>Web3 Onboarding</strong> (hereafter referred to as “Web3 Onboarding”, “we”, “our”, or “us” as the context may require) is dedicated to facilitating the introduction and integration of users into the Web3 environment. This Privacy Policy pertains to your use of the website and services provided by Web3 Onboarding (collectively referred to as the “Services”). This document outlines the manner in which we gather, store, and process any personal data obtained from you, or that you supply to us. Please be aware that our Services are intended for individuals 18 years of age or older. If you are under 18, kindly refrain from accessing our Services and submitting any personal data.
          </p>
          <p><i>Disclaimer:</i> Web3 Onboarding is not officially registered in any jurisdiction. We do not bear liability for content created under our name or image. Furthermore, we are not accountable for content produced by users via the tools we provide.</p>
          <br />
          <h3 className="font-brand-heading">
            INFORMATION WE MAY COLLECT FROM YOU
          </h3>
          <p>
          We may, on occasion, gather or request the following personal details: email address, IP address, unique device identifiers, and payment data.
          </p>
          <p>
          In collaboration with third parties (such as business associates, payment services, ad networks, analytics companies, and domain providers), we might obtain additional data about you. This could encompass purchase records from partners who provide you with Web3 domains or other digital assets.
          </p>
          <br />
          <h3 className="font-brand-heading">
            HOW AND WHY WE USE YOUR PERSONAL DATA
          </h3>
          <br />
          <p>
          We utilize your data under legitimate grounds, including:
            <ul className="list-inside list-disc">
              <li>With your consent;</li>
              <li>To meet legal and regulatory requirements;</li>
              <li>For contract fulfillment or pre-contractual steps;</li>
              <li>Based on our legitimate interests or those of third parties.</li>
            </ul>
            A "legitimate interest" pertains to a valid business or commercial reason to process your data, unless this is outweighed by your personal rights.
          </p>
          <br />
          <h3 className="font-brand-heading">USES MADE OF YOUR PERSONAL DATA</h3>
          <br />
          <p>
          Your data aids us in:
            <ul className="list-inside list-disc">
              <li>Delivering the Services;</li>
              <li>Gauging and enhancing the Services;</li>
              <li>Communicating updates or changes to you;</li>
              <li>Conducting market research;</li>
              <li>Advertising our offerings;</li>
              <li>Rectifying website issues;</li>
              <li>Mitigating fraud or other illicit activities;</li>
              <li>Investigating disputes between users.</li>
            </ul>
          </p>
          <p>
          From time to time, we may reach out with offers, news, or information about other services.
          </p>
          <br />
          <h3 className="font-brand-heading">USER REGISTRATION</h3>
          <br />
          <p>
          Registration might be necessary to access certain Services. You are responsible for safeguarding your password. We reserve the right to alter or reclaim any username deemed unsuitable, offensive, or risky to Web3 Onboarding or its users.
          </p>
          <br />
          <h3 className="font-brand-heading">COOKIES</h3>
          <br />
          <p>
          Cookies help us differentiate users and comprehend usage patterns. They are small data files placed on your device during website visits. We deploy both persistent (long-lasting) and session (temporary) cookies. These track analytics and target advertising, among other functions. You can manage cookies via your browser settings, though this may limit some Services functionalities.
          </p>
          <br />
          <h3 className="font-brand-heading">YOUR RIGHTS</h3>
          <br />
          <p>
          You can opt-out of marketing communications. Furthermore, you may inquire about and request a copy of personal data we hold about you. To exercise these rights, contact us.
          </p>
          <br />
          <h3 className="font-brand-heading">CHANGES TO THIS PRIVACY POLICY</h3>
          <br />
          <p>
          We may periodically amend this policy. Changes will be posted on our website, and we suggest reviewing it regularly.
          </p>
          <br />
          <h3 className="font-brand-heading">CONTACT</h3>
          <br />
          <p>
          For questions or comments about this policy, reach out to us via email: info@web3onboarding.com
          </p>
          <br />
        </div>
      </div>
    </>
  );
}
export default withAuth(PrivacyPolicy);