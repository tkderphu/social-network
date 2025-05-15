import { T } from "react-router/dist/development/fog-of-war-Cm1iXIp7"
import api from "../../axios/interceptor"
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
    type: string,
    latestMessage: MessageRespVO,
    online?: boolean
}

const PATH = "/chats/conversations"
class ConversationService {
    createConversation(req: ConversationCreateReq) {
        return api.post(PATH, req)
    }

    getListConversation() {
        return api.get(PATH)
    }

    getConversation(conversationId: any) {
        return api.get(`${PATH}/${conversationId}`)
    }

    deleteConversation(id: number) {
        return api.delete(`${PATH}/${id}`)
    }

}
export default new ConversationService()