import Image from 'next/image'
import React, { useState } from 'react'
import purchansing1 from '/public/assets/images/web3hosting.png'
import purchansing2 from '/public/assets/images/web3domain.png'
import purchansing3 from '/public/assets/images/web3site.png'
import web3hosting from "/public/assets/images/web3hosting.png";
import domain from "/public/assets/images/domain.png";
import ipfs from "/public/assets/images/ipfs2.png";
import noto from "/public/assets/images/noto.png";
import arrow_down from '/public/assets/images/arrow_down.png';
import { reactIcons } from 'components/utils/icons'
import { Collapse } from '@mui/material'
import MetadataHelper from 'components/MetadataHelper'
import Link from "next/link";


const IpfsHosting = () => {
    const images = [purchansing1, purchansing2, purchansing3];
    const [questionss, setQuestionss] = useState([
        {
    id: 0, questionss: <>
    <div className="flex flex-col justify-center rounded-lg lg:rounded-3xl mx-auto gap-1 lg:min-h-[100px]">
         <div className="flex cursor-pointer justify-between items-center w-full">
             <div className="flex-1 lg:flex-center">
                 <h3 className='font-semibold text-14 sm:text-20 lg:text-[35px] text-start lg:text-center'>IPFS Hosting<br/>General Information</h3>
             </div>
         </div>
         <div className="mx-auto">
             <Image className='max-w-[80px] lg:max-w-[130px]' src={arrow_down} />
         </div>
     </div>
      </>, isOpen: false, answers:
      <div>
        <h3 className="font-bold text-20 lg:text-[30px] text-sky-400/100 text-center">What is IPFS Hosting?</h3>
        <div className="text-15 text-center">
        IPFS (InterPlanetary File System) is a super-safe and distributed way of putting information (like websites or files) on the internet. Instead of relying on one big computer server, it spreads that information across many computers all around the world. IPFS makes sure your web content is always available, no matter what happens to one server. It's a more robust and resilient way to host websites and share files.
        </div>
        <h3 className="font-bold text-20 lg:text-[30px] text-sky-400/100 text-center">Why do I Need IPFS Hosting?</h3>
        <div className="text-15 text-center">
        IPFS helps make your online content more reliable and available.
With IPFS, your website or files are stored on lots of computers worldwide, so even if one computer goes offline, your content is still accessible. It's like having a safety net for your online stuff, ensuring it's always there for people to see or use, no matter what. So, if you want your web content to be more resilient and available, IPFS can be a useful tool.
                     </div>
        <div className="text-20 text-center font-bold underline underline-offset-1 mt-5 hover:text-white hover:opacity-60">
            <a href="/whatisweb3">More Info</a>
            </div>
      </div>
  },
    ]);
    const [questions, setQuestions] = useState([
        {
            id: 1, question: 'I Have IPFS hosting. Now what?', isOpen: false, answer: <div>
                {/* <p>Congratulations you've completed the essential steps to being onboarded to web3.</p> */}
                <p>You are now able to host a decentralized platform! Welcome to Web3!
To take it a step further, become an affiliate to earn crypto for building web3 at <a href="1site.tapfiliate.com">1site.tapfiliate.com </a>
Book a call with one of our professionals to discuss how to maximize your experience, or for B2B opportunities</p>
                {/* <p><a href='/#benefit' className='text-blue-500 underline'>Get started now</a> to continue your journey into web3!</p> */}
            </div>
        },
    ]);
    const [lastClickedElement,setLastClickedElement] = useState(false);
    const toggleQuestion = (id,e) => {
        setQuestions(questions.map(item => id === item.id ? { ...item, isOpen: !item.isOpen } : { ...item, isOpen: false }))
        setQuestionss(questionss.map(item => id === item.id ? { ...item, isOpen: !item.isOpen } : { ...item, isOpen: false }))
        setLastClickedElement(e.currentTarget);
    }
    const handleTransitionEnd = () =>{
        if(lastClickedElement!=false){
            lastClickedElement.scrollIntoView(true,{behavior: 'instant'});
            setLastClickedElement(false);
        }
    };

    return (
        <>
        <MetadataHelper noindex title="IPFS Hosting" />
        <div className='bg-image3 min-h-screen flex-center section-center'>
            <div className="container max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 items-center gap-4">
                <div className="col-span-1">
                    <div className="max-w-[500px] mx-auto">
                        <h2 className='text-24 lg:text-[30px] text-center font-semibold text-white'>5. The Integration of
Web2 & Web3 Hosting</h2>
                            <div className="grid-cols-1 mt-3 justify-center border-2 border-white text-center rounded-xl overflow-hidden p-8 text-18 lg:text-20  bg-primary-newBgColor2/40 text-white">
                                At its essence, a Web3 site operates in the broader sphere of the decentralized web, known as Web3. Unlike traditional websites that rely on centralized servers, databases, and authorities, Web3 sites function on a decentralized network, primarily supported by blockchain technology.
                                <p className="text-blue-500 mt-5">Introducing NOTO Technology which allows web3 domains to seamlessly integrate with Web2 DNS!</p>
                            </div>
                            
                            <div className="flex items-center object-center">
                  <Image
                    src={domain}
                    className="h-[150px] lg:max-w-[45%] mx-auto"
                  />
              </div>
                    </div>
                </div>
                <div className="col-span-1 space-y-3 text-white">
                    {questionss.map((item) => (
                        <div key={0} onClick={(e) => toggleQuestion(0,e)} className="flex flex-col justify-center p-3 rounded-lg lg:rounded-3xl max-w-[550px] mx-auto gap-1 border-2 border-white bg-primary-newBgColor2/40 lg:min-h-[100px]">
                            <div className="flex cursor-pointer justify-between items-center w-full">
                                <div className="flex-1 lg:flex-center"><h3 className='font-semibold text-14 sm:text-20 lg:text-24 text-start lg:text-center'>{item.questionss}</h3></div>
                                {/* <span className="text-20 lg:text-26">
                                    {item.isOpen ? reactIcons.minus : reactIcons.plus}
                                </span> */}
                            </div>
                            <Collapse in={item.isOpen} className='' onTransitionEnd={handleTransitionEnd}>
                                <div className='lg:pt-2 lg:pl-4 font-normal text-base [&_strong]:text-white [&_p]:text-white/80 [&_li]:text-white/80 [&_p]:mb-2 [&_p]:text-14 [&_li]:mb-2 [&_li]:text-14'>
                                    {item.answers}
                                </div>
                            </Collapse>
                        </div>
                    ))}
                                <div className="md:col-span-1 space-y-3 text-white">
            <div className="flex flex-col justify-center p-3 rounded-lg lg:rounded-3xl mx-auto gap-1 border-2 border-white bg-primary-newBgColor2/40 lg:min-h-[100px]">
            <h3 className='font-semibold text-xl lg:text-3xl lg:text-center p-5 mx-auto'>Get IPFS hosting,<br/> 
                OR integrate Web2 DNS with NOTO  </h3>
                            <div className="flex cursor-pointer justify-between items-center w-full">
                                <div className="flex items-center justify-between mx-auto">

                                    <div className="flex items-center pt-2 gap-12">
                                        <Link className="flex items-center border-3 border-white" href={"/web3/ipfs"}>
                                            <Image className='max-w-[130px] lg:max-w-[130px]' src={ipfs} />
                                        </Link>
                                        <Link className="flex items-center"  target="_blank" href={"https://noto.network/"}>
                                            <Image className='max-w-[130px] lg:max-w-[130px]' src={noto} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    {questions.map((item) => (
                        <div key={item.id} onClick={(e) => toggleQuestion(item.id,e)} className="flex flex-col justify-center p-3 rounded-lg lg:rounded-3xl max-w-[560px] mx-auto gap-1 border-2 border-white bg-primary-newBgColor2/40 lg:min-h-[100px]">
                            <div className="flex cursor-pointer justify-between items-center w-full">
                                <div className="flex-1 lg:flex-center"><h3 className='font-semibold text-14 sm:text-20 lg:text-24 text-start lg:text-center'>{item.question}</h3></div>
                                <span className="text-20 lg:text-26">
                                    {item.isOpen ? reactIcons.minus : reactIcons.plus}
                                </span>
                            </div>
                            <Collapse in={item.isOpen} className='' onTransitionEnd={handleTransitionEnd}>
                                <div className='lg:pt-2 lg:pl-4 font-normal text-base [&_strong]:text-white [&_p]:text-white/80 [&_li]:text-white/80 [&_p]:mb-2 [&_p]:text-14 [&_li]:mb-2 [&_li]:text-14'>
                                    {item.answer}
                                </div>
                            </Collapse>
                        </div>
                    ))}
          </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default IpfsHosting