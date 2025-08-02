import { useContext, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { TokenUtils } from "../../common";
import { ConversationRespVO } from "../../services/chat/conversationService";
import "./Chat.css"
import CreateConversationForm from "./CreateConversationForm";
import { MessengerContext } from "./Messenger";



export default function ChatList() {
  const [openPendingConversation, setOpenPendingConversation] = useState(false)

  const visibleConversations = useContext(MessengerContext)?.conversations
  const unVisibleConversations = useContext(MessengerContext)?.unVisibleConversations
  const selectedConversation = useContext(MessengerContext)?.selectedConversation
  const unreadMessagesPerConversation = useContext(MessengerContext)?.unreadMessagesPerConversation

  
  const template = (arr?: ConversationRespVO[]) => {
    if(!arr?.length) {
      return <h3 className="mt-3">You haven't conversation</h3>
    }
    return (
      <>
        {arr?.map((chat) => (
          <Link style={{ textDecoration: "none", color: "black" }} to={`c/${chat.id}`}
            key={chat.id}
            onClick={() => selectedConversation?.set(chat)}
            className={`d-flex align-items-center p-4 cursor-pointer  chat-item ${selectedConversation?.get?.id === chat.id ? 'bg-light' : ''
              }`}
          >
            <img src={chat.thumbnail} alt={chat.nickname} className="border rounded-circle me-3 chat-avatar" />
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between">
                <h6 className="fw-bold mb-0">{chat.nickname}</h6>
                <span className="fs-6 text-muted">{chat?.latestMessage.timeAgo}</span>
              </div>
              <div className="d-flex justify-content-between flex-wrap">
                <p className="fs-6 text-muted   mb-0">{chat?.latestMessage?.sender?.id === TokenUtils.authLogin.userId ? <strong>You: </strong> : <strong>{chat.latestMessage.sender.firstName + " " + chat.latestMessage.sender.lastName + ": "}</strong>}{chat?.latestMessage.message}</p>
                <span className="fs-6" style={{ color: "red", fontWeight: "500" }}>{unreadMessagesPerConversation?.get && unreadMessagesPerConversation.get[chat.id]}+</span>
              </div>
            </div>
          </Link>
        ))
        }
      </>
    )
  }
  return (
    <div className="vertical-line-right" style={{ height: "98vh" }}>
      <div className="p-2 border-bottom">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="fs-5 fw-bold">Conversations</h2>
          <CreateConversationForm />
        </div>
        <div className="d-flex justify-content-between mt-3 border-top mb-2">
          <h6 style={{ padding: 0, marginBottom: 0, marginTop: "10px", cursor: "pointer" }} className={"message-pending"} onClick={() => setOpenPendingConversation(true)}>Messages are pending</h6>
          {openPendingConversation && (<div className="btn" onClick={() => setOpenPendingConversation(false)}><i className="bi bi-arrow-return-left" style={{ color: "red", fontSize: "20px" }}></i></div>)}
        </div>
      </div>
      <div className="">
        {openPendingConversation ? template(unVisibleConversations?.get) : template(visibleConversations?.get)}
      </div>
      {/* // </div> */}
    </div>

  );
}