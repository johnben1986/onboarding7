import MetadataHelper from "components/MetadataHelper";

import Image from "next/image";
import LedgerImg from "../../public/assets/images/business-tools/ledger.png";
import BrandNewLogoImg from "../../public/assets/images/business-tools/My Brand New Logo 2.png";
import LogoImg from "../../public/assets/images/business-tools/Logo.com 2.png";
import SmashingImg from "../../public/assets/images/business-tools/Smashing Logo 3.png";
import NorthWestImg from "../../public/assets/images/business-tools/North West Registered Agent 2.png";
import MyCompanyWorksImg from "../../public/assets/images/business-tools/MyCompanyWorks 2.png";
import TrademarkEngineImg from "../../public/assets/images/business-tools/Trademark Engine 2.png";
import BrightLocalImg from "../../public/assets/images/business-tools/Bright Local 2.png";
import SeoBuddyImg from "../../public/assets/images/business-tools/seobuddy-free-plan-logo.png";
import ShareASaleImg from "../../public/assets/images/business-tools/ShareASale 3.png";

export default function BusinessTools() {
  return (
    <>
      <MetadataHelper
        title={"Business Tools"}
        description={
          "Web3 Onboarding provides convenient access to a suite of business tools for entrepreneurs to transition from Web2 to Web3."
        }
        canonical={"https://web3onboarding.com/business-tools"}
      />
      <div className="mx-auto max-w-5xl space-y-16 pb-24 text-black">
        <div className="mb-16">
          <h1 className="mb-8 text-center font-brand-heading text-4xl font-bold">
            Helpful Links
          </h1>
          <div className="text-center font-brand-tomorrow text-xl">
            Web3 Onboarding provides convenient access to a suite of
            business tools for entrepreneurs to transition from Web2 to Web3.
            You can find leading providers for different services on this
            business tools page. Also, while it is true that we earn a
            commission when you use our referral links, these come at no extra
            cost to you!
          </div>
        </div>
        <div className="space-y-8 font-brand-tomorrow text-xl">
          <div className="text-center font-brand-heading text-2xl font-bold font-bold">
            Crypto Wallets
          </div>
          <div className="text-center text-lg">
            A cryptocurrency wallet holds the private keys to your digital
            assets. The best crypto wallets provide unparalleled security and
            ease of use and support a range of assets. Experienced users
            recommend a hardware wallet for the best security and a mobile
            wallet for regular transactions.
          </div>
          <div className="flex flex-wrap justify-center gap-32 gap-y-8">
            <a
              className="flex w-fit flex-col gap-2"
              href="/ledger"
              target="_blank"
              rel="noreferrer"
              aria-label="Ledger"
            >
              <Image
                src={LedgerImg}
                className="h-24 object-contain"
                alt="Ledger"
              />
              <div className="text-center">Ledger</div>
            </a>
          </div>
        </div>
        <hr className="mb-9 h-1 rounded border-0 bg-brand-blue" />
        <div className="space-y-8 font-brand-tomorrow text-xl">
          <div className="text-center font-brand-heading text-2xl font-bold">
            Logo Generators
          </div>
          <div className="text-center text-lg">
            A logo is the face of your brand and one of the first things
            customers see when they come across your business. Get a memorable
            logo for your brand using these instant logo generators.
          </div>
          <div className="flex flex-wrap justify-center gap-32 gap-y-8">
            <a
              className="flex w-fit flex-col gap-2"
              href="/my-brand-new-logo"
              target="_blank"
              rel="noreferrer"
              aria-label="My Brand New Logo"
            >
              <Image
                src={BrandNewLogoImg}
                className="h-24 object-contain"
                alt="My Brand New Logo"
              />
              <div className="text-center">My Brand New Logo</div>
            </a>
            <a
              className="flex w-fit flex-col gap-2"
              href="/logo.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Logo.com"
            >
              <Image
                src={LogoImg}
                className="h-24 object-contain"
                alt="Logo.com"
              />
              <div className="text-center">Logo.com</div>
            </a>
            <a
              className="flex w-fit flex-col gap-2"
              href="/smashinglogo"
              target="_blank"
              rel="noreferrer"
              aria-label="SMASHINGLOGO"
            >
              <Image
                src={SmashingImg}
                className="h-24 object-contain"
                alt="SMASHINGLOGO"
              />
              <div className="text-center">SMASHINGLOGO</div>
            </a>
          </div>
        </div>
        <hr className="mb-9 h-1 rounded border-0 bg-brand-blue" />

        <div className="space-y-8 font-brand-tomorrow text-xl">
          <div className="text-center font-brand-heading text-2xl font-bold">
            Business Registrations
          </div>
          <div className="text-center text-lg">
            Work with a reliable agency to register your business in the United
            States, Canada, and other jurisdictions. Whether you're a start-up
            or an established business, you can find the right registration plan
            right away
          </div>
          <div className="flex flex-wrap justify-center gap-32 gap-y-8">
            <a
              className="flex w-fit flex-col gap-2"
              href="/nortwest-registered-agent"
              target="_blank"
              rel="noreferrer"
              aria-label="Northwest Registered Agent LLC"
            >
              <Image
                src={NorthWestImg}
                className="h-24 object-contain"
                alt="Northwest Registered Agent LLC"
              />
              <div className="text-center">Northwest Registered Agent LLC</div>
            </a>
            <a
              className="flex w-fit flex-col gap-2"
              href="/mybusinessworks"
              target="_blank"
              rel="noreferrer"
              aria-label="MyCompanyWorks, Inc."
            >
              <Image
                src={MyCompanyWorksImg}
                className="h-24 object-contain"
                alt="MyCompanyWorks, Inc."
              />
              <div className="text-center">MyCompanyWorks, Inc.</div>
            </a>
          </div>
        </div>
        <hr className="mb-9 h-1 rounded border-0 bg-brand-blue" />

        <div className="space-y-8 font-brand-tomorrow text-xl">
          <div className="text-center font-brand-heading text-2xl font-bold">
            Trademark Registrations
          </div>
          <div className="text-center text-lg">
            Think you've got the next big idea for Web3? Register your IP with
            the world's best trademark agency and get maximum protection against
            theft in any jurisdiction. Enjoy a transparent registration process
            and guaranteed results.
          </div>
          <div className="flex flex-wrap justify-center gap-32 gap-y-8">
            <a
              className="flex w-fit flex-col gap-2"
              href="/trademark-engine"
              target="_blank"
              rel="noreferrer"
              aria-label="Trademark Engine, LLC"
            >
              <Image
                src={TrademarkEngineImg}
                className="h-24 object-contain"
                alt="Trademark Engine, LLC"
              />
              <div className="text-center">Trademark Engine, LLC</div>
            </a>
          </div>
        </div>
        <hr className="mb-9 h-1 rounded border-0 bg-brand-blue" />

        <div className="space-y-8 font-brand-tomorrow text-xl">
          <div className="text-center font-brand-heading text-2xl font-bold">
            Search Engine Optimization (SEO) Tools
          </div>
          <div className="text-center text-lg">
            SEO is the most reliable and result-oriented traffic source for
            online businesses. Yet, it is often difficult to find the right SEO
            agency or deploy a workable strategy. Get started with the best SEO
            tools from our inventory and take your pages to the top of search
            engines within the best possible time.
          </div>
          <div className="flex flex-wrap justify-center gap-32 gap-y-8">
            <a
              className="flex w-fit flex-col gap-2"
              href="/brightlocal"
              target="_blank"
              rel="noreferrer"
              aria-label="BrightLocal"
            >
              <Image
                src={BrightLocalImg}
                className="h-24 object-contain"
                alt="BrightLocal"
              />
              <div className="text-center">BrightLocal</div>
            </a>
            <a
              className="flex w-fit flex-col gap-2"
              href="https://shareasale.com/r.cfm?b=1748750&u=3400823&m=108888&urllink=&afftrack="
              target="_blank"
              rel="noreferrer"
              aria-label="SEO Buddy"
            >
              <Image
                src={SeoBuddyImg}
                className="h-24 object-contain"
                alt="SEO Buddy"
              />
              <div className="text-center">SEO Buddy</div>
            </a>
          </div>
        </div>
        <hr className="mb-9 h-1 rounded border-0 bg-brand-blue" />

        <div className="space-y-8 font-brand-tomorrow text-xl">
          <div className="text-center font-brand-heading text-2xl font-bold">
            CPS Affiliate Network
          </div>
          <div className="text-center text-lg">
            Advertise your business with the largest CPA affiliate network.
            Unlock a new revenue stream for your online business by becoming a
            global affiliate.
          </div>
          <div className="flex flex-wrap justify-center gap-32 gap-y-8">
            <a
              className="flex w-fit flex-col gap-2"
              href="/share-a-sale"
              target="_blank"
              rel="noreferrer"
              aria-label="Shareasale.com"
            >
              <Image
                src={ShareASaleImg}
                className="h-24 object-contain"
                alt="Shareasale.com"
              />
              <div className="text-center">Shareasale.com</div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
