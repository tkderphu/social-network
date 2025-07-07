
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
    avatar: string,
    id: any,
    firstName: string,
    lastName: string,
    phoneNumber: string
    gender: string
    bio: string
    dob: string
    joined: string
    schools: Record<string, string>
    aaddresses: Record<string, string>
    policies: Record<string, string>,
    coverPhoto: string
    isOnline: boolean
}
export interface ProfileSimpleResp {
    id: number
    firstName: string,
    lastName: string
    imageUrl?: string,
    isOnline?: boolean,
    recentVisit?: string
    avatar?: string
    fullName?: string
}