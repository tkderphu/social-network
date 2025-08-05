import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import { UserMemberGroup } from "../../model/groupModel"
import userMemberGroupService from "../../services/group/userMemberGroupService"
import { convertToHeader } from "../../utils/utils"
import BanUserButton from "./BanUserButton"

export default function UsersWereBanned() {
    const { groupId } = useParams()
    const [userMembers, setUserMembers] = useState<UserMemberGroup[]>([])


    useEffect(() => {
        userMemberGroupService.getListMemberIsBanned(groupId).then(resp => {
            setUserMembers(resp.data.data)
        }).catch(err => {
            alert("Please see console for UsersWereBanned")
            console.log("err: ", err)
        })
    }, [groupId])

    return (
        <div className="col-12 d-flex flex-wrap">
            {userMembers.map(member => {
                return (
                    <>
                        <div className="col-3">
                            <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                                <div>
                                    <img src={member.user.avatar}
                                        className="rounded" alt="..."
                                        height={"150px"} width={"150px"}
                                    />
                                </div>
                                <div className="text-center mt-1">
                                    <Link to={`/groups/${groupId}/profile/${member.user.id}`} style={{ textDecoration: "none" }} >{convertToHeader(member.user.firstName + " " + member.user.lastName)}</Link>
                                </div>
                                <div className="text-center mt-1 mb-2" style={{
                                    color: `${member.groupRole == "MEMBER" ? "dark" : (member.groupRole == "OWNER" ? "red" : "blue")}`
                                }}>{convertToHeader(member.groupRole)}</div>
                                <BanUserButton type="UNBAN" userId={member.user.id}/>
                            </div>
                        </div>
                        
                        <div className="col-3">
                            <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                                <div>
                                    <img src={member.user.avatar}
                                        className="rounded" alt="..."
                                        height={"150px"} width={"150px"}
                                    />
                                </div>
                                <div className="text-center mt-1">
                                    <Link to={`/groups/${groupId}/profile/${member.user.id}`} style={{ textDecoration: "none" }} >{convertToHeader(member.user.firstName + " " + member.user.lastName)}</Link>
                                </div>
                                <div className="text-center mt-1" style={{
                                    color: `${member.groupRole == "MEMBER" ? "dark" : (member.groupRole == "OWNER" ? "red" : "blue")}`
                                }}>{convertToHeader(member.groupRole)}</div>
                            </div>

                        </div>
                        
                        <div className="col-3">
                            <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                                <div>
                                    <img src={member.user.avatar}
                                        className="rounded" alt="..."
                                        height={"150px"} width={"150px"}
                                    />
                                </div>
                                <div className="text-center mt-1">
                                    <Link to={`/groups/${groupId}/profile/${member.user.id}`} style={{ textDecoration: "none" }} >{convertToHeader(member.user.firstName + " " + member.user.lastName)}</Link>
                                </div>
                                <div className="text-center mt-1" style={{
                                    color: `${member.groupRole == "MEMBER" ? "dark" : (member.groupRole == "OWNER" ? "red" : "blue")}`
                                }}>{convertToHeader(member.groupRole)}</div>
                            </div>

                        </div>
                        
                        <div className="col-3">
                            <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                                <div>
                                    <img src={member.user.avatar}
                                        className="rounded" alt="..."
                                        height={"150px"} width={"150px"}
                                    />
                                </div>
                                <div className="text-center mt-1">
                                    <Link to={`/groups/${groupId}/profile/${member.user.id}`} style={{ textDecoration: "none" }} >{convertToHeader(member.user.firstName + " " + member.user.lastName)}</Link>
                                </div>
                                <div className="text-center mt-1" style={{
                                    color: `${member.groupRole == "MEMBER" ? "dark" : (member.groupRole == "OWNER" ? "red" : "blue")}`
                                }}>{convertToHeader(member.groupRole)}</div>
                            </div>

                        </div>
                        <div className="col-3">
                            <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                                <div>
                                    <img src={member.user.avatar}
                                        className="rounded" alt="..."
                                        height={"150px"} width={"150px"}
                                    />
                                </div>
                                <div className="text-center mt-1">
                                    <Link to={`/groups/${groupId}/profile/${member.user.id}`} style={{ textDecoration: "none" }} >{convertToHeader(member.user.firstName + " " + member.user.lastName)}</Link>
                                </div>
                                <div className="text-center mt-1" style={{
                                    color: `${member.groupRole == "MEMBER" ? "dark" : (member.groupRole == "OWNER" ? "red" : "blue")}`
                                }}>{convertToHeader(member.groupRole)}</div>
                            </div>

                        </div>
                        <div className="col-3">
                            <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                                <div>
                                    <img src={member.user.avatar}
                                        className="rounded" alt="..."
                                        height={"150px"} width={"150px"}
                                    />
                                </div>
                                <div className="text-center mt-1">
                                    <Link to={`/groups/${groupId}/profile/${member.user.id}`} style={{ textDecoration: "none" }} >{convertToHeader(member.user.firstName + " " + member.user.lastName)}</Link>
                                </div>
                                <div className="text-center mt-1" style={{
                                    color: `${member.groupRole == "MEMBER" ? "dark" : (member.groupRole == "OWNER" ? "red" : "blue")}`
                                }}>{convertToHeader(member.groupRole)}</div>
                            </div>

                        </div>
                        <div className="col-3">
                            <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                                <div>
                                    <img src={member.user.avatar}
                                        className="rounded" alt="..."
                                        height={"150px"} width={"150px"}
                                    />
                                </div>
                                <div className="text-center mt-1">
                                    <Link to={`/groups/${groupId}/profile/${member.user.id}`} style={{ textDecoration: "none" }} >{convertToHeader(member.user.firstName + " " + member.user.lastName)}</Link>
                                </div>
                                <div className="text-center mt-1" style={{
                                    color: `${member.groupRole == "MEMBER" ? "dark" : (member.groupRole == "OWNER" ? "red" : "blue")}`
                                }}>{convertToHeader(member.groupRole)}</div>
                            </div>

                        </div>
                        <div className="col-3">
                            <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                                <div>
                                    <img src={member.user.avatar}
                                        className="rounded" alt="..."
                                        height={"150px"} width={"150px"}
                                    />
                                </div>
                                <div className="text-center mt-1">
                                    <Link to={`/groups/${groupId}/profile/${member.user.id}`} style={{ textDecoration: "none" }} >{convertToHeader(member.user.firstName + " " + member.user.lastName)}</Link>
                                </div>
                                <div className="text-center mt-1" style={{
                                    color: `${member.groupRole == "MEMBER" ? "dark" : (member.groupRole == "OWNER" ? "red" : "blue")}`
                                }}>{convertToHeader(member.groupRole)}</div>
                            </div>

                    </div>
                    </>
                )
            })}
        </div>
    )
}