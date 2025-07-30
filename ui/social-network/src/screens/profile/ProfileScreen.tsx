

import { createContext, useContext, useEffect, useId, useState } from 'react'
import "./Profile.css"

import { Link, Outlet, useParams } from "react-router"
import profileService from '../../services/profile/profileService'
import { ProfileSimpleResp, UserProfileResp } from '../../model/profileModel'
import { MediaRespVO } from '../../model/mediaModel'
import friendshipService from '../../services/friendship/friendshipService'
import mediaService from '../../services/media/mediaService'
import FriendActionButton from '../friend/FriendActionButton'
import ChatButton from './ChatButton'
import PostFormModal from '../post/PostFormModal'
import PostFormCreate from '../post/PostForm'
import { PostCreateReqVO } from '../../model/postModel'

const nav = [
    "Posts",
    "Friends",
    "Photos"
]




interface Model {
    friends?: {
        get: ProfileSimpleResp[],
        set: any
    }
    checkHasEstablishedConversation?: {
        get: string,
        set: any
    },
    userProfile: {
        get?: UserProfileResp,
        set: any
    },
    countFriends: {
        get: number,
        set: any
    },
    photos: {
        get: MediaRespVO[],
        set: any
    }
}
export const ProfileContext = createContext<Model | undefined>(undefined)


interface Props {
    show?: {
      
        navbar?: boolean
        content?: boolean
    }
}

function ProfileScreen(props: Props) {
    const [useNav, setUseNav] = useState("Posts");
    const [friends, setFriends] = useState([])
    const [checkHasEstablishedConversation, setCheckHasEstablishedConversation] = useState("")
    const [countFriends, setCountFriends] = useState(0)
    const [medias, setMedias] = useState<MediaRespVO[]>([])
    const [postCoverPhoto, setPostCoverPhoto] = useState<PostCreateReqVO>({
        content: "",
        postPrivacy: "PUBLIC",
        postType: "COVER_PHOTO_UPDATE",
    })

    const { userId } = useParams()

    const [userProfileDetail, setUserProfileDetail] = useState<UserProfileResp>()

    useEffect(() => {

        if (!userId) return;

        friendshipService.countFriends(userId, setCountFriends)
        console.log("userId fuck: ", userId)

        mediaService.getListMedia("user", userId + "", setMedias);

        profileService.getUserDetailByUserId(userId, setUserProfileDetail)

    }, [userId])




    return <ProfileContext.Provider value={{
        userProfile: {
            get: userProfileDetail,
            set: setUserProfileDetail
        },
        photos: {
            get: medias,
            set: setMedias
        },
        checkHasEstablishedConversation: {
            get: checkHasEstablishedConversation,
            set: setCheckHasEstablishedConversation
        },
        friends: {
            get: friends,
            set: setFriends
        },
        countFriends: {
            get: countFriends,
            set: setCountFriends
        }
    }}>
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
                    <img src={userProfileDetail?.avatar} className="profile-picture"></img>
                    {/* Profile Details */}
                    <div className="">
                        <h1 className="profile-name">{userProfileDetail?.firstName + " " + userProfileDetail?.lastName}</h1>
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
        {!props.show?.navbar && (
            <ul className="nav nav-tabs mt-3  " >
                {nav.map(nv => {
                    return (
                        <li className="nav-item"><Link to={nv.toLocaleLowerCase()} className={"nav-link " + (nv === useNav ? 'active' : '')}
                            onClick={() => { setUseNav(nv) }}
                            style={{ textDecoration: "none" }}>{nv}</Link></li>
                    )
                })}
            </ul>
        )}
        {!props.show?.content && (
            <div className="tab-content mt-3">
                <Outlet />
            </div>
        )}
    </ProfileContext.Provider>




}
export default ProfileScreen