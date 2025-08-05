import { useEffect } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import { TokenUtils } from "../../common";
import groupService from "../../services/group/groupService";
import userMemberGroupService from "../../services/group/userMemberGroupService";
import { useGroup } from "./GroupProvider";

export default function GroupWrapper() {
    const { groupId } = useParams()
    const { setGroup, setCurrentMember,group, currentMember } = useGroup()
    const navigate = useNavigate()


    if (currentMember && currentMember.isBanned) {
        console.log("===================================================================================================================")
        // alert("--")
        navigate(-1)
        return
    }


    useEffect(() => {
        groupService.getDetailGroup(groupId).then(resp => {
            console.log("fetch group from wrapper: ", resp.data)
            setGroup(resp.data.data)
        })

        userMemberGroupService.getInfo(TokenUtils.authLogin.userId, groupId).then(resp => {
            setCurrentMember(resp.data.data)
        }).catch(err => {
            console.log("fetch current member error")
        })

    }, [groupId])




    return <Outlet />
}