import Link from "next/link";
import { Layout } from "antd";
import styles from "./AppLayout.module.scss";
import { useState, useEffect } from "react";

import {
  FaChevronDown,
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaTelegramPlane,
  FaTwitter,
  FaYoutube,
  FaTelegram,
} from "react-icons/fa";

import dynamic from "next/dynamic";
import Image from "next/image";
import LogoImg from "../../../public/assets/images/svg/logo.svg";
import NavLogo from "../../../public/assets/images/svg/nav-logo.svg";
import HamburgerImg from "../../../public/assets/images/svg/hamburger.svg";
import HamburCloseImg from "../../../public/assets/images/svg/ham-close.svg";
import TopWeb3DomainsLogo from "../../../public/assets/images/svg/TopWeb3Domains_Transparent.svg";

const WalletVisualizer = dynamic(
  () => import("components/WalletVisualizer/WalletVisualizer"),
  {
    ssr: false,
  }
);
import Account from "components/Account/Account";
const AuthenticatedFragment = dynamic(
  () => import("components/Authenticated/AuthenticatedFragment"),
  {
    ssr: false,
  }
);

import links from "./navbar-links";
import ReferralManager from "components/ReferralManager";
import { BsChevronDown } from "react-icons/bs";

import { Toaster } from "react-hot-toast";

const { Footer, Content } = Layout;
const { Header } = Layout;

function TopNavBar({ isMobile = false }) {
  const buttonClass =
    "rounded-full border-2 border-black font-brand-heading flex items-center text-center" +
    (isMobile ? " p-1 max-w-[20ch]" : " p-3");

  const makeNavLink = (link, withStyle = false) => {
    const classes = withStyle ? buttonClass : "";

    if (link.externalLink) {
      return (
        <a
          target="_blank"
          href={link.to}
          key={link.to}
          rel="noreferrer"
          className={classes}
        >
          {link.title}
        </a>
      );
    }

    if (link.permission) {
      return (
        <AuthenticatedFragment key={link.to} permission={link.permission}>
          <Link href={link.to} className={classes}>
            {link.title}
          </Link>
        </AuthenticatedFragment>
      );
    }

    return (
      <Link href={link.to} key={link.to} className={classes}>
        {link.title}
      </Link>
    );
  };

  const makeNavTab = (links) => {
    if (links.items) {
      return links.role ? (
        <AuthenticatedFragment role={links.role}>
          <div className="group relative" key={links.title}>
            <p className="cursor-pointer rounded-full border-2 border-black p-3 font-brand-heading">
              {links.title}
            </p>
            <div className="bg-brand-darker-blue absolute top-9 -left-16 hidden flex-col space-y-2 bg-brand-background p-3 font-brand-tomorrow text-lg hover:flex group-hover:flex">
              {links.items.map((e) => makeNavLink(e))}
            </div>
          </div>
        </AuthenticatedFragment>
      ) : (
        <div className={buttonClass + " group relative"} key={links.title}>
          <p className="cursor-pointer">{links.title}</p>
          <div className="bg-brand-darker-blue absolute top-9 -left-16 mt-3 hidden flex-col space-y-2 rounded bg-brand-background p-3 font-brand-tomorrow text-lg hover:flex group-hover:flex">
            {links.items.map((e) => makeNavLink(e))}
          </div>
        </div>
      );
    }

    return makeNavLink(links, true);
  };

  return isMobile ? (
    <>
      <header className="my-4 flex h-fit w-full">
        <Link href="/home" className="ml-4 mb-3 block w-1/2">
          <Image src={NavLogo} alt="logo" height={80} />
        </Link>
        <div className="w-1/2 space-y-1">
          <div className="lg mg:text-[1em] mx-2 flex flex-row items-stretch justify-center gap-1 text-center text-[0.6em] font-bold sm:text-[0.8em] lg:mx-10">
            {links
              .filter((e) => !e.hidden && !e.footer && !e.comingSoon)
              .map((e) => makeNavTab(e))}
          </div>
          <div className={"w-full text-center font-brand-heading"}>
            <Account />
          </div>
        </div>
      </header>
    </>
  ) : (
    <>
      <header className="absolute mt-4 flex h-fit w-full items-center justify-between">
        <Link href="/home" className="ml-4 block">
          <Image src={NavLogo} alt="logo" height={80} />
        </Link>
        <div className=" mr-10 flex flex-row items-stretch gap-4 font-bold xl:gap-6 2xl:gap-12">
          {links
            .filter((e) => !e.hidden && !e.footer && !e.comingSoon)
            .map((e) => makeNavTab(e))}
          <div className="font-brand-heading">
            <Account />
          </div>
        </div>
      </header>
      <div className="h-28"></div>
    </>
  );
}

