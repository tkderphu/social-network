import { CREATE_COMMENT_BEGIN, CREATE_COMMENT_FAILED, CREATE_COMMENT_SUCCESS, FETCH_PAGE_COMMENT_BY_POST_BEGIN, FETCH_PAGE_COMMENT_BY_POST_FAILED, FETCH_PAGE_COMMENT_BY_POST_SUCCESS, UPDATE_LIKE_BEGIN, UPDATE_LIKE_FAILED, UPDATE_LIKE_SUCCESS } from "../constants/interactionConstant"

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
                comment: state.payload
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


export const fetchPageCommentByPostReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case FETCH_PAGE_COMMENT_BY_POST_BEGIN: {
            return {
                loading: true
            }
        }
        case FETCH_PAGE_COMMENT_BY_POST_SUCCESS: {
            return {
                loading: false,
                pageResult: state.payload
            }
        }
        case FETCH_PAGE_COMMENT_BY_POST_FAILED: {
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