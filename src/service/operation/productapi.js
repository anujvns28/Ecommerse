import { toast } from "react-toastify";
import {productEndPoints} from "../api"
import { apiConnector } from "../apiconnectur";

const {
GET_ALL_PRODUCT_API,
GET_ALL_CATEGORY_API,
GET_CATEGORY_SUBCATEGORY,
GET_SUBCATEGORI_WISE_PRODUCT,
GET_SINGLE_PRODUDCT_DETAILS,
CREATE_PRODUCT_URL
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

export  const getAllSubCategoryProduct = async (subCategoryId) => {
   
  let resutl 
  try{
    
    const response = await apiConnector("POST",GET_SUBCATEGORI_WISE_PRODUCT,{subCategoryId:subCategoryId});

    console.log("SubCategori All Prduct response ",response)
    resutl = response.data
  }
  catch(error) {
    console.log("SubCategori All Prduct fetching  API ERROR....", error);
  }
  return resutl
  
}


//get Single Product DEtails

export  const getSingleProductDetails = async (productId) => {
   
  let resutl 
  try{
    
    const response = await apiConnector("POST",GET_SINGLE_PRODUDCT_DETAILS,{productId:productId});

    console.log("Single Prduct response ",response)
    resutl = response.data
  }
  catch(error) {
    console.log("single  Prduct fetching  API ERROR....", error);
  }
  return resutl
  
}

// createing product 
export  const creteProduct = async (productData) => {
   
  let resutl 
  const loadId = toast.loading("loading...")
  try{
    
    const response = await apiConnector("POST",
    CREATE_PRODUCT_URL,
    productData,
    {
      "Content-Type": "multipart/form-data",
    }
    );

    console.log("New product response ",response)
    resutl = response.data
    toast.success("product created sucess")
  }
  catch(error) {
    console.log("New product  API ERROR....", error);
    toast.error("product not created")
  }
  toast.dismiss(loadId)
  return resutl
  
}