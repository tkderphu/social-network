import { UserProfileResp } from "./profileModel"

export interface CommentRespVO {
    id: number
    content: any
    mediaUrls?: string[]
    time: any
    likes: number
    nestedComments: number
    user: UserProfileResp
    rootCommentId?: number
    replyCommentId?: number,
    upVote?: number
    downVote?: number
    postId?: any
}