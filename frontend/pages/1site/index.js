import { useRef, useState } from "react";

import { Collapse } from "antd";
import styles from "./WBLandingPage.module.scss";
import Button from "components/utils/Button";

import FreenameLogo from "../../public/assets/images/png/freename-logo-black-text.png";
import AffiliateButtonImage from "../../public/assets/images/svg/affiliates.svg";
import VersusImg from "../../public/assets/images/quickbuild/Versus.svg";
import Icon1 from "../../public/assets/images/quickbuild/icon-1.svg";
import Icon2 from "../../public/assets/images/quickbuild/icon-2.svg";
import Icon3 from "../../public/assets/images/quickbuild/icon-3.svg";
import Icon4 from "../../public/assets/images/quickbuild/icon-4.svg";
import Icon5 from "../../public/assets/images/quickbuild/icon-5.svg";
import TelegramImg from "../../public/assets/images/svg/telegram.svg";
import QuickBuildBanner from "../../public/assets/images/quickbuild/quickbuild-banner-home.png";
import QuickBuildButtonImg from "../../public/assets/images/svg/QuickBuild-button.svg";
import TiersImg from "../../public/assets/images/quickbuild/Tiers.svg";
import decentrasite from "/public/assets/images/1site.png";

import Image from "next/image";
import MetadataHelper from "components/MetadataHelper";
import Link from "next/link";
import web3imgWhite from "/public/assets/images/web3logo-white.png";
import { Drawer } from "@mui/material";
import { reactIcons } from "components/utils/icons";
import Account from "components/Account/Account";
import { withAuth } from "components/Auth/authMiddleware";
const { Panel } = Collapse;

