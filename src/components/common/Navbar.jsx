import React, { useEffect, useRef, useState } from 'react'
import logo from "../../assets/logo.svg"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineDown } from "react-icons/ai"
import { getAllCategories, getAllSubCategories, searchProducts } from '../../service/operation/productapi'
import { HiArrowLongRight } from "react-icons/hi2"
import { BiLogOut } from "react-icons/bi"
import { AiOutlineUser } from "react-icons/ai"
import { VscGift } from "react-icons/vsc"
import { AiOutlineHeart } from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux'
import { LiaUser } from 'react-icons/lia'
import { MdAdd } from "react-icons/md"
import { RxDashboard } from "react-icons/rx"
import { CiSearch } from "react-icons/ci";
import { logout } from '../../service/operation/auth'


const Navbar = () => {
  const [category, setCategory] = useState(null);
  const [subCategoires, setSubCategories] = useState(null)
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.product);
  const nevagite = useNavigate()
  const [open, setOpen] = useState(false)
  const openRef = useRef(false)
  const searchRef = useRef(false)
 
  const [serch,setSearch] = useState([])
  const [searchProduct,setSearchProduct] = useState()
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navLinks = [
    
    {
      id: 3,
      name: "Categories",
      link: ""
    },


  ]

  const buyerLinks = [
    {
      id: 1,
      name: "My Profile",
      icon: <AiOutlineUser />,
      link: "/my-profile/view-profile",
    },
    {
      id: 2,
      name: "Orders",
      icon: <VscGift />,
      link: "/orders",
    },
    {
      id: 3,
      name: "Wishlist",
      icon: <AiOutlineHeart />,
      link: "/my-profile/wishlist",
    },
    
  ]

  const sellerLikns = [
    {
      id: 1,
      name: "My Profile",
      icon: <AiOutlineUser />,
      link: "/my-profile/view-profile",
    },
    {
      id: 2,
      name: "Products",
      icon: <VscGift />,
      link: "/products",
    },
    {
      id: 3,
      name: "Add Products",
      icon: <MdAdd />,
      link: "/create-product",
    },
    {
      id: 4,
      name: "Dashboard",
      icon: <RxDashboard />,
      link: "/dashboard",
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
    const result = await getAllSubCategories(categoryID);
    if (result) {
      setSubCategories(result);
    }
  }

  const handleSubCategories = (categoryId, subCategoriId) => {
    nevagite(`${categoryId}/${subCategoriId}`)
  }

  window.addEventListener("click", (e) => {
    if (!openRef.current ) {
      return
    }
    if (!openRef.current.contains(e.target) ) {
      setOpen(false)
      
    }
  }
  )
  window.addEventListener("click", (e) => {
    if ( !searchRef.current ) {
      return
    }
    if (!searchRef.current.contains(e.target) ) {
      setOpen(false)
      setSearchProduct(null)
      setSearch([])
    }
  }
  )

  const handleChange = async(e) =>{
   
    setSearch(e.target.value)
    const products = await searchProducts(serch)
    setSearchProduct(products.data)
    if(serch.length == 1){
      setSearchProduct(null)
      console.log(searchProduct,"search output")
    }
    }
  

    const handleClick = (productId) =>{
     nevagite(`/${productId}`)
     setSearchProduct(null)
     setSearch([])
    }
    

  return (

    <div className='flex items-center justify-between  h-20 w-11/12 mx-auto   '>
      <div className='flex items-center justify-between w-[60%]'>
       <div className='flex flex-row gap-6 items-center justify-center'>
       <Link to={"/"}>
          <img width={60} src={logo} />
        </Link >
  
        <h1 className='text-2xl font-semibold'>shouseDekho.com</h1>
       </div>

        <input
          placeholder="Search Product By Name"
          value={serch}
          onChange={handleChange}
          className='w-[500px] py-1 relative  rounded-md bg-slate-300 flex  items-center justify-centere border border-solid px-5 outline-none'
        />
        {
          serch.length ? 
          <div ref={searchRef}>
            {
          searchProduct && <div className='left-[380px] py-4 z-50 rounded-md top-[60px] w-[500px] p-3 bg-white text-black absolute border border-black'>
            {
              searchProduct.map((item) =>{
                return <div onClick={() => handleClick(item._id)}
                className='hover:bg-slate-400 cursor-pointer'>
                  <p className='text-xm font-bold px-2 py-[1px] '>{item.productName}</p>
                </div>
              })
            }
          </div>
        }
          </div> 
          : <div></div>
        }
      
      </div>
      <div className='flex flex-row gap-8'>
        {
          navLinks.map((sublinks) => {
            return sublinks.name === 'Categories' ?
              <div className='flex relative group cursor-pointer items-center flex-row gap-1  justify-center '>
                <p>Categories</p>
                <AiOutlineDown />
                <div className="w-20 absolute  bg-slate-300  invisible left-[50%] top-[50%] z-[1000] flex  translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900  transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em]  lg:w-[300px]">
                  <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-slate-300"></div>
                  {
                    category ? <div >
                      {
                        category.categoies.map((category, index) => {
                          return <div key={index}
                            className='hover:bg-slate-400 anuj py-4 px-4 rounded-md relative'>
                            <div onMouseOver={() => subCategories(category._id)}
                              className='flex justify-between'>
                              {category.categoryName}
                              <p className='text-2xl'>  <HiArrowLongRight /></p>
                            </div>
                            <div className=" subCategories absolute p-4 rounded-md bg-slate-300  ">
                              {
                                subCategoires ? subCategoires.subCategorys.map((item, index) => {
                                  return <div onClick={() => handleSubCategories(category._id, item._id)}
                                    className='hover:bg-slate-400  py-4 px-4 rounded-md relative '>
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
      <div className='flex justify-between w-[24%] items-center'>
        <div className='flex  px-1 '>
          <p className='text-2xl font-bold'><LiaUser /></p>
          
            <p className='hover:text-neutral-500 '>
             {
              user ? user.accountType === "Seller" ? "Seller Account" : 
               <Link to={"/registerAsSeller"}> 
                Become Seller 
                </Link>
              :  <Link to={"/registerAsSeller"}> 
              Become Seller 
              </Link>
             }
            
            </p>

        </div>

        <div className='flex gap-2 w-[52%] items-center relative'>
          {
            token && <p className='text-2xl'>
              {
                cart.length > 0 ? <div className='w-5 h-5 bg-red-500 rounded-full absolute -top-1 left-3'>
                  <p className='text-white text-xs flex items-center justify-center'> {cart.length}</p>
                </div>
                  : ""
              }
            {
               user.accountType === "Seller" ? "" 
               :  <Link to={"/cart"}> <AiOutlineShoppingCart /></Link>
            }
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
            <div onClick={() => setOpen(true)}
              ref={openRef}
              className=' cursor-pointer'>
              <img
                className=' w-[30px] h-[30px] object-contain rounded-full '
                src={user.image} />
              {
                open ?
                  <div className='relative w-full'>
                    {
                      user.accountType === "Buyer" || user.accountType === "Admin"
                        ? <div className='p-3 rounded-md bg-slate-400 absolute z-50 w-[150px]'>
                          {
                            buyerLinks.map((links) => {
                              return <Link to={links.link} >
                                <div className='flex flex-row gap-2 p-2 items-center justify-start hover:bg-slate-500 rounded-md'
                                  key={links.id}
                                  >
                                  <p>{links.name}</p>
                                  <p>{links.icon}</p>
                                </div>
                              </Link>
                            })
                          }
                          <div onClick={() => logout(dispatch,navigate)}
                          className='flex flex-row gap-2 p-2 items-center justify-start hover:bg-slate-400 rounded-md'>
                            <p>Logout</p>
                            <p><BiLogOut /></p>
                          </div>
                        </div>
                        : <div>
                          {
                             <div className='p-3 rounded-md bg-slate-300 absolute z-50 w-[170px]'>
                            {
                              sellerLikns.map((links) => {
                                return <Link to={links.link}>
                                  <div className='flex flex-row gap-2 p-2 items-center justify-start hover:bg-slate-400 rounded-md'
                                    key={links.id}>
                                    <p>{links.name}</p>
                                    <p>{links.icon}</p>
                                  </div>
                                </Link>
                              })
                            }
                            <div onClick={() => logout(dispatch,navigate)}
                            className='flex flex-row gap-2 p-2 items-center justify-start hover:bg-slate-400 rounded-md'>
                              <p>Logout</p>
                              <p><BiLogOut /></p>
                            </div>
                          </div>
                          
                          }
                        </div>
                    }
                  </div>
                  : ""
              }
            </div>
          }
        </div>
      </div>
    </div>

  )
}

export default Navbar
