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


const Home = () => {
  const [category, setCategory] = useState(null);
  const [allCategories,setallCategories] = useState([]);
  const all_categories = [] 

  useEffect(() => {
    const getCategoires = async() =>{
      const result = await getAllCategories();
    if (result) {
      setCategory(result)
    }
    }
    
    getCategoires()
  }, [])

  
  
  

  
  

  return (
    <div className='w-full py-2 '>
    
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
      {/* categories */}
      <div className='bg-slate-50 '>
       
       {
        category ? <div className='  flex flex-col gap-5'>
          {
            category.categoies.map((item) => {
            
            if(item.subCategorys.length > 0){
           return <div className=' items-center w-auto'>
            <p className='text-2xl py-2'>Best in {item.categoryName}</p>
            <Swiper
            modules={[Navigation, Pagination, Scrollbar, Autoplay]}
            navigation
            slidesPerView={4}
            spaceBetween={15}
            >
              <div className='items-center  '>
              {
                 item.subCategorys.map((ele) =>{
                 if(item._id === ele.categoriId){
                  return <div className='flex items-center justify-center '>
                     <SwiperSlide>
                     <SlidCard cardDetail={ele} categoriId={item._id}/>
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
        </div> 
        :  <div class="custom-loader flex items-center justify-center  "></div>
      } 
      
      </div>
    </div>
  )
}

export default Home
