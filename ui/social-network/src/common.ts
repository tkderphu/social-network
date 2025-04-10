import { AuthLoginRespVO } from "./model/authModel"

export interface CommonResult<T> {
    code: number
    message: string
    data: T
}

export interface PageResult<T> {
    page: number
    limit: number
    data: Array<T>
}

export const setState = (event: any, fn: any) => {
    const {name, value} = event.target
    fn((prev: any) => ({
        ...prev,
        [name]: value
    }))
}

export const TokenUtils = {
    storeToken: (data: AuthLoginRespVO) => {
        localStorage.setItem("jwt", JSON.stringify(data))
    },
    authLogin: JSON.parse(localStorage.getItem('jwt') || "{}") as AuthLoginRespVO,
    tokenIsExpired: ((localStorage.getItem('jwt') || {}) as AuthLoginRespVO).expires < new Date().getMilliseconds()
}

export const defaultAvatar = "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-875.jpg?semt=ais_hybrid"