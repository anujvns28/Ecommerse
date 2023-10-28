import React, { useEffect, useState } from 'react'
import logo from "../../assets/logo.svg"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { Link } from 'react-router-dom'
import { AiOutlineDown } from "react-icons/ai"
import { getAllCategories, getAllSubCategories } from '../../service/operation/productapi'
import { HiArrowLongRight } from "react-icons/hi2"
import { useSelector } from 'react-redux'
import {LiaUser} from 'react-icons/lia'

const Navbar = () => {
  const [category, setCategory] = useState(null);
  const [subCategoires, setSubCategories] = useState(null)
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  const navLinks = [
    {
      id: 1,
      name: "Home",
      link: "/"
    },
    {
      id: 2,
      name: "About",
      link: "/about"
    },
    {
      id: 3,
      name: "Categories",
      link: ""
    },
    {
      id: 4,
      name: "Contect",
      link: "/contect"
    },
  ]



  const getCategories = async () => {
    const result = await getAllCategories();
    if (result) {
      setCategory(result)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  const subCategories = async (categoryID) => {
    console.log(categoryID)
    const result = await getAllSubCategories(categoryID);
    if (result) {
      setSubCategories(result);
    }
  }

  console.log(subCategoires, "subcategories")

  return (

    <div className='flex items-center justify-between  h-20 w-full   '>
      <div className='flex items-center justify-between w-[35%]'>
        <Link to={"/"}>
          <img width={60} src={logo} />
        </Link >

        <input
          placeholder='Type Prduct or Brand Name'
          className='w-[400px] py-1 rounded-full bg-slate-100 flex items-center justify-centere border border-solid px-5 outline-none'
        />

      </div>
      <div className='flex flex-row gap-8'>
        {
          navLinks.map((sublinks) => {
            return sublinks.name === 'Categories' ?
              <div className='flex relative group cursor-pointer items-center flex-row gap-1  justify-center '>
                <p>Categories</p>
                <AiOutlineDown />
                <div className="w-20 absolute  bg-slate-100  invisible left-[50%] top-[50%] z-[1000] flex  translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900  transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em]  lg:w-[300px]">
                  <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-slate-100"></div>
                  {
                    category ? <div >
                      {
                        category.categoies.map((item, index) => {
                          return <div key={index} onMouseOver={() => subCategories(item._id)}
                            className='hover:bg-slate-200 anuj py-4 px-4 rounded-md relative'>
                            <div className='flex justify-between'>
                              {item.categoryName}
                              <p className='text-2xl'>  <HiArrowLongRight /></p>
                            </div>
                            <div
                              className=" subCategories absolute p-4 rounded-md bg-slate-200 ">
                              {
                                subCategoires ? subCategoires.subCategorys.map((item, index) => {
                                  return <div className='hover:bg-slate-300  py-4 px-4 rounded-md relative'>
                                    {
                                      item.name
                                    }
                                  </div>
                                })
                                  : <div className='flex items-center justify-center'>Loading...</div>

                              }
                            </div>
                          </div>

                        })
                      }
                    </div>
                      : <div className='flex items-center justify-center'>Loading...</div>
                  }
                </div>
              </div>
              : <div className='hover:text-neutral-500'>
                <Link key={sublinks.id} to={sublinks.link} >{sublinks.name}</Link>
              </div>
          })
        }
      </div>
      <div className='flex justify-between w-[20%] items-center'>
        <div className='flex hover:border border-solid px-1'>
        <p className='text-2xl font-bold'><LiaUser/></p>
          {
            <p className='hover:text-neutral-500 '>
              <Link to={"/login"}> Become Seller
              </Link>
            </p>
          }
        
        </div>
       
        <div className='flex gap-3 w-[50%] items-center'>
        {
          token && <p className='text-2xl'>
            <Link to={"/cart"}> <AiOutlineShoppingCart />
            </Link>
          </p>
        }
        {
          !token && <p className='hover:text-neutral-500'>
            <Link to={"/login"}> Log in
            </Link>
          </p>
        }
        {
          !token && <p className='bg-black text-white px-4 py-2 rounded-full hover:bg-neutral-600'>
            <Link to={"/signup"}> sign up
            </Link>
          </p>
        }
        {
          token &&
          <div className='w-[30px] h-[30px] '>
            <img className='w-full object-contain rounded-full'
              src={user.image} />
          </div>
        }
        </div>
      </div>
    </div>

  )
}

export default Navbar
