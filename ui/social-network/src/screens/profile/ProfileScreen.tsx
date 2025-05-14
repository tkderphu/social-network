

import { useEffect, useState } from 'react'
import "./Profile.css"
import { UserProfileResp } from "../../model/profileModel"
import { useDispatch, useSelector } from "react-redux"
import { fetchProfileAction } from "../../redux/actions/profileAction"
import { TokenUtils } from "../../common"
import { Link, Outlet, useParams } from "react-router"
import { acceptMakeFriendRequestAction, cancelFriendAction, cancelMakeFriendRequestAction, createFriendRequestAction, fetchStatusBetweenUserAction, rejectMakeFriendRequestAction } from "../../redux/actions/friendshipAction"
import { PostCard } from "../home/Home"
import ChatButton from '../chat/ChatButton'

const nav = [
    "Posts",
    "About",
    "Friends",
    "Photos"
]

function ProfileScreen(props: { userId?: string }) {
    let { id } = useParams()
    if (props.userId) {
        id = props.userId
    }
    const fetchProfile: {
        userProfile: UserProfileResp,
        loading: boolean,
        hasError: boolean,
        message: any
    } = useSelector((state: any) => {
        return state.fetchProfile
    })

    const fetchStatusState: {
        status: "FRIEND" | "MAKE_FRIEND" |
        "ACCEPT_FRIEND" |
        "NONE"
    } = useSelector((state: any) => {
        return state.fetchStatusBetweenUser
    })

    const dispatch = useDispatch()

    const [useNav, setUseNav] = useState("Posts");

    useEffect(() => {
        //@ts-ignore
        dispatch(fetchProfileAction(id))
        //@ts-ignore
        dispatch(fetchStatusBetweenUserAction(id))
    }, [])


    const friendshipActionOnClick = () => {
        if (fetchStatusState.status === 'NONE') {
            //@ts-ignore
            dispatch(createFriendRequestAction(id))
        } else if (fetchStatusState.status === 'ACCEPT_FRIEND') {
            //@ts-ignore
            dispatch(acceptMakeFriendRequestAction(id))
        } else if (fetchStatusState.status == 'MAKE_FRIEND') {
            //@ts-ignore
            dispatch(cancelMakeFriendRequestAction(id))
        } else {
            //@ts-ignore
            dispatch(cancelFriendAction(id))
        }
    }

    return (
        <div >
            <>
                <div className="cover-photo">
                    <div>
                        <a href="#photo-cover" data-toggle="modal" data-target=".photo-cover-modal" ><img src="https://freefrontend.com/assets/img/bootstrap-profiles/bootstrap-4-individual-user-profile-on-a-social-network.png"
                            alt="Profile Picture" height={"400px"} width={"100%"}

                        /></a>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
                    <div className="d-flex align-items-center ">
                        <img src="https://freefrontend.com/assets/img/bootstrap-profiles/bootstrap-4-individual-user-profile-on-a-social-network.png"
                            alt="Profile Picture" className="img-fluid img-thumbnail rounded-circle" width={"130px"} height={"130px"} />
                        <div>
                            <h3>{fetchProfile.userProfile?.firstName + " " + fetchProfile.userProfile?.lastName}</h3>
                            <div>53 friends</div>
                        </div>
                    </div>
                    <div>
                        {id == TokenUtils.authLogin.userId ? (
                            <>
                                <button className="btn btn-primary ">Add to story</button>
                                <button className="btn btn-secondary m-3" data-toggle="modal" data-target=".edit-profile">Edit profile</button>
                                <button className="btn btn-primary" data-toggle="modal" data-target=".settings-privacy">Settings</button>
                            </>
                        ) : (
                            <>
                                {fetchStatusState.status === 'ACCEPT_FRIEND' && <button className="btn btn-secondary mx-3" onClick={() => {
                                    //@ts-ignore
                                    dispatch(rejectMakeFriendRequestAction(id))
                                }}>Cancel</button>}

                                <button className="btn btn-primary" onClick={() => {
                                    friendshipActionOnClick()
                                }}>{fetchStatusState.status === 'NONE' ? "Add friend" : (fetchStatusState.status === 'MAKE_FRIEND' ? "Cancel made friend" : (fetchStatusState.status === 'ACCEPT_FRIEND' ? "Accept friend" : "Cancel friend"))}</button>

                                <ChatButton userId={id} />

                            </>
                        )}

                    </div>
                </div>
                <ul className="nav nav-tabs mt-3">
                    {nav.map(nv => {
                        return (
                            <li className="nav-item"><Link to={nv.toLocaleLowerCase()} className={"nav-link " + (nv === useNav ? 'active' : '')}
                                onClick={() => { setUseNav(nv) }}
                                data-bs-toggle="tab" style={{ textDecoration: "none" }}>{nv}</Link></li>
                        )
                    })}
                </ul>
                <div className="tab-content mt-3">
                    <Outlet/>
                </div>
            </>
            {/* )} */}
        </div>
    )
}
export default ProfileScreen