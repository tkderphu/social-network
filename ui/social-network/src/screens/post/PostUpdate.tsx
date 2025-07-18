import { useContext, useState } from "react";
import { PostCreateReqVO } from "../../model/postModel";
import postService, { PostCreateReq } from "../../services/post/postService";
import { PostContext } from "./PostCard";
import PostFormCreate from "./PostForm";
import PostFormModal from "./PostFormModal";

export default function PostUpdate({closeModalWhenDone}: any) {
 
    const [req, setReq] = useState<PostCreateReqVO>({
        content: "",
        postPrivacy: "PUBLIC",
        postType: "TEXT"
    })
    const post = useContext(PostContext)?.post
    
    const handleUpdate = () => {
        postService.updatePost(req, () => {
            const s: any = {}
            Object.keys(req).forEach(key => {
                //@ts-ignore
                if(req[key] != post?.get[key]) {
                    //@ts-ignore
                    s[key] = req[key]
                }
            })
            console.log("set post: ", s)
            post?.set((prev: any) => ({
                ...prev,
                ...s
            }))

            closeModalWhenDone()
        })
    }
    return (
        <>
            <PostFormCreate
                type="UPDATE"
                old={post?.get}
                req={{
                    get: req,
                    set: {
                        init: setReq,
                        onChange: (e: any) => {
                            setReq((prev: any) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }))
                        }
                    }

                }
                }
            />
            <div className="d-flex justify-content-center">
                <button className="btn btn-primary w-50" onClick={handleUpdate}>Update</button>
            </div>
        </>


    )
}