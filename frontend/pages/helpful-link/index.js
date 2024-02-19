import React, { useState } from 'react';
import { reactIcons } from 'components/utils/icons';
/* eslint-disable react/no-unescaped-entities */
import { Collapse } from '@mui/material';
import ledger from '/public/assets/images/ledger.svg';
import logo from '/public/assets/images/logo.png';
import mybrandlogo from '/public/assets/images/mybrandlogo.png';
import smashing from '/public/assets/images/smashing.png';
import northwest from '/public/assets/images/northwest.png';
import mycompanywork from '/public/assets/images/mycompanywork.png';
import trademark from '/public/assets/images/trademark.png';
import seobuddy from '/public/assets/images/seobuddy.png';
import brightlocal from '/public/assets/images/brightlocal.png';
import shareasale from '/public/assets/images/shareasale.png';
import Link from 'next/link';
import Image from 'next/image';

const HelpFul = () => {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);
    const [isOpen5, setIsOpen5] = useState(false);
    const [isOpen6, setIsOpen6] = useState(false);

    return (
        <main className='section-center'>
            <div className='section-center container'>
                <h2 className='heading-1 text-center'>Helpful Links</h2>
                <p className='para-24 pt-[30px] text-center'>
                    Web3 Onboarding provides convenient access to a suite of
                    business tools for entrepreneurs to transition from Web2 to Web3. You
                    can find leading providers for different services on this business
                    tools page. Also, while it is true that we earn a commission when you
                    use our referral links, these come at no extra cost to you!
                </p>
                <div className='mx-auto max-w-[1078px] pt-[100px]'>
                    {/* FAQ item 1 */}
                    <div
                        onClick={() => setIsOpen1(!isOpen1)}
                        className='cursor-pointer rounded-xl border-[0.5px]  py-7 px-4'
                    >
                        <div className='flex items-center justify-between gap-2'>
                            <p className='para-24 font-semibold'>
                                <span className=''>1.</span> Crypto Wallets
                            </p>

                            {isOpen1 ?
                                <span className='rotate-180'>
                                    {reactIcons.arrowdown}
                                </span>
                                : <span> {reactIcons.arrowdown}</span>}

                        </div>
                        <Collapse in={isOpen1} className='pt-2'>
                            <p className='pt-2 pl-4 text-18 leading-[24px]'>
                                {' '}
                                A cryptocurrency wallet holds the private keys to your digital
                                assets. The best crypto wallets provide unparalleled security
                                and ease of use and support a range of assets. Experienced users
                                recommend a hardware wallet for the best security and a mobile
                                wallet for regular transactions.
                            </p>
                            <Link
                                target='newtabe'
                                href='https://shop.ledger.com/?r=e8bad9f4d6f2'
                                className='mx-auto flex pt-10'
                            >
                                <Image
                                    src={ledger}
                                    width={100}
                                    height={100}
                                    className='mx-auto w-[200px] cursor-pointer invert'
                                ></Image>
                            </Link>
                        </Collapse>
                    </div>
                    {/* FAQ item 2 */}
                    <div
                        onClick={() => setIsOpen2(!isOpen2)}
                        className='cursor-pointer rounded-xl border-[0.5px]  py-7 px-4'
                    >
                        <div className='flex items-center justify-between gap-2'>
                            <p className='para-24 font-semibold'>
                                <span className=''>2.</span> Logo Generators
                            </p>
                            {isOpen2 ?
                                <span className='rotate-180'>
                                    {reactIcons.arrowdown}
                                </span>
                                : <span> {reactIcons.arrowdown}</span>
                            }
                        </div>
                        <Collapse in={isOpen2} className='pt-2'>
                            <p className='pl-4  text-18 leading-[24px]'>

                                A logo is the face of your brand and one of the first things
                                customers see when they come across your business. Get a
                                memorable logo for your brand using these instant logo
                                generators.
                            </p>
                            <div className="grid grid-cols-3 gap-2 justify-between items-center">
                                <Link
                                    target='newtabe'
                                    href='https://mybrandnewlogo.com/?sscid=91k7_10xgko&utm_source=ShareASale&utm_medium=Affiliate&utm_campaign=3400823&utm_content=1559933'
                                    className='mx-auto flex pt-10'
                                >
                                    <Image
                                        src={mybrandlogo}
                                        width={2448}
                                        height={2448}
                                        className='mx-auto w-[150px] cursor-pointer'
                                    ></Image>
                                </Link>
                                <Link
                                    target='newtabe'
                                    href='https://logo.com/?utm_source=shareasale&utm_medium=affiliate&sscid=91k7_10xg2h&'
                                    className='mx-auto flex pt-10'
                                >
                                    <Image
                                        src={logo}
                                        width={525}
                                        height={494}
                                        className='mx-auto w-[150px] cursor-pointer '
                                    ></Image>
                                </Link>
                                <Link
                                    target='newtabe'
                                    href='https://smashinglogo.com/en/?sscid=91k7_10xgt1'
                                    className='mx-auto flex pt-10'
                                >
                                    <Image
                                        src={smashing}
                                        width={2427}
                                        height={373}
                                        className='mx-auto w-[200px] cursor-pointer '
                                    ></Image>
                                </Link>
                            </div>
                        </Collapse>
                    </div>

                    {/* FAQ item 3 */}
                    <div
                        onClick={() => setIsOpen3(!isOpen3)}
                        className='cursor-pointer rounded-xl border-[0.5px]  py-7 px-4'
                    >
                        <div className='flex items-center justify-between gap-2'>
                            <p className='para-24 font-semibold'>
                                <span className=''>3.</span> Business Registrations
                            </p>

                            {isOpen3 ? <span className='rotate-180'>
                                {reactIcons.arrowdown}
                            </span>
                                : <span> {reactIcons.arrowdown}</span>}
                        </div>
                        <Collapse in={isOpen3} className='pt-2 '>
                            <p className='pl-4 text-18 leading-[24px]'>  Work with a reliable agency to register your business in the United States, Canada, and other jurisdictions. Whether you're a
                                start-up or an established business, you can find the right
                                registration plan right away.</p>
                            <div className="grid grid-cols-2 gap-2 justify-between items-center">
                                <Link
                                    target='newtabe'
                                    href='https://www.northwestregisteredagent.com/northwest-39-package-landing-page?sscid=91k7_10xh69'
                                    className='mx-auto flex pt-10'
                                >
                                    <Image
                                        src={northwest}
                                        width={461}
                                        height={109}
                                        className='mx-auto w-[250px] cursor-pointer'
                                    ></Image>
                                </Link>

                                <Link
                                    target='newtabe'
                                    href='https://www.mycompanyworks.com/?utm_source=ShareASale&utm_medium=Affiliate&utm_campaign=Affiliate-SAS&sscid=91k7_10xhhy'
                                    className='mx-auto flex pt-10'
                                >
                                    <Image
                                        src={mycompanywork}
                                        width={509}
                                        height={99}
                                        className='mx-auto w-[200px] cursor-pointer '
                                    ></Image>
                                </Link>
                            </div>
                        </Collapse>
                    </div>
                    {/* FAQ item 4 */}
                    <div
                        onClick={() => setIsOpen4(!isOpen4)}
                        className='cursor-pointer rounded-xl border-[0.5px]  py-7 px-4'
                    >
                        <div className='flex items-center justify-between gap-2'>
                            <p className='para-24 font-semibold'>
                                <span className=''>4.</span> Trademark Registrations
                            </p>
                            {isOpen4 ? <span className='rotate-180'>
                                {reactIcons.arrowdown}
                            </span>
                                : <span> {reactIcons.arrowdown}</span>}
                        </div>
                        <Collapse in={isOpen4} className='pt-2'>
                            <p className='pt-2 pl-4 text-18 leading-[24px]'>
                                {' '}
                                Think you've got the next big idea for Web3? Register your IP
                                with the world's best trademark agency and get maximum
                                protection against theft in any jurisdiction. Enjoy a
                                transparent registration process and guaranteed results.
                            </p>
                            <Link
                                target='newtabe'
                                href='https://www.trademarkengine.com/marketing/trademarks/trademark-registration?sscid=91k7_10xhq1&utm_source=shareasale&utm_medium=affiliate&utm_campaign=3400823'
                                className='mx-auto flex pt-10'
                            >
                                <Image
                                    src={trademark}
                                    width={516}
                                    height={88}
                                    className='mx-auto w-[200px] cursor-pointer '
                                ></Image>
                            </Link>
                        </Collapse>
                    </div>
                    {/* FAQ item 5 */}
                    <div
                        onClick={() => setIsOpen5(!isOpen5)}
                        className='cursor-pointer rounded-xl border-[0.5px]  py-7 px-4'
                    >
                        <div className='flex items-center justify-between gap-2'>
                            <p className='para-24 font-semibold'>
                                <span className=''>5.</span> Search Engine Optimization (SEO)
                                Tools
                            </p>
                            {isOpen5 ? <span className='rotate-180'>
                                {reactIcons.arrowdown}
                            </span>
                                : <span> {reactIcons.arrowdown}</span>}
                        </div>
                        <Collapse in={isOpen5} className='pt-2 '>
                            <p className='pl-4 text-18 leading-[24px]'>   SEO is the most reliable and result-oriented traffic source for
                                online businesses. Yet, it is often difficult to find the right
                                SEO agency or deploy a workable strategy. Get started with the
                                best SEO tools from our inventory and take your pages to the top
                                of search engines within the best possible time.</p>
                            <div className="grid grid-cols-2 gap-2 justify-between items-center">
                                <Link
                                    target='newtabe'
                                    href='https://seobuddy.com/seo-checklist?sscid=91k7_10xig8&'
                                    className='mx-auto flex pt-10'
                                >
                                    <Image
                                        src={seobuddy}
                                        width={176}
                                        height={172}
                                        className='mx-auto w-[200px] cursor-pointer'
                                    ></Image>
                                </Link>

                                <Link
                                    target='newtabe'
                                    href='https://www.brightlocal.com/?SSAID=3400823&SSCID=91k7_10xi36'
                                    className='mx-auto flex pt-10'
                                >
                                    <Image
                                        src={brightlocal}
                                        width={509}
                                        height={99}
                                        className='mx-auto w-[200px] cursor-pointer '
                                    ></Image>
                                </Link>
                            </div>
                        </Collapse>
                    </div>

                    {/* FAQ item 6 */}
                    <div
                        onClick={() => setIsOpen6(!isOpen6)}
                        className='cursor-pointer rounded-xl border-[0.5px]  py-7 px-4'
                    >
                        <div className='flex items-center justify-between gap-2'>
                            <p className='para-24 font-semibold'>
                                <span className=''>6.</span> CPS Affiliate Network
                            </p>
                            {isOpen6 ? <span className='rotate-180'>
                                {reactIcons.arrowdown}
                            </span>
                                : <span> {reactIcons.arrowdown}</span>}
                        </div>
                        <Collapse in={isOpen6} className='pt-2'>
                            <p className=' pl-4 text-18 leading-[24px]'>Advertise your business with the largest CPA affiliate network.
                                Unlock a new revenue stream for your online business by becoming a
                                global affiliate.</p>
                                <Link
                                    target='newtabe'
                                    href='https://account.shareasale.com/newsignup.cfm'
                                    className='mx-auto flex pt-10'
                                >
                                    <Image
                                        src={shareasale}
                                        width={176}
                                        height={172}
                                        className='mx-auto w-[200px] cursor-pointer'
                                    ></Image>
                                </Link>
                        </Collapse>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default HelpFul;
