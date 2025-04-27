import { T } from "react-router/dist/development/fog-of-war-Cm1iXIp7"
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
        if(type) {

        }
        return api.get(PATH)
    }

    getConversation(userId: number) {
        return api.get(`${PATH}/with/user/${userId}`)
    }

    deleteConversation(id: number) {
        return api.delete(`${PATH}/${id}`)
    }

}
export default new ConversationService()