import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import purchansing1 from '/public/assets/images/purchasing1.png'
import purchansing4 from '/public/assets/images/purchasing4.png'
import purchansing2 from '/public/assets/images/purchasing2.png'
import purchansing3 from '/public/assets/images/purchasing3.png'
import metamask from '/public/assets/images/metamask.svg'
import coinbase from '/public/assets/images/coinbase.png'
import arrow_down from '/public/assets/images/arrow_down.png'
import ledger from '/public/assets/images/ledger.png'
import { reactIcons } from 'components/utils/icons'
import { Collapse } from '@mui/material'
import { useTransak } from "hooks/useTransak";
import MetadataHelper from 'components/MetadataHelper'
import Link from 'next/link'

const GettingWallet = () => {
    const images = [purchansing1, purchansing2, purchansing3];
    const imagess = [metamask, coinbase, ledger];
    const text = ["Metamask", "Coinbase", "Ledger"];
    const { transak } = useTransak();
    const [questions, setQuestions] = useState([
        {
            id: 0, question: <>
                       <div className="flex flex-col justify-center rounded-lg lg:rounded-3xl mx-auto gap-1 lg:min-h-[100px]">
                            <div className="flex cursor-pointer justify-between items-center w-full">
                                <div className="flex-1 lg:flex-center">
                                    <h3 className='font-semibold text-14 sm:text-20 lg:text-[35px] text-start lg:text-center'>Crypto Wallet<br/>General Information</h3>
                                </div>
                            </div>
                            <div className="mx-auto">
                                <Image className='max-w-[80px] lg:max-w-[130px]' src={arrow_down} />
                            </div>
                        </div>
            </>, isOpen: false, answer:
                <div>
                    <h3 className="font-bold text-20 lg:text-[30px] text-sky-400/100 text-center">What is a Crypto Wallet?</h3>
                    <div className="text-15 text-center">
                    
                    A crypto currency wallet is a digital tool or software application that allows individuals to securely store, manage,
                        and interact with their cryptocurrencies.
                    
                    </div>
                    <div className="text-15 text-center">
                    Depending on your needs, you can choose between different types of wallets, such as hardware wallets, software wallets, or mobile wallets, each with its own set of advantages. 
                    </div>
                    <h3 className="font-bold text-20 lg:text-[30px] text-sky-400/100 text-center">Why do I Need a Crypto Wallet?</h3>
                    <div className="text-15 text-center">
                    A crypto wallet is a fundamental tool for anyone looking to explore and participate in the Web3 ecosystem. It provides a secure place to store your crypto, control, and access to a wide range of
decentralized applications, tokens, and services,
making it an essential component of your Web3 journey.
These wallets serve several key functions in the world of cryptocurrencies.
Secure Storage - Ownership and Control - Transaction Management
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
        <MetadataHelper noindex title="Get a Wallet"/>
        <div className='bg-image3 min-h-screen flex-center section-center'>
            <div className="container max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 items-start gap-4">
                <div className="col-span-1">
                    <div className="max-w-[500px] mx-auto">
                        <h2 className='text-24 lg:text-[40px] text-center font-semibold text-white'>1. Get a Wallet</h2>
                        <div className="mt-3 min-h-[350px] flex items-center text-center border-2 border-white rounded-xl overflow-hidden p-4 text-15 lg:text-20 bg-primary-newBgColor2/80 text-white text-justify">
                        A crypto wallet is a digital tool that allows users to securely store, send, and receive cryptocurrencies. Think of it as the digital counterpart to a physical wallet or a bank account, designed specifically for your digital assets. Unlike traditional wallets, a crypto wallet doesn't actually "store" your money in the conventional sense.
Instead, it saves a pair of cryptographic keys:
the public key and the private key.  
Browser wallets such as Metamask also act as your web3 passport, enabling you to login to web3sites as you would use a username and password in web2.</div>
                        <div className="flex items-center justify-between pt-2">
                            {images.map((img, index) => (
                                <Image key={index} className='max-w-[100px] lg:max-w-[130px]' src={img} width={300} height={300} />))}
                        </div>
                    </div>
                    </div>
                    
                <div className="md:col-span-1 space-y-3 text-white">
                    {questions.map((item) => (
                        <div key={item.id} onClick={(e) => {toggleQuestion(item.id,e);}} className="flex flex-col justify-center p-3 rounded-lg lg:rounded-3xl mx-auto gap-1 border-2 border-white bg-primary-newBgColor2/40 lg:min-h-[100px]">
                            <div className="flex cursor-pointer justify-between items-center w-full">
                                <div className="flex-1 lg:flex-center">
                                    <h3 className='font-semibold text-14 sm:text-20 lg:text-24 text-start lg:text-center'>{item.question}</h3>
                                </div>
                                {/* <span className="text-20 lg:text-26" >
                                    {item.isOpen ? reactIcons.minus : reactIcons.plus}
                                </span> */}
                            </div>
                            <Collapse in={item.isOpen} className='' onTransitionEnd={handleTransitionEnd}>
                                <div className='lg:pt-2 lg:pl-4 font-normal text-base [&_strong]:text-white [&_p]:text-white/80 [&_li]:text-white/80 [&_p]:mb-2 [&_p]:text-14 [&_li]:mb-2 [&_li]:text-14'>
                                    <>
                                        {item.answer}
                                    </>
                                </div>
                            </Collapse>
                        </div>
                    ))}
                        <div className="flex flex-col justify-center p-3 rounded-lg lg:rounded-3xl mx-auto gap-1 border-2 border-white bg-primary-newBgColor2/40 lg:min-h-[100px]">
                        <h2 className='text-24 lg:text-[40px] text-center font-semibold text-white'>Get a Wallet</h2>
                            <div className="flex cursor-pointer justify-between items-center w-full">
                                <div className="flex items-center justify-between pt-2 mx-auto gap-8">
                                    <div className="flex items-center justify-between pt-2 gap-8">
                                        <Link className="flex items-center"  target="_blank" href={"https://metamask.io/download/"}>
                                            <Image className='max-w-[80px] lg:max-w-[130px]' src={metamask} />  
                                        </Link>
                                        <Link className="flex items-center" target="_blank" href={"https://www.coinbase.com/wallet/downloads"}>
                                            <Image className='max-w-[80px] lg:max-w-[130px]' src={coinbase} />
                                        </Link>
                                        <Link className="flex items-center"  target="_blank" href={"https://shop.ledger.com/?r=e8bad9f4d6f2"}>
                                            <Image className='max-w-[80px] lg:max-w-[130px]' src={ledger} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                                    <div className="flex pt-2">
                                        <h4 className="text-15 lg:text-[25px] pl-2 lg:pl-12">Metamask</h4>
                                        <h4 className="text-15 lg:text-[25px] pl-9 lg:pl-10">Coinbase</h4>
                                        <h4 className="text-15 lg:text-[25px] pl-12 ml-2 lg:pl-14 lg:ml-2">Ledger</h4>
                                    </div>
                            {/* <span className="text-20 lg:text-26 flex justify-between pt-2 mx-auto gap-10" >
                                {text.map((img, index) => (
                                        <div key={index} className='max-w-[80px] lg:max-w-[130px]'>{img}</div>))}
                            </span> */}
                            
                        </div>
                        <div className="flex flex-col justify-center p-3 rounded-lg lg:rounded-3xl mx-auto gap-1 border-2 border-white bg-primary-newBgColor2/40 lg:h-[150px] h-[100px]">
                            <div className="flex cursor-pointer justify-between items-center w-full">
                                <div className="flex-1 lg:flex-center">
                                <a className='font-bold text-14 lg:text-[30px] sm:text-20 lg:text-24 text-start lg:text-center p-10' href="/web3/purchase-crypto">I have a wallet. Now what?</a>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default GettingWallet