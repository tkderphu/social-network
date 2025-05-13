import { ac } from "react-router/dist/development/route-data-BmvbmBej";
import { ACCOUNT_LOGIN_BEGIN, ACCOUNT_LOGIN_SUCCESS, REDIRECT, ACCOUNT_LOGIN_FAIL, LOGOUT_BEGIN, LOGOUT_SUCCESS
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


export const logoutReducer = (state = {}, action: any) => {
    switch(action.type) {
        case LOGOUT_BEGIN: {
            return {
                loading: true
            }
        }
        case LOGOUT_SUCCESS: {
            return {
                loading: false,
                success: action.payload
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