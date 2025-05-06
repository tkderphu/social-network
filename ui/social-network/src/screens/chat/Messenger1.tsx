import { useState } from "react";
import ChatArea from "./ChatArea";
import ChatList1 from "./ChatList1";
import "./Chat.css"; // You can still use custom styles if needed

const chats = [
    { id: 1, name: "Alex Johnson", lastMessage: "Hey, what's up?", time: "2m", avatar: "https://via.placeholder.com/40" },
    { id: 2, name: "Sara Smith", lastMessage: "See you soon!", time: "1h", avatar: "https://via.placeholder.com/40" },
    { id: 3, name: "Mike Brown", lastMessage: "Check this out!", time: "3h", avatar: "https://via.placeholder.com/40" },
];

export default function Messenger1() {
    const [selectedChatId, setSelectedChatId] = useState(null);
    const selectedChat = chats.find((chat) => chat.id === selectedChatId);

    return (
        <div className="d-flex vh-100 bg-light">
        <ChatList1 chats={chats} onSelectChat={setSelectedChatId} selectedChatId={selectedChatId} />
        <ChatArea selectedChat={selectedChat} />
      </div>
    );
}
