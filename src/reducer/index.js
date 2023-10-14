import { combineReducers,} from "@reduxjs/toolkit";
import productReducer from "../slice/produc"
const rootReducer = combineReducers({
    product : productReducer
})

export default rootReducer