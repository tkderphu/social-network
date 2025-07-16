
import { useContext } from "react"
import { TokenUtils } from "../../common"
import { UserProfileResp } from "../../model/profileModel"
import { ProfileContext } from "../../provider/ProfileProvider"
import ChatButton from "../chat/ChatButton"
import FriendActionButton from "../friend/FriendActionButton"
import "./Profile.css"
interface Props {
    userProfile?: UserProfileResp,
    btnBan?: any
}
export default function ProfileHeader(props: Props) {
    const userProfile = useContext(ProfileContext)?.profile
    return (
        <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
            <img
                src={userProfile?.get?.coverPhoto}
                alt="Cover"
                className="w-100"
                style={{ height: "300px", objectFit: "cover" }}
            />
            <div className="d-flex align-items-center ">
                <img src={userProfile?.get?.avatar}
                    alt="Profile Picture" className="img-fluid img-thumbnail rounded-circle" width={"130px"} height={"130px"} />
                <div className='mx-3'>
                    <h3>{userProfile?.get?.firstName + " " + userProfile?.get?.lastName}</h3>
                    <div>53 friends</div>
                </div>
            </div>

            <div>
                {userProfile?.get?.id == TokenUtils.authLogin.userId ? (
                    <></>
                ) : (
                    <>

                        <FriendActionButton />
                        <ChatButton userId={userProfile?.get?.id} />
                        {props.btnBan}
                    </>
                )}
            </div>
        </div>
    )
}