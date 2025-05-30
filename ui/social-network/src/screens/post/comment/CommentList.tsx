import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { PageResult, TokenUtils } from "../../../common"
import Spinner from "../../../components/Spinner"
import { CommentRespVO } from "../../../model/interactionModel"
import { fetchPageCommentAction } from "../../../redux/actions/interactionAction"
interface CommentProps {
    onEdit: any,
    onFocus: any,
    comment: CommentRespVO
}

function Comment(props: CommentProps) {
    const dispatch = useDispatch()

    const fetchNestedComments = (parentCommentId: any) => {
        //@ts-ignore
        dispatch(fetchPageCommentAction(parentCommentId, "parent"))
    }
    return (
        <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex mb-2">
                <img src={props.comment?.user?.avatar} height={50} alt="User" className="rounded-circle me-2" />
                <div>
                    <strong>{props.comment?.user?.firstName + " " + props.comment?.user?.lastName}</strong> {props.comment?.content}<br />
                    <div>
                        {props.comment?.mediaUrls?.map(imageUrl => {
                            return <img className="me-2 mb-2" src={imageUrl} height={100} />
                        })}
                    </div>
                    <div className="d-flex align-items-center">
                        <span className="me-2">{props.comment?.time} ago</span>
                        {props.comment?.nestedComments > 0 && (<button onClick={() => { fetchNestedComments(props.comment.id) }} className="btn d-flex align-items-center"><i className="fa fa-angle-down"></i><span>{props.comment.nestedComments}</span></button>)}
                        <button className="btn">{<i title="Reply" onClick={() => props.onFocus(props.comment)} style={{ cursor: "pointer" }} className="fa fa-reply" aria-hidden="true"></i>}</button>
                        <div className="d-flex align-items-center">
                            <button className="btn"><i className="bi bi-arrow-down"></i></button>
                            <div style={{ color: "red" }}>0</div>
                            <button className="btn"><i className="bi bi-arrow-up"></i></button>
                            <button className="btn"><i className="fas fa-edit"></i></button>
                            <button className="btn"><i className="fa fa-trash" style={{color :"red"}} aria-hidden="true"></i></button>
                        </div>
                    </div>
                    <div>
                        <CommentList onEdit={props.onEdit} onFocus={props.onFocus} comments={props.comment.childComments} fromReply={true}/>
                    </div>
                </div>
            </div>
            {/* {props.comment?.user.id == TokenUtils.authLogin.userId && (
                <div className="dropdown">

                    <button className="btn " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                        </svg>
                    </button>
                    <ul className="dropdown-menu">
                        <li><button className="dropdown-item" onClick={() => {
                            props.onEdit({
                                content: props.comment?.content,
                                id: props.comment?.id,
                                mediaUrls: props.comment?.mediaUrls
                            })
                        }}>Edit</button></li>
                        <li><button className="dropdown-item" onClick={() => {

                        }}>Delete</button></li>
                    </ul>
                </div>
            )} */}
        </div>
    )
}

interface CommentListProps {
    onEdit: any,
    onFocus: any,
    comments?: CommentRespVO[]
    fromReply?: boolean
}

export default function CommentList(props: CommentListProps) {
    console.log("comment list: ", props.comments)
    return (
        <>
            {props.comments?.map(comment => {
                return (
                    <Comment comment={comment} onEdit={props.onEdit} onFocus={props.onFocus} />
                )
            })}
            {(!props.fromReply && (!props.comments || props.comments?.length == 0)) && (
                <h4 className="text-center text-muted">No comments yet</h4>
            )}
        </>
    )
}