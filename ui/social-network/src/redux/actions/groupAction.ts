import { CommonResult } from "../../common";
import { GroupCreateReq } from "../../model/groupModel";
import groupService from "../../services/group/groupService";
import { ACCEPT_MEMBER_BEGIN, CREATE_GROUP_BEGIN } from "../constants/groupConstants";

export const createGroupAction = (req: GroupCreateReq) => {
    return (dispatch: any) => {
        dispatch({
            type: CREATE_GROUP_BEGIN
        })
        groupService.createGroup(req).then(response => {
            const data: CommonResult<any> = response.data
            if(data.code == 200) {
                
            }  else {

            }
        }).catch(err => {

        })
    }
}

export const updateGroupSettingAction = () => {
    return (dispatch: any) => {
        dispatch({

        })
    }
}

export const deleteGroupAction = () => {
    return (dispatch: any) => {
        dispatch({
            
        })
    }
}


export const kickMemberAction = () => {
    return (dispatch: any) => {
        dispatch({

        })
    }
}

export const updatePermissionGroupToUser = () => {
    return (dispatch: any) => {
        dispatch({
            
        })
    }
}

export const leaveGroupAction = (groupId: string) => {
    return (dispatch: any) => {
        dispatch({
            
        })
    }
}
export const acceptMemberAction = (groupId: string, memberId: string) => {
    return (dispatch: any) => {
        dispatch({
            type: ACCEPT_MEMBER_BEGIN
        })
        //call api
    }
}
export const denyMemberAction = (groupId: string, memberId: string) => {
    return (dispatch: any) => {
        dispatch({
            
        })
    }
}
export const acceptPostAction = (groupId: string, postId: string) => {

}
export const denyPostAction = (groupId: string, postId: string) => {

}