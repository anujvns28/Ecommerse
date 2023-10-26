import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    signupData: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setsignupData(state,value){
            state.signupData = value.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {setsignupData} = authSlice.actions

export default authSlice.reducer