import api from "../../axios/interceptor"

const PATH = "/chats/messages"
export interface MessageCreateReqVO {
    conversationId?: any
    message?: string
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
    conversationId: any
    message: string
    images?: string[],
    files?: string[],
    timeAgo: string
}

class MessageService {
    createMessage(req: MessageCreateReqVO) {
        return api.post(PATH, req)
    }

    getListMessage(conversationId: string, searchParams: string) {
        return api.get(`${PATH}/conversation/${conversationId}?${searchParams}`)

    }
}
export default new MessageService()