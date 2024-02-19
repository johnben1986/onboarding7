import React, { useState } from 'react'
import SwiperCore, { Autoplay, FreeMode, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";



import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { reactIcons } from 'components/utils/icons';


SwiperCore.use([Autoplay, Navigation, FreeMode,]);
const Partners = () => {
  const autoPlayOptions = {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: false,
    reverseDirection: false,
    stopOnLastSlide: false,
  };


  const data = [
    {
      head: 'Continuum',
      name: 'Continuum'
    },
    {
      head: 'Blok Investments',
      name: 'Blok Investments'
    },
    {
      head: 'Unstoppable Domains',
      name: 'Unstoppable Domains'
    },
    {
      head: 'Freename',
      name: 'Freename'
    },
    {
      head: 'ENS Domains',
      name: 'ENS Domains'
    },
    {
      head: 'Continuum',
      name: 'Continuum'
    },
  ];
  const breakpoints = {
    768: {
      slidesPerView: 2, // Show 2 slides on screens larger than 768px
    },
    1024: {
      slidesPerView: 5, // Show 3 slides on screens larger than 1024px
    },
  };
  const customNavigation = {
    prevEl: '.custom-swiper-button-prev',
    nextEl: '.custom-swiper-button-next',
  };
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form validation here
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      alert('Please fill in all required fields.');
      return;
    }

    // You can send the form data to your server or perform other actions here
    console.log('Form data submitted:', formData);

    // Optionally, reset the form fields
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      message: '',
    });
  };

  // Define an array of form field objects
  const formFields = [
    { id: 'First', name: 'firstName', label: 'First Name*', type: 'text', required: true },
    { id: 'Last', name: 'lastName', label: 'Last Name*', type: 'text', required: true },
    { id: 'Email', name: 'email', label: 'Email*', type: 'email', required: true },
    { id: 'Message', name: 'message', label: 'Message*', type: 'text', required: true },
  ];
  return (
    <main className='bg-image3 min-h-screen'>
      <div className="border-b-2 overflow-hidden rounded-b-2xl bg-primary-newBgColor2/30 ">
        <h2 className='heading-4 text-center pt-2'>Partners</h2>
        <div className="py-5">
          <Swiper
            spaceBetween={30}
            breakpoints={breakpoints}
            navigation={customNavigation}
            className='relative !px-8'
          >
            {data.map((item, index) => (
              <SwiperSlide key={index} className='items-end'>
                <div className="flex flex-col gap-2">
                  <div className="flex-center">
                    <h4 className='heading-5'>{item.head}</h4>
                  </div>
                  <div className="bg-white text-black p-2">{item.name}</div>
                </div>
              </SwiperSlide>
            ))}
            <div className="custom-swiper-button-prev ay-center z-20 -left-5">{reactIcons.arrowleft}</div>
            <div className="custom-swiper-button-next ay-center z-20 -right-5">{reactIcons.arrowright}</div>
          </Swiper>
        </div>
      </div>
      <div className="container flex-center py-10">
        <div className="max-w-[600px] w-full">
          <h4 className='heading-4 text-center'>Become a Partner</h4>
          <form
            className="border grid grid-cols-2 gap-10 mt-5 bg-primary-newBgColor2/40 p-2 px-4 rounded-2xl"
            onSubmit={handleSubmit}
          >
            <div className="col-span-1 flex flex-col gap-5">
              <label htmlFor="First">First Name*</label>
              <input
                type="text"
                id="First"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="focus:outline-0 bg-transparent border-b border-slate-400"
                required
              />
            </div>
            <div className="col-span-1 flex flex-col gap-5">
              <label htmlFor="Last">Last Name*</label>
              <input
                type="text"
                id="Last"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="focus:outline-0 bg-transparent border-b border-slate-400"
                required
              />
            </div>
            <div className="col-span-2 flex flex-col gap-5">
              <label htmlFor="Email">Email*</label>
              <input
                type="email"
                id="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="focus:outline-0 bg-transparent border-b border-slate-400"
                required
              />
            </div>
            <div className="col-span-2 flex flex-col gap-5">
              <label htmlFor="Message">Message*</label>
              <textarea
                placeholder="Write your message here..."
                type="text"
                id="Message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="resize-none focus:outline-0 bg-transparent border-b border-slate-400"
                required
              />
            </div>
            <div className="col-span-2">
              <button
                className="rounded-full bg-white text-black px-4 py-3 min-w-[120px] h-[38px]"
                type="submit"
              >
                Send It
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

export default Partners