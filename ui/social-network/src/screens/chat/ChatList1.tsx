import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { TokenUtils } from "../../common";
import { fetchListConversationAction } from "../../redux/actions/chatAction";
import { ConversationRespVO } from "../../services/chat/conversationService";
import "./Chat.css"
import CreateConversationForm from "./CreateConversationForm";

const chats = [
  { id: 1, name: "Alex Johnson", lastMessage: "Hey, what's up?", time: "2m", avatar: "https://via.placeholder.com/40" },
  { id: 2, name: "Sara Smith", lastMessage: "See you soon!", time: "1h", avatar: "https://via.placeholder.com/40" },
  { id: 3, name: "Mike Brown", lastMessage: "Check this out!", time: "3h", avatar: "https://via.placeholder.com/40" },
  { id: 4, name: "Mike Brown", lastMessage: "Check this out!", time: "3h", avatar: "https://via.placeholder.com/40" },
  { id: 5, name: "Mike Brown", lastMessage: "Check this out!", time: "3h", avatar: "https://via.placeholder.com/40" },
  { id: 6, name: "Mike Brown", lastMessage: "Check this out!", time: "3h", avatar: "https://via.placeholder.com/40" },
  { id: 7, name: "Mike Brown", lastMessage: "Check this out!", time: "3h", avatar: "https://via.placeholder.com/40" },
  { id: 8, name: "Mike Brown", lastMessage: "Check this out!", time: "3h", avatar: "https://via.placeholder.com/40" },
];

export default function ChatList1() {
  const [selectedConversation, setSelectedConversation] = useState<any>()
  const fetchListConversationState: {
    conversations: ConversationRespVO[],
    hasError: boolean,
    message: any
  } = useSelector((state: any) => {
    return state.fetchListConversation
  })

  const dispatch = useDispatch()

  useEffect(() => {
    //@ts-ignore
    dispatch(fetchListConversationAction())
  }, [])

  return (
    <>
      {/* // <div className="comments-section"  style={{ height: '70%', overflowY: 'auto', overflowX: 'hidden' }}> */}
      {/* <div className="col-4 border-end bg-white h-100"> */}
      <div className="p-4 border-bottom">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="fs-5 fw-bold">Conversations</h2>
          <CreateConversationForm/>
        </div>
      </div>
      <div className="">
        {fetchListConversationState.conversations?.map((chat) => (
          <Link style={{ textDecoration: "none", color: "black" }} to={`c/${chat.id}`}
            key={chat.id}
            onClick={() => setSelectedConversation(chat.id)}
            className={`d-flex align-items-center p-4 cursor-pointer  chat-item ${selectedConversation === chat.id ? 'bg-light' : ''
              }`}
          >
            <img src={chat.thumbnail} alt={chat.nickname} className="border rounded-circle me-3 chat-avatar" />
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between">
                <h6 className="fw-bold mb-0">{chat.nickname}</h6>
                <span className="fs-6 text-muted">{chat?.latestMessage.timeAgo}</span>
              </div>
              <p className="fs-6 text-muted text-truncate mb-0">{chat?.latestMessage?.sender?.id === TokenUtils.authLogin.userId ? "You: " : ""}{chat?.latestMessage.message}</p>
            </div>
          </Link>
        ))}
      </div>
      {/* // </div> */}
    </>

  );
}