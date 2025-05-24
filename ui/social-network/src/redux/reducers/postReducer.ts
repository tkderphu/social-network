
import { CREATE_POST_BEGIN, CREATE_POST_FAILED, CREATE_POST_SUCCESS, FETCH_LIST_POST_BY_USER_BEGIN, FETCH_LIST_POST_BY_USER_FAILED, FETCH_LIST_POST_BY_USER_SUCCESS } from "../constants/postConstant";

export const createPostReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case CREATE_POST_BEGIN: {
            return {
                loading: true
            }
        }
        case CREATE_POST_SUCCESS: {
            return {
                loading: false,
                success: true,
                post: action.payload
            }
        }
        case CREATE_POST_FAILED: {
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

export const fetchListPostByUserReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case FETCH_LIST_POST_BY_USER_BEGIN: {
            return {
                loading: true
            }
        }
        case FETCH_LIST_POST_BY_USER_SUCCESS: {
            return {
                loading: false,
                pageResult: action.payload
            }
        }
        case FETCH_LIST_POST_BY_USER_FAILED: {
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