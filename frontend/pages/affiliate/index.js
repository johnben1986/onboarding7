import Image from 'next/image'
import React from 'react'
import web from "/public/assets/images/web3logo.png"
import become from "/public/assets/images/flow.png"
import { reactIcons } from 'components/utils/icons'
import Footer from 'components/Layout/Footer'
import Navbar from 'components/Layout/Navbar'
import { withAuth } from 'components/Auth/authMiddleware'
import MetadataHelper from 'components/MetadataHelper'
const BecomeAffiliate = () => {
    return (
        <>
        <main className='min-h-screen bg-image3'>
            <MetadataHelper noindex title="Become an Affiliate" />
            {/* <nav className=' border-b h-[100px] flex justify-between items-stretch'>
                <div className="flex-center px-4">
                    <Image className='w-[140px]' width={200} height={200} src={web} />
                </div>
                <div className="border-x flex-1 flex-center">
                    <h4 className='text-24 font-semibold text-center text-white'>Become an Affiliate!</h4>
                </div>
                <div className="flex items-center gap-3 px-4 text-white">
                    <span>{reactIcons.shopping}</span>
                    <span>Username</span>
                    <div className="bg-primary-hoverBg w-8 h-8 rounded-full relative overflow-hidden">
                        <Image src={web} fill className='object-cover' />
                    </div>
                </div>
            </nav> */}
            {/* <Navbar title="Become an Affiliate!" /> */}
            <div className="min-h-[calc(100vh-100px)] flex-center my-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-10 px-10 max-w-[1200px] 2xl:max-w-[1400px] mx-auto">
                    <div className="col-span-1 border rounded-xl bg-primary-newBgColor2/30 px-4 p-5 pt-8 flex flex-col gap-3 justify-between">
                        <div className="pt-7">
                            <h4 className='font-semibold text-20 text-center text-white'>No purchase necessary to join.
                            </h4>
                                <p className='text-center text-20 pt-8 text-white'>
                                Earn $50 every time a $200 1Site website is ordered directly through your affiliate link.
Second tier pays you $12.50. So, you make $12.50 from sales generated from the customer of your customer.
                                </p>
                                <p className='text-center text-20 pt-8 text-white'>
                                If you get a white label / rebranded 1Site API for your own site, you will automatically be paid $62.50- The equivalent to being paid for 2 tiers,
on every sale you make!
                                </p>
                                <p className='text-center text-20 pt-8 text-white'>
                                The $100.00 charge for websites we build for customers is not included in the program.
Affiliates are not authorized to build websites for customers due to quality control reasons.
                            </p>
                        </div>
                        <div className="flex items-center justify-between gap-3 pt-10">
                        <a className='flex flex-col justify-center   gap-1 items-center min-h-[48px] bg-white border border-black text-14 lg:text-20 rounded-full py-2 px-5 text-black' href="https://decentrasite.tapfiliate.com/" target='_blank'>Become an Affiliate! <span className='text-24'>{reactIcons.person}</span></a>
                            <a className=' flex-col justify-center  flex gap-1 items-center min-h-[48px] bg-[#5CD1FD] border border-black text-14 lg:text-20 rounded-full py-2 px-5 text-black' href="https://drive.google.com/drive/folders/1xXqU_ieo1Dc4hnzatuGHhIyDLDuqdP7l" target='_blank'>Marketing Materials <span className='text-24'>{reactIcons.person}</span></a>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <Image src={become} width={600} height={600} className='w-[360px] 2xl:w-[600px] mx-auto'/>
                    </div>
                </div>
            </div>
        </main>
        {/* <Footer /> */}
        </>
    )
}
export default BecomeAffiliate;
// export default withAuth(BecomeAffiliate);