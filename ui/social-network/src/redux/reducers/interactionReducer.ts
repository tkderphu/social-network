import { ADD_NEW_COMMENT_TO_PAGE, CREATE_COMMENT_BEGIN, CREATE_COMMENT_FAILED, CREATE_COMMENT_SUCCESS, FETCH_NESTED_COMMENT, FETCH_PAGE_COMMENT_BEGIN, FETCH_PAGE_COMMENT_FAILED, FETCH_PAGE_COMMENT_SUCCESS, UPDATE_LIKE_BEGIN, UPDATE_LIKE_FAILED, UPDATE_LIKE_SUCCESS, UPDATE_VOTE_BEGIN, UPDATE_VOTE_FAILED, UPDATE_VOTE_SUCCESS } from "../constants/interactionConstant"

export const createCommentReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case CREATE_COMMENT_BEGIN: {
            return {
                loading: true
            }
        }
        case CREATE_COMMENT_SUCCESS: {
            return {
                loading: false,
                comment: action.payload,
                success: true
            }
        }
        case CREATE_COMMENT_FAILED: {
            return {
                loading: false,
                hasError: true,
                message: action.payload.message,
                status: action.payload.status
            }
        }
        default: return state
    }
}


export const fetchPageCommentReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case ADD_NEW_COMMENT_TO_PAGE: {
            const {parentCommentId, payload} = action
            console.log("data send reducer add new comment: ", action)
            if(!parentCommentId) {
                console.log("parentId != undefined why this method call")
                return {
                    ...state,
                    pageResult: {
                        ...state.pageResult,
                        data: [action.payload, ...state.pageResult.data]
                    }
                }
            }
            const {pageResult} =  state

            let isSet = false
            const addNewNestedComment = (listComment: any) => {
                if(!listComment || listComment.length == 0 || isSet) return
                for(let comment of listComment) {
                    if(comment.id == parentCommentId) {
                        console.log("why net set")
                        comment.childComments = (comment.childComments) ? [...comment.childComments, payload] : [payload]
                        isSet = true
                        return
                    }
                    addNewNestedComment(comment.childComments)
                }
            }
            addNewNestedComment(pageResult.data)
            console.log("data after set: ", pageResult.data)
            return {
                ...state
            }
        }
        case FETCH_NESTED_COMMENT: {
            const {parentCommentId, payload} = action
            console.log("data send to reducer: ", action)
            const {pageResult} =  state
            console.log("before comment: ", state)
            let isSet = false
            const setComment = (listComment: any) => {
                if(!listComment || listComment.length == 0 || isSet) return
                for(let comment of listComment) {
                    if(comment.id == parentCommentId) {
                        comment.childComments = payload.data
                        isSet = true
                        return
                    }
                    setComment(comment.childComments)
                }
            }
            setComment(pageResult.data)
            console.log("after set comment: ", pageResult.data)
            return {
                ...state,
                pageResult,
                loading: false
            }
 
        }
        case FETCH_PAGE_COMMENT_BEGIN: {
            return {
                ...state,
                loading: true
            }
        }
        case FETCH_PAGE_COMMENT_SUCCESS: {
            return {
                loading: false,
                pageResult: action.payload
            }
        }
        case FETCH_PAGE_COMMENT_FAILED: {
            return {
                ...state,
                loading: false,
                hasError: true,
                message: action.payload.message,
                status: action.payload.status
            }
        }
        default: return state
    }
}

export const updateLikeReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case UPDATE_LIKE_BEGIN: {
            return {
                loading: true
            }
        }
        case UPDATE_LIKE_SUCCESS: {
            return {
                loading: false
            }
        }
        case UPDATE_LIKE_FAILED: {
            return {
                loading: false,
                hasError: true,
                message: action.payload.message,
                status: action.payload.status
            }
        }
        default: return state
    }
}

export const updateVoteReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case UPDATE_VOTE_BEGIN: {
            return {
                loading: true
            }
        }
        case UPDATE_VOTE_SUCCESS: {
            return {
                loading: false
            }
        }
        case UPDATE_VOTE_FAILED: {
            return {
                loading: false,
                hasError: true,
                message: action.payload.message,
                status: action.payload.status
            }
        }
        default: return state
    }
}