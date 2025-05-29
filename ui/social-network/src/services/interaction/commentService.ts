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
    getPageCommentByPost(postId: any, page: number = 1, limit: number = 20) {
        console.log("why not called")
        return api.get(`${path}/post/${postId}?page=${page}&limit=${limit}  `)
    }
}
export default new CommentService()