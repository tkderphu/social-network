import { useLocation, useNavigate } from "react-router"
import { GroupResp } from "../../../model/groupModel"
import { NotificationRespVO } from "../Notification"

interface NotificationCommentRespVO extends NotificationRespVO {
    target: GroupResp
}

export default function NotificationGroup(props: {
    obj: NotificationCommentRespVO
}) {
    const navigate = useNavigate()
    const location = useLocation()
    return (
        <li onClick={() => {
            navigate(`/groups/${props.obj.target?.id}`)
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
                {props.obj.notificationType == "JOINED_GROUP" ?
                    (
                        <div className="">
                            {/* <p className={`p-0 m-0 ${!props.obj.seen ? '' : "text-muted"}`} style={{ textDecoration: "none", color: "black" }}>
                                <strong>{props.obj.actor.firstName + " " + props.obj.actor.lastName}</strong>
                                đã bình luận về bài viết <strong>{props.obj.target.content}</strong> của bạn.
                            </p> */}
                        </div>
                    )
                    :
                    (props.obj.notificationType == "JOIN_GROUP_BY_INVITED" ?
                        (

                            <div className="">
                                <p className={`p-0 m-0 ${!props.obj.seen ? '' : "text-muted"}`} style={{ textDecoration: "none", color: "black" }}>
                                    <strong>{props.obj.actor.firstName + " " + props.obj.actor.lastName} </strong>
                                    have invited you to their group <strong>{props.obj.target?.name}</strong>.
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