import { useContext, useEffect, useState } from "react"
import { Link, Outlet } from "react-router"
import { GroupResp } from "../../model/groupModel"
import groupService from "../../services/group/groupService"
import { GroupContext } from "./GroupDetails"
import { useGroup } from "./GroupProvider"

const GROUP_MANAGEMENT = [

    {
        name: "User pending",
        path: "pending/user"
    },
    {
        name: "Post pending",
        path: "pending/post"
    },
    {
        name: "Setting",
        path: "setting"
    },
]

export function PendingUser() {
    return (
        <div className="d-flex flex-wrap mt-3">

            <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                <div>
                    <img src="https://wibu.com.vn/wp-content/uploads/2024/05/songoku.jpg"
                        className="rounded" alt="..."
                        height={"150px"} width={"150px"}
                    />
                </div>
                <div className="text-center mt-1">
                    <Link to={`/friends/profile/${1}`} style={{ textDecoration: "none" }} >Phu Quang</Link>
                </div>
                <button className="mt-2 btn btn-primary">Add Friend</button>
            </div>
            <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                <div>
                    <img src="https://wibu.com.vn/wp-content/uploads/2024/05/songoku.jpg"
                        className="rounded" alt="..."
                        height={"150px"} width={"150px"}
                    />
                </div>
                <div className="text-center mt-1">
                    <Link to={`/friends/profile/${1}`} style={{ textDecoration: "none" }} >Phu Quang</Link>
                </div>
                <button className="mt-2 btn btn-primary">Add Friend</button>
            </div>
            <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                <div>
                    <img src="https://wibu.com.vn/wp-content/uploads/2024/05/songoku.jpg"
                        className="rounded" alt="..."
                        height={"150px"} width={"150px"}
                    />
                </div>
                <div className="text-center mt-1">
                    <Link to={`/friends/profile/${1}`} style={{ textDecoration: "none" }} >Phu Quang</Link>
                </div>
                <button className="mt-2 btn btn-primary">Add Friend</button>
            </div>
            <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                <div>
                    <img src="https://wibu.com.vn/wp-content/uploads/2024/05/songoku.jpg"
                        className="rounded" alt="..."
                        height={"150px"} width={"150px"}
                    />
                </div>
                <div className="text-center mt-1">
                    <Link to={`/friends/profile/${1}`} style={{ textDecoration: "none" }} >Phu Quang</Link>
                </div>
                <button className="mt-2 btn btn-primary">Add Friend</button>
            </div>
            <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                <div>
                    <img src="https://wibu.com.vn/wp-content/uploads/2024/05/songoku.jpg"
                        className="rounded" alt="..."
                        height={"150px"} width={"150px"}
                    />
                </div>
                <div className="text-center mt-1">
                    <Link to={`/friends/profile/${1}`} style={{ textDecoration: "none" }} >Phu Quang</Link>
                </div>
                <button className="mt-2 btn btn-primary">Add Friend</button>
            </div>
            <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                <div>
                    <img src="https://wibu.com.vn/wp-content/uploads/2024/05/songoku.jpg"
                        className="rounded" alt="..."
                        height={"150px"} width={"150px"}
                    />
                </div>
                <div className="text-center mt-1">
                    <Link to={`/
                                friends/profile/${1}`} style={{ textDecoration: "none" }} >Phu Quang</Link>
                </div>
                <button className="mt-2 btn btn-primary">Add Friend</button>
            </div>
            <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                <div>
                    <img src="https://wibu.com.vn/wp-content/uploads/2024/05/songoku.jpg"
                        className="rounded" alt="..."
                        height={"150px"} width={"150px"}
                    />
                </div>
                <div className="text-center mt-1">
                    <Link to={`/
                                friends/profile/${1}`} style={{ textDecoration: "none" }} >Phu Quang</Link>
                </div>
                <button className="mt-2 btn btn-primary">Add Friend</button>
            </div>
            <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                <div>
                    <img src="https://wibu.com.vn/wp-content/uploads/2024/05/songoku.jpg"
                        className="rounded" alt="..."
                        height={"150px"} width={"150px"}
                    />
                </div>
                <div className="text-center mt-1">
                    <Link to={`/
                                friends/profile/${1}`} style={{ textDecoration: "none" }} >Phu Quang</Link>
                </div>
                <button className="mt-2 btn btn-primary">Add Friend</button>
            </div>
            <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                <div>
                    <img src="https://wibu.com.vn/wp-content/uploads/2024/05/songoku.jpg"
                        className="rounded" alt="..."
                        height={"150px"} width={"150px"}
                    />
                </div>
                <div className="text-center mt-1">
                    <Link to={`/
                                friends/profile/${1}`} style={{ textDecoration: "none" }} >Phu Quang</Link>
                </div>
                <button className="mt-2 btn btn-primary">Add Friend</button>
            </div>
            <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                <div>
                    <img src="https://wibu.com.vn/wp-content/uploads/2024/05/songoku.jpg"
                        className="rounded" alt="..."
                        height={"150px"} width={"150px"}
                    />
                </div>
                <div className="text-center mt-1">
                    <Link to={`/
                                friends/profile/${1}`} style={{ textDecoration: "none" }} >Phu Quang</Link>
                </div>
                <button className="mt-2 btn btn-primary">Add Friend</button>
            </div>
            <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                <div>
                    <img src="https://wibu.com.vn/wp-content/uploads/2024/05/songoku.jpg"
                        className="rounded" alt="..."
                        height={"150px"} width={"150px"}
                    />
                </div>
                <div className="text-center mt-1">
                    <Link to={`/
                                friends/profile/${1}`} style={{ textDecoration: "none" }} >Phu Quang</Link>
                </div>
                <button className="mt-2 btn btn-primary">Add Friend</button>
            </div>
            <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                <div>
                    <img src="https://wibu.com.vn/wp-content/uploads/2024/05/songoku.jpg"
                        className="rounded" alt="..."
                        height={"150px"} width={"150px"}
                    />
                </div>
                <div className="text-center mt-1">
                    <Link to={`/
                                friends/profile/${1}`} style={{ textDecoration: "none" }} >Phu Quang</Link>
                </div>
                <button className="mt-2 btn btn-primary">Add Friend</button>
            </div>
        </div>
    )
}

