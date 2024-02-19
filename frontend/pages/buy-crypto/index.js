import Image from 'next/image'
import React, { useEffect } from "react";
import transakicon from '/public/assets/images/transak.png'
import { useTransak } from "hooks/useTransak";

const BuyCrypto = () => {

   
    const { transak } = useTransak();

    return (
        <main className='section-center bg-image4'>
            <div className='section-center container'>
                <h2 className='heading-1 text-center text-white'>Buy Crypto</h2>
                <p className='para-24 pt-[30px] text-center text-white'>
                    We've integrated the Transak On-Ramp feature in our app to enable our users to buy crypto directly inside EDA using
                    fiat currencies via different payment methods such as card, bank transfer and other local payment methods.
                </p>
                <div className="section-center pb-0">
                    <Image width={704} height={147} className=' max-w-[700px] mx-auto w-full' src={transakicon} />
                    <button className='btn-lg mx-auto mt-20'  onClick={() => {transak.launch();}}>Buy Now</button>
                </div>
            </div>
        </main>
    )
}

export default BuyCrypto