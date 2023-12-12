import React, { useState } from 'react'
import { forgotPasswordToken, loginUser } from '../service/operation/auth';
import { useDispatch, useSelector } from 'react-redux';
import loginImg1 from "../.././src/assets/login_img1.png"
import loginImg2 from "../assets/login_img2.png"
import loginImg3 from "../assets/login_img3.png"
import logo from "../assets/logo.svg"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const {token} = useSelector((state) => state.auth)
    const {user} = useSelector((state) => state.auth)
    const nevagite = useNavigate();
    
    const [formData, setFormData] = useState();
    const dispatch = useDispatch()

    const handleChange = (event) => {
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = async(event) => {
        console.log("calling")
        event.preventDefault();
        
        await loginUser(formData,dispatch,nevagite);
      
    }


    return (
        <div className='w-[1000px] mx-auto  flex m-5'>

       <form className='w-[80%] border border-black flex flex-col justify-center  gap-3 p-4 rounded-md'
            onSubmit={handleSubmit}>
                 <div className='flex items-center justify-center'>
                 <img className='flex items-center justify-center'
                 width={250} src={logo}/>
                 </div>
                 <h1 className='text-3xl font-semibold flex items-center justify-center pb-6'>www.shouseDekho.com</h1>
                <label>
                    <p className='text-xl font-semibold'>Email Address</p>
                    <input
                        placeholder='Enter email'
                        name='email'
                        onChange={handleChange}
                        required
                        type='string'
                        className='w-full border border-black outline-none p-2 rounded-md text-xl '
                    />
                </label>

                <label>
                    <p className='text-xl font-semibold'>Password</p>
                    <input
                        placeholder='Enter password'
                        name='password'
                        onChange={handleChange}
                        required
                        type='string'
                        className='w-full border border-black outline-none p-2 rounded-md text-xl '
                    />
                </label>
                 
                 <p onClick={() => nevagite("/forgot-password")} className='ml-64 text-sm text-blue-800 cursor-pointer font-semibold'>Forgot Password</p>

                <button className='text-xl px-3 py-2  w-[130px] rounded-md bg-yellow-400'>Log in</button>
            </form>


<div className='w-[60%] flex items-center justify-center '>
        <Swiper
          // install Swiper modules
          modules={[  Autoplay,Pagination]}
          autoplay={true}
          pagination={{ clickable: true }}
          
        >
          <SwiperSlide><img src={loginImg1} className='scale-150 -rotate-45'  /></SwiperSlide>
          <SwiperSlide><img src={loginImg2} className='scale-125 -rotate-45 pb-20 '  /></SwiperSlide>
          <SwiperSlide><img src={loginImg3} className='scale-125 -rotate-45 ' /></SwiperSlide>
         

        </Swiper>
            </div>

            

       
           

        </div>
    )
}

export default Login
