import api from "../../axios/interceptor"

const PATH = "/chats/messages"
export interface MessageCreateReqVO {
    conversationId?: number,
    toUserId?: number
    message: string
    images?: string[],
    files?: string[]
}

export interface MessageRespVO {
    id: number
    sender: {
        id: string,
        firstName: string,
        lastName: string,
        imageUrl?: string
    }
    message: string
    images?: string[],
    files?: string[],
    timeAgo: string
}

class MessageService {
    createMessage(req: MessageCreateReqVO) {
        return api.post(PATH, req)
    }

    getListMessage(conversationId: number, messageId?: number) {
        if (messageId) {
            return api.get(`${PATH}/conversation/${conversationId}?before=${messageId}`)
        }
        return api.get(`${PATH}/conversation/${conversationId}`)
    }
}
export default new MessageService()