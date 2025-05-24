import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { PageResult } from "../../common";
import FullScreenLoader from "../../components/fullSpinner/FullScreenLoader";
import { PostResp } from "../../model/postModel";
import { createPostAction, fetchListPostByUserAction } from "../../redux/actions/postAction";
import { PostCreateReq } from "../../services/post/postService";
import { PostCard } from "../home/Home";
import PostForm from "../post/PostForm";
const posts = [
    {
        user: "John Doe",
        time: "2 hours ago",
        content: "Enjoying a great day at the park! 🌳",
    },
    {
        user: "Alex Johnson",
        time: "Yesterday",
        content: "Check out this amazing recipe I tried! \n # Foodie\n\n### Ingredients\n- Tomatoes\n- Basil\n- Olive oil\n\n[Full recipe here](https://example.com)",
    },
];

export default function ProfilePostComponent() {
    const { id } = useParams()
    console.log("id user: ", id)
    const dispatch = useDispatch()
    const fetchListPostByUserState: {
        loading: boolean,
        hasError: boolean,
        message: any,
        pageResult: PageResult<PostResp>
    } = useSelector((state: any) => {
        return state.fetchListPostByUser
    })

    const handleCreatePost = () => {
        //@ts-ignore
        dispatch(createPostAction(postReq))
    }

    const [postReq, setPostReq] = useState<PostCreateReq>({
        content: "",
        postPrivacy: "PUBLIC",
        postType: "TEXT"
    })

    useEffect(() => {
        //@ts-ignore
        dispatch(fetchListPostByUserAction(id))    
    }, [])

    if (fetchListPostByUserState.hasError) {
        console.log(`
        =======>Error when fetch list post by userId: ${JSON.parse(fetchListPostByUserState.message || "{}")} <=================
    `)
    }

    return (
        <div>
            {fetchListPostByUserState.loading && <FullScreenLoader />}
            {/* <div className="input-group mb-3"> */}
            {/* <div className="input-group"> */}
            {/* <button style={{ border: "none" }} className="input-group-text"><span >Write post</span></button> */}
            {/* <div data-toggle="modal" data-target=".your-bulletin" className="form-control rounded" style={{
                        cursor: "pointer"
                    }} aria-label="With textarea"><span>What's on your mind?</span></div> */}
            <PostForm form={{
                ...postReq,
                onSubmit: handleCreatePost,
                onChange: (e: any) => {
                    const { name, value } = e.target
                    setPostReq((prev) => ({
                        ...prev,
                        [name]: value
                    }))
                }

            }} />
            {/* </div> */}
            {/* </div> */}
            {fetchListPostByUserState.pageResult?.data.map((post, index) => (
                <PostCard
                    key={index}
                    post={post}
                />
            ))}
        </div>
    )
}