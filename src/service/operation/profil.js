import { toast } from "react-toastify";
import { profileEndPoints } from "../api";
import { apiConnector } from "../apiconnectur";

const {
    GET_PROFILE_DATA
    } = profileEndPoints

export const FetchUserData = async (data) => {
    const toastId = toast.loading("Loading...")
    let result 
    try {
        const response = await apiConnector("POST", GET_PROFILE_DATA ,{userId:data});
        console.log("geting profile data", response);
        result = response.data
    }
    catch (error) {
        console.log("PROFil fatchin api error....", error);
    }
    toast.dismiss(toastId)
    return result

}