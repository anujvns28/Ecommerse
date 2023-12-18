import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import cartImg from "../assets/empty-cart.jpg"
import { Link, useLocation } from 'react-router-dom'
import CartCard from '../components/core/CartCard'

const Cart = () => {

  const { cart } = useSelector((state) => state.product) 
  const {cartTotalPrice} = useSelector((state) => state.product);

  
  return (
    <div className='mb-10 flex flex-col items-center justify-center gap-4 border border-solid w-[80%] mx-auto'>
      {
        cart.length !== 0
          ? <div className='w-full '>
            <h1 className='text-3xl font-semibold text-center py-6'>Shopping Cart</h1>
            <div className='flex flex-row gap-4  justify-between'>
              <div className='w-[60%]'>
                <h1 className='text-xl font-semibold text-start py-6'>Cart Items</h1>
                <div className='flex flex-col gap-2'>
                {
                  cart.map((item) => {
                    return <CartCard item={item} />
                  })
                }
                </div>
              </div>
              <div className='w-[33%] '>
              <h1 className='text-xl font-semibold text-start py-6'>Cart Items</h1>
              <div className='bg-slate-400 rounded-md p-3'>
                <div className='flex items-center justify-between border-b border-solid p-3 text-2xl'>
                  <h2>SUBTOTAL</h2>
                  <h2>{cartTotalPrice}</h2>
                </div>
                <p className='p-3'>The subtotal reflects the total price of your order, including duties and taxes, before any applicable discounts. It does not include delivery costs and international transaction fees.</p>
                
              </div>
              <div className='px-6 text-center py-4 text-xl mt-5 bg-black rounded-full text-white hover:bg-opacity-80'
              >Checkout</div>
              </div>
            </div>
          </div>
          : <div className='w-full flex flex-col items-center justify-center'>
            <img width={450}
              src={cartImg}></img>
            <h2 className='text-xl font-semibold'>Your cart is empty</h2>
            <p className='text-center text-base'>Looks like you have not added anything in your cart.<br />
              Go ahead and explore top categories.</p>
            <Link to={"/"}>
              <div className='px-6 py-4 text-xl mt-5 bg-black rounded-full text-white hover:bg-opacity-80'
              >Continue Shopping</div>
            </Link>
          </div>
      }
    </div>
  )
}

export default Cart
