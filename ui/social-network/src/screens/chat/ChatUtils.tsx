import { MessageRespVO } from "../../services/chat/messageService";

export const MessageComponent = (message: any) => {
    return (
        <div
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
    )
}  

