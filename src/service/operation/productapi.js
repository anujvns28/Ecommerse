import {productEndPoints} from "../api"
import { apiConnector } from "../apiconnectur";

const {
GET_ALL_PRODUCT_API
} = productEndPoints

export  const getAllProducts = async (categoryId) => {
   
    try{
          const response = await apiConnector("GET",GET_ALL_PRODUCT_API);
          console.log("url",GET_ALL_PRODUCT_API)

        console.log("response hai bahiya ji",response)
    }
    catch(error) {
      console.log("CATALOG PAGE DATA API ERROR....", error);
     
    }
    
}