import api from "../../axios/interceptor"
import { ProfileUpdateAddressReqVO, ProfileUpdateEducationReqVO, ProfileUpdateInfoReqVO } from "../../model/profileModel"

export interface UserCreateReq {
    firstName: string,
    lastName: string,
    isMale: boolean,
    email: string
    dateOfBirth: any,
    password: string
}

const PATH = "/profiles"
class ProfileService {
    createUser(userCreateReq: UserCreateReq) {
        return api.post(PATH, userCreateReq)
    }
    updateInfo(info: ProfileUpdateInfoReqVO) {
        return api.put(`${PATH}`, info)
    }
    updateEducation(info: ProfileUpdateEducationReqVO) {
        return api.put(`${PATH}/education`, info)
    }
    updateAddress(info: ProfileUpdateAddressReqVO) {
        return api.put(`${PATH}/address`, info)
    }
    uploadImage(type: "PEROSNAL_IMAGE" | "COVER_PHOTOS",formData: FormData) {
        return api.post(`${PATH}/upload?type=${type}`, formData)
    }
    fetchProfileUser(userId: number) {
        return api.get(`${PATH}/${userId}`)
    }
    
}
export default new ProfileService()