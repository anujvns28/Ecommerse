import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { deleteingProduct, fetchUserProduct } from '../service/operation/productapi';
import { Link } from 'react-router-dom';

import SellerProductCard from '../components/core/SellerProductCard';

const SellerProducts = () => {
    const {user} = useSelector((state) => state.auth);
    const [products,setProducts] = useState()
   
    

    const fetchingUserProduct = async() =>{
        const result = await fetchUserProduct(user._id);
        if(result){
         setProducts(result.products)
        }
    }
    useEffect(() =>{
        fetchingUserProduct()
    },[])

    console.log(products)
   

  return (
    <div className='w-[1260px] mx-auto p-5'>

        
      {
        products 
        ? <div className='w-full h-screen flex flex-col gap-3 relative'>
                            
            {
                products.map((product) =>{
                 return <SellerProductCard product={product} fetchingUserProduct={fetchingUserProduct}/>
                })
            }
        </div>
        : <div></div> 
      }
    </div>
  )
}

export default SellerProducts
