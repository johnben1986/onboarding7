import Image from 'next/image'
import React from 'react'
import web from "/public/assets/images/web3logo-white.png"
import { reactIcons } from 'components/utils/icons'
const QuickBuildTutorial = () => {
    return (
        <main className='min-h-screen bg-image4'>
            <nav className=' border-b h-[100px] flex justify-between items-stretch'>
                <div className="flex-center px-4">
                    <Image className='w-[140px]' width={200} height={200} src={web} />
                </div>
                <div className="border-x flex-1 flex-center">
                    <h4 className='text-24 font-semibold text-center'>Quickbuild Tutorial + Examples</h4>
                </div>
                <div className="flex items-center gap-3 px-4">
                    <span>{reactIcons.shopping}</span>
                    <span>Username</span>
                    <div className="bg-primary-hoverBg w-8 h-8 rounded-full relative overflow-hidden">
                        <Image src={web} fill className='object-cover' />
                    </div>
                </div>
            </nav>
            <div className="grid grid-cols-2 gap-16 pt-10 px-10 min-h-[calc(100vh-100px)]">
                <div className="col-span-1 flex flex-col gap-4 3xl:gap-8 justify-around">
                    <div className="min-h-[200px] max-h-[250px] 3xl:max-h-[300px] h-full p-3 rounded-xl border-2 flex flex-col justify-between gap-2 bg-primary-newBgColor/20">
                        <div className="flex justify-between gap-2">
                            <div className=""></div>
                            <div className="text-center text-20 font-semibold">Quickbuild Tutorial Video</div>
                            <span className='text-20'>{reactIcons.arrowright}</span>
                        </div>
                        <p className='text-20 text-center'>Learn about Quickbuild, view our easy to follow Tutorial video!</p>
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
                            <div className="text-center text-20 font-semibold">Quickbuild Tutorial Video</div>
                            <div className=""></div>
                        </div>
                        <p className='text-20 text-center'>Learn about Quickbuild, view our easy to follow Tutorial video!</p>
                        <div className="">
                            <button className='bg-white flex-center border border-black rounded-full px-8 mx-auto py-3 font-semibold text-black text-18'> w30 Youtube</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default QuickBuildTutorial