import React, { useState } from 'react'

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

    const [formData,setFormData] = useState()

    const handleChange = (e) =>{
      setFormData((prev) => (
        {
           ...prev,
           [e.target.name] : e.target.value
        }
      ))
    }

    const handleSubmit = (e) =>{
     e.preventDefault();
     console.log(formData,"this is form data")
    }

  return (
    <form onSubmit={handleSubmit}>
        {/* product name */}
        <label>
            <p>Product Name</p>
            <input
            placeholder='Enter Name'
            name='Pname'
            type='string'
            onChange={handleChange}
            />
        </label>

        {/* product desc */}
        <label>
            <p>Product Description</p>
            <input
            placeholder='Enter Description'
            name='Pdesc'
            type='string'
            onChange={handleChange}
            />
        </label>
         {/* price */}
         <label>
            <p>Price</p>
            <input
            placeholder='Enter Price'
            name='Price'
            type='Number'
            onChange={handleChange}
            />
        </label>

        <label>
            <p>Color</p>
            <select>
                {
                  ProColor.map((item) => {
                    return <option 
                        onChange={handleChange}
                        value={item.colorName}
                        defaultValue={""}
                        >
                        {item.colorName}
                        </option>
                  })
                }
            </select>
        </label>

        <button>submit</button>
    </form>
  )
}

export default AddProduct
