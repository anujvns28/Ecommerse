import { isNull } from 'lodash'
import React, { useState } from 'react'

const SelectImg = (props) => {

    const [prImg, setPrImg] = useState()
    const [prUrl, setPrUrl] = useState()

    const handleChange = (e) => {
        const file = e.target.files[0]
        setPrImg(file)
        const url = URL.createObjectURL(file);
        setPrUrl(url)

        props.onSubmit(e)
    }

    const handleClick = () => {
        setPrUrl(null)
        setPrImg(null)
    }
    return (
        <div className='w-full'>
            <p className='text-xl font-semibold '>Select Image {props.imgNum}</p>
             <div className= 'w-[50%] h-[250px] border border-black rounded-md flex items-center justify-center'>
            {
                prUrl ?
                    <div className=' h-[250px] bg-cover p-3'>
                        <img src={prUrl} 
                        className='w-full h-auto bg-cover aspect-video ' />
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
                                name={`img${props.imgNum}`}
                            />
                        </label>
                    </div>
            }
        </div>
        </div>
    )
}

export default SelectImg