function WBLandingPage() {
  const tutorialVideoRef = useRef(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const text = ["1Site Walkthrough", "Web3sites Built With 1Site"];

  return (
    <>
      <MetadataHelper
        title={"1Site"}
        description={
          "Build a Web3 Website in Minutes with 1Site. Powered by EDA and Freename."
        }
        canonical={"https://web3onboarding.com/1site"}
      />
      <main className="bg-image4">
        <div className="flex h-screen">
          <sidebar className="z-[9] hidden h-full w-64 border-r border-white text-white md:relative md:block">
            {/* <div className="h-[102px] border-b border-white p-3">
              <Link href="/home">
                <Image
                  src={web3imgWhite}
                  width={150}
                  height={150}
                  className="m-auto w-full max-w-[150px] cursor-pointer"
                ></Image>
              </Link>
            </div> */}
            <div className="h-[calc(100%-105px)] px-6 py-4">
              <div className="mb-8">
                <h2 className="mb-3 pb-1 text-center text-3xl font-light text-white">
                  Let your imagination run wild.
                </h2>
                <p className="mb-3 text-center leading-6 text-white">
                  Quickly and easily create your very own web3 site by adding
                  content, text and colors!
                </p>
                <p className="mb-3 text-center leading-6 text-white">
                  Create a header, body and footer with the option to add social
                  media links + extra information.
                </p>
                <p className="mb-3 text-center leading-6 text-white">
                  {" "}
                  Web3 sites function on a decentralized network, primarily
                  supported by blockchain technology.{" "}
                </p>
              </div>
            </div>
          </sidebar>
          <div className="w-full flex-1">
            
                <div className="flex w-full items-center justify-between space-x-2 md:w-auto">
                  <div className="flex-center md:hidden">
                    <button
                      className="text-24 md:hidden"
                      onClick={() => setIsDrawerOpen(true)}
                    >
                      {reactIcons.menu}
                    </button>
                    <Drawer
                      anchor="left"
                      PaperProps={{
                        style: {
                          width: "70%",
                          backgroundColor: "black",
                        },
                      }}
                      open={isDrawerOpen}
                      onClose={() => setIsDrawerOpen(false)}
                      className="md:hidden"
                    >
                      <sidebar className="bg-image3 relative z-[9] h-full border-r border-white text-white">
                        {/* <div className="h-[105px] border-b border-white p-3">
                          <Link href="/home">
                            <Image
                              src={web3imgWhite}
                              width={150}
                              height={150}
                              className="m-auto w-full max-w-[150px] cursor-pointer"
                            ></Image>
                          </Link>
                        </div> */}
                        <div className="h-[calc(100%-105px)] px-6 py-4">
                          <div className="mb-8">
                            <h2 className="mb-3 pb-1 text-center text-3xl font-light text-white">
                              Let your imagination run wild.
                            </h2>
                            <p className="mb-3 text-center leading-6 text-white">
                              Quickly and easily create your very own web3 site
                              by adding content, text and colors!
                            </p>
                            <p className="mb-3 text-center leading-6 text-white">
                              Create a header, body and footer with the option
                              to add social media links + extra information.
                            </p>
                            <p className="mb-3 text-center leading-6 text-white">
                              {" "}
                              Web3 sites function on a decentralized network,
                              primarily supported by blockchain technology.{" "}
                            </p>
                          </div>
                        </div>
                      </sidebar>
                    </Drawer>
                  </div>
                  {/* <span className="text-xl font-medium "> 1SITE</span> */}
                </div>
                
                {/* <div className="flex items-center">
                <Link href={'/affiliate'} className="flex lg:hidden justify-center text-20 bg-white py-1 px-1 text-black hover:text-black rounded-3xl border border-black mr-2">{reactIcons.info}</Link>
                <Link href={'/ipfs'} className="flex lg:hidden justify-center text-20 bg-white py-1 px-1 text-black hover:text-black rounded-3xl border border-black mr-2">{reactIcons.database}</Link>
                <Link href={'/affiliate'} className="hidden lg:flex w-[190px] justify-center bg-white py-2 px-3 text-black hover:text-black rounded-3xl border border-black mr-2">Become an Affiliate</Link>
                <Link href={'/ipfs'} className="hidden lg:flex w-[140px] justify-center bg-white py-2 px-3 text-black hover:text-black rounded-3xl border border-black mr-2">IPFS Hosting</Link>
                <Account
                  className={"ml-0 w-full justify-between gap-2 md:w-auto"}
                  textClass="text-white"
                  />
                </div> */}
    
            <div className="flex w-full items-center justify-center items-center space-x-2 mx-auto">
            <Image
                    src={decentrasite}
                    className="h-[200px] lg:max-w-[20%] mx-auto"
                  />
            </div>

            <div
              className="h-[calc(100%-81px)] overflow-auto"
              id="scrrolledDiv">
                    <span className="text-14 lg:text-26 flex lg:gap-60 justify-center gap-5 font-semibold " >
                        {text.map((img, index) => (
                    <div key={index}>{img}</div>))}
                </span>
              
              <div className="m-auto">
                <div className="flex md:grid-cols-2 mx-auto justify-center mt-2 px-8 h-[100px] lg:h-[300px] gap-5">
                <video
                  className=" rounded-3xl border-white border-4"
                  autoPlay
                  loop
                  // controls
                  muted
                  src="/assets/images/builder.mp4"
                  >
                </video>
                
                <video
                  className="rounded-3xl border-white border-4"
                  autoPlay
                  loop
                  // controls
                  muted
                  src="/assets/images/guide.mp4"
                  >
                  </video>
                  
                </div>
                <div className="flex justify-center gap-0 lg:gap-20 px-10 mt-5 px-5">
                      <a href="/1site/1site" className="px-10 py-5 w-[250px] text-center rounded-full text-14 text-white lg:text-15 bg-black hover:text-white hover:opacity-50 border-b-2">
                        TRY 1SITE FOR FREE
                      </a>
                      <a href="/affiliate" className="w-[250px] text-center rounded-full px-10 py-5 text-14 text-black lg:text-15 bg-white hover:text-gray hover:opacity-50 border-b-2 border-black">
                        WE BUILD
                      </a>
                  <Link
                    className="px-10 py-5 w-[250px] text-center rounded-full text-14 text-white lg:text-15 bg-black hover:text-white hover:opacity-50 border-b-2"
                    rel="noreferrer"
                    href={'/affiliate'}
                  >
                    Become an Affiliate!
                  </Link>
                </div>
                <div className="flex justify-center gap-20 px-10 mt-5">
                  <Link href={'/ipfs'} className="flex mt-5 hidden lg:flex w-[140px] justify-center bg-white py-2 px-3 text-black hover:text-black rounded-3xl border border-black">IPFS Hosting</Link>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* <main className="bg-image3 hidden">
        <div className="mx-4 space-y-12 pb-24 pt-5 text-black lg:mx-32">
          <div className="flex flex-col-reverse items-center gap-10 lg:flex-row">
            <div className="flex w-full flex-col items-center gap-3 text-center text-lg font-bold tracking-wide lg:w-1/2">
              <p className="font-brand-heading tracking-[0.15em]">
                There are 4.7 Billion internet users. If 1% of those users
                integrate with Web3, then 1% of those choose to get a Web3site,
                that's 470 000 sites.
              </p>
              <div className="w-full rounded-full border-2 border-[#545454] bg-brand-blue p-2 text-center font-brand-heading font-bold tracking-[0.2em] text-white lg:w-4/6">
                THIS IS THE WEB3 ADOPTION DILEMMA
              </div>
              <div className="flex w-full justify-between">
                <p>Traditional Website Builder</p>
                <p>1Site Web3 Website Builder</p>
              </div>
              <div className="grid w-full grid-flow-col grid-rows-5 items-stretch gap-3 text-xs lg:text-sm">
                <div className="flex w-full items-center gap-3 justify-self-end rounded-xl bg-brand-blue py-2 px-3 text-white lg:w-11/12">
                  <Image src={Icon1} w={60} h={60}></Image>
                  28,000 Devs
                </div>
                <div className="flex w-full items-center gap-3 rounded-xl bg-brand-blue py-2 px-3 text-white lg:w-11/12">
                  <Image src={Icon2} w={60} h={60}></Image>
                  $30,000 Average Cost
                </div>
                <div className="flex w-full items-center gap-3 justify-self-end rounded-xl bg-brand-blue py-2 px-3 text-white lg:w-11/12">
                  <Image src={Icon3} w={50} h={50}></Image>3 Months Average
                  Completion
                </div>
                <div className="flex w-full items-center gap-3 rounded-xl bg-brand-blue py-2 px-3 text-white lg:w-11/12">
                  <Image src={Icon4} w={50} h={50}></Image>
                  Total Completion Time Approx. 4.19 Years
                </div>
                <div className="flex w-full items-center gap-3 justify-self-end rounded-xl bg-brand-blue py-2 px-3 text-white lg:w-11/12">
                  <Image src={Icon5} w={50} h={50}></Image>
                  470,000 Websites Build $14.1 Billion
                </div>

                <Image className="row-span-5 lg:mx-20" src={VersusImg}></Image>

                <div className="flex w-full items-center gap-3 justify-self-end rounded-xl bg-brand-blue py-2 px-3 text-white lg:w-11/12">
                  <Image src={Icon1} w={50} h={50}></Image>
                  470,000 Users
                </div>
                <div className="flex w-full items-center gap-3 rounded-xl bg-brand-blue py-2 px-3 text-white lg:w-11/12">
                  <Image src={Icon2} w={50} h={50}></Image>
                  $35 Per Website
                </div>
                <div className="flex w-full items-center gap-3 justify-self-end rounded-xl bg-brand-blue py-2 px-3 text-white lg:w-11/12">
                  <Image src={Icon3} w={50} h={50}></Image>
                  30 Minutes Average Completion
                </div>
                <div className="flex w-full items-center gap-3 rounded-xl bg-brand-blue py-2 px-3 text-white lg:w-11/12">
                  <Image src={Icon4} w={50} h={50}></Image>
                  Total Completion Time 30 MINUTES!
                </div>
                <div className="flex w-full items-center gap-3 justify-self-end rounded-xl bg-brand-blue py-2 px-3 text-white lg:w-11/12">
                  <Image src={Icon5} w={50} h={50}></Image>
                  470,000 Websites Build $16.45 Million
                </div>
              </div>
            </div>
            <div className="w-full items-center lg:w-1/2 lg:p-10">
              <Link
                href="/site"
                className="flex w-full flex-col items-center lg:text-center"
              >
                <Image
                  src={QuickBuildBanner}
                  width={1000}
                  height={1000}
                  alt="1Site"
                  className="object-center"
                />
              </Link>
              <div className="flex items-center justify-center gap-16">
                <Link href="/site/site">
                  <Image src={QuickBuildButtonImg} width={200}></Image>
                </Link>
                <Link
                  target="_blank"
                  rel="noreferrer"
                  href="https://quickbuild.tapfiliate.com"
                >
                  <Image src={AffiliateButtonImage} width={200}></Image>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-10 lg:flex-row">
            <div className="flex w-full flex-col items-center text-center font-brand-heading lg:w-1/2">
              <h2 className="text-2xl font-bold">1st Tier</h2>
              <p className="text-xl">10$ on personal sales</p>
              <p className="text-xl">2.5$ on your affiliate's affiliates</p>
              <Image className="mt-4" src={TiersImg} alt="Tier System"></Image>
            </div>
            <div className="w-full rounded-xl bg-brand-background p-6 text-center lg:w-1/2">
              <h2 className="mb-4 font-brand-heading text-3xl font-bold">
                Affiliates!
              </h2>
              <p className="break-words text-lg">
                Sign up here:{" "}
                <Link
                  className="underline"
                  target="_blank"
                  rel="noreferrer"
                  href="https://QuickBuild.tapfiliate.com"
                >
                  https://QuickBuild.tapfiliate.com
                </Link>{" "}
                or click on the “Affiliates Join Now” button. No purchase
                necessary to join. Earn $10 every time a $49 1Site website
                is ordered through your affiliate link. Second tier pays $2.50
                If you get a white label / rebranded 1Site API for your own
                site, you will automatically be paid $12.50 - The equivalent to
                being paid for 2 tiers, on every sale you make! Get your
                affiliate marketing materials and helpful tips here:
                <Link
                  className="underline"
                  target="_blank"
                  rel="noreferrer"
                  href="https://drive.google.com/drive/folders/1xXqU_ieo1Dc4hnzatuGHhIyDLDuqdP7l?usp=sharing"
                >
                  https://drive.google.com/drive/folders/1xXqU_ieo1Dc4hnzatuGHhIyDLDuqdP7l?usp=sharing
                </Link>
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-center lg:gap-20">
            <Button size="3xl" href="/quickbuild/builder">
              Start now
            </Button>
            <Link
              target="_blank"
              rel="noreferrer"
              href="https://quickbuild.tapfiliate.com"
            >
              <Image
                width={200}
                src={AffiliateButtonImage}
                alt="Affiliates JOIN NOW"
              ></Image>
            </Link>
            <Link
              target="_blank"
              rel="noreferrer"
              href="https://chrome.google.com/webstore/detail/freename-web3-extension/dadabjafkcoenclipjleokiadhjglkee"
            >
              Download Freename Browser Extension
              <Image
                className="mx-auto object-contain object-left"
                src={FreenameLogo}
                alt="Freename"
                height={115}
                width={115}
              />
            </Link>
          </div>

          <div className="mx-auto w-full space-y-8 text-center lg:w-5/6">
            <div className="rounded-xl bg-brand-background p-6 text-center">
              <h2 className="mb-4 font-brand-heading text-3xl font-bold">
                Suggestions for Sales and Marketing Tactics:
              </h2>
              <div className="px-2 text-left text-lg lg:px-8">
                <ol className="list-inside list-decimal space-y-5">
                  <li>
                    Go to various telegram groups used for NFT, blockchain,
                    crypto, web3, website, work-at-home, affiliate marketing,
                    network marketing, digital products, and other relative
                    groups that could conceivably want to market QuickBuild on
                    their site. DO NOT JUST START PLASTERING ADS ON THEIR
                    CHANNEL! Find a team member of the group, ask to meet him in
                    the d.m. and explain to him how he can earn extra money for
                    both the telegram owners, as well as their members. Other
                    benefits other than making money include: <br />a{")"}{" "}
                    Affiliates can get paid out in crypto. They can improve the
                    utility of any token by using it as a payment method. <br />
                    b{")"} Stronger community. Can hold contests for best
                    websites built within the group or most sales <br />c{")"}{" "}
                    All of these telegram groups usually have a website as well.
                    Try to get an API put on their site. Stress to them that
                    they will earn an . extra $2.50 per sale for doing so
                  </li>
                  <li>Tech and blockchain academies</li>
                  <li>
                    Web2 website builders. If they want to keep their business
                    current, they'll have to get into web3. They can do it now
                    and be ahead of the curve, or they can wait and try to catch
                    up later
                  </li>
                  <li>
                    YouTube, Instagram, TikTok , FB and Snapchat. Go to profiles
                    of people with relevant interests 5.Web3 developers: Many
                    web3 website builders are booked for many months in advance,
                    but their customers are in a hurry! They can build them a
                    site with QuickBuild while their customers are waiting for
                    their custom made site!
                  </li>
                </ol>
              </div>
            </div>
            <p className="font-brand-heading text-3xl font-bold">
              THERE ARE MANY MORE WAYS TO MARKET AND SELL QUICKBUILD. DO YOU
              THINK YOU'VE FOUND A GREAT NEW WAY? LET OUR COMMUNITY KNOW!
            </p>
            <Link
              target="_blank"
              rel="noreferrer"
              href="https://t.me/web3onboarding"
            >
              <Image
                src={TelegramImg}
                className="mx-auto"
                height={100}
                width={100}
              ></Image>
            </Link>
            <p className="text-xl">
              Launch your NFT gallery or personal website to connect with the
              Web3 audience. Web3 Onboarding partnered with Freename to offer
              the simplest Web3 domain builder service with remarkable
              flexibility.
            </p>
            <div className="flex items-center justify-center gap-2 text-center lg:gap-20">
              <Button size="3xl" href="/quickbuild/builder">
                Start now
              </Button>
              <Link
                target="_blank"
                rel="noreferrer"
                href="https://quickbuild.tapfiliate.com"
              >
                <Image
                  width={200}
                  src={AffiliateButtonImage}
                  alt="Affiliates JOIN NOW"
                ></Image>
              </Link>
              <Link
                target="_blank"
                rel="noreferrer"
                href="https://chrome.google.com/webstore/detail/freename-web3-extension/dadabjafkcoenclipjleokiadhjglkee"
              >
                Download Freename Browser Extension
                <Image
                  className="mx-auto object-contain object-left"
                  src={FreenameLogo}
                  alt="Freename"
                  height={115}
                  width={115}
                />
              </Link>
            </div>
            <h3 className="text-2xl font-bold">Need Help?</h3>
            <p className="text-xl">
              We want to help if you encounter any challenges with our Web3
              website builder. Send us a message, and we'll get in touch right
              away.
            </p>
            <Button size="3xl" href="/#contact">
              Contact Us
            </Button>
          </div>

          <div className="mx-auto w-full sm:max-w-4xl">
            <h2 className="text-center font-brand-heading text-3xl font-bold">
              QuickBuild Tutorial
            </h2>
            <iframe
              ref={tutorialVideoRef}
              width="100%"
              className="h-40 md:h-[34em]"
              src="https://www.youtube.com/embed/_SY2z6tSdj4"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>

          <div className="mx-auto w-full space-y-3 text-center sm:max-w-4xl">
            <h2 className="text-center font-brand-heading text-3xl font-bold">
              QuickBuild Showcase
            </h2>
            <iframe
              width="100%"
              className="h-40 md:h-[34em]"
              src="https://www.youtube.com/embed/M4xSzwcJ4j4"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <Button
              size="3xl"
              target="_blank"
              rel="noreferrer"
              href="https://docs.google.com/document/d/1hjr4bOv5b6NMQDz8Jr0Xen_CFqYM04YCGz-9zBXIA10/edit?usp=sharing"
            >
              List of Websites built on QuickBuild
            </Button>
          </div>

          <h2 className="text-center font-brand-heading text-3xl">
            Frequently Asked Questions
          </h2>
          <Collapse className={styles.faqCollapse}>
            <Panel header="How Does This Work?" key="1">
              <p className="font-brand-tomorrow text-base leading-relaxed">
                Our Web3 website builder converts your text and image elements
                into a simple one-page website ready to be hosted on the
                decentralized web. You can use our hosting integration or
                download the website's HTML file to upload it to InterPlanetary
                File System (IPFS) through another method. However, this builder
                tool provides a comprehensive solution to get your Web3 website
                live within minutes.
              </p>
            </Panel>
            <Panel header="How Do I Get Started?" key="2">
              <p className="font-brand-tomorrow text-base leading-relaxed">
                Write your website's title and include a logo from the options
                provided in the QuickBuild header section. The{" "}
                <b>Website Settings</b>
                tab supports the integration of a fixed background image or
                color. Next, use the <b>Layout</b> and <b>Height</b> features on
                the builder to add new sections to your website. Click{" "}
                <b>Add Section</b> to add a selected layout or height to your
                website. You can use images, texts, and links and customize each
                section to your preference. The <b>Preview</b>
                button allows you to view progress and includes an option to
                continue editing site features. Once satisfied with your website
                design, you can use the <b>Checkout</b> button to exit the
                development phase. Watch{" "}
                <span
                  className="cursor-pointer underline"
                  onClick={() => {
                    tutorialVideoRef.current.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  video tutorial.
                </span>
              </p>
            </Panel>
            <Panel
              header="What is the service charge for the Web3 domain builder?"
              key="3"
            >
              <p className="font-brand-tomorrow text-base leading-relaxed">
                t costs only $49 USDC ($12.50 goes to affiliates) to create your
                Web3 website using our QuickBuild. The fee is required at
                checkout and only after you're satisfied with your website's
                design. Hold the USDC amount in your Polygon wallet to ensure a
                seamless checkout experience.
              </p>
            </Panel>
            <Panel
              header="How can I Link my website to my Web3 domain?"
              key="4"
            >
              <p className="font-brand-tomorrow text-base leading-relaxed">
                Upon clicking <b>Checkout</b> choose the option to host your
                website instantly. Connect your wallet (if not previously
                connected), and select your preferred hosting plan/period. Click{" "}
                <b>Pay with Wallet</b> and enter the Web3 domain name to attach
                to the website. Complete the checkout process, and your new
                website will instantly go live on your specified domain!
                Immediately access the website using Brave Browser, Opera, or
                any other Web3-compatible browser. Freename Extension is
                required to browse Freename domains.
              </p>
            </Panel>
            <Panel header="I don't have a Web3 domain. What do I do?" key="5">
              <p className="font-brand-tomorrow text-base leading-relaxed">
                You can <Link href="/freename">mint a new Web3 domain</Link> or
                browse through the Web3 Onboarding{" "}
                <Link href="/marketplace">Web3 domain marketplace</Link> to find
                your perfect domain. The Web3 website builder supports domains
                from Freename and Unstoppable Domains.
              </p>
            </Panel>
            <Panel header="Can I edit my Website after it goes live?" key="6">
              <p className="font-brand-tomorrow text-base leading-relaxed">
                Yes. Simply access the domain from your account dashboard on the
                Web3 Onboarding Marketplace. Use the <b>Edit</b> button to
                modify or make changes to your live website.
              </p>
            </Panel>
          </Collapse>
        </div>
      </main> */}
    </>
  );
}
// export default withAuth(WBLandingPage);
export default WBLandingPage;