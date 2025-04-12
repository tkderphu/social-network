import { CommonResult } from "../../common"
import friendshipService from "../../services/friendship/friendshipService"
import {
    ACCEPT_FRIEND_REQUEST_BEGIN, ACCEPT_FRIEND_REQUEST_FAILED, ACCEPT_FRIEND_REQUEST_SUCCESS,
    CANCEL_FRIEND_BEGIN,
    CANCEL_FRIEND_FAILED,
    CANCEL_FRIEND_SUCCESS,
    CANCEL_MAKE_FRIEND_REQUEST_BEGIN, CANCEL_MAKE_FRIEND_REQUEST_FAILED, CANCEL_MAKE_FRIEND_REQUEST_SUCCESS,
    CREATE_FRIEND_REQUEST_BEGIN, CREATE_FRIEND_REQUEST_FAILED, CREATE_FRIEND_REQUEST_SUCCESS, 
    FETCH_FRIEND_REQUEST_BY_RECEIVER_BEGIN, FETCH_FRIEND_REQUEST_BY_RECEIVER_FAILED, FETCH_FRIEND_REQUEST_BY_RECEIVER_SUCCESS,
    FETCH_FRIEND_REQUEST_BY_SENDER_BEGIN, FETCH_FRIEND_REQUEST_BY_SENDER_FAILED, FETCH_FRIEND_REQUEST_BY_SENDER_SUCCESS,
    FETCH_STATUS_BETWEEN_USER_BEGIN, FETCH_STATUS_BETWEEN_USER_FAILED, FETCH_STATUS_BETWEEN_USER_SUCCESS, FETCH_SUGGESTION_USER_BEGIN,
    FETCH_SUGGESTION_USER_FAILED, FETCH_SUGGESTION_USER_SUCCESS, REJECT_MAKE_FRIEND_REQUEST_BEGIN, REJECT_MAKE_FRIEND_REQUEST_FAILED,
    REJECT_MAKE_FRIEND_REQUEST_SUCCESS
} from "../constants/friendshipConstant"

export const acceptMakeFriendRequestAction = (userId: number) => {
    return (dispatch: any) => {
        dispatch({
            type: ACCEPT_FRIEND_REQUEST_BEGIN
        })
        friendshipService.acceptMakeFriendRequest(userId).then(response => {
            const result: CommonResult<any> = response.data
            if (result.code === 200) {
                dispatch({
                    type: ACCEPT_FRIEND_REQUEST_SUCCESS
                })
                dispatch(fetchStatusBetweenUserAction(userId))
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
            if (err.status === 401) {
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



export const createFriendRequestAction = (userId: number) => {
    return (dispatch: any) => {
        dispatch({
            type: CREATE_FRIEND_REQUEST_BEGIN
        })
        friendshipService.makeFriendRequest(userId).then(res => {
            const data: CommonResult<any> = res.data;
            if (data.code === 200) {
                dispatch({
                    type: CREATE_FRIEND_REQUEST_SUCCESS
                })
                dispatch(fetchStatusBetweenUserAction(userId))
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
            if (err.status === 401) {
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
            if (data.code === 200) {
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
            if (err.status === 401) {
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
            if (data.code === 200) {
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
            if (err.status === 401) {
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
            if (data.code == 200) {
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
            if (err.status === 401) {
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


export const fetchStatusBetweenUserAction = (userId: number) => {
    return (dispatch: any) => {
        dispatch({
            type: FETCH_STATUS_BETWEEN_USER_BEGIN
        })
        friendshipService.getStatusFriendship(userId).then(resp => {
            const data: CommonResult<any> = resp.data;
            dispatch({
                type: FETCH_STATUS_BETWEEN_USER_SUCCESS,
                payload: data.data
            })
        }).catch(err => {
            if (err.status === 401) {
                localStorage.clear()
                alert("Your token is expired, please login again");
                location.href = '/login'
            }
            dispatch({
                type: FETCH_STATUS_BETWEEN_USER_FAILED,
                payload: {
                    message: err.message,
                    status: err.code,
                    error: err
                }
            })
        })
    }
}

export const cancelMakeFriendRequestAction = (userId: number) => {
    return (dispatch: any) => {
        dispatch({
            type: CANCEL_MAKE_FRIEND_REQUEST_BEGIN
        })
        friendshipService.cancelMakeFriendRequest(userId).then(resp => {
            dispatch({
                type: CANCEL_MAKE_FRIEND_REQUEST_SUCCESS
            })
            dispatch(fetchStatusBetweenUserAction(userId))
        }).catch(err => {
            if (err.status === 401) {
                localStorage.clear()
                alert("Your token is expired, please login again");
                location.href = '/login'
            }
            dispatch({
                type: CANCEL_MAKE_FRIEND_REQUEST_FAILED,
                payload: {
                    message: err.message,
                    status: err.code,
                    error: err
                }
            })
        })
    }
}

export const rejectMakeFriendRequestAction = (userId: number) => {
    return (dispatch: any) => {
        dispatch({
            type: REJECT_MAKE_FRIEND_REQUEST_BEGIN
        })
        friendshipService.rejectMakeFriendRequest(userId).then(resp => {
            dispatch({
                type: REJECT_MAKE_FRIEND_REQUEST_SUCCESS
            })
            dispatch(fetchStatusBetweenUserAction(userId))
        }).catch(err => {
            if (err.status === 401) {
                localStorage.clear()
                alert("Your token is expired, please login again");
                location.href = '/login'
            }
            dispatch({
                type: REJECT_MAKE_FRIEND_REQUEST_FAILED,
                payload: {
                    message: err.message,
                    status: err.code,
                    error: err
                }
            })
        })
    }
}

export const cancelFriendAction = (userId: number) => {
    return (dispatch: any) => {
        dispatch({
            type: CANCEL_FRIEND_BEGIN
        })
        friendshipService.cancelFriend(userId).then(resp => {
            dispatch({
                type: CANCEL_FRIEND_SUCCESS
            })
            dispatch(fetchStatusBetweenUserAction(userId))
        }).catch(err => {
            if (err.status === 401) {
                localStorage.clear()
                alert("Your token is expired, please login again");
                location.href = '/login'
            }
            dispatch({
                type: CANCEL_FRIEND_FAILED,
                payload: {
                    message: err.message,
                    status: err.code,
                    error: err
                }
            })
        })
    }
}