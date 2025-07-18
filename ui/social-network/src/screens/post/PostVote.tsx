import { useContext } from "react"
import voteService from "../../services/interaction/voteService"
import { PostContext } from "./PostCard"

export default function PostVote() {
    const post = useContext(PostContext)?.post?.get
    const  postStats = useContext(PostContext)?.postStats
    
    const checkUser = () => {
        voteService.checkVote(post?.id, "POST").then((res) => {
            postStats?.set((prev: any) => ({ ...prev, "checkUser": res.data.data }))
        })
    }

    const fetchScores = () => {
        voteService.count(post?.id, "POST").then(resp => {
            postStats?.set((prev: any) => ({ ...prev, "scores": resp.data.data || 0 }))
        })
    }
    return (
        <div className="d-flex align-items-center">
            <button className={`btn btn-sm ${postStats?.get.checkUser == -1 ? "btn-danger" : "btn-outline-primary"}`} onClick={() => {
                //@ts-ignore
                dispatch(updateVote({
                    objectId: post?.id,
                    objectType: "POST",
                    voteType: "DOWN"
                }))
            }}><i className="bi bi-arrow-down"></i></button>
            <div style={{ color: "red" }} className={"me-2 mx-2"}>{postStats?.get.scores}</div>
            <button className={`btn btn-sm ${postStats?.get.checkUser == 1 ? "btn-danger" : "btn-outline-primary"}`} onClick={() => {
                //@ts-ignore
                dispatch(updateVote({
                    objectId: post?.id,
                    objectType: "POST",
                    voteType: "UP"
                }))
            }}><i className="bi bi-arrow-up"></i></button>
        </div>
    )
}