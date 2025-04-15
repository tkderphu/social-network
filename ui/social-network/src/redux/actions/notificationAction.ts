import notificationService from "../../services/notification/notificationService"
import { COUNT_UNREAD_MESSAGE_BEGIN, FETCH_NOTIFY_MESSAGE_BEGIN, FETCH_NOTIFY_SETTING_BEGIN, FETCH_NOTIFY_SETTING_SUCCESS, UPDATE_CHAT_ENABLE_BEGIN, UPDATE_CHAT_ENABLE_SUCCESS, UPDATE_COMMENT_ENABLE_BEGIN, UPDATE_COMMENT_ENABLE_SUCCESS, UPDATE_FRIEND_ENABLE_BEGIN, UPDATE_FRIEND_ENABLE_SUCCESS, UPDATE_REACTION_ENABLE_BEGIN, UPDATE_REACTION_ENABLE_SUCCESS } from "../constants/notificationConstant"

export const countUnreadMessageAction = () => {
    return (dispatch: any) => {
        dispatch({
            type: COUNT_UNREAD_MESSAGE_BEGIN
        })
        notificationService.countUnreadMessage().then(resp => {

        }).catch(err => {

        })
    }
}
export const fetchNotifyMessagesAction = () => {
    return (dispatch: any) => {
        dispatch({
            type: FETCH_NOTIFY_MESSAGE_BEGIN
        })
        notificationService.fetchNotifyMessages().then(resp => {

        }).catch(err => {

        })
    }
}

export const updateNotifyFriendAction = (enable: boolean) => {
    return (dispatch: any) => {
        dispatch({
            type: UPDATE_FRIEND_ENABLE_BEGIN
        })
        notificationService.updateNotifyFriendEnable(enable).then(resp => {
            dispatch({
                type: UPDATE_FRIEND_ENABLE_SUCCESS
            })
        }).catch(err => {

        })
    }
}
export const updateNotifyReactionAction = (enable: boolean) => {
    return (dispatch: any) => {
        dispatch({
            type: UPDATE_REACTION_ENABLE_BEGIN
        })
        notificationService.updateNotifyReactionEnable(enable).then(resp => {
            dispatch({
                type: UPDATE_REACTION_ENABLE_SUCCESS
            })
        }).catch(err => {

        })
    }
}
export const updateNotifyChatAction = (enable: boolean) => {
    return (dispatch: any) => {
        dispatch({
            type: UPDATE_CHAT_ENABLE_BEGIN
        })
        notificationService.updateNotifyChatEnable(enable).then(resp => {
            dispatch({
                type: UPDATE_CHAT_ENABLE_SUCCESS
            })
        }).catch(err => {

        })
    }
}
export const updateNotifyCommentAction = (enable: boolean) => {
    return (dispatch: any) => {
        dispatch({
            type: UPDATE_COMMENT_ENABLE_BEGIN
        })
        notificationService.updateNotifyCommentEnable(enable).then(resp => {
            dispatch({
                type: UPDATE_COMMENT_ENABLE_SUCCESS
            })
        }).catch(err => {

        })
    }
}

export const fetchNotifySettingAction = () => {
    return (dispatch: any) => {
        dispatch({
            type: FETCH_NOTIFY_SETTING_BEGIN
        })
        notificationService.getNotifySetting().then(resp => {
            dispatch({
                type: FETCH_NOTIFY_SETTING_SUCCESS
            })
        }).catch(err => {

        })
    }
}