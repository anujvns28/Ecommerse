import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSubCategoryProduct } from '../../service/operation/productapi'
import { useLocation } from 'react-router-dom'
import { setFilterProduct } from '../../slice/produc'

const Sidebar = () => {
  const gender = [
    {
      id: 1,
      gender: "Men"
    },
    {
      id: 2,
      gender: "Women"
    },
    {
      id: 3,
      gender: "Younger Child"
    },
    {
      id: 4,
      gender: "Older Child"
    }
  ]

  const ProPrice = [
    {
      id: 1,
      price: "Under-1500"
    },
    {
      id: 1,
      price: "1500-3500"
    },
    {
      id: 1,
      price: "3500-7000"
    },
    {
      id: 1,
      price: "7000-10500"
    },
    {
      id: 1,
      price: "10500-15000"
    },
    {
      id: 1,
      price: "15000-30000"
    },
  ]

  const ProColor = [
    {
      id: 1,
      color: 'bg-purple-700 ',
      colorName: "Purple"
    },
    {
      id: 1,
      color: 'bg-red-700',
      colorName: "Red"
    },
    {
      id: 1,
      color: 'bg-black',
      colorName: "Black"
    },
    {
      id: 1,
      color: 'bg-blue-500',
      colorName: "Blue"
    },
    {
      id: 1,
      color: 'bg-white',
      colorName: "White"
    },
    {
      id: 1,
      color: 'bg-amber-700',
      colorName: "Brown"
    },
    {
      id: 1,
      color: 'bg-green-700',
      colorName: "Green"
    },
    {
      id: 1,
      color: 'bg-gray-700',
      colorName: "Gray"
    },
    {
      id: 1,
      color: 'bg-pink-700',
      colorName: "Pink"
    },
    {
      id: 1,
      color: 'bg-yellow-500',
      colorName: "Yellow"
    },
  ]

  const proRating = [
    {
      id: 1,
      rating: '3 ★ & above',
    },
    {
      id: 1,
      rating: '4 ★ & above',
    },
  ]

  const dispatch = useDispatch();
  const location = useLocation()
  const [filterdProduct, setFilterdProduct] = useState()
  const subCategoryId = location.pathname.split("/").at(-1)
  const [products, setProducts] = useState()
  const {product} = useSelector((state) => state.product)


  const [checkedValue, setChecedValues] = useState([]);
  let proArray = []


  const handleChange = (event) => {
    const { value, checked } = event.target

    if (checked) {
      setChecedValues((pre) => [...pre, value])
    } else {
      const ind = checkedValue.findIndex((index) => index === value)
      checkedValue.splice(ind, 1)
      filterFunction()
      if (checkedValue.length === 0) {
        dispatch(setFilterProduct(null));
      }
    }
  }

  const fetchProducts = async () => {
    const result = await getAllSubCategoryProduct(subCategoryId);
    if (result) {
      setProducts(result.subCategoryProducts)
    }
  }
  useEffect(() => {
    fetchProducts()
  }, [])


  useEffect(() => {
    proArray = []
    filterFunction();
  }, [checkedValue])

  useEffect(() => {
    dispatch(setFilterProduct(filterdProduct));
  }, [filterdProduct])

  const filterFunction = () => {
    if (checkedValue.length > 0 && products.product.length !== 0) {
      checkedValue.map((item) => {
        products.product.map((pro, index) => {
          if (item === pro.forWhom || item === pro.price) {
            proArray.push(pro)
            setFilterdProduct(proArray)
          }
        })
      })
    }
  }









  console.log("this is printing filterd product",product)
  console.log(checkedValue)
  return (

    <div className='w-[17%] h-screen   sticky top-6 border p-4 overflow-y-scroll bg-scroll '>
      <div className='border-b border-black flex flex-col gap-1 py-4'>
        <h1 className='text-xl font-semibold items-start pb-3'>Gender</h1>
        {
          gender.map((item, index) => {
            return <div className='flex '
              key={index}>
              <label className='flex flex-row gap-2'>
                <input
                  className='outline-none border border-black w-5 h-5'
                  type='checkbox'
                  value={item.gender}
                  onChange={handleChange}
                />
                <p>{item.gender}</p>
              </label>
            </div>
          })
        }
      </div>

      <div className='border-b border-black flex flex-col gap-1 py-4'>
        <h1 className='text-xl font-semibold items-start pb-3'>Shop By Price</h1>
        {
          ProPrice.map((item, index) => {
            return <div className='flex '
              key={index}>
              <label className='flex flex-row gap-2'>
                <input
                  className='outline-none border border-black w-5 h-5'
                  type='checkbox'
                  value={item.price}
                   onChange={handleChange}
                />
                <p>{item.price}</p>
              </label>
            </div>
          })
        }
      </div>

      <div className='border-b border-black flex flex-col gap-1 py-4'>
        <h1 className='text-xl font-semibold items-start pb-3'>Color</h1>
        <div className='flex flex-row flex-wrap '>
          {
            ProColor.map((item, index) => {
              return <div className='flex flex-col justify-center items-center w-[32%] '
                key={index}>
                <div className={`w-[25px] h-[25px] rounded-full ${item.color} border-black border`}></div>
                <p>{item.colorName}</p>
              </div>
            })
          }
        </div>
      </div>

      <div className=' flex flex-col gap-1 py-4 pb-24'>
        <h1 className='text-xl font-semibold items-start pb-3'>Ratings</h1>
        <div className='flex flex-row flex-wrap '>
          {
            proRating.map((item, index) => {
              return <div className='flex '
                key={index}>
                <label className='flex flex-row gap-2'>
                  <input
                    className='outline-none border border-black w-5 h-5'
                    type='checkbox'
                  />
                  <p>{item.rating}</p>
                </label>
              </div>
            })
          }
        </div>
      </div>

    </div>

  )
}

export default Sidebar
