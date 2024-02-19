import Image from "next/image";
import React, { useState } from "react";
import purchansing1 from "/public/assets/images/crypto2.png";
import purchansing2 from "/public/assets/images/crypto1.png";
import purchansing3 from "/public/assets/images/crypto3.png";
import exchange from "/public/assets/images/exchange.png";
import bitcoin from "/public/assets/images/bitcoin.png";
import ethereum  from "/public/assets/images/ethereum.webp";

import blank from "/public/assets/images/blank.png";
import { reactIcons } from "components/utils/icons";
import { Collapse } from "@mui/material";
import Link from "next/link";
import { useTransak } from "hooks/useTransak";
import MetadataHelper from "components/MetadataHelper";
import arrow_down from '/public/assets/images/arrow_down.png';

const purchansingCrypto = () => {
  const images = [purchansing1, purchansing2, purchansing3];
  const imagess = [exchange];
  const { transak } = useTransak();
  const [questions, setQuestions] = useState([
    {//buy-crypto
      id: 0, question: <>
      <div className="flex flex-col justify-center rounded-lg lg:rounded-3xl mx-auto gap-1 lg:min-h-[100px]">
           <div className="flex cursor-pointer justify-between items-center w-full">
               <div className="flex-1 lg:flex-center">
                   <h3 className='font-semibold text-14 sm:text-20 lg:text-[35px] text-start lg:text-center'>Crypto Currency<br/>General Information</h3>
               </div>
           </div>
           <div className="mx-auto">
               <Image className='max-w-[80px] lg:max-w-[130px]' src={arrow_down} />
           </div>
       </div>
        </>, isOpen: false, answer:
        <div>
          <h3 className="font-bold text-20 lg:text-[30px] text-sky-400/100 text-center">What is Crypto Currency?</h3>
          <div className="text-15 text-center">
          
          Cryptocurrency is a form of digital or virtual currency that uses cryptography for security. It's decentralized, meaning it's not controlled by any central authority like a government or a bank. Instead, cryptocurrencies rely on a technology called blockchain to operate.
          
          </div>
          <h3 className="font-bold text-20 lg:text-[30px] text-sky-400/100 text-center">Why do I Need Crypto Currency?</h3>
          <div className="text-15 text-center">
          In Web3, cryptocurrencies serve as the digital assets that power the ecosystem. They enable you to access decentralized applications, trade digital assets, and participate in various blockchain-based services. While you don't necessarily need cryptocurrency for all online activities, it's crucial within the Web3 framework to fully engage in its decentralized and blockchain-powered services
          </div>
          <div className="text-20 text-center font-bold underline underline-offset-1 mt-5 hover:text-white hover:opacity-60">
              <a href="/whatisweb3">More Info</a>
              </div>
        </div>
  },
  ]);
  const [lastClickedElement, setLastClickedElement] = useState(false);
  const toggleQuestion = (id, e) => {
    setQuestions(
      questions.map((item) =>
        id === item.id
          ? { ...item, isOpen: !item.isOpen }
          : { ...item, isOpen: false }
      )
    );
    setLastClickedElement(e.currentTarget);
  };
  const handleTransitionEnd = () => {
    if (lastClickedElement != false) {
      lastClickedElement.scrollIntoView(true, { behavior: "instant" });
      setLastClickedElement(false);
    }
  };
  return (
    <>
    <MetadataHelper noindex title="Get Crypto" />
    <div className="bg-image4 flex-center section-center min-h-screen">
      <div className="container grid max-w-[1200px] grid-cols-1 items-center gap-4 lg:grid-cols-2">
        <div className="col-span-1">
          <div className="mx-auto max-w-[500px]">
            <h2 className="text-center text-24 font-semibold text-white lg:text-[40px]">
              2. Get Crypto
            </h2>
            <div className="flex-center mt-3 min-h-[310px] overflow-hidden rounded-xl border-2 border-white bg-primary-newBgColor2/40 p-4 text-center text-18  text-white lg:text-20 text-justify">
              Cryptocurrency, at its core, is a form of digital or virtual
              currency that relies on cryptographic techniques to secure
              transactions, regulate the creation of new units, and verify the
              transfer of assets. Unlike traditional currencies issued by
              governments and central banks, cryptocurrencies operate on a
              decentralized platform, typically a technology called blockchain.
            </div>
            <div className="flex items-center justify-between pt-2 mx-auto">
              {images.map((img, index) => (
                <Image
                  key={index}
                  className='max-w-[200px] lg:max-w-[200px] lg:h-[200px] h-[150px] -ml-10 lg:-ml-10' src={img}
                />
              ))}
            </div>
          </div>
          </div>
          
        <div className="col-span-1 space-y-3 text-white">
          {questions.map((item) => (
            <div
              key={item.id}
              onClick={(e) => toggleQuestion(item.id, e)}
              className="mx-auto flex max-w-[550px] flex-col justify-center gap-1 rounded-lg border-2 border-white bg-primary-newBgColor2/40 p-3 lg:min-h-[100px] lg:rounded-3xl">
              <div className="flex w-full cursor-pointer items-center justify-between">
                <div className="lg:flex-center flex-1">
                  <h3 className="text-start text-14 font-semibold sm:text-20 lg:text-center lg:text-24">
                    {item.question}
                  </h3>
                </div>
                {/* <span className="text-20 lg:text-26">
                  {item.isOpen ? reactIcons.minus : reactIcons.plus}
                </span> */}
              </div>
              <Collapse
                in={item.isOpen}
                className=""
                onTransitionEnd={handleTransitionEnd}
              >
                <div className="text-base font-normal lg:pt-2 lg:pl-4 [&_li]:mb-2 [&_li]:text-14 [&_li]:text-white/80 [&_p]:mb-2 [&_p]:text-14 [&_p]:text-white/80 [&_strong]:text-white">
                  {item.answer}
                </div>
              </Collapse>
              
            </div>
          ))}
            <div className="flex flex-col justify-center p-3 rounded-lg lg:rounded-3xl mx-auto gap-1 border-2 border-white bg-primary-newBgColor2/40 lg:min-h-[100px]">
            <h2 className='text-24 lg:text-[40px] text-center font-semibold text-white'>Get Crypto</h2>
                                    <div className="flex items-center justify-between px-5 p-y2 gap-5">
                                        <Link className="flex items-center"  href={"/buy-crypto"}>
                                            <Image className='max-w-[80px] lg:max-w-[110px]' src={bitcoin} />
                                        </Link>
                                        <Link className="flex items-center" href={"/buy-crypto"}>
                                            <Image className='max-w-[80px] lg:max-w-[110px]' src={exchange} />
                                        </Link>
                                        <Link className="flex items-center" href={"/buy-crypto"}>
                                            <Image className='max-w-[80px] lg:max-w-[110px]' src={ethereum} />
                                        </Link>
                                    </div>
                        </div>
                        <div className="flex flex-col justify-center p-3 rounded-lg lg:rounded-3xl mx-auto gap-1 border-2 border-white bg-primary-newBgColor2/40 lg:min-h-[100px]">
                            <div className="flex cursor-pointer justify-between items-center w-full">
                                <div className="flex-1 lg:flex-center">
                                <a className='font-bold text-14 lg:text-[30px] sm:text-20 lg:text-24 text-start lg:text-center p-10'  href="/web3/web3-domains">I have crypto. Now what?</a>
                                </div>
                            </div>
                        </div>
          </div>
                    {/* <div className="md:col-span-1 space-y-3 text-white">
                        <div className="flex flex-col justify-center p-3 rounded-lg lg:rounded-3xl mx-auto gap-1 border border-white bg-primary-newBgColor2/40 lg:min-h-[100px]">
                            <div className="flex cursor-pointer justify-between items-center w-full">
                                <div className="flex-1 lg:flex-center">
                                    <h3 className='font-semibold text-14 sm:text-20 lg:text-24 text-start lg:text-center p-10'>Crypto Currency General <br/> Information</h3>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center p-3 rounded-lg lg:rounded-3xl mx-auto gap-1 border border-white bg-primary-newBgColor2/40 lg:min-h-[100px]">
                                    <div className="flex items-center justify-between pt-2 gap-8">
                                        <Link className="flex items-center"  href={"/buy-crypto"}>
                                            <Image className='max-w-[90px] lg:max-w-[130px]' src={bitcoin} />
                                        </Link>
                                        <Link className="flex items-center" href={"/buy-crypto"}>
                                            <Image className='max-w-[80px] lg:max-w-[200px]' src={exchange} />
                                        </Link>
                                        <Link className="flex items-center" href={"/buy-crypto"}>
                                            <Image className='max-w-[80px] lg:max-w-[130px]' src={ethereum} />
                                        </Link>
                                    </div>
                        </div>
                        <div className="flex flex-col justify-center p-3 rounded-lg lg:rounded-3xl mx-auto gap-1 border border-white bg-primary-newBgColor2/40 lg:min-h-[100px]">
                            <div className="flex cursor-pointer justify-between items-center w-full">
                                <div className="flex-1 lg:flex-center">
                                <a className='font-semibold text-14 sm:text-20 lg:text-24 text-start lg:text-center p-10'  href="/web3/web3-domains">I have crypto. Now what?</a>
                                </div>
                            </div>
                        </div>
                    </div> */}
          
      </div>
    </div>
    </>
  );
};

export default purchansingCrypto;
