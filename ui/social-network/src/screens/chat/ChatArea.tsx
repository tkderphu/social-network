import "./Chat.css"
const messages = [
    { id: 1, sender: "Alex Johnson", text: "Hey, what's up?", time: "10:30 AM" },
    { id: 2, sender: "You", text: "Not much, just chilling!", time: "10:32 AM" },
    { id: 3, sender: "Alex Johnson", text: "Cool, wanna grab coffee?", time: "10:35 AM" },
];

export default function ChatArea(props: any) {
    if (!props.selectedChat) {
        return (
            <div className="flex-grow-1 d-flex align-items-center justify-content-center bg-light">
                <div className="text-center">
                    <h1 className="display-4 fw-bold">sasas</h1>
                    <p className="text-muted">Select a chat to start messaging</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-grow-1 d-flex flex-column bg-white h-100">
            <div className="d-flex justify-content-between align-items-center p-4 border-bottom">
                <div className="d-flex align-items-center">
                    <img src={props.selectedChat.avatar} alt={props.selectedChat.name} className="rounded-circle me-3 chat-avatar" />
                    <h2 className="fs-5 fw-bold mb-0">{props.selectedChat.name}</h2>
                </div>
                <button className="btn btn-outline-secondary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-info-circle"
                        viewBox="0 0 16 16"
                    >
                        <path d="M8 15A7 7 0 1 1 8 <TurnEnd>1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                    </svg>
                </button>
            </div>

            <div className="flex-grow-1 p-4 overflow-y-auto">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`mb-4 d-flex ${message.sender === 'You' ? 'justify-content-end' : 'justify-content-start'}`}
                    >
                        <div
                            className={`p-3 rounded-3 chat-message ${message.sender === 'You' ? 'bg-primary text-white' : 'bg-light text-dark'
                                }`}
                        >
                            <p className="mb-1">{message.text}</p>
                            <span className="fs-6 text-muted">{message.time}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 border-top">
                <div className="d-flex align-items-center">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="form-control rounded-pill flex-grow-1 me-2"
                        aria-label="Message input"
                    />
                    <button className="btn btn-primary rounded-circle">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
