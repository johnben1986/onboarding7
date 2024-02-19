import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import web3img from "/public/assets/images/web3logo-white.png";

const ResisterSuccess = () => {
    return (
        <div className='min-h-screen bg-image4 flex-center px-2'>
            <div className="rounded-2xl overflow-hidden bg-white md:max-w-[600px] xl:max-w-[1000px] w-full p-6 bg-opacity-10">
                <div className=''>
                    <Link href="/home">
                        <Image
                            src={web3img}
                            width={500}
                            height={400}
                            className="w-[120px] md:w-[180px] lg:w-[120px] xl:w-[180px] xl2:w-[320px] mx-auto cursor-pointer"
                        ></Image>
                    </Link>
                </div>
                <div className="text-center pt-3 lg:pt-10 max-w-[800px] w-full mx-auto">
                    <h2 className='heading-4 text-white'>Registration was completed successfully!</h2>
                    <p className='font-semibold text-slate-400 pt-3 lg:pt-10'>Thank you for registering with us. Please check your email for a request to confirm your registration.</p>
                    <p className='font-semibold text-slate-400'>To complete your registration, please click the link in the email.</p>
                    <p className='font-semibold text-slate-400'>We are excited to collaborate with you!</p>
                    <div className="pt-3 lg:pt-10">
                        <Link href={'/login'} className='text-white font-semibold hover:text-white hover:opacity-50'>Return to Home and <div className="max-w-[120px] h-[2px] mx-auto rounded-full bg-slate-500 border-t-2 border-gray-400">
                        </div>
                        Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResisterSuccess