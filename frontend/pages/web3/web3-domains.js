import Image from 'next/image'
import React, { useState } from 'react'
import purchansing4 from '/public/assets/images/web3hosting.png'
import purchansing2 from '/public/assets/images/web3domain.png'
import purchansing3 from '/public/assets/images/web3site.png'
import freename2 from '/public/assets/images/freename2.png'
import web3domain from "/public/assets/images/web3domain.png";
import metamask from '/public/assets/images/web3png.png'
import coinbase from '/public/assets/images/partners/unstoppable-domains.png'
import ledger from '/public/assets/images/freename.webp'
import domain from '/public/assets/images/domain.png'
import ano from '/public/assets/images/ano.png'
import unstopable from '/public/assets/images/unstopable.png'
import w3o from '/public/assets/images/w3o.png'
import arrow_down from '/public/assets/images/arrow_down.png';
import { reactIcons } from 'components/utils/icons'
import { Collapse } from '@mui/material'
import Link from 'next/link'
import MetadataHelper from 'components/MetadataHelper'

                            {/* {imagess.map((img, index) => (
                                <Image key={index} className='max-w-[100px] lg:max-w-[130px]' src={img} width={300} height={300} />))} */}

const Web3Domains = () => {
    const images = [domain, purchansing3];
    const imagess = [coinbase, ledger];
    const [questions, setQuestions] = useState([
           {//buy-crypto
      id: 0, question: <>
      <div className="flex flex-col justify-center rounded-lg lg:rounded-3xl mx-auto gap-1 lg:min-h-[100px]">
           <div className="flex cursor-pointer justify-between items-center w-full">
               <div className="flex-1 lg:flex-center">
                   <h3 className='font-semibold text-14 sm:text-20 lg:text-[35px] text-start lg:text-center'>Web3 Domains<br/>General Information</h3>
               </div>
           </div>
           <div className="mx-auto">
               <Image className='max-w-[80px] lg:max-w-[130px]' src={arrow_down} />
           </div>
       </div>
        </>, isOpen: false, answer:
        <div>
          <h3 className="font-bold text-20 lg:text-[30px] text-sky-400/100 text-center">What is a Web3 Domain?</h3>
          <div className="text-15 text-center">
          A ﻿Web3 domain is a decentralized web address that gives you more control and ownership over your online presence in the Web3 ecosystem. It simplifies the user experience, enhances privacy, and allows you to access and participate in various blockchain-powered services and applications.
          </div>
          <h3 className="font-bold text-20 lg:text-[30px] text-sky-400/100 text-center">Why do I Need a Web3 Domain?</h3>
          <div className="text-15 text-center">
          Web3 domains play a crucial role in simplifying interactions within the decentralized Web3 ecosystem. They provide user-friendly addresses, enhance privacy and security, serve as gateways to decentralized websites and services, and empower individuals to have more control over their online presence and digital identity.
                       </div>
                       <div className="text-15 text-center">
                       Decentralized Identity - Payment Addresses - Personal Branding
                       </div>
          <div className="text-20 text-center font-bold underline underline-offset-1 mt-5 hover:text-white hover:opacity-60">
              <a href="/whatisweb3">More Info</a>
              </div>
        </div>
  },
    ]);
    const [lastClickedElement,setLastClickedElement] = useState(false);
    const toggleQuestion = (id,e) => {
        setQuestions(questions.map(item => id === item.id ? { ...item, isOpen: !item.isOpen } : { ...item, isOpen: false }))
        setLastClickedElement(e.currentTarget);
    };
    const handleTransitionEnd = () =>{
        if(lastClickedElement!=false){
            lastClickedElement.scrollIntoView(true,{behavior: 'instant'});
            setLastClickedElement(false);
        }
    };
    return (
        <>
        <MetadataHelper noindex title="Web3 Domain" />
        <div className='bg-image3 min-h-screen flex-center section-center'>
            <div className="container max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 items-center gap-4">
                <div className="col-span-1">
                    <div className="max-w-[500px] mx-auto">
                        <h2 className='text-24 lg:text-[40px] text-center font-semibold text-white'>3. Get A Domain</h2>
                        <div className="mt-3 min-h-[310px] flex-center border-2 border-white text-center rounded-xl overflow-hidden p-4 text-18 lg:text-20  bg-primary-newBgColor2/40 text-white text-justify">A Web3 domain is a revolutionary approach to domain naming, operating within the decentralized framework of blockchain technology. Unlike traditional domains managed by centralized registrars, Web3 domains are entirely user-owned, ensuring both autonomy and security. The name of your web3 domain will be the same name used for your wallet, email, videochat and other web3 identifiers associated with you.</div>
                            <div className="flex items-center pt-2 mx-auto px-10 justify-between">
                                {images.map((img, index) => (
                                    <Image key={index} className='max-w-[130px] lg:max-w-[130px]' src={img} />))}
                            </div>
                    </div>
                </div>
                <div className="col-span-1 space-y-3 text-white">
                    {questions.map((item) => (
                        <div key={item.id} onClick={(e) => toggleQuestion(item.id,e)} className="flex flex-col justify-center p-3 rounded-lg lg:rounded-3xl max-w-[550px] mx-auto gap-1 border-2 border-white bg-primary-newBgColor2/40 lg:min-h-[100px]">
                            <div className="flex cursor-pointer justify-between items-center w-full">
                                <div className="flex-1 lg:flex-center"><h3 className='font-semibold text-14 sm:text-20 lg:text-24 text-start lg:text-center'>{item.question}</h3></div>
                                {/* <span className="text-20 lg:text-26">
                                    {item.isOpen ? reactIcons.minus : reactIcons.plus}
                                </span> */}
                            </div>
                            <Collapse in={item.isOpen} className='' onTransitionEnd={handleTransitionEnd}>
                                <div className='lg:pt-2 lg:pl-4 font-normal text-base [&_strong]:text-white [&_p]:text-white/80 [&_li]:text-white/80 [&_p]:mb-2 [&_p]:text-14 [&_li]:mb-2 [&_li]:text-14'>
                                {item.answer}
                                </div>
                            </Collapse>
                        </div>
                    ))}
                    <div className="md:col-span-1 space-y-3 text-white">
                        <div className="flex flex-col justify-center p-3 rounded-lg lg:rounded-3xl mx-auto border-2 border-white bg-primary-newBgColor2/40 lg:min-h-[190px]">
                        <h3 className='font-semibold text-20 lg:text-24 text-start lg:text-center'>Get A Domain at our Vendor’s <br/> Marketplace!   </h3>
                                <div className="flex items-center mx-auto pt-2 gap-2">
                                    {/* {imagess.map((img, index) => (
                                        <Image key={index} className='max-w-[80px] lg:max-w-[130px]' src={img} />))} */}
                                        <Link target="_blank" href={"https://ens.domains/"}>
                                            <Image className='max-w-[70px] lg:max-w-[120px] rounded-lg lg:rounded-3xl' src={ano} />
                                        </Link>
                                        <Link target="_blank" href={"https://freename.io/?referralCode=eager-boxes-throw"}>
                                            <Image className='max-w-[70px] lg:max-w-[120px] rounded-lg lg:rounded-3xl' src={freename2} />
                                        </Link>
                                        <Link href={"/marketplace"}>
                                            <Image className='max-w-[70px] lg:max-w-[120px] rounded-lg lg:rounded-3xl' src={w3o} />
                                        </Link>
                                        <Link  target="_blank" href={"https://unstoppabledomains.com/?ref=4f4046defa8b48b"}>
                                            <Image className='max-w-[70px] lg:max-w-[120px] rounded-lg lg:rounded-3xl' src={unstopable} />
                                        </Link>
                                </div>
                            
                        </div>
                        <div className="flex flex-col justify-center p-3 rounded-lg lg:rounded-3xl mx-auto gap-1 border-2 border-white bg-primary-newBgColor2/40 lg:min-h-[100px]">
                            <div className="flex cursor-pointer justify-between items-center w-full">
                                <div className="flex-1 lg:flex-center">
                                <a className='font-bold text-14 lg:text-[30px] sm:text-20 lg:text-24 text-start lg:text-center p-5' href="/web3/web3site">I have a Web3 Domain. Now what?</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
            </div>
        </div>
        </>
    )
}

export default Web3Domains