import React from 'react'
import logo from "../../../assets/logo.svg"

const ViewAddress = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
     
     <div className='flex flex-col gap-2 items-center' >
        <img src={logo}/>
        <h1 className='text-xl font-semibold'>No Addresses found in your account!</h1>
        <p>Add a delivery address.</p>
        <button className='py-2 px-4 bg-yellow-400 rounded-md '>Add Address</button>
     </div>
    </div>
  )
}

export default ViewAddress
