import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import logo from "../../../assets/logo.svg"
import { Link, useNavigate } from 'react-router-dom';
import {MdDelete} from "react-icons/md"
import { removeToWishlist } from '../../../slice/produc';

const Wishlist = () => {
  const {wishlist} = useSelector((state) => state.product);
  const nevigate = useNavigate();
  const dispatch = useDispatch();

  
  const handleDelete = (data) =>{
  dispatch(removeToWishlist(data))
  }

  return (
    <div className='w-full h-full '>
     {
     wishlist.length === 0 
      ? <div className='flex flex-col gap-2 items-center w-full h-full justify-center' >
      <img src={logo}/>
      <h1 className='text-xl font-semibold'>No Shouse found in your Wishlist!</h1>
      <p>Add a Shouse in Wishlist.</p>
   </div>
   : <div className='w-full h-full flex flex-col gap-4'>
   {
     wishlist.map((product) =>{
      return <div className='w-full p-4 border border-black flex  gap-5 '>
      
     <div className='w-full p-2  flex flex-row gap-5 '>
     <Link to={`/${product._id}`}>
     <div className='w-[150px] h-[150px]'>
     <img className='w-full h-full rounded-md border border-solid'
     src={product.mainImage}/>
     </div>
     </Link>
     <div>
      <p className='text-2xl font-semibold'>{product.productName}</p>
      <p className=' font-semibold'>Price : {product.price}</p>
      <p className=' font-semibold'>{product.forWhom}'s Shouse</p>
      <p className=' font-semibold'>Desc : {product.productDes}</p>
     </div>  
     </div>

     <p onClick={() => handleDelete(product)}
     className='text-2xl font-semibold items-center cursor-pointer'>< MdDelete /></p>

      </div>
     })
   }

   </div> 
     } 

     
    
    </div>
  )
}

export default Wishlist
