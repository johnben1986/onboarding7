import React, { useState } from 'react';
import { reactIcons } from 'components/utils/icons'
/* eslint-disable react/no-unescaped-entities */
import { Collapse } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import MetadataHelper from 'components/MetadataHelper';
import Navbar from 'components/Layout/Navbar';
import Footer from 'components/Layout/Footer';
import { withAuth } from 'components/Auth/authMiddleware';
const FAQs = () => {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen5, setIsOpen5] = useState(false);
  const [isOpen6, setIsOpen6] = useState(false);
  const [isOpen7, setIsOpen7] = useState(false);
  const [isOpen8, setIsOpen8] = useState(false);
  const [isOpen9, setIsOpen9] = useState(false);
  const faq = [

    {
      no: '8.',
      que: 'FAQ for Beginners',
      para: 'No, a referral code is optional. If you have one, you can enter it during registration to connect with your referrer. If not, you can proceed without one.',
    },

  ];
  return (
    <>
    <MetadataHelper title="Frequently Asked Questions" />
    <main className='bg-image3'>
      {/* <Navbar title="Frequently Asked Questions" /> */}
      <div className="container section-center text-white">
        <h2 className='heading-1 text-center'>
          What Do You Need Help With?
        </h2>
        <div className='mx-auto max-w-[1078px] pt-[50px]'>
          {/* FAQ item 1 */}
          <div
            onClick={() => setIsOpen1(!isOpen1)}
            className='cursor-pointer rounded-xl border-[0.5px]  py-7 px-4 mb-3 mb-3'
          >
            <div className='flex items-center justify-between gap-2'>
              <p className='para-24 font-semibold'>
                <span className=''>1.</span> Getting Started
              </p>

              {isOpen1 ?
                <span className='rotate-180'>
                  {reactIcons.arrowdown}
                </span>
                : <span> {reactIcons.arrowdown}</span>}

            </div>
            <Collapse in={isOpen1} className='pt-2 pl-7'>
              <h4 className='text-22 font-semibold'>What is a Web3 domain?</h4>
              <p className='pt-2  text-18 leading-[24px]'>
                A Web3 domain is a blockchain-based asset that replaces hard-to-remember cryptocurrency wallet addresses with something as simple as abc.crypto. They also allow users to host websites pointed toward their unique usernames.
              </p>
              <p className='pt-3 text-18 leading-[24px]'>Users can trade their Web3 domains using the <Link href={'/marketplace'} className='text-white underline hover:text-white hover:opacity-60'> Web3 Onboarding marketplace.</Link></p>
              <h4 className='text-22 font-semibold pt-6'>How do I get started?</h4>
              <p className='pt-2  text-18 leading-[24px]'>
                If you already have a Metamask wallet installed on your browser, you can get started by using the Wallet icon on any page of our marketplace to "Connect your Wallet."
              </p>
              <p className='pt-3 text-18 leading-[24px]'>Follow this link to<Link href={'https://metamask.io/download/'} className='text-white underline hover:text-white hover:opacity-60'> download Metamask</Link>  if you don't already have it.</p>
              <p className='pt-2  text-18 leading-[24px]'>
                Once installed and connected to the Web3onboarding marketplace, you can access the site's full functionalities, including buying, selling, listing, and auctions.
              </p>
              <h4 className='text-22 font-semibold pt-6'>Do I need a username and password?</h4>
              <p className='pt-2  text-18 leading-[24px]'>
                No. In the world of Web3, your wallet address is your passport. Create and connect your wallet to start surfing our marketplace. No username or password is required!
              </p>
            </Collapse>
          </div>
          {/* FAQ item 2 */}
          <div
            onClick={() => setIsOpen2(!isOpen2)}
            className='cursor-pointer rounded-xl border-[0.5px]  py-7 px-4 mb-3'
          >
            <div className='flex items-center justify-between gap-2'>
              <p className='para-24 font-semibold'>
                <span className=''>2.</span> Marketplace Orders
              </p>
              {isOpen2 ?
                <span className='rotate-180'>
                  {reactIcons.arrowdown}
                </span>
                : <span> {reactIcons.arrowdown}</span>
              }
            </div>
            <Collapse in={isOpen2} className='pt-2 pl-7'>
              <h4 className='text-22 font-semibold'>How do I place a buy order?</h4>

              <ul className='flex flex-col list-disc pl-5 text-18 gap-2 pt-2'>
                <li>Click on the Buy button for the domain you wish to purchase.</li>
                <li>Make an offer on the domain page (include your preferred currency and input your desired purchase price).</li>
                <li>Place the order and wait for the vendor to accept or decline the order.</li>
              </ul>
              <h4 className='text-22 font-semibold pt-6'>How do I confirm a buy order?</h4>
              <p className='pt-2  text-18 leading-[24px]'>
                Once a buyer places an order on your listed domain, you'll find the option to Accept or Decline the offer.
              </p>
              <ul className='flex flex-col list-disc pl-5 text-18 gap-2 pt-2'>
                <li>Head over to the Listed Domains option after connecting your wallet. </li>
                <li>Review offers on your domains and choose whether or not to accept the offer.</li>
                <li>If you approve the purchase, Web3onboarding automatically transfers the domain to the buyer and credits your wallet with the purchase amount instantly.</li>
              </ul>

            </Collapse>
          </div>
          {/* FAQ item 3 */}
          <div
            onClick={() => setIsOpen3(!isOpen3)}
            className='cursor-pointer rounded-xl border-[0.5px]  py-7 px-4 mb-3'
          >
            <div className='flex items-center justify-between gap-2'>
              <p className='para-24 font-semibold'>
                <span className=''>3.</span> Vendors and Buyers
              </p>

              {isOpen3 ? <span className='rotate-180'>
                {reactIcons.arrowdown}
              </span>
                : <span> {reactIcons.arrowdown}</span>}
            </div>
            <Collapse in={isOpen3} className='pt-2 pl-7'>
              <h4 className='text-22 font-semibold'>How do I register as a vendor?</h4>
              <p className='pt-2  text-18 leading-[24px]'>
                There is no formal registration required. You can simply connect your Web3 wallet to list your domains on our marketplace.
              </p>
              <h4 className='text-22 font-semibold pt-6'>How do I register as a buyer?</h4>
              <p className='pt-2  text-18 leading-[24px]'>
                There is no formal registration required. You can simply connect your Web3 wallet to make offers and buyer domains on our marketplace.
              </p>

            </Collapse>
          </div>
          {/* FAQ item 4 */}
          <div
            onClick={() => setIsOpen4(!isOpen4)}
            className='cursor-pointer rounded-xl border-[0.5px]  py-7 px-4 mb-3'
          >
            <div className='flex items-center justify-between gap-2'>
              <p className='para-24 font-semibold'>
                <span className=''>4.</span> Renting
              </p>
              {isOpen4 ? <span className='rotate-180'>
                {reactIcons.arrowdown}
              </span>
                : <span> {reactIcons.arrowdown}</span>}
            </div>
            <Collapse in={isOpen4} className='pt-2 pl-7'>
              <h4 className='text-22 font-semibold'>How do I list my domain for renting?</h4>

              <ul className='flex flex-col list-disc pl-5 text-18 gap-2 pt-2'>
                <li>Navigate to Marketplace &gt; Web3 Domains &gt; List Domain</li>
                <li>Provide the domain name and description and hit submit. The next page opens up if the domain is in the wallet used to connect to the Web3onboarding platform.</li>
                <li>Scroll down to Rent on the domain listing details and specify the listing terms.</li>
                <li>Finalize the listing.</li>
                <li>View the listing by going to Seller Dashboard &gt; Domains for Rent</li>
              </ul>
            </Collapse>
          </div>
          {/* FAQ item 5 */}
          <div
            onClick={() => setIsOpen5(!isOpen5)}
            className='cursor-pointer rounded-xl border-[0.5px]  py-7 px-4 mb-3'
          >
            <div className='flex items-center justify-between gap-2'>
              <p className='para-24 font-semibold'>
                <span className=''>5.</span> Platform Fees

              </p>
              {isOpen5 ? <span className='rotate-180'>
                {reactIcons.arrowdown}
              </span>
                : <span> {reactIcons.arrowdown}</span>}
            </div>
            <Collapse in={isOpen5} className='pt-2 pl-7'>
              <h4 className='text-22 font-semibold'>What is the fee structure of the Web3onboarding marketplace?</h4>
              <p className='pt-2  text-18 leading-[24px]'>
                Web3 Onboarding collects a flat 2.25% fee from the seller on each item sold through our marketplace. There are no fees on the buyer side.
              </p>
            </Collapse>
          </div>

          {/* FAQ item 6 */}
          <div
            onClick={() => setIsOpen6(!isOpen6)}
            className='cursor-pointer rounded-xl border-[0.5px]  py-7 px-4 mb-3'
          >
            <div className='flex items-center justify-between gap-2'>
              <p className='para-24 font-semibold'>
                <span className=''>6.</span> 1Site —Web3 Website Builder
              </p>
              {isOpen6 ? <span className='rotate-180'>
                {reactIcons.arrowdown}
              </span>
                : <span> {reactIcons.arrowdown}</span>}
            </div>
            <Collapse in={isOpen6} className='pt-2 pl-7'>
              <h4 className='text-22 font-semibold'>How Do I Get Started?</h4>
              <p className='pt-2  text-18 leading-[24px]'>
                Navigate to 1Site from the top menu on the Web3onboarding marketplace. Click on Start Now to enter the website builder.
              </p>
              <h4 className='text-22 font-semibold pt-7'>How Do I Customize a Website?</h4>
              <p className='pt-2  text-18 leading-[24px]'>
                Write your website's title and include a logo from the options provided in the 1Site header section.
              </p>
              <p className='pt-2  text-18 leading-[24px]'>
                The Website Settings tab supports the integration of a fixed background image or color. You can also insert relevant site metadata such as Site Title, Description, and Favicon.
              </p>
              <p className='pt-2  text-18 leading-[24px]'>
                Next, use the Layout and Height features on the builder to add new sections to your website.
              </p>
              <p className='pt-2  text-18 leading-[24px]'>
                Click Add Section to add a selected layout or height to your website. You can use images, texts, and links and customize each section to your preference.
              </p>
              <p className='pt-2  text-18 leading-[24px]'>
                The Preview button allows you to view progress and includes an option to continue editing site features. Once satisfied with your website design, you can use the Complete button to exit the development phase.
              </p>
              <h4 className='text-22 font-semibold pt-7'>What is the service charge for the Web3 website builder?</h4>
              <p className='pt-2  text-18 leading-[24px]'>
                It costs only $49 USDC to create your Web3 website using our plug-and-play builder tool. The fee is required at checkout and only after you're satisfied with your website's design. Hold the USDC amount in your Polygon wallet to ensure a seamless checkout experience.
              </p>
              <h4 className='text-22 font-semibold pt-7'>I don't have a Web3 domain. What do I do?</h4>
              <p className='pt-2  text-18 leading-[24px]'>
                <Link href={'/marketplace'} className='text-white underline hover:text-white hover:opacity-60'>Mint a new Web3 domain </Link> (via our partners at Freename) or browse through the Web3 Onboarding <Link href={'/marketplace'} className='text-white underline hover:text-white hover:opacity-60'>Web3 domain marketplace</Link> to find your perfect domain.
              </p>

            </Collapse>
          </div>
          {/* FAQ item 7 */}
          <div
            onClick={() => setIsOpen7(!isOpen7)}
            className='cursor-pointer rounded-xl border-[0.5px]  py-7 px-4 mb-3'
          >
            <div className='flex items-center justify-between gap-2'>
              <p className='para-24 font-semibold'>
                <span className=''>7.</span> Blockchain and Transactions
              </p>
              {isOpen7 ? <span className='rotate-180'>
                {reactIcons.arrowdown}
              </span>
                : <span> {reactIcons.arrowdown}</span>}
            </div>
            <Collapse in={isOpen7} className='pt-2 pl-7'>
              <h4 className='text-22 font-semibold'>What are Gas Fees?</h4>
              <p className='pt-2  text-18 leading-[24px]'>
                This is a fee paid to the underlying blockchain network to validate and confirm transactions you conduct on our marketplace.
              </p>
              <p className='pt-2  text-18 leading-[24px]'>
                While we optimize our smart contracts to ensure users get the best fees, we do not in any way define the gas fee. The gas fee is controlled by external factors such as increased network usage or congestion.
              </p>
              <p className='pt-2  text-18 leading-[24px]'>
                Meanwhile, the Web3onboarding marketplace utilizes the Polygon blockchain, ensuring low fees and fast settlements.
              </p>
              <h4 className='text-22 font-semibold pt-7'>How Do I Get My Transaction Hash?</h4>
              <p className='pt-2  text-18 leading-[24px]'>
                An Web3onboarding customer representative may require your transaction hash to assist in the investigation of a failed order.
              </p>
              <p className='pt-2  text-18 leading-[24px]'>
                You can find the transaction hash by checking your wallet's transaction history and opening the failed transaction on a block explorer. The transaction hash is usually visible in the failed transaction history.
              </p>
            </Collapse>
          </div>
          {/* FAQ item 8 */}
          <div
            onClick={() => setIsOpen8(!isOpen8)}
            className='cursor-pointer rounded-xl border-[0.5px]  py-7 px-4 mb-3'
          >
            <div className='flex items-center justify-between gap-2'>
              <p className='para-24 font-semibold'>
                <span className=''>8.</span> Security
              </p>
              {isOpen8 ? <span className='rotate-180'>
                {reactIcons.arrowdown}
              </span>
                : <span> {reactIcons.arrowdown}</span>}
            </div>
            <Collapse in={isOpen8} className='pt-2 pl-7'>
              <h4 className='text-22 font-semibold'>How does Web3onboarding guarantee platform security?</h4>
              <p className='pt-2  text-18 leading-[24px]'>
                Web3 Onboarding guarantees platform security by using industry-grade technical infrastructure to host its marketplace and associated properties. Similarly, we embrace the highest blockchain security standards with a verifiable audit of all smart contracts underpinning the platform.
              </p>
              <p className='pt-2  text-18 leading-[24px]'>
                Web3 Onboarding also conducts periodic security audits ensuring customers can transact freely on our marketplace without worrying about the risk of security breaches.
              </p>
              <h4 className='text-22 font-semibold pt-7'>What if a vendor is selling a hacked or stolen domain?</h4>
              <p className='pt-2  text-18 leading-[24px]'>
                Web3 Onboarding has zero tolerance for vendors trying to sell hacked or stolen Web3 domains on our marketplace. Our team will promptly investigate complaints submitted about any such domains listed on our platform and place a permanent ban on accounts that violate these rules.
              </p>
            </Collapse>
          </div>
          {/* FAQ item 9 */}
          <div
            onClick={() => setIsOpen9(!isOpen9)}
            className='cursor-pointer rounded-xl border-[0.5px]  py-7 px-4 mb-3'
          >
            <div className='flex items-center justify-between gap-2'>
              <p className='para-24 font-semibold'>
                <span className=''>9.</span> FAQ for Beginners: NFTs and Wallet
              </p>
              {isOpen9 ? <span className='rotate-180'>
                {reactIcons.arrowdown}
              </span>
                : <span> {reactIcons.arrowdown}</span>}
            </div>
            <Collapse in={isOpen9} className='pt-2 pl-7'>
              <h4 className='text-22 font-semibold'>What is a wallet?</h4>
              <p className='pt-2  text-18 leading-[24px]'>
                A wallet is a piece of software that allows users to hold and transfer digital assets, as well as interact with decentralized protocols such as those used on the Web3onboarding marketplace.
              </p>
              <p className='pt-2  text-18 leading-[24px]'>
                We strongly recommend using the Metamask wallet to get the best experience on Web3 Onboarding.
              </p>
              <h4 className='text-22 font-semibold pt-7'>What is a wallet address?</h4>
              <p className='pt-2  text-18 leading-[24px]'>
                A wallet address is a unique identifier similar to your bank account number. It is used to send and receive digital assets in your wallet.
              </p>
              <h4 className='text-22 font-semibold pt-7'>Which wallets are supported on Web3 Onboarding?
              </h4>
              <p className='pt-2  text-18 leading-[24px]'>
                The Web3onboarding marketplace currently supports Metamask and the WalletConnect integration available on most popular <Link className='text-white underline hover:text-white hover:opacity-60' href={'/'}> Web3 wallets</Link> including Coinbase and Trust Wallet.
              </p>
              <h4 className='text-22 font-semibold pt-7'>What is an NFT?
              </h4>
              <p className='pt-2  text-18 leading-[24px]'>
                An NFT is a unique blockchain-based asset that enables ownership of digital items such as art, music, in-game characters, Web3 domains, and more.
              </p>
            </Collapse>
          </div>
        </div>
      </div>
    </main>
    {/* <Footer /> */}
    </>
  )
}

// export default withAuth(FAQs)
export default FAQs
