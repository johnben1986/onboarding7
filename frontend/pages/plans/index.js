import React from "react";
import Link from "next/link";
import Image from "next/image";
import appBuilder from "/public/assets/images/app-builder.png";
import b2b from "/public/assets/images/b2b.webp";
import cryptoRamp from "/public/assets/images/crypto-ramp.webp";
import learn from "/public/assets/images/learn.webp";
import marketplace from "/public/assets/images/marketplace.png";
import priority from "/public/assets/images/priority.webp";
import quickBuild from "/public/assets/images/quickbuild.webp";
import react from "/public/assets/images/react.png";
import review from "/public/assets/images/review.webp";
import wallet from "/public/assets/images/wallet.webp";
import lock from "/public/assets/images/lock.webp";
import ipfs from "/public/assets/images/ipfs-new.png";
import { useTransak } from "hooks/useTransak";
import { withAuth } from "components/Auth/authMiddleware";
import MetadataHelper from "components/MetadataHelper";

import { reactIcons } from "components/utils/icons";
const Benefits = () => {
  const { transak } = useTransak();
  // **************
  const essential = [
    {
      number: "1",
      heading: "In order to stay safe, you need a safe wallet.",
      para: "Learn about wallets, and which one suits you best. ",
      btn: "Learn about Wallets",
      path: "web3/getting-wallet",
    },
    {
      number: "2",
      heading: "You need a safe place to purchase crypto.",
      para: "Once you have a wallet, you're able to hold crypto! Safely purchasing crypto is just as important as having a safe wallet.",
      btn: "Learn about Fiat to Crypto",
      path: "web3/purchase-crypto",
    },
    {
      number: "3",
      heading: "Make a name for yourself",
      para: "Get a personalized web3 domain, which serves multiple purposes. ",
      btn: "Learn about Web3 Domains",
      path: "web3/web3-domains",
    },
    {
      number: "4",
      heading: "Fully experience Web3 with Quickbuild.",
      para: "Access Quickbuild Decentralized Hosting. Create your very own  Web3site.",
      btn: "Learn about Quickbuild",
      path: "web3/quick-build",
    },
    {
      number: "5",
      heading: "Fully experience IPFS.",
      para: "Access IPFS Decentralized Hosting. Create your very own  Web3site.",
      btn: "Learn about IPFS",
      path: "web3/ipfs-hosting",
    },
  ];
  const personal = [
    {
      number: "1",
      heading: "Learn and Experience",
      para: "Advanced learning, access to Membership Content Page (Ability to become a Creator)",
      btn: "Learn and Experience",
      path: "#",
    },
    {
      number: "2",
      heading: "7 Safe Wallet Options",
      para: "Learn about our top-suggested safe wallets. How to use them and how to secure them.",
      btn: "Learn about Safe Wallets",
      path: "#",
    },
    {
      number: "3",
      heading: "Review Page",
      para: "...",
      btn: "Review Page",
      path: "#",
    },
    {
      number: "4",
      heading: "Quickbuild V2",
      para: "...",
      btn: "Try Now",
      path: "#",
    },
    {
      number: "5",
      heading: "React IPFS Capability",
      para: "...",
      btn: "Host Now",
      path: "#",
    },
  ];
  const business = [
    {
      number: "1",
      heading: "Priority Support",
      para: "Receive Priority, dedicated support",
      btn: "Contact Us",
      path: "#",
    },
    {
      number: "2",
      heading: "Business to Business Solutions",
      para: "Book a half hour or one hour call with our team, and tap into the Continuum.",
      btn: "Schedule a Call",
      path: "#",
    },
    {
      number: "3",
      heading: "Quickbuild D’App Builder",
      para: "....",
      btn: "Quickbuild D’app Builder",
      path: "#",
    },
    {
      number: "4",
      heading: "10 Safe Wallet Options",
      para: "Learn about our top-suggested safe wallets. How to use them and how to secure them.",
      btn: "Learn about Safe Wallets",
      path: "#",
    },
  ];
  const essentialBenifits = essential.map((item, index) => (
    <div
      key={index}
      className="flex flex-col items-center justify-between gap-3 rounded-xl border border-white bg-primary-newBgColor/50 p-5 py-4 sm:flex-row"
    >
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="flex-center h-8 w-8 flex-shrink-0 rounded-full bg-white p-1 text-18 font-semibold text-black lg:text-30 3xl:h-10 3xl:w-10">
            {item.number}
          </span>
          <h5 className="text-18 font-semibold text-white lg:text-24">
            {item.heading}
          </h5>
        </div>
        <p className="min-h-[60px]  pt-2 text-16 text-slate-300 text-white lg:pl-8">
          {item.para}
        </p>
      </div>
      <div className="w-full max-w-[200px] lg:max-w-[300px]">
        <Link
          href={item.path}
          className="flex w-full items-center justify-between gap-3 rounded-full bg-white px-3 py-2 pl-5 text-14  text-black md:text-16"
        >
          {item.btn}{" "}
          <span className="rounded-full bg-black p-1 text-16 text-white lg:p-3 lg:text-20">
            {reactIcons.arrowright}
          </span>
        </Link>
      </div>
    </div>
  ));
  const personalBenifits = personal.map((item, index) => (
    <div
      key={index}
      className="flex flex-col items-center justify-between gap-3 rounded-xl border border-white bg-primary-newBgColor/50 p-5 py-4 sm:flex-row"
    >
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="flex-center h-8 w-8 flex-shrink-0 rounded-full bg-white p-1 text-18 font-semibold text-black lg:text-30 3xl:h-10 3xl:w-10">
            {item.number}
          </span>
          <h5 className="text-18 font-semibold text-white lg:text-24">
            {item.heading}
          </h5>
        </div>
        <p className="min-h-[60px]  pt-2 text-16 text-slate-300 text-white lg:pl-8">
          {item.para}
        </p>
      </div>
      <div className="w-full max-w-[200px] lg:max-w-[300px]">
        <Link
          href={item.path}
          className="flex w-full items-center justify-between gap-3 rounded-full bg-white px-3 py-2 pl-5 text-14  text-black md:text-16"
        >
          {item.btn}{" "}
          <span className="rounded-full bg-black p-1 text-16 text-white lg:p-3 lg:text-20">
            {reactIcons.arrowright}
          </span>
        </Link>
      </div>
    </div>
  ));
  const businessBenifits = business.map((item, index) => (
    <div
      key={index}
      className="flex flex-col items-center justify-between gap-3 rounded-xl border border-white bg-primary-newBgColor/50 p-5 py-4 sm:flex-row"
    >
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="flex-center h-8 w-8 flex-shrink-0 rounded-full bg-white p-1 text-18 font-semibold text-black lg:text-30 3xl:h-10 3xl:w-10">
            {item.number}
          </span>
          <h5 className="text-18 font-semibold text-white lg:text-24">
            {item.heading}
          </h5>
        </div>
        <p className="min-h-[60px]  pt-2 text-16 text-slate-300 text-white lg:pl-8">
          {item.para}
        </p>
      </div>
      <div className="w-full max-w-[200px] lg:max-w-[300px]">
        <Link
          href={item.path}
          className="flex w-full items-center justify-between gap-3 rounded-full bg-white px-3 py-2 pl-5 text-14  text-black md:text-16"
        >
          {item.btn}{" "}
          <span className="rounded-full bg-black p-1 text-16 text-white lg:p-3 lg:text-20">
            {reactIcons.arrowright}
          </span>
        </Link>
      </div>
    </div>
  ));

  // **************
  const essential2 = [
    {
      number: "1",
      image: wallet,
      heading: "Safe Wallets",
    },
    {
      number: "2",
      image: cryptoRamp,
      heading: "Fiat To Crypto On-Ramp",
    },
    {
      number: "3",
      image: marketplace,
      heading: "Web3 Domains/TLDs Marketplace",
    },
    {
      number: "4",
      image: quickBuild,
      heading: "QuickBuild + IPFS Hosting",
    },
  ];
  const personal2 = [
    {
      number: "1",
      image: learn,
      heading: "Learn & Experience",
    },
    {
      number: "2",
      image: wallet,
      heading: "MORE Safe Wallets",
    },
    {
      number: "3",
      image: review,
      heading: "Review Page",
    },
    {
      number: "4",
      image: quickBuild,
      heading: "QuickBuild V2",
    },
    {
      number: "5",
      image: react,
      heading: "React IPFS Capability",
    },
  ];
  const business2 = [
    {
      number: "1",
      image: wallet,
      heading: "MORE Safe Wallets",
    },
    {
      number: "2",
      image: b2b,
      heading: "Business to Business Solutions",
    },
    {
      number: "3",
      image: appBuilder,
      heading: "QuickBuild D’App Builder",
    },
    {
      number: "4",
      image: priority,
      heading: "DAAP IPFS Capabilities",
    },
  ];
  const essentialBenifits2 = essential2.map((item, index) => (
    <Link
      href={"/"}
      key={index}
      className="flex items-center rounded-xl border border-white bg-primary-newBgColor/50 p-5 py-4"
    >
      <div className="mr-[10px] h-[80px] w-[80px]">
        <Image
          src={item.image}
          width={80}
          height={80}
          className="h-[80px] w-[80px] object-contain"
          alt=""
        />
      </div>
      <div className="w-[calc(100%-90px)]">
        <h3 className="text-center text-18 font-semibold text-white lg:text-24">
          {item.heading}
        </h3>
      </div>
    </Link>
  ));
  const personalBenifits2 = personal2.map((item, index) => (
    <Link
      href={"/"}
      key={index}
      className="flex items-center rounded-xl border border-white bg-primary-newBgColor/50 p-5 py-4 "
    >
      <div className="mr-[10px] h-[80px] w-[80px]">
        <Image
          src={item.image}
          alt=""
          width={80}
          height={80}
          className="h-[80px] w-[80px] object-contain"
        />
      </div>
      <div className="w-[calc(100%-90px)]">
        <h3 className="text-center text-18 font-semibold text-white lg:text-24">
          {item.heading}
        </h3>
      </div>
    </Link>
  ));

  const businessBenifits2 = business2.map((item, index) => (
    <Link
      href={"/"}
      key={index}
      className="flex items-center rounded-xl border border-white bg-primary-newBgColor/50 p-5 py-4"
    >
      <div className="mr-[10px] h-[80px] w-[80px]">
        <Image
          src={item.image}
          alt=""
          width={80}
          height={80}
          className="h-[80px] w-[80px] object-contain"
        />
      </div>
      <div className="w-[calc(100%-90px)]">
        <h3 className="text-center text-18 font-semibold text-white lg:text-24">
          {item.heading}
        </h3>
      </div>
    </Link>
  ));

  const checklist0 = [
    {
      para: "3 Safe Wallet Options",
    },
    {
      para: "Fiat to Crypto On-ramp",
    },
    {
      para: "Quickbuild V1 Access",
    },
    {
      para: "IPFS Decentralized Hosting",
    },
    {
      para: "Marketplace Access",
    },
  ];
  const checklist1 = [
    {
      para: "All in Free Plan +",
    },
    {
      para: "Access to basic knowledgebase",
    },
    {
      para: "Team Consultation",
    },
    {
      para: "Support Line",
    },
    {
      para: "Use Creators Collective",
    },
    {
      para: "Write Reviews",
    },
    {
      para: "Access Search3ngine",
    },
    {
      para: "Level-up Search Status",
    },
  ];
  const checklist2 = [
    {
      para: "Personal Plan",
    },
    {
      para: 'Priority Support'
    },
    {
      para: "Website hands-on help",
    },
    {
      para: "Business Tools",
    },
    {
      para: 'Access to B2B Knowledgebase'
    },
    {
      para: "1st level Tokenomics and Tokenization",
    },
    {
      para: '10% Off any Blockchain Council Course'
    },
  ];
  const checklist3 = [
    {
      para: "All in Business Package +",
    },
    {
      para: "B2B Solutions",
    },
    {
      para: "Work with vetted Business",
    },
    {
      para: 'Tokenization and Launch Services, HANDS ON HELP'
    },
    {
      para: 'Access to extensive knowledgebase'
    },
    {
      para: "Free Web3site",
    },
    {
      para: "15% Off any Blockchain Council Course",
    },
  ];

  return (
    <>
 {/* packages and pricing  */}
 <section
          id="pricing"
          className="panel bg-image4 section-center flex-center scroll-span-align min-h-screen">
          <div className="container max-w-[1200px]">
            <h1 className="heading-4 text-center text-white">
              Membership Packages and Pricing
            </h1>
            <p className="pt-4 text-center font-semibold text-white">
              Free consultation on deciding which package suits you best
            </p>
          <div className="grid grid-cols-1 items-stretch gap-3 pt-5 md:grid-cols-4">
            
          <div className="col-span-1 overflow-hidden rounded-xl border-2 border-white p-1">
                <div className="flex h-full flex-col justify-between overflow-hidden rounded-xl bg-primary-newBgColor/80 py-2 px-4  lg:py-6">
                  <div className="">
                    <h4 className="lg:heading-6 text-center text-18 font-semibold text-white">
                    Free
                    </h4>
                    <p className="pt-2 text-center font-semibold text-white lg:pt-4">
                      no monthly fee
                    </p>
                  </div>
                  <div className="space-y-3 py-10">
                    {checklist0.map((item, index) => (
                      <div
                        key={index}
                        className="flex  items-center gap-2 text-white"
                      >
                        <span>{reactIcons.check}</span>
                        <p>{item.para}</p>
                      </div>
                    ))}
                    {/* <p className="py-3 text-white">5 safe Registrars, 1 safe Reseller</p> */}
                  </div>
                  <div className="mx-auto w-full max-w-[280px]">
                    <a
                      href="#benefit"
                      className="flex w-full items-center justify-between gap-3 rounded-full border border-black bg-white px-3 py-2 pl-5 text-14 text-black lg:text-15"
                    >
                      {" "}
                      Start your Journey
                      <span className="rounded-full bg-black p-1 text-14 text-white lg:p-3 lg:text-20">
                        {reactIcons.arrowright}
                      </span>
                    </a>
                  </div>
                </div>
            </div>
            
              <div className="col-span-1 overflow-hidden rounded-xl border-2 border-white p-1">
                <div className="flex h-full flex-col justify-between overflow-hidden rounded-xl bg-primary-newBgColor/80 py-2 px-4  lg:py-6">
                  <div className="">
                    <h4 className="lg:heading-6 text-center text-18 font-semibold text-white">
                    Personal
                    </h4>
                    <p className="pt-2 text-center font-semibold text-white lg:pt-4">
                      100$/mo
                    </p>
                  </div>
                  <div className="space-y-3 py-10">
                    {checklist1.map((item, index) => (
                      <div
                        key={index}
                        className="flex  items-center gap-2 text-white"
                      >
                        <span>{reactIcons.check}</span>
                        <p>{item.para}</p>
                      </div>
                    ))}
                    {/* <p className="py-3 text-white">5 safe Registrars, 1 safe Reseller</p> */}
                  </div>
                  <div className="mx-auto w-full max-w-[280px]">
                    <a
                      href="#benefit"
                      className="flex w-full items-center justify-between gap-3 rounded-full border border-black bg-white px-3 py-2 pl-5 text-14 text-black lg:text-15"
                    >
                      {" "}
                      Personal Plan
                      <span className="rounded-full bg-black p-1 text-14 text-white lg:p-3 lg:text-20">
                        {reactIcons.arrowright}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-span-1 overflow-hidden rounded-xl border-2 border-white p-1">
                <div className="flex h-full flex-col justify-between overflow-hidden rounded-xl bg-primary-newBgColor/80 py-2 px-4  lg:py-6">
                  <div className="">
                    <h4 className="lg:heading-6 text-center text-18 font-semibold text-white">
                    Business
                    </h4>
                    <p className="pt-2 text-center font-semibold text-white lg:pt-4">
                      $300/mo
                    </p>
                  </div>
                  <div className="space-y-3 py-10">
                    {checklist2.map((item, index) => (
                      <div
                        key={index}
                        className="flex  items-center gap-2 text-white"
                      >
                        <span>{reactIcons.check}</span>
                        <p>{item.para}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mx-auto w-full max-w-[280px]">
                    <button
                      onClick={() => openModal("personal")}
                      className="flex w-full items-center justify-between gap-3 rounded-full border border-black bg-white px-3 py-2 pl-5 text-14  text-black lg:text-15"
                    >
                      {" "}
                     Business Plan
                      <span className="rounded-full bg-black p-1 text-14 text-white lg:p-3 lg:text-20">
                        {reactIcons.arrowright}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-span-1 overflow-hidden rounded-xl border-2 border-white p-1">
                <div className="flex h-full flex-col justify-between overflow-hidden rounded-xl bg-primary-newBgColor/80 py-2 px-4  lg:py-6">
                  <div className="">
                    <h4 className="lg:heading-6 text-center text-18 font-semibold text-white">
                   Ultimate Launch
                    </h4>
                    <p className="pt-2 text-center font-semibold text-white lg:pt-4">
                      $2700/mo
                    </p>
                  </div>
                  <div className="space-y-3 py-10">
                    {checklist3.map((item, index) => (
                      <div
                        key={index}
                        className="flex  items-center gap-2 text-white"
                      >
                        <span>{reactIcons.check}</span>
                        <p>{item.para}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mx-auto w-full max-w-[280px]">
                    <button
                      onClick={() => openModal("business")}
                      className="flex w-full items-center justify-between gap-3 rounded-full border border-black bg-white px-3 py-2 pl-5 text-14  text-black lg:text-15"
                    >
                      {" "}
                      Ultimate Launch
                      <span className="rounded-full bg-black p-1 text-14 text-white lg:p-3 lg:text-20">
                        {reactIcons.arrowright}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* personal */}
        <section
          id="personal"
          className="panel bg-image4 section-center flex-center scroll-span-align hidden min-h-screen"
        >
          <div className="container relative max-w-[1200px] py-2.5">
            <Link
              href={"#pricing"}
              className="absolute left-0 right-0 top-0 bottom-0 flex items-center	justify-center rounded-xl border border-white bg-white bg-opacity-20"
            >
              <div className="flex flex-col items-center">
                <Image src={lock} alt="" width={150} height={150} className="mb-5" />
                <h2 className="text-center text-18 font-semibold text-black lg:text-24">
                  Become a Member
                </h2>
              </div>
            </Link>
            <h1 className="heading-2 text-center text-white">
              Personal Benefits
            </h1>
            <div className="flex flex-col gap-4 pt-7 lg:px-[3%] 3xl:pt-[50px]">
              {personalBenifits}
            </div>
          </div>
        </section>

        {/* business */}
        <section
          id="business"
          className="panel bg-image4 section-center flex-center scroll-span-align hidden min-h-screen"
        >
          <div className="container relative max-w-[1200px] py-2.5">
            <Link
              href={"#pricing"}
              className="absolute left-0 right-0 top-0 bottom-0 flex items-center	justify-center rounded-xl border border-white bg-white bg-opacity-20"
            >
              <div className="flex flex-col items-center">
                <Image src={lock} alt="" width={150} height={150} className="mb-5" />
                <h2 className="text-center text-18 font-semibold text-black lg:text-24">
                  Become a Member
                </h2>
              </div>
            </Link>
            <h1 className="heading-2 text-center text-white">
              Business Benefits
            </h1>
            <div className="flex flex-col gap-4 pt-7 lg:px-[3%] 3xl:pt-[50px]">
              {businessBenifits}
            </div>
          </div>
        </section>
        {/* essential benefit */}
        <section
          id="personal"
          className="panel bg-image4 section-center flex-center scroll-span-align hidden"
        >
          <div className="container max-w-[1200px]">
            <h1 className="heading-2 text-center text-white">
              Essential Benefits
            </h1>
            <div className="grid grid-cols-1 gap-4 pt-7 md:grid-cols-2 lg:px-[3%] 3xl:pt-[50px]">
              {essentialBenifits2}
            </div>
          </div>
        </section>
        {/* personal benefit */}
        <section
          id="personal"
          className="panel bg-image4 section-center flex-center scroll-span-align hidden"
        >
          <div className="container relative max-w-[1200px] py-2.5">
            <Link
              href={"#pricing"}
              className="absolute left-0 right-0 top-0 bottom-0 flex items-center	justify-center rounded-xl border border-white bg-white bg-opacity-20"
            >
              <div className="flex flex-col items-center">
                <Image src={lock} alt="" width={150} height={150} className="mb-5" />
                <h2 className="text-center text-18 font-semibold text-black lg:text-24">
                  Become a Member
                </h2>
              </div>
            </Link>
            <h1 className="heading-2 text-center text-white">
              Personal Benefits
            </h1>
            <div className="grid grid-cols-1 gap-4 pt-7 md:grid-cols-2 lg:px-[3%] 3xl:pt-[50px]">
              {personalBenifits2}
            </div>
          </div>
        </section>
        {/* business benefit */}
        <section
          id="personal"
          className="panel bg-image4 section-center flex-center scroll-span-align hidden"
        >
          <div className="container relative max-w-[1200px] py-2.5">
            <Link
              href={"#pricing"}
              className="absolute left-0 right-0 top-0 bottom-0 flex items-center	justify-center rounded-xl border border-white bg-white bg-opacity-20"
            >
              <div className="flex flex-col items-center">
                <Image src={lock} alt="" width={150} height={150} className="mb-5" />
                <h2 className="text-center text-18 font-semibold text-black lg:text-24">
                  Become a Member
                </h2>
              </div>
            </Link>
            <h1 className="heading-2 text-center text-white">
              Business Benefits
            </h1>
            <div className="grid grid-cols-1 gap-4 pt-7 md:grid-cols-2 lg:px-[3%] 3xl:pt-[50px]">
              {businessBenifits2}
            </div>
          </div>
        </section>
    </>
  );
};

export default withAuth(Benefits);
