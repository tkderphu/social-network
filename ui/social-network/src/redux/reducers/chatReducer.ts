import { ac } from "react-router/dist/development/route-data-BmvbmBej"
import { FETCH_LIST_MESSAGE_BEGIN, FETCH_LIST_MESSAGE_FAILED, FETCH_LIST_MESSAGE_SUCCESS } from "../constants/chatConstant"

export const fetchListMessageReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case FETCH_LIST_MESSAGE_BEGIN: {
            return {
                loading: true,
            }
        }
        case FETCH_LIST_MESSAGE_SUCCESS: {
            return {
                loading: false,
                messages: action.payload
            }
        }
        case FETCH_LIST_MESSAGE_FAILED: {
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