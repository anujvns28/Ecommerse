import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

const initialState = {
    value: [],
    cart:localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
    
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
            localStorage.setItem("cart", JSON.stringify(state.cart))   
        }else{
            toast.error("Shouse Alredy in cart")
        }
        },
        removeCart(state,value){
        const index = state.cart.findIndex((item) => item._id === value.payload._id)    
        state.cart.splice(index,1)   
        localStorage.removeItem("cart",value.payload)   
        },
    },
})

// Action creators are generated for each case reducer function
export const {setFilterProduct,addToCart,removeCart,setTotalPrice} = counterSlice.actions

export default counterSlice.reducer