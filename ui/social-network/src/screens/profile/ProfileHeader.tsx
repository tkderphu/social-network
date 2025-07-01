
import { useParams } from "react-router"
import { TokenUtils } from "../../common"
import { UserProfileResp } from "../../model/profileModel"
import ChatButton from "../chat/ChatButton"
import FriendActionButton from "../friend/FriendActionButton"
import "./Profile.css"
interface Props {
    userProfile?: UserProfileResp,
    btnBan?: any
}
export default function ProfileHeader(props: Props) {
    const { userId } = useParams()
    return (
        <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
            <img
                src={props.userProfile?.coverPhoto}
                alt="Cover"
                className="w-100"
                style={{ height: "300px", objectFit: "cover" }}
            />
            <div className="d-flex align-items-center ">
                <img src={props.userProfile?.avatar}
                    alt="Profile Picture" className="img-fluid img-thumbnail rounded-circle" width={"130px"} height={"130px"} />
                <div className='mx-3'>
                    <h3>{props.userProfile?.firstName + " " + props.userProfile?.lastName}</h3>
                    <div>53 friends</div>
                </div>
            </div>
            
            <div>
                {userId == TokenUtils.authLogin.userId ? (
                    <>
                        <button className="btn btn-primary ">Add to story</button>
                        <button className="btn btn-secondary m-3" data-toggle="modal" data-target=".edit-profile">Edit profile</button>
                        <button className="btn btn-primary" data-toggle="modal" data-target=".settings-privacy">Settings</button>
                    </>
                ) : (
                    <>
                    
                        <FriendActionButton />
                        <ChatButton userId={userId} />
                        {props.btnBan}
                    </>
                )}
            </div>
        </div>
    )
}