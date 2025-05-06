import "./Chat.css"
export default function ChatList1(props: { chats: any, onSelectChat: any, selectedChatId: any }) {
  return (
    <div className="col-4 border-end bg-white h-100">
      <div className="p-4 border-bottom">
        <h2 className="fs-5 fw-bold">Messages</h2>
      </div>
      <div className="overflow-y-auto chat-sidebar-scroll">
        {props.chats.map((chat: any) => (
          <div
            key={chat.id}
            onClick={() => props.onSelectChat(chat.id)}
            className={`d-flex align-items-center p-4 cursor-pointer chat-item ${
              props.selectedChatId === chat.id ? 'bg-light' : ''
            }`}
          >
            <img src={chat.avatar} alt={chat.name} className="rounded-circle me-3 chat-avatar" />
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between">
                <h3 className="fw-bold mb-0">{chat.name}</h3>
                <span className="fs-6 text-muted">{chat.time}</span>
              </div>
              <p className="fs-6 text-muted text-truncate mb-0">{chat.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
}