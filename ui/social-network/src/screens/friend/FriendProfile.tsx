import { Outlet, useNavigate, useParams } from "react-router";
import { i } from "react-router/dist/development/fog-of-war-Cm1iXIp7";
import ProfileScreen from "../profile/ProfileScreen";

export default function FriendProfile() {
    const {id} = useParams()
    const navigate = useNavigate()
    console.log("id: ", id)
    return (
        <>
            <button className="btn btn-secondary" onClick={() => {
                navigate(-1)
            }}>Previous</button>
            <ProfileScreen userId={id} />
        </>
    )   
}