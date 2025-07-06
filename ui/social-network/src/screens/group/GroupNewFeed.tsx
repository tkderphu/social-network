import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { CommonResult } from "../../common"
import { PostResp } from "../../model/postModel"
import postService from "../../services/post/postService"
import { PostCard } from "../post/PostCard"

export default function GroupNewFeed () {

    const [fetchPostState, setFetchPostState] = useState<{
        posts: PostResp[],
        loading: boolean,
        error: boolean,
        page: number,
        limit: number,
        message: any
    }>({
        posts: [],
        loading: false,
        error: false,
        message: "",
        limit: 100,
        page: 1
    })


    useEffect(() => {
        setFetchPostState((prev) => ({...prev, loading: true}))
        postService.getNewFeeds("group", fetchPostState.page, fetchPostState.limit, 0)
        .then(res => {
            const commonResult: CommonResult<any> = res.data
            console.log("data from newfeed: ", commonResult.data)
            if(commonResult.code == 200) {
                setFetchPostState((prev) => ({...prev, error: false, loading: true, posts: [...prev.posts, ...commonResult.data]}))
            } else {
                setFetchPostState((prev) => ({...prev, loading: false, error: true, message: commonResult.message}))
            }
        }).catch(err => {
            setFetchPostState((prev) => ({...prev, loading: false, error: true, message: "Please see console"}))
            console.error("err: ", err)
        })
    }, [fetchPostState.page])



    if(fetchPostState.error) {
        toast.error(fetchPostState.message)
    }

    return (
        <>
            {fetchPostState.posts?.map(post => {
                return <PostCard
                   post={post}
                   ref={`/groups/${post.group?.id}/profile/${post?.user?.id}`}
                />
            })}
        </>
    )
}