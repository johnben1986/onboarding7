import Image from 'next/image'
import React, { useState } from 'react'
import logo from '/public/assets/images/web3png.png'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { reactIcons } from 'components/utils/icons'
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
SwiperCore.use([Navigation]);
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
// import { reactIcons } from 'components/utils/icons';
// SwiperCore.use([Autoplay, Navigation, FreeMode,]);
const Featured = () => {
    // const autoPlayOptions = {
    //     delay: 3000,
    //     disableOnInteraction: false,
    //     pauseOnMouseEnter: false,
    //     reverseDirection: false,
    //     stopOnLastSlide: false,
    //   };

    const slides = [
        'All',
        'https://example.com/slide2.jpg',
        'https://example.com/slide3.jpg',
    ];

    const [btn, setBtn] = useState([
        { btn: ' All' },
        { btn: ' Crypto/Blockchain' },
        { btn: ' music' },
        { btn: ' Gaming' },
        { btn: ' Technology' },
        { btn: ' Jobs & Careers' },
        { btn: ' real estate' },
    ]);
    // const data: [

    // ]
    const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);

    const handleButtonClick = (index) => {
        setSelectedButtonIndex(index);
    };
    return (
        <main className='bg-image5 min-h-screen'>
            <div className="container">
                <div className="pt-5">
                    {/* Navbar */}
                    <nav className='h-[78px] bg-primary-newBgColor/80 rounded-full border border-white px-5 flex items-center justify-between py-2'>
                        <div className="">
                            <Image src={logo} width={200} height={200} className='w-[90px]' />
                        </div>
                        <div className="flex items-center gap-4">
                            <ul className='flex items-center gap-3'>
                                <li>
                                    <div className=" text-right">
                                        <Menu as="div" className="relative inline-block text-left">
                                            <div>
                                                <Menu.Button className="inline-flex w-full justify-center items-center px-4 py-2 text-sm font-medium text-white ">
                                                    Mint a Domain
                                                    <span
                                                        className="ml-2 "
                                                        aria-hidden="true">{reactIcons.down}</span>

                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <div className="px-1 py-1 ">
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button
                                                                    className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                >
                                                                    {active ? (
                                                                        <span
                                                                            className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                                                                            aria-hidden="true">{reactIcons.dropdown}</span>

                                                                    ) : (
                                                                        <span
                                                                            className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                                                                            aria-hidden="true">{reactIcons.dropdown}</span>

                                                                    )}
                                                                    Edit
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button
                                                                    className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                >
                                                                    {active ? (
                                                                        <span
                                                                            className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                                                                            aria-hidden="true">{reactIcons.dropdown}</span>

                                                                    ) : (
                                                                        <span
                                                                            className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                                                                            aria-hidden="true">{reactIcons.dropdown}</span>

                                                                    )}
                                                                    Duplicate
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                    </div>

                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                </li>
                                <li>
                                    <div className=" text-right">
                                        <Menu as="div" className="relative inline-block text-left">
                                            <div>
                                                <Menu.Button className="inline-flex w-full justify-center items-center px-4 py-2 text-sm font-medium text-white ">
                                                    List an Asset
                                                    <span
                                                        className="ml-2 "
                                                        aria-hidden="true">{reactIcons.down}</span>

                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <div className="px-1 py-1 ">
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button
                                                                    className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                >
                                                                    {active ? (
                                                                        <span
                                                                            className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                                                                            aria-hidden="true">{reactIcons.dropdown}</span>

                                                                    ) : (
                                                                        <span
                                                                            className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                                                                            aria-hidden="true">{reactIcons.dropdown}</span>

                                                                    )}
                                                                    Edit
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button
                                                                    className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                >
                                                                    {active ? (
                                                                        <span
                                                                            className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                                                                            aria-hidden="true">{reactIcons.dropdown}</span>

                                                                    ) : (
                                                                        <span
                                                                            className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                                                                            aria-hidden="true">{reactIcons.dropdown}</span>

                                                                    )}
                                                                    Duplicate
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                    </div>

                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>{reactIcons.shopping}</span>
                            <span>Username</span>
                            <div className="bg-primary-hoverBg w-8 h-8 rounded-full relative overflow-hidden">
                                <Image src={logo} fill className='object-cover' />
                            </div>
                        </div>
                    </nav>
                    <div className="section-center">
                        <p className='font-semibold'>Categories</p>
                        <div className="pt-3 border-b-2 "></div>
                        <div className="flex items-center gap-3 pt-5">
                            {btn.map((item, index) => (
                                <button
                                    className={`border min-w-[90px] py-2 px-4 rounded-full ${selectedButtonIndex === index ? 'bg-white text-black' : 'bg-none text-white'}`}
                                    key={index}
                                    onClick={() => handleButtonClick(index)}
                                >
                                    {item.btn}
                                </button>
                            ))}
                        </div>
                        <div className="pt-5">
                            <h2 className='heading-2 text-center'>Featured</h2>
                            <div className="grid grid-cols-3 gap-3 pt-5">
                                {Array(3).fill(3).map((_item, index) => (
                                    <div className="col-span-1 ">
                                        <div className="rounded-lg overflow-hidden border">
                                            <div className="h-[250px] bg-primary-1000 border-b-2"></div>
                                            <div className="p-3 px-4">
                                                <h3 className='tex'>Title:</h3>
                                                <div className="pt-8 grid grid-cols-2 gap-1 justify-between">
                                                    <div className="col-span-1"><h4 className='text-[#CED6FF] text-18'>TLD/DOMAIN</h4></div>
                                                    <div className="col-span-1"><h4 className='text-[#CED6FF] text-18'>Price</h4></div>
                                                </div>
                                                <div className="grid grid-cols-2 pt-4">
                                                    <div className="col-span-1 flex items-center gap-1 text-[#CED6FF]"><span className='text-[#E8AFF6]'>{reactIcons.person}</span>by ali32</div>
                                                    <div className="col-span-1 flex items-center gap-1 text-[#CED6FF]"><span className='text-[#E8AFF6]'>{reactIcons.tag}</span>Category</div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Featured