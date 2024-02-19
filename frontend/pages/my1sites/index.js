import Image from "next/image";
import React from "react";
import sheldon from "/public/assets/images/sheldon.png";
import jacob from "/public/assets/images/jacob.png";
import ryno from "/public/assets/images/ryno.png";
import lisa from "/public/assets/images/lisa.png";
import luciano from "/public/assets/images/luciano.png";
import linkedin from "/public/assets/images/linkedin.png";
import twitter from "/public/assets/images/twitter.png";
import Link from "next/link";
import Navbar from "components/Layout/Navbar";
import Footer from "components/Layout/Footer";
import { withAuth } from "components/Auth/authMiddleware";
import MetadataHelper from "components/MetadataHelper";

const My1sites = () => {
  const personList = [
    {
      img: sheldon,
      post: "President & Co-Founder",
      name: "Sheldon B",
      gmail: "manager@web3onboarding.com",
      linkedin: "https://www.linkedin.com/in/sheldon-benson-485735249/",
      twitter: "https://twitter.com/Sheldon_Web3"
    },
    {
      img: jacob,
      post: "CEO & Co-Founder",
      name: "Jacob B",
      gmail: "jake@web3onboarding.com",
      linkedin: "https://www.linkedin.com/in/jacob-benson-3b395a283/",
      twitter: "https://twitter.com/Jacob_Web3"
    },
    {
      img: ryno,
      post: "Chief of Operations",
      name: "Ryno V",
      gmail: "ryno@web3onboarding.com",
      linkedin: "https://www.linkedin.com/in/ryno-van-der-walt/",
      twitter: "https://twitter.com/Ryno_Web3"
    },
    // {
    //   img: luciano,
    //   post: "Developer",
    //   name: "Luciano B",
    //   gmail: "dev@web3onboarding.com",
    //   linkedin: "",
    //   twitter: ""
    // },
    {
      img: lisa,
      post: "Chief Financial Officer",
      name: "Lisa K",
      gmail: "info@web3onboarding.com",
      linkedin: "",
      twitter: ""
    },
  ];
  return (
    <>
      <main className="bg-image3 min-h-screen text-white">
        <MetadataHelper noindex title="My 1Sites" />
        <div className="flex-center min-h-[calc(100vh-70px)] lg:min-h-[calc(80vh-200px)]">
          <div className="container max-w-[1100px] py-5 border-2 border-slate-500 rounded-lg bg-primary-newBgColor2/40">
                      <div className="text-20 lg:text-30 mx-auto text-center p-3 font-bold">My 1Sites</div>
                      <div className="border-b-2 border-white w-[350px] mx-auto"></div>

            <div className="border-2 border-gray-400 rounded-lg p-5 mt-5 w-[290px] lg:w-[450px] mx-auto">
                <h3 className="text-center text-20 lg:text-30 font-semibold text-sky-500">My Featured 1Site</h3>
                <form>         
                <div class="mb-4 mt-2">
                              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="url" type="text" placeholder="Enter URL Here"/>      
                              </div>
                </form>              
            </div>

            <div className="container max-w-[1200px] lg:mt-0">
                <div className="text-20 lg:text-20 mx-auto text-center p-5 font-semibold italic underline underline-offset-1">Created 1Sites</div>
                <div
                className="h-[calc(100%-81px)] overflow-auto p-5"
                id="scrrolledDiv">
                
                <div className="m-auto">
                                  <div className="flex justify-center gap-0 lg:gap-20 px-10 mt-5 px-5">
                                  <p className="text-center text-gray-400 mt-2 text-xl">No 1Site</p> 
                        {/* <a href="/1site/1site" className="px-15 py-5 text-center rounded-full text-white border-gray-500 lg:text-15 bg-primary-newBgColor2/40 hover:text-white hover:opacity-50 border-2">
                            ako.unstoppable
                        </a>
                        <a href="/affiliate" className="text-center rounded-full text-xs text-black lg:text-15 bg-primary-newBgColor2/40 hover:text-gray hover:opacity-50 border-b-2 border-black">
                            ikaw.unstoppable
                        </a> */}
                    </div>
                </div>
            </div>
            
            </div>
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default My1sites;
// export default withAuth(AboutUs);
