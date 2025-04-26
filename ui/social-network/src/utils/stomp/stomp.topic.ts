export const USER_CHAT_TOPIC = (userId: any) => {
    return `/topic/chat/conversation/${userId}`
}
export const USER_ESTABLISHED_CHAT_TOPIC = (userId: any) => {
    return `/topic/chat/user/${userId}/new-conversation`
}
