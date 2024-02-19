import React from 'react'
import web3img from "/public/assets/images/web3logo.png";
import Link from "next/link";
import Image from "next/image";
import { reactIcons } from "components/utils/icons";
const Footer = () => {
    const FooterUl = [
        {
          head: "Company",
          linksArr: [
            { title: "Home", path: "/home" },
            { title: "About", path: "/about" },
            // { title: "Schedule a Call", path: "https://zcal.co/web3onboarding" },
            { title: "Pricing & Packages", path: "#pricing" },
            // { title: "Mission", path: "/story" },
            // { title: "Partners", path: "/partners" },
            { title: "Become a Member", path: "/register" },
            { title: "Become a Partner", path: "/partners" },
            { title: "Become an Affiliate", path: "/affiliate" },
          ],
        },
        {
          head: "Resources",
          linksArr: [
            { title: "FAQ", path: "/faqs" },
            { title: "What is Web3", path: "/whatisweb3" },
            // { title: "Pricing", path: "/home#pricing" },
            { title: "1Site", path: "/1site" },
            { title: "Marketplace", path: "/marketplace" },
            // { title: "Creator Page", path: "/creator" },
            // { title: "Blog", path: "/blog" },
            { title: "White Paper", path: "/documents/whitepaper.pdf" },
            { title: "Whitelist", path: "/whitelist" },
          ],
        },
        {
          head: "Social",
          linksArr: [
            { title: "Twitter", path: "https://twitter.com/web3onboard?s=11&t=zzIsZ-onpy3R14dRmbiFpQ" },
            { title: "Discord", path: "" },
            { title: "Telegram", path: "https://t.me/web3onboarding" },
            { title: "Instagram", path: "https://www.instagram.com/web3_onboarding/" },
            { title: "LinkedIn", path: "https://www.linkedin.com/company/web3onboarding/" },
          ],
        },
      ];
      const Footer = FooterUl.map((item, index) => (
        <ul key={index} className="col-span-1 space-y-2 lg:space-y-5">
          <li className="font-semibold">{item.head}</li>
          {item.linksArr.map((innerItem, index) =>
            innerItem.title === "Whitepaper" ? (
              <li key={index}>
                {" "}
                <a
                  href="/documents/whitepaper.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary-100"
                >
                  WhitePaper
                </a>
              </li>
            ) : (
              <li key={index}>
                <Link href={innerItem.path} className="hover:text-primary-100">
                  {innerItem.title}
                </Link>
              </li>
            )
          )}
        </ul>
      ));
  return (
    <footer className="panel bg-image3 bg-opacity-0 scroll-span-align">
        <div className="bg-primary-light/80 rounded-t-2xl text-black">
          <div className="section-center pb-12 pt-10">
            <div className="grid-col-1 max-w-[1200px]  container grid lg:grid-cols-4 xl:grid-cols-4">
              <div className="col-span-1 space-y-5">
                <Link href="/home" className="contents">
                  <Image
                    src={web3img}
                    width={500}
                    height={500}
                    className="w-full max-w-[200px]"
                    alt=""
                  ></Image>
                </Link>
                <p className="lg:text-15">Stay in the loop and sign up for the Web3 Onboarding newsletter:</p>
                <div className="relative max-w-full md:max-w-[310px]">
                  <input type="text" placeholder="Enter your email" className="rounded-full border border-black py-4 px-4 w-full" />
                  <button className="ay-center rounded-full text-white right-3 bg-black p-3">{reactIcons.arrowright}</button>
                </div>
              </div>
              <div className="col-span-1"></div>
              <div className="col-span-2">
                <div className="grid grid-cols-3 gap-3 pt-10 lg:pt-0">
                  {Footer}
                </div>
              </div>
            </div>
          </div>
          <div className="container border-t max-w-[1200px] flex flex-col lg:flex-row justify-between items-center gap-2 lg:gap-4">
            <p className="pt-2 lg:py-4 text-center text-14">
              © Web3 Onboarding Inc. All Rights Reserved 2023
            </p>
            <div className="flex items-center gap-3">
              <Link href={'/terms-of-use'}>Privacy Policy</Link>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer