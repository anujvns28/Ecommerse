import React, { useEffect, useState } from 'react'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import slid1 from "../assets/slide-1.png"
import slid2 from "../assets/slide-2.png"
import slid3 from "../assets/slide-3.png"
import { getAllCategories, getAllProducts, getAllSubCategories } from '../service/operation/productapi';
import SlidCard from '../components/core/SlidCard';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const Home = () => {
  const [category, setCategory] = useState(null);
  const [allCategories, setallCategories] = useState([]);
  const all_categories = []
  const { recentlyView } = useSelector((state) => state.product)

  console.log(recentlyView, "this is recently view jikkkkkkk")

  useEffect(() => {
    const getCategoires = async () => {
      const result = await getAllCategories();
      if (result) {
        setCategory(result)
      }
    }

    getCategoires()
  }, [])

  return (
    <div className='w-full pt-2 '>

     <div className='w-11/12 mx-auto'>
     <div className='w-full object-cover'>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, Autoplay]}
          navigation
          spaceBetween={50}
          autoplay={true}
          pagination={{ clickable: true }}

        >
          <SwiperSlide><img src={slid1} width={5000} /></SwiperSlide>
          <SwiperSlide><img src={slid2} width={5000} /></SwiperSlide>
          <SwiperSlide><img src={slid3} width={5000} /></SwiperSlide>
          <SwiperSlide><img src={slid2} width={5000} /></SwiperSlide>

        </Swiper>

      </div>

      <div className='flex items-center justify-center flex-col py-20 gap-5'>
        <h1 className='text-3xl font-semibold tracking-wide'>Cushioning for Your Miles</h1>
        <p className='text-center text-xl'>
          A lightweight Nike ZoomX midsole is combined with increased stack heights to <br /> help provide cushioning during extended stretches of running.
        </p>
      </div>
     </div>
      {/* categories */}
      <div className='bg-slate-200 w-full pb-14'>
      <div className='w-11/12 mx-auto'>

{
  category ? <div className='  flex flex-col gap-5'>
    {
      category.categoies.map((item) => {

        if (item.subCategorys.length > 0) {
          return <div className=' items-center w-auto'>
            <p className='text-2xl font-semibold italic py-2'>Best in {item.categoryName}</p>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, Autoplay]}
              navigation
              slidesPerView={4}
              spaceBetween={15}
            >
              <div className='items-center  '>
                {
                  item.subCategorys.map((ele) => {
                    if (item._id === ele.categoriId) {
                      return <div className='flex items-center justify-center '>
                        <SwiperSlide>
                          <SlidCard cardDetail={ele} categoriId={item._id} />
                        </SwiperSlide>
                      </div>
                    }
                  })
                }
              </div>
            </Swiper>
          </div>
        }
      })
    }

    {
      recentlyView.length > 0
        ? <div>
          <h1 className='text-xl font-semibold italic py-1'>Recently View</h1>
          <Swiper
              modules={[Navigation, Pagination, Scrollbar, Autoplay]}
              navigation
              slidesPerView={5}
              spaceBetween={15}
            >
              <div className='items-center  '>
                {
                  recentlyView.map((item) => {
                   
                      return <div className='flex items-center justify-center '>
                        <SwiperSlide>
                        <div className='rounded-md drop-shadow-md bg-white p-2 hover:scale-95 transition-all duration-500'>
                        <Link to={`/${item._id}`}> 
                        <div className=' flex justify-center w-full items-center bg-slate-100 border-b rounded-lg '>
                    <img className='rounded-md object-cover  h-[350px]'
                      src={item.mainImage} width={350} />
                  </div>
                        </Link>
                 <div className='w-full flex flex-col items-center justify-center'>
                 <p className=' font-semibold'>{item.productName}</p>
                  <p>Price : {item.price}</p>
                 </div>
                </div>
                        </SwiperSlide>
                      </div>
                    
                  })
                }
              </div>
            </Swiper>
        </div>
        : ""
    }
  </div>
    : <div class="custom-loader flex items-center justify-center  "></div>
}

</div>
      </div>
    </div>
  )
}

export default Home
