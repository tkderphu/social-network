import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { TokenUtils } from "../../common";
import ModalCustome from "../../components/modal/ModalCustom";
import Spinner from "../../components/Spinner";
import { GroupResp } from "../../model/groupModel";
import { PostResp } from "../../model/postModel";
import postService, { PostCreateReq } from "../../services/post/postService";
import { PostCard } from "../post/PostCard";
import PostForm from "../post/PostForm";
import { useGroup } from "./GroupProvider";

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
export default function GroupPost() {
    const { groupId } = useParams()
    const group: GroupResp = useGroup().group
    const [openModal, setOpenModal] = useState(false)
    const [postFilter, setPostFilter] = useState<string>("hot")
    const [fetchPosts, setFetchPosts] = useState<{
        posts: PostResp[],
        loading: boolean,
        page: number,
        limit: number
    }>({
        posts: [],
        loading: true,
        page: 1,
        limit: 30
    })
    const [req, setReq] = useState<PostCreateReq>({
        postPrivacy: "PUBLIC",
        content: "",
        groupId: groupId,
        mediaUrls: []
    })
    const handleCreatePost = () => {
        console.log("req: ", req)
        postService.createPost(req).then(resp => {
            if(!group.enableAutoReviewPost) {
                toast.info("Post is created successfully, your post will be displayed in group newfeed soon")
            } else {
                toast.info("Post is created successfully")
            }
            setOpenModal(false)
            setReq({
                ...req,
                content: "",
                mediaUrls: []
            })
        }).catch(err => {
            alert("create post failed")
            console.log("err: ", err)
        })
    }

    useEffect(() => {
        if(postFilter == "hot") {
            console.log("fetch hot posts")
            postService.getListPostByGroup(groupId, fetchPosts.page, fetchPosts.limit, 0).then(resp => {
                console.log("data fuck: ", resp)
                setFetchPosts((prev) => ({
                    ...prev,
                    loading: false,
                    posts: [...resp.data.data]
                }))
            }).catch(err => {
            
                console.log("err fetch group posts: ", err)
            })
        } else {
            postService.getListPostByGroup(groupId, fetchPosts.page, fetchPosts.limit, 1).then(resp => {
                console.log("data fuck: ", resp)
                setFetchPosts((prev) => ({
                    ...prev,
                    loading: false,
                    posts: [...resp.data?.data]
                }))
            }).catch(err => {
            
                console.log("err fetch group posts: ", err)
            })
        }
    }, [postFilter && groupId])

    return (
        <div className="row mt-3 ">
            <div className=" mb-3" style={{}}>
                <div className="card-body">
                    <div className="d-flex align-items-center text-center mb-3">
                        {/* <img
                            // src
                            alt="User avatar"
                            className="rounded-circle me-2"
                            style={{ width: '40px', height: '40px' }}
                        /> */}
                        <input
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                console.log("vcl")
                                setOpenModal(true)
                            }}
                            className="form-control"
                            placeholder="What's on your mind?"
                        // disabled
                        ></input>
                    </div>
                    <div>
                        <select className="form-select" value={postFilter} onChange={(e) => setPostFilter(e.target.value) }>
                            <option value={'hot'}>Hot</option>
                            <option value={'newest'}>New posts</option>
                        </select>
                    </div>
                </div>
            </div>
            <ModalCustome onClose={() => setOpenModal(false)}
                show={openModal}
                title="Create group"
                closable={false}
                onSave={handleCreatePost}
            >
                <PostForm form={{
                    content: req.content,
                    disabledBtnWrite: true,
                    onChange: (e: any) => setReq((prev) => ({ ...prev, [e.target.name]: e.target.value })),
                    postPrivacy: req.postPrivacy,
                    fromGroup: true,
                    mediaUrls: req.mediaUrls,
                    
                }} />
            </ModalCustome>
            {fetchPosts.posts.length > 0 && fetchPosts.posts.map(post => {
                return <PostCard ref={`/groups/${groupId}/profile/${post?.user?.id}`}  post={post} />
            })}
            <Spinner loading={fetchPosts.loading} />
        </div>
    )
}