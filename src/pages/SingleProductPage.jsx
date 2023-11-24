import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAllSubCategories, getAllSubCategoryProduct, getSingleProductDetails } from '../service/operation/productapi';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import SlidCard from '../components/core/SlidCard';
import Card from '../components/common/Card';
import { useDispatch } from 'react-redux';
import { addToCart, addToWishlist, } from '../slice/produc';
import { toast } from 'react-toastify';

const SingleProductPage = () => {
    const { prouctId } = useParams();
    const [productDetail, setProductDetails] = useState();
    const [showImage, setShowImage] = useState();
    const [showReleatedProduct,setShowReleatedProduct] = useState();
    const [releatedSubCategories,setSubCategories] = useState();
    const dispatch = useDispatch()

    const fetchProductDetails = async () => {
        const result = await getSingleProductDetails(prouctId);
        if (result) {
            setProductDetails(result.productDetails)
            const releatedProduct = await getAllSubCategoryProduct(result.productDetails.subCategory);
            if(releatedProduct){
               setShowReleatedProduct(releatedProduct.subCategoryProducts); 
            }
            const subCategores = await getAllSubCategories(result.productDetails.category);
            if(subCategores){
                setSubCategories(subCategores.subCategorys)
            }
        }
       
       
    }

    useEffect(() => {
        fetchProductDetails()
    }, [prouctId])

    const handleCart = (productDetail) =>{
      dispatch(addToCart(productDetail))
    }

   const  handleWishList = (productData) =>{
    dispatch(addToWishlist(productData))
   }


     console.log("pringting single product details ", releatedSubCategories)
    return (
        <div className=' '>
            <div className=' w-[77%] mx-auto flex my-10 flex-row gap-[8%]'>
                <div className='flex flex-row gap-2 w-[48%]'>
                    <div className=''>
                        {
                            productDetail ?
                                <div
                                    className='flex flex-col gap-2'>
                                    {
                                        productDetail.productsImages.map((item) => {
                                            return <div className='w-20'>
                                                <img onClick={() => setShowImage(item)}
                                                    className='object-cover rounded-md w-32 h-20'
                                                    src={item} ></img >
                                            </div>

                                        })
                                    }
                                </div>
                                : <div> Loading... </div>
                        }
                    </div>
                    {/* gf */}
                    <div className='w-full'>
                        {
                            productDetail ? <img className='object-cover  h-[80vh] rounded-md'
                                src={showImage ? showImage : productDetail.productsImages[0]}></img> : "Loading..."
                        }
                    </div>
                </div>

                <div className=' w-[40%] p-3 flex flex-col gap-2'>
                    <h1 className='text-3xl font-semibold'>{productDetail ? productDetail.productName : "Loading..."}</h1>
                    <p className='font-semibold '>{productDetail ? productDetail.forWhom : "Loading..."}'s Shoes</p>
                    <div className='pt-3'>
                        <p className='font-semibold text-lg'>MRP : {productDetail ? productDetail.price : "Loading..."}</p>
                        <p className='text-slate-400'>incl. of taxes</p>
                        <p className='text-slate-400'>(Also includes all applicable duties)</p>
                    </div>
                    <p className='font-semibold '>Color : {productDetail ? productDetail.color : "Loading..."}</p>

                    <div className='flex flex-col gap-3'>
                     <div className='flex flex-row gap-3'>
                     <button onClick={() => handleCart(productDetail)}
                     className='rounded-full text-xl px-2 py-4 w-[48%] bg-black  text-white'>Add to Cart</button>
                      <button onClick={() => handleWishList(productDetail)}
                      className='rounded-full text-xl px-2 py-4 w-[48%]  border border-black text-black'>Wishlist</button>
                     </div>

                      <button className='rounded-full text-xl px-2 py-4 bg-yellow-500 w-full text-white'>Buy Now</button>
                    </div>
                </div>
            </div>
   {/* relaeatd products */}
            <div>
        <h1 className='text-2xl font-semibold py-3 text-black'>Similar Shouses </h1>
        {
          showReleatedProduct ? 
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
                   showReleatedProduct.product.map((ele) =>{
                   if(ele._id !== prouctId){
                    return <div className='flex items-center justify-center '>
                       <SwiperSlide>
                        <Card cardData={ele}/>
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
{/* similar categories */}
      <div className='border border-t my-10'>
        <h1 className='text-2xl font-semibold py-3 '>Similar Shouses Brands</h1>
        {
          releatedSubCategories ? 
          <div >
            {
              <Swiper
              modules={[Navigation, Pagination, Scrollbar, Autoplay]}
              navigation
              slidesPerView={4}
              spaceBetween={15}
              >
                <div className='items-center  '>
                {
                   releatedSubCategories.map((ele) =>{
                   if(ele._id !== productDetail.subCategory){
                    return <div className='flex items-center justify-center '>
                       <SwiperSlide>
                      <SlidCard cardDetail={ele} categoriId={productDetail.category}></SlidCard>
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

export default SingleProductPage
