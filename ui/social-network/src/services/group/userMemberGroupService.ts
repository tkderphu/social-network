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
    updatePermissionToUser(groupId: any, memberId: any, role: any) {
        return api.put(`${path}/${groupId}/role`, {
            memberId: memberId,
            groupRole: role
        })
    }

    getListPendingUser(groupId: any, page: any, limit: any) {
        return api.get(`${path}/${groupId}/pending?page=${page}&limit=${limit}`)
    }
    rejectUser(groupId: any, userId: any) {
        return api.put(`${path}/${groupId}/cancel/${userId}`)
    }
    acceptUser(groupId: any, userId: any) {
        return api.put(`${path}/${groupId}/accept/${userId}`)
    }
}
export default new UserMemberGroupService()