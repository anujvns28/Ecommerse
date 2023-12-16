const BASE_URL = process.env.REACT_APP_BASE_URL

export const productEndPoints = {
GET_ALL_PRODUCT_API : BASE_URL + "/product/fetchAllProducts",
GET_ALL_CATEGORY_API : BASE_URL + "/product/fetchallCategory",
GET_CATEGORY_SUBCATEGORY : BASE_URL + "/product/fetchallSubCategory",
GET_SUBCATEGORI_WISE_PRODUCT : BASE_URL + "/product/getSubCategoryWiseProduct",
GET_SINGLE_PRODUDCT_DETAILS : BASE_URL + "/product/getSingleProductDetails",
CREATE_PRODUCT_URL:BASE_URL + "/product/createProduct",
GET_USER_PRODUCT : BASE_URL + "/product/getUserProduct",
DELETE_PROUDUCT : BASE_URL + "/product/deleteProduct",
EDIT_PRODUCT : BASE_URL + "/product/editProduct",
SEARC_PRODUCT : BASE_URL + "/product/searchProducts",
CUSTOMR_ORDERS : BASE_URL + "/product/order"
}

export const authEndPoints = {
    GET_OTP : BASE_URL + "/user/sendOtp",
    SIGN_UP_API : BASE_URL + "/user/signup",
    LOGIN_API : BASE_URL + "/user/login",
    FORGOTPASSWORDTOKEN_API : BASE_URL + "/user/forgotPasswordToken",
    FORGOTPASSWORD_API : BASE_URL + "/user/forgotPassword"
}

export const profileEndPoints = {
    GET_PROFILE_DATA : BASE_URL + "/user/fetchUserData",
    UPDATE_PROFILE : BASE_URL + "/user/updateProfile",
    UPDATE_PROFILE_IMG : BASE_URL + "/user/updateProfileImg",
    ADD_ADDRESS : BASE_URL + "/user/addAddress",
    DELETE_ADDRESS : BASE_URL + "/user/deleteAddres",
    
}


export const paymentEndpoints = {
    SHOUSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
    SHOUSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
  }