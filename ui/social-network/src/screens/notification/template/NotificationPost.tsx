import { useLocation, useNavigate } from "react-router"
import { GroupResp } from "../../../model/groupModel"
import { PostResp } from "../../../model/postModel"
import { NotificationRespVO } from "../Notification"

interface NotificationCommentRespVO extends NotificationRespVO {
    target: PostResp
}

export default function NotificationPost(props: {
    obj: NotificationCommentRespVO
}) {
    const navigate = useNavigate()
    const location = useLocation()
    return (
        <li onClick={() => {
            navigate(`/groups/${props.obj.target?.group.id}?notification_type=${props.obj.notificationType}&ref_notification=${props.obj.id}&ref_post=${props.obj.target.id}`)
        }} className={`notification-item  list-group-item notify-background d-flex align-items-start   ${!props.obj.seen ? '' : "text-muted"}`}>
            <img
                src={props.obj.actor.imageUrl || props.obj.actor.avatar}
                alt="avatar"
                className="rounded-circle me-3"
                width="40"
                height="40"
            />
            {/* <Link to={"vc"}> */}
            <div className="flex-grow-1">
                {props.obj.notificationType == "ACCEPT_POST_IN_GROUP" ?
                    (

                        <div className="">
                            <p className={`p-0 m-0 ${!props.obj.seen ? '' : "text-muted"}`} style={{ textDecoration: "none", color: "black" }}>
                                <strong>{props.obj.actor.firstName + " " + props.obj.actor.lastName} </strong>
                                 have accepted your post to their group <strong>{props.obj.target?.group.name}</strong>.
                            </p>
                        </div>
                    )
                    :
                    (props.obj.notificationType == "REJECT_POST_IN_GROUP" ?
                        (

                            <div className="">
                                <p className={`p-0 m-0 ${!props.obj.seen ? '' : "text-muted"}`} style={{ textDecoration: "none", color: "black" }}>
                                    <strong>{props.obj.actor.firstName + " " + props.obj.actor.lastName} </strong>
                                    have rejected your post to their group <strong>{props.obj.target?.group.name}</strong>.
                                </p>
                            </div>

                        )
                        :
                        (
                            <div className="">
                                {/* <p className={`p-0 m-0 ${!props.obj.seen ? '' : "text-muted"}`} style={{ textDecoration: "none", color: "black" }}>
                                    <strong>{props.obj.actor.firstName + " " + props.obj.actor.lastName}</strong>
                                    đã bình luận về bài viết <strong>{props.obj.target.content}</strong> của bạn.
                                </p> */}
                            </div>
                        ))}
                <small className="text-muted">{props.obj.timeAgo}</small>
            </div>
            {/* </Link> */}
        </li>
    )
}