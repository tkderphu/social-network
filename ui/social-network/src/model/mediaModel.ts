export interface UploadedRespVO {
    publicId: string,
    url: string
    fileType: "image" | "video"
}
export interface MediaReqVO {
    id: string,
    url: string,
    typeId: string,
    type: "user" | "group" | "conversation",
    fileType: string,
    linkedPostId: any
}