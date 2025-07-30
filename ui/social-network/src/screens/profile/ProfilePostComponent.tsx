import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { PageResult, TokenUtils } from "../../common";
import FullScreenLoader from "../../components/fullSpinner/FullScreenLoader";
import { MediaReqVO, UploadedRespVO } from "../../model/mediaModel";
import { PostCreateReqVO, PostResp } from "../../model/postModel";
import { createPostAction } from "../../redux/actions/postAction";
import MediaService from "../../services/media/mediaService";
import postService, { PostCreateReq } from "../../services/post/postService";
import { PostCard } from "../post/PostCard";
import PostFormCreate from "../post/PostForm";


import PostFormModal from "../post/PostFormModal";
import { ProfileContext } from "./ProfileScreen";
import ProfileSummary from "./ProfileSummary";


export default function ProfilePostComponent() {

    const userProfile = useContext(ProfileContext)?.userProfile
   

    const [postReq, setPostReq] = useState<PostCreateReqVO>({
        content: "",
        postPrivacy: "PUBLIC",
        postType: "TEXT",
        mediaUrls: [],
        tagNames: []
    })

    const createPost = () => {
        const req: PostCreateReqVO = {
            ...postReq,
            postType: postReq.mediaUrls ? "IMAGE" : "TEXT",
            mediaUrls: postReq.mediaUrls?.map((uploadedMedia: any) => {
                return uploadedMedia.url
            })
        }
       
        postService.createPost(req, (data: any) => {
            const listMediaReq = postReq.mediaUrls?.map((image: any) => {
                const mediaReq: MediaReqVO = {
                    fileType: image.fileType,
                    id: image.publicId,
                    url: image.url,
                    type: "user",
                    linkedPostId: data.id,
                    typeId: TokenUtils.authLogin.userId + ""
                }
                return mediaReq
            })
            MediaService.saveMedia(listMediaReq)
            setPostReq({
                content: "",
                postPrivacy: "PUBLIC",
                postType: "TEXT",
                mediaUrls: [],
                tagNames: []
            })
        })
    }


    const [posts, setPosts] = useState<PostResp[]>([])

    const { userId } = useParams()

    useEffect(() => {
        postService.getListPostByUserId(userId, setPosts)
    }, [userId])

    return (
        <div className="row">
            <div className="col-4 sticky-sidebar hide-scrollbar">
                <ProfileSummary/>
            </div>
            <div className="col-8 vertical-line">
                {userProfile?.get?.id == TokenUtils.authLogin.userId && (
                    <PostFormModal
                        form={
                            <PostFormCreate
                                req={{
                                    get: postReq,
                                    set: {
                                        init: setPostReq,
                                        onChange: (e: any) => {
                                            setPostReq((prev: any) => ({
                                                ...prev,
                                                [e.target.name]: e.target.value
                                            }))
                                        }
                                    }
                                }}
                                type={"NEW"}
                            />
                        }
                        onSubmit={createPost}
                    />
                )}
                {posts?.map((post, index) => (
                    <PostCard
                        key={index}
                        post={post}
                    />
                ))}
            </div>
        </div>
    )
}