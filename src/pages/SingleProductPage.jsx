import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllSubCategories, getAllSubCategoryProduct, getSingleProductDetails } from '../service/operation/productapi';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import SlidCard from '../components/core/SlidCard';
import Card from '../components/common/Card';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addToRecentlyView, addToWishlist, } from '../slice/produc';
import { toast } from 'react-toastify';
import Modal from '../components/common/Modal';
import { buyShouse } from '../service/operation/payment';
import { FetchUserData } from '../service/operation/profil';
import { RxCross1 } from "react-icons/rx";
import { add } from 'lodash';

const SingleProductPage = () => {
  const { productId } = useParams();
  const [productDetail, setProductDetails] = useState();
  const [showImage, setShowImage] = useState();
  const [showReleatedProduct, setShowReleatedProduct] = useState();
  const [releatedSubCategories, setSubCategories] = useState();
  const [address, setaddress] = useState()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const [modalData, setModalData] = useState()
  const nevagite = useNavigate();




  const fetchProductDetails = async () => {
    const result = await getSingleProductDetails(productId);
    if (result) {
      setProductDetails(result.productDetails)
      const releatedProduct = await getAllSubCategoryProduct(result.productDetails.subCategory);
      if (releatedProduct) {
        setShowReleatedProduct(releatedProduct.subCategoryProducts);
      }
      const subCategores = await getAllSubCategories(result.productDetails.category);
      if (subCategores) {
        setSubCategories(subCategores.subCategorys)
      }
    }

    if(user){
      dispatch(addToRecentlyView(result.productDetails));
    }
  }

  useEffect(() => {
    fetchProductDetails()
  }, [productId])

  const handleCart = (productDetail) => {
    if (user === null) {
      setModalData({
        text1: "Your Are Not Logged in!",
        text2: "Please Login to add To Cart",
        btn1: "Login",
        btn2: "Cancel",
        path: "/login",
        handler2: () => setModalData(null),
        handler1: () => nevagite("/login")
      })
    } else {
      dispatch(addToCart(productDetail))
    }

  }

  const handleWishList = (productData) => {
    if (user === null) {
      setModalData({
        text1: "Your Are Not Logged in!",
        text2: "Please Login to add To Wishlist",
        btn1: "Login",
        btn2: "Cancel",
        path: "/login",
        handler1: () => nevagite("/login"),
        handler2: () => setModalData(null),
      })
    } else {
      dispatch(addToWishlist(productData))
    }

  }

  const handleAddAddress = async () => {
    if (user === null) {
      setModalData({
        text1: "Your Are Not Logged in!",
        text2: "Please Login To Buy Shouse",
        btn1: "Login",
        btn2: "Cancel",
        path: "/login",
        handler2: () => setModalData(null),
        handler1: () => nevagite("/login")
      })
    } else {
      const userData = await FetchUserData(user._id)
      if (userData) {
        setaddress(userData.data.address)
      }
    }

  }

  const handlePayment = async (addressId) => {
    buyShouse([productId], user, addressId)
    setaddress(null)
  }


  console.log("pringting single product details ", releatedSubCategories)
  return (
    <div className=' w-11/12 mx-auto '>
      <div className=' w-[77%] mx-auto flex my-10 flex-row gap-[8%]'>
        <div className='flex flex-row gap-2 w-[48%] '>
          <div className='relative'>
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
                className='rounded-full text-xl px-2 py-4 w-[48%] bg-black  text-white'>
                Add to Cart
              </button>
              <button onClick={() => handleWishList(productDetail)}
                className='rounded-full text-xl px-2 py-4 w-[48%]  border border-black text-black'>
                Wishlist
              </button>
            </div>

            <button onClick={handleAddAddress}
              className='rounded-full hover:bg-yellow-600 text-xl px-2 py-4 bg-yellow-500 w-full text-white'>
              Buy Now
            </button>
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
                      showReleatedProduct.product.map((ele) => {
                        if (ele._id !== productId) {
                          return <div className='flex items-center justify-center '>
                            <SwiperSlide>
                              <Card cardData={ele} />
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
                      releatedSubCategories.map((ele) => {
                        if (ele._id !== productDetail.subCategory) {
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

      {/* modal */}
      {
        modalData ? <Modal modalData={modalData} /> : ""
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
              className='p-3 bg-yellow-400 rounded-md'>Create New Address</button>

          </div>
        </div>
          : <div>

          </div>
      }

    </div>
  )
}

export default SingleProductPage
