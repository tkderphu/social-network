import {
    COUNT_UNREAD_MESSAGE_BEGIN, COUNT_UNREAD_MESSAGE_FAILED,
    COUNT_UNREAD_MESSAGE_SUCCESS, FETCH_NOTIFY_MESSAGE_BEGIN, FETCH_NOTIFY_MESSAGE_FAILED, FETCH_NOTIFY_MESSAGE_SUCCESS,
    FETCH_NOTIFY_SETTING_BEGIN,
    FETCH_NOTIFY_SETTING_FAILED,
    FETCH_NOTIFY_SETTING_SUCCESS,
    UPDATE_CHAT_ENABLE_BEGIN, UPDATE_CHAT_ENABLE_FAILED, UPDATE_CHAT_ENABLE_SUCCESS, UPDATE_COMMENT_ENABLE_BEGIN,
    UPDATE_COMMENT_ENABLE_FAILED, UPDATE_COMMENT_ENABLE_SUCCESS, UPDATE_FRIEND_ENABLE_BEGIN, UPDATE_FRIEND_ENABLE_FAILED,
    UPDATE_FRIEND_ENABLE_SUCCESS
} from "../constants/notificationConstant"

export const countUnreadMessageReducer = (state: any = {}, action: any) => {
    switch (action.type) {
        case COUNT_UNREAD_MESSAGE_BEGIN: {
            return { loading: true }
        }
        case COUNT_UNREAD_MESSAGE_SUCCESS: {
            return { loading: false, count: action.payload }
        }
        case COUNT_UNREAD_MESSAGE_FAILED: {
            return { loading: false, hasError: true, error: action.payload.error }
        }
        default: return state
    }
}
export const fetchNotifyMessagesReducer = (state: any = {}, action: any) => {
    switch (action.type) {
        case FETCH_NOTIFY_MESSAGE_BEGIN: {
            return { loading: true }
        }
        case FETCH_NOTIFY_MESSAGE_SUCCESS: {
            return { loading: false, notifications: action.payload }
        }
        case FETCH_NOTIFY_MESSAGE_FAILED: {
            return { loading: false, hasError: true, error: action.payload.error }
        }
        default: return state
    }
}

export const updateNotifyReactionReducer = (state: any = {}, action: any) => {
    switch (action.type) {
        case FETCH_NOTIFY_MESSAGE_BEGIN: {
            return { loading: true }
        }
        case FETCH_NOTIFY_MESSAGE_SUCCESS: {
            return { loading: false, notifyMessages: action.payload }
        }
        case COUNT_UNREAD_MESSAGE_FAILED: {
            return { loading: false, hasError: true, error: action.payload.error }
        }
        default: return state
    }
}
export const updateNotifyChatReducer = (state: any = {}, action: any) => {
    switch (action.type) {
        case UPDATE_CHAT_ENABLE_BEGIN: {
            return { loading: true }
        }
        case UPDATE_CHAT_ENABLE_SUCCESS: {
            return { loading: false }
        }
        case UPDATE_CHAT_ENABLE_FAILED: {
            return { loading: false, hasError: true, error: action.payload.error }
        }
        default: return state
    }
}
export const updateNotifyFriendReducer = (state: any = {}, action: any) => {
    switch (action.type) {
        case UPDATE_FRIEND_ENABLE_BEGIN: {
            return { loading: true }
        }
        case UPDATE_FRIEND_ENABLE_SUCCESS: {
            return { loading: false }
        }
        case UPDATE_FRIEND_ENABLE_FAILED: {
            return { loading: false, hasError: true, error: action.payload.error }
        }
        default: return state
    }
}
export const updateNotifyCommentReducer = (state: any = {}, action: any) => {
    switch (action.type) {
        case UPDATE_COMMENT_ENABLE_BEGIN: {
            return { loading: true }
        }
        case UPDATE_COMMENT_ENABLE_SUCCESS: {
            return { loading: false }
        }
        case UPDATE_COMMENT_ENABLE_FAILED: {
            return { loading: false, hasError: true, error: action.payload.error }
        }
        default: return state
    }
}
export const fetchNotifySettingReducer = (state: any = {}, action: any) => {
    switch (action.type) {
        case FETCH_NOTIFY_SETTING_BEGIN: {
            return { loading: true }
        }
        case FETCH_NOTIFY_SETTING_SUCCESS: {
            return { loading: false, notifySetting: action.payload }
        }
        case FETCH_NOTIFY_SETTING_FAILED: {
            return { loading: false, hasError: true, error: action.payload.error }
        }
        default: return state
    }
}