import React from 'react'
import { Link } from 'react-router-dom'

const SlidCard = ({cardDetail}) => {
  return (
    <div className='drop-shadow-md  rounded-xl bg-white '>
        <Link to={`/`}> 
    <div className=' flex justify-center items-center border-b rounded-lg hover:scale-105 transition-all duration-500'>  
    <img className='w-full rounded-xl object-cover h-[350px]' 
    src={cardDetail.image} />
    </div>

    <div className="flex flex-col gap-2 px-1 py-3 items-center">
            <p className="text-xl text-richblack-5">{cardDetail.name}</p>
    </div>
      </Link>
    </div>
  )
}

export default SlidCard
