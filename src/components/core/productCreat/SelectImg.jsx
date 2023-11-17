import { isNull } from 'lodash'
import React, { useState } from 'react'

const SelectImg = (props ) => {
    
    const [prImg,setPrImg] = useState()
    const [prUrl,setPrUrl] = useState()

    const handleChange = (e) =>{
    const file = e.target.files[0]    
    setPrImg(file)
    const url = URL.createObjectURL(file);
    setPrUrl(url)

    props.onSubmit(e)
    }

    const handleClick = () =>{
        setPrUrl(null)
        setPrImg(null)
    }
    return (
        <div>
            <label>
                <p>Select components {props.imgNum}</p>
                <input
                    type="file"
                    required
                    onChange={handleChange}
                    name={`img${props.imgNum}`}
                />
            </label>

            {
                prUrl && 
                <div>
                <img src={prUrl} width={200}/>
                <button onClick={handleClick}>Delete</button>
                </div>
            }
        </div>
    )
}

export default SelectImg
