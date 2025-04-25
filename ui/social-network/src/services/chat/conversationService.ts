import api from "../../axios/interceptor"
import { MessageRespVO } from "./messageService"

export interface ConversationCreateReq {
    name?: string,
    type: "PUBLIC" | "PRIVATE",
    userIds: Array<number>
}
export interface ConversationRespVO {
    id: number,
    name?: string,
    imageUrl?: string
    type: string,
    timeAgo: string,
    latestMessage: MessageRespVO
}

const PATH = "/chats/conversations"
class ConversationService {
    createConversation(req: ConversationCreateReq) {
        return api.post(PATH, req)
    }

    getListConversation(type?: "PRIVATE" | "PUBLIC") {
        
    }

    getConversation(userId: number) {
        return api.get(`/with/${userId}`)
    }

    deleteConversation(id: number) {
        return api.delete(`${PATH}/${id}`)
    }

}
export default new ConversationService()