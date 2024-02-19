"use client";
import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import $ from 'jquery';
import { Typewriter } from 'react-simple-typewriter';
import { useRouter } from "next/router";

import QuickBuildButtonImg from "../../public/assets/images/svg/QuickBuild-button.svg";
import web3img from "/public/assets/images/web3logo.png";
import web3imgcenter from "/public/assets/images/web3logo-white.png";
import machinehand from "/public/assets/images/machine-hand.png";
import laptophand from "/public/assets/images/laptop-hand.png";
import graphhand from "/public/assets/images/graph-hand.png";
import mobilehand from "/public/assets/images/mobile-hand.png";
import learnhand from "/public/assets/images/learn-hand.png";
import scalehand from "/public/assets/images/scale-hand.png";

import appBuilder from "/public/assets/images/app-builder.png";
import b2b from "/public/assets/images/b2b.webp";
import cryptoRamp from "/public/assets/images/crypto-ramp.webp";
import learn from "/public/assets/images/learn.webp";
import marketplace from "/public/assets/images/marketplace.png";
import priority from "/public/assets/images/priority.webp";
import quickBuild from "/public/assets/images/quickbuild.webp";
import react from "/public/assets/images/react.png";
import review from "/public/assets/images/review.webp";
import lock from "/public/assets/images/lock.webp";

import wallet from "/public/assets/images/wallet1.png";
import exchange from "/public/assets/images/exchange.png";
import web3site from "/public/assets/images/web3site.png";
import web3hosting from "/public/assets/images/web3hosting.png";
import noticed from "/public/assets/images/noticed.png";
import web3domain from "/public/assets/images/web3domain.png";
import cart from "/public/assets/images/cart.png";
import account from "/public/assets/images/account.png";
import user_group from "/public/assets/images/user_group.png";
import sign from "/public/assets/images/sign.png";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { reactIcons } from "components/utils/icons";
import MetadataHelper from "components/MetadataHelper";
import { useAPI } from "hooks/useAPI";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ContactUs from "components/ContactUs";
import Modal from "react-modal";
import { AiFillCreditCard } from "react-icons/ai";
import { message } from "antd";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "components/MintDomainPage/CheckoutForm";
import CheckoutModal from "components/Modal/Modal";
import useWallet from "hooks/useWallet";
import PricingModal from "components/PricingCheckout/PricingModal";

const text = ["1Site Walkthrough", "Web3sites Built With 1Site"];
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "linear-gradient( 90deg, #2e42ae 0%, #616fbe 100%)",
    border: "none",
    borderRadius: "10px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};
const stripePromise = loadStripe(
  "pk_live_51LSVhfAswBVxtdxYiaRBmCgiI8jo57urJaTL0YW57TrUqwRDFv09QRcQEOrxFKEgvCgsXMkAW1pJRfyikKtpxqUg00Jfdw3osx"
);
// const stripePromise = loadStripe(
//   "pk_test_51MQgfrGX5sKslpYYsLQiJOJC1q1FNHWKED1sGCofJ6HXISIFZoKbjcK4RegsWJrt1cdTExe6L4d8Hw1KfebB6H0A00KI6PzOwj"
// );

