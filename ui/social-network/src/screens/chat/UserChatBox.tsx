import { useState } from "react"
import { useNavigate } from "react-router"
import { ProfileSimpleResp } from "../../model/profileModel"
import "./Chat"
function UserChatBox(props: { removeThisUserChatboxFn: any , user: ProfileSimpleResp}) {
    const [conversation, setConversation] = useState<any>(undefined)

    return (
        <div className="user-chat-box card">
            <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                    <img src={props.user.imageUrl}
                        height={"50px"}
                    />
                    <h5 className="mx-3">{props.user.firstName + " " + props.user.lastName}</h5>
                </div>
                <div>
                    <button onClick={() => {
                        props.removeThisUserChatboxFn()
                    }} className="btn btn-secondary"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 50 50">
                            <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                        </svg></button>
                </div>
            </div>
            <div className="user-chat-box-content">
                
            </div>
            <div className="user-chat-box-send-message d-flex flex-column ">
                <input type={'file'} className="mb-3" />
                <div className="d-flex">
                    <input type={"text"} className="form-control" />
                    <button className="btn btn-primary">Send</button>
                </div>
            </div>
        </div>
    )
}
export default UserChatBox