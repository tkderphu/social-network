import { Link, useLocation, useNavigate } from "react-router"
import { CommentRespVO } from "../../../model/interactionModel"
import { PostResp } from "../../../model/postModel"
import { NotificationRespVO } from "../Notification"

interface NotificationCommentRespVO extends NotificationRespVO {
    target: PostResp
}

export default function NotificationComment(props: {
    obj: NotificationCommentRespVO
}) {
    const navigate = useNavigate()
    const location = useLocation()
    return (
        <li onClick={() => {
            navigate(`/posts/${props.obj.target.id}`, {
                state: {
                    backgroundLocation: location
                }
            })
        }}  className={`notification-item  list-group-item notify-background d-flex align-items-start   ${!props.obj.seen ? '' : "text-muted"}`}>
            <img
                src={props.obj.actor.imageUrl}
                alt="avatar"
                className="rounded-circle me-3"
                width="40"
                height="40"
            />
            {/* <Link to={"vc"}> */}
            <div className="flex-grow-1">
                <div className="">
                    <p className={`p-0 m-0 ${!props.obj.seen ? '' : "text-muted"}`} style={{textDecoration: "none", color: "black"}}><strong>{props.obj.actor.firstName + " " + props.obj.actor.lastName }</strong> đã bình luận về bài viết <strong>{props.obj.target.content}</strong> của bạn.</p>
                </div>
                <small className="text-muted">{props.obj.timeAgo}</small>
            </div>
            {/* </Link> */}
        </li>
    )
}