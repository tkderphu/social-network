export interface GroupCreateReq{ 
    groupType: "PRIVATE" | "PUBLIC",
    name: string
    description: string
    userIds: Array<number>
}
