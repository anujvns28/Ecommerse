import React, { useEffect, useState } from 'react'
import Sidebar from '../components/common/Sidebar'
import {IoFilterSharp} from "react-icons/io5"
import { AiOutlineDown } from "react-icons/ai"
import { getAllSubCategoryProduct } from '../service/operation/productapi'
import { useLocation } from 'react-router-dom'
import SlidCard from '../components/core/SlidCard'
import Card from '../components/common/Card'
import { useDispatch, useSelector } from 'react-redux'


const SubCategorieWisePage = () => {
const dispatch = useDispatch()
const location = useLocation();
const subCategoryId = location.pathname.split("/").at(-1)
const [products,setProducts] = useState()

const {product} = useSelector((state) =>state.product)

 
const fetchProducts = async() =>{
const result = await getAllSubCategoryProduct(subCategoryId);
if(result){
  setProducts(result.subCategoryProducts)
  console.log(result,"this is result")
  
}
}
 useEffect(() =>{
 fetchProducts()
  },[])

  console.log("this is aj",product)

  return (
    <div  className='flex flex-col gap-3 px-2 mx-auto'>
      <div className='w-full flex items-center justify-between text-black py-2 sticky top-0 z-50  mt-8 bg-white '>
        {
          products  ? 
          <div >
          <p className='text-xs'>Sports Shouse / {products.name}</p>
          <h1 className='text-xl font-semibold'>{products.name} ({products.product.length})</h1>
        </div>
        : <div className='flex items-center justify-center h-screen'>Loading...</div>
        }
        <div className='flex flex-row gap-4 text-lg'>
          <div className='flex items-center flex-row gap-1 cursor-pointer'>
         <p> Show Filters</p>
         <IoFilterSharp/>
          </div>
          <div className='flex items-center flex-row gap-1 cursor-pointer'>
          <p>Sort By</p>
         <AiOutlineDown/>
          </div>
        </div>
      </div>

      <div className='flex justify-between'>
      <Sidebar/>
     <div className='w-[80%] flex flex-row flex-wrap border right-3 '>
     {
      
      products  ?
        <div>
          {
            products.product.length !== 0 
            ? <div className='flex flex-wrap  flex-row gap-2 '>
              {
            product  
            ? product.map((item,index) =>{
              return <div className='w-[32.5%] rounded-md'
               key={index}>
               {
               <Card cardData={item}/>
               }
              </div>
            })
            : products.product.map((item,index) =>{
              return <div className='w-[32.5%] rounded-md'
               key={index}>
               {
               <Card cardData={item}/>
               }
              </div>
            })
            
          }
            </div>  : <div className='flex items-center justify-center h-screen'>Not Found</div>
          }
        </div> 
          :<div className='flex items-center justify-center h-screen'>Loading...</div>
       
       }
     </div>
      </div> 
      
    </div>
  )
}

export default SubCategorieWisePage
