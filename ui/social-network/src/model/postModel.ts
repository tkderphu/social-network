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


/**
 * private String content;
    private Long groupId;
    private List<String> mediaUrls;
    private Set<String> tagNames;
    private PostType postType;
    private PostPrivacy postPrivacy = PostPrivacy.PUBLIC;
    private Long sharePostId;
 */
export interface PostCreateReqVO {
    content: string,
    groupId?: any,
    mediaUrls?: string[],
    tagNames?: string[],
    postPrivacy: "PUBLIC" | "PRIVATE",
    sharePostId?: any
    postType: "PROFLIE_PICTURE_UPDATE" |
    "COVER_PHOTO_UPDATE" |
    "TEXT" |
    "IMAGE" |
    "VIDEO" |
    "SHARED_POST",
    id?: any
}


export interface ReportReqVO {
    reason?: string,
    postId: any,
    reportType?: "SPAM_UNWANTED_CONTENT" | "HARASSMENT_BULLYING" | "INAPPROPRIATE_CONTENT" | "FALSE_INFORMATION" | "OTHER",
}