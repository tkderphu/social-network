export interface AuthLoginReqVO {
    email: string,
    password: string
}
export interface AuthLoginRespVO {

}
export interface AuthRegisterReqVO {
    email?: string, password?: string, firstName?: string, 
    lastName?: string, dateOfBirth?: any, sex?: "MALE" | "FEMALE"
}
export interface AuthInitPasswordReqVO {

}