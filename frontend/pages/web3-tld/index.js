import MetadataHelper from "components/MetadataHelper";
import Button from "components/utils/Button";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/assets/images/svg/logo.svg";
import FreenameLogo from "../../public/assets/images/png/freename-logo-black-text.png";

export default function web3Tld() {
  return (
    <>
      <MetadataHelper
        title={"Business Tools"}
        description={
          "Take your Web3 domain game to the next level by owning your own top-level domain (TLD)."
        }
        canonical={"https://web3onboarding.com/web3-tld"}
      />
      <div className="mx-10 space-y-16 pb-24 text-black lg:mx-32">
        <div className="mt-28 flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2">
            <h2 className="mb-3 font-brand-tomorrow text-base lg:text-lg">
              Take your Web3 domain game to the next level by owning your own
              top-level domain (TLD).
            </h2>
            <h1 className="mb-3 font-brand-heading text-2xl font-bold lg:text-4xl">
              You can own the next big Web3 TLD or domain!
            </h1>
            <p className="font-brand-tomorrow text-black">
              .crypto / .polygon / .disrupt / .myname / .ourname
            </p>
            <br />
            <br />
            <Button
              href="https://web3onboarding.com/freename"
              target="_blank"
              rel="noreferrer"
              className="text-center font-brand-tomorrow text-xl"
            >
              Get a Web3 TLD
            </Button>
          </div>
          <div className="mt-10 w-full sm:mt-0 lg:w-1/2">
            <h2 className="mb-10 text-center font-brand-tomorrow text-xl">
              Powered by
            </h2>
            <div className="flex items-center justify-center gap-8">
              <div className="relative grid items-center">
                <Link href="/home">
                  <Image
                    className="object-contain object-right"
                    src={Logo}
                    alt="EDA"
                    height={115}
                    width={115}
                  />
                </Link>
              </div>
              {/* <p className="float-left font-brand-heading text-2xl">x</p>
              <div className="relative grid items-center">
                <Link href="/freename">
                  <Image
                    className="object-contain object-left"
                    src={FreenameLogo}
                    alt="Freename"
                    height={115}
                    width={115}
                  />
                </Link>
              </div> */}
            </div>
          </div>
        </div>
        <div className="flex basis-1/3 flex-col content-between justify-center gap-2 lg:flex-row">
          <div className="mb-10 grow-0 rounded bg-brand-background p-4 sm:mb-0">
            <h3 className="mb-2 font-brand-heading text-2xl font-bold">
              Lifetime Earnings
            </h3>
            <p className="mb-4 font-brand-tomorrow text-lg">
              Earn a lifetime passive income of 50% for any new domain
              registrations under your TLD. It doesn’t get better than this!
            </p>
          </div>
          <div className="mb-10 grow-0 rounded bg-brand-background p-4 sm:mb-0">
            <h3 className="mb-2 font-brand-heading text-2xl font-bold">
              Build Communities
            </h3>
            <p className="mb-4 font-brand-tomorrow text-lg">
              Build an online community around your Web3 TLD. Community members
              can show off their domain name on social media, join exclusive
              groups, and much more!
            </p>
          </div>
          <div className="mb-10 grow-0 rounded bg-brand-background p-4 sm:mb-0">
            <h3 className="mb-2 font-brand-heading text-2xl font-bold">
              Control Your Domain Names
            </h3>
            <p className="mb-4 font-brand-tomorrow text-lg">
              Tired of being an underdog? Now you can reserve the best domain
              names under your TLD and monetize your ownership.
            </p>
          </div>
        </div>

        <div className="flex flex-col content-center space-y-4 align-middle font-brand-tomorrow text-xl">
          <div className="text-center font-brand-heading text-2xl font-bold">
            Want a Web3 Domain Instead?
          </div>
          <div className="text-center">
            Find the most exciting and meaningful collection of Web3 domains on
            Freename
            <p>
              <br />
              .ourname, .myname, .metaverse, .satoshi, .hodl
            </p>
          </div>
          <div className="text-center">
            <Button
              href="https://web3onboarding.com/freename"
              target="_blank"
              rel="noreferrer"
              className="text-center font-brand-tomorrow text-3xl"
            >
              Get Started Here
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