const NewHome = () => {

  const router = useRouter();
  
  const market = () => {
    router.push("/marketplace");
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [pricingValue, setPricingValue] = useState("");
  const [packageName, setPackageName] = useState("");
  const featuredTLDsRef = useRef(null);
  const { api } = useAPI();
  const [clientSecret, setClientSecret] = useState("");
  const [fullHtml, setFullHtml] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");
  const [paymentInfo, setPaymentInfo] = useState({});
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [tokenData, setTokenData] = useState(null);
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  const { handleGenericLoadingOp } = useWallet();
  
  function openModal(content) {
    setModalIsOpen(true);
    setModalContent(content);
  }
  function closeModal() {
    setModalIsOpen(false);
    setShowErrorMessage(false);
    setModalContent("");
    setPricingValue("");
  }
  const handleSelectChange = (e, type) => {
    const value = parseInt(e.target.value);
    setPricingValue(value);
    setPackageName(type);
  };

  // getting email from local storage
  useEffect(() => {
    const item = localStorage.getItem("email");
    setTokenData(item);
  });
  async function payWithCard() {
    if (pricingValue === "") {
      setShowErrorMessage(true);
    } else {
      setShowErrorMessage(false);
    }
    const { clientSecret } = await api.stripePayment({
      amount: pricingValue * 100,
    });
    setModalIsOpen(false);
    setClientSecret(clientSecret);
  }
  const finishCheckout = async ({ ipfsHash, fullHtml, paymentInfo }) => {
    setIpfsHash(ipfsHash);
    setFullHtml(fullHtml);
    setPaymentInfo(paymentInfo);
  };

  async function onCardFinish(paymentId) {
    const paymentInfo = {
      total: pricingValue,
      id: paymentId,
    };
    setClientSecret(null);
    const finshData = await finishCheckout({ ipfsHash, fullHtml, paymentInfo });
    message.success("Payment Success");
    setPricingValue("");
    let data = {
      paymentId,
      email: tokenData,
      packageName: modalContent,
      packageType: packageName,
      amount: pricingValue,
    };
    try{
      const response = await api.createSubscriptionPlan({
        ...data,
      });
    }
    catch(error) {
      console.log('Error', error);
    }
  }

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
      heading: "Fully experience Web3 with 1Site.",
      para: "Access 1Site Decentralized Hosting. Create your very own  Web3site.",
      btn: "Learn about 1Site",
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
      heading: "1Site V2",
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
      heading: "1Site D’App Builder",
      para: "....",
      btn: "1Site D’app Builder",
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
      heading: "1Site + IPFS Hosting",
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
      heading: "1Site V2",
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
      heading: "1Site D’App Builder",
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
      para: "1Site V1 Access",
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

  const checklist5 = [
    {
      para: "Business to Business Solutions",
    },
    {
      para: "Priority Support",
    },
    {
      para: "Tokenization and Launch Services",
    },
    {
      para: "Free 1Site Website",
    },
    {
      para: "Business Tools",
    },
    {
      para: "15% off Blockchain Council Courses",
    },
    {
      para: "Team Consultation",
    },
  ];
  return (
    <>
            <MetadataHelper
        title="Web3 Onboarding"
        description="Web3 onboarding is the premiere platform for people and businesses to onboard web3 and the metaverse safely. Buy crypto, get a wallet, web3 domain, web3site, or launch your web3 project's token with efficiency and confidence!"
        canonical="https://web3onboarding.com"
      />
      {/* Checkout modal */}
      <CheckoutModal
        isOpen={clientSecret}
        contentLabel="Stripe checkout"
        customContentStyles={{ backgroundColor: "white" }}
        onRequestClose={() => {}}
      >
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm
              price={pricingValue * 100}
              redirectUrl="https://web3onboarding.com/marketplace/mint"
              onSuccess={onCardFinish}
            />
          </Elements>
        )}
      </CheckoutModal>

      {/* select plan modal */}
      {modalIsOpen && (
        <PricingModal
          isOpen={modalIsOpen}
          closeModal={closeModal}
          handleSelectChange={handleSelectChange}
          payWithCard={payWithCard}
          modalContent={modalContent}
          selectedOption={pricingValue}
          showErrorMessage={showErrorMessage}
        />
      )}
      <section id="personal" className="panel bg-image4 section-center flex-center scroll-span-align min-h-screen">
       <div className="container max-w-[1200px] -mt-0 lg:-mt-5">
          <h1 className="heading-2 text-center text-white -mt-0 lg:-mt-5">
          Step Into <span className="text-blue-400">Web3</span> With <span className="text-blue-300 drop-shadow-md">Web3 Onboarding</span>
          </h1><br/>
          <p className="text-white text-center">New to Web3? Experienced User? We're Here for you.</p><br/>
          <p className="text-white font-bold text-center">Take The 6 Steps to Web3.</p>

          <div className="grid md:grid-cols-4 md:grid-rows-2 mt-5 gap-9">

            <div className="md:row-span-3 bg-primary-newBgColor/90 p-5 rounded-3xl flex w-[60%] lg:w-[100%] flex-col h-[95%] lg:h-[65%] overflow-hidden mx-auto">
              <Link
                href={"/web3/getting-wallet"}>
                <h3 className="text-left text-18 font-semibold text-white lg:text-24 hidden lg:block">
                  1.
                </h3>
                <div className="h-[30%]  w-[50%] lg:w-[60%] mx-auto">
                  <Image
                    src={wallet}
                  />
                </div>
                <br/>
                <div className="text-18 font-semibold text-blue-500 lg:text-24 text-center mt-4 lg:pt-4">
                  <h3>
                  Get Wallet
                  </h3>
                </div>
              </Link>
            </div>

            <Link
              className="md:row-span-3 md:col-start-1 md:row-start-4 bg-primary-newBgColor/90 p-5 rounded-3xl flex w-[60%] lg:w-[100%] flex-col h-[75%] lg:h-[90%] overflow-hidden mx-auto lg:-mt-20 -mt-0"
              href={"/web3/web3site"}>
              <h3 className="text-left text-18 font-semibold text-white lg:text-24 hidden lg:block">
                4.
              </h3>
              <div className="h-[40%]  w-[50%] lg:w-[50%] mx-auto">
                <Image
                  src={web3site}
                />
              </div>
              <br/>
                <h3 className="text-18 font-semibold text-violet-400 lg:text-24 text-center p-5 mt-0 lg:pt-5">
                Get Web3site
                </h3>
            </Link>

            <Link
              className="md:row-span-3 md:col-start-2 md:row-start-1 bg-primary-newBgColor/90 p-5 py-4 rounded-3xl flex w-[60%] lg:w-[100%] flex-col h-[150px] lg:h-[65%] overflow-hidden mx-auto -mt-10 lg:-mt-0"
              href={"/web3/purchase-crypto"}>
              <h3 className="text-left text-18 font-semibold text-white lg:text-24 hidden lg:block">
                2.
              </h3>
              <div className="h-[30%]  w-[50%] lg:w-[50%] mx-auto">
                <Image
                  src={exchange}
                />
              </div>
              <br/>
                <h3 className="text-18 font-semibold text-violet-400 lg:text-24 text-center mt-10 lg:pt-8 lg:mt-3">
                Get Crypto
                </h3>
            </Link>
            
            <Link
              className="md:row-span-3 md:col-start-2 md:row-start-4 bg-primary-newBgColor/90 p-5 py-4 rounded-3xl flex w-[60%] lg:w-[100%] flex-col h-[145px] lg:h-[90%] overflow-hidden mx-auto -mt-0 lg:-mt-20"
              href={"/web3/ipfs-hosting"}>
              <h3 className="text-left text-18 font-semibold text-white lg:text-24 hidden lg:block">
                5.
              </h3>
              <div className="h-[40%]  w-[50%] lg:w-[50%] mx-auto">
                <Image
                  src={web3hosting}
                />
              </div>
              <br/>
                <h3 className="text-18 font-semibold text-blue-500 lg:text-24 text-center p-5 justify-between mt-2 lg:pt-4">
                Web3Hosting
                </h3>
            </Link>

            <Link
              className="md:row-span-3 md:col-start-3 md:row-start-1 bg-primary-newBgColor/90 p-5 py-4 rounded-3xl flex w-[60%] lg:w-[100%] flex-col h-[145px] lg:h-[65%] overflow-hidden mx-auto -mt-18 lg:-mt-0"
              href={"/web3/web3-domains"}>
              <h3 className="text-left text-18 font-semibold text-white lg:text-24 hidden lg:block">
                3.
              </h3>
              <div className="h-[30%]  w-[50%] lg:w-[50%] mx-auto">
                <Image
                  src={web3domain}
                />
              </div>
              <br/>
                <h3 className="text-18 font-semibold text-blue-500 lg:text-24 text-center pt-5 justify-between mt-5 lg:mt-6">
                Web3 Domain
                </h3>
            </Link>

            <Link
              className="md:row-span-3 md:col-start-3 md:row-start-4 bg-primary-newBgColor/90 p-5 py-4 rounded-3xl flex w-[60%] lg:w-[100%] flex-col h-[145px] lg:h-[90%] overflow-hidden mx-auto -mt-0 lg:-mt-20"
              href={"/contact"}>
              <h3 className="text-left text-18 font-semibold text-white lg:text-24 hidden lg:block">
                6.
              </h3>
              <div className="h-[30%]  w-[50%] lg:w-[50%] mx-auto">
                <Image
                  src={noticed}
                />
              </div>
              <br/>
                <h3 className="text-18 font-semibold text-violet-400 lg:text-24 text-center pt-5 justify-between mt-5 lg:pt-5">
                Get Noticed!
                </h3>
            </Link>

            <Link
              className="md:row-span-2 md:col-start-4 md:row-start-1 bg-primary-newBgColor/90 p-5 rounded-3xl flex-col overflow-hidden lg:w-[100%] w-[60%] mx-auto h-[145px] lg:h-[70%] -mt-15 lg:-mt-0"
              href={"/marketplace"}>
              <h3 className="text-15 font-semibold text-white lg:text-20 text-center">
               Marketplace
              </h3>
              <div className="h-[30%] w-[70%] lg:h-[20%] lg:w-[100%] mx-auto -mt-0 lg:-mt-10">
                <Image
                  src={cart}
                />
              </div>
            </Link>

            <Link
              className="md:row-span-2 md:col-start-4 md:row-start-3 bg-primary-newBgColor/90 p-5 py-4 rounded-3xl flex flex-col overflow-hidden lg:w-[100%] w-[60%] mx-auto h-[145px] lg:h-[95%] mt-0 lg:-mt-20"
              href={"/home#pricing"}>
              <h3 className="text-15 font-semibold text-white lg:text-20 text-center">
                Paid Memberships
              </h3>
              <h3 className="text-15 font-semibold text-white lg:text-20 text-center">
                and Consultations
              </h3>
              <div className="h-[30%]  w-[70%] lg:h-[10%] lg:w-[100%] mx-auto -mt-0 lg:-mt-10">
                <Image
                  src={account}
                />
              </div>
            </Link>

            <Link
              className="md:row-span-2 md:col-start-4 md:row-start-5 bg-primary-newBgColor/90 p-5 py-4 rounded-3xl flex flex-col overflow-hidden lg:w-[100%] w-[60%] mx-auto h-[145px] lg:h-[100%] -mt-0 lg:-mt-20"
              href={"https://1site.tapfiliate.com"} target="_blank">
              <h3 className="text-center text-15 font-semibold text-white lg:text-20">
                Become an Affiliate
              </h3>
              <div className="h-[10%]  w-[80%] lg:h-[10%] lg:w-[100%] mx-auto -mt-2 lg:-mt-10">
                <Image
                  src={user_group}
                />
              </div>
            </Link>
         </div>
        </div>
      </section>

  <section id="" className="panel bg-image3 section-center flex-center scroll-span-align h-screen">
        
        <div className="container max-w-[1200px] -mt-10 lg:mt-0">
              <h1 className="heading-4 text-center text-white text-3xl lg:text-5xl">
                  No Coding experience? <span className="text-blue-500">1Site</span><span className="text-white-500"> Is here for you</span>
            </h1>
              <div className="text-20 lg:text-20 mx-auto text-center p-5">Get Paid to Grow Web3 as an Affiliate!</div>
            <div
              className="h-[calc(100%-81px)] overflow-auto p-5"
              id="scrrolledDiv">
                    <span className="text-12 lg:text-26 flex lg:gap-60 justify-center gap-5 font-semibold " >
                        {text.map((img, index) => (
                    <div key={index}>{img}</div>))}
                </span>
              
              <div className="m-auto">
                <div className="flex md:grid-cols-2 mx-auto justify-center mt-2 px-8 h-[100px] lg:h-[300px] gap-0 lg:gap-5">
                <video
                  className=" rounded-3xl border-white border-4"
                  autoPlay
                  loop
                  // controls
                  muted
                  src="/assets/images/builder1.mp4"
                  >
                </video>
                
                <video
                  className="rounded-3xl border-white border-4"
                  autoPlay
                  loop
                  // controls
                  muted
                  src="/assets/images/guide.mp4"
                  >
                  </video>
                  
                </div>
                <div className="flex justify-center gap-0 lg:gap-20 px-10 mt-5 px-5">
                      <a href="/1site/1site" className="lg:px-10 lg:py-5 p-2 w-[90px] lg:w-[250px] h-[50px] lg:h-[60px] text-center rounded-full text-xs text-white lg:text-15 bg-black hover:text-white hover:opacity-50 border-b-2">
                        TRY 1SITE FOR FREE
                      </a>
                      <a href="/affiliate" className="lg:px-10 lg:py-5 p-3 w-[90px] lg:w-[250px] w-[250px] h-[50px] lg:h-[60px] text-center rounded-full text-xs text-black lg:text-15 bg-white hover:text-gray hover:opacity-50 border-b-2 border-black">
                        WE BUILD
                      </a>
                  <Link
                    className="lg:px-10 lg:py-5 p-2 w-[90px] lg:w-[250px] h-[50px] lg:h-[60px] text-center rounded-full text-xs text-white lg:text-15 bg-black hover:text-white hover:opacity-50 border-b-2"
                    rel="noreferrer"
                    href={'/affiliate'}
                  >
                    Become an Affiliate!
                  </Link>
                </div>
                {/* <div className="flex justify-center gap-20 px-10 mt-5">
                  <Link href={'/ipfs'} className="flex mt-5 hidden lg:flex w-[140px] justify-center bg-white py-2 px-3 text-black hover:text-black rounded-3xl border border-black">IPFS Hosting</Link>
                </div> */}
                
              </div>
            </div>

        {/* <div className="m-auto my-6 ">
                <video
                  className="m-auto h-[400px] w-[500%]"
                  autoPlay
                  loop
                  // controls
                  muted
                  src="/assets/images/builder.mp4"
            ></video>
          </div>

          <div className="m-auto mt-6 flex w-[80%] items-center justify-center gap-2 md:gap-16">
          <a href="/site/site" className="px-10 py-5 w-[250px] md:w-[250px] h-[90px] md:h-[60px] text-center rounded-full text-14 text-white lg:text-15 bg-black hover:text-white hover:opacity-50 border-b-2">
                        TRY 1SITE FOR FREE
            </a>
            <a href="/affiliate" className="w-[250px] text-center rounded-full px-10 py-5 text-14 text-black lg:text-15 bg-white hover:text-gray hover:opacity-50 border-b-2 border-black">
            Become an Affiliate!
                      </a>
          </div> */}
          
        </div>
      </section>
      
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
                      href="/register"
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
                     onClick={() => openModal("personal")}
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
                      onClick={() => openModal("business")}
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
                      $12000.00 flat rate
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
                      onClick={() => openModal("ultimate")}
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
{/* BENIFITS */}
  <section
          id="benefit"
          className="panel bg-image3 section-center flex-center scroll-span-align min-h-screen"
        >
          <div className="container max-w-[1200px]">
            <h2 className="heading-1 text-center text-white text-5xl">
              Membership <br /> Benefits
            </h2>
            <div className="grid grid-cols-1 gap-5 pt-5 lg:grid-cols-3 lg:gap-3">
              <div className="col-span-1 flex flex-col gap-5">
                <div className="flex items-center gap-2">
                  <div className="flex-1 text-end">
                    <h4 className="font-semibold uppercase text-white ">
                      consultancy
                    </h4>
                    <p className="pt-2 text-slate-200 ">
                      We figure out exactly what your goals are and our team of
                      professional ensure you accomplish them through detailed
                      workshops and creating a thought out execution plan that
                      suits you best.
                    </p>
                  </div>
                  <Image
                    width={100}
                    height={100}
                    className="max-w-[90px]"
                    src={machinehand}
                    alt=""
                  />
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 text-end">
                    <h4 className="font-semibold uppercase text-white">
                      marketing tactics
                    </h4>
                    <p className="pt-2 text-slate-200 ">
                      We provide various platforms as an opportunity for you to
                      spotlights your product/business. We also have
                      representatives help establish a brand kit & marketing
                      strategies
                    </p>
                  </div>
                  <Image
                    width={100}
                    height={100}
                    className="max-w-[90px]"
                    src={laptophand}
                    alt=""
                  />
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 text-end">
                    <h4 className="font-semibold uppercase text-white">
                      advanced products
                    </h4>
                    <p className="pt-2 text-slate-200 ">
                      Priority Support, 1Site D'app Builder, IPFS hosting
                      for HTML, React & D'app. Business to Business Solutions
                    </p>
                  </div>
                  <Image
                    width={100}
                    height={100}
                    className="max-w-[90px]"
                    src={graphhand}
                    alt=""
                  />
                </div>
              </div>
              <div className="flex-center col-span-1">
                <div className="">
                  <Image
                    src={web3imgcenter}
                    alt=""
                    width={500}
                    height={500}
                    className="mx-auto w-full max-w-[150px] lg:max-w-[300px]"
                  ></Image>
                  <p className="pt-2 text-center font-semibold uppercase text-white lg:pt-10">
                    + more coming soon
                  </p>
                  <div className="flex-center">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={"https://zcal.co/web3onboarding"}
                      className="mx-auto mt-3 rounded-full bg-white py-4 px-8 text-14 text-black lg:mt-10 lg:text-22"
                    >
                      Schedule a Call
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-span-1 flex flex-col gap-5">
                <div className="flex items-center gap-2">
                  <Image
                    width={100}
                    height={100}
                    className="max-w-[90px]"
                    src={mobilehand}
                    alt=""
                  />
                  <div className="flex-1 ">
                    <h4 className="font-semibold uppercase text-white">
                      support and guidance
                    </h4>
                    <p className="pt-2 text-slate-200">
                      {/* We figure out exactly what your goals are and our team of
                      professional ensure you accomplish them through detailed
                      workshops and creating a thought out execution plan that
                      suits you best. */}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    width={100}
                    height={100}
                    className="max-w-[90px]"
                    src={learnhand}
                    alt=""
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold uppercase text-white">
                      learn & experience
                    </h4>
                    <p className="pt-2 text-slate-200">
                      we host Twitter (X) spaces, products, and share tutorials.
                      As a member, be eligible to post your own content for
                      users to experience! <br /> Learn to Earn coming soon
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    width={100}
                    height={100}
                    className="max-w-[90px]"
                    src={scalehand}
                    alt=""
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold uppercase text-white">
                      scale your business (b2b)
                    </h4>
                    <p className="pt-2 text-slate-200">
                      Utilize our trusted, amazing connections in Continuum to
                      find synergies and partnerships for businesses in Web3!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>
  
   {/* contact form  */}
   <section className="panel bg-image3 section-center flex-center scroll-span-align min-h-screen">
          <div className="container max-w-[1200px]">
            <div className="flex flex-col gap-14  md:flex-row">
              <div className=" lg:max-w-[400px]">
                <div className=" overflow-hidden rounded-xl border-2 border-white p-1">
                  <div className="flex h-full flex-col justify-between overflow-hidden rounded-xl bg-primary-newBgColor2/80 py-2 px-4  lg:py-6">
                    <div className="">
                      <h4 className="lg:heading-6 text-center text-18 font-semibold text-white">
                        Schedule a Call.
                    </h4>
                    <Image
                    src={sign}
                    alt=""
                    className="mx-auto w-full max-w-[100px] lg:max-w-[100px] mt-5"
                  ></Image>
                      <p className="pt-4 text-center font-semibold text-white">
                        Unlock our Membership Benefits.
                      </p>
                    </div>
                    <div className="space-y-3 py-10">
                      {checklist5.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-center gap-2 text-white md:justify-start"
                        >
                          <span>{reactIcons.check}</span>
                          <p>{item.para}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mx-auto w-full max-w-[280px]">
                      <a
                        href={"https://zcal.co/web3onboarding"}
                        className="flex-center mx-auto items-center rounded-full border border-black bg-white px-5 py-3 text-14 text-black lg:text-20"
                      >
                        {" "}
                        Schedule a Call
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <h4 className="heading-6 text-center font-semibold text-white">
                  Contact us.
                </h4>
                <ContactUs />
              </div>
            </div>
          </div>
      </section>
      
    </>
  );
};

// export default NewHome;
export default NewHome;
