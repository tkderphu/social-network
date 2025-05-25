import api from "../../axios/interceptor"
export interface PostCreateReq {
    content: string,
    groupId?: any,
    mediaUrls?: string[],
    tagNames?: string[],
    postType?: "PROFILE_PICTURE_UPDATE" | "COVER_PHOTO_UPDATE" | "TEXT" | "IMAGE" | "VIDEO" | "SHARED_POST",
    postPrivacy: "PUBLIC" | "PRIVATE" | "ONLY_FRIENDS",
    sharePostId?: any
}
const path = "/posts"
class PostService {
    createPost(req: PostCreateReq) {
        return api.post(path, req)
    }
    getPagePostByUserId(userId: any) {
        return api.get(`${path}/user/${userId}`)
    }
    getPostById(postId: any) {
        return api.get(`${path}/${postId}`)
    }
}
export default new PostService()