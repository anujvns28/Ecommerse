import React, { useState } from 'react'
import { loginUser } from '../service/operation/auth';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
    const {token} = useSelector((state) => state.auth)
    const {user} = useSelector((state) => state.auth)
    
    const [formData, setFormData] = useState();
    const dispatch = useDispatch()

    const handleChange = (event) => {
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = async(event) => {
        console.log("calling")
        event.preventDefault();
        
        await loginUser(formData,dispatch);
      
    }

console.log("this is token",token)
console.log("this is token",user)
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Enter email</p>
                    <input
                        placeholder='Enter email'
                        name='email'
                        onChange={handleChange}
                        required
                        type='string'
                    />
                </label>

                <label>
                    <p>Enter password</p>
                    <input
                        placeholder='Enter password'
                        name='password'
                        onChange={handleChange}
                        required
                        type='string'
                    />
                </label>
                <button>Log in</button>
            </form>

            

        </div>
    )
}

export default Login
