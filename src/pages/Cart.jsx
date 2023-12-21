import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import cartImg from "../assets/empty-cart.jpg"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import CartCard from '../components/core/CartCard'
import {RxCross1} from "react-icons/rx"
import { FetchUserData } from '../service/operation/profil'
import { buyShouse } from '../service/operation/payment'

const Cart = () => {
 let totalprice = 0
  const { cart } = useSelector((state) => state.product) 
  const {user} = useSelector((state) => state.auth)
   const {cartTotalPrice} = useSelector((state) => state.product);
   const [address, setaddress] = useState()
   const nevagite = useNavigate()
   
  const handleAddress = async() =>{
    const userData = await FetchUserData(user._id)
    if (userData) {
      setaddress(userData.data.address)
    }
  }



  const handlePayment = async(addressId) =>{
  const result = await buyShouse(cart,user,addressId);
    localStorage.removeItem("cart")
    setaddress(null)
    
  
  }


  cartTotalPrice.map((item) => totalprice = totalprice + item.price * item.quantity)

  console.log(totalprice,"this is totalprice")
  
  return (
    <div className='mb-10 flex flex-col items-center justify-center gap-4  w-[80%] mx-auto'>
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
                  <h2>{totalprice}</h2> 
                </div>
                <p className='p-3'>The subtotal reflects the total price of your order, including duties and taxes, before any applicable discounts. It does not include delivery costs and international transaction fees.</p>
                
              </div>
              <div onClick={handleAddress}
              className='px-6 text-center cursor-pointer py-4 text-xl mt-5 bg-black rounded-full text-white hover:bg-opacity-80'
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

{
        address ? <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
          <div className='absolute bg-slate-400 flex flex-col gap-5 p-4 w-[50%] py-11'>
            <div className='flex justify-between '>
              <p className='text-2xl font-semibold '>Selec Address </p>
              < p onClick={() => setaddress(null)}
                className='text-2xl font-semibold cursor-pointer '><RxCross1 /></p>
            </div>
            {
              address.map((address) => {
                return <div onClick={() => handlePayment(address._id)}
                  className='w-full p-4 border border-black flex cursor-pointer  gap-5 '>

                  <div className='w-full p-4  flex flex-col gap-5 '>
                    <div className='flex text-xl font-semibold flex-row gap-4'>
                      <p>{address.name}</p>
                      <p>{address.phoneNumber}</p>
                    </div>
                    <p> {address.address}, {address.locality}, {address.city}, {address.state}, -{address.pincode} </p>
                  </div>


                </div>
              })
            }
            <button onClick={() => nevagite("/my-profile/add-address")}
              className='p-3 bg-yellow-400 rounded-md'>Create New Address
            </button>

          </div>
        </div>
          : <div>

          </div>
      }
    </div>
  )
}

export default Cart
