import React, { useEffect, useState } from 'react'
import { creteProduct, getAllCategories, getAllSubCategories } from '../service/operation/productapi'
import { useSelector } from 'react-redux'
import _ from "lodash"
import SelectImg from '../components/core/productCreat/SelectImg'

const AddProduct = () => {
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

  const [SubcategoriesId, setSubcategoriesId] = useState()
  const [categoriesId, setcategoriesId] = useState()
  const [isCategorie, setIsCategore] = useState()
  let category = categoriesId ? categoriesId[0]._id : null
  let subCat = SubcategoriesId ? SubcategoriesId[0]._id : null
  const { user } = useSelector((state) => state.auth)
  const [mainImg,setMainImg] = useState()
  const [mainImgUrl,setMainImgUrl] = useState()
 
  const fatchCategory = async () => {
    const category = await getAllCategories()
    if (category) {
      setcategoriesId(category.categoies)
    }
  }

  

  const fetchSubCategory = async (category) => {
    const result = await getAllSubCategories(category);
    if (result) {
      setSubcategoriesId(result.subCategorys)
    }
  }
  
  const [formData, setFormData] = useState({
    productName: "",
    desc: "",
    price: "",
    color: ProColor[0].colorName,
    forWhom: gender[0].gender,
    subCategory: subCat,
    img1:"",
    img2:"",
    img3:"",
    img4:"",
    img5:""
  })

  useEffect(() => {
    fatchCategory()
  }, [])

  const handleNext = () => {
    setIsCategore(category)
    fetchSubCategory(category);
  }

  const handleChange = (e) => {
    
    const { value, name, type, files } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type == "file" ? files[0] : value
    }))

  }

  const handleSubmit = async(e) => {
    e.preventDefault();
   const result = await creteProduct(formFullData)
   console.log(result,"this is product result")
   console.log(formFullData)
  }

  const handleMainImg  = (e) => {
    const file = e.target.files[0]
    if(file){
      setMainImg(file)
      const url = URL.createObjectURL(file);
      setMainImgUrl(url)
    }
  }
  
  
const getData = (data) =>{
  handleChange(data)
}

  
  const formFullData = {
    ...formData,
    mainImage : mainImg,
    userId : user._id,
    categoryId : isCategorie
  }

  
  return (
    <div className='w-full py-24 '>
      {
        !isCategorie &&
        <div className='w-full gap-3  h-full flex  items-center justify-center '>
          <label>
            <p className=' text-2xl font-semibold pb-2'>Select Categorie</p>
            <select
            className='border border-solid w-[400px] p-2 rounded-md text-2xl '
              required
              onChange={(e) => category = e.target.value}
            >
              {categoriesId &&
                categoriesId.map(cat => <option value={cat._id}>{cat.categoryName}</option>)
              }
            </select>
          </label>
          <button className='px-5 py-2 bg-yellow-500 rounded-md text-xl mt-10 '
          onClick={handleNext}>Next
          </button>
        </div>
      }
      {/* after selecting categore */}
      {
        isCategorie &&
        <form className='w-[60%] mx-auto border border-solid p-4 flex flex-col gap-3 rounded-md' 
        onSubmit={handleSubmit}>
          <label>
            <p className='text-xl font-semibold pb-1'>Product Name</p>
            <input
              className='w-full border border-black outline-none p-3 rounded-md text-xl'
              type="string"
              required
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
              name='desc'
              onChange={handleChange}
            />
          </label>

          {/*  main image */}
          <p className='text-xl font-semibold '>Product Main Image</p>
          <div className= 'w-[50%] h-[250px] border border-black rounded-md flex items-center justify-center'>
        {
          mainImgUrl 
          ? <div className=' h-[250px] bg-cover p-3'>
            <img  className='w-full h-auto bg-cover aspect-video '
            src={mainImgUrl} />
            <button onClick={() => setMainImgUrl()}>Delete</button>
          </div> 
          :<div>
           <label >
             <p className='text-xl font-semibold w-full h-[250px] cursor-pointer  flex items-center justify-center'>
               Select Image
             </p>
             <input
               className='invisible '
               type="file"
               required
               onChange={handleMainImg}
               name="mainImg"
               
             />
           </label>
          </div>
 
        }
      </div>

          {/* image 1 */}
         <SelectImg onSubmit={getData} imgNum={1} /> 
           {/* images 2*/}
          <SelectImg onSubmit={getData} imgNum={2} /> 
           {/* images 3*/}
           <SelectImg onSubmit={getData} imgNum={3} />
           {/* images 4*/}
           <SelectImg onSubmit={getData} imgNum={4} />
           {/* images 5*/}
           <SelectImg onSubmit={getData} imgNum={5} />

          <button>submit</button>
        </form>
      }

      
    </div>
  )
}

export default AddProduct
