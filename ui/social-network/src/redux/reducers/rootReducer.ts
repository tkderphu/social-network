import {combineReducers} from 'redux'
import { loginReducer, logoutReducer, redirectReducer } from './authReducer'
import { createConversationReducer, fetchListConversationReducer, fetchListMessageReducer } from './chatReducer'
import { acceptMakeFriendRequestReducer, cancelFriendReducer, cancelMakeFriendRequestReducer, createFriendRequestReducer, fetchAllFriendsReducer, fetchAllRequestFriendInvitationReducer, fetchAllRequestMakeFriendReducer, fetchStatusBetweenUserReducer, fetchSuggestionFriendsReducer, rejectMakeFriendRequestReducer } from './friendshipReducer'
import { createCommentReducer, fetchPageCommentByPostReducer, updateLikeReducer } from './interactionReducer'
import { countUnreadMessageReducer, fetchNotifyMessagesReducer, fetchNotifySettingReducer, updateNotifyChatReducer, updateNotifyCommentReducer, updateNotifyFriendReducer, updateNotifyReactionReducer } from './notificationReducer'
import { createPostReducer, fetchListPostByUserReducer, fetchPostByIdReducer } from './postReducer'
import { checkForgotPasswordCodeReducer, createNewPasswordReducer, createUserReducer, fetchProfileReducer, forgotPasswordReducer, updateAddressReducer, updateEducationReducer, updateInfoReducer, uploadPersonalImageReducer } from './profileReducer'
const rootReducer = combineReducers({
    uploadPersonalImage: uploadPersonalImageReducer,
    updateInfo: updateInfoReducer,
    updateAddress: updateAddressReducer,
    updateEducation: updateEducationReducer,
    fetchProfile: fetchProfileReducer,
    createUser: createUserReducer,
    //auth
    redirect: redirectReducer,
    login: loginReducer,
    logout: logoutReducer,
    forgotPassword: forgotPasswordReducer,
    checkForgotPasswordCode: checkForgotPasswordCodeReducer,
    createNewPassword: createNewPasswordReducer,
    //friendship
    fetchStatusBetweenUser: fetchStatusBetweenUserReducer,
    createFriendRequest: createFriendRequestReducer,
    cancelMakeFriendRequest: cancelMakeFriendRequestReducer,
    rejectMakeFriendRequest: rejectMakeFriendRequestReducer,
    cancelFriend: cancelFriendReducer,
    //notification
    countUnreadMessage: countUnreadMessageReducer,
    fetchNotifyMessages: fetchNotifyMessagesReducer,
    updateNotifyReaction: updateNotifyReactionReducer,
    updateNotifyComment: updateNotifyCommentReducer,
    updateNotifyChat: updateNotifyChatReducer,
    updateNotifyFriend: updateNotifyFriendReducer,
    fetchNotifySetting: fetchNotifySettingReducer,
    fetchListMessage: fetchListMessageReducer,
    fetchListConversation: fetchListConversationReducer,
    createConversation: createConversationReducer,
    fetchAllRequestMakeFriend: fetchAllRequestMakeFriendReducer,
    fetchAllRequestFriendInvitation: fetchAllRequestFriendInvitationReducer,
    fetchAllFriends: fetchAllFriendsReducer,
    fetchSuggestionFriends: fetchSuggestionFriendsReducer,
    acceptMakeFriendRequest: acceptMakeFriendRequestReducer,
    createPost: createPostReducer,
    fetchListPostByUser: fetchListPostByUserReducer,
    fetchPostById: fetchPostByIdReducer,
    createComment: createCommentReducer,
    fetchPageCommentByPost: fetchPageCommentByPostReducer,
    updateLike: updateLikeReducer

})
export default rootReducer