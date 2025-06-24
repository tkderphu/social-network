import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { PageResult } from "../../common";
import SearchComponent from "../../components/searchInput/SearchComponent";
import { UserProfileResp } from "../../model/profileModel";
import { UserResp } from "../../services/friendship/friendshipService";
import groupService from "../../services/group/groupService";
import userMemberGroupService from "../../services/group/userMemberGroupService";
import profileService from "../../services/profile/profileService";
import { convertToHeader } from "../../utils/utils";

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
    const { name } = useParams()
    useEffect(() => {
        console.log("start search members......................")
        userMemberGroupService.getListMemberByGroup(name, pageResult.page, pageResult.limit).then(resp => {
            const pageResultResp: PageResult<any> = resp.data.data;
            setPageResult((prev) => ({
                ...pageResultResp,
                data: [...prev.data, ...pageResultResp.data]
            }))
        }).catch(err => {
            console.log("get members from group: " + name + " orrcured error: ", err)
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
                                <Link to={`profile/${1}`} style={{ textDecoration: "none" }} >{convertToHeader(member.user.firstName + " " + member.user.lastName)}</Link>
                            </div>
                            <button className="mt-2 btn btn-primary">Add Friend</button>
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