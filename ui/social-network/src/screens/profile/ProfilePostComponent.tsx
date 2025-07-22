import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { PageResult, TokenUtils } from "../../common";
import FullScreenLoader from "../../components/fullSpinner/FullScreenLoader";
import { PostCreateReqVO, PostResp } from "../../model/postModel";
import { ProfileContext } from "../../provider/ProfileProvider";
import { createPostAction } from "../../redux/actions/postAction";
import postService, { PostCreateReq } from "../../services/post/postService";
import { PostCard } from "../post/PostCard";
import PostFormCreate from "../post/PostForm";


import PostFormModal from "../post/PostFormModal";


export default function ProfilePostComponent() {

    const userProfile = useContext(ProfileContext)?.profile
    const handleCreatePost = () => {
        //@ts-ignore
        dispatch(createPostAction(postReq))
    }

    const [postReq, setPostReq] = useState<PostCreateReqVO>({
        content: "",
        postPrivacy: "PUBLIC",
        postType: "TEXT",
        mediaUrls: [],
        tagNames: []
    })

    const [posts, setPosts] = useState<PostResp[]>([])

    const { userId } = useParams()

    useEffect(() => {
        postService.getListPostByUserId(userId, setPosts)
    }, [userId])

    return (
        <div className="row">
            <div className="col-4 scroll-bar">

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
                                        onChange: () => {}
                                    }
                                }}
                                type={"NEW"}
                            />
                        }
                        onSubmit={() => { }}
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