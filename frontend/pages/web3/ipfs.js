import React, { useState } from 'react'
import { reactIcons } from 'components/utils/icons'
import web3 from "/public/assets/images/web3logo.png"
import web3imgWhite from "/public/assets/images/web3logo-white.png";
import Image from 'next/image'
import { Collapse } from '@mui/material'
// import { Link } from 'react-router-dom';
import Link from 'next/link'
import Account from "components/Account/Account";

const Ipfs = () => {
    const [questions, setQuestions] = useState([
        { id: 1, question: 'How can I host my website on IPFS?', isOpen: false },
        { id: 2, question: 'Why Use IPFS for Web3 websites?', isOpen: false },
        { id: 3, question: 'Can I Modify My Website After Uploading?', isOpen: false },
        { id: 4, question: 'How much does it cost to host a Web3 website?', isOpen: false },
    ]);
    const toggleQuestion = (id) => {
        setQuestions(questions.map(item => id === item.id ? { ...item, isOpen: !item.isOpen } : { ...item, isOpen: false }))
    };
    const [isProfile, setIsProfile] = useState(false);
    const toggleProfile = () => {
        setIsProfile(!isProfile);
    };
    const optionValues = ['Advanced Hosting', 'Shared Hosting', 'VPS Hosting'];

    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    return (
        <main className='min-h-screen bg-image3'>
            {/* <nav className=' border-b h-[70px] lg:h-[100px] flex justify-between items-stretch'>
                <div className="flex-center px-4 border-r ">
                <Link href="/home">
                        <Image src={web3imgWhite} className='w-[100px] lg:w-[140px]' width={200} height={200} />
                </Link>            
                </div>
                <div className="hidden border-x flex-1 md:flex justify-between gap-2 px-4 items-center">
                    <div className=""></div>
                    <h4 className='text-24 font-semibold text-center'>IPFS Hosting</h4>
                    <div className="">
                        <select
                            name=""
                            id=""
                            className='bg-transparent text-[#2ABBF4]'
                            value={selectedOption}
                            onChange={handleOptionChange}
                        >
                            {optionValues.map((option, index) => (
                                <option key={index} value={option} className='text-black'>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex items-center gap-3 px-4 ">
                <Account
                  className={"ml-0 w-full justify-between gap-2 md:w-auto"}
                  textClass="text-white"
                    />
                    
                    <span>{reactIcons.shopping}</span>
                    <span>Username</span>
                    <div className="relative">
                        <div onClick={toggleProfile} className="bg-primary-hoverBg cursor-pointer w-8 h-8 rounded-full relative overflow-hidden">
                            <Image src={web3} fill className='object-cover' />
                        </div>
                        {isProfile && (
                            <div className="absolute min-w-[150px] rounded-xl  top-[40px] right-5 bg-white text-black p-3">4 hello</div>
                        )}
                    </div>
                </div>
            </nav> */}
            <div className="min-h-[calc(100vh-70px)] lg:min-h-[calc(100vh-100px)] flex-center flex-col">
                <h4 className='text-[40px] font-semibold text-center pt-5'>IPFS Hosting</h4>
                <div className="container max-w-[600px] py-10">
                    <p className='text-20 text-center'>Upload your website below in the form of a .HTML file</p>
                    <div className="flex mt-10 border rounded-2xl p-4 bg-primary-newBgColor2/30 max-w-[400px] mx-auto">
                        <input type="file" id="file-input" />
                    </div>
                    <div className="mx-auto text-center mt-5">
                        <select
                            name=""
                            id=""
                            className='bg-transparent text-[#2ABBF4] font-bold text-20'
                            value={selectedOption}
                            onChange={handleOptionChange}
                        >
                            {optionValues.map((option, index) => (
                                <option key={index} value={option} className='text-black'>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="py-10 flex">
                        <button className='bg-white rounded-lg w-[120px] text-black h-[50px] px-2 font-bold text-18 mx-auto'>Upload</button>
                    </div>
                    <div className="space-y-4">
                        {questions.map((item) => (
                            <div key={item.id} onClick={() => toggleQuestion(item.id)} className="flex flex-col justify-center p-3 rounded-lg lg:rounded-3xl mx-auto gap-1 border border-white bg-primary-newBgColor2/40">
                                <div className="flex cursor-pointer justify-between items-center w-full">
                                    <div className="flex-1 lg:flex-center"><h3 className='font-semibold text-14 sm:text-20'>{item.question}</h3></div>
                                    <span className="text-20">
                                        {item.isOpen ? reactIcons.minus : reactIcons.plus}
                                    </span>
                                </div>
                                <Collapse in={item.isOpen} className=''>
                                    <p className='lg:pt-2 lg:pl-4 text-12 sm:text-18 leading-[24px]'>
                                        {' '}
                                        A cryptocurrency wallet holds the private keys to your digital assets. The best crypto wallets provide unparalleled security and ease of use and support a range of assets. Experienced users recommend a hardware wallet for the best security and a mobile wallet for regular transactions.
                                    </p>
                                </Collapse>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Ipfs