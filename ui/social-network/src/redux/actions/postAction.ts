import { CommonResult } from "../../common";
import postService, { PostCreateReq } from "../../services/post/postService";
import { CREATE_POST_BEGIN, CREATE_POST_FAILED, CREATE_POST_SUCCESS, FETCH_LIST_POST_BY_USER_BEGIN, FETCH_LIST_POST_BY_USER_FAILED, FETCH_LIST_POST_BY_USER_SUCCESS, FETCH_POST_BY_ID_BEGIN, FETCH_POST_BY_ID_FAILED, FETCH_POST_BY_ID_SUCCESS } from "../constants/postConstant";

export const createPostAction = (postReq: PostCreateReq) => {
    return (dispatch: any) => {
        dispatch({
            type: CREATE_POST_BEGIN
        })
        postService.createPost(postReq).then(resp => {
            const data: CommonResult<any> = resp.data
            console.log("post create success: ", data.data)
            if (data.code === 200) {
                dispatch({
                    type: CREATE_POST_SUCCESS,
                    payload: data.data
                })
            } else {
                dispatch({
                    type: CREATE_POST_FAILED,
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
                type: CREATE_POST_FAILED,
                payload: {
                    message: err.response.data.error || err.response.data.message || err.response.data,
                    status: err.status
                }
            })
        })
    }
}


export const fetchPostByIdAction = (postId: any) => {
    return (dispatch: any) => {
        dispatch({
            type: FETCH_POST_BY_ID_BEGIN
        })
        postService.getPostById(postId).then(resp => {
            const data: CommonResult<any> = resp.data
            console.log("fetch detail post: ", data.data)
            if (data.code === 200) {
                dispatch({
                    type: FETCH_POST_BY_ID_SUCCESS,
                    payload: data.data
                })
            } else {
                dispatch({
                    type: FETCH_POST_BY_ID_FAILED,
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
                type: FETCH_POST_BY_ID_FAILED,
                payload: {
                    message: err.response.data.error || err.response.data.message || err.response.data,
                    status: err.status
                }
            })
        })
    }
}

export const fetchListPostByUserAction = (userId: any) => {
    return (dispatch: any) => {
        dispatch({
            type: FETCH_LIST_POST_BY_USER_BEGIN
        })
        postService.getPagePostByUserId(userId).then(resp => {
            const data: CommonResult<any> = resp.data
            console.log("page post: ", data.data)
            if (data.code === 200) {
                dispatch({
                    type: FETCH_LIST_POST_BY_USER_SUCCESS,
                    payload: data.data
                })
            } else {
                dispatch({
                    type: FETCH_LIST_POST_BY_USER_FAILED,
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
                type: FETCH_LIST_POST_BY_USER_FAILED,
                payload: {
                    message: err.response.data.error || err.response.data.message || err.response.data,
                    status: err.status
                }
            })
        })
    }
}