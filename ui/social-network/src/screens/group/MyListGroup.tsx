import { useEffect, useState } from "react"
import { Link } from "react-router"
import { GroupResp } from "../../model/groupModel"
import groupService from "../../services/group/groupService"
import { formatDate } from "../../utils/common"

export default function MyListGroup() {
    const [groups, setGroups] = useState<GroupResp[]>([])

    useEffect(() => {
        groupService.getListGroupByOwner().then(resp => {
            setGroups(resp.data.data)
        })
    }, [])

    return (
        <>
            <h4>My list group</h4>
            <div className="d-flex flex-wrap">
                {groups.map(group => {
                    return (
                        <>
                            <Link style={{ textDecoration: "none" }} to={`/groups/${group.id}`} className={'btn short-cut-group mb-1 '}>
                                <div className="d-flex align-items-center">
                                    <img src={group.coverPhoto}
                                        width={"120px"}
                                    />
                                    <div className="d-flex flex-column text-start">
                                        <div className='mx-3' style={{ fontSize: "21px" }}>{group.name}</div>
                                        <div className='mx-3 text-muted' style={{ fontSize: "18px" }}><strong>{group.groupType.toLowerCase()}</strong></div>
                                        <div className="mx-3 text-muted">{formatDate(group.createdAt)}</div>
                                    </div>
                                </div>
                            </Link>
                            
                        </>
                    )
                })}
            </div>
        </>
    )
}