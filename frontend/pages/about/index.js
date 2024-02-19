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

const AboutUs = () => {
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
      <main className="bg-image4 min-h-screen text-white">
        <MetadataHelper noindex title="About" />
        {/* <Navbar title="About Us" /> */}
        <div className="flex-center min-h-[calc(100vh-70px)] lg:min-h-[calc(100vh-100px)]">
          <div className="container max-w-[1100px] py-5">

            <div className="border-2 border-white rounded-lg p-5">
              <h3 className="text-center text-22 font-semibold">Who Are We?</h3>
              <p className="pt-4 text-center text-20 lg:pt-8">
                We are a team of individuals passionate about Web3 and eager to
                help people create immense value from this brave new world. To
                accomplish this, we are creating solutions that accelerate the
                adoption of Web3 domains and other digital assets.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 pt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:pt-8">
              {personList.map((item, index) => (
                <div key={index} className="col-span-1 overflow-hidden rounded-2xl border bg-primary-newBgColor/40">
                
                    <div className="relative h-60 bg-white">
                      <Image src={item.img} fill className="object-cover" />
                    </div>
                    <div className="p-3">
                      <p className="text-14">{item.post}</p>
                      <h4 className="text-22 font-semibold">{item.name}</h4>
                      <p className="pt-3 text-12">{item.gmail}</p>
                      <div className="flex-center gap-3 pt-3">
                        {item.linkedin === "" ? '' :  (
                          <Link href={item.linkedin}>
                          {" "}
                          <Image src={linkedin} className="w-[40px]" />
                        </Link>
                        )}
                        
                       {(item.twitter === "" ? '' : <Link href={item.twitter}>
                          {" "}
                          <Image src={twitter} className="w-[40px]" />
                        </Link>)}
                      </div>
                    </div>
                  </div>
                
              ))}
            </div>
          </div>
        </div>
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
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default AboutUs;
// export default withAuth(AboutUs);
