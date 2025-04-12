import api from "../../axios/interceptor"


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
    cancelFriend(userId: number) {
        return api.delete(`/friendship/cancel/${userId}`)
    }
    cancelMakeFriendRequest(userId: number) {
        return api.delete(`/friendship/make/${userId}`)
    }
    rejectMakeFriendRequest(userId: number) {
        return api.delete(`/friendship/make/reject/${userId}`)
    }
}
export default new FriendshipService()