import { useContext } from "react"
import { GroupResp } from "../../model/groupModel"
import { convertToHeader } from "../../utils/utils"
import { GroupContext } from "./GroupDetails"

export default function GroupAbout() {
    const group: GroupResp  = useContext(GroupContext) 
    return (
        <>
            {/* About Box */}
            <div className="card p-3 mt-1 mb-5 rounded">
                <p>
                    {group?.description}
                </p>
                <p className="mb-2">
                    <strong>{convertToHeader(group?.groupType)}</strong><br />
                    {group?.groupType == "PRIVATE" ? "Only users who joined this group can see who's in the group and what they post." : "Anyone can see who's in the group and what they post."}
                </p>
                <p className="">
                    <strong>Visible</strong><br />
                    Anyone can find this group.
                </p>
            </div>
        </>
    )
}