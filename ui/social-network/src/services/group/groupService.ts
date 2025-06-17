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

}
export default new GroupService()