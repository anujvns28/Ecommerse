import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {RiDeleteBin6Line} from "react-icons/ri"
import { MdOutlineEdit } from "react-icons/md";

import { deleteingProduct } from '../../service/operation/productapi';
import { useSelector } from 'react-redux';
import EditProduct from './productCreat/EditProduct';


const SellerProductCard = ({product,fetchingUserProduct}) => {
    const {user} = useSelector((state) => state.auth);
    const [edit,setEdit] = useState();

    const handleDelete = async(productId) =>{
        const data = {
            productId:productId,
            userId:user._id
        }
        await deleteingProduct(data,fetchingUserProduct)
    }

    const handleEdit = async (productId) =>{
      setEdit(productId)
    }
  return (
    <div className='flex flex-row gap-2 border border-black rounded-md '>
                     <Link to={`/${product._id}`}>
                     <div className='w-[250px] cover'>
                      <img className='w-full h-full rounded-md bg-cover'
                      src={product.mainImage}></img>
                     </div>
                     </Link>

                            {
                                edit ? <EditProduct productData={product} setEdit={setEdit}/> : ""
                            }
                   
                        <div className='flex justify-between w-[70%]'>
                        <div className='flex flex-col gap-3 p-3'>
                            <p className='text-2xl font-semibold'>{product.productName}</p>
                            <p>{product.productDes}</p>
                            <div className='flex flex-row gap-6'>
                            <p>Price: {product.price}</p>
                            <p>Gender: {product.forWhom}</p>
                            <p>color: {product.color}</p>
                            </div>
                        </div>
                        <div className='flex flex-col justify-between p-5 text-2xl'>
                            <p className='cursor-pointer'
                            onClick={() => handleDelete(product._id)}><RiDeleteBin6Line/></p>
                            <p  onClick={() => handleEdit(product._id)}
                             className='cursor-pointer'
                            ><MdOutlineEdit/></p>
                        </div>
                        </div>
                    
                 </div>
  )
}

export default SellerProductCard
