import api from "../../axios/interceptor"
import { processJsonResponseFromServer } from "../../utils/utils"

export interface UserResp {
    avatar: string,
    firstName: string,
    lastName: string
    isOnline: boolean,
    id: number
    mutualFriends: UserResp[]
}

export interface UserRequest extends UserResp {
    since: any
}

class FriendshipService {
    makeFriendRequest(userId: number) {
        return api.post(`/friendship/make/${userId}`)
    }
    getStatusFriendship(userId: number) {
        return api.get(`/friendship/status/${userId}`)
    }
    acceptMakeFriendRequest(userId: number) {
        return api.put(`/friendship/make/accept/${userId}`)
    }
    getFriends(userId: any) {
        return api.get(`/friendship/friends/${userId}`)
    }
    getAllMakeFriendRequests() {
        return api.get('/friendship/requests')
    }
    getAllMakeFriendRequestReceived() {
        return api.get('/friendship/invitations')
    }
    getSuggestionUsers() {
        return api.get('/friendship/suggestions')
    }
    cancelFriend(userId: number) {
        return api.delete(`/friendship/cancel/${userId}`)
    }
    cancelMakeFriendRequest(userId: number) {
        return api.delete(`/friendship/make/${userId}`)
    }
    rejectMakeFriendRequest(userId: number) {
        return api.delete(`/friendship/make/reject/${userId}`)
    }
    countFriends(userId: any, set: any) {
        processJsonResponseFromServer(
            api.get(`/friendship/${userId}/count`),
            "countFriends",
            set
        )
    }
}
export default new FriendshipService()