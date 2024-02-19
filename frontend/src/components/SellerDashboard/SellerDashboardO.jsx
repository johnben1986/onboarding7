import React, { useState, useEffect } from "react";
import UAuth from "@uauth/js";
import { useAPI } from "../../hooks/useAPI";
import useWallet from "hooks/useWallet";
import MyDomain from "components/MyDomain/MyDomain";
import AuthenticatedFragment from "components/Authenticated/AuthenticatedFragment";
import { isUrlFound, setTitle, svgToPng } from "helpers/utils";
import Button from "components/utils/Button";

import ProfileImage from "../../../public/assets/images/png/seller-profile.png";
import BurgerImage from "../../../public/assets/images/svg/hamburger.svg";
import Image from "next/image";

import Link from "next/link";
import web3imgWhite from "/public/assets/images/web3logo-white.png";
import web3img from "/public/assets/images/web3logo-white.png";
import menu from "/public/assets/images/icons/menu.png";
import arrow_right from "/public/assets/images/icons/arrowright.png";
import affiliate from "/public/assets/images/icons/affiliate.png";
import rating from "/public/assets/images/icons/rating.png";
import build from "/public/assets/images/icons/setting.png";
import market from "/public/assets/images/icons/cart.png";
import mint from "/public/assets/images/icons/mint.png";
import list from "/public/assets/images/icons/list.png";
import support from "/public/assets/images/icons/support.png";
import telegram from "/public/assets/images/telegram.png";
import star from "/public/assets/images/star.png";
import site from "/public/assets/images/sites.png";
import user from "/public/assets/images/user.png";
import account from "/public/assets/images/icons/account.png";
import web from "/public/assets/images/icons/home.png";
import beginner from "/public/assets/images/rank/beginner.png";
import diamond from "/public/assets/images/rank/diamond.png";
import feature1 from "/public/assets/images/feature1.png";

import { reactIcons } from "components/utils/icons";
import { FaUserAlt, FaListAlt, FaEdit } from "react-icons/fa";
import { AiOutlineShop } from "react-icons/ai";
import { MdAddCircleOutline } from "react-icons/md";
import { GrAddCircle } from "react-icons/gr";
import Account from "components/Account/Account";
import { Drawer } from "@mui/material";
const domainLinks = [
  {
    name: "Account",
    icon: <FaUserAlt />,
    href: "/profile",
    style: "font-semibold",
  },
  {
    name: "Marketplace",
    icon: <AiOutlineShop />,
    href: "/marketplace",
    style: "",
  },
  {
    name: "Mint UD Domain",
    icon: <MdAddCircleOutline />,
    href: "/marketplace/mint",
    style: "",
  },
  {
    name: "List Domain",
    icon: <FaListAlt />,
    href: "/marketplace/add",
    style: "",
  },
];
const tabStates = {
  allOwned: "allOwned",
  buyNow: "buyNow",
  leaseNow: "leaseNow",
};

const uauth = new UAuth({
  clientID: "a608ba5e-6f30-4046-8725-68149c137557",
  redirectUri: "https://web3onboarding.com/",
  // redirectUri: "https://web3onboarding.com/dashboard",
  scope: "openid wallet email profile:optional social:optional",
});

