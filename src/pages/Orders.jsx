import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchOrders } from '../service/operation/productapi';
import { Link } from 'react-router-dom';
import logo from "../assets/logo.svg"

const Orders = () => {
    const {user} = useSelector((state) => state.auth)
    const [orders,setOrders] = useState();

    const gettingOrders = async() =>{
     const orders = await fetchOrders(user._id);
     if(orders){
      setOrders(orders.data)
     }
    }

    useEffect(() =>{
        gettingOrders()
    },[])

    
  return (
    <div className='w-[70%] mx-auto h-full my-7'>
    {
        orders 
        ? <div>
{
    orders.length === 0 
     ? <div className='flex flex-col gap-2 items-center w-full h-full justify-center' >
     <img src={logo}/>
     <h1 className='text-xl font-semibold'>Yor Are Not Order Yet!</h1>
     <p>Pleace Buy now</p>
     <div className='px-6 py-4 text-xl mt-5 bg-black rounded-full text-white hover:bg-opacity-80'
              >Buy Now</div>
  </div>
  : <div className='w-full h-full flex flex-col gap-4'>
  {
    orders.map((product) =>{
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
     </div>
    })
  }

  </div> 
    }  
        </div>
        :<div className='w-full h-full flex items-center justify-center'> Loading....</div>
    }

    
   
   </div>
  )
}

export default Orders
