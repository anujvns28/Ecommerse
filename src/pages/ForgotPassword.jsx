import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { forgotPassword } from '../service/operation/auth';

const ForgotPassword = () => {
    const [formData,setFormData] = useState();
    const params = useParams()
    const nevagite = useNavigate()
    const {userId} = params;

    const handleChange  = (e) =>{
     setFormData((prev) => {
        return {
            ...prev,
            [e.target.name] : e.target.value
        }
     })

    } 
    

    const handleSubmit  = async(e) =>{
        e.preventDefault();
        const data = {
            conPassword : formData.conPassword,
            password:formData.password,
            userId
        }
        const result = await forgotPassword(data,nevagite)
        console.log('this is form data',data);

     }

  return (
    <div className='w-full' >
      <form className='w-[40%] mx-auto flex flex-col justify-center gap-3 h-[50vh] '
      onSubmit={handleSubmit}>
                <label>
                    <p className='text-xl font-semibold'>Enter New Password</p>
                    <input
                        placeholder='New Password'
                        name='password'
                        onChange={handleChange}
                        required
                        type='string'
                        className='w-full border border-black outline-none p-2 rounded-md text-xl '
                    />
                </label> 

                <label>
                    <p className='text-xl font-semibold'>Confirm Password</p>
                    <input
                        placeholder='Confirm Password'
                        name='conPassword'
                        onChange={handleChange}
                        required
                        type='string'
                        className='w-full border border-black outline-none p-2 rounded-md text-xl '
                    />
                </label> 
                <button className='text-xl px-3 py-2  w-[200px] rounded-md bg-yellow-400'>Change Password</button>
      </form>
    </div>
  )
}

export default ForgotPassword
