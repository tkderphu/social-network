import { ACCEPT_FRIEND_REQUEST_BEGIN, ACCEPT_FRIEND_REQUEST_FAILED, ACCEPT_FRIEND_REQUEST_SUCCESS } from "../constants/friendshipConstant";
import { ACCOUNT_CREATE_BEGIN, ACCOUNT_CREATE_FAIL, 
    ACCOUNT_FORGOT_PASSWORD_BEGIN, ACCOUNT_FORGOT_PASSWORD_FAIL, ACCOUNT_FORGOT_PASSWORD_SUCCESS,ACCOUNT_CREATE_SUCCESS, FETCH_COMMON_PROFILE_BEGIN, FETCH_COMMON_PROFILE_FAILED, FETCH_COMMON_PROFILE_SUCCESS, UPDATE_ADDRESS_BEGIN, UPDATE_ADDRESS_FAIL, UPDATE_ADDRESS_SUCCESS, UPDATE_EDUCATION_BEGIN, UPDATE_EDUCATION_FAIL, UPDATE_EDUCATION_SUCCESS, UPDATE_INFO_BEGIN, UPDATE_INFO_FAIL, UPDATE_INFO_SUCCESS, UPLOAD_PERSONAL_IMAGE_BEGIN, UPLOAD_PERSONAL_IMAGE_FAIL, UPLOAD_PERSONAL_IMAGE_SUCCESS, CHECK_FORGOT_PASSWORD_CODE_BEGIN, CHECK_FORGOT_PASSWORD_CODE_SUCCESS, CHECK_FORGOT_PASSWORD_CODE_FAIL, CREATE_NEW_PASSWORD_BEGIN, CREATE_NEW_PASSWORD_SUCCESS, CREATE_NEW_PASSWORD_FAIL } from "../constants/profileConstant";

export const updateInfoReducer = (state = {}, action: any) => {
    switch(action.type) {
        case UPDATE_INFO_BEGIN: {
            return {
                loading: true
            }
        }
        case UPDATE_INFO_SUCCESS: {
            return {
                loading: false
            }
        }
        case UPDATE_INFO_FAIL: {
            return {
                hasError: true,
                status: action.payload.status,
                message: action.payload.message
            }
        }
        default: return state
    }
}


export const createNewPasswordReducer = (state = {}, action: any) => {
    switch(action.type) {
        case CREATE_NEW_PASSWORD_BEGIN: {
            return {
                loading: true
            }
        }
        case CREATE_NEW_PASSWORD_SUCCESS: {
            return {
                loading: false,
                success: action.payload
            }
        }
        case CREATE_NEW_PASSWORD_FAIL: {
            return {
                loading: false,
                message: action.payload.message,
                hasError: true
            }
        }
        default: return state
    }
}

export const checkForgotPasswordCodeReducer = (state = {}, action: any) => {
    switch(action.type) {
        case CHECK_FORGOT_PASSWORD_CODE_BEGIN: {
            return {
                loading: true
            }
        }
        case CHECK_FORGOT_PASSWORD_CODE_SUCCESS: {
            return {
                loading: false,
                success: action.payload
            }
        }
        case CHECK_FORGOT_PASSWORD_CODE_FAIL: {
            return {
                loading: false,
                message: action.payload.message,
                hasError: true
            }
        }
        default: return state
    }
}
export const forgotPasswordReducer = (state = {}, action: any) => {
    switch(action.type) {
        case ACCOUNT_FORGOT_PASSWORD_BEGIN: {
            return {
                loading: true
            }
        }
        case ACCOUNT_FORGOT_PASSWORD_SUCCESS: {
            return {
                loading: false,
                message: action.payload,
                success: true
            }
        }
        case ACCOUNT_FORGOT_PASSWORD_FAIL: {
            return {
                loading: false,
                message: action.payload.message,
                hasError: true
            }
        }
        default: return state
    }
}
export const createUserReducer = (state = {}, action: any) => {
    switch(action.type) {
        case ACCOUNT_CREATE_BEGIN: {
            return {
                loading: true
            }
        }
        case ACCOUNT_CREATE_SUCCESS: {
            return {
                loading: false,
                success: true
            }
        }
        case ACCOUNT_CREATE_FAIL: {
            return {
                loading: false,
                hasError: true,
                message: action.payload.message
            }
        }
        default: return state;
    }
}
export const updateEducationReducer = (state = {}, action: any) => {
    switch(action.type) {
        case UPDATE_EDUCATION_BEGIN: {
            return {
                loading: true
            }
        }
        case UPDATE_EDUCATION_SUCCESS: {
            return {
                loading: false
            }
        }
        case UPDATE_EDUCATION_FAIL: {
            return {
                hasError: true,
                status: action.payload.status,
                message: action.payload.message
            }
        }
        default: return state
    }
}
export const updateAddressReducer = (state = {}, action: any) => {
    switch(action.type) {
        case UPDATE_ADDRESS_BEGIN: {
            return {
                loading: true
            }
        }
        case UPDATE_ADDRESS_SUCCESS: {
            return {
                loading: false
            }
        }
        case UPDATE_ADDRESS_FAIL: {
            return {
                hasError: true,
                status: action.payload.status,
                message: action.payload.message
            }
        }
        default: return state
    }
}

export const uploadPersonalImageReducer = (state = {}, action: any) => {
    switch(action.type) {
        case UPLOAD_PERSONAL_IMAGE_BEGIN: {
            return {
                loading: true
            }
        }
        case UPLOAD_PERSONAL_IMAGE_SUCCESS: {
            return {
                loading: false
            }
        }
        case UPLOAD_PERSONAL_IMAGE_FAIL: {
            return {
                hasError: true,
                status: action.payload.status,
                message: action.payload.message
            }
        }
        default: return state
    }
}

export const fetchProfileReducer = (state = {}, action: any) => {
    switch(action.type) {
        case FETCH_COMMON_PROFILE_BEGIN: {
            return {
                loading: true
            }
        }
        case FETCH_COMMON_PROFILE_SUCCESS: {
            return {
                loading: false,
                userProfile: action.payload
            }
        }
        case FETCH_COMMON_PROFILE_FAILED: {
            return {
                loading: false,
                hasError: true,
                message: action.payload.message,
                status: action.payload.status
            }
        }
        default: return state
    }
}

export const acceptMakeFriendRequestReducer = (state = {}, action: any) => {
    switch(action.type) {
        case ACCEPT_FRIEND_REQUEST_BEGIN: {
            return {
                loading: true
            }
        }
        case ACCEPT_FRIEND_REQUEST_SUCCESS: {
            return {
                loading: false
            }
        }
        case ACCEPT_FRIEND_REQUEST_FAILED: {
            return {
                loading: false,
                hasError: true,
                message: action.payload.message,
                status: action.payload.status
            }
        }
        default: return state
    }
}