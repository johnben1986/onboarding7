import Image from 'next/image'
import React from 'react'
import sheldon from '/public/assets/images/sheldon.png'
import web3 from '/public/assets/images/web3logo.png'
const OurStory = () => {

    return (
        <main className='min-h-screen bg-image3 flex-center'>
            <div className="container max-w-[1100px] ">
                <div className="py-5">
                    <h4 className='text-24 lg:text-28 font-semibold text-center'>Our Story</h4>
                    <div className="flex flex-col items-center md2:flex-row justify-between gap-4 pt-10">
                        <div className="max-w-[600px] w-full border rounded-xl bg-primary-newBgColor2/40 p-5">
                            <p className='text-center'>Web3 Onboarding started with Sheldon, an enthusiastic domainer from the 90s stumbling on the world of Web3 domains. He was instantly attracted by the fresh playing field and the chance to join the early phase of a new product cycle. He went on the search for hot potential domains.</p>
                            <p className='text-center'>However, the harsh reality immediately faced him; the industry was indeed still in its formative years. The potential of Web3 domains hid in the clutter of NFT on unorganized trading platforms.</p>
                            <p className='text-center'>There were no sophisticated marketplaces or infrastructure as in the Web2 domain world. Sheldon’s entrepreneurial instincts made it clear that this was a clear market opportunity to help accelerate Web3 adoption.</p>
                            <p className='text-center'>Web3 Onboarding was born to address these challenges and create sustainable value for users that recognize the immense potential embedded in Web3. The Web3 Onboarding platform would provide all the tools needed to make it happen and eventually expand to include all other product lines associated with digital assets.</p>
                        </div>
                        <div className="w-full max-w-[300px] p-3 overflow-hidden rounded-xl bg-white">
                            <div className="min-h-[200px] xl2:min-h-[260px] bg-primary-newBgColor2/20 rounded-lg overflow-hidden relative">
                                <Image className='object-cover' fill src={sheldon} />
                            </div>
                            <div className="">
                                <Image src={web3} className='w-full' width={300} height={300}  />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    )
}

export default OurStory