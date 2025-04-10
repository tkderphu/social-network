import api from "../../axios/interceptor"


class FriendshipService {
    makeFriendRequest(userId: number) {
        return api.post(`/friendship/make-friend-request/${userId}`)
    }
    acceptFriendRequest(userId: number) {
        return api.post(`/friendship/accept-friend-request/${userId}`)
    }
    getFriends(userId: number, page: number = 1, limit: number = 6) {
        return api.get(`/friendship/get-all-friends-by-${userId}?page=${page}&limit=${limit}`)
    }
    getAllMakeFriendRequests() {
        return api.get('/friendship/get-all-make-friend-requests')
    }
    getAllMakeFriendRequestReceived() {
        return api.get('/friendship/get-all-make-friend-request-received')
    }
    getSuggestionUsers() {
        return api.get('/friendship/suggestion-users')
    }
    removeFriend(userId: number) {
        return api.delete(`/friendship/remove-friend/${userId}`)
    }
    getFriendshipStatus(userId: number) {
        return api.get(`/friendship/${userId}`)
    }
}
export default new FriendshipService()