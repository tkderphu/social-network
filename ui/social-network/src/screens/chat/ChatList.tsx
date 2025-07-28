import { useContext } from "react";
import { Link } from "react-router";
import { TokenUtils } from "../../common";
import "./Chat.css"
import CreateConversationForm from "./CreateConversationForm";
import { MessengerContext } from "./Messenger";

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

export default function ChatList() {
  const conversations = useContext(MessengerContext)?.conversations
  const selectedConversation = useContext(MessengerContext)?.selectedConversation

  return (
    <div className="vertical-line-right" style={{height: "98vh"}}>
      <div className="p-4 border-bottom">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="fs-5 fw-bold">Conversations</h2>
          <CreateConversationForm />
        </div>
        <h6 style={{ padding: 0, marginBottom: 0, marginTop: "10px", cursor: "pointer" }} className={"message-pending"}>Messages are pending</h6>

      </div>
      <div className="">
        {conversations?.get?.map((chat) => (
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
              <p className="fs-6 text-muted   mb-0">{chat?.latestMessage?.sender?.id === TokenUtils.authLogin.userId ? <strong>You: </strong> : <strong>{chat.latestMessage.sender.firstName + " " + chat.latestMessage.sender.lastName + ": "}</strong>}{chat?.latestMessage.message}</p>
            </div>
          </Link>
        ))}
      </div>
      {/* // </div> */}
    </div>

  );
}