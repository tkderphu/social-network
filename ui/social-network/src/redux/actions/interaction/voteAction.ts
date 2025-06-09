import { CommonResult } from "../../../common";
import voteService, { VoteUpdateReq } from "../../../services/interaction/voteService";
import {  UPDATE_VOTE_BEGIN, UPDATE_VOTE_FAILED, UPDATE_VOTE_SUCCESS } from "../../constants/interactionConstant";

export const updateVote = (req: VoteUpdateReq) => {
    return (dispatch: any) => {
        dispatch({
            type: UPDATE_VOTE_BEGIN
        })
        voteService.updateVote(req).then(resp => {
            const data: CommonResult<any> = resp.data
            console.log("update vote ok: ", data.data)
            if (data.code === 200) {
                dispatch({
                    type: UPDATE_VOTE_SUCCESS
                })
                // dispatch(fetchScoreVote(req.objectId, req.objectType))
                // dispatch(checkVote(req.objectId, req.objectType))
            } else {
                dispatch({
                    type: UPDATE_VOTE_FAILED,
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
                type: UPDATE_VOTE_FAILED,
                payload: {
                    message: err.response?.data?.error || err.response?.data?.message || err?.response?.data,
                    status: err.status
                }
            })
        })
    }
}
