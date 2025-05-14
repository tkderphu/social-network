import { CommonResult, TokenUtils } from "../../common"
import messageService from "../../services/chat/messageService"
import { FETCH_LIST_MESSAGE_BEGIN, FETCH_LIST_MESSAGE_FAILED, FETCH_LIST_MESSAGE_SUCCESS } from "../constants/chatConstant"

export const fetchListMessageAction = (conversationId: any, querySearch: string) => {
    return (dispatch: any) => {
        dispatch({
            type: FETCH_LIST_MESSAGE_BEGIN
        })
        messageService.getListMessage(conversationId, querySearch).then(resp => {
            const data: CommonResult<any> = resp.data
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