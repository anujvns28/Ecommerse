import React, { useEffect, useState } from 'react'
import { FetchUserData } from '../service/operation/profil'
import { useSelector } from 'react-redux'

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState()

  const getUserDAta = async () => {
    const result = await FetchUserData(user._id)
    if (result) {
      console.log("this is user Response", result)
      setUserData(result.data)
    }
  }

  console.log(userData, "this is user data")

  useEffect(() => {
    getUserDAta();
  }, [])
  return (
    <div className='w-[1260px] mx-auto'>
      {
        userData
          ? <div className='flex flex-row gap-4'>
            <div className=' w-[30%] h-screen p-4 flex flex-col gap-3'>
              <div className='w-full  border border-black flex flex-row gap-2 p-3 '>
                <div className='' >
                  <img className='w-[60px] h-[60px] rounded-full'
                    src={userData.image} />
                </div>
                <div className='p-2'>
                  <p className='text-xs'>Hello,</p>
                  <h1 className='text-xl'>{userData.firstName} {userData.lastName}</h1>
                </div>
              </div>
              <div className='w-full h-[80%] border border-red-700 p-3'>

              </div>
            </div>
            <div className='border border-black w-[75%] p-6 flex flex-col gap-3'>
              <div>
                <p className='text-2xl font-semibold pb-1'>Your Name</p>
                <div className='flex flex-row gap-3'>
                  <div className='w-[29%] rounded-md border border-black py-2 px-4'
                  >{userData.firstName}</div>
                  <div className='w-[29%] rounded-md border border-black py-2 px-4'
                  >{userData.lastName}</div>
                </div>
              </div>

              <div>
                <p className='text-2xl font-semibold pb-1'>Your Email</p>
                <div className='w-[60%] rounded-md border border-black py-2 px-4'>
                  {userData.email}
                </div>
              </div>

              <div>
                <p className='text-2xl font-semibold pb-1'>Mobile Nomber</p>
                <div className='w-[60%] rounded-md border border-black py-2 px-4'>
                  {!userData.additionalInfo.contactNumber  ? "Phone Number" : userData.additionalInfo.contactNumber } 
              </div>
              </div>

            <div className='flex w-[60%] justify-between'>
            <div className='w-[49%]'>
                <p className='text-2xl font-semibold pb-1'>Gender</p>
                <div className='w-full rounded-md border border-black py-2 px-4'>
                  {!userData.additionalInfo.contactNumber  ? "Gender" : userData.additionalInfo.geder } 
              </div>
              </div>

              <div className='w-[49%]'>
                <p className='text-2xl font-semibold pb-1 '>Date of Birth</p>
                <div className='w-full rounded-md border  border-black py-2 px-4'>
                  {!userData.additionalInfo.dateOfBirth  ? " Date of Birth" : userData.additionalInfo.dateOfBirth } 
              </div>
              </div>
            </div>

            <div className=''>
                <p className='text-2xl font-semibold pb-1'>About</p>
                <div className='w-[60%] rounded-md border border-black py-2 px-4'>
                  {!userData.additionalInfo.about  ? "About" : userData.additionalInfo.about } 
              </div>
              </div>

            </div>
          </div>
          : <div className='w-full h-full flex items-center justify-center'>Loading...</div>
      }
    </div>
  )
}

export default Profile
