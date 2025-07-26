import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import conversationService, { ConversationRespVO } from "../../services/chat/conversationService"
import "./Contact.css"
export default function Contact() {
    const [conversations, setConversations] = useState<ConversationRespVO[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        conversationService.getListConversation(setConversations)
    }, [])

    return (
        <div className="contacts-container sticky-sidebar hide-scrollbar">
            {/* Header */}
            <div className="header d-flex justify-content-between align-items-center">
                <h4>Contacts</h4>
                <div className="header-icons">
                    <i className="fas fa-search" />
                    <i className="fas fa-ellipsis-v" />
                </div>
            </div>
            {/* Contacts List */}
            <div className="contacts-list">
                {/* Nguyễn Đăng Công */}
                {conversations.map(conversation => {
                    if(conversation.conversationType == "PUBLIC") return null;
                    return (
                        <div className="contact-item" onClick={() => {
                            navigate(`/inbox/c/${conversation.id}`)
                        }}>
                            <div className="avatar nguyen-dang-cong">
                                <div className="avatar-initials"><img src={conversation.thumbnail}/></div>
                                <div className="online-indicator" />
                            </div>
                            <div className="contact-info">
                                <span className="contact-name">{conversation.nickname}</span>
                                <span className="contact-time">16m</span>
                            </div>
                        </div>
                    )
                })}

            </div>
            <div className="header d-flex justify-content-between align-items-center">
                <h4>Group chats</h4>

            </div>
            <div className="contacts-list">
                {/* Meta AI */}
                 {/* Nguyễn Đăng Công */}
                 {conversations.map(conversation => {
                    if(conversation.conversationType == "PRIVATE") return null;
                    return (
                        <div className="contact-item" onClick={() => {
                            navigate(`/inbox/c/${conversation.id}`)
                        }}>
                            <div className="avatar nguyen-dang-cong">
                            <div className="avatar-initials"><img src={conversation.thumbnail}/></div>
                                <div className="online-indicator" />
                            </div>
                            <div className="contact-info">
                                <span className="contact-name">{conversation.nickname}</span>
                                <span className="contact-time">16m</span>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>

    )
}