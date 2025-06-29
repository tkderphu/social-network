import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { PageResult, TokenUtils } from "../../common";
import SearchComponent from "../../components/searchInput/SearchComponent";
import { GroupResp } from "../../model/groupModel";
import { UserProfileResp } from "../../model/profileModel";
import { UserResp } from "../../services/friendship/friendshipService";
import groupService from "../../services/group/groupService";
import userMemberGroupService from "../../services/group/userMemberGroupService";
import profileService from "../../services/profile/profileService";
import { convertToHeader } from "../../utils/utils";
import { useGroup } from "./GroupProvider";

export default function GroupMember() {
    const [pageResult, setPageResult] = useState<PageResult<{
        user: UserResp,
        groupRole: any,
        timeAgo: string,
        id: any
    }>>({
        limit: 50,
        page: 1,
        data: [],
        totalPage: 0
    })
    const {group}: any  = useGroup()
    const [memberRoles, setMemberRoles] = useState<any>({})
    const { groupId } = useParams()
    useEffect(() => {
        console.log("start search members......................")
        userMemberGroupService.getListMemberByGroup(groupId, pageResult.page, pageResult.limit).then(resp => {
            const pageResultResp: PageResult<any> = resp.data.data;
            console.log("data resp: ", pageResultResp)
            setPageResult((prev) => ({
                ...prev,
                data: [...prev.data, ...pageResultResp.data]
            }))
        }).catch(err => {
            console.log("get members from group: " + groupId + " orrcured error: ", err)
        })
    }, [pageResult.page])
    return (
        <>
            <div className="form-input mt-3">
                <SearchComponent
                    handleSearch={(query: string, page: number, limit: number, setResult: any) => {

                    }}
                    placeholder={"Search members"}

                />
            </div>
            <div className="d-flex flex-wrap mt-3">

                {pageResult.data.map(member => {
                    return (
                        <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                            <div>
                                <img src={member.user.avatar}
                                    className="rounded" alt="..."
                                    height={"150px"} width={"150px"}
                                />
                            </div>
                            <div className="text-center mt-1">
                                <Link to={`/groups/${group.id}/profile/${member.user.id}`} style={{ textDecoration: "none" }} >{convertToHeader(member.user.firstName + " " + member.user.lastName)}</Link>
                            </div>
                            {group.owner?.id === TokenUtils.authLogin.userId? (
                                <select className="form-select mt-3" value={memberRoles[member.id] || member.groupRole}  onChange={(e) => {
                                    setMemberRoles((prev: any) => ({
                                        ...prev,
                                        [member.id]: e.target.value
                                    }))
                                    userMemberGroupService.updatePermissionToUser(name, member.user.id, e.target.value)
                                    .then((resp) => console.log("data resp: ", resp))
                                    .catch(err => console.log("err update role: ", err))
                                }}>
                                    <option value={"OWNER"}>Owner</option>
                                    <option value={"REVIEWER"}>Reviewer</option>
                                    <option value={"MEMBER"}>Member</option>
                                </select>
                            ) : (
                                <div className="text-center mt-1" style={{
                                    color: `${member.groupRole == "MEMBER" ? "dark" : (member.groupRole == "OWNER" ? "red" : "blue")}`
                                }}>{convertToHeader(member.groupRole)}</div>
                            )}
                        </div>
                    )
                })}
            </div>
            {pageResult.totalPage > pageResult.page && (
                <div className="d-flex justify-content-center">
                    {<button className="btn btn-outline-secondary w-50" onClick={() => {
                        setPageResult((prev) => ({
                            ...prev,
                            page: prev.page + 1
                        }))
                    }}>Next</button>}
                </div>
            )}
        </>
    )
}