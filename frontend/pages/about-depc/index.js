import React from 'react'
import BecomePartner from 'components/BecomePartner'
import FoundersCarousel from 'components/AboutPage/FoundersCarousel'
import Image from 'next/image'
import unstoppable from '/public/assets/images/unstoppable.png'
import coinfomania from '/public/assets/images/coinfomania.png'
import freename from '/public/assets/images/freename.png'

const About = () => {
    return (
        <main className='bg-image section-center'>
            <div className="container section-center">
                <div className="grid grid-cols-12">
                    <div className="col-span-6">
                        <h2 className="heading-1 text-center">Who We Are ?</h2>
                        <p className='para-24 pt-5'>We are a team of individuals passionate about Web3 and eager to help
                            people create immense value from this brave new world. To accomplish
                            this, we are creating solutions that accelerate the adoption of Web3
                            domains and other digital assets.</p>
                    </div>
                    <div className="col-span-6"></div>

                </div>
                <div className="section-center">
                    <h3 className='heading-3 text-center max-w-[1136px] w-full mx-auto'>“Over 300 million crypto users, less than 3 million
                        utilizing Web3 domain names. We’re on
                        a mission  to change this”</h3>
                </div>
                <div className="">
                    <h2 className="heading-1 text-center">Our Story</h2>
                    <div className="grid grid-cols-12">
                        <div className="col-span-6">
                            <div className="space-y-5 xl:space-y-7 pt-[25px] xl:pt-[50px]">
                                <p className=' para-24 leading-[25px] xl:leading-[38px]'>
                                    Web3 Onboarding started with Sheldon, an enthusiastic domainer
                                    from the 90s stumbling on the world of Web3 domains. He was instantly
                                    attracted by the fresh playing field and the chance to join the early phase
                                    of a new product cycle. He went on the search for hot potential domains.
                                </p>
                                <p className=' para-24 leading-[25px] xl:leading-[38px]'>
                                    However, the harsh reality immediately faced him; the industry was
                                    indeed still in its formative years. The potential of Web3 domains hid in
                                    the clutter of NFT on unorganized trading platforms..
                                </p>
                                <p className=' para-24 leading-[25px] xl:leading-[38px]'>
                                    There were no sophisticated marketplaces or infrastructure as in the Web2
                                    domain world. Sheldon’s entrepreneurial instincts made it clear that this
                                    was a clear market opportunity to help accelerate Web3 adoption.
                                </p>
                                <p className=' para-24 leading-[25px] xl:leading-[38px]'>
                                    Web3 Onboarding was born to address these challenges and create
                                    sustainable value for users that recognize the immense potential
                                    embedded in Web3 domains. The EDA marketplace would provide all the
                                    tools needed to make it happen and eventually expand to include all other
                                    product lines associated with digital assets.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-center pb-0">
                    <h1 className='heading-1 text-center'>Our Partners</h1>
                    <div className="grid grid-cols-3 gap-20 justify-center items-center pt-[50px]">
                        <div className="col-span-1">
                            <Image src={unstoppable} width={410} height={91} className='w-[400px] mx-auto' />
                        </div>
                        <div className="col-span-1">
                            <Image src={coinfomania} width={768} height={167} className='w-[400px] mx-auto' />

                        </div>
                        <div className="col-span-1">
                            <Image src={freename} width={1146} height={143} className='w-[400px] mx-auto' />

                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                <h2 className='heading-1 text-center py-20'>
                    Meet Our Team
                </h2>
                <FoundersCarousel />
            </div>
            <BecomePartner />
        </main>
    )
}

export default About