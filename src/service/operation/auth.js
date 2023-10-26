import { toast } from "react-toastify";
import { authEndPoints } from "../api";
import { apiConnector } from "../apiconnectur";

const {
    GET_OTP,
    SIGN_UP_API
} = authEndPoints


export const getOtp = async (email) => {
    try {
        const response = await apiConnector("POST", GET_OTP,{email:email});
        console.log("otp response", response);
    }
    catch (error) {
        console.log("OTP RESPONSE  API ERROR....", error);
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