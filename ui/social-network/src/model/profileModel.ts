
export interface ProfileUpdateInfoReqVO {
    firstName?: string, lastName?: string, sex?: "MALE" | "FEMALE", phoneNumber?: string, dateOfBirth?: any
}
export interface ProfileUpdateAddressReqVO {
    addressEnum: "", pageId: number
}
export interface ProfileUpdateEducationReqVO {
    educationEnum: "", pageId: number
}

export interface UserProfile {

}