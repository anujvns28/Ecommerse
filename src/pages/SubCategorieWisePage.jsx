import React, { useEffect, useState, useRef } from 'react'
import Sidebar from '../components/common/Sidebar'
import { IoFilterSharp } from "react-icons/io5"
import { AiOutlineDown } from "react-icons/ai"
import { getAllSubCategories, getAllSubCategoryProduct } from '../service/operation/productapi'
import { useLocation, useParams } from 'react-router-dom'
import SlidCard from '../components/core/SlidCard'
import Card from '../components/common/Card'
import { useDispatch, useSelector } from 'react-redux'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { setFilterProduct } from '../slice/produc'


const SubCategorieWisePage = () => {
  const dispatch = useDispatch()
  const location = useLocation();
  const subCategoryId = location.pathname.split("/").at(-1)
  const categorieId = location.pathname.split("/").at(-2)
  const [products, setProducts] = useState()
  const [categorie, setCategorie] = useState()
  const { product } = useSelector((state) => state.product)
  const [showFilter, setShowFilters] = useState(true)
  const [open, setOpen] = useState(false)
  const openRef = useRef(false)
  const [sortLtoH, setSortLtoH] = useState(false)
  const [sortHtoL, setSortHtoL] = useState(false)
  const [loading, setLoading] = useState(true);


  const fetchProducts = async () => {
    const result = await getAllSubCategoryProduct(subCategoryId);

    const allOtherSubCategories = await getAllSubCategories(categorieId);

    if (result) {
      setProducts(result.subCategoryProducts)
    }
    if (allOtherSubCategories) {
      setCategorie(allOtherSubCategories.subCategorys)
    }
  }
  useEffect(() => {
    fetchProducts()
  }, [subCategoryId])


  window.addEventListener("click", (e) => {
    if (!openRef.current) {
      return
    }
    if (!openRef.current.contains(e.target)) {
      setOpen(false)
    }
  }
  )

  // sorting low to high
  const sortinglowToHigh = () => {
    const sortedProduct = !product ? products.product.sort((a, b) => a.price - b.price)
      : product.slice().sort((x, y) => x.price - y.price)

    dispatch(setFilterProduct(sortedProduct))
    setSortLtoH(true);
    setSortHtoL(false);
    setOpen(false)
  }

  // sorting high to low
  const sortingHichToLow = () => {
    const sortedProduct = !product ? products.product.sort((a, b) => b.price - a.price)
      : product.slice().sort((x, y) => y.price - x.price)

    dispatch(setFilterProduct(sortedProduct))
    setSortLtoH(false);
    setSortHtoL(true);
    setOpen(false)

    
    
  }
  

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className='flex flex-col gap-3 px-2 mx-auto'>
      <div className='w-full flex items-center justify-between text-black py-2 sticky top-0 z-50  mt-8 bg-white '>
        {
          products ?

            <div >

              <p className='text-xs'>Sports Shouse / {products.name}</p>
              <h1 className='text-xl font-semibold'>{products.name} ({product ? product.length : products.product.length})</h1>
            </div>
            : <div className='flex items-center justify-center h-screen'>Loading...</div>
        }
        <div className='flex flex-row gap-4 text-lg'>
          <div onClick={() => setShowFilters(!showFilter)}
            className='flex items-center flex-row gap-1 cursor-pointer'>
            <p >
              {!showFilter ? " Show Filters" : " Hide Filters"}
            </p>
            <IoFilterSharp />
          </div>
          <div onClick={() => setOpen(true)}
            ref={openRef}
            className='flex items-center flex-row gap-1 cursor-pointer relative'>
            <p>Sort By</p>
            {
              open ?
                <div className='bg-slate-400 p-3 rounded-md flex flex-col  items-start absolute w-[170px] translate-y-16 -translate-x-14'>
                  <p onClick={() => sortingHichToLow()}
                    className={`p-1 w-full rounded-md hover:bg-slate-300 text-sm ${sortHtoL ? "text-blue-700" : ""}`}>Price: High-Low</p>
                  <p onClick={() => sortinglowToHigh()}
                    className={`p-1 w-full rounded-md hover:bg-slate-300 text-sm ${sortLtoH ? "text-blue-700" : ""}`}>Price: Low-High</p>
                </div>
                : ""
            }
            <AiOutlineDown />
          </div>
        </div>
      </div>

      <div >
        {
          //loading...

          <div className='flex justify-between'>
            {
              showFilter ? <Sidebar /> : ""
            }
            <div className={`w-[80%] flex flex-row flex-wrap border right-3 ${!showFilter ? "w-full py-8" : ""}`}>
              {

                products ?
                  loading ?
                    <div className='flex items-center w-full justify-center text-xl font-semibold'>loading..</div>
                    : <div>
                      <div>
                        {
                          products.product.length !== 0
                            ? <div className={`flex flex-wrap  flex-row gap-2  ${showFilter ? "w-full" : ""} `}>
                              {
                                product
                                  ? product.map((item, index) => {
                                    return <div className='w-[32.5%] rounded-md'
                                      key={index}>
                                      {
                                        <Card cardData={item} showFilter={showFilter} />
                                      }
                                    </div>
                                  })
                                  : products.product.map((item, index) => {
                                    return <div className={`w-[32.5%] rounded-md `}
                                      key={index}>
                                      {
                                        <Card cardData={item} showFilter={showFilter} />
                                      }
                                    </div>
                                  })

                              }
                            </div> : <div className='flex items-center justify-center h-screen'>Not Found</div>
                        }
                      </div>
                    </div>
                  : <div className='flex items-center justify-center h-screen custom-loader'></div>

              }
            </div>
          </div>
        }
      </div>

      <div >
        <h1 className='text-2xl font-semibold py-3 '>Similar Shouses Brands</h1>
        {
          categorie ?
            <div>
              {
                <Swiper
                  modules={[Navigation, Pagination, Scrollbar, Autoplay]}
                  navigation
                  slidesPerView={4}
                  spaceBetween={15}
                >
                  <div className='items-center  '>
                    {
                      categorie.map((ele) => {
                        if (ele._id !== subCategoryId) {
                          return <div className='flex items-center justify-center '>
                            <SwiperSlide>
                              <SlidCard cardDetail={ele} categoriId={categorieId}></SlidCard>
                            </SwiperSlide>
                          </div>
                        }
                      })
                    }
                  </div>
                </Swiper>
              }
            </div>
            : <div>Loading...</div>
        }
      </div>

    </div>
  )
}

export default SubCategorieWisePage
