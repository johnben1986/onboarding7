import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMedia } from "../../hooks/useMedia";


import SwiperCore, { Autoplay, FreeMode, Navigation, Pagination } from "swiper";


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import styles from "./FoundersCarousel.module.scss";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import Image from "next/image";


SwiperCore.use([Autoplay, Navigation, FreeMode, Pagination]);

export default function FoundersCarousel() {
  const data = [
    {
      image: "/assets/images/sheldon.png",
      name: "Sheldon B.",
      position: "CEO",
      socials: {
        twitter: "https://twitter.com/Sheldon_EDA",
        linkedin: "https://www.linkedin.com/in/sheldon-benson-485735249/",
      },
    },
    {
      image: "/assets/images/jacob.png",
      name: "Jacob B.",
      position: "Co-founder",
      socials: {
        twitter: "https://twitter.com/JacobBenson_EDA",
        linkedin: "https://www.linkedin.com/in/jacob-benson-/",
      },
    },
    {
      image: "/assets/images/ryno.png",
      name: "Ryno V.",
      position: "COO",
      socials: {
        twitter: "https://twitter.com/Rynovdw_EDA",
        linkedin: "https://www.linkedin.com/in/ryno-van-der-walt/",
      },
    },
    {
      image: "/assets/images/lisa.png",
      name: "Lisa K.",
      position: "CFO",
      socials: {
        twitter: "https://twitter.com/Rynovdw_EDA",
        linkedin: "https://www.linkedin.com/in/ryno-van-der-walt/",
      },
    },
    {
      image: "/assets/images/wilfred.png",
      name: "Wilfred M.",
      position: "M & R",
      socials: {
        twitter: "https://twitter.com/Rynovdw_EDA",
        linkedin: "https://www.linkedin.com/in/ryno-van-der-walt/",
      },
    },
  ];

  const socialIcons = {
    instagram: <FaInstagram />,
    twitter: <FaTwitter />,
    facebook: <FaFacebook />,
    linkedin: <FaLinkedin />,
  };

  const autoPlayOptions = {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: false,
    reverseDirection: false,
    stopOnLastSlide: false,
  };

  const { isMobile, isTablet } = useMedia();

  const slidesPerView = isMobile ? 1 : isTablet ? 2 : 4;

  return (
    <section className={styles.founders}>
      <div className={`container
      
       `}>
        {/* <h2
          className={`${styles.text} ${styles["text--h1"]} ${styles.founders__header} ${styles["colouredText"]} ${styles["audiowide"]}`}
        >
          Team
        </h2> */}
        <Swiper
          autoplay={autoPlayOptions}

          spaceBetween={20}
          slidesPerView={slidesPerView}
        >
          {data.map(({ image, name, position }, index) => (
            <div
              key={name}
              className={`${styles.swiper} ${styles["swiper-initialized"]} ${styles["swiper-horizontal"]} ${styles["swiper-android"]} ${styles["swiper-backface-hidden"]}`}
            >
              <div className={styles["swiper-wrapper"]}>
                <SwiperSlide key={index}>
                  <div className="group">
                    <div className="max-w-[396px] relative overflow-hidden bg-white h-[560px] w-full border- border-b-0 border-transparent hover:border-2 hover:border-b-0 hover:border-primary-200 rounded-full">
                      <Image
                        src={image}
                        fill
                        className="object-cover"></Image>
                    </div>
                    <div className="relative group-hover:bottom-[60px] bottom-0 transition-all group-hover:transition-all opacity-0 group-hover:opacity-100 left-0 right-0">
                      <div className="btn-lg mx-auto">{name}</div>
                      <div className="bg-white mx-auto rounded-b-full text-16 text-black h-[28px] flex-center w-[150px]">{position}</div>
                      <div className={styles.founderCard__socials}>
                        {Object.keys(data[index].socials).map((type, link) => (
                          <a
                            key={type}
                            href={data[index].socials[type]}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {socialIcons[type]}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* <div className={styles.founderCard}>
                    <div className={styles.founderCard__imgDiv}>
                      <Image
                        src={`/assets/images/about/${image}`}
                        height={350}
                        width={400}
                        alt={name}
                      />
                    </div>
                    <h4
                      className={`${styles.text} ${styles["text--h4"]} ${styles.founderCard__name}`}
                    >
                      {name.toUpperCase()}
                    </h4>
                    <div
                      className={`${styles.text} ${styles["text--body"]} ${styles.founderCard__paragraph}`}
                    >
                      {position}
                    </div>

                    <div className={styles.founderCard__socials}>
                      {Object.keys(data[index].socials).map((type, link) => (
                        <a
                          key={type}
                          href={data[index].socials[type]}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {socialIcons[type]}
                        </a>
                      ))}
                    </div>
                  </div> */}

                </SwiperSlide>
              </div>
            </div>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
