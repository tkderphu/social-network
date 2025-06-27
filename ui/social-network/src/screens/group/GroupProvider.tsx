import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { GroupResp } from "../../model/groupModel";
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

    return (
        <GroupContext.Provider value={{
            group, setGroup
        }}>
            {props.children}
        </GroupContext.Provider>
    )
}