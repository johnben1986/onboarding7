"use client";
import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";


import web3img from "/public/assets/images/whatisweb3.png";
import MetadataHelper from "components/MetadataHelper";
import Image from "next/image";

const whatisweb3 = () => {

  const router = useRouter();
  
  const market = () => {
    router.push("/marketplace");
  };


  return (
    <>
            <MetadataHelper
        title="What is Web3"
        description="Web3 onboarding is the premiere platform for people and businesses to onboard web3 and the metaverse safely. Buy crypto, get a wallet, web3 domain, web3site, or launch your web3 project's token with efficiency and confidence!"
        canonical="https://web3onboarding.com"
      />

      <section id="" className="panel bg-image3 section-center flex-center scroll-span-align pb-5">
        
        <div className="container max-w-[1000px] lg:mt-0">
            <div className="min-h-[210px] overflow-hidden rounded-xl border border-white bg-primary-newBgColor2/40 text-center text-18  text-white lg:text-20">
                <h1 className="text-3xl font-semibold mt-2">What is Web3?</h1>
                <p>Web3 is a decentralized internet where users own and control their data instead of big companies.</p>
                <p>It uses blockchain technology to make data secure and transparent,</p>
                <p>giving users more power over their online experiences.</p>
                <p>This shift towards decentralization brings several potential benefits:</p>

                <p className="text-blue-400">Enhanced Security</p>
                <p className="text-blue-400">Reduced Centralization</p>
                <p className="text-blue-400">Increased Transparency</p>
                <p className="text-blue-400">New Economic Opportunities</p>
            </div>

          <div className="m-auto mt-6 flex items-center justify-center gap-2 md:gap-16">
            <Image className='w-[900px] h-[150px] lg:w-[900px] lg:h-[350px]' src={web3img} />
          </div>
          
        </div>
      </section>
      {/* Web3 Topics */}
      {/* <section id="" className="panel bg-image3 section-center flex-center scroll-span-align pb-5">
        
        <div className="container max-w-[1000px] lg:mt-0">
            <div className="min-h-[210px] overflow-hidden rounded-xl border border-white bg-primary-newBgColor2/40 text-center text-18  text-white lg:text-20">
                <h1 className="text-3xl font-semibold mt-2">What is Web3?</h1>
                <p>Web3 is a decentralized internet where users own and control their data instead of big companies.</p>
                <p>It uses blockchain technology to make data secure and transparent,</p>
                <p>giving users more power over their online experiences.</p>
                <p>This shift towards decentralization brings several potential benefits:</p>

                <p className="text-blue-400">Enhanced Security</p>
                <p className="text-blue-400">Reduced Centralization</p>
                <p className="text-blue-400">Increased Transparency</p>
                <p className="text-blue-400">New Economic Opportunities</p>
            </div>

          <div className="m-auto mt-6 flex items-center justify-center gap-2 md:gap-16">
            <Image className='w-[900px] h-[150px] lg:w-[900px] lg:h-[350px]' src={web3img} />
          </div>
          
        </div>
      </section> */}
    </>
  );
};

// export default NewHome;
export default whatisweb3;
