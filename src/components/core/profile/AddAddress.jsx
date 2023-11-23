import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { addNewAddress } from '../../../service/operation/profil';

const AddAddress = () => {
  const {user} = useSelector((state) => state.auth);
  const [formData,setFormData] = useState();
  const [userData,getUserDAta] = useOutletContext()
  const nevagite = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) =>{
    setFormData((prev) => ({
      ...prev,
      [e.target.name] : e.target.value
    }))
  }


  const data = {
    ...formData,
    userId:user._id
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    addNewAddress(data,nevagite,getUserDAta)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <label className='w-[49%]'>
            <p className='text-xl font-semibold pb-1'>Name</p>
            <input
             className='w-full border border-black outline-none p-3 rounded-md text-xl'
              type="string"
              required
              placeholder='Enter Your Name'
              name='name'
              onChange={handleChange}
            />
          </label>

          <label className='w-[49%]'>
            <p className='text-xl font-semibold pb-1'>Mobile Number</p>
            <input
             className='w-full border border-black outline-none p-3 rounded-md text-xl'
              type="string"
              required
              placeholder='Enter Phone Number'
              name='phoneNumber'
              onChange={handleChange}
            />
          </label>
         
          <label className='w-[49%]'>
            <p className='text-xl font-semibold pb-1'>Pincode</p>
            <input
             className='w-full border border-black outline-none p-3 rounded-md text-xl'
              type="string"
              required
              placeholder='Enter Pincode'
              name='pincode'
              onChange={handleChange}
            />
          </label>

          <label className='w-[49%]'>
            <p className='text-xl font-semibold pb-1'>Locality</p>
            <input
             className='w-full border border-black outline-none p-3 rounded-md text-xl'
              type="string"
              required
              placeholder='Locality'
              name='locality'
              onChange={handleChange}
            />
          </label>

          <label className='w-full'>
            <p className='text-xl font-semibold '>Address</p>
            <textarea
              type="string"
              className='w-full h-[200px] border border-black outline-none p-3 rounded-md text-xl'
              required
              placeholder='Enter Product Details'
              name='address'
              onChange={handleChange}
            />
          </label>

          <label className='w-[49%]'>
            <p className='text-xl font-semibold pb-1'>City</p>
            <input
             className='w-full border border-black outline-none p-3 rounded-md text-xl'
              type="string"
              required
              placeholder='City'
              name='city'
              onChange={handleChange}
            />
          </label>

          <label className='w-[49%]'>
            <p className='text-xl font-semibold pb-1'>State</p>
            <input
             className='w-full border border-black outline-none p-3 rounded-md text-xl'
              type="string"
              required
              placeholder='State'
              name='state'
              onChange={handleChange}
            />
          </label>

          <label className='w-[49%]'>
            <p className='text-xl font-semibold pb-1'>LandMark</p>
            <input
             className='w-full border border-black outline-none p-3 rounded-md text-xl'
              type="string"
              required
              placeholder='landmark'
              name='landmark'
              onChange={handleChange}
            />
          </label>

          <label className='w-[49%]'>
            <p className='text-xl font-semibold pb-1'>Alternate PhoneNumber</p>
            <input
             className='w-full border border-black outline-none p-3 rounded-md text-xl'
              type="string"
              required
              placeholder='Phone Number(Optional)'
              name='alternatePhoneNumber'
              onChange={handleChange}
            />
          </label>

          <button>submit</button>
          
      </form>
    </div>
  )
}

export default AddAddress
