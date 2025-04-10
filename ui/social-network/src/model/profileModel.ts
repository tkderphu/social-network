
export interface ProfileUpdateInfoReqVO {
    firstName?: string, lastName?: string, sex?: "MALE" | "FEMALE", phoneNumber?: string, dateOfBirth?: any
}
export interface ProfileUpdateAddressReqVO {
    addressEnum: "", pageId: number
}
export interface ProfileUpdateEducationReqVO {
    educationEnum: "", pageId: number
}
export interface UserBasicInfoResp {
    userId?: string
    firstName?: string
    lastName?: string
    phoneNumber?: string
    sexEnum?: string,
    dateOfBirth?: any
}
export interface UserPersonalGalleryImageResp {
    userId?: string
    images?: Array<string>
}
export interface UserEducationResp {
    userId?: string
    educations?: Array<{
        educationEnum: any,
        pageId?: number
        pageName?: string
    }>
}
export interface UserAddressResp {
    userId?: string
    addresses?: Array<{
        addressEnum: any,
        pageId?: string
        pageName?: string
    }>
}
export interface UserProfileResp {
    userId?: string
    firstName?: string
    lastName?: string
    phoneNumber?: string
    sexEnum?: string,
    dateOfBirth?: any
    createdDate?: any
    educations?: Array<{
        educationEnum: any,
        pageId?: number
        pageName?: string
    }>
    addresses?: Array<{
        addressEnum: any,
        pageId?: string
        pageName?: string
    }>
}
export interface ProfileSimpleResp {
    firstName: string,
    lastName: string
    imageUrl?: string
}