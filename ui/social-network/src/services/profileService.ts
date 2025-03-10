import api from "../axios/interceptor"
import { ProfileUpdateAddressReqVO, ProfileUpdateEducationReqVO, ProfileUpdateInfoReqVO } from "../model/profileModel"

class ProfileService {
    updateInfo(info: ProfileUpdateInfoReqVO) {
        return api.put('/profile', info)
    }
    updateEducation(info: ProfileUpdateEducationReqVO) {
        return api.put('/profile/education', info)
    }
    updateAddress(info: ProfileUpdateAddressReqVO) {
        return api.put('/profile/address', info)
    }
    uploadImage(type: "PEROSNAL_IMAGE" | "COVER_PHOTOS",formData: FormData) {
        return api.post(`/profile/upload?type=${type}`, formData)
    }
    
}
export default new ProfileService()