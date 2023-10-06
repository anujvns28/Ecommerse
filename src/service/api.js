const BASE_URL = process.env.REACT_APP_BASE_URL

export const productEndPoints = {
GET_ALL_PRODUCT_API : BASE_URL + "/product/fetchAllProducts",
GET_ALL_CATEGORY_API : BASE_URL + "/product/fetchallCategory",
GET_CATEGORY_SUBCATEGORY : BASE_URL + "/product/fetchallSubCategory"
}