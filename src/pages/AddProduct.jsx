import React, { useEffect, useState } from 'react'
import { getAllCategories, getAllSubCategories } from '../service/operation/productapi'

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

    const [formData,setFormData] = useState()
    const [categoriesId,setcategoriesId] = useState()
    const [SubcategoriesId,setSubcategoriesId] = useState()
    const [isCategorie,setIsCategore] = useState()
    let category = categoriesId ? categoriesId[0]._id : null
    
    

    const fatchCategory = async() =>{
      const category = await getAllCategories()
      if(category){
         setcategoriesId(category.categoies)
      }
    }

    const fetchSubCategory  = async(category) =>{
      const result = await getAllSubCategories(category);
      if(result){
        setSubcategoriesId(result.subCategorys)
       
     }
      }

    console.log(categoriesId)

    useEffect(() =>{
      fatchCategory()
    },[])

    const handleNext = () =>{
      setIsCategore(category)
      fetchSubCategory(category);
    }

    const handleChange = (e) =>{
      setFormData((prev) =>{
        return {
          ...prev,
          [e.target.name] : e.target.value
        }
      })
    }

    const handleSubmit = (e) =>{
      e.preventDefault();
      console.log(formData)
    }

  return (
    <div>
       {
         !isCategorie && 
         <div>
          <label>
          <p>Categorie</p>
          <select
          required
          onChange={(e) => category = e.target.value}
          >
            { categoriesId &&
              categoriesId.map(cat => <option value={cat._id}>{cat.categoryName}</option>)
            }
          </select>
        </label>
        <button onClick={handleNext}>Next</button>
        </div>
       }
      {/* after selecting categore */}
      {
        isCategorie &&
        <form onSubmit={handleSubmit}>
        <label>
          <p>Product Name</p>
          <input
          type="string"
          required
          placeholder='Enter Product Name'
          name='productName'
          onChange={handleChange}
          />
        </label>
        <label>
          <p>Product Details</p>
          <textarea
          type="string"
          required
          placeholder='Enter Product Details'
          name='desc'
          onChange={handleChange}
          />
        </label>

        <label>
          <p>Product Name</p>
          <input
          type="Number"
          required
          placeholder='Enter Price'
          name='price'
          onChange={handleChange}
          />
        </label>

        <label>
          <p>Color</p>
          <select
          required
          name='color'
          onChange={handleChange}
          >
            {
              ProColor.map(color => <option value={color.colorName}>{color.colorName}</option>)
            }
          </select>
        </label>

        <label>
          <p>Gender</p>
          <select
           required
           name='gender'
           onChange={handleChange}
          >
            {
              gender.map(gender => <option value={gender.gender}>{gender.gender}</option>)
            }
          </select>
        </label>
        
        <label>
          <p>Select Compny</p>
          {
            SubcategoriesId && 
            <select
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

        <button>submit</button>
      </form>
      }
    </div>
  )
}

export default AddProduct
