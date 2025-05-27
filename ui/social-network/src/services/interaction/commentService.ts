import api from "../../axios/interceptor"

export interface CommentReq {
    id?: any
    content: string
    mediaUrls?: string[]
    replyCommentId?: any
    postId?: any
}
const path = "/interactions/comments"
class CommentService {
    createComment(req: CommentReq) {
        return api.post(path, req)
    }
    getPageCommentByPost(postId: any, page: number = 1, limit: number = 20, sortDate: number = -1) {
        return api.get(`${path}/post/${postId}?page=${page}&limit=${limit}&sortDate=${sortDate}`)
    }
}
export default new CommentService()