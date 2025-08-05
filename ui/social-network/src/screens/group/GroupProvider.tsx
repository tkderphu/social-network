import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { GroupResp, UserMemberGroup } from "../../model/groupModel";
import groupService from "../../services/group/groupService";

const GroupContext = createContext(undefined)
interface Props {
    children: any
}
export const useGroup = () => {
    return useContext(GroupContext)
}
export default function GroupProvider(props: Props) {
    const [group, setGroup] = useState<GroupResp>()
    const [currentMember, setCurrentMember] = useState<UserMemberGroup>()
    const [members, setMembers] = useState<UserMemberGroup[]>()
    return (
        <GroupContext.Provider value={{
            group, setGroup, currentMember, setCurrentMember, members, setMembers
        }}>
            {props.children}
        </GroupContext.Provider>
    )
}