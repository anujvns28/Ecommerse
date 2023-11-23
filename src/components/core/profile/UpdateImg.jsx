import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileImg } from '../../../service/operation/profil';
import { useNavigate, useOutletContext } from 'react-router-dom';

const UpdateImg = () => {
  const [userData,getUserDAta] = useOutletContext()
  const [profileImg,setProfileImg] = useState()
  const [imgUrl,setImgUrl] = useState();
  const nevagite = useNavigate();
  const {user} = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  const handleChange = (e) =>{
   setProfileImg(e.target.files[0])
   const url = URL.createObjectURL(e.target.files[0]);
   setImgUrl(url)
  }

  const data ={
    profileImage:profileImg,
      userId:user._id
  }
  

  const handleSubmit = (e) =>{
   e.preventDefault();
   updateProfileImg(data,nevagite,getUserDAta,dispatch)

  }
  return (
    <div className='w-full h-full'>
      <form className='flex items-center justify-between h-full w-[60%] mx-auto'
      onSubmit={handleSubmit}>
        <div className= 'w-[300px] h-[300px] border border-black rounded-full flex items-center justify-center'>
        {
          !imgUrl 
          ? <label className=''>
          <p className='text-xl font-semibold w-full h-[250px] cursor-pointer  flex items-center justify-center '>Select Profile Image</p>
          <input
          className='invisible '
          type='file'
          onChange={handleChange}
          required
          />
        </label> 

        : <div className='h-[300px] bg-cover p-3 flex flex-col items-center justify-center relative'>
          
            <img src={imgUrl}
            className='bg-cover aspect-video rounded-full '
            />
            <button className='px-3 py-2 rounded-md bg-yellow-400 absolute translate-y-44 '
            onClick={() => setImgUrl()}>delete</button>
          </div> 
        
        }
        </div>

        

      <button className='px-3 py-2 rounded-md bg-yellow-400  '>Edit</button>
      </form>
    </div>
  )
}

export default UpdateImg
