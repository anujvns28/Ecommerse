import React, { useEffect, useState } from 'react'
import { getAllSubCategories, updatingProduct } from '../../../service/operation/productapi'
import SelectImg from './SelectImg'
import EditSelectedProduct from './EditSelectedProduct'
import { RxCross1 } from "react-icons/rx";


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

const EditProduct = ({ productData,setEdit ,fetchingUserProduct}) => {
  const [SubcategoriesId, setSubcategoriesId] = useState()
  const [formData, setFormData] = useState({
    productName: productData.productName,
    price: productData.price,
    color: productData.color,
    forWhom: productData.forWhom,
    subCategory: productData.subCategory,
    productDes: productData.productDes,
    mainImage: productData.mainImage,
    img1:productData.productsImages[0],
    img2:productData.productsImages[1],
    img3:productData.productsImages[2],
    img4:productData.productsImages[3],
    img5:productData.productsImages[4]
  })



  const handleChange = (e) => {
    const { value, name, type, files } = e.target
    setFormData((prev) => ({
      ...prev,
      [name] : type ==="file" ? files[0] : value
    }))
  }

  const fetchSubCategory = async (category) => {
    const result = await getAllSubCategories(productData.category);
    if (result) {
      setSubcategoriesId(result.subCategorys)
    }
  }

  useEffect(() => {
    fetchSubCategory()
  }, [])

  const getData = (data) => {
    handleChange(data)
  }
  const data = {
    ...formData,
    productId : productData._id
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    console.log(formData,"this form data")
    await updatingProduct(data,fetchingUserProduct,setEdit)
  }


  return (
    <div className='w-full absolute bg-slate-200  '>
      <p onClick={() => setEdit(null)}
      className='text-2xl font-bold absolute right-6 top-6 cursor-pointer'><RxCross1/></p>
      <form onSubmit={handleSubmit}
      className='w-[80%] border border-black rounded-md mx-auto  my-14'>
        <label>
          <p className='text-xl font-semibold pb-1'>Product Name</p>
          <input
            className='w-full border border-black outline-none p-3 rounded-md text-xl'
            type="string"
            required
            value={formData.productName}
            placeholder='Enter Product Name'
            name='productName'
            onChange={handleChange}
          />
        </label>

        <div className='flex justify-between  w-full  '>
          <label className='w-[49%]'>
            <p className='text-xl font-semibold pb-1'>Price</p>
            <input
              className='w-full border border-black outline-none p-3 rounded-md text-xl'
              type="Number"
              required
              placeholder='Enter Price'
              name='price'
              value={formData.price}
              onChange={handleChange}
            />
          </label>

          <label className='w-[49%]'>
            <p className='text-xl font-semibold pb-1'>Discount Price</p>
            <input
              className='w-full border border-black outline-none p-3 rounded-md text-xl'
              type="Number"
              required
              placeholder='Enter Price'
              name='price'

              onChange={handleChange}
            />
          </label>
        </div>

        <div className='flex justify-between  w-full  '>
          <label className='w-[49%]'>
            <p className='text-xl font-semibold pb-1'>Select Color</p>
            <select
              className='w-full border border-black outline-none p-3 rounded-md text-xl'
              required
              name='color'
              value={formData.color}
              onChange={handleChange}
            >
              {
                ProColor.map(color => <option value={color.colorName}>{color.colorName}</option>)
              }
            </select>
          </label>

          <label className='w-[49%]'>
            <p className='text-xl font-semibold pb-1'>Select Gender</p>
            <select
              className='w-full border border-black outline-none p-3 rounded-md text-xl'
              required
              name='forWhom'
              value={formData.forWhom}
              onChange={handleChange}
            >
              {
                gender.map(gender => <option value={gender.gender}>{gender.gender}</option>)
              }
            </select>
          </label>

        </div>

        <label className='w-full'>
          <p className='text-xl font-semibold pb-1'>Select Compny</p>
          {
            SubcategoriesId &&
            <select
              className='w-full border border-black outline-none p-3 rounded-md text-xl'
              required
              name='subCategory'
              onChange={handleChange}
              value={formData.subCategory}
            >
              {
                SubcategoriesId.map(cat => <option value={cat._id}>{cat.name}</option>)
              }
            </select>
          }
        </label>

        <label className='w-full'>
          <p className='text-xl font-semibold '>Product Details</p>
          <textarea
            type="string"
            className='w-full h-[200px] border border-black outline-none p-3 rounded-md text-xl'
            required
            placeholder='Enter Product Details'
            name='productDes'
            value={formData.productDes}
            onChange={handleChange}
          />
        </label>

        <div >
        <div className='flex flex-wrap flex-row w-[45%]'>
          <EditSelectedProduct onSubmit={getData}  image={formData.mainImage} />
        </div>

         <div className='flex flex-wrap  w-full  justify-between'>

         {
            productData.productsImages.map((image, index) => {
              return <div className='w-[48%] py-5'>
                <EditSelectedProduct onSubmit={getData} imgNum={index + 1} image={image} />
              </div>
            })
          }
        
        </div>
        </div>

        <button className='px-3 py-2 rounded-md bg-yellow-500 items-start w-[150px] text-xl'>submit</button>
      </form>
    </div>
  )
}

export default EditProduct
