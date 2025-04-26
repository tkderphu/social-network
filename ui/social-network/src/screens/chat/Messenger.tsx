import { Client, IMessage, Message, Stomp } from "@stomp/stompjs";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { connectStomp } from "../../utils/stomp/stomp.client";
import { useStomp } from "../../utils/useStomp";

export const users = [
    { id: 1, name: "Alice", avatar: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "Bob", avatar: "https://i.pravatar.cc/150?img=2" },
    { id: 3, name: "Charlie", avatar: "https://i.pravatar.cc/150?img=3" },
];

const messages: any = {
    1: [
        { fromMe: false, text: "Hey Alice!" },
        { fromMe: true, text: "Hi! How are you?" },
    ],
    2: [
        { fromMe: false, text: "Bob here." },
        { fromMe: true, text: "Hey Bob!" },
    ],
    3: [
        { fromMe: false, text: "Yo Charlie!" },
        { fromMe: true, text: "What's up!" },
    ],
};
let stompClient: any = null
export default function Messenger() {
    const [selectedUser, setSelectedUser] = useState(users[0]);
    const [text, setText] = useState("");
    const [chatData, setChatData] = useState<any>({});

    const [messages, setMessages] = useState<string[]>([]);

    // useStomp({
    //     url: "http://localhost:8080/chat/ws", // hoặc http://localhost:8080/ws
    //     topic: "/topic/chat",             // topic do backend bạn broadcast
    //     onMessage: (msg: IMessage) => {
    //       const content = JSON.parse(msg.body).content;
    //       setMessages((prev) => [...prev, content]);
    //     },
    //   });
    // Load from localStorage
    useEffect(() => {
        const stored = localStorage.getItem("chat-messages");
        if (stored) {
            setChatData(JSON.parse(stored));
        } else {
            // fake default data
            const defaultData = {
                1: [{ fromMe: false, text: "Hey Alice!", time: new Date().toLocaleTimeString() }],
                2: [{ fromMe: false, text: "Bob here.", time: new Date().toLocaleTimeString() }],
                3: [{ fromMe: false, text: "Yo Charlie!", time: new Date().toLocaleTimeString() }],
            };
            setChatData(defaultData);
            localStorage.setItem("chat-messages", JSON.stringify(defaultData));
        }
        
        connectStomp()
    }, []);

    const chat: any = chatData[selectedUser.id] || [];

    const handleSend = () => {
        if (!text.trim()) return;

        const newMsg = {
            fromMe: true,
            text,
            time: new Date().toLocaleTimeString(),
            isImage: text.startsWith("http"), // gửi ảnh bằng link
        };

        const updatedChat = {
            ...chatData,
            [selectedUser.id]: [...(chatData[selectedUser.id] || []), newMsg],
        };

        setChatData(updatedChat);
        localStorage.setItem("chat-messages", JSON.stringify(updatedChat));
        setText("");
    };

    return (
        <div className="container-fluid vh-90">
            <div className="row h-100">
                {/* Sidebar */}
                <div className="col-4 border-end">
                    <button className="btn btn-secondary mb-3 mt-3">Create group chat</button>
                    <ul className="list-group">
                        {users.map((user) => (
                            <li
                                key={user.id}
                                className={`list-group-item list-group-item-action ${selectedUser.id === user.id ? "active" : ""
                                    }`}
                                onClick={() => setSelectedUser(user)}
                                style={{ cursor: "pointer" }}
                            >
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="rounded-circle me-2"
                                    width="40"
                                    height="40"
                                />
                                {user.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Chat area */}
                <div className="col-8 d-flex flex-column">
                    <div className="border-bottom p-3">
                        <h5>{selectedUser.name}</h5>
                    </div>
                    <div className="flex-grow-1 overflow-auto p-3" style={{ background: "#f9f9f9" }}>
                        {chat.map((msg: any, idx: any) => (
                            <div
                                key={idx}
                                className={`d-flex ${msg.fromMe ? "justify-content-end" : "justify-content-start"
                                    } mb-2`}
                            >
                                <div
                                    className={`p-2 rounded ${msg.fromMe ? "bg-primary text-white" : "bg-light"
                                        }`}
                                    style={{ maxWidth: "70%" }}
                                >
                                    {msg.isImage ? (
                                        <img
                                            src={msg.text}
                                            alt="sent"
                                            className="img-fluid rounded"
                                            style={{ maxWidth: "200px" }}
                                        />
                                    ) : (
                                        msg.text
                                    )}
                                    <div className="small text-muted mt-1 text-end">{msg.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-3 border-top d-flex">
                        <input
                            type="text"
                            className="form-control me-2"
                            placeholder="Type a message or image URL"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        />
                        <button className="btn btn-primary" onClick={handleSend}>
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}