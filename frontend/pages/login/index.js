import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import web3img from "/public/assets/images/web3logo-white.png";
import { useAPI } from 'hooks/useAPI';
import { reactIcons } from 'components/utils/icons';
import { useRouter } from 'next/router';
import { message } from "antd";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {api} = useAPI();
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await api.loginUser(formData)
            if (response?.token) {
                const token = response.token;
                const email = response.email;
                localStorage.setItem('token', token);
                localStorage.setItem('email', email);
                message.success(
                    "Login Successfull!"
                  );
                router.push('/home')
            }
            else{
                console.log('Login Failed', response.error)
                message.warning(
                    "Login Failed!", response.error
                  );
            }
        }
        catch(error) {
            console.log(error, 'Error');
        }
    }
    return (
        <div className='min-h-screen overflow-y-auto bg-image3  lg:flex'>
            <div className="lg:w-[400px] xl:w-[600px] min-h-screen overflow-y-auto  pt-1 sm:pt-4 xl2:pt-10 pb-2 gap-[20px] xl:gap-[29px] justify-between flex flex-col  right-side-shadow">
                <div className='px-4 xl2:px-10'>
                    <Link href="/">
                        <Image
                            src={web3img}
                            width={500}
                            height={400}
                            className="w-[150px] md:w-[180px] lg:w-[120px] xl:w-[180px] xl2:w-[226px] mx-auto cursor-pointer"
                        ></Image>
                    </Link>
                </div>
                <div className="px-4 xl2:px-10">
                    <h4 className='font-bold xl:font-black text-22 xl:text-28 text-white'>Log In</h4>
                    <p className='text-18 pt-2 md:pt-3 text-white'>Welcome back!</p>
                </div>

                <form className='space-y-8 px-4 xl2:px-10' onSubmit={handleSubmit}>
                    <div className="relative">
                        <label className='absolute -top-2 left-3 lg:left-5 bg-white px-2 text-14 md:text-18 text-black' htmlFor="email">Email</label>
                        <input required type="email" name='email' className='bg-transparent border rounded-md input-field border-white text-white' value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} id='email' />
                    </div>
                    <div className="relative">
                        <label className='absolute -top-2 left-3 lg:left-5 bg-white px-2 text-14 md:text-18 text-black' htmlFor="password">Password</label>
                        <input
                            required
                            name='password'
                            type={showPassword ? 'text' : 'password'}
                            className='bg-transparent border rounded-md input-field border-white text-white'
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            id='password'
                        />

                        <span className='ay-center right-3 text-24 cursor-pointer text-white' onClick={togglePasswordVisibility}>
                            {showPassword ? reactIcons.eyes : reactIcons.eyeslash}
                        </span>
                    </div>
                    <button type='submit' className='bg-white border-2 border-black h-[48px] md:h-[57px] rounded-full text-black px-5 w-full text-20'>Access Your Account</button>
                </form>
                <div className="flex flex-col gap-4 px-4 xl2:px-10">
                    
                    <Link href={'/register'} className='bg-black flex items-center justify-center border-2 border-white h-[48px] md:h-[57px] rounded-full  px-5 w-full text-20 text-white hover:text-white'>Not a member? Register now</Link>
                </div>
                <div className="px-4 xl2:px-10">
                    <div className=" xl2:mx-8 relative">
                        <input type="text" placeholder='enter email to subscribe to our newsletter' className='bg-white w-full py-2 rounded-full pl-3 text-black placeholder:text-10 lg:placeholder:text-14' />
                        <button className='ay-center right-2 md:right-5 bg-black rounded-full px-2 md:px-5 text-14 md:text-16 py-[2px] text-white'>subscribe</button>
                    </div>
                    <div className="flex items-center justify-between mt-6 gap-3">
                        <div className="">
                            <h3 className='text-[17px] xl:text-24'>Follow our Socials!</h3>
                        </div>
                        <div className="flex gap-2 md:gap-4 items-center">
                            <Link href={'https://t.me/web3onboarding'}><Image className='w-8 xl:w-12 3xl:w-14' src={'/assets/images/telegram.png'} width={100} height={100} /></Link>
                            <Link href={'https://twitter.com/i/flow/login?redirect_after_login=%2Fweb3onboard'}><Image className='w-8 xl:w-12 3xl:w-14' src={'/assets/images/twitter.png'} width={100} height={100} /></Link>
                            <Link href={'https://www.linkedin.com/company/web3onboarding/'}><Image className='w-8 xl:w-12 3xl:w-14' src={'/assets/images/linkedin.png'} width={100} height={100} /></Link>
                            <Link href={'https://www.instagram.com/web3_onboarding/'}><Image className='w-8 xl:w-12 3xl:w-14' src={'/assets/images/instagram.png'} width={100} height={100} /></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 lg:flex-center px-10 flex-center">
                <div className="text-center max-w-[990px] text-white flex-center flex-col lg:gap-6 lg2:gap-20">
                    <h1 className='text-[2rem]  xl2:text-[3rem] 3xl:text-[4rem] font-bold'>Welcome!</h1>
                    <p className='para-24 xl2:text-28 text-slate-200 font-bold'>Get the Most Out of Your Web3 Experience. <br/>Make a Name For Yourself.</p>
                    <p className='para-24 xl2:text-28 text-slate-200'>Learn the Basics. <br/> Stay Safe. <br/> Work With Vetted Businesses. <br/> Advance.</p>
                    <Link href={'/home'} className='text-black hover:text-black bg-white border-2 text-16 xl:text-28 flex-center p-3 xl2:p-10 border-black rounded-full h-[57px]'>Safely Begin your Web3 journey</Link>
                </div>
            </div>
            
                {/* <div className="justify-between mt-6 lg:flex-start lg:flex-col flex-col flex-start mr-2 px-2 ml-8">
                    <a href="" class="py-4 border-2 rounded-md border-white px-4 text-black bg-white">
                    Connect Wallet
                    </a>
                    <a href="" class="py-4 border-2 rounded-md border-white px-4 ml-2">
                    Need a wallet?
                    </a>
                </div> */}
        </div>
    )
}

export default Login