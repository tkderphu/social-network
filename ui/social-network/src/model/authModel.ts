export interface AuthLoginReqVO {
    email: string,
    password: string
}
export interface AuthLoginRespVO {
    userId?:number
    accessToken?: string 
    refreshToken?: string 
    expires: number
}
export interface AuthRegisterReqVO {
    email?: string, password?: string, firstName?: string, 
    lastName?: string, dob?: any, sex?: "MALE" | "FEMALE"
}
export interface AuthInitPasswordReqVO {

}