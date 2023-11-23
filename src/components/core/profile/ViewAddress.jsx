import React from 'react'
import logo from "../../../assets/logo.svg"
import { useNavigate, useOutletContext } from 'react-router-dom'
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';
import { deleteAddress } from '../../../service/operation/profil';

const ViewAddress = () => {
  const [userData,getUserDAta] = useOutletContext()
  const nevigate = useNavigate()
  const {user} = useSelector((state) => state.auth)


  const handleDelete = (addressId) =>{
   const data = {
    userId:user._id,
    addresId:addressId
   }
   console.log(data)

   deleteAddress(data,getUserDAta)
  }
  
  return (
    <div className='w-full h-full '>
     {
      userData.address.length === 0 
      ? <div className='flex flex-col gap-2 items-center w-full h-full justify-center' >
      <img src={logo}/>
      <h1 className='text-xl font-semibold'>No Addresses found in your account!</h1>
      <p>Add a delivery address.</p>
      <button onClick={() => nevigate("/my-profile/add-address")}
      className='py-2 px-4 bg-yellow-400 rounded-md '>Add Address</button>
   </div>
   : <div className='w-full h-full flex flex-col gap-4'>
   {
     userData.address.map((address) =>{
      return <div className='w-full p-4 border border-black flex  gap-5 '>
      
     <div className='w-full p-4  flex flex-col gap-5 '>
     <div className='flex text-xl font-semibold flex-row gap-4'>
      <p>{address.name}</p>
        <p>{address.phoneNumber}</p>
      </div>
        <p> {address.address}, {address.locality}, {address.city}, {address.state}, -{address.pincode} </p>
     </div>

     <p onClick={() => handleDelete(address._id)}
     className='text-2xl font-semibold items-center cursor-pointer'>< MdDelete /></p>

      </div>
     })
   }

<button onClick={() => nevigate("/my-profile/add-address")}
className='p-3 bg-yellow-400 rounded-md'>Add New Address</button>
   </div> 
     } 

     
    
    </div>
  )
}

export default ViewAddress
