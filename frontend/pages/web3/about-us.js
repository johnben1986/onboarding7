import Image from 'next/image'
import React from 'react'
import web from "/public/assets/images/web3logo.png"
import { reactIcons } from 'components/utils/icons'
import sheldon from '/public/assets/images/sheldon.png'
import jacob from '/public/assets/images/jacob.png'
import ryno from '/public/assets/images/ryno.png'
import lisa from '/public/assets/images/lisa.png'
import linkedin from '/public/assets/images/linkedin.png'
import twitter from '/public/assets/images/twitter.png'
import Link from 'next/link'

const AboutUs = () => {
    const personList = [
        {
            img: sheldon,
            post: 'President & Co-Founder',
            name: 'Sheldon Benson',
            gmail: 'manager@web3onboarding.com',

        },
        {
            img: jacob,
            post: 'CEO & Co-Founder',
            name: 'Jacob Benson',
            gmail: 'jake@web3onboarding.com',

        },
        {
            img: ryno,
            post: 'Chief of Operations',
            name: 'Ryno Van Der Walt',
            gmail: 'ryno@web3onboarding.com',

        },
        {
            img: lisa,
            post: 'Chief Financial Officer',
            name: 'Lisa Koebel',
            gmail: 'info@web3onboarding.com',

        }
    ]
    return (
        <main className='min-h-screen bg-image3'>
            <nav className=' border-b h-[70px] lg:h-[100px] flex justify-between items-stretch'>
                <div className="flex-center px-4">
                    <Image className='w-[140px]' width={200} height={200} src={web} />
                </div>
                <div className="border-x flex-1 flex items-center px-4">
                    <h4 className='text lg:text-24 font-semibold '>About Us</h4>
                </div>
                <div className="flex items-center gap-3 px-4">
                    <span>{reactIcons.shopping}</span>
                    <span>Username</span>
                    <div className="bg-primary-hoverBg w-8 h-8 rounded-full relative overflow-hidden">
                        <Image src={web} fill className='object-cover' />
                    </div>
                </div>
            </nav>
            <div className="min-h-[calc(100vh-70px)] lg:min-h-[calc(100vh-100px)] flex-center">
                <div className="container max-w-[1100px] py-5">
                    <h3 className='text-22 font-semibold text-center'>Who Are We?</h3>
                    <p className='text-center pt-4 lg:pt-8 text-20'>We are a team of individuals passionate about Web3 and eager to help people create immense value from this brave new world. To accomplish this, we are creating solutions that accelerate the adoption of Web3 domains and other digital assets.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pt-4 lg:pt-8">
                        {personList.map((item, index) => (
                            <div key={index} className="col-span-1">
                                <div className="border rounded-2xl bg-primary-newBgColor/40 p-3">
                                    <div className="rounded-xl overflow-hidden h-40 relative bg-white">
                                        <Image src={item.img} fill className='object-cover' />
                                    </div>
                                    <div className="pt-3">
                                        <p className='text-14'>{item.post}</p>
                                        <h4 className='font-semibold text-22'>{item.name}</h4>
                                        <p className='text-14 pt-3'>{item.gmail}</p>
                                        <div className="flex-center pt-3 gap-3">
                                            <Link href={''}>  <Image src={linkedin} className='w-[40px]' /></Link>
                                            <Link href={''}> <Image src={twitter} className='w-[40px]' /></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AboutUs