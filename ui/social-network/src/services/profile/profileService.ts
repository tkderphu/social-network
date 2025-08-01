import api from "../../axios/interceptor"
import { ProfileUpdateAddressReqVO, ProfileUpdateEducationReqVO, ProfileUpdateInfoReqVO, UserUpdateInfoReqVO } from "../../model/profileModel"
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
    updateInfo(info: any, set: any) {
        processJsonResponseFromServer(
            api.put(`${PATH}/info`, info),
           "updateInfo",
            set,
            0
        )
    }
    updateEducation(info: Record<string, string>, set: any) {
        processJsonResponseFromServer(
            api.put(`${PATH}/education`, info),
            "updateEducation",
            set,
            0
        )
    }
    updatePolicy(info: any, set: any) {
        processJsonResponseFromServer(
            api.put(`${PATH}/policy`, info),
            "updatePolicy",
            set,
            0
        )
    }
    updateAddresses(info: any, set: any) {
        processJsonResponseFromServer(
            api.put(`${PATH}/address`, info),
            "updateAddresses",
            set,
            0
        )
    }
    uploadImage(type: "PEROSNAL_IMAGE" | "COVER_PHOTOS",formData: FormData) {
        return api.post(`${PATH}/upload?type=${type}`, formData)
    }
    getUserDetailByUserId(userId: any, set: any) {
        processJsonResponseFromServer(
            api.get(`${PATH}/${userId}`),
            "getUserDetailByUserId",
            set
        )
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