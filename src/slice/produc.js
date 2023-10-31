import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

const initialState = {
    value: [],
    cart:[],
    totalPrice : 0
}

export const counterSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setFilterProduct(state, value) {
            state.product = value.payload
        },
        addToCart(state, value) {
        const pro = value.payload;  
        const index =   state.cart.findIndex((item) => item._id === pro._id)
        if(index === -1){
            state.cart.push(value.payload)
            toast.success('Shouse Added')
        }else{
            toast.error("Shouse Alredy in cart")
        }
        },
        removeCart(state,value){
        const index = state.cart.findIndex((item) => item._id === value.payload._id)    
        state.cart.splice(index,1)      
        },
        setTotalPrice(state,value){
        state.totalPrice = state.totalPrice + value.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const {setFilterProduct,addToCart,removeCart,setTotalPrice} = counterSlice.actions

export default counterSlice.reducer