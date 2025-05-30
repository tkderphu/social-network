import { CommonResult } from "../../common"
import commentService from "../../services/interaction/commentService"
import likeService from "../../services/interaction/likeService"
import { CREATE_COMMENT_BEGIN, CREATE_COMMENT_FAILED, CREATE_COMMENT_SUCCESS, FETCH_NESTED_COMMENT, FETCH_PAGE_COMMENT_BEGIN, FETCH_PAGE_COMMENT_FAILED, FETCH_PAGE_COMMENT_SUCCESS, UPDATE_LIKE_BEGIN, UPDATE_LIKE_FAILED, UPDATE_LIKE_SUCCESS } from "../constants/interactionConstant"
import { fetchPostByIdAction } from "./postAction"

export const createCommentAction = (commentReq: any) => {
    return (dispatch: any) => {
        dispatch({
            type: CREATE_COMMENT_BEGIN
        })
        commentService.createComment(commentReq).then(resp => {
            const data: CommonResult<any> = resp.data
            console.log("create post: ", data.data)
            if (data.code === 200) {
                dispatch({
                    type: CREATE_COMMENT_SUCCESS,
                    payload: data.data
                })
            } else {
                dispatch({
                    type: CREATE_COMMENT_FAILED,
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
                type: CREATE_COMMENT_FAILED,
                payload: {
                    message: err.response?.data?.error || err.response?.data?.message || err?.response?.data,
                    status: err.status
                }
            })
        })
    }
}






export const fetchPageCommentAction = (typeId: any, type: "parent" | "post", page: number = 1, limit: number = 20) => {
    return (dispatch: any) => {
        dispatch({
            type: FETCH_PAGE_COMMENT_BEGIN
        })
        commentService.getPageComment(typeId,type, page, limit).then(resp => {
            const data: CommonResult<any> = resp.data
            console.log("page comment: ", data.data)
            if (data.code === 200) {
                if(type == "post") {
                    dispatch({
                        type: FETCH_PAGE_COMMENT_SUCCESS,
                        payload: data.data
                    })
                } else {
                    dispatch({
                        type: FETCH_NESTED_COMMENT,
                        parentCommentId: typeId,
                        payload: data.data
                    })
                }
            } else {
                dispatch({
                    type: FETCH_PAGE_COMMENT_FAILED,
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
                type: FETCH_PAGE_COMMENT_FAILED,
                payload: {
                    message: err.response?.data?.error || err.response?.data?.message || err?.response?.data,
                    status: err.status
                }
            })
        })
    }
}


export const updateLikeAction = (likeReq: any) => {
    return (dispatch: any) => {
        dispatch({
            type: UPDATE_LIKE_BEGIN
        })
        likeService.updateLike(likeReq).then(resp => {
            const data: CommonResult<any> = resp.data
            console.log("like data resp: ", data.data)
            if (data.code === 200) {
                dispatch({
                    type: UPDATE_LIKE_SUCCESS,
                    payload: data.data
                })
                if(likeReq.objectType == "POST") {
                    dispatch(fetchPostByIdAction(likeReq.objectId))
                } else if(likeReq.objectType == "COMMENT") {
                    // dispatch(fetchPageCommentByPostAction)
                }
            } else {
                dispatch({
                    type: UPDATE_LIKE_FAILED,
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
                type: UPDATE_LIKE_FAILED,
                payload: {
                    message: err.response?.data?.error || err.response?.data?.message || err?.response?.data,
                    status: err.status
                }
            })
        })
    }
}