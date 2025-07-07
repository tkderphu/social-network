import api from "../../axios/interceptor"

const path = "/chats/members"
class MemberConversationService {
    getMemberConversationDetail(conversationId: any) {
        return api.get(`${path}/conversation/${conversationId}/detail`)
    }

    getListMemberConversation(conversationId: any) {
        return api.get(`${path}/conversation/${conversationId}`)
    }
    updateNotify(req: any) {
        return api.put(`${path}/conversation/notify`, req)
    }
}

export default new MemberConversationService()