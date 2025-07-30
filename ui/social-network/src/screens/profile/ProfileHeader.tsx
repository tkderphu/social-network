
import { useContext, useEffect, useState } from "react"
import { TokenUtils } from "../../common"
import { UserProfileResp } from "../../model/profileModel"
import ChatButton from "./ChatButton"
import FriendActionButton from "../friend/FriendActionButton"
import "./ProfileHeader.css"
import PostFormModal from "../post/PostFormModal"
import { PostCreateReq } from "../../services/post/postService"
import PostFormCreate from "../post/PostForm"
import { PostCreateReqVO } from "../../model/postModel"
import { ProfileContext } from "./ProfileScreen"
interface Props {
    userProfile?: UserProfileResp,
    btnBan?: any
}
export default function ProfileHeader(props: Props) {
    const userProfile = useContext(ProfileContext)?.userProfile.get
    const friends = useContext(ProfileContext)?.friends?.get
    const countFriends = useContext(ProfileContext)?.countFriends.get
    const [postCoverPhoto, setPostCoverPhoto] = useState<PostCreateReqVO>({
        content: "",
        postPrivacy: "PUBLIC",
        postType: "COVER_PHOTO_UPDATE",
    })

    return (
        <div className="profile-header">
            {/* Cover Photo Section */}
            <div className="cover-photo">
                <PostFormModal
                    title="Update cover photo"
                    disableShowInfo={true}
                    onSubmit={() => { }}
                    form={<PostFormCreate

                        req={{
                            get: postCoverPhoto, set: {
                                init: setPostCoverPhoto,
                                onChange: () => { }
                            }
                        }} type={"NEW"} />} />
            </div>
            {/* Profile Info Section */}
            <div className="profile-info-section">
                <div className="profile-left">
                    {/* Profile Picture */}
                    <img src={userProfile?.avatar} className="profile-picture"></img>
                    {/* Profile Details */}
                    <div className="">
                        <h1 className="profile-name">{userProfile?.firstName + " " + userProfile?.lastName}</h1>
                        <div className="profile-stats">
                            <a href="#">{countFriends || 0} friends</a>
                        </div>
                        {/* Friends Preview */}
                        <div className="friends-preview">
                            {friends?.map(user => {
                                return (
                                    <div className="friend-avatar friend-avatar-3" />
                                )
                            })}
                            {friends.length > 9 && <div className="more-friends">+9</div>}
                        </div>
                    </div>
                </div>
                {/* Action Buttons */}
                <div className="profile-actions">
                    <FriendActionButton className="action-btn btn-primary-custom" />
                    <ChatButton className="action-btn btn-primary-custom text-dark" />
                </div>
            </div>
        </div>

    
    )
}