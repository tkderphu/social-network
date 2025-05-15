import { CommonResult, TokenUtils } from "../../common"
import conversationService, { ConversationCreateReq } from "../../services/chat/conversationService"
import messageService from "../../services/chat/messageService"
import { CREATE_CONVERSATION_FAILED, CREATE_CONVERSATION_SUCCESS, FETCH_LIST_CONVERSATION_FAILED, FETCH_LIST_CONVERSATION_SUCCESS, FETCH_LIST_MESSAGE_BEGIN, FETCH_LIST_MESSAGE_FAILED, FETCH_LIST_MESSAGE_SUCCESS } from "../constants/chatConstant"

export const fetchListMessageAction = (conversationId: any, querySearch: string) => {
    return (dispatch: any) => {
        dispatch({
            type: FETCH_LIST_MESSAGE_BEGIN
        })
        messageService.getListMessage(conversationId, querySearch).then(resp => {
            const data: CommonResult<any> = resp.data
            console.log("data response list message: ", data)
            if (data.code == 200) {
               dispatch({
                    type: FETCH_LIST_MESSAGE_SUCCESS,
                    payload: data.data
               })
            } else {
                console.log("err: ", data)
                dispatch({
                    type: FETCH_LIST_MESSAGE_FAILED,
                    payload: {
                        message: data.message,
                        status: data.code
                    }
                })
            }
        }).catch(err => {
            if(err.status === 401) {
                TokenUtils.clearToken()
            }
            dispatch({
                type: FETCH_LIST_MESSAGE_FAILED,
                payload: {
                    message: err.response.data,
                    status: err.status
                }
            })
        })
    }
}


export const createConversationAction = (req: ConversationCreateReq) => {
    return (dispatch: any) => {
        conversationService.createConversation(req).then(resp => {
            const data: CommonResult<any> = resp.data
            console.log("create conversation ok: ", data)
            if (data.code == 200) {
               dispatch({
                    type: CREATE_CONVERSATION_SUCCESS,
                    payload: data.data
               })
            } else {
                dispatch({
                    type: CREATE_CONVERSATION_FAILED,
                    payload: {
                        message: data.message,
                        status: data.code
                    }
                })
            }
        }).catch(err => {
            console.log("err conversation list: ", err)
            if(err.status === 401) {
                TokenUtils.clearToken()
            }
            dispatch({
                type: CREATE_CONVERSATION_FAILED,
                payload: {
                    message: err.response.data,
                    status: err.status
                }
            })
        })
    }
}




export const fetchListConversationAction = () => {
    return (dispatch: any) => {
        console.log("fetch conversation")
        conversationService.getListConversation().then(resp => {
            const data: CommonResult<any> = resp.data
            console.log("data response from conversation: ", data)
            if (data.code == 200) {
               dispatch({
                    type: FETCH_LIST_CONVERSATION_SUCCESS,
                    payload: data.data
               })
            } else {
                dispatch({
                    type: FETCH_LIST_CONVERSATION_FAILED,
                    payload: {
                        message: data.message,
                        status: data.code
                    }
                })
            }
        }).catch(err => {
            console.log("err conversation list: ", err)
            if(err.status === 401) {
                TokenUtils.clearToken()
            }
            dispatch({
                type: FETCH_LIST_CONVERSATION_FAILED,
                payload: {
                    message: err.response.data,
                    status: err.status
                }
            })
        })
    }
}

