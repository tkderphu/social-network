import { useContext, useEffect, useState } from "react"
import { Link, Outlet, useParams } from "react-router"
import { toast } from "react-toastify"
import { CommonResult, TokenUtils } from "../../common"
import Spinner from "../../components/Spinner"
import { GroupResp } from "../../model/groupModel"
import { PostResp } from "../../model/postModel"
import { UserProfileResp } from "../../model/profileModel"
import groupService from "../../services/group/groupService"
import userMemberGroupService from "../../services/group/userMemberGroupService"
import postService from "../../services/post/postService"
import { PostCard } from "../post/PostCard"
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
    const [userWaitings, setUserWaitings] = useState<{
        user: UserProfileResp,
        id: any,
        timeAgo: any
    }[]>([])

    const { groupId } = useParams()

    useEffect(() => {
        userMemberGroupService.getListPendingUser(groupId, 1, 100).then(resp => {
            setUserWaitings(resp.data.data)
        }).catch(err => {
            console.log("err: ", err)
        })
    }, [location.href])

    const filterUserWaiting = (userId: any) => {
        setUserWaitings(userWaitings.filter(waiting => {
            return waiting.user.id != userId
        }))
    }

    const handleReject = (userId: any) => {
        userMemberGroupService.rejectUser(groupId, userId).then(resp => {
            filterUserWaiting(userId)
        }).catch(err => {
            alert("err delete")
        })
    }

    const handleAccept = (userId: any) => {
        userMemberGroupService.acceptUser(groupId, userId).then(resp => {
            filterUserWaiting(userId)
        }).catch(err => {
            alert('err accept')
        })
    }

    return (
        <div className="d-flex flex-wrap mt-3">
            {userWaitings?.map(userWaiting => {
                return (

                    <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                        <div className="d-flex flex-column text-center">
                            <img src={userWaiting.user.avatar}
                                className="rounded" alt="..."
                                height={"150px"} width={"150px"}
                            />
                            <span>Requested: {userWaiting.timeAgo} ago</span>
                        </div>
                        <div className="text-center mt-1">
                            <Link to={`/friends/profile/${userWaiting.user.id}`} style={{ textDecoration: "none" }} >{userWaiting.user.firstName + " " + userWaiting.user.lastName}</Link>
                        </div>
                        <div className="d-flex mt-2 ">
                            <button className="btn btn-primary rounded-0 w-100" onClick={() => handleAccept(userWaiting.user.id)}>Accept</button>
                            <button className="btn btn-danger rounded-0 w-100" onClick={() => handleReject(userWaiting.user.id)}>Reject</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export function PendingPost() {
    const { groupId } = useParams()

    const [fetchPostState, setFetchPostState] = useState<{
        posts: PostResp[],
        loading: boolean,
        message: string,
        error: boolean,
        page: number,
        limit: number
    }>({
        error: false,
        loading: true,
        message: "",
        posts: [],
        page: 1,
        limit: 100
    })


    useEffect(() => {
        postService.getListPostPendingInGroup(groupId, fetchPostState.page, fetchPostState.limit)
            .then(resp => {
                console.log("data: ", resp)
                const result: CommonResult<any> = resp.data
                if (result.code == 200) {
                    setFetchPostState((prev) => ({
                        ...prev,
                        loading: false,
                        posts: result.data
                    }))

                } else {
                    setFetchPostState((prev) => ({
                        ...prev,
                        loading: false,
                        error: true,
                        message: result.message
                    }))
                }
            }).catch(err => {
                setFetchPostState((prev) => ({
                    ...prev,
                    loading: false,
                    error: true,
                    message: "Please see console"
                }))
                console.log("err: ", err)
            })
    }, [])


    if (fetchPostState?.error) {
        toast.error(fetchPostState.message)
        return
    }

    console.log("fuck: ", fetchPostState)

    if (fetchPostState.loading) {
        return <Spinner loading={fetchPostState.loading} />
    }

    return (
        <>
            {fetchPostState.posts.map(post => {
                return <div className="card mb-4">
                    <PostCard post={post} ref={`/groups/${groupId}/user/${post?.user?.id}`} />
                    <div className="d-flex">
                        <button className="btn rounded-0 btn-primary w-100">Accept</button>
                        <button className="btn btn-danger rounded-0 w-100">Reject</button>
                    </div>
                </div>
            })}
        </>
    )

}


export function GroupSetting() {
    const group: GroupResp = useGroup().group


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
        groupService.updateGroupSetting(group.id, req).then(() => {
            toast.info("Update setting succesfully")
        }).catch(err => {
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