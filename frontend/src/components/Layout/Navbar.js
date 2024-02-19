import React from "react";
import Link from 'next/link'
import web from "/public/assets/images/web3logo-white.png"
import Image from 'next/image'
import { reactIcons } from 'components/utils/icons'
import Account from "components/Account/Account";
const Navbar = (props) => {
    return(
        <nav className=' border-b h-[70px] lg:h-[100px] flex text-center items-stretch'>
        <div className="flex-center px-4 md:w-[140px] sm:w-[100px]">
            <Link href={'/home'} className="md:w-[140px] sm:w-[100px] block">
                <Image className='lg:w-[140px] md:w-[100px]' width={200} height={200} src={web} />
            </Link>
        </div>
        <div className="border-x flex-1 flex items-center px-4">
            <h4 className='text lg:text-24 font-semibold text-white'>{props.title}</h4>
        </div>
        <div className="flex items-center gap-3 px-4 text-white">
            <Account textClass="text-white" />
        </div>
    </nav>
    )
}

export default Navbar;