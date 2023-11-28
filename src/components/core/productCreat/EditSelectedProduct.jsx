import React, { useEffect, useState } from 'react'

const EditSelectedProduct = (props) => {
    
    const [prImg, setPrImg] = useState()
    const [prUrl, setPrUrl] = useState()
   
    const handleChange = (e) => {
        const file = e.target.files[0]
        setPrImg(file)
        const url = URL.createObjectURL(file);
        setPrUrl(url)

        props.onSubmit(e)
    }
     
    useEffect(() =>{
    setPrUrl(props.image)
    },[])
   
    const handleClick = () => {
        console.log("calling by delete")
        setPrUrl(null)
        setPrImg(null)
        console.log(prUrl,"This is url")
    }
    
  return (
    <div className='w-full '>
            <p className='text-xl font-semibold '>Select Image {props.imgNum ? props.imgNum : "mainImage"}</p>
             <div className= 'w-full h-[250px] border border-black rounded-md flex items-center justify-center'>
            {
                prUrl ?
                    <div className=' h-[250px] bg-cover p-3'>
                        <img src={prUrl} 
                        className='w-full h-[230px] bg-cover aspect-video  ' />
                        <button onClick={handleClick}>Delete</button>
                    </div>
                    : <div>
                        <label >     
                          <p className='text-xl font-semibold w-full h-[250px] cursor-pointer  flex items-center justify-center'>
               Select Image
             </p>
                            <input 
                             className='invisible '
                                type="file"
                                required
                                onChange={handleChange}
                                name={props.imgNum ? `img${props.imgNum}` : "mainImage"}
                            />
                        </label>
                    </div>
            }
        </div>
        </div>
  )
}

export default EditSelectedProduct
