import React from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'

const ProfileImg = () => {
    const nevigate = useNavigate();
    const [userData,getUserDAta] = useOutletContext()
   
  return (
    <div className='w-full items-center justify-center flex flex-col gap-5 h-[70%]' >
      <img className='w-[300px] h-[300px] rounded-full'
      src={userData.image}></img>

      <button onClick={() => nevigate("/my-profile/update-profileImg")}
      className='text-xl px-5 py-2 bg-yellow-400 rounded-md'>Edit</button>
    </div>
  )
}

export default ProfileImg
