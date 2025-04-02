import { CommonResult } from "../../common"
import { ProfileUpdateAddressReqVO, ProfileUpdateEducationReqVO, ProfileUpdateInfoReqVO, UserProfileResp } from "../../model/profileModel"
import profileService from "../../services/profile/profileService"
import { FETCH_COMMON_PROFILE_BEGIN, FETCH_COMMON_PROFILE_FAILED, FETCH_COMMON_PROFILE_SUCCESS, UPDATE_ADDRESS_BEGIN, UPDATE_ADDRESS_FAIL, UPDATE_EDUCATION_BEGIN, UPDATE_EDUCATION_FAIL, UPDATE_INFO_BEGIN, UPDATE_INFO_FAIL, UPLOAD_PERSONAL_IMAGE_BEGIN, UPLOAD_PERSONAL_IMAGE_FAIL } from "../constants/profileConstant"

export const updateInfoProfile = (updateInfoReq: ProfileUpdateInfoReqVO) => {
    return (dispatch: any) => {
        dispatch({
            type: UPDATE_INFO_BEGIN
        })
        profileService.updateInfo(updateInfoReq).then(response => {
            const data: CommonResult<any> = response.data;
            if(data.code === 200) {
                //fetch info
            } else {
                dispatch({
                    type: UPDATE_INFO_FAIL,
                    payload: {
                        message: data.message,
                        status: data.code
                    }
                })
            }
        }).catch(err => {
            if(err.status === 401) {
                localStorage.clear()
                alert("Your token is expired, please login again");
                location.href = '/login'
            }
            dispatch({
                type: UPDATE_INFO_FAIL,
                payload: {
                    message: err.message,
                    status: err.code
                }
            })
        })
    }
}
export const updateEducation = (updateEduactionReq:ProfileUpdateEducationReqVO) => {
    return (dispatch: any) => {
        dispatch({
            type: UPDATE_EDUCATION_BEGIN
        })
        profileService.updateEducation(updateEduactionReq).then(response => {
            const data: CommonResult<any> = response.data
            if(data.code === 200) {
                //fetch data education
                dispatch({

                })
            } else {
                dispatch({
                    type: UPDATE_EDUCATION_BEGIN,
                    payload: {
                        message: data.message,
                        status: data.code
                    }
                }) 
            }
        }).catch(err => {
            if(err.status === 401) {
                localStorage.clear()
                alert("Your token is expired, please login again");
                location.href = '/login'
            }
            dispatch({
                type: UPDATE_EDUCATION_FAIL,
                payload: {
                    message: err.message,
                    status: err.code
                }
            })
        })
    }
}
export const updateAddress = (updateAddressReq: ProfileUpdateAddressReqVO) => {
    return (dispatch: any) => {
        dispatch({
            type: UPDATE_ADDRESS_BEGIN
        })
        profileService.updateAddress(updateAddressReq).then(response => {
            const data: CommonResult<any> = response.data
            if(data.code === 200) {
                //fetch data education
                dispatch({

                })
            } else {
                dispatch({
                    type: UPDATE_ADDRESS_FAIL,
                    payload: {
                        message: data.message,
                        status: data.code
                    }
                }) 
            }
        }).catch(err => {
            if(err.status === 401) {
                localStorage.clear()
                alert("Your token is expired, please login again");
                location.href = '/login'
            }
            dispatch({
                type: UPDATE_ADDRESS_FAIL,
                payload: {
                    message: err.message,
                    status: err.code
                }
            })
        })
    }
}
export const updatePersonalImage = (type: "PEROSNAL_IMAGE" | "COVER_PHOTOS", formData: FormData) => {
    return (dispatch: any) => {
        dispatch(UPLOAD_PERSONAL_IMAGE_BEGIN);
        profileService.uploadImage(type, formData).then(response => {
            const data: CommonResult<any> = response.data
            if(data.code === 200) {
                //fetch data education
                dispatch({

                })
            } else {
                dispatch({
                    type: UPLOAD_PERSONAL_IMAGE_FAIL,
                    payload: {
                        message: data.message,
                        status: data.code
                    }
                }) 
            }
        }).catch(err => {
            if(err.status === 401) {
                localStorage.clear()
                alert("Your token is expired, please login again");
                location.href = '/login'
            }
            dispatch({
                type: UPLOAD_PERSONAL_IMAGE_FAIL,
                payload: {
                    message: err.message,
                    status: err.code
                }
            })
        })
    }
}


export const fetchProfileAction = (userId: number) => {
    return (dispatch: any) => {
        dispatch({
            type: FETCH_COMMON_PROFILE_BEGIN
        })
        profileService.fetchProfileUser(userId).then(response => {
            const data: CommonResult<any> = response.data
            if(data.code === 200) {
                console.log("data: ", data)
                dispatch({
                    type: FETCH_COMMON_PROFILE_SUCCESS,
                    payload: data.data
                })
            } else {    
                dispatch({
                    type: FETCH_COMMON_PROFILE_FAILED,
                    payload: {
                        message: data.message,
                        status: data.code
                    }
                })
            }
        }).catch(err => {
            if(err.status === 401) {
                localStorage.clear()
                alert("Your token is expired, please login again");
                location.href = '/login'
            }
            dispatch({
                type: FETCH_COMMON_PROFILE_FAILED,
                payload: {
                    message: err.message,
                    status: err.code
                }
            })
        })
    }
}