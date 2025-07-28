import api from "../../axios/interceptor"
import { ProfileUpdateAddressReqVO, ProfileUpdateEducationReqVO, ProfileUpdateInfoReqVO } from "../../model/profileModel"
import { processJsonResponseFromServer } from "../../utils/utils"

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
    fetchProfileUser(userId: any) {
        return api.get(`${PATH}/${userId}`)
    }
    forgotPassword(email: string) {
        return api.get(`${PATH}/forgot-password?email=${email}`)
    }

    updateNewPassword(req: UserUpdateNewPassword) {
        return api.put(`${PATH}/init-password`, req)
    }
    checkforgotPasswordCode(code: string) {
        return api.get(`${PATH}/forgot-password/code/${code}`)
    }
    search(keyword: string) {
        return api.get(`${PATH}/search?name=${keyword}`)
    }


    updateBlockUser(req: {toUserId: any, blockType: any}) {
        return api.post(`${PATH}/block`, req)
    }


    getListBlockedUser() {
        return api.get(`${PATH}/block`)
    }

    getStatusBlocked(userId: any) {
        return api.get(`${PATH}/block/check/${userId}`)
    }
  
    searchUserCanInteract(keyword: any, set: any) {
        processJsonResponseFromServer(
            api.get(`${PATH}/search/interaction?keyword=${keyword}`),
            "searchUserCanInteract",
            set
        )
    }

}
export interface UserUpdateNewPassword {
    newPassword: string,
    codeForgotPassword: string
}
export default new ProfileService()