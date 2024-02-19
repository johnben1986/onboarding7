import React, { useState, useEffect } from "react";
import UAuth from "@uauth/js";
import { useAPI } from "../../hooks/useAPI";
import useWallet from "hooks/useWallet";
import DomainFilter from "components/DomainsFilter/DomainFilter";
import AuthenticatedFragment from "components/Authenticated/AuthenticatedFragment";
import { isUrlFound, setTitle, svgToPng } from "helpers/utils";
import Button from "components/utils/Button";

import ProfileImage from "../../../public/assets/images/png/seller-profile.png";
import BurgerImage from "../../../public/assets/images/svg/hamburger.svg";
import Image from "next/image";

const tabStates = {
  allOwned: "allOwned",
  buyNow: "buyNow",
  leaseNow: "leaseNow",
};


const uauth = new UAuth({
  clientID: "a608ba5e-6f30-4046-8725-68149c137557",
  redirectUri: "https://web3onboarding.com/dashboard",
  scope: "openid wallet email profile:optional social:optional",
});









export default function SellerDashboard({ userId }) {
  const { api } = useAPI();
  const [isDropdownClicked, setIsDropdownClicked] = useState(false);
  const [tabsState, setTabsState] = useState(tabStates.allOwned);
  const [profilePicExists, setProfilePicExists] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const { currentAddress } = useWallet();
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
  console.log(userInfo)
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
    console.log(user);
    if (user.picture != undefined) {
      const svgString = await (await fetch(user.picture)).text();
      user.image = await svgToPng(svgString, 800, 800);
    }

    await api.connectUDAccountInfo({ id: targetUser, UDinfo: user });

    setUDUser(user);
  };

  return (
    <>
      <div className="relative flex w-full flex-col justify-center gap-10 bg-brand-background p-12 md:flex-row">
        <AuthenticatedFragment permission={"users:update"} owner={targetUser}>
          <div className="flex space-x-4 text-center font-brand-tomorrow md:absolute md:top-8 md:right-8 md:text-right">
            <Button
              href={`/users/${
                targetUser === currentAddress ? "me" : targetUser
              }/edit`}
            >
              Edit Profile
            </Button>
            {UDUser ? (
              <Button href={UDUser.profile}>UD profile</Button>
            ) : (
              <Button onClick={() => UDLogin()}>
                Link Unstoppable Domains
              </Button>
            )}
            <Button
              href={`/users/${
                targetUser === currentAddress ? "me" : targetUser
              }/websites`}
            >
              My Websites
            </Button>
          </div>
        </AuthenticatedFragment>

        <Image
          src={
            imgError
              ? ProfileImage
              : `${process.env.NEXT_PUBLIC_IMAGES_URL}/vendors/${targetUser}.png`
          }
          onError={setImgError}
          alt="profile picture"
          className="mx-auto md:mx-0"
          width={287}
          height={287}
        />
        <div className="my-auto w-full space-y-6 break-words text-center font-brand-heading text-lg md:w-3/5 md:text-left">
          <h1 className="text-2xl font-bold">{userInfo?.name}</h1>
          <h2 className="text-lg">Address: {targetUser}</h2>
          <p className="font-brand-tomorrow">{userInfo?.description}</p>
        </div>
      </div>

      <div className="mx-auto w-11/12 text-center lg:w-10/12">
        <div className="my-8 flex w-full gap-6 font-brand-heading text-black">
          <div className="hidden lg:block">{tableTabs}</div>
          <div className="lg:hidden">
            <a
              id="dashboard-dropdown"
              onClick={() => setIsDropdownClicked((prev) => !prev)}
            >
              <Image src={BurgerImage} alt="hamburger" />
            </a>
            <div
              className="bg-brand-blue absolute mt-4 space-y-4 rounded-full p-4 text-left text-lg"
              id="dashboard-dropdown-menu"
              style={
                isDropdownClicked ? { display: "block" } : { display: "none" }
              }
            >
              {tableTabs}
            </div>
          </div>
        </div>
        <DomainFilter initialState={initialState} hideFilters={true} />
      </div>
      
    </>
  );
}
