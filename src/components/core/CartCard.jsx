import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {RiDeleteBin6Line} from "react-icons/ri"
import { useDispatch } from 'react-redux';
import { addPrice, removeCart, removePrice } from '../../slice/produc';


const CartCard = ({item,}) => {
    const [quantity,setQuantity] = useState(1);
    const dispatch = useDispatch()

    const handleChange = (event) =>{
        setQuantity(event.target.value)
        const data = {
          productId : item._id,
          quantity : Number(event.target.value),
          price : item.price
        }
        dispatch(addPrice(data))
      
    }

   const setPrice = () =>{
    const data = {
      productId : item._id,
      quantity : 1,
      price : item.price
    }
    dispatch(addPrice(data))
   }

   const handleDelet = (productId) =>{
    dispatch(removeCart(item))
    dispatch(removePrice(productId))
   }
   
   useEffect(() =>{
    setPrice()
   },[])
  return (
    <div className='w-full flex flex-row gap-3 border-solid border-b  py-4 '>
                     <Link to={`/${item._id}`} >
                     <div className=''>
                        <img className='rounded-md'
                        src={item.mainImage} width={150}/>
                      </div>
                     </Link>
                      <div className='w-full  flex flex-col gap-4'>
                        <div className='flex flex-col justify-between '>
                          <div className='flex items-center justify-between '>
                            <h1 className='text-xl font-semibold text-start '>{item.productName}</h1>
                            <p>MRP : ₹ {item.price*quantity}</p>
                          </div>
                          <div>
                          <p>{item.forWhom}</p> 
                          </div>
                        </div>
                        <div className='flex items-center flex-row gap-6 justify-between'>
                          <div className='flex items-center justify-between flex-row gap-6' >
                            <p>Size : Uk5</p>
                            <label className='flex outline-none'>
                            <p>Quantity </p>
                              <select onChange={handleChange}>
                              <option value={1}>1</option>
                              <option value={2}>2</option>
                              <option value={3}>3</option>
                              <option value={4}>4</option>
                              <option value={5}>5</option>
                              <option value={6}>6</option>
                              <option value={7}>7</option>
                              <option value={8}>8</option>
                              <option value={9}>9</option>
                              <option value={10}>10</option>
                              </select>
                            </label>
                          </div>
                          <div>
                            <p onClick={ () => handleDelet(item._id)}
                            className='cursor-pointer'><RiDeleteBin6Line/></p>
                          </div>
                        </div>
                      </div>
                    </div>
  )
}

export default CartCard
