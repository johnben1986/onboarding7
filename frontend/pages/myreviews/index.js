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

const Myreviews = () => {
  return (
    <>
      <main className="bg-image3 min-h-screen text-white">
        <MetadataHelper noindex title="Write a Review" />
        <div className="flex-center min-h-[calc(100vh-70px)] lg:min-h-[calc(100vh-100px)]">
          <div className="container max-w-[1100px] py-5 border-2 border-slate-500 rounded-lg bg-primary-newBgColor2/40">
                      <div className="text-20 lg:text-30 mx-auto text-center p-3 font-bold">Write a Review</div>
                      <div className="border-b-2 border-white w-[350px] mx-auto"></div>

            <div className="border-2 border-gray-400 rounded-lg p-5 mt-5 w-[550px] mx-auto">
                <h3 className="text-start text-18 font-semibold text-white">Username: John</h3><br/>
                <form>         
                              <div class="mb-4 mt-2">
                              {/* <h3 className="text-start text-15 text-white">Reviews:</h3><br/> */}
                  <textarea  class="shadow appearance-none border rounded w-[310px] lg:w-full h-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="url" placeholder="Enter your review here" />      
                  {/* <div className="p-2 h-[50px] w-[50px]">
                    <Link href="">
                    <Image
                      src={copy}
                    />
                    </Link>
                  </div> */}
                  </div>
                </form>              
            </div>

            <div className="container max-w-[1200px] lg:mt-0">
                          <div className="text-20 lg:text-18 mx-auto text-center p-5 font-semibold">
                              <button className=" italic underline underline-offset-1">Submit Review</button></div>
            
            </div>
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default Myreviews;
// export default withAuth(AboutUs);
