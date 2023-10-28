const BASE_URL = process.env.REACT_APP_BASE_URL

export const productEndPoints = {
GET_ALL_PRODUCT_API : BASE_URL + "/product/fetchAllProducts",
GET_ALL_CATEGORY_API : BASE_URL + "/product/fetchallCategory",
GET_CATEGORY_SUBCATEGORY : BASE_URL + "/product/fetchallSubCategory",
GET_SUBCATEGORI_WISE_PRODUCT : BASE_URL + "/product/getSubCategoryWiseProduct",
GET_SINGLE_PRODUDCT_DETAILS : BASE_URL + "/product/getSingleProductDetails"
}

export const authEndPoints = {
    GET_OTP : BASE_URL + "/user/sendOtp",
    SIGN_UP_API : BASE_URL + "/user/signup",
    LOGIN_API : BASE_URL + "/user/login"
}