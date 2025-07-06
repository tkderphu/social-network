export interface MemberConversationRespVO {
    id: any,
    fullName: any
    avatar: any
    isOnline: any
    role: "OWNER" | "MEMBER",
    invitedAt: any
    invitedBy: MemberConversationRespVO
    enableSoundNotification: boolean
    enablePushNotification: boolean
}