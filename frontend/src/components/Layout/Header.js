import React, {useState} from "react";
import web3img from "/public/assets/images/web3logo-white.png";
import Link from "next/link";
import Image from "next/image";
import Account from "components/Account/Account";
import HeaderDropdown from "components/Dropdown/HeaderDropdown";
import { Router, useRouter } from "next/router";
import { reactIcons } from "components/utils/icons";
import ProfileDropdown from "components/Dropdown/ProfileDropdown";
import web3 from "/public/assets/images/web3logo.png"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeNav = () => {
    setIsOpen(false);
  };
  const links = [
    { title: 'Home', url: '/home' },
     { title: 'What is Web3', url: '/whatisweb3' },
    { title: 'Marketplace', url: '/marketplace' },
    { title: '1Site', url: '/1site' },
    // { title: 'Web3 Essentials', url: '/essentials' },
    // { title: 'Plans', url: '/plans' },
    // { title: 'Help', url: '/help' },
  ];
  const router = useRouter();
  const handleButtonClick = () => {
    // router.push('/users/me');
    router.push('/profile');
  };
  return (
    <nav className="w-full bg-blue-900 px-0  transition-all">
      <div className="flex h-[82px] items-center justify-between gap-4 rounded-full px-[30px]">
        <div>
          <Link href="/">
            <Image
              src={web3img}
              width={100}
              height={100}
              className="w-full max-w-[113px] cursor-pointer"
              alt=""
            ></Image>
          </Link>
        </div>
        <div
          className={`flex flex-1 items-center space-x-5 mobile-list ${
            isOpen ? "block" : "hidden lg:block"
          }`}
        >
          <ul className="flex-1 items-center justify-end gap-5 lg:flex text-white bg-blue-900 w-full">
            {links.map((link) => (
              <li key={link.title} onClick={closeNav}>
                <Link href={link.url} className="text-16">
                  <span>{link.title}</span>
                </Link>
              </li>
            ))}
            <li>
              <HeaderDropdown onClick={closeNav} />
            </li>
            <li>
              <Account />
            </li>
            <li>
              <ProfileDropdown onClick={closeNav} />
            </li>
          </ul>
        </div>
        {/* <div onClick={toggleMenu} className="bg-primary-hoverBg cursor-pointer w-8 h-8 rounded-full relative overflow-hidden">
                            <Image src={web3} fill className='object-cover' />
        </div> */}
        <button className="lg:hidden text-black" onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M3 12h18M3 6h18M3 18h18"></path>
            </svg>
          </button>
      </div>
    </nav>
  );
};

export default Header;
