import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import user from "/public/assets/images/user.png";
import b2b from "/public/assets/images/b2b.webp";
import cryptoRamp from "/public/assets/images/crypto-ramp.webp";
import learn from "/public/assets/images/learn.webp";
import marketplace from "/public/assets/images/marketplace.png";
import priority from "/public/assets/images/priority.webp";
import quickBuild from "/public/assets/images/quickbuild.webp";
import react from "/public/assets/images/react.png";
import review from "/public/assets/images/review.webp";
import wallet from "/public/assets/images/wallet.webp";
import lock from "/public/assets/images/lock.webp";
import ipfs from "/public/assets/images/ipfs-new.png";


import beginner from "/public/assets/images/rank/beginner.png";

import { useRouter } from "next/router";

import UAuth from "@uauth/js";
import { useAPI } from "../../src/hooks/useAPI";
import useWallet from "hooks/useWallet";
import { withAuth } from "components/Auth/authMiddleware";

import { reactIcons } from "components/utils/icons";
const Profile = () => {
    const { api } = useAPI();
    const router = useRouter();
    const { userId } = router.query;

    const {
      currentAddress,
      getContract,
      sendContractTransaction,
      signTypedData,
      wrapWalletFlow,
  } = useWallet();

    const [userInfo, setUserInfo] = useState({});
    // const { currentAddress } = useWallet();
    const targetUser = userId ? userId : currentAddress;
    const [UDUser, setUDUser] = useState(null);
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
            }
        };
        getUserInfo();
    }, [targetUser, UDUser, api]);
    console.log(userInfo);

  // **************

  return (
    <>
 {/* packages and pricing  */}
 <section
          id="pricing"
          className="panel bg-image3 section-center flex-center scroll-span-align"
        >
          <div className="container max-w-[1000px]">
            {/* <h1 className="heading-4 text-center text-white">
              Membership Packages and Pricing
            </h1>
            <p className="pt-4 text-center font-semibold text-white">
              Free consultation on deciding which package suits you best
            </p> */}
          <div className="grid grid-cols-1 items-stretch md:grid-cols-2 mt-10 mb-10">
            
          <div className="md:col-span-1 overflow-hidden rounded-l-xl border-r-2 border-white">
                <div className="flex h-full flex-col justify-between overflow-hidden rounded-l-xl bg-primary-newBgColor/50 py-2 px-4  lg:py-6">
                  <div className="">
                    <h4 className="lg:heading-6 text-center lg:text-15 text-white text-clip-auto">
                    {`Welcome:  ${userInfo.name}`}
                    </h4><br/>
                    {/* <div className="h-[30px] w-[30px] mx-auto">
                        <Image
                        src={beginner}
                        width={30}
                        height={30}
                        className="h-[30px] w-[30px] object-center shadow-inner shadow-2xl shadow-blue-200/50"
                        />
                    </div> */}
                    {/* <p className="pt-2 text-center text-white lg:pt-2">
                      Beginner Rank
                    </p> */}
                    <br/>
                    <div className="">              
                    <Image
                      // src={userInfo.image ? userInfo.image : `${process.env.NEXT_PUBLIC_IMAGES_URL}/vendors/${targetUser}.png`}
                      src={userInfo.image ? userInfo.image : user}
                      onError={setImgError}
                      alt="profile picture"
                      className="mx-auto object-center rounded-full shadow-2xl shadow-blue-200/50"
                      width={200}
                      height={200}
                                      />  
                     </div>                  
                  </div>
                  <br/>
                {/* <div className="w-[300px] h-[50px]"> */}
                    <a
                      href="/users/me"
                      className="w-[250px] mx-auto text-center rounded-full px-5 py-5 pl-9 text-18 text-blue-400 font-bold bg-primary-newBgColor/90 mt-8 hover:text-white hover:opacity-50"
                    >
                     My Profile
                    </a>
                  {/* </div> */}
                </div>
            </div>
            
              <div className="md:col-span-1 overflow-hidden rounded-r-xl border-l-1 border-white">
                          <div className="flex h-full flex-col justify-between overflow-hidden rounded-r-xl bg-primary-newBgColor/50 py-2 px-4  lg:py-6">
                
                    <div className="mx-auto w-full max-w-[250px] mt-2">
                        <a
                        href="/mydomains"
                        className="flex w-full text-center rounded-lg px-8 py-5 pl-5 text-14 text-blue-400 lg:text-18 font-bold bg-primary-newBgColor/90 hover:text-white hover:opacity-50"
                        >
                    My Domains
                    <span className="text-20 lg:text-26 text-white ml-14">
                                    {reactIcons.plus}
                                </span>
                  </a>
                    </div>
                              
                    <div className="mx-auto w-full max-w-[250px] mt-2">
                        <a
                        href="/mytlds"
                        className="flex w-full text-center rounded-lg px-8 py-5 pl-5 text-14 text-violet-500 lg:text-18 font-bold bg-primary-newBgColor/90 hover:text-white hover:opacity-50"
                        >
                    My TLD's
                    <span className="text-20 lg:text-26 text-white ml-14 pl-6">
                                    {reactIcons.plus}
                                </span>
                        </a>
                    </div>
                              
                    <div className="mx-auto w-full max-w-[250px] mt-2">
                        <a
                        href="/myaffiliates"
                        className="flex w-full text-center rounded-lg px-8 py-5 pl-5 text-14 text-blue-400 lg:text-18 font-bold bg-primary-newBgColor/90 hover:text-white hover:opacity-50"
                        >
                    My Affiliate Link
                    <span className="text-20 lg:text-26 text-white ml-5">
                                    {reactIcons.plus}
                                </span>
                        </a>
                              </div>
                              {/* <div className="mx-auto w-full max-w-[250px] mt-2"> */}
                        {/* <a
                        href="#benefit"
                        className="flex w-full text-center rounded-full px-8 py-5 pl-5 text-14 text-violet-500 lg:text-15 bg-primary-newBgColor/90 hover:text-white hover:opacity-50"
                        >
                        Created Content
                        </a> */}
                              {/* </div> */}
                              <div className="mx-auto w-full max-w-[250px] mt-2">
                        <a
                        href="/my1sites"
                        className="flex w-full text-center rounded-lg px-8 py-5 pl-5 text-14 text-blue-400 lg:text-18 font-bold bg-primary-newBgColor/90 hover:text-white hover:opacity-50"
                        >
                    My 1Sites
                    <span className="text-20 lg:text-26 text-white ml-14 pl-5">
                                    {reactIcons.plus}
                                </span>
                        </a>
                              </div>
                              <div className="mx-auto w-full max-w-[250px] mt-2">
                        <a
                        href="/myreviews"
                        className="flex w-full text-center rounded-lg px-8 py-5 pl-20 text-14 text-white-300 lg:text-18 font-bold bg-primary-newBgColor/90 hover:text-white hover:opacity-50"
                        >
                        User Reviews
                        </a>
                    </div>
                              
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  );
};

export default withAuth(Profile);
