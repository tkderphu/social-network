import api from "../../axios/interceptor"
import { GroupCreateReq } from "../../model/groupModel"



class GroupService {
    path: string = "/groups"

    createGroup(req: GroupCreateReq) {
        return api.post(this.path, req)
    }

}
export default new GroupService()