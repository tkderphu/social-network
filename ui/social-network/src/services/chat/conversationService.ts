import { T } from "react-router/dist/development/fog-of-war-Cm1iXIp7"
import api from "../../axios/interceptor"
import { processJsonResponseFromServer } from "../../utils/utils"
import { MessageRespVO } from "./messageService"

export interface ConversationCreateReq {
    name?: string,
    type: "PUBLIC" | "PRIVATE",
    userIds: Array<number>
    thumbnail?: string
}
export interface ConversationRespVO {
    id: number,
    nickname?: string,
    thumbnail?: string
    conversationType: "PRIVATE" | "PUBLIC",
    latestMessage: MessageRespVO,
    online?: boolean
}

const PATH = "/chats/conversations"
class ConversationService {
    createConversation(req: ConversationCreateReq) {
        return api.post(PATH, req)
    }

    getListConversation(set: any) {
        processJsonResponseFromServer(
            api.get(PATH),
            "getListConversation",
            set
        )
    }

    getConversation(conversationId: any) {
        return api.get(`${PATH}/${conversationId}`)
    }

    deleteConversation(id: number) {
        return api.delete(`${PATH}/${id}`)
    }
    getPrivateConversation(userId: any) {
        return api.get(`${PATH}/check/${userId}`)
    }

}
export default new ConversationService()