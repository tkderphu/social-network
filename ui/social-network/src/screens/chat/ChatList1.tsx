import { useState } from "react";
import { Link } from "react-router";
import "./Chat.css"

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
  return (
    <>
      {/* // <div className="comments-section"  style={{ height: '70%', overflowY: 'auto', overflowX: 'hidden' }}> */}
      {/* <div className="col-4 border-end bg-white h-100"> */}
      <div className="p-4 border-bottom">
        <h2 className="fs-5 fw-bold">Messages</h2>
      </div>
      <div className="">
        {chats.map((chat: any) => (
          <Link style={{ textDecoration: "none", color: "black" }} to={`c/${chat.id}`}
            key={chat.id}
            onClick={() => setSelectedConversation(chat.id)}
            className={`d-flex align-items-center p-4 cursor-pointer  chat-item ${selectedConversation === chat.id ? 'bg-light' : ''
              }`}
          >
            <img src={chat.avatar} alt={chat.name} className="rounded-circle me-3 chat-avatar" />
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between">
                <h6 className="fw-bold mb-0">{chat.name}</h6>
                <span className="fs-6 text-muted">{chat.time}</span>
              </div>
              <p className="fs-6 text-muted text-truncate mb-0">{chat.lastMessage}</p>
            </div>
          </Link>
        ))}
      </div>
      {/* // </div> */}
    </>

  );
}