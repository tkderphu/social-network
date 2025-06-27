

import { useEffect, useState } from 'react'
import "./Profile.css"
import { UserProfileResp } from "../../model/profileModel"
import { useDispatch, useSelector } from "react-redux"
import { fetchProfileAction } from "../../redux/actions/profileAction"
import { TokenUtils } from "../../common"
import { Link, Outlet, useParams } from "react-router"
import ChatButton from '../chat/ChatButton'
import FriendActionButton from '../friend/FriendActionButton'
import FullScreenLoader from '../../components/fullSpinner/FullScreenLoader'
import ProfileHeader from './ProfileHeader'

const nav = [
    "Posts",
    "About",
    "Friends",
    "Photos"
]

function ProfileScreen(props: { userId?: string }) {
    let { userId } = useParams()
    if (props.userId) {
        userId = props.userId
    }
    const fetchProfile: {
        userProfile: UserProfileResp,
        loading: boolean,
        hasError: boolean,
        message: any
    } = useSelector((state: any) => {
        return state.fetchProfile
    })



    const dispatch = useDispatch()

    const [useNav, setUseNav] = useState("Posts");

    useEffect(() => {
        //@ts-ignore
        dispatch(fetchProfileAction(userId))
      
    }, [])

    if(fetchProfile.loading) {
        return <FullScreenLoader/>
    }

    return (
        <div >
            <>
                {/* <div className="cover-photo">
                    <div>
                        <a href="#photo-cover" data-toggle="modal" data-target=".photo-cover-modal" >
                            <img src="https://png.pngtree.com/thumb_back/fh260/background/20210207/pngtree-simple-gray-solid-color-background-image_557027.jpg"
                            alt="Profile Picture" height={"400px"} width={"100%"}

                        /></a>
                    </div>
                </div> */}
                <ProfileHeader userProfile={fetchProfile.userProfile}/>
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