import api from "../../axios/interceptor"
import { processJsonResponseFromServer } from "../../utils/utils"
import authenService from "../auth/authenService"

class NotificationSettingService {

    updatePush(req: any,set: any) {
        processJsonResponseFromServer(
            api.put(`/notification-settings/push`, req),
            "getNotificationSetting",
            set,
            0
        )
    }
    
    getNotificationSetting(set: any) {
        processJsonResponseFromServer(
            api.get(`/notification-settings`),
            "getNotificationSetting",
            set
        )
    }
}
export default new NotificationSettingService()