import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { updateProfile } from '../../../service/operation/profil'
import { useSelector } from 'react-redux'

const UpdateProfile = () => {

    const gender = [
        {gender:"Male"},
        {gender:"Female"}
    ]
    const {user} = useSelector((state) => state.auth);
    const [userData] = useOutletContext()
    const [formData,setFormData] = useState({
        firstName:userData.firstName,
        lastName:userData.lastName,
        gender:userData.additionalInfo.gender === null ? gender[0].gender : userData.additionalInfo.gender ,
        contactNumber:userData.additionalInfo.contactNumber,
        about:userData.additionalInfo.about
    })
    const handleChange = (e) =>{
     
     setFormData((prev) =>({
        ...prev,
       [ e.target.name ] : e.target.value
     }))
    } 

    const data = {
        ...formData,
        userId:user._id
    }

    

    const handleSubmit = (event) =>{
        event.preventDefault();
        console.log(formData,"this is form data")
        updateProfile(data)
    }

    console.log(user._id)

  return (
    <div>
      <form onSubmit={handleSubmit}
      className='flex flex-col gap-3'>
     <div className='flex flex-row gap-2'>
     <label className='w-[49%]'>
            <p className='text-xl font-semibold pb-1'>First Name</p>
            <input
             className='w-full border border-black outline-none p-3 rounded-md text-xl'
              type="string"
              required
              placeholder=''
              name='firstName'
              value={formData.firstName}
              onChange={handleChange}
            />
          </label>

          <label className='w-[49%]'>
            <p className='text-xl font-semibold pb-1'>Last Name</p>
            <input
             className='w-full border border-black outline-none p-3 rounded-md text-xl'
              type="string"
              required
              placeholder=''
              name='lastName'
              value={formData.lastName}
              onChange={handleChange}
            />
          </label>

     </div>

     <div className='flex flex-row gap-2'>
     <label className='w-[49%]'>
            <p className='text-xl font-semibold pb-1'>Select Gender</p>
            <select
              className='w-full border border-black outline-none p-3 rounded-md text-xl'
              required
              name='forWhom'
              onChange={handleChange}
            >
              {
                gender.map(gender => <option value={gender.gender}>{gender.gender}</option>)
              }
            </select>
          </label>

          <label className='w-[49%]'>
            <p className='text-xl font-semibold pb-1'>Date Of Birth</p>
            <input
              className='w-full border border-black outline-none p-3 rounded-md text-xl'
              required
              name='dateOfBirth'
              value={formData.dateOfBirth}
              onChange={handleChange}
              type = "date"
            >
            </input>
          </label>
     </div>

         <label className='w-[49%]'>
            <p className='text-xl font-semibold pb-1'>Phone Number</p>
            <input
              className='w-full border border-black outline-none p-3 rounded-md text-xl'
              required
              name='contactNumber'
              onChange={handleChange}
              type = "string"
              value={formData.contactNumber}
            >
            </input>
          </label>

          <label className='w-full'>
            <p className='text-xl font-semibold '>About</p>
            <textarea
              type="string"
              className='w-full h-[200px] border border-black outline-none p-3 rounded-md text-xl'
              required
              placeholder='Enter Product Details'
              name='about'
              value={formData.about}
              onChange={handleChange}
            />
          </label>

          <button className='py-2 px-4 font-semibold bg-yellow-400 rounded-md text-black items-start w-[20%]'>Update</button>
      </form>
    </div>
  )
}

export default UpdateProfile
