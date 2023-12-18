import React, { useState } from 'react'
import img  from "../assets/sign_up_img.png"
import { getOtp } from '../service/operation/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setsignupData } from '../slice/auth'
import logo from "../assets/logo.svg"

const RegisterAsSeller = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [formData,setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    const handleChange = (event) =>{
    setFormData((prev) =>({
        ...prev,
        [event.target.name] : event.target.value
    }))
    }

    const {email} = formData
    const accountType = "Seller"
    
    const handleSubmit = async(event) =>{
        event.preventDefault()
        console.log(formData,"printing form data")
       
        await getOtp(email,navigate)
        
        const signupData = {
            ...formData,
            accountType
        }
        
        dispatch(setsignupData(signupData));
        
        
    }

   
  return (
    <div className='flex  w-[90%] mx-auto my-3 mb-5  '>
     

      <div className='w-[40%] border my-3 border-black p-3 px-3 flex  rounded-md flex-col gap-2'>
      <p className='text-blue-400 text-center text-xl italic font-semibold'>Seller Account</p>
      <div className='flex items-center justify-center'>
                 <img className='flex items-center justify-center'
                 width={200} src={logo}/>
                 </div>
      <h1 className='text-3xl text-center mt-4 font-semibold'>Sell Online with shouseDekho.com</h1>
      <p className='text-blue-400 text-center text-xl italic font-semibold'>Your Pricacy is Our Responsibility</p>

      <form onSubmit={ handleSubmit}
      className='mt-6'>
        <div className='flex w-full gap-3 flex-row'>
        <label className='w-full'>
        <p className='text-xl font-semibold'
        >First Name<sup className='text-pink-200'>*</sup></p>
            <input
            required
            placeholder='Enter  First Name'
            onChange={handleChange}
            name="firstName"
            type='text'
            className='w-full border border-black outline-none p-2 rounded-md text-xl '
                    />
        </label>

        <label className='w-full'>
        <p className='text-xl font-semibold'
        >Last Name<sup className='text-pink-200'>*</sup></p>
            <input
            required
            placeholder='Enter  Last Name'
            onChange={handleChange}
            name="lastName"
            type='text'
            className='w-full border border-black outline-none p-2 rounded-md text-xl '
            />
           
                    
        </label>
        </div>

        <label className='w-full'>
        <p className='text-xl font-semibold'
        >Email<sup className='text-pink-200'>*</sup></p>
            <input
            required
            placeholder='Enter Email'
            onChange={handleChange}
            name="email"
            type='email'
            className='w-full border border-black outline-none p-2 rounded-md text-xl '
            />
        </label>

        <div className='flex w-full gap-3'>
        <label className='w-full'>
        <p className='text-xl font-semibold'
        >Create Password<sup className='text-pink-200'>*</sup></p>
            <input
            required
            placeholder='Enter Password'
            onChange={handleChange}
            name="password"
            type='text'
            className='w-full border border-black outline-none p-2 rounded-md text-xl '
            />
        </label>

        <label className='w-full'>
        <p className='text-xl font-semibold'
        >Confirm Password<sup className='text-pink-200'>*</sup></p>
            <input
            required
            placeholder='Confirm Password'
            onChange={handleChange}
            name="confirmPassword"
            type='text'
            className='w-full border border-black outline-none p-2 rounded-md text-xl '
            />
        </label>
        </div>

        <button className='w-full bg-yellow-500 rounded-md text-black py-2 mt-3'>Create Seller Account</button>
      </form>
      </div>

      <div className=' w-[60%] h-[600px] '>
      <img 
       src={img} height={300} />
      </div>
    </div>
  )
}

export default RegisterAsSeller
