import Image from "next/image";
import React from "react";
import copy from "/public/assets/images/copy.png";
import luciano from "/public/assets/images/luciano.png";
import linkedin from "/public/assets/images/linkedin.png";
import twitter from "/public/assets/images/twitter.png";
import Navbar from "components/Layout/Navbar";
import Footer from "components/Layout/Footer";
import { withAuth } from "components/Auth/authMiddleware";
import { reactIcons } from "components/utils/icons";
import MetadataHelper from "components/MetadataHelper";
import Link from "next/link";

const Myaffiliate = () => {
  return (
    <>
      <main className="bg-image3 min-h-screen text-white">
        <MetadataHelper noindex title="My Affiliates" />
        <div className="flex-center min-h-[calc(100vh-70px)] lg:min-h-[calc(80vh-200px)]">
          <div className="container max-w-[1100px] py-5 border-2 border-slate-500 rounded-lg bg-primary-newBgColor2/40">
                      <div className="text-20 lg:text-30 mx-auto text-center p-3 font-bold">My Affiliate Link</div>
                      <div className="border-b-2 border-white w-[350px] mx-auto"></div>

            <div className="border-2 border-gray-400 rounded-lg p-5 mt-5 w-[450px] mx-auto">
                <h3 className="text-center text-30 font-semibold text-sky-500"></h3>
                <form>         
                  <div class="mb-4 mt-2 flex">
                  <input class="shadow appearance-none border rounded w-[290px] lg:w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="url" type="text" placeholder="Enter URL Here" />      
                  <div className="p-2 h-[50px] w-[50px]">
                    <Link href="">
                    <Image
                      src={copy}
                    />
                    </Link>
                  </div>
                  </div>
                </form>              
            </div>

            <div className="container max-w-[1200px] lg:mt-0">
                <div className="text-20 lg:text-18 mx-auto text-center p-5 font-semibold">Get Affiliate Referral Link - Get Marketing Materials - Manage Your Success</div>
                <div
                className="h-[calc(100%-81px)] overflow-auto p-5"
                id="scrrolledDiv">
                
                <div className="m-auto">
                                  <div className="flex justify-center gap-0 lg:gap-20 px-10 mt-2 px-5">
                                  <p className="text-center text-white mt-2 text-3xl italic underline underline-offset-1">1site.tapfiliate.com</p> 
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

export default Myaffiliate;
// export default withAuth(AboutUs);
