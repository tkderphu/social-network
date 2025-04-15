import api from "../../axios/interceptor"
import authenService from "../auth/authenService"

const PATH = "/notifications"
class NotificationService {
    countUnreadMessage() {
        return api.get(`${PATH}`)
    }
    fetchNotifyMessages() {
        return api.get(`${PATH}`)
    }
    updateNotifyFriendEnable(enable: boolean) {
        return api.put(`${PATH}/setting/friend/${enable}`)
    }
    updateNotifyChatEnable(enable: boolean) {
        return api.put(`${PATH}/setting/chat/${enable}`)

    }
    updateNotifyReactionEnable(enable: boolean) {
        return api.put(`${PATH}/setting/reaction/${enable}`)

    }
    updateNotifyCommentEnable(enable: boolean) {
        return api.put(`${PATH}/setting/comment/${enable}`)

    }
    getNotifySetting() {
        return api.get(`${PATH}/setting`)
    }
}
export default new NotificationService()