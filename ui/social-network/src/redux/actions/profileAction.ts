import { useNavigate } from "react-router"
import { CommonResult, TokenUtils } from "../../common"
import { ProfileUpdateAddressReqVO, ProfileUpdateEducationReqVO, ProfileUpdateInfoReqVO, UserProfileResp } from "../../model/profileModel"
import profileService, { UserCreateReq } from "../../services/profile/profileService"
import { ACCOUNT_CREATE_BEGIN, ACCOUNT_CREATE_FAIL, ACCOUNT_CREATE_SUCCESS, FETCH_BASIC_INFO_USER_BEGIN, FETCH_COMMON_PROFILE_BEGIN, FETCH_COMMON_PROFILE_FAILED, FETCH_COMMON_PROFILE_SUCCESS, FETCH_INFO_USER_ADDRESS_BEGIN, FETCH_INFO_USER_EDUCATION_BEGIN, UPDATE_ADDRESS_BEGIN, UPDATE_ADDRESS_FAIL, UPDATE_EDUCATION_BEGIN, UPDATE_EDUCATION_FAIL, UPDATE_INFO_BEGIN, UPDATE_INFO_FAIL, UPDATE_INFO_SUCCESS, UPDATE_PERSONAL_GALLERY_IMAGES_BEGIN, UPLOAD_PERSONAL_IMAGE_BEGIN, UPLOAD_PERSONAL_IMAGE_FAIL } from "../constants/profileConstant"

export const updateInfoProfile = (userId: number, updateInfoReq: ProfileUpdateInfoReqVO) => {
    return (dispatch: any) => {
        dispatch({
            type: UPDATE_INFO_BEGIN
        })
        profileService.updateInfo(updateInfoReq).then(response => {
            const data: CommonResult<any> = response.data;
            console.log(updateInfoReq, data)
            if(data.code === 200) {
                dispatch({
                    type: UPDATE_INFO_SUCCESS
                })
                location.reload()
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
            console.log("err: ", err)
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


export const updatePersonalGalleryImagesAction = (imageUrl: string) => {
    return (dispatch: any) => {
        dispatch({
            type: UPDATE_PERSONAL_GALLERY_IMAGES_BEGIN
        })
        //call api
    }
}
export const fetchPersonalGalleryImagesAction = () => {

}
export const fetchBasicInfoUserAction = () => {
    return (dispatch: any) => {
        dispatch({
            type: FETCH_BASIC_INFO_USER_BEGIN
        })
        //call api
    }
}
export const fetchInfoAddressAction = () => {
    return (dispatch: any) => {
        dispatch({
            type: FETCH_INFO_USER_ADDRESS_BEGIN
        })
        //call api
    }
}
export const fetchInfoEducationAction = () => {
    return (dispatch: any) => {
        dispatch({
            type: FETCH_INFO_USER_EDUCATION_BEGIN
        })
        //call api
    }
}



export const createUserAction = (userCreateReq: UserCreateReq) => {
    return (dispatch: any) => {
        dispatch({
            type: ACCOUNT_CREATE_BEGIN
        })
        profileService.createUser(userCreateReq).then(response => {
            const data: CommonResult<any> = response.data;
            if(data.code === 200) {
                dispatch({
                    type: ACCOUNT_CREATE_SUCCESS
                })
            } else {
                dispatch({
                    type: ACCOUNT_CREATE_FAIL,
                    payload: {
                        message: data.message,
                        status: data.code
                    }
                })
            }
        }).catch(err => {
            dispatch({
                type: ACCOUNT_CREATE_FAIL,
                payload: {
                    message: err.message,
                    status: err.status
                }
            })
        })
    }
}