import { useRef, useState } from "react";
import styles from "../src/components/HomePage/HomePage.module.scss";
import FeaturedDomains from "../src/components/HomePage/FeaturedDomains";
import Link from "next/link";
import { message } from "antd";
import { useAPI } from "hooks/useAPI";
import SwiperCore, { Autoplay, FreeMode, Navigation, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Button from "components/utils/Button";
import Image from "next/image";
import BannerGlobeImg from "../public/assets/images/svg/globe.svg";
import TransakImg from "../public/assets/images/WalletIcons/transakLogo.png";
import MetamaskImg from "../public/assets/images/WalletIcons/metamaskWallet.svg";
import CoinbaseImg from "../public/assets/images/WalletIcons/Coinbase.png";
import ENSImg from "../public/assets/images/svg/ENS.svg";
import FNImg from "../public/assets/images/svg/FN.svg";
import UDImg from "../public/assets/images/svg/UD.svg";
import LogoImg from "../public/assets/images/svg/logo.svg";
import AffiliateButtonImg from "../public/assets/images/svg/affiliates.svg";
import QuickBuildButtonImg from "../public/assets/images/svg/QuickBuild-button.svg";
import IPFSImg from "../public/assets/images/svg/IPFS-Logo.svg";

import MetadataHelper from "components/MetadataHelper";

import TldDisrupt from "../public/assets/images/tlds/disrupt.svg";
import TldHollywood from "../public/assets/images/tlds/hollywood.svg";
import TldMyname from "../public/assets/images/tlds/myname.svg";
import TldOurname from "../public/assets/images/tlds/ourname.svg";
import TldYoutuber from "../public/assets/images/tlds/youtuber.png";
import TldNftunes from "../public/assets/images/tlds/nftunes.svg";

SwiperCore.use([Autoplay, Navigation, FreeMode, Pagination]);

export default function HomePage() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const featuredTLDsRef = useRef(null);
  const { api } = useAPI();

  let submitting = useRef(false);
  const submitForm = async (e) => {
    e.preventDefault();

    if (!submitting.current) {
      submitting.current = true;
      message.loading("Submitting your request...");
      await api.contactUs(Object.fromEntries(new FormData(e.target).entries()));
      message.success(
        "Request submitted! Our team will respond to you at the earliest opportunity."
      );
      submitting.current = false;
    }
  };
  const onEnterPress = (e) => {
    e = e || window.event;
    if (e.keyCode == 13) {
      document.getElementById("searchBtn").click();
      return false;
    }
    return true;
  };

  const dots = [
    {
      title: "Get a Wallet",
      dropdown: (
        <div className="flex w-full -translate-y-5 gap-6 text-center xl:-translate-y-3 xl:gap-0 2xl:-translate-y-5 2xl:gap-6">
          <div className="flex w-1/2 flex-col items-center gap-2">
            <div className="h-24 w-1 rotate-[30deg] bg-[#545454]"></div>
            <div className=" flex -translate-x-10 flex-col items-center">
              <Link
                target="_blank"
                rel="noreferrer"
                href="https://metamask.io/download/"
              >
                <Image
                  src={MetamaskImg}
                  width={50}
                  height={50}
                  className="cursor-pointer"
                ></Image>
              </Link>
              <p>Metamask.io Wallet Download (Decentralized)</p>
            </div>
          </div>
          <div className="flex w-1/2 flex-col items-center gap-2">
            <div className="h-24 w-1 -rotate-[30deg] bg-[#545454]"></div>
            <div className="flex translate-x-10 flex-col items-center">
              <Link
                target="_blank"
                rel="noreferrer"
                href="https://www.coinbase.com/wallet/downloads"
              >
                <Image
                  src={CoinbaseImg}
                  width={50}
                  height={50}
                  className="cursor-pointer"
                ></Image>
              </Link>
              <p>Coinbase Wallet (Centralized)</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Fiat to Crypto Exchange",
      dropdown: (
        <>
          <div className="h-20 w-1 bg-[#545454]"></div>
          <Link href="/buy-crypto">
            <Image
              src={TransakImg}
              width={50}
              height={50}
              className="cursor-pointer"
            ></Image>
          </Link>
          <p>Click Transak Logo</p>
        </>
      ),
    },
    {
      title: "Buy or Rent a Web3 Domain",
      dropdown: (
        <div className="flex w-full -translate-y-5 gap-6 text-center xl:-translate-y-3 xl:gap-0 2xl:-translate-y-5 2xl:gap-6">
          <div className="flex w-1/2 flex-col items-center gap-2">
            <div className="h-24 w-1 rotate-[30deg] bg-[#545454]"></div>
            <div className="flex -translate-x-10 flex-col items-center gap-3">
              <p>Create a New Domain</p>
              <Link
                target="_blank"
                rel="noreferrer"
                href="https://web3onboarding.com/freename"
              >
                <Image
                  src={FNImg}
                  width={100}
                  height={60}
                  className="cursor-pointer"
                ></Image>
              </Link>
              <Link
                target="_blank"
                rel="noreferrer"
                href="https://web3onboarding.com/unstoppable"
              >
                <Image
                  src={UDImg}
                  width={100}
                  height={60}
                  className="cursor-pointer"
                ></Image>
              </Link>
              <Link
                target="_blank"
                rel="noreferrer"
                href="https://ens.domains/"
              >
                <Image
                  src={ENSImg}
                  width={100}
                  height={60}
                  className="cursor-pointer"
                ></Image>
              </Link>
            </div>
          </div>
          <div className="flex w-1/2 flex-col items-center gap-2">
            <div className="h-24 w-1 -rotate-[30deg] bg-[#545454]"></div>
            <div className="flex translate-x-10 flex-col items-center gap-2">
              <Link href="/marketplace">
                <Image
                  src={LogoImg}
                  width={50}
                  height={50}
                  className="cursor-pointer"
                ></Image>
              </Link>
              <p>Vendors Marketplace</p>
              <div className="h-20 w-1 bg-[#545454]"></div>
              <p
                className="w-full cursor-pointer rounded-full border-2 border-[#545454] px-2 text-sm"
                onClick={() => {
                  featuredTLDsRef.current.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                Featured TLDs and Domains
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "QuickBuild a Web3Site",
      dropdown: (
        <>
          <div className="h-20 w-1 bg-[#545454]"></div>
          <Link href="/quickbuild">
            <Image
              src={QuickBuildButtonImg}
              width={200}
              height={100}
              className="cursor-pointer"
            ></Image>
          </Link>
          <div className="h-20 w-1 bg-[#545454]"></div>
          <Link href="/quickbuild">
            <Image
              src={AffiliateButtonImg}
              width={200}
              height={100}
              className="cursor-pointer"
            ></Image>
          </Link>
        </>
      ),
    },
    {
      title: "IPFS Decentralized Hosting",
      dropdown: (
        <>
          <div className="h-20 w-1 bg-[#545454]"></div>
          <Link href="/quickbuild/hosting">
            <Image
              src={IPFSImg}
              width={200}
              height={200}
              className="cursor-pointer"
            ></Image>
          </Link>
        </>
      ),
    },
  ];

  return (
    <>
      <MetadataHelper
        title="Web3 Onboarding"
        description="Web3 Onboarding is the premier platform to trade Web3 domain names. Browse, mint, buy, sell, and rent Web3 domains on the EDA platform now!"
        canonical="https://web3onboarding.com"
      />
      <Image
        src={BannerGlobeImg}
        alt="globe"
        className={`${styles.globeImage} lg:translate-x-[-20%] lg:translate-y-[-20%]`}
      />
      <div className="mb-12 text-center font-brand-heading font-bold">
        <h1 className="text-4xl tracking-[0.2em]">
          New to Web3? It's Easy! <br />
          Just Follow The Dots!
        </h1>
        <p className="text-xl">(Experienced users scroll down)</p>
      </div>
      <div className="flex flex-col justify-center font-brand-heading xl:flex-row xl:gap-10">
        {dots.map((dot, index) => (
          <div key={index} className="z-10 flex flex-col items-center">
            <div className="peer flex h-64 w-64 cursor-default items-center rounded-full border-4 border-[#545454] bg-brand-blue text-center text-3xl font-bold text-white xl:h-44 xl:w-44 2xl:h-64 2xl:w-64">
              <p className="w-full cursor-default text-3xl xl:text-base 2xl:text-3xl">
                <span className="text-5xl xl:text-2xl 2xl:text-5xl">
                  {index + 1}.
                </span>
                <br /> {dot.title}
              </p>
            </div>
            <div className="delay-50 flex w-72 origin-top flex-col items-center gap-2 text-lg font-bold transition ease-in-out xl:w-44 2xl:w-72">
              {dot.dropdown}
            </div>
          </div>
        ))}
      </div>
      {/* <TopDomains /> */}

      <div ref={featuredTLDsRef}>
        <FeaturedDomains />
      </div>
      <div className="mt-10 flex w-full flex-col items-center justify-center gap-10">
        <h2 className="w-full text-center font-brand-heading text-5xl text-black">
          Featured TLDs
        </h2>
        <iframe
          className="h-40 w-3/5 md:h-[34em]"
          src="https://www.youtube.com/embed/0a1woIYDzi4"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <div className="mx-16 grid w-11/12 max-w-7xl grid-cols-1 items-center sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/freename" className="m-auto">
            <Image src={TldDisrupt} />
          </Link>
          <Link href="/freename" className="m-auto">
            <Image src={TldHollywood} />
          </Link>
          <Link href="/freename" className="m-auto">
            <Image src={TldMyname} />
          </Link>
          <Link href="/freename" className="m-auto">
            <Image src={TldOurname} />
          </Link>
          <Link href="/freename" className="m-auto">
            <Image src={TldYoutuber} />
          </Link>
          <Link href="/freename" className="m-auto">
            <Image src={TldNftunes} />
          </Link>
        </div>
      </div>

      <div
        id="contact-us-section"
        className={`${styles["contact-us-section"]} mt-10`}
      >
        <div className={styles["contact-text-section"]}>
          <div className="font-brand-heading text-4xl font-bold">
            Contact US
          </div>
          <br />
          <p>
            The world of Web3 is easier than what you might think! If you're
            looking for an answer to a particular question, we'd love to help!
            Please visit our{" "}
            <Link
              href="/help-center"
              className="font-bold hover:text-brand-hover"
            >
              {" "}
              Help Center
            </Link>{" "}
            section. It's full of great information about all things Web3!
            Chances are, you'll probably find the answers to your questions. If
            not, please fill out a support ticket or a
            <Link
              href="/help-center"
              className="font-bold hover:text-brand-hover"
            >
              {" "}
              Help Center
            </Link>{" "}
            suggestion form, and one of our team members will respond at our
            earliest convenience!
          </p>
        </div>
        <div className={styles["contact-form-section"]} id="contact">
          <div className={styles.contactForm}>
            <form onSubmit={submitForm}>
              <input
                name="name"
                type="text"
                placeholder="Your Name"
                className={styles.input}
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                required={true}
                className={styles.input}
              />
              <input
                name="subject"
                type="text"
                placeholder="Subject"
                className={styles.input}
              />
              <textarea
                name="message"
                id=""
                cols="30"
                rows="10"
                placeholder="Message"
              ></textarea>
              <Button
                className="!bg-brand-background !text-black hover:bg-sky-200"
                type="submit"
              >
                Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
