import { l } from "react-router/dist/development/fog-of-war-Cm1iXIp7"
import api from "../../axios/interceptor"



const path = "/groups"

class GroupService {

    createGroup(req: any) {
        return api.post(path, req)
    }

    getListGroupByOwner() {
        return api.get(`${path}/owner`)
    }

    getDetailGroup(id: any)  {
        return api.get(`${path}/detail/${id}`)
    }
    getListJoined() {
        return api.get(`${path}/joined`)
    }
    search(keyword: string, page: number, limit: number) {
        return api.get(`${path}/search?keyword=${keyword}&page=${page}&limit=${limit}`)
    }
    updateGroupSetting(groupId: any, req: any) {
        return api.put(`${path}/${groupId}/setting`, req)
    }

    suggestGroupToBanUser(userId: any, type: number) {
        return api.get(`${path}/suggest/ban/${userId}?type=${type}`)
    }

}
export default new GroupService()