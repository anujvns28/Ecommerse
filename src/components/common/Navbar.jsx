import React from 'react'
import logo from "../../assets/logo.svg"
import {AiOutlineShoppingCart} from "react-icons/ai"
import { Link } from 'react-router-dom'
import { AiOutlineDown } from "react-icons/ai"

const Navbar = () => {

  const navLinks = [
    {
      id:1,
      name:"Home",
      link:"/"
    },
    {
      id:2,
      name:"About",
      link:"/about"
    },
    {
      id:3,
      name:"Categories",
      link:""
    },
    {
      id:4,
      name:"Contect",
      link:"/contect"
    },
  ]

   const token = false

  return (
    
      <div className='flex items-center justify-between  h-20 w-full  px-20 '>
      <div className='flex items-center justify-between w-[40%]'>
     <Link to={"/"}> 
     <img width={60} src={logo}/>
     </Link >

      <input 
      placeholder='Type Prduct or Brand Name'
      className='w-[400px] py-1 rounded-full bg-slate-100 flex items-center justify-centere border border-solid px-5 outline-none'
      />
     
      </div>
      <div className='flex flex-row gap-8'>
      {
        navLinks.map((sublinks)=>{
        return  sublinks.name === 'Categories' ? 
        <div className='flex cursor-pointer items-center flex-row gap-1  justify-center '>
          <p>Categories</p>
          <AiOutlineDown/>
        </div>
        : <div className='hover:text-neutral-500'>
        <Link key={sublinks.id} to={sublinks.link} >{sublinks.name}</Link>
      </div>
        })
      }
      </div>
      <div className='flex justify-between w-[12%] items-center'>
      {
        token &&  <p className='text-2xl'>
          <Link to={"/cart"}> <AiOutlineShoppingCart/> 
          </Link>
          </p>
      }
     {
        !token &&  <p className='hover:text-neutral-500'>
          <Link to={"/login"}> Log in
          </Link>
          </p>
      }
      {
        !token &&  <p className='bg-black text-white px-4 py-2 rounded-full hover:bg-neutral-600'>
          <Link to={"/signup"}> sign up
          </Link>
          </p>
      }
        
      </div>
    </div>
    
  )
}

export default Navbar
