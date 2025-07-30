import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { TokenUtils } from "../../common";
import conversationService, { ConversationRespVO } from "../../services/chat/conversationService";
import { ProfileContext } from "./ProfileScreen";

export default function ChatButton(props:{className?: string}) {
    const user = useContext(ProfileContext)?.userProfile
    const [conversationId, setConversationId] = useState<any | undefined>(undefined)
    useEffect(() => {
        if (user?.get?.id) {
            conversationService.getPrivateConversation(user?.get?.id).then(resp => {
                if (resp.data.code == 200) {
                   
                    setConversationId(resp.data.data)
                }
            }).catch(err => {
                console.log("vc check: ", err)
            })
        }
    }, [user?.get?.id])
    return (
        <Link to={(conversationId) ? `/inbox/c/${conversationId}` : `/inbox/u/${user?.get?.id}/c/${uuidv4()}`}
            style={{ border: 'none', backgroundColor: "white" }} className={props.className || "m-3 text-dark"}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-chat-fill" viewBox="0 0 16 16">
                <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15" />
            </svg>
        </Link>
    )
}