import { ProfileSimpleResp } from "./profileModel"

export interface MemberConversationRespVO {
    id: any,
    member: ProfileSimpleResp
    role: "OWNER" | "MEMBER",
    invitedAt: any
    invitedBy: ProfileSimpleResp
    enableSoundNotification: boolean
    enablePushNotification: boolean
}