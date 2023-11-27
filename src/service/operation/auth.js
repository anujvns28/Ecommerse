import { toast } from "react-toastify";
import { authEndPoints } from "../api";
import { apiConnector } from "../apiconnectur";
import { setToken, setUser } from "../../slice/auth";

const {
    GET_OTP,
    SIGN_UP_API,
    LOGIN_API
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

export const loginUser = async (data,dispatch) => {
    
    try {
        const response = await apiConnector("POST", LOGIN_API,data);
        console.log("login response", response);
        toast.success("Login Successfully")

         localStorage.setItem("token",JSON.stringify(response.data.token));
         localStorage.setItem("user",JSON.stringify(response.data.user));
         dispatch(setToken(response.data.token));
         dispatch(setUser(response.data.user));
    }
    catch (error) {
        console.log("Login RESPONSE  API ERROR....", error);
        toast.error("Login Faild")
    }

}

