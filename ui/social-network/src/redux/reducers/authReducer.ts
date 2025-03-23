import { ACCOUNT_LOGIN_BEGIN, ACCOUNT_LOGIN_SUCCESS, REDIRECT, 
    ACCOUNT_CREATE_BEGIN, ACCOUNT_CREATE_SUCCESS, ACCOUNT_CREATE_FAIL ,
    ACCOUNT_FORGOT_PASSWORD_BEGIN, ACCOUNT_FORGOT_PASSWORD_FAIL, ACCOUNT_FORGOT_PASSWORD_SUCCESS, ACCOUNT_LOGIN_FAIL
} from "../constants/authenConstant";


export const loginReducer = (state = {}, action: any) => {
    switch(action.type) {
        case ACCOUNT_LOGIN_BEGIN: {
            return {
                loading: true,
                hasError: false
            }
        }
        case ACCOUNT_LOGIN_SUCCESS: {
            return {
                loading: false
            }
        }
        case ACCOUNT_LOGIN_FAIL: {
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
export const registerReducer = (state = {}, action: any) => {
    switch(action.type) {
        case ACCOUNT_CREATE_BEGIN: {
            return {
                loading: true
            }
        }
        case ACCOUNT_CREATE_SUCCESS: {
            return {
                loading: false
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
                message: action.payload.message
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
export const redirectReducer = (state = {}, action: any) => {
    switch(action.type) {
        case REDIRECT: {
            window.location.href = action.path
            return state
        }
        default: return state;
    }
}