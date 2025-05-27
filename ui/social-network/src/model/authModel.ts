export interface AuthLoginReqVO {
    email: string,
    password: string
}
export interface AuthLoginRespVO {
    userId:any
    accessToken?: string 
    refreshToken?: string 
    expires: number
}

export interface AuthInitPasswordReqVO {

}