import { toast } from "react-toastify";
import { authEndPoints } from "../api";
import { apiConnector } from "../apiconnectur";
import { setToken, setUser } from "../../slice/auth";
import { BsDatabaseDash } from "react-icons/bs";

const {
    GET_OTP,
    SIGN_UP_API,
    LOGIN_API,
    FORGOTPASSWORDTOKEN_API,
    FORGOTPASSWORD_API
} = authEndPoints


export const getOtp = async (email,navigate) => {
    try {
        const response = await apiConnector("POST", GET_OTP,{email:email});
        console.log("otp response", response);
        toast.success("Otp Sent successfully")
        navigate("/verify-email");
    }
    catch (error) {
        console.log("OTP RESPONSE  API ERROR....", error);
        toast.error("User Alredy Registerd")
    }

}

export const signupUser = async (data) => {
    try {
        const response = await apiConnector("POST", SIGN_UP_API,data);
        console.log("Signup response", response);
        toast.success("User Rejustered Successfully")
    }
    catch (error) {
        console.log("Signup RESPONSE  API ERROR....", error);
        toast.error("User Rejusteration Faild")
    }

}

export const loginUser = async (data,dispatch,nevagite) => {
    
    try {
        const response = await apiConnector("POST", LOGIN_API,data);
        console.log("login response", response);
        toast.success("Login Successfully")

         localStorage.setItem("token",JSON.stringify(response.data.token));
         localStorage.setItem("user",JSON.stringify(response.data.user));
         dispatch(setToken(response.data.token));
         dispatch(setUser(response.data.user));
         nevagite("/")
    }
    catch (error) {
        console.log("Login RESPONSE  API ERROR....", error);
        toast.error("Login Faild")
    }

}

export const forgotPasswordToken = async (email) => {
    const loadingId = toast.loading("loding....")
    try {
        const response = await apiConnector("POST",FORGOTPASSWORDTOKEN_API,{email:email});
        console.log("forgot password token response", response);

        toast.success("Reset link send your mail")
        toast.dismiss(loadingId)
    }
    catch (error) {
        console.log("for got password token   API ERROR....", error);
        toast.error("Error in Reset token")
        toast.dismiss(loadingId)
    }

}


export const forgotPassword = async (data,nevagite) => {
    const loadingId = toast.loading("loding....")
    try {
      
        const response = await apiConnector("POST", FORGOTPASSWORD_API,data);
        
        console.log("forgot password response", response);
       
        toast.success("Reset Password successfull")
        nevagite("/login")
        toast.dismiss(loadingId)
    }
    catch (error) {
        console.log("for got password  API ERROR....", error);
        toast.error("Error in Reset password")
        toast.dismiss(loadingId)
    }

}

