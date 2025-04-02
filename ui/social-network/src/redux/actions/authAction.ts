import { CommonResult, TokenUtils } from "../../common"
import { ACCOUNT_CREATE_BEGIN, ACCOUNT_CREATE_FAIL, ACCOUNT_CREATE_SUCCESS, ACCOUNT_FORGOT_PASSWORD_BEGIN, ACCOUNT_FORGOT_PASSWORD_FAIL, ACCOUNT_FORGOT_PASSWORD_SUCCESS, ACCOUNT_INIT_PASSWORD_BEGIN, ACCOUNT_INIT_PASSWORD_FAIL, ACCOUNT_INIT_PASSWORD_SUCCESS, ACCOUNT_LOGIN_BEGIN, ACCOUNT_LOGIN_FAIL, ACCOUNT_LOGIN_SUCCESS, REDIRECT } from "../constants/authenConstant"
import authenService from "../../services/auth/authenService"
import { AuthInitPasswordReqVO, AuthLoginReqVO, AuthRegisterReqVO } from "../../model/authModel"


export const loginAction = (authLoginReq: AuthLoginReqVO) => {
    return (dispatch: any) => {
        dispatch({
            type: ACCOUNT_LOGIN_BEGIN
        })
        authenService.login(authLoginReq).then(response => {
            const data: CommonResult<any> = response.data
            if(data.code == 200) {
                TokenUtils.storeToken(data.data)
                dispatch({
                    type: ACCOUNT_LOGIN_SUCCESS
                })
                dispatch({
                    type: REDIRECT,
                    path: "/"
                })
            } else {
                console.log("err: ", data)
                dispatch({
                    type: ACCOUNT_LOGIN_FAIL,
                    payload: {
                        message: data.message,
                        status: data.code
                    }
                })
            }
        }).catch(err => {
            console.log("err: ", err)
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

export const registerAction = (authRegisterReq: AuthRegisterReqVO) => {
    return (dispatch: any) => {
        dispatch({
            type: ACCOUNT_CREATE_BEGIN
        })
        authenService.register(authRegisterReq).then(response => {
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

export const initPasswordAction = (authInitPassword: AuthInitPasswordReqVO) => {
    return (dispatch: any) => {
        dispatch({
            type: ACCOUNT_INIT_PASSWORD_BEGIN
        })
        authenService.initPassword(authInitPassword).then(response => {
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

export const forgotPasswordAction = (email: string) => {
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