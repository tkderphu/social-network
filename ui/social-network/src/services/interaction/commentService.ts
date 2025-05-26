import api from "../../axios/interceptor"

export interface CommentReq {
    content: string
    mediaUrls?: string[]
    replyCommentId?: any
    postId: any
}
const path = "/interactions/comments"
class CommentService {
    createComment(req: CommentReq) {
        return api.post(path, req)
    }
    getPageComment(postId: any, page: number = 1, limit: number = 20) {
        return api.get(`${path}/post/${postId}?page=${page}&limit=${limit}`)
    }
}
export default new CommentService()