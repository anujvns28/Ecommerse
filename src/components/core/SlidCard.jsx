import React from 'react'
import { Link } from 'react-router-dom'

const SlidCard = ({cardDetail,categoriId}) => {
  return (
    <div className='drop-shadow-lg  rounded-xl bg-white p-2 border border-black  group transition-all duration-800 '>
        <Link to={`/${categoriId}/${cardDetail._id}`}> 
    <div className=' flex justify-center w-full items-center bg-slate-100 border-b rounded-lg '>  
    <img className=' object-cover rounded-t-md h-[350px]' 
    src={cardDetail.image} width={400} />
    </div>
    <div className="flex flex-col gap-2 px-1 py-3  items-center rounded-md group-hover:bg-slate-400">
          <p className="text-xl font-semibold text-richblack-5 italic">{cardDetail.name}</p>
    </div>
      </Link>
    </div>
  )
}

export default SlidCard
