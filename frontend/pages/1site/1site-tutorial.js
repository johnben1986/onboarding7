import Image from 'next/image'
import React from 'react'
import web from "/public/assets/images/web3logo-white.png"
import { reactIcons } from 'components/utils/icons'
import Navbar from 'components/Layout/Navbar'
import Footer from 'components/Layout/Footer'
import { withAuth } from 'components/Auth/authMiddleware'
import MetadataHelper from 'components/MetadataHelper'
const QuickBuildTutorial = () => {
    return (
        <main className='min-h-screen bg-image4'>
           <MetadataHelper noindex title="1Site Tutorial" />
            <Navbar title={'1Site Tutorial + Examples'} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-10 px-10 mb-6">
                <div className="col-span-1 flex flex-col gap-4 3xl:gap-8 justify-around">
                    <div className="min-h-[200px] max-h-[250px] 3xl:max-h-[300px] h-full p-3 rounded-xl border-2 flex flex-col justify-between gap-2 bg-primary-newBgColor/20">
                        <div className="flex justify-between gap-2">
                            <div className=""></div>
                            <div className="text-center text-20 font-semibold">1Site Tutorial Video</div>
                            <span className='text-20'>{reactIcons.arrowright}</span>
                        </div>
                        <p className='text-20 text-center'>Learn about 1Site, view our easy to follow Tutorial video!</p>
                        <div className="">
                            <button className='bg-white flex-center border border-black rounded-full px-8 mx-auto py-3 font-semibold text-black text-18'> w30 Youtube</button>
                        </div>
                    </div>
                    <div className="min-h-[200px] max-h-[280px] 3xl:max-h-[350px] h-full">
                        <video
                            className="h-full w-full object-cover"
                            autoPlay
                            loop
                            muted
                            src="/assets/images/web3video.mp4"
                        ></video>
                    </div>
                </div>
                <div className="col-span-1 flex flex-col gap-4 3xl:gap-8 justify-around">
                    <div className="min-h-[200px] max-h-[280px] 3xl:max-h-[350px] h-full border-4">
                        <video
                            className="h-full w-full object-cover"
                            autoPlay
                            loop
                            muted
                            src="/assets/images/web3video.mp4"
                        ></video>
                    </div>
                    <div className="min-h-[200px] max-h-[250px] 3xl:max-h-[300px] h-full p-3 rounded-xl border-2 flex flex-col justify-between gap-2 bg-primary-newBgColor/20">
                        <div className="flex justify-between gap-2">
                            <span className='text-20'>{reactIcons.arrowleft}</span>
                            <div className="text-center text-20 font-semibold">1Site Tutorial Video</div>
                            <div className=""></div>
                        </div>
                        <p className='text-20 text-center'>Learn about 1Site, view our easy to follow Tutorial video!</p>
                        <div className="">
                            <button className='bg-white flex-center border border-black rounded-full px-8 mx-auto py-3 font-semibold text-black text-18'> w30 Youtube</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}

export default withAuth(QuickBuildTutorial);