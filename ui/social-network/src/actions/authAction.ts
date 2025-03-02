import { CommonResult } from "../common"
import { ACCOUNT_CREATE_BEGIN, ACCOUNT_CREATE_FAIL, ACCOUNT_CREATE_SUCCESS, ACCOUNT_FORGOT_PASSWORD_BEGIN, ACCOUNT_FORGOT_PASSWORD_FAIL, ACCOUNT_FORGOT_PASSWORD_SUCCESS, ACCOUNT_INIT_PASSWORD_BEGIN, ACCOUNT_INIT_PASSWORD_FAIL, ACCOUNT_INIT_PASSWORD_SUCCESS, ACCOUNT_LOGIN_BEGIN, ACCOUNT_LOGIN_FAIL, ACCOUNT_LOGIN_SUCCESS, REDIRECT } from "../constants/authenConstant"
import authenService from "../services/authenService"


export const login = ({email, password}: any) => {
    return (dispatch: any) => {
        dispatch({
            type: ACCOUNT_LOGIN_BEGIN
        })
        authenService.login(email, password).then(response => {
            const data: CommonResult<any> = response.data
            if(data.code == 200) {
                dispatch({
                    type: ACCOUNT_LOGIN_SUCCESS
                })
                dispatch({
                    type: REDIRECT,
                    path: "/"
                })
            } else {
                dispatch({
                    type: ACCOUNT_LOGIN_FAIL,
                    payload: {
                        message: data.message,
                        status: data.code
                    }
                })
            }
        }).catch(err => {
            dispatch({
                type: ACCOUNT_LOGIN_FAIL,
                payload: {
                    message: err.message,
                    status: err.status
                }
            })
        })
    }
}

export const register = ({email, password, firstName, lastName, dateOfBirth, sex}: any) => {
    return (dispatch: any) => {
        dispatch({
            type: ACCOUNT_CREATE_BEGIN
        })
        authenService.register(email, password, firstName, lastName, dateOfBirth, sex).then(response => {
            const data: CommonResult<any> = response.data;
            if(data.code === 200) {
                dispatch({
                    type: ACCOUNT_CREATE_SUCCESS
                })
                dispatch({
                    type: REDIRECT,
                    path: "/login"
                })
            } else {
                dispatch({
                    type: ACCOUNT_CREATE_BEGIN,
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

export const initPassword = ({code, newPassword}: any) => {
    return (dispatch: any) => {
        dispatch({
            type: ACCOUNT_INIT_PASSWORD_BEGIN
        })
        authenService.initPassword(code, newPassword).then(response => {
            const data: CommonResult<any>  = response.data
            if(data.code === 200) {
                dispatch({
                    type: ACCOUNT_INIT_PASSWORD_SUCCESS
                })
                dispatch({
                    type: REDIRECT,
                    path: "/login"
                })
            } else {
                dispatch({
                    type:ACCOUNT_INIT_PASSWORD_FAIL,
                    payload: {
                        message: data.message,
                        status: data.code
                    }
                })
            }
        }).catch(err => {
            dispatch({
                type:ACCOUNT_INIT_PASSWORD_FAIL,
                payload: {
                    message: err.message,
                    status: err.status
                }
            })
        })
    }
}

export const forgotPassword = (email: string) => {
    return (dispatch: any) => {
        dispatch({
            type: ACCOUNT_FORGOT_PASSWORD_BEGIN
        })
        authenService.forgotPassword(email).then(response => {
            const data: CommonResult<any>  = response.data
            if(data.code === 200) {
                dispatch({
                    type: ACCOUNT_FORGOT_PASSWORD_SUCCESS
                })
            } else {
                dispatch({
                    type:ACCOUNT_FORGOT_PASSWORD_FAIL,
                    payload: {
                        message: data.message,
                        status: data.code
                    }
                })
            }
        }).catch(err => {
            dispatch({
                type:ACCOUNT_FORGOT_PASSWORD_FAIL,
                payload: {
                    message: err.message,
                    status: err.status
                }
            })
        })
    }
}