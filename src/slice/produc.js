import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: [],
}

export const counterSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setFilterProduct(state, value) {
            state.product = value.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const {setFilterProduct} = counterSlice.actions

export default counterSlice.reducer