import { toast } from "react-toastify";
import {productEndPoints} from "../api"
import { apiConnector } from "../apiconnectur";

const {
GET_ALL_PRODUCT_API,
GET_ALL_CATEGORY_API,
GET_CATEGORY_SUBCATEGORY
} = productEndPoints

export  const getAllProducts = async () => {
   
    try{
      
          const response = await apiConnector("GET",GET_ALL_PRODUCT_API);
          console.log("url",GET_ALL_PRODUCT_API)

        console.log("response hai bahiya ji",response)
    }
    catch(error) {
      console.log("All Prduct fetching  API ERROR....", error);
      
    }
    
}

export const getAllCategories = async() =>{
  const toastId = toast.loading("loading...")
  let result =[]
  try{
  
   const response = await apiConnector("GET",GET_ALL_CATEGORY_API,)
   

   console.log("CAtegory api response",response)
   result = response.data
  }catch(err){
    console.log("All Category fetching  API ERROR....", err);
  }
  toast.dismiss(toastId)
  return result 
}


export const getAllSubCategories = async(categoryId) =>{
  const toastId = toast.loading("loading...")
  let result =[]
  try{
  
   const response = await apiConnector("POST",GET_CATEGORY_SUBCATEGORY,{categoryId:categoryId})

   console.log("Categories SubCategory api response",response)
   result = response.data.subCategoryes
  }catch(err){
    console.log("All Categories SubCategory fetching  API ERROR....", err);
  }
  toast.dismiss(toastId)
  return result
}

//get categoryWise Subcategories

