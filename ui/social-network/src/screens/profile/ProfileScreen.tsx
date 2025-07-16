

import { useEffect, useState } from 'react'
import "./Profile.css"
import { UserProfileResp } from "../../model/profileModel"
import { useDispatch, useSelector } from "react-redux"
import { fetchProfileAction } from "../../redux/actions/profileAction"
import { Link, Outlet, useParams } from "react-router"
import FullScreenLoader from '../../components/fullSpinner/FullScreenLoader'
import ProfileHeader from './ProfileHeader'
import ProfileProvider from '../../provider/ProfileProvider'

const nav = [
    "Posts",
    "Friends",
    "Photos"
]

function ProfileScreen(props: { userId?: string }) {

    const [useNav, setUseNav] = useState("Posts");

    return (
        <ProfileProvider>
            <ProfileHeader />
            <ul className="nav nav-tabs mt-3">
                {nav.map(nv => {
                    return (
                        <li className="nav-item"><Link to={nv.toLocaleLowerCase()} className={"nav-link " + (nv === useNav ? 'active' : '')}
                            onClick={() => { setUseNav(nv) }}
                            style={{ textDecoration: "none" }}>{nv}</Link></li>
                    )
                })}
            </ul>
            <div className="tab-content mt-3">
                <Outlet />
            </div>
        </ProfileProvider>
    )
}
export default ProfileScreen