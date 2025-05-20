import { ac } from "react-router/dist/development/route-data-BmvbmBej";
import { ACCEPT_FRIEND_REQUEST_BEGIN, ACCEPT_FRIEND_REQUEST_FAILED, ACCEPT_FRIEND_REQUEST_SUCCESS, CANCEL_FRIEND_BEGIN, CANCEL_FRIEND_FAILED, CANCEL_FRIEND_SUCCESS, CANCEL_MAKE_FRIEND_REQUEST_BEGIN, CANCEL_MAKE_FRIEND_REQUEST_FAILED, CANCEL_MAKE_FRIEND_REQUEST_SUCCESS, CREATE_FRIEND_REQUEST_BEGIN, CREATE_FRIEND_REQUEST_FAILED, CREATE_FRIEND_REQUEST_SUCCESS, FETCH_ALL_FRIENDS_BEGIN, FETCH_ALL_FRIENDS_FAILED, FETCH_ALL_FRIENDS_SUCCESS, FETCH_FRIEND_REQUEST_BY_RECEIVER_BEGIN, FETCH_FRIEND_REQUEST_BY_RECEIVER_FAILED, FETCH_FRIEND_REQUEST_BY_RECEIVER_SUCCESS, FETCH_FRIEND_REQUEST_BY_SENDER_BEGIN, FETCH_FRIEND_REQUEST_BY_SENDER_FAILED, FETCH_FRIEND_REQUEST_BY_SENDER_SUCCESS, FETCH_STATUS_BETWEEN_USER_BEGIN, FETCH_STATUS_BETWEEN_USER_FAILED, FETCH_STATUS_BETWEEN_USER_SUCCESS, FETCH_SUGGESTION_USER_BEGIN, FETCH_SUGGESTION_USER_FAILED, FETCH_SUGGESTION_USER_SUCCESS, REJECT_MAKE_FRIEND_REQUEST_BEGIN, REJECT_MAKE_FRIEND_REQUEST_FAILED, REJECT_MAKE_FRIEND_REQUEST_SUCCESS } from "../constants/friendshipConstant";

export const fetchStatusBetweenUserReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case FETCH_STATUS_BETWEEN_USER_BEGIN: {
            return {
                loading: true
            }
        }
        case FETCH_STATUS_BETWEEN_USER_SUCCESS: {
            return {
                loading: false,
                status: action.payload
            }
        }
        case FETCH_STATUS_BETWEEN_USER_FAILED: {
            return {
                loading: false,
                error: action.payload.error,
                hasError: true
            }
        }
        default: return state
    }
}


export const fetchAllRequestMakeFriendReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case FETCH_FRIEND_REQUEST_BY_SENDER_BEGIN: {
            return {
                loading: true
            }
        }
        case FETCH_FRIEND_REQUEST_BY_SENDER_SUCCESS: {
            return {
                loading: false,
                requests: action.payload
            }
        }
        case FETCH_FRIEND_REQUEST_BY_SENDER_FAILED: {
            return {
                loading: false,
                error: action.payload.error,
                hasError: true
            }
        }
        default: return state
    }
}

export const fetchAllRequestFriendInvitationReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case FETCH_FRIEND_REQUEST_BY_RECEIVER_BEGIN: {
            return {
                loading: true
            }
        }
        case FETCH_FRIEND_REQUEST_BY_RECEIVER_SUCCESS: {
            return {
                loading: false,
                invitations: action.payload
            }
        }
        case FETCH_FRIEND_REQUEST_BY_RECEIVER_FAILED: {
            return {
                loading: false,
                error: action.payload.error,
                hasError: true
            }
        }
        default: return state
    }
}

export const fetchAllFriendsReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case FETCH_ALL_FRIENDS_BEGIN: {
            return {
                loading: true
            }
        }
        case FETCH_ALL_FRIENDS_SUCCESS: {
            return {
                loading: false,
                friends: action.payload
            }
        }
        case FETCH_ALL_FRIENDS_FAILED: {
            return {
                loading: false,
                error: action.payload.error,
                hasError: true
            }
        }
        default: return state
    }
}

export const createFriendRequestReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case CREATE_FRIEND_REQUEST_BEGIN: {
            return {
                loading: true
            }
        }
        case CREATE_FRIEND_REQUEST_SUCCESS: {
            return {
                loading: false
            }
        }
        case CREATE_FRIEND_REQUEST_FAILED: {
            return {
                loading: false,
                error: action.payload.error,
                hasError: true
            }
        }
        default: return state
    }
}
export const cancelMakeFriendRequestReducer =(state: any = {}, action: any) => {
    switch(action.type) {
        case CANCEL_MAKE_FRIEND_REQUEST_BEGIN: {
            return {
                loading: true
            }
        }
        case CANCEL_MAKE_FRIEND_REQUEST_SUCCESS: {
            return {
                loading: false
            }
        }
        case CANCEL_MAKE_FRIEND_REQUEST_FAILED: {
            return {
                loading: false,
                hasError: true,
                error: action.payload.error
            }
        }
        default: return state
    }
}
export const rejectMakeFriendRequestReducer =(state: any = {}, action: any) => {
    switch(action.type) {
        case REJECT_MAKE_FRIEND_REQUEST_BEGIN: {
            return {
                loading: true
            }
        }
        case REJECT_MAKE_FRIEND_REQUEST_SUCCESS: {
            return {
                loading: false
            }
        }
        case REJECT_MAKE_FRIEND_REQUEST_FAILED: {
            return {
                loading: false,
                hasError: true,
                error: action.payload.error
            }
        }
        default: return state
    }
}
export const cancelFriendReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case CANCEL_FRIEND_BEGIN: {
            return {
                loading: true
            }
        }
        case CANCEL_FRIEND_SUCCESS: {
            return {
                loading: false
            }
        }
        case CANCEL_FRIEND_FAILED: {
            return {
                loading: false,
                hasError: true,
                error: action.payload.error
            }
        }
        default: return state
    }
}

export const fetchSuggestionFriendsReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case FETCH_SUGGESTION_USER_BEGIN: {
            return {
                loading: true
            }
        }
        case FETCH_SUGGESTION_USER_SUCCESS: {
            return {
                loading: false,
                suggestions: action.payload
            }
        }
        case FETCH_SUGGESTION_USER_FAILED: {
            return {
                loading: false,
                hasError: true,
                error: action.payload.error
            }
        }
        default: return state
    }
}

export const acceptMakeFriendRequestReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case ACCEPT_FRIEND_REQUEST_BEGIN: {
            return {
                loading: true
            }
        }
        case ACCEPT_FRIEND_REQUEST_SUCCESS: {
            return {
                loading: false
            }
        }
        case ACCEPT_FRIEND_REQUEST_FAILED: {
            return {
                loading: false,
                hasError: true,
                error: action.payload.error
            }
        }
        default: return state
    }
}

