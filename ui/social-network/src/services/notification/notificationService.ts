import api from "../../axios/interceptor"
import { processJsonResponseFromServer } from "../../utils/utils"
import authenService from "../auth/authenService"

const PATH = "/notifications"
class NotificationService {
    countUnreadMessage(set: any) {
        processJsonResponseFromServer(
            api.get(`${PATH}/count/unread`),
            "countUnreadMessage",
            set
        )
    }
    
    getListNotification(page: number, limit: number, set: any) {
        processJsonResponseFromServer(
            api.get(`${PATH}?page=${page}&limit=${limit}`),
            "getListNotification",
            set
        )
    }
   
}
export default new NotificationService()




