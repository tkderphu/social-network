import { redirect } from 'react-router'
import {combineReducers} from 'redux'
import { rejectMakeFriendRequestAction } from '../actions/friendshipAction'
import { fetchProfileAction } from '../actions/profileAction'
import { forgotPasswordReducer, loginReducer, redirectReducer, registerReducer } from './authReducer'
import { cancelFriendReducer, cancelMakeFriendRequestReducer, createFriendRequestReducer, fetchStatusBetweenUserReducer, rejectMakeFriendRequestReducer } from './friendshipReducer'
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
    cancelFriend: cancelFriendReducer
})
export default rootReducer