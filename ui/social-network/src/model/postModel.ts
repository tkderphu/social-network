import { UserProfileResp } from "./profileModel"

export interface PostResp {
    id: number
    content: string
    user: UserProfileResp,
    group: any
    mediaUrls: string[],
    postPrivacy: string
    sharePost: PostResp,
    time: string
    postStats: {
        numberComment?: number
        numberShare?: number
        numberLike?: number
    }
}