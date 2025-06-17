import { ProfileSimpleResp } from "./profileModel"

export interface GroupCreateReq{ 
    groupType: "PRIVATE" | "PUBLIC",
    name: string
    description: string
    userIds: Array<number>
}

export interface GroupResp {
    id: any,
    name: string,
    description: string
    numberOfMembers: number
    createdAt: any,
    coverPhoto: string,
    owner?: ProfileSimpleResp,
    enableAutoAcceptMember: boolean,
    enableAutoReviewPost: boolean,
    groupType: string
    enableNotificationWhenUserRequest: boolean,
    enableNotificationWhenNewPostComing: boolean
}