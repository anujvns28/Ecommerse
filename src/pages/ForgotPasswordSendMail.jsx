import React, { useState } from 'react'
import { forgotPasswordToken } from '../service/operation/auth';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordSendMail = () => {
    const [email,setEmail] = useState()
    const navigate = useNavigate()
    
    const handleSubmit = async(e) =>{
        e.preventDefault();
         const result = await forgotPasswordToken(email);
        console.log("this send email ",result)      
    }

  return (
    <div>
      <form className='w-[40%] mx-auto flex flex-col justify-center gap-3 h-[50vh] '
      onSubmit={handleSubmit}>
                <label>
                    <p className='text-xl font-semibold'>Enter Email</p>
                    <input
                        placeholder='Enter Email'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        type='string'
                        className='w-full border border-black outline-none p-2 rounded-md text-xl '
                    />
                </label> 
                <button className='text-xl px-3 py-2  w-[200px] rounded-md bg-yellow-400'>Send Reset Link</button>
      </form> 
    </div>
  )
}

export default ForgotPasswordSendMail