function Burger() {
  const [isOpen, setOpen] = useState(false);
  const [hamClicked, setHamClicked] = useState("");
  const styleMap = {
    hamOpen: styles.hamOpen,
    hamClose: styles.hamClose,
  };

  const handleNavigate = () => setOpen(false);

  const makeNavLink = (link) => {
    if (link.externalLink) {
      return (
        <a
          target="_blank"
          href={link.to}
          key={link.to}
          rel="noreferrer"
          className="pl-5"
        >
          {link.title}
        </a>
      );
    }

    if (link.permission) {
      return (
        <AuthenticatedFragment key={link.to} permission={link.permission}>
          <Link
            href={link.to}
            className="pl-5"
            onClick={() => setHamClicked("hamClose")}
          >
            {link.title}
          </Link>
        </AuthenticatedFragment>
      );
    }

    return (
      <Link
        href={link.to}
        key={link.to}
        className="pl-5"
        onClick={() => setHamClicked("hamClose")}
      >
        {link.title}
      </Link>
    );
  };

  const regularTabInner = (links) => {
    return (
      <div>
        <p
          className="cursor-pointer pl-5 font-brand-heading"
          onClick={(e) => {
            console.log(e);
            const menuItemData = e.target.nextElementSibling;

            menuItemData.style.setProperty(
              "--openHeight",
              menuItemData.scrollHeight + "px"
            );
            menuItemData.classList.toggle(styles.show);
            menuItemData.classList.toggle(styles.hide);
          }}
        >
          {links.title} <BsChevronDown className="inline" />
        </p>
        <div
          className={`${styles.dropdownItem} ${styles.hide} bg-brand-darker-blue font-brand-tomorrow text-lg`}
        >
          <div className="flex flex-col space-y-2 pt-2 pb-3 pl-3">
            {links.items.map((e) => makeNavLink(e))}
          </div>
        </div>
      </div>
    );
  };

  const makeNavTab = (links) => {
    if (links.items) {
      return links.role ? (
        <AuthenticatedFragment role={links.role}>
          {regularTabInner(links)}
        </AuthenticatedFragment>
      ) : (
        regularTabInner(links)
      );
    }

    return makeNavLink(links);
  };

  useEffect(() => {
    if (hamClicked === "hamOpen") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [hamClicked]);

  return (
    <Header className={`${styles.header} ${styleMap[hamClicked]} `}>
      <Link
        href="/home"
        className={styles.logo}
        onClick={() => setHamClicked("hamClose")}
      >
        <Image src={NavLogo} alt="logo" width={100} height={100} />
      </Link>
      <div
        className={`${styles.menu} mr-0 flex flex-col gap-8 bg-brand-background pt-20 font-brand-heading`}
      >
        {links
          .filter((e) => !e.hidden && !e.footer && !e.comingSoon)
          .map((e) => {
            return (
              <div key={e.title} className="text-xl">
                {makeNavTab(e)}
              </div>
            );
          })}
        <div className={`${styles.wallet} mt-5 pl-5`}>
          <Account />
        </div>
      </div>
      <div className={styles.ham} onClick={(prev) => setHamClicked("hamOpen")}>
        <Image src={HamburgerImg} alt="hamburger" />
      </div>
      <div
        className={styles["ham-close"]}
        onClick={() => setHamClicked("hamClose")}
      >
        <Image src={HamburCloseImg} alt="hamburger-close" />
      </div>
    </Header>
  );
}

export default function AppLayout({ children }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Layout id="burger-outer-container">
      {!isScrolled && (
        <div className="fixed bottom-0 right-0 left-0 z-50 mx-auto w-full bg-gradient-to-b from-transparent to-gray-900/70 pt-12 text-gray-100">
          <div className="flex animate-bounce flex-col items-center">
            <div className="text-xl">Scroll down for more</div>
            <FaChevronDown className="inline-block text-4xl" />
          </div>
        </div>
      )}
      <WalletVisualizer />

      <ReferralManager />

      <Toaster />

      <div className="z-20">
        <div className="hidden lg:block">
          <TopNavBar />
        </div>
        <div className="lg:hidden">
          <TopNavBar isMobile={true} />
        </div>
      </div>
      <div id="burger-page-wrap" className={styles.contentOuter}>
        <Content className={styles.content}>
          <div className={styles.contentInner}>{children}</div>
        </Content>
      </div>
      <Footer className={styles.Footer}>
        <div className={styles["footer-area"]}>
          <div className={styles["footer-about"]}>
            <div className="flex gap-4">
              <Image src={LogoImg} className="w-1/4" alt="logo" />
            </div>
            <p className="text-lg font-bold">Web3 Onboarding</p>
            <p className="mt-2">Rent, buy and sell web3 domains.</p>
          </div>
          <div className="flex items-start">
            <div className={`${styles["footer-menu"]} w-1/2 text-lg`}>
              <div className={styles["title"]}>Menu</div>
              <div className="space-y-2 text-white">
                <div>
                  <Link href="/home">Home</Link>
                </div>
                <div>
                  <Link href="/marketplace">Marketplace</Link>
                </div>
                <div>
                  <a
                    href="/documents/whitepaper.pdf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Whitepaper
                  </a>
                </div>
                <div>
                  <Link href="/about">About</Link>
                </div>
                <div>
                  <Link href="/help-center">Help Center</Link>
                </div>
                <div>
                  <Link href="/#contact">Contact</Link>
                </div>
              </div>
            </div>
            <div className={`${styles["footer-menu"]} w-1/2 text-lg`}>
              <div className={styles["title"]}>Terms</div>
              <div className="space-y-2 text-white">
                <div>
                  <Link href="/terms-of-use">Privacy Policy</Link>
                </div>
              </div>
            </div>
          </div>
          <div className={styles["footer-menu"]}>
            <div className={styles["title"]}>Follow US</div>
            <div className={styles["footer-follow-links"]}>
              <a
                className={styles.footer__link}
                target="_blank"
                rel="noreferrer"
                href="https://twitter.com/EDA_Web3"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                className={styles.footer__link}
                target="_blank"
                rel="noreferrer"
                href="https://t.me/web3onboarding"
                aria-label="Telegram"
              >
                <FaTelegramPlane />
              </a>
              <a
                className={styles.footer__link}
                target="_blank"
                rel="noreferrer"
                href="https://www.facebook.com/web3onboarding"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                className={styles.footer__link}
                target="_blank"
                rel="noreferrer"
                href="https://www.instagram.com/web3onboarding"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>              
              <a
                className={styles.footer__link}
                target="_blank"
                rel="noreferrer"
                href="https://www.pinterest.com/web3onboarding/"
                aria-label="Pinterest"
              >
                <FaPinterest />
              </a>
              <a
                className={styles.footer__link}
                target="_blank"
                rel="noreferrer"
                href="https://www.youtube.com/@web3onboarding/"
                aria-label="Youtube"
              >
                <FaYoutube />
              </a>
            
            </div>
          </div>
        </div>
        <div className={styles["footer-copyright"]}>
          <p>© All rights reserved by Web3 Onboarding 2023</p>
        </div>
      </Footer>
    </Layout>
  );
}
