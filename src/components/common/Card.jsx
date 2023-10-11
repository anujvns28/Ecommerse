import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({cardData}) => {
  return (
    <div className=''>
      
      <Link to={`/`}> 
    <div className=' flex justify-center items-center bg-slate-100 border-b rounded-lg hover:scale-[1.03] transition-all duration-500'>  
    <img className='w-rounded-xl object-cover h-[350px]' 
    src={cardData.productMainImage} />
    </div>

    <div className="flex flex-col gap-2 px-1 py-3 font-semibold text-orange-500">
      <p className="text-xl text-richblack-5">{cardData.productName}</p>
      <p className='text-lg text-black'>MRP : ₹ {cardData.price}</p>
    </div>
      </Link> 
    </div>
  )
}

export default Card
