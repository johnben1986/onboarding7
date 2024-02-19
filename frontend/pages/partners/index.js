import React from "react";
// import SwiperCore, { Autoplay, FreeMode, Navigation, Pagination } from "swiper";
// import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import continuum from "/public/assets/images/partners/continuum.png";
import godaddy from "/public/assets/images/partners/godaddy.png";
import unstoppable from "/public/assets/images/partners/unstoppable-domains.webp";
import freename from "/public/assets/images/partners/freename.png";
import ens from "/public/assets/images/ENS.webp";

import metamask from "/public/assets/images/metamask.svg";
import coinbase from "/public/assets/images/coinbase.png";
import transak from "/public/assets/images/transak.png";
import ledger from "/public/assets/images/ledger.png";
import enclayve from "/public/assets/images/enclayve.png";

import blokinvestments from "/public/assets/images/partners/blok-investments.jpeg";
import coinpayments from "/public/assets/images/coinpayments.png";
import stripe from "/public/assets/images/stripe.png";
import ipfs from "/public/assets/images/ipfs.png";
import tapfiliate from "/public/assets/images/tapfiliate.webp";

import BecomePartner from "components/BecomePartner";
import { withAuth } from "components/Auth/authMiddleware";
import { Link } from "react-router-dom";

// SwiperCore.use([Autoplay, Navigation, FreeMode,]);
const Partners = () => {
  // const autoPlayOptions = {
  //   delay: 3000,
  //   disableOnInteraction: false,
  //   pauseOnMouseEnter: false,
  //   reverseDirection: false,
  //   stopOnLastSlide: false,
  // };

  const data = [
    {
      head: "Continuum",
      icon: continuum,
      link: ""
    },
    {
      head: "Blok Investments",
      icon: godaddy,
      link:""
    },
    {
      head: "Unstoppable Domains",
      icon: unstoppable,
      link: "https://unstoppabledomains.com/?ref=4f4046defa8b48b"
    },
    {
      head: "Freename",
      icon: freename,
      link: "https://freename.io/?referralCode=eager-boxes-throw"
    },
    {
      head: "ENS",
      icon: ens,
      link: "https://ens.domains/"
    },
  ];

  const data1 = [
    {
      head: "Metamask",
      icon: metamask,
      link: ""
    },
    {
      head: "Coinbase",
      icon: coinbase,
      link:""
    },
    {
      head: "Transak",
      icon: transak,
      link: ""
    },
    {
      head: "Enclayve",
      icon: enclayve,
      link: ""
    },
    {
      head: "Ledger",
      icon: ledger,
      link: ""
    },
  ];

  const data2 = [
    {
      head: "Blok Investments",
      icon: blokinvestments,
      link: ""
    },
    {
      head: "CoinPayments",
      icon: coinpayments,
      link:""
    },
    {
      head: "Stripe",
      icon: stripe,
      link: ""
    },
    {
      head: "IPFS",
      icon: ipfs,
      link: ""
    },
    {
      head: "Ledger",
      icon: tapfiliate,
      link: ""
    },
  ];

  // const breakpoints = {
  //   768: {
  //     slidesPerView: 2, // Show 2 slides on screens larger than 768px
  //   },
  //   1024: {
  //     slidesPerView: 5, // Show 3 slides on screens larger than 1024px
  //   },
  // };
  // const customNavigation = {
  //   prevEl: '.custom-swiper-button-prev',
  //   nextEl: '.custom-swiper-button-next',
  // };

  // Define an array of form field objects
  const formFields = [
    {
      id: "First",
      name: "firstName",
      label: "First Name*",
      type: "text",
      required: true,
    },
    {
      id: "Last",
      name: "lastName",
      label: "Last Name*",
      type: "text",
      required: true,
    },
    {
      id: "Email",
      name: "email",
      label: "Email*",
      type: "email",
      required: true,
    },
    {
      id: "Message",
      name: "message",
      label: "Message*",
      type: "text",
      required: true,
    },
  ];
  return (
    <main className="bg-image4 min-h-screen pt-0">
      <div className="overflow-hidden rounded-b-2xl border-b-2 bg-primary-newBgColor2/80 pb-5">
        <h2 className="heading-4 pt-5 text-center text-white">Our Partners & Who We Work With</h2>
        <div className="container max-w-[1200px]">
          <div className="grid grid-cols-1 items-stretch gap-8 py-5 md:grid-cols-2 xl:grid-cols-5">
            {data.map((item, index) => (
              <div key={index} className="col-span-1 flex justify-between flex-col gap-2">
                <div className="flex-center xl:h-[50px]">
                  <h4 className="heading-5 flex items-center text-center text-white lg:text-20">
                    {item.head}
                  </h4>
                </div>
                <div className="bg-white p-2 text-black">
                  <a href={ item.link}>
                  <Image
                    src={item.icon}
                    width={150}
                    height={150}
                    className="h-[100px] w-full object-contain"
                  />
  </a>
                </div>
              </div>
            ))}
            {/* <Swiper
            spaceBetween={30}
            breakpoints={breakpoints}
            navigation={customNavigation}
            className='relative !px-8'
          >
            {data.map((item, index) => (
              <SwiperSlide key={index} className='items-end'>
                <div className="flex flex-col gap-2">
                  <div className="flex-center">
                    <h4 className='heading-4 text-center'>{item.head}</h4>
                  </div>
                  <div className="bg-white text-black p-2">
                  <Image src={item.icon} width={150} height={150} className='w-full h-[100px] object-contain'></Image></div>
                </div>
              </SwiperSlide>
            ))}
            <div className="custom-swiper-button-prev ay-center z-20 left-0 text-4xl">{reactIcons.arrowleft}</div>
            <div className="custom-swiper-button-next ay-center z-20 right-0 text-4xl">{reactIcons.arrowright}</div>
          </Swiper> */}
          </div>
        </div>

        <div className="container max-w-[1200px]">
          <div className="grid grid-cols-1 items-stretch gap-8 py-0 md:grid-cols-2 xl:grid-cols-5">
            {data1.map((item, index) => (
              <div key={index} className="col-span-1 flex justify-between flex-col gap-2">
                <div className="flex-center xl:h-[50px]">
                  <h4 className="heading-5 flex items-center text-center text-white lg:text-20">
                    {item.head}
                  </h4>
                </div>
                <div className="bg-white p-2 text-black">
                  <a href={ item.link}>
                  <Image
                    src={item.icon}
                    width={150}
                    height={150}
                    className="h-[100px] w-full object-contain"
                  />
  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="container max-w-[1200px]">
          <div className="grid grid-cols-1 items-stretch gap-8 py-0 md:grid-cols-2 xl:grid-cols-5">
            {data2.map((item, index) => (
              <div key={index} className="col-span-1 flex justify-between flex-col gap-2">
                <div className="flex-center xl:h-[50px]">
                  <h4 className="heading-5 flex items-center text-center text-white lg:text-20">
                    {item.head}
                  </h4>
                </div>
                <div className="bg-white p-2 text-black">
                  <a href={ item.link}>
                  <Image
                    src={item.icon}
                    width={150}
                    height={150}
                    className="h-[100px] w-full object-contain"
                  />
  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
      <div className="flex-center container py-10">
        <div className="w-full max-w-[600px]">
          <h4 className="heading-4 text-center text-white">Become a Partner</h4>
          <BecomePartner />
        </div>
      </div>
    </main>
  );
};

// export default withAuth(Partners);
export default Partners;
