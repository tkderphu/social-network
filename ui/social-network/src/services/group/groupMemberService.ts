import api from "../../axios/interceptor"
const path = "/groups/members"
class GroupMemberService {
    inviteUsers(groupId: any, userIds: []) {
        return api.put(`${path}/${groupId}/invite`, userIds)
    }
}
export default new GroupMemberService()