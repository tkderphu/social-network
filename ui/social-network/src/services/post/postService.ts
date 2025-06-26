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
    getListPostByGroup(groupId: any, page: number, limit: number, type: number) {
        return api.get(`${path}/group/${groupId}?page=${page}&limit=${limit}&type=${type}`)
    }
    getListPost(type: "user" | "group" , typeId: any, page: number, limit: number, postType?: "PROFILE_PICTURE_UPDATE" | "COVER_PHOTO_UPDATE") {
        if(!postType) {
            return api.get(`${path}/${type}/${typeId}?page=${page}&limit=${limit}`)
        } else {
            return api.get(`${path}/${type}/${typeId}?page=${page}&limit=${limit}&postType=${postType}`)
        }
    }
}
export default new PostService()