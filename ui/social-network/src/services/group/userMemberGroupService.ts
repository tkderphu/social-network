import api from "../../axios/interceptor"
const path = "/members/group"
class UserMemberGroupService {
    inviteUsers(groupId: any, userIds: []) {
        return api.put(`${path}/${groupId}/invite`, userIds)
    }
    getListMemberByGroup(id: any, page: any, limit: any) {
        return api.get(`${path}/${id}?page=${page}&limit=${limit}`)
    }
    checkJoinedGroup(groupId: any) {
        return api.get(`${path}/${groupId}/include`)
    }
    leaveGroup(groupId: any) {
        return api.delete(`${path}/${groupId}/leave`)
    }
    requestJoinGroup(groupId: any) {
        return api.post(`${path}/${groupId}/join`)
    }
}
export default new UserMemberGroupService()