import { ac } from "react-router/dist/development/route-data-BmvbmBej";
import { UPDATE_ADDRESS_BEGIN, UPDATE_ADDRESS_FAIL, UPDATE_ADDRESS_SUCCESS, UPDATE_EDUCATION_BEGIN, UPDATE_EDUCATION_FAIL, UPDATE_EDUCATION_SUCCESS, UPDATE_INFO_BEGIN, UPDATE_INFO_FAIL, UPDATE_INFO_SUCCESS, UPLOAD_PERSONAL_IMAGE_BEGIN, UPLOAD_PERSONAL_IMAGE_FAIL, UPLOAD_PERSONAL_IMAGE_SUCCESS } from "../constants/profileConstant";

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