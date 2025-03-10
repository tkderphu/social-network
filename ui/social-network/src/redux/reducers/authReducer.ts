import { ACCOUNT_LOGIN_BEGIN, ACCOUNT_LOGIN_SUCCESS, REDIRECT } from "../constants/authenConstant";


export const loginReducer = (state = {}, action: any) => {
    switch(action.type) {
        case ACCOUNT_LOGIN_BEGIN: {
            return {
                loading: true
            }
        }
        case ACCOUNT_LOGIN_SUCCESS: {
            return {
                loading: false
            }
        }
        case ACCOUNT_LOGIN_BEGIN: {
            return {
                loading: false,
                hasError: true,
                error: action.payload.message,
                status: action.payload.status
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