export default function SellerDashboard({ userId }) {
  const { api } = useAPI();
  const [isDropdownClicked, setIsDropdownClicked] = useState(false);
  const [tabsState, setTabsState] = useState(tabStates.allOwned);
  const [profilePicExists, setProfilePicExists] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const { currentAddress } = useWallet();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const targetUser = userId ? userId : currentAddress;
  const initialState = {
    buyNowListing: tabsState == tabStates.buyNow,
    leaseNowListing: tabsState == tabStates.leaseNow,
    ownedBy: targetUser,
  };
  const [UDUser, setUDUser] = useState(null);
  const [authorization, setAuthorization] = useState(null);
  const [imgError, setImgError] = useState(null);

  useEffect(() => {
    setImgError(null);
  }, []);

  useEffect(() => {
    const getUserInfo = async () => {
      if (targetUser) {
        const res = await api.getUser({ id: targetUser });
        if (res?.result.length > 0) {
          setUserInfo(res.result[0]);
        }
        setTitle(`${res.result[0].name || targetUser} - Profile`);
      }
    };
    getUserInfo();
  }, [targetUser, UDUser, api]);

  console.log(userInfo);
  function shortAddress(address, charsToShow = 6, breakChars = "...") {
    if (!address) return "";
    if (address.length <= charsToShow) return address;
    const halfToShow = charsToShow / 2;
    return `${address.slice(0, halfToShow)}${breakChars}${address.slice(
      -halfToShow
    )}`;
  }
  const tableTabs = (
    <div className="flex flex-col gap-4 text-xl lg:flex-row">
      <div
        className={
          "cursor-pointer " +
          (tabsState == tabStates.allOwned ? "text-brand-primary" : "")
        }
        onClick={() => {
          setTabsState(tabStates.allOwned);
          setIsDropdownClicked(false);
        }}
      >
        All owned domains
      </div>
      <div
        className={
          "cursor-pointer " +
          (tabsState == tabStates.buyNow ? "text-brand-primary" : "")
        }
        onClick={() => {
          setTabsState(tabStates.buyNow);
          setIsDropdownClicked(false);
        }}
      >
        Domains for sale
      </div>
      <div
        className={
          "cursor-pointer " +
          (tabsState == tabStates.leaseNow ? "text-brand-primary" : "")
        }
        onClick={() => {
          setTabsState(tabStates.leaseNow);
          setIsDropdownClicked(false);
        }}
      >
        Domains for Rent
      </div>
    </div>
  );

  useEffect(() => {
    uauth.user().then(setUDUser);
  }, []);

  const UDLogin = async () => {
    const auth = await uauth.loginWithPopup();
    setAuthorization(auth);

    const user = await uauth.user();
    console.log(user.picture, "user picture");
    console.log(user.image, "user image");
    if (user.picture != undefined) {
      const svgString = await (await fetch(user.picture)).text();
      user.image = await svgToPng(svgString, 800, 800);
    }

    await api.connectUDAccountInfo({ id: targetUser, UDinfo: user });

    setUDUser(user);
  };

  return (
    <main className="bg-image4">
      <div className="flex h-screen">
          <sidebar className="bg-image4 z-[9] hidden h-full w-64 border-r border-white text-white md:relative md:block">
            <div className="h-[105px] border-white border-b-2 p-3">
              <Link href="/my1sites">
                <h1 className="underline italic p-10 mx-auto font-semibold text-20 text-center hover:text-white  hover:opacity-50">My 1Site</h1>
              </Link>
          </div>
          
          <div className="h-[calc(100%-105px)] px-6 py-4">
            
              <div className="mb-8">
              <h2 className="text-md mb-3 pb-1 font-light flex-start relative flex h-[30px] items-center whitespace-nowrap px-2 py-1 hover:text-white">
              
                <Image
                  src={menu}
                  width={20}
                  height={20}
                  className="m-auto w-full max-w-[20px] cursor-pointer ay-center left-0"
                  ></Image>
                
                <span className="ml-4">Domains</span>
              </h2>
              
              <h2 className="text-md ml-3 mb-1 pb-1 font-light flex-start relative text-white flex h-[30px] items-center whitespace-nowrap px-2 py-1 hover:text-white  hover:opacity-50">
                <div>
                <Image
                  src={arrow_right}
                  width={20}
                  height={20}
                  className="m-auto w-full max-w-[20px] cursor-pointer ay-center left-0"
                ></Image>
                    <span className="ml-4">Owned Domains</span></div>
              </h2>

              <h2 className="text-md ml-3 mb-1 pb-1 font-light flex-start relative flex h-[30px] items-center whitespace-nowrap px-2 py-1 hover:text-white  hover:opacity-50">
              <div                 className={
                  "cursor-pointer " 
                }
                onClick={() => {
                  setTabsState(tabStates.allOwned);
                  setIsDropdownClicked(false);
                }}>
                <Image
                  src={arrow_right}
                  width={20}
                  height={20}
                  className="m-auto w-full max-w-[20px] cursor-pointer ay-center left-0"
                ></Image>
                  <span className="ml-4">Domains on Marketplace</span>
                  </div>
              </h2>
              
              {/* TLD's */}
              <h2 className="text-md mb-3 pb-1 font-light flex-start relative flex h-[30px] items-center whitespace-nowrap px-2 py-1 hover:text-white">
                <Image
                  src={menu}
                  width={20}
                  height={20}
                  className="m-auto w-full max-w-[20px] cursor-pointer ay-center left-0"
                ></Image>
                <span className="ml-4">TLD's</span>
              </h2>
              
              <h2 className="text-md ml-3 mb-1 pb-1 font-light flex-start relative flex h-[30px] items-center whitespace-nowrap px-2 py-1 hover:text-white  hover:opacity-50">
                <Link href="#">
                <Image
                  src={arrow_right}
                  width={20}
                  height={20}
                  className="m-auto w-full max-w-[20px] cursor-pointer ay-center left-0"
                ></Image> 
                <span className="ml-4">Owned TLD's</span></Link>
              </h2>
              <h2 className="text-md ml-3 mb-1 pb-1 font-light flex-start relative flex h-[30px] items-center whitespace-nowrap px-2 py-1 hover:text-white  hover:opacity-50">
              <Link href="/marketplace/tlds">
                <Image
                  src={arrow_right}
                  width={20}
                  height={20}
                  className="m-auto w-full max-w-[20px] cursor-pointer ay-center left-0"
                ></Image>
                <span className="ml-4">TLD's on Marketplace</span></Link>
              </h2>
              {/* Domains List */}
              <div className="h-[10px] w-[232px] border-b border-white p-2"></div>
               {/* My Content */}

              {/* <h2 className="text-md mt-3 mb-3 pb-1 font-light flex-start relative flex h-[30px] items-center whitespace-nowrap px-2 py-1 hover:text-white hover:opacity-50">
              <Link href="#">
                <Image
                  src={menu}
                  width={20}
                  height={20}
                  className="m-auto w-full max-w-[20px] cursor-pointer ay-center left-0"
                ></Image>
                <span className="ml-4">My Content</span></Link>
              </h2> */}
              <h2 className="text-md mb-3 ml-3 pb-1 font-light flex-start relative flex h-[30px] items-center whitespace-nowrap px-2 py-1 hover:text-white hover:opacity-50 mt-2">
              <Link href="#">
                <Image
                  src={star}
                  width={20}
                  height={20}
                  className="m-auto w-full max-w-[20px] cursor-pointer ay-center left-0"
                ></Image>
                <span className="ml-4">Featured</span></Link>
              </h2>
              <h2 className="text-md mb-3 ml-3 pb-1 font-light flex-start relative flex h-[30px] items-center whitespace-nowrap px-2 py-1 hover:text-white hover:opacity-50 mt-2">
              <Link href="/myaffiliates">
                <Image
                  src={affiliate}
                  width={20}
                  height={20}
                  className="m-auto w-full max-w-[20px] cursor-pointer ay-center left-0"
                ></Image>
                <span className="ml-4">My Affiliate</span></Link>
              </h2>
              <h2 className="text-md mb-3 pb-1 ml-3 font-light flex-start relative flex h-[30px] items-center whitespace-nowrap px-2 py-1 hover:text-white hover:opacity-50">
              <Link href="#">
                <Image
                  src={rating}
                  width={20}
                  height={20}
                  className="m-auto w-full max-w-[20px] cursor-pointer ay-center left-0"
                ></Image>
                <span className="ml-4">My Reviews</span></Link>
              </h2>
              <h2 className="text-md mb-3 pb-1 ml-3 font-light flex-start relative flex h-[30px] items-center whitespace-nowrap px-2 py-1 hover:text-white hover:opacity-50 mt-2">
              <Link href="#">
                <Image
                  src={site}
                  width={20}
                  height={20}
                  className="m-auto w-full max-w-[20px] cursor-pointer ay-center left-0"
                ></Image>
                <span className="ml-4">My 1Sites</span></Link>
              </h2>
              <div className="h-[10px] w-[232px] border-b border-white p-2"></div>

              <h2 className="text-md mb-3 pb-1 ml-[10px] mt-2 font-light flex-start relative flex h-[30px] items-center whitespace-nowrap px-2 py-1 hover:text-white hover:opacity-50">
              <Link href="/quickbuild">
                <Image
                  src={build}
                  width={20}
                  height={20}
                  className="m-auto w-full max-w-[20px] cursor-pointer ay-center left-0"
                ></Image>
                <span className="ml-4">Leave a Review</span></Link>
              </h2>
              <h2 className="text-md ml-[10px] mb-3 pb-1 font-light flex-start relative flex h-[30px] items-center whitespace-nowrap px-2 py-1 hover:text-white hover:opacity-50">
              <Link href="/marketplace">
                <Image
                  src={market}
                  width={20}
                  height={20}
                  className="m-auto w-full max-w-[20px] cursor-pointer ay-center left-0"
                ></Image>
                <span className="ml-4">Marketplace</span></Link>
              </h2>
              <h2 className="text-md ml-[10px] mb-3 pb-1 font-light flex-start relative flex h-[30px] items-center whitespace-nowrap px-2 py-1 hover:text-white hover:opacity-50">
              <Link href="/marketplace/mint">
                <Image
                  src={mint}
                  width={20}
                  height={20}
                  className="m-auto w-full max-w-[20px] cursor-pointer ay-center left-0"
                ></Image>
                <span className="ml-4">Mint a Domain</span></Link>
              </h2>
              <h2 className="text-md ml-[10px] mb-3 pb-1 font-light flex-start relative flex h-[30px] items-center whitespace-nowrap px-2 py-1 hover:text-white hover:opacity-50">
              <Link href="/marketplace/add">
                <Image
                  src={list}
                  width={20}
                  height={20}
                  className="m-auto w-full max-w-[20px] cursor-pointer ay-center left-0"
                ></Image>
                <span className="ml-4">List an Asset</span></Link>
              </h2>

              <div className="h-[10px] w-[232px] border-b border-white"></div>

              <h2 className="mt-2 ml-[10px] text-md mb-3 pb-1 font-light flex-start relative flex h-[30px] items-center whitespace-nowrap px-2 py-1 hover:text-white hover:opacity-50">
              <Link href="#">
                <Image
                  src={support}
                  width={20}
                  height={20}
                  className="m-auto w-full max-w-[20px] cursor-pointer ay-center left-0"
                ></Image>
                <span className="ml-4">Help & Support</span></Link>
              </h2>

            </div>
            </div>
        </sidebar>
        
         {/* MOBILE VIEW*/}
        <div className="w-full flex-1">
          <header className="flex h-auto p-3 text-white md:h-[105px] md:p-4">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-0 md:flex-row">
              <div className="flex w-full items-center justify-between space-x-2 md:w-auto">
              <div className="flex-center md:hidden">
                  <button
                    className="text-24 md:hidden"
                    onClick={() => setIsDrawerOpen(true)}
                  >
                    {reactIcons.menu}
                  </button>
                  <Drawer
                    anchor="left"
                    PaperProps={{
                      style: {
                        width: "70%",
                        backgroundColor: "black",
                      },
                    }}
                    open={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                    className="md:hidden"
                  >
                    
                    <sidebar className="bg-image4 relative z-[9] h-full border-r border-white text-white">
                      <div className="h-[105px] border-b border-white p-3">
                        <Link href="#">
                          <Image
                            src={web3img}
                            alt=""
                            width={150}
                            height={150}
                            className="m-auto w-full max-w-[150px] cursor-pointer"
                          ></Image>
                        </Link>
                      </div>
                      <div className="h-[calc(100%-105px)] px-6 py-4">
                        <div className="mb-8">
                         
                          
                        <div className="h-[calc(100%-105px)] px-6 py-4">
            
            <div className="mb-8">
              <h2 className="text-md mb-3 pb-1 font-light flex-start relative flex h-[30px] items-center whitespace-nowrap px-2 py-1 hover:text-white">
              <Image
                src={menu}
                width={20}
                height={20}
                className="m-auto w-full max-w-[20px] cursor-pointer ay-center left-0"
              ></Image>
              <span className="ml-4">Domains</span>
            </h2>
            
            <h2 className="text-md ml-3 mb-1 pb-1 font-light flex-start relative flex h-[30px] items-center whitespace-nowrap px-2 py-1 hover:text-white  hover:opacity-50">
              <Link href="#">
              <Image
                src={arrow_right}
                width={20}
                height={20}
                className="m-auto w-full max-w-[20px] cursor-pointer ay-center left-0"
              ></Image>
              <span className="ml-4">Owned Domains</span></Link>
            </h2>

            <h2 className="text-md ml-3 mb-1 pb-1 font-light flex-start relative flex h-[30px] items-center whitespace-nowrap px-2 py-1 hover:text-white  hover:opacity-50">
            <Link href="/marketplace">
              <Image
                src={arrow_right}
                width={20}
                height={20}
                className="m-auto w-full max-w-[20px] cursor-pointer ay-center left-0"
              ></Image>
              <span className="ml-4">Domains on Marketplace</span></Link>
            </h2>
            
            {/* TLD's */}
            <h2 className="text-md mb-3 pb-1 font-light flex-start relative flex h-[30px] items-center whitespace-nowrap px-2 py-1 hover:text-white">
              <Image
                src={menu}
                width={20}
                height={20}
                className="m-auto w-full max-w-[20px] cursor-pointer ay-center left-0"
              ></Image>
              <span className="ml-4">TLD's</span>
            </h2>
            
            <h2 className="text-md ml-3 mb-1 pb-1 font-light flex-start relative flex h-[30px] items-center whitespace-nowrap px-2 py-1 hover:text-white  hover:opacity-50">
              <Link href="#">
              <Image
                src={arrow_right}
                width={20}
                height={20}
                className="m-auto w-full max-w-[20px] cursor-pointer ay-center left-0"
              ></Image> 
              <span className="ml-4">Owned TLD's</span></Link>
            </h2>
            <h2 className="text-md ml-3 mb-1 pb-1 font-light flex-start relative flex h-[30px] items-center whitespace-nowrap px-2 py-1 hover:text-white  hover:opacity-50">
            <Link href="/marketplace/tlds">
              <Image
                src={arrow_right}
                width={20}
                height={20}
                className="m-auto w-full max-w-[20px] cursor-pointer ay-center left-0"
              ></Image>
              <span className="ml-4">TLD's on Marketplace</span></Link>
            </h2>
            {/* Domains List */}
            <div className="h-[10px] w-[232px] border-b border-white p-2"></div>
             {/* My Content */}

            {/* <h2 className="text-md mt-3 mb-3 pb-1 font-light flex-start relative flex h-[30px] items-center whitespace-nowrap px-2 py-1 hover:text-white hover:opacity-50">
            <Link href="#">
              <Image
                src={menu}
                width={20}
                height={20}
                className="m-auto w-full max-w-[20px] cursor-pointer ay-center left-0"
              ></Image>
              <span className="ml-4">My Content</span></Link>
            </h2> */}
            <h2 className="text-md mb-3 pb-1 font-light flex-start relative flex h-[30px] items-center whitespace-nowrap px-2 py-1 hover:text-white hover:opacity-50 mt-2">
            <Link href="#">
              <Image
                src={star}
                width={20}
                height={20}
                className="m-auto w-full max-w-[20px] cursor-pointer ay-center left-0"
              ></Image>
              <span className="ml-4">Featured</span></Link>
            </h2>
            <h2 className="text-md mb-3 pb-1 font-light flex-start relative flex h-[30px] items-center whitespace-nowrap px-2 py-1 hover:text-white hover:opacity-50 mt-2">
            <Link href="#">
              <Image
                src={affiliate}
                width={20}
                height={20}
                className="m-auto w-full max-w-[20px] cursor-pointer ay-center left-0"
              ></Image>
              <span className="ml-4">My Affiliate</span></Link>
            </h2>
            <h2 className="text-md mb-3 pb-1 font-light flex-start relative flex h-[30px] items-center whitespace-nowrap px-2 py-1 hover:text-white hover:opacity-50">
            <Link href="#">
              <Image
                src={rating}
                width={20}
                height={20}
                className="m-auto w-full max-w-[20px] cursor-pointer ay-center left-0"
              ></Image>
              <span className="ml-4">My Reviews</span></Link>
            </h2>
            <h2 className="text-md mb-3 pb-1 font-light flex-start relative flex h-[30px] items-center whitespace-nowrap px-2 py-1 hover:text-white hover:opacity-50 mt-2">
              <Link href="#">
                <Image
                  src={site}
                  width={20}
                  height={20}
                  className="m-auto w-full max-w-[20px] cursor-pointer ay-center left-0"
                ></Image>
                <span className="ml-4">My 1Sites</span></Link>
              </h2>
            <div className="h-[10px] w-[232px] border-b border-white p-2"></div>

            <h2 className="text-md mb-3 pb-1 ml-[10px] mt-2 font-light flex-start relative flex h-[30px] items-center whitespace-nowrap px-2 py-1 hover:text-white hover:opacity-50">
            <Link href="/quickbuild">
              <Image
                src={build}
                width={20}
                height={20}
                className="m-auto w-full max-w-[20px] cursor-pointer ay-center left-0"
              ></Image>
              <span className="ml-4">Leave a Review</span></Link>
            </h2>
            <h2 className="text-md ml-[10px] mb-3 pb-1 font-light flex-start relative flex h-[30px] items-center whitespace-nowrap px-2 py-1 hover:text-white hover:opacity-50">
            <Link href="/marketplace">
              <Image
                src={market}
                width={20}
                height={20}
                className="m-auto w-full max-w-[20px] cursor-pointer ay-center left-0"
              ></Image>
              <span className="ml-4">Marketplace</span></Link>
            </h2>
            <h2 className="text-md ml-[10px] mb-3 pb-1 font-light flex-start relative flex h-[30px] items-center whitespace-nowrap px-2 py-1 hover:text-white hover:opacity-50">
            <Link href="/marketplace/mint">
              <Image
                src={mint}
                width={20}
                height={20}
                className="m-auto w-full max-w-[20px] cursor-pointer ay-center left-0"
              ></Image>
              <span className="ml-4">Mint a Domain</span></Link>
            </h2>
            <h2 className="text-md ml-[10px] mb-3 pb-1 font-light flex-start relative flex h-[30px] items-center whitespace-nowrap px-2 py-1 hover:text-white hover:opacity-50">
            <Link href="marketplace/add">
              <Image
                src={list}
                width={20}
                height={20}
                className="m-auto w-full max-w-[20px] cursor-pointer ay-center left-0"
              ></Image>
              <span className="ml-4">List an Asset</span></Link>
            </h2>

            <div className="h-[10px] w-[232px] border-b border-white"></div>

            <h2 className="mt-2 ml-[10px] text-md mb-3 pb-1 font-light flex-start relative flex h-[30px] items-center whitespace-nowrap px-2 py-1 hover:text-white hover:opacity-50">
            <Link href="#">
              <Image
                src={support}
                width={20}
                height={20}
                className="m-auto w-full max-w-[20px] cursor-pointer ay-center left-0"
              ></Image>
              <span className="ml-4">Help & Support</span></Link>
            </h2>

                            </div>
                            </div>
                          
                {/* {domainLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex-start relative flex h-[30px] items-center whitespace-nowrap px-2 py-1 hover:text-white hover:opacity-50 ${item.style}`}
                  >
                    <span className="ay-center left-0">{item.icon}</span>
                    <span className="ml-4">{item.name}</span>
                  </Link>
                ))}
                          
                <AuthenticatedFragment
                  permission={"users:update"}
                  owner={targetUser}
                >
                  <Link
                    href={`/users/${
                      targetUser === currentAddress ? "me" : targetUser
                    }/edit`}
                    className="flex-start relative flex h-[30px] items-center whitespace-nowrap px-2 py-1 hover:text-white hover:opacity-50"
                  >
                    <span className="ay-center left-0">
                      <FaEdit />
                    </span>
                    <span className="ml-4">Edit Profile</span>
                  </Link>
                </AuthenticatedFragment> */}
                          
              </div>
                      </div>
                    </sidebar>
                  </Drawer>
                </div>
              </div>
            </div>
          </header>

          <div className="h-[calc(100%-81px)] overflow-auto -mt-20"  id="scrrolledDiv">
            <div className="flex">
              <div className="mx-0 md:mx-4 mb-5 flex w-[100%] md:w-[100%] items-center border-b-2 border-white py-3 px-20">
                <div className="w-[100px] md:w-[200px] ml-20">
                  <Image
                    //src={userInfo.image ? userInfo.image : `${process.env.NEXT_PUBLIC_IMAGES_URL}/vendors/${targetUser}.png`}
                    src={userInfo.image ? userInfo.image : user}
                      onError={setImgError}
                      alt="profile picture"
                      className="mx-auto md:mx-0 w-[200px] h-[200px] object-contain bg-white shadow-sm rounded-full"
                      width={200}
                      height={200}
                  />
                  
                  {/* <div className="h-[30px] w-[30px] mt-2 mx-auto">
                        <Image
                        src={diamond}
                        width={30}
                        height={30}
                        className="h-[30px] w-[30px] object-center shadow-inner shadow-2xl shadow-blue-200/50"
                        />
                    </div>
                    <p className="pt-2 text-center text-white lg:pt-2">
                      Diamond Rank
                  </p> */}
                  
                </div>
                <div className="w-[50px)] mx-auto">
                  {/* socaial icon */}
                  <div className="mb-3 flex items-center justify-center gap-2 md:gap-4">
                    {userInfo?.telegram && (
                      <Link href={`${userInfo?.telegram}`}>
                        <Image
                          className="w-8 xl:w-10 3xl:w-12"
                          src={telegram}
                          width={80}
                          height={80}
                        />
                      </Link>
                    )}
                    {userInfo?.twitter && (
                      <Link href={`${userInfo?.twitter}`}>
                        <Image
                          className="w-8 xl:w-10 3xl:w-12"
                          src={"/assets/images/twitter.png"}
                          width={80}
                          height={80}
                        />
                      </Link>
                    )}
                    {userInfo?.linkedin && (
                      <Link href={`${userInfo?.linkedin}`}>
                        <Image
                          className="w-8 xl:w-10 3xl:w-12"
                          src={"/assets/images/linkedin.png"}
                          width={80}
                          height={80}
                        />
                      </Link>
                    )}
                    {userInfo?.instagram && (
                      <Link href={`${userInfo?.instagram}`}>
                        <Image
                          className="w-8 xl:w-10 3xl:w-12"
                          src={"/assets/images/instagram.png"}
                          width={80}
                          height={80}
                        />
                      </Link>
                    )}
                  </div>
                  {/* Description */}
                  <h3 className="text-2xl text-white text-center">{userInfo?.description}</h3>
                </div>
              </div>
            </div>
            {/* {tableTabs} */}
            {/* <DomainFilter initialState={initialState} hideFilters={true} /> */}

            {/* Fetaured */}
            <div className="pt-5">
                <div className="mx-auto w-11/12 text-center lg:w-10/12">
          <MyDomain initialState={initialState} hideFilters={true} />
                    </div>
                            {/* <div className="grid grid-cols-3 gap-3 pt-5">
                                {Array(2).fill(2).map((_item, index) => (
                                    <div className="col-span-1">
                                        <div className="rounded-lg overflow-hidden border">
                                            <div className="h-[250px] bg-primary-1000 border-b-2">
                                                <Image
                                                  src={feature1}
                                                  alt=""
                                                  width={300}
                                                  height={300}
                                                  className="m-auto w-full cursor-pointer"
                                                ></Image>
                                            </div>
                                            <div className="p-3 px-4">
                                                <h3 className='tex'>Title:</h3>
                                                <div className="pt-8 grid grid-cols-2 gap-1 justify-between">
                                                    <div className="col-span-1"><h4 className='text-[#CED6FF] text-18'>TLD/DOMAIN</h4></div>
                                                    <div className="col-span-1"><h4 className='text-[#CED6FF] text-18'>Price</h4></div>
                                                </div>
                                                <div className="grid grid-cols-2 pt-4">
                                                    <div className="col-span-1 flex items-center gap-1 text-[#CED6FF]"><span className='text-[#E8AFF6]'>{reactIcons.person}</span>by USER</div>
                                                    <div className="col-span-1 flex items-center gap-1 text-[#CED6FF]"><span className='text-[#E8AFF6]'>{reactIcons.tag}</span>Category</div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </div> */}
                      </div>
          </div>
        </div>
      </div>
    </main>
  );
}
