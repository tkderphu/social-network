import { createContext, useEffect, useState } from "react";
import ChatArea from "./ChatArea";
import ChatList from "./ChatList";
import "./Chat.css"; // You can still use custom styles if needed
import { Link, Outlet } from "react-router";
import conversationService, { ConversationRespVO } from "../../services/chat/conversationService";
import { Client, IMessage } from "@stomp/stompjs";
import { useStompClient } from "../../utils/useStomp";
import messageService, { MessageRespVO } from "../../services/chat/messageService";
import { TokenUtils } from "../../common";


interface Model {
    conversations?: {
        get: ConversationRespVO[],
        set: any
    },
    unVisibleConversations: {
        get: ConversationRespVO[],
        set: any
    }
    selectedConversation: {
        get?: ConversationRespVO,
        set: any
    },
    unreadMessagesPerConversation: {
        get?: Record<string, number>,
        set: any
    }
    stompClient: Client | null

}
export const MessengerContext = createContext<Model | undefined>(undefined)
export default function Messenger() {

    const [selectedConversation, setSelectedConversation] = useState<ConversationRespVO>()
    const [conversations, setConversations] = useState<ConversationRespVO[]>([])
    const [unVisibleConversations, setUnVisibleConversations] = useState<ConversationRespVO[]>([])
    const [unreadMessagesPerConversation, setUnreadMessagesPerConversation] = useState<Record<string, number>>()
    const stompClient = useStompClient({ path: "chat/ws" })





    useEffect(() => {
        conversationService.getListConversation(true, setConversations)
        conversationService.getListConversation(false, setUnVisibleConversations)
        messageService.getUnreadMessagesPerConversation(setUnreadMessagesPerConversation)
        // Subscribe to user-specific topic
        stompClient?.subscribe(
            `/topic/chat/user/${TokenUtils.authLogin.userId}`,
            (msg: IMessage) => {
                conversationService.getListConversation(true, setConversations)
            }
        );
    }, [])


    useEffect(() => {
        let subscribe: any = []
        if (stompClient && stompClient.connected && conversations) {
            conversations.forEach((conversation) => {
                let c = stompClient.subscribe(
                    `/topic/chat/conversation/${conversation.id}`,
                    (msg: IMessage) => {
                        const message: MessageRespVO = JSON.parse(msg.body);
                        let oldConversation: any;
                        const oldConversations = conversations.filter((c) => {
                            if (c.id == message.conversationId) {
                                oldConversation = c
                            }
                            return c.id != message.conversationId
                        })
                        oldConversation.latestMessage = message

                        setConversations([oldConversation, ...oldConversations])
                    }
                );
                subscribe.push(c)
            })
        }

        return () => {
            subscribe?.forEach((s: any) => {
                s?.unsubscribe()
            })
        }
    }, [conversations?.length])

    return (
        <MessengerContext.Provider value={{
            unVisibleConversations: {
                get: unVisibleConversations,
                set: setUnVisibleConversations
            },
            unreadMessagesPerConversation: {
                get: unreadMessagesPerConversation,
                set: setUnreadMessagesPerConversation
            },
            conversations: {
                get: conversations,
                set: setConversations
            },
            selectedConversation: {
                get: selectedConversation,
                set: setSelectedConversation
            },
            stompClient: stompClient
        }}>
            <div className="mt-2">
                <div className="row">
                    <div className="col-md-3 sticky-sidebar hide-bar">
                        <div className="d-flex flex-column">
                            <ChatList />
                        </div>
                    </div>
                    <div className="col-md-9">
                        <Outlet />
                    </div>
                </div>
            </div>
        </MessengerContext.Provider>

    );
}
