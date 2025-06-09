import api from "../../axios/interceptor"
const path = "/interactions"
export interface VoteUpdateReq {
    objectId: number,
    objectType: "POST" | "COMMENT",
    voteType: "DOWN" | "UP"
}
class VoteService {
    updateVote(req: any) {
        return api.put(`${path}/votes`, req)
    }

    checkVote(objectId: any, objectType: "POST" | "COMMENT") {
        return api.get(`${path}/votes/check/${objectType}/${objectId}`)

    }
    count(objId: any, objType: "POST" | "COMMENT") {
        return api.get(`${path}/votes/scores/${objType}/${objId}`)
    }
}
export default new VoteService()