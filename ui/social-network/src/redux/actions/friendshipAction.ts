import { CommonResult } from "../../common"
import friendshipService from "../../services/friendship/friendshipService"
import { ACCEPT_FRIEND_REQUEST_BEGIN, ACCEPT_FRIEND_REQUEST_FAILED, ACCEPT_FRIEND_REQUEST_SUCCESS, CANCEL_FRIEND_REQUEST_BEGIN, CREATE_FRIEND_REQUEST_BEGIN, CREATE_FRIEND_REQUEST_FAILED, CREATE_FRIEND_REQUEST_SUCCESS, DENY_FRIEND_REQUEST_BEGIN, FETCH_FRIEND_REQUEST_BY_RECEIVER_BEGIN, FETCH_FRIEND_REQUEST_BY_RECEIVER_FAILED, FETCH_FRIEND_REQUEST_BY_RECEIVER_SUCCESS, FETCH_FRIEND_REQUEST_BY_SENDER_BEGIN, FETCH_FRIEND_REQUEST_BY_SENDER_FAILED, FETCH_FRIEND_REQUEST_BY_SENDER_SUCCESS, FETCH_SUGGESTION_USER_BEGIN, FETCH_SUGGESTION_USER_FAILED, FETCH_SUGGESTION_USER_SUCCESS } from "../constants/friendshipConstant"

export const acceptFriendRequestAction = (userId: number) => {
    return (dispatch: any) => {
        dispatch({
            type: ACCEPT_FRIEND_REQUEST_BEGIN
        })
        friendshipService.acceptFriendRequest(userId).then(response => {
            const result: CommonResult<any> = response.data
            if(result.code === 200) {
                dispatch({
                    type: ACCEPT_FRIEND_REQUEST_SUCCESS
                })
                dispatch(fetchAllFriendRequestByReceiverAction())
            } else {
                dispatch({
                    type: ACCEPT_FRIEND_REQUEST_FAILED,
                    payload: {
                        message: result.message,
                        status: result.code
                    }
                })
            }
        }).catch(err => {
            if(err.status === 401) {
                localStorage.clear()
                alert("Your token is expired, please login again");
                location.href = '/login'
            }
            dispatch({
                type: ACCEPT_FRIEND_REQUEST_FAILED,
                payload: {
                    message: err.message,
                    status: err.code
                }
            })
        })
    }
}

export const denyFriendRequestAction = (userId: number) => {
    return (dispatch: any) => {
        dispatch({
            type: DENY_FRIEND_REQUEST_BEGIN
        })
        
    }
}


export const cancelFriendRequestAction = () => {
    return (dispatch: any) => {
         dispatch({
            type: CANCEL_FRIEND_REQUEST_BEGIN
         })
    }
}

export const createFriendRequestAction = (userId: number) => {
    return (dispatch: any) => {
        dispatch({
            type: CREATE_FRIEND_REQUEST_BEGIN
        })
        friendshipService.makeFriendRequest(userId).then(res => {
            const data: CommonResult<any> = res.data;
            if(data.code === 200) {
                dispatch({
                    type: CREATE_FRIEND_REQUEST_SUCCESS
                })
            } else {
                dispatch({
                    type: CREATE_FRIEND_REQUEST_FAILED,
                    payload: {
                        message: data.message,
                        status: data.code
                    }
                })
            }
        }).catch(err => {
            if(err.status === 401) {
                localStorage.clear()
                alert("Your token is expired, please login again");
                location.href = '/login'
            }
            dispatch({
                type: CREATE_FRIEND_REQUEST_FAILED,
                payload: {
                    message: err.message,
                    status: err.code
                }
            })
        })
    }
}
export const fetchAllFriendRequestBySenderAction = () => {
    return (dispatch: any) => {
        dispatch({
            type: FETCH_FRIEND_REQUEST_BY_SENDER_BEGIN
        })
        friendshipService.getAllMakeFriendRequests().then(res => {
            const data: CommonResult<any> = res.data
            if(data.code === 200) {
                dispatch({
                    type: FETCH_FRIEND_REQUEST_BY_SENDER_SUCCESS,
                    payload: data.data
                })
            } else {
                dispatch({
                    type: FETCH_FRIEND_REQUEST_BY_SENDER_FAILED,
                    payload: {
                        message: data.message,
                        status: data.code
                    }
                })
            }
        }).catch(err => {
            if(err.status === 401) {
                localStorage.clear()
                alert("Your token is expired, please login again");
                location.href = '/login'
            }
            dispatch({
                type: FETCH_FRIEND_REQUEST_BY_SENDER_FAILED,
                payload: {
                    message: err.message,
                    status: err.code
                }
            })
        })
    }
}
export const fetchAllFriendRequestByReceiverAction = () => {
    return (dispatch: any) => {
        dispatch({
            type: FETCH_FRIEND_REQUEST_BY_RECEIVER_BEGIN
        })
        friendshipService.getAllMakeFriendRequestReceived().then(res => {
            const data: CommonResult<any> = res.data
            if(data.code === 200) {
                dispatch({
                    type: FETCH_FRIEND_REQUEST_BY_RECEIVER_SUCCESS,
                    payload: data.data
                })
            } else {
                dispatch({
                    type: FETCH_FRIEND_REQUEST_BY_RECEIVER_FAILED,
                    payload: {
                        message: data.message,
                        status: data.code
                    }
                })
            }
        }).catch(err => {
            if(err.status === 401) {
                localStorage.clear()
                alert("Your token is expired, please login again");
                location.href = '/login'
            }
            dispatch({
                type: FETCH_FRIEND_REQUEST_BY_RECEIVER_FAILED,
                payload: {
                    message: err.message,
                    status: err.code
                }
            })
        })
    }
}

export const fetchSuggestionUsersAction = () => {
    return (dispatch: any) => {
        dispatch({
            type: FETCH_SUGGESTION_USER_BEGIN
        })
        friendshipService.getSuggestionUsers().then(res => {
            const data: CommonResult<any> = res.data;
            if(data.code == 200) {
                dispatch({
                    type: FETCH_SUGGESTION_USER_SUCCESS,
                    payload: data.data
                })
            } else {
                dispatch({
                    type: FETCH_SUGGESTION_USER_FAILED,
                    payload: {
                        message: data.message,
                        status: data.code
                    }
                })
            }
        }).catch(err => {
            if(err.status === 401) {
                localStorage.clear()
                alert("Your token is expired, please login again");
                location.href = '/login'
            }
            dispatch({
                type: FETCH_SUGGESTION_USER_FAILED,
                payload: {
                    message: err.message,
                    status: err.code
                }
            })
        })
    }
}