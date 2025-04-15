import {combineReducers} from 'redux'
import { forgotPasswordReducer, loginReducer, redirectReducer, registerReducer } from './authReducer'
import { cancelFriendReducer, cancelMakeFriendRequestReducer, createFriendRequestReducer, fetchStatusBetweenUserReducer, rejectMakeFriendRequestReducer } from './friendshipReducer'
import { countUnreadMessageReducer, fetchNotifyMessagesReducer, fetchNotifySettingReducer, updateNotifyChatReducer, updateNotifyCommentReducer, updateNotifyFriendReducer, updateNotifyReactionReducer } from './notificationReducer'
import { acceptMakeFriendRequestReducer, fetchProfileReducer, updateAddressReducer, updateEducationReducer, updateInfoReducer, uploadPersonalImageReducer } from './profileReducer'
const rootReducer = combineReducers({
    uploadPersonalImage: uploadPersonalImageReducer,
    updateInfo: updateInfoReducer,
    updateAddress: updateAddressReducer,
    updateEducation: updateEducationReducer,
    fetchProfile: fetchProfileReducer,
    //auth
    redirect: redirectReducer,
    login: loginReducer,
    register: registerReducer,
    forgotPassword: forgotPasswordReducer,
    //friendship
    fetchStatusBetweenUser: fetchStatusBetweenUserReducer,
    createFriendRequest: createFriendRequestReducer,
    cancelMakeFriendRequest: cancelMakeFriendRequestReducer,
    rejectMakeFriendRequest: rejectMakeFriendRequestReducer,
    acceptMakeFrienRequest: acceptMakeFriendRequestReducer,
    cancelFriend: cancelFriendReducer,
    //notification
    countUnreadMessage: countUnreadMessageReducer,
    fetchNotifyMessages: fetchNotifyMessagesReducer,
    updateNotifyReaction: updateNotifyReactionReducer,
    updateNotifyComment: updateNotifyCommentReducer,
    updateNotifyChat: updateNotifyChatReducer,
    updateNotifyFriend: updateNotifyFriendReducer,
    fetchNotifySetting: fetchNotifySettingReducer

})
export default rootReducer