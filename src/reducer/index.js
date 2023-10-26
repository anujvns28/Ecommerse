import { combineReducers,} from "@reduxjs/toolkit";
import productReducer from "../slice/produc"
import authReducer from "../slice/auth"
const rootReducer = combineReducers({
    product : productReducer,
    auth : authReducer
})

export default rootReducer