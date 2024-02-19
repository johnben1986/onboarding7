import React, { useEffect, useState } from "react";
import {
  BiSolidPhoneCall,
  BiLogoTelegram,
  BiLogoTwitter,
  BiLogoInstagram,
  BiLogoFacebook,
  BiLogoPinterestAlt,
  BiLogoYoutube,
} from "react-icons/bi";
import web3img from "/public/assets/images/web3logo.png";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import Account from "components/Account/Account";
import WalletVisualizer from "components/WalletVisualizer/WalletVisualizer";
export default function AppLayout({ children }) {
  const router = useRouter();
  const iconsList = [
    {
      icon: <BiLogoTelegram />,
      link: "",
    },
    {
      icon: <BiLogoTwitter />,
      link: "",
    },
    {
      icon: <BiLogoInstagram />,
      link: "",
    },
    {
      icon: <BiLogoFacebook />,
      link: "",
    },
    {
      icon: <BiLogoPinterestAlt />,
      link: "",
    },
    {
      icon: <BiLogoYoutube />,
      link: "",
    },
  ];
  const dialList = [
    {
      icon: <BiSolidPhoneCall />,
      para: "Schedule a call",
    },
    // {
    //   icon: <BsFillPersonFill/>,
    //   para: 'Call Now 123 456 789'
    // },
  ];
  const list = [
    { link: "Home", path: "/" },
    { link: "About Us", path: "/about" },
    { link: "Blog", path: "/blog" },
    { link: "Whitelist", path: "/help-center" },
  ];
  const socialIcon = [
    {
      icon: <BiLogoTelegram />,
      link: "",
    },
    {
      icon: <BiLogoTwitter />,
      link: "",
    },
    {
      icon: <BiLogoInstagram />,
      link: "",
    },
    {
      icon: <BiLogoFacebook />,
      link: "",
    },
    {
      icon: <BiLogoPinterestAlt />,
      link: "",
    },
    {
      icon: <BiLogoYoutube />,
      link: "",
    },
  ];
  const FooterUl = [
    {
      head: "Company",
      linksArr: [
        { title: "About Us", path: "/about" },
        { title: "Blog", path: "/blog" },
        { title: "Trademarks", path: "/trademarks" },
        { title: "Whitepaper", path: "/whitepaper" },
        { title: "Whitelist", path: "/whitelist" },
        { title: "Marketplace", path: "/marketplace" },
      ],
    },
    {
      head: "Terms",
      linksArr: [
        { title: "Privacy policy", path: "/privacy-policy" },
        { title: "Terms of Use", path: "/terms-of-service" },
        { title: "Helpful Links", path: "/helpful-link" },
        { title: "Help Center", path: "/help-center" },
        { title: "Buy Crypto", path: "/buy-crypto" },
        { title: "List Domain", path: "/list-domain" },
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
  const [stickyClass, setStickyClass] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    return () => window.removeEventListener("scroll", stickNavbar);
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      // window height changed for the demo
      windowHeight > 150 ? setStickyClass("!-top-0 ") : setStickyClass("");
    }
  };

  const pagesWithNavBar = [ '/login', '/register', '/partners', '/marketplace', '/register-success', '/newhome', '/web3/purchase-crypto', '/web3/getting-wallet', '/web3/web3-domains', '/web3/quick-build','/web3/ipfs-hosting','/web3/featured','/web3/quick-build-tutorial', '/web3/become-affiliate', '/web3/about-us', '/web3/our-story', '/web3/ipfs', '/web3/partners','/', '/users/me'];
  const shouldShowNavBar = pagesWithNavBar.includes(router.pathname);
  return (
    <>
      <WalletVisualizer />
      {!shouldShowNavBar && (
      <nav
        className={`center-section container fixed top-5 left-0 right-0 z-30 w-full px-0 transition-all ${stickyClass}`}
      >
        <div className="">
          <div className="gradient-color mx-[3%] flex h-[35px]  items-center justify-between rounded-t-full py-2 px-6">
            <div className="flex items-center gap-4">
              {dialList.map((item, index) => (
                <a
                  key={index}
                  href=""
                  className="flex items-center gap-2 font-semibold"
                >
                  <span className="text-20">{item.icon}</span> {item.para}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3">
              {iconsList.map((item) => (
                <a key={item.link} href={item.link} className="text-20 ">
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="flex h-[82px] items-center justify-between gap-4 rounded-full bg-white px-[30px]">
            <div>
              <Link href="/home">
                <Image
                  src={web3img}
                  width={100}
                  height={100}
                  className="w-full max-w-[113px] cursor-pointer"
                ></Image>
              </Link>
            </div>

            <div className="flex flex-1 items-center ">
              <ul className="flex flex-1 items-center justify-end gap-5">
                {list.map(({ link, path }, index) => (
                  <Link
                    key={index}
                    href={path}
                    className={`text-20 text-black hover:text-primary-100 ${router.pathname === path ? "text-primary-100" : undefined
                      }`}
                  >
                    {link}
                  </Link>
                ))}
                <a
                  href="/documents/whitepaper.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="text-20 text-black hover:text-primary-100"
                >
                  WhitePaper
                </a>
                {/* <button className="btn-lg">Connect Wallet</button> */}
                <Account />
              </ul>
            </div>
          </div>
        </div>
      </nav>
      )}
      {children}
      {!shouldShowNavBar && (<footer>
        <div className="bg-primary-300 py-5 px-2">
          <div className="container flex max-w-[1500px] flex-col items-center justify-between gap-2 lg:flex-row">
            <h3 className="heading-42">Sign up for our newsletter.</h3>
            <div className="flex">
              <input
                type="text"
                placeholder="Your Email"
                className="h-10 rounded-[5px] border border-primary-borderWhite px-3 lg:min-w-[377px] xl:min-w-[460px]"
              />
              <button className="btn relative -left-[10px] h-10 rounded-[5px] px-2 text-20 text-white ">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
        <div className="bg-primary-light text-black">
          <div className="section-center pb-12 pt-10">
            <div className="grid-col-1  container grid lg:grid-cols-3 xl:grid-cols-4">
              <div className="col-span-1 space-y-5">
                <Link href="/home">
                  <Image
                    src={web3img}
                    width={100}
                    height={100}
                    className="w-full max-w-[113px] cursor-pointer"
                  ></Image>
                </Link>
                <p>contact@web3onboarding.com</p>
                <div className="flex items-center gap-2 text-30">
                  {socialIcon.map((item, index) => (
                    <span
                      key={index}
                      className="cursor-pointer text-black hover:rotate-3"
                    >
                      {item.icon}
                    </span>
                  ))}
                </div>
              </div>
              <div className="col-span-1"></div>
              <div className="col-span-1 hidden xl:flex"></div>
              <div className="col-span-1">
                <div className="grid grid-cols-2 gap-3 pt-10 lg:pt-0">
                  {Footer}
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <p className="py-4 text-center text-14">
              © All rights reserved by Web3 Onboarding 2023
            </p>
          </div>
        </div>
      </footer>)}
    </>
  );
}
