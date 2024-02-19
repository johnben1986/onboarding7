import React from "react";
import Link from "next/link";
import Image from "next/image";
import appBuilder from "/public/assets/images/app-builder.png";
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
import { useTransak } from "hooks/useTransak";
import { withAuth } from "components/Auth/authMiddleware";
import MetadataHelper from "components/MetadataHelper";

import { reactIcons } from "components/utils/icons";
import ContactUs from "components/ContactUs";
const Contact = () => {
  const { transak } = useTransak();
  // **************
  const checklist5 = [
    {
      para: "Review Page",
    },
    {
      para: "Priority Support",
    },
    {
      para: "Learn & Experience",
    },
    {
      para: 'Quickbuild V2 Access'
    },
    {
      para: '10 Safe Wallet Options'
    },
    {
      para: "Quickbuild Dapp Builder",
    },
    {
      para: "Business to Business Solutions",
    },
  ];

  return (
    <>
        {/* contact form  */}
        <section className="panel bg-image3 section-center flex-center scroll-span-align min-h-screen">
          <div className="container max-w-[1200px]">
            <div className="flex flex-col gap-14  md:flex-row">
              <div className=" lg:max-w-[400px]">
                <div className=" overflow-hidden rounded-xl border-2 border-white p-1">
                  <div className="flex h-full flex-col justify-between overflow-hidden rounded-xl bg-primary-newBgColor2/80 py-2 px-4  lg:py-6">
                    <div className="">
                      <h4 className="lg:heading-6 text-center text-18 font-semibold text-white">
                        Schedule a Call.
                      </h4>
                      <p className="pt-4 text-center font-semibold text-white">
                        Unlock our Membership Benefits.
                      </p>
                    </div>
                    <div className="space-y-3 py-10">
                      {checklist5.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-center gap-2 text-white md:justify-start"
                        >
                          <span>{reactIcons.check}</span>
                          <p>{item.para}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mx-auto w-full max-w-[280px]">
                      <a
                        href={"https://zcal.co/web3onboarding"}
                        className="flex-center mx-auto items-center rounded-full border border-black bg-white px-5 py-3 text-14 text-black lg:text-20"
                      >
                        {" "}
                        Schedule a Call
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <h4 className="heading-6 text-center font-semibold text-white">
                  Contact us.
                </h4>
                <ContactUs />
              </div>
            </div>
          </div>
        </section>
    </>
  );
};

export default Contact;
