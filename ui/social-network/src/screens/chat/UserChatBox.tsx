import { Message } from "@stomp/stompjs"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { CommonResult, TokenUtils } from "../../common"
import { ProfileSimpleResp } from "../../model/profileModel"
import conversationService, { ConversationRespVO } from "../../services/chat/conversationService"
import messageService, { MessageCreateReqVO, MessageRespVO } from "../../services/chat/messageService"
import { sendMessage, subscribe } from "../../utils/stomp/stomp.client"
import { USER_ESTABLISHED_CHAT_TOPIC } from "../../utils/stomp/stomp.topic"
import "./Chat"

function UserChatBox(props: { removeThisUserChatboxFn: any, user?: ProfileSimpleResp }) {
    const [conversation, setConversation] = useState<undefined | ConversationRespVO>(undefined)
    const [messages, setMessages] = useState<MessageRespVO[]>([])
    const [messageReq, setMessageReq] = useState<MessageCreateReqVO>({
        message: ''
    })
    useEffect(() => {
        //@ts-ignore
        conversationService.getConversation(props.user?.userId).then(resp => {
            const result: CommonResult<ConversationRespVO> = resp.data
            console.log("conversation: ", result)
            if (result.code === 200) {
                setConversation(result.data)
                //@ts-ignore
                messageService.getListMessage(result.data.id).then(rp => {
                    const r: CommonResult<MessageRespVO[]> = rp.data
                    if (r.code === 200) {
                        setMessages(r.data)
                    }
                })
            }
        })
        subscribe(USER_ESTABLISHED_CHAT_TOPIC(TokenUtils.authLogin.userId), (message: Message) => {
            const payload: ConversationRespVO = JSON.parse(message.body)
            setMessages([...messages, payload.latestMessage])

        })
    }, [])

    const sendMessageToConversation = () => {
        const req: MessageCreateReqVO = {
            ...messageReq,
            conversationId: conversation?.id,
            toUserId: props.user?.userId
        }

        sendMessage(req, "/app/chat/send")

    }

    return (
        <div className="user-chat-box card">
            <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                    <img src={conversation?.imageUrl || props.user?.imageUrl}
                        height={"50px"}
                    />
                    <h5 className="mx-3">{conversation?.name || props.user?.firstName + " " + props.user?.lastName}</h5>
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
                {messages.map(msg => {
                    return <>
                        <div>{msg.sender.firstName + " " + msg.sender.lastName}: {msg.message}</div>
                    </>
                })}
            </div>
            <div className="user-chat-box-send-message d-flex flex-column ">
                <input type={'file'} className="mb-3" />
                <div className="d-flex">
                    <input type={"text"} className="form-control" onChange={(e: any) => setMessageReq((prev) => ({
                        ...prev,
                        'message': e.target.value
                    }))} />
                    <button onClick={() => {
                        sendMessageToConversation()
                    }} type="button" className="btn btn-primary">Send</button>
                </div>
            </div>
        </div>
    )
}
export default UserChatBox