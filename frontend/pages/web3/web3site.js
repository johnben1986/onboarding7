import Image from "next/image";
import React, { useState } from "react";
import purchansing1 from '/public/assets/images/web3hosting.png'
import purchansing2 from '/public/assets/images/web3domain.png'
import purchansing3 from '/public/assets/images/web3site.png'
import exchange from "/public/assets/images/exchange.png";
import decentrasite from "/public/assets/images/1site.png";
import quickbuild from '/public/assets/images/web3png.png'
import { reactIcons } from "components/utils/icons";
import arrow_down from '/public/assets/images/arrow_down.png';
import { Collapse } from "@mui/material";
import Link from "next/link";
import { useTransak } from "hooks/useTransak";
import MetadataHelper from "components/MetadataHelper";

const Web3site = () => {
  const images = [purchansing1, purchansing2, purchansing3];
  const imagess = [exchange];
  const { transak } = useTransak();
  const [questions, setQuestions] = useState([
 {//buy-crypto
  id: 0, question: <>
  <div className="flex flex-col justify-center rounded-lg lg:rounded-3xl mx-auto gap-1 lg:min-h-[100px]">
       <div className="flex cursor-pointer justify-between items-center w-full">
           <div className="flex-1 lg:flex-center">
               <h3 className='font-semibold text-14 sm:text-20 lg:text-[35px] text-start lg:text-center'>1Site<br/>General Information</h3>
           </div>
       </div>
       <div className="mx-auto">
           <Image className='max-w-[80px] lg:max-w-[130px]' src={arrow_down} />
       </div>
   </div>
    </>, isOpen: false, answer:
    <div>
      <h3 className="font-bold text-20 lg:text-[30px] text-sky-400/100 text-center">What is 1Site?</h3>
      <div className="text-15 text-center">
      1Site is a platform that allows users to easily create and host decentralized websites on the Web3 ecosystem.
1Site can integrate with Web3 domain systems, allowing users to associate their Web3 domains with the websites they create.
This simplifies website addressing and access within the Web3 ecosystem. 1Site uses IPFS decentralized hosting solutions .
 This means that the website's content is distributed across a network of nodes,This makes it very hard to shut down or control
      </div>
      <h3 className="font-bold text-20 lg:text-[30px] text-sky-400/100 text-center">Why do I Need a 1Site?</h3>
      <div className="text-15 text-center">
      1Site plays a vital role in the Web3 ecosystem by providing an accessible platform for creating and hosting decentralized websites. Its affiliate program incentivizes user participation and growth, which, in turn, contributes to the expansion and adoption of Web3 technologies and the decentralized internet. Get Paid to Grow Web3!
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
    <MetadataHelper noindex title="Get Website" />
    <div className="bg-image4 flex-center section-center min-h-screen">
      <div className="container grid max-w-[1200px] grid-cols-1 items-center gap-4 lg:grid-cols-2">
        <div className="col-span-1">
          <div className="mx-auto max-w-[500px]">
            <h2 className="text-center text-24 font-semibold text-white lg:text-[40px]">
              4. Get 1Site
            </h2>
            <div className="mt-3 min-h-[310px] flex-center border-2 border-white text-center rounded-xl overflow-hidden p-4 text-18 lg:text-20  bg-primary-newBgColor2/40 text-white">
            At its essence, Websites are what the internet is made of.<br/>  <br/>  

Simply put,<br/>“No Websites, No Internet” More<br/> Web3sites, More Web3”<br/><br/>

Unlike traditional websites that rely on centralized servers, databases, and authorities, Web3 sites function on a decentralized network, primarily supported by blockchain technology. 
            </div>
                <div className="flex items-center object-center">
                  <Image
                    src={decentrasite}
                    className="h-[200px] lg:max-w-[70%] mt-5 mx-auto"
                  />
              </div>
            </div>
          </div>
          
        <div className="col-span-1 space-y-3 text-white">
          {questions.map((item) => (
            <div
              key={item.id}
              onClick={(e) => toggleQuestion(item.id, e)}
              className="mx-auto flex max-w-[550px] flex-col justify-center gap-1 rounded-lg border-2 border-white bg-primary-newBgColor2/40 p-3 lg:min-h-[100px] lg:rounded-3xl"
            >
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
                    <div className="md:col-span-1 space-y-3 text-white">
            <div className="flex flex-col justify-center p-3 rounded-lg lg:rounded-3xl mx-auto gap-1 border-2 border-white bg-primary-newBgColor2/40 lg:min-h-[100px] ">
            <h3 className='font-semibold text-3xl lg:text-4xl lg:text-center p-5 mx-auto'>Get a 1Site!   </h3>
                            <div className="flex cursor-pointer justify-between items-center w-full">
                                <div className="flex items-center justify-between mx-auto">

                                    <div className="flex items-center justify-between pt-2 gap-8">
                                        <Link className="flex items-center" href={"/1site"}>
                                            <Image className='max-w-[150px] lg:max-w-[250px]' src={decentrasite} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="flex flex-col justify-center p-3 rounded-lg lg:rounded-3xl mx-auto gap-1 border-2 border-white bg-primary-newBgColor2/40 lg:min-h-[100px]">
                            <div className="flex cursor-pointer justify-between items-center w-full">
                                <div className="flex-1 lg:flex-center">
                                <a className='font-bold text-14 lg:text-[30px] sm:text-20 lg:text-24 text-start lg:text-center p-5' href="/web3/ipfs-hosting">I have a 1Site. Now what?</a>
                                </div>
                            </div>
                        </div>
          </div>
        </div>         
      </div>
    </div>
    </>
  );
};

export default Web3site;
