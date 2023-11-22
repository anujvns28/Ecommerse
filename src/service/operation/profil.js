import { toast } from "react-toastify";
import { profileEndPoints } from "../api";
import { apiConnector } from "../apiconnectur";
import { setUser } from "../../slice/auth";


const {
    GET_PROFILE_DATA,
    UPDATE_PROFILE,
    UPDATE_PROFILE_IMG
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


export const updateProfile = async (data,nevigate,getUserDAta,dispatch) => {
    const toastId = toast.loading("Loading...")
    let result 
    try {
        const response = await apiConnector("POST", UPDATE_PROFILE , data);
        console.log("updating profile resonse data", response);
        result = response.data
        toast.success("Profile updated")
        nevigate("/my-profile/view-profile")
        getUserDAta()
        dispatch(setUser(data))
    }
    catch (error) {
        console.log("updating profile api error....", error);
        toast.error("Error in UPdating")
    }
    toast.dismiss(toastId)
    return result

}


export const updateProfileImg = async (data,nevagite,getUserDAta) => {
    const toastId = toast.loading("Loading...")
    let result 
    try {
        const response = await apiConnector(
            "POST",
             UPDATE_PROFILE_IMG ,
              data,
              {
                "Content-Type": "multipart/form-data",
              }
              );
        console.log("updating profile image resonse data", response);
        result = response.data
        toast.success("Profile image updated")
        nevagite("/my-profile/view-profileImg")
        getUserDAta()
    }
    catch (error) {
        console.log("updating profile img api error....", error);
        toast.error("Error in UPdating")
    }
    toast.dismiss(toastId)
    return result

}