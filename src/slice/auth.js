import { createSlice } from '@reduxjs/toolkit'
import { json } from 'react-router-dom'

const initialState = {
    signupData: null,
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    user : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setsignupData(state,value){
            state.signupData = value.payload
        },
        setToken(state,value){
            state.token = value.payload
        },
        setUser(state,value){
            state.user = value.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const {setsignupData,setToken,setUser} = authSlice.actions

export default authSlice.reducer