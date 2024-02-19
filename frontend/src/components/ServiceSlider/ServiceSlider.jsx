import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMedia } from "../../hooks/useMedia";


import SwiperCore, { Autoplay, FreeMode, Navigation, Pagination } from "swiper";


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import styles from "./ServiceSlider.module.scss";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { reactIcons } from "components/utils/icons";


SwiperCore.use([Autoplay, Navigation, FreeMode, Pagination]);

export default function ServiceSlider() {
  const data = [
    {
      heading: '',
      img: '',
      para:''
    }
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

  const slidesPerView = isMobile ? 1 : isTablet ? 2 : 3;

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
          navigation
          spaceBetween={20}
          slidesPerView={slidesPerView}
        >
          {data.map(({ name }, index) => (
            <div
              key={name}
              className={`${styles.swiper} ${styles["swiper-initialized"]} ${styles["swiper-horizontal"]} ${styles["swiper-android"]} ${styles["swiper-backface-hidden"]}`}
            >
              <div className={styles["swiper-wrapper"]}>
                <SwiperSlide key={index}>
                  <div className="p-5 bg-primary-900 rounded-xl">
                    <h4 className="heading-5">Getting a Secure Wallet</h4>
                    <div className="bg-primary-lightBlack rounded-xl h-[396px] mt-5"></div>
                    <p className="para-24 font-semibold min-h-[60px] pt-5">We hook you up with the proper wallet.</p>
                    <p className="para-24 pt-5">To get you a personalized web3 domain
                      that will act as your digital I.D and wallet
                      address. It will also open up the world of
                      web3.</p>
                    <Link href={'/'} className="pt-2 flex items-center justify-end gap-3 text-20">Read More <span className="-rotate-45">{reactIcons.rightarrow}</span></Link>
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
