import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { GroupResp, UserMemberGroup } from "../../model/groupModel"
import { PostResp } from "../../model/postModel"
import { UserProfileResp } from "../../model/profileModel"
import userMemberGroupService from "../../services/group/userMemberGroupService"
import postService from "../../services/post/postService"
import profileService from "../../services/profile/profileService"
import { PostCard } from "../post/PostCard"
import ProfileHeader from "../profile/ProfileHeader"
import BanUserButton from "./BanUserButton"
import { useGroup } from "./GroupProvider"

export default function GroupUserProfile() {
    const { groupId, userId } = useParams()
    const { group }: any = useGroup()
    const [user, setUser] = useState<UserProfileResp>()
    const [posts, setPosts] = useState<PostResp[]>([])
    const [userMemberDetail, setUserMemberDetails] = useState<UserMemberGroup>()
    const navigate = useNavigate()
    useEffect(() => {
        //@ts-ignore
        profileService.fetchProfileUser(userId).then(res => {
            setUser(res.data.data)
        }).catch(err => {
            console.log("err: ", err)
        })

        postService.getListPostByUserAndGroup(userId, groupId).then(resp => {
            console.log("posts: ", resp.data)
            setPosts(resp.data.data)
        }).catch(err => {
            console.log("err: ", err)
        })


        userMemberGroupService.getInfo(userId, groupId).then(resp => {
            setUserMemberDetails(resp.data.data)
        })

    }, [])



    useEffect(() => {
        if(userMemberDetail && userMemberDetail.isBanned) {
            alert("This user was banned, you can't access.")
            navigate(-1)
        }
    }, [userMemberDetail])



    useEffect(() => {
        window.document.title = user?.firstName + " " + user?.lastName
    }, [user])
    return <>
        <ProfileHeader userProfile={user} btnBan={<>
           <BanUserButton type="BAN" userId={userId}/>
        </>} />
        <hr />
        <div className="row">
            <div className="col-4 sticky-sidebar hide-scrollbar">
                <div className="card mb-3 p-2">
                    <h4>Intro</h4>
                    <span className=""><strong>Joined </strong> group {group?.name} at: {"12-2-2025"}</span>
                </div>
                <div className="card p-2">
                    <h4>Recent activity</h4>
                    <span className=""><strong>Joined </strong> group {group?.name} at: {"12-2-2025"}</span>
                </div>
            </div>
            <div className="col-8">
                <div className="card mb-3">
                    <h4 className="p-2">Group posts</h4>
                </div>
                {posts?.map(post => {
                    return <PostCard post={post} />
                })}
                {posts?.map(post => {
                    return <PostCard post={post} />
                })}
            </div>
        </div>
    </>
}