import { useContext, useEffect, useState } from "react"
import ModalCustome from "../../components/modal/ModalCustom"
import { PostCreateReqVO } from "../../model/postModel"
import { PostCreateReq } from "../../services/post/postService"
import { PostContext } from "./PostCard"
import PostFormCreate from "./PostForm"

export default function PostShare() {
    const [showDialog, setShowDialog] = useState(false)
    const post = useContext(PostContext)?.post?.get
    const [sharePostReq, setSharePostReq] = useState<PostCreateReqVO>({
        content: "",
        postPrivacy: "PUBLIC",
        postType: "TEXT"
    });


    useEffect(() => {
        setSharePostReq((prev) => ({
            ...prev,
            sharePostId: post?.id
        }))
    }, [post])

    const handleShare = () => {
        console.log("req: ", sharePostReq)
        setShowDialog(false)
        setSharePostReq({
            content: "",
            postPrivacy: "PUBLIC",
            postType: "TEXT"
        })
    }
    return (
        <>
            <button className="btn btn-sm btn-outline-info" onClick={() => {
                setShowDialog(true)
            }}>Share: {post?.postStats?.numberShare || 0}</button>
            <ModalCustome
                title='Share post'
                show={showDialog}
                closable={false}
                onSave={handleShare}
                onClose={() => setShowDialog(false)}
                children={<PostFormCreate
                    type="NEW"
                    req={{
                        get: sharePostReq,
                        set: {
                            init: setSharePostReq,
                            onChange: (e: any) => {
                                setSharePostReq((prev: any) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value
                                }))
                            }
                        }
                    }}
                />}

            />
        </>
    )
}