import React, { useState } from 'react'
import img  from "../assets/sign_up_img.png"
import { getOtp } from '../service/operation/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setsignupData } from '../slice/auth'

const Signup = () => {
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
    const accountType = "Buyer"
    
    const handleSubmit = async(event) =>{
        event.preventDefault()
        console.log(formData,"printing form data")
       
        await getOtp(email)
        navigate("/verify-email");
        
        const signupData = {
            ...formData,
            accountType
        }
        
        dispatch(setsignupData(signupData));
        
        
    }

   
  return (
    <div className='flex  w-[80%] mx-auto'>
      <div className=' w-[50%]  border border-solid'>
      <img className=''
       src={img} />
      </div>

      <div className='w-[50%] border border-solid px-3'>
      <h1 className='text-3xl font-semibold'>Cushioning Best Shouses for Your Miles With ShouseDekho</h1>
      <p className='text-blue-400 text-xl italic font-semibold'>Your Pricacy is Our Responsibility</p>

      <form onSubmit={ handleSubmit}
      className='mt-6'>
        <div className='flex'>
        <label>
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
        >First Name<sup className='text-pink-200'>*</sup></p>
            <input
            required
            placeholder='Enter  First Name'
            onChange={handleChange}
            name="firstName"
            type='text'
            />
        </label>

        <label>
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
        >Last Name<sup className='text-pink-200'>*</sup></p>
            <input
            required
            placeholder='Enter  Last Name'
            onChange={handleChange}
            name="lastName"
            type='text'
            />
        </label>
        </div>

        <label>
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
        >Email<sup className='text-pink-200'>*</sup></p>
            <input
            required
            placeholder='Enter Email'
            onChange={handleChange}
            name="email"
            type='email'
            />
        </label>

        <div className='flex'>
        <label>
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
        >Create Password<sup className='text-pink-200'>*</sup></p>
            <input
            required
            placeholder='Enter Password'
            onChange={handleChange}
            name="password"
            type='text'
            />
        </label>

        <label>
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
        >Confirm Password<sup className='text-pink-200'>*</sup></p>
            <input
            required
            placeholder='Confirm Password'
            onChange={handleChange}
            name="confirmPassword"
            type='text'
            />
        </label>
        </div>

        <button className='w-full bg-yellow-500 text-black py-2 mt-3'>Create Account</button>
      </form>
      </div>
    </div>
  )
}

export default Signup
