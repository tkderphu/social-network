import api from "../../axios/interceptor"
const path = "/members/group"
class UserMemberGroupService {
    inviteUsers(groupId: any, userIds: []) {
        return api.put(`${path}/${groupId}/invite`, userIds)
    }
    getListMemberByGroup(id: any, page: any, limit: any) {
        return api.get(`${path}/${id}?page=${page}&limit=${limit}`)
    }
}
export default new UserMemberGroupService()