export function PendingPost() {

}


export function GroupSetting() {
    const {group}: any  = useGroup()

    const [req, setReq] = useState<{
        enableAutoAcceptMember?: boolean,
        enableAutoReviewPost?: boolean,
        enableNotificationWhenUserRequest?: boolean,
        enableNotificationWhenNewPostComing?: boolean
    }>({

    })

    useEffect(() => {
        if (group) {
            setReq({
                enableAutoAcceptMember: group.enableAutoAcceptMember,
                enableAutoReviewPost: group.enableAutoReviewPost,
                enableNotificationWhenNewPostComing: group.enableNotificationWhenNewPostComing,
                enableNotificationWhenUserRequest: group.enableNotificationWhenUserRequest
            })
        }
    }, [group])
    const onChangeChecked = (e: any) => {
        const { name, checked } = e.target

        setReq((prev: any) => ({
            ...prev,
            [name]: checked
        }))
    }

    const handleSubmit = () => {
        console.log("data req: ", req)
        groupService.updateGroupSetting(group.id, req).then(() => {}).catch(err => {
            console.log('err: update setting: ', err)
        })
    }


    return (
        <>
            <div className="form-check form-switch mb-2" style={{ fontSize: "18px" }}>
                <label className="form-check-label" htmlFor="member">Enable auto accept members</label>
                <input className="form-check-input" type="checkbox" id="member"
                    name="enableAutoAcceptMember"
                    checked={req?.enableAutoAcceptMember}
                    onChange={onChangeChecked}
                />

                <div className="text-muted">Description: Auto accept users when they request to join group</div>
            </div>
            <div className="form-check form-switch mb-2" style={{ fontSize: "18px" }}>
                <label className="form-check-label" htmlFor="post">Enable auto accept posts</label>
                <input className="form-check-input" type="checkbox" id="post"

                    checked={req?.enableAutoReviewPost}
                    onChange={onChangeChecked}
                    name={"enableAutoReviewPost"}
                />
                <div className="text-muted">Description: Auto accept posts when they are created in group</div>

            </div>
            <div className="form-check form-switch mb-2" style={{ fontSize: "18px" }}>
                <label className="form-check-label" htmlFor="user-notify">Enable notification when new user request join group</label>
                <input className="form-check-input" type="checkbox" id="user-notify"
                    checked={req?.enableNotificationWhenUserRequest}
                    name="enableNotificationWhenUserRequest"
                    onChange={onChangeChecked} />
                <div className="text-muted">Description: Notify to administrator of group when users request to join group</div>

            </div>
            <div className="form-check form-switch mb-2" style={{ fontSize: "18px" }}>
                <label className="form-check-label" htmlFor="post-notify">Enable notification when new post is created in group</label>
                <input className="form-check-input" type="checkbox" id="post-notify"
                    checked={req?.enableNotificationWhenNewPostComing}
                    name="enableNotificationWhenNewPostComing"
                    onChange={onChangeChecked} />
                <div className="text-muted">Description: Notify to administrator of group when new post is created in group</div>
            </div>
            <button className="btn btn-secondary w-50" onClick={handleSubmit}>Submit</button>
        </>
    )
}

export default function GroupManagement() {
    const [selectedGroup, setSelectedGroup] = useState("pending/user")
    return (
        <>
            <div className="row mt-2">
                <div className="col-3">
                    <div className='sticky-sidebar hide-scrollbar'>
                        {GROUP_MANAGEMENT.map(fake => {
                            return (
                                <Link onClick={() => {
                                    setSelectedGroup(fake.path)
                                }} style={{ textDecoration: "none" }} to={fake.path} className={'btn  d-flex align-items-center ' + (fake.path == selectedGroup ? "btn-secondary" : "")}>

                                    <div className='mx-3' style={{ fontSize: "23px" }}>{fake.name}</div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
                <div className="col-9">
                    <Outlet />
                </div>
            </div>
        </>
    )
}