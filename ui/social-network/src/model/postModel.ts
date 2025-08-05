import { GroupResp } from "./groupModel"
import { UserProfileResp } from "./profileModel"

export interface PostResp {
    id: number
    content: string
    user: UserProfileResp,
    group: GroupResp
    mediaUrls: string[],
    postPrivacy: string
    sharePost: PostResp,
    time: string
    postStats: {
        numberComment?: number
        numberShare?: number
        numberLike?: number
    }
    visible: boolean,
    disable: boolean
}