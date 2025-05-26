import api from "../../axios/interceptor"

export interface LikeUpdateReqVO {
    objectId: any
    objectType: "CHAT_MESSAGE" | "POST" | "COMMENT"
}
const path = "/interactions/likes"
class LikeService {
    updateLike(req: LikeUpdateReqVO) {
        return api.put(path, req)
    }
    checkLike()  {
        
    }
}
export default new LikeService()