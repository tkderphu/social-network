import { useEffect, useState } from "react";
import { Link } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { TokenUtils } from "../../common";
import conversationService, { ConversationRespVO } from "../../services/chat/conversationService";

export default function ChatButton(props: { userId: any }) {
    const [conversationId, setConversationId] = useState<any | undefined>(undefined)
    useEffect(() => {
        if (props.userId) {
            conversationService.getPrivateConversation(props.userId).then(resp => {
                if (resp.data.code == 200) {
                    const conversation: ConversationRespVO = resp.data.data
                    console.log("resp: ", resp.data)
                    alert("vcid: " + conversation.id)
                    setConversationId(conversation.id)
                }
            }).catch(err => {
                console.log("vc check: ", err)
            })
        }
    }, [props.userId])
    return (
        <Link to={(conversationId) ? `/inbox/c/${conversationId}` : `/inbox/c/u/${uuidv4()}`}
            state={(conversationId) ? {} : { userId: props.userId }}
            style={{ border: 'none', backgroundColor: "white" }} className='m-3 text-dark'>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-chat-fill" viewBox="0 0 16 16">
                <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15" />
            </svg>
        </Link>
    )
}