import { ac } from "react-router/dist/development/route-data-BmvbmBej";
import { CANCEL_FRIEND_BEGIN, CANCEL_FRIEND_FAILED, CANCEL_FRIEND_SUCCESS, CANCEL_MAKE_FRIEND_REQUEST_BEGIN, CANCEL_MAKE_FRIEND_REQUEST_FAILED, CANCEL_MAKE_FRIEND_REQUEST_SUCCESS, CREATE_FRIEND_REQUEST_BEGIN, CREATE_FRIEND_REQUEST_FAILED, CREATE_FRIEND_REQUEST_SUCCESS, FETCH_STATUS_BETWEEN_USER_BEGIN, FETCH_STATUS_BETWEEN_USER_FAILED, FETCH_STATUS_BETWEEN_USER_SUCCESS, REJECT_MAKE_FRIEND_REQUEST_BEGIN, REJECT_MAKE_FRIEND_REQUEST_FAILED, REJECT_MAKE_FRIEND_REQUEST_SUCCESS } from "../constants/friendshipConstant";

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