import { Link, useNavigate } from "react-router"

export default function NotificationVote(props: {
    params: {
        userId: any
        userAvatar: any
        userFullName: any,
        postId: any,
        postTitle: any,
    }
    time: any,
    read: boolean
}) {
    const navigate = useNavigate()
    return (
        <li onClick={() => {
            navigate(`/profile/${props.params.userId}`)
        }}  className={`notification-item  list-group-item notify-background d-flex align-items-start   ${!props.read ? '' : "text-muted"}`}>
            <img
                src={props.params.userAvatar}
                alt="avatar"
                className="rounded-circle me-3"
                width="40"
                height="40"
            />
            {/* <Link to={"vc"}> */}
            <div className="flex-grow-1">
                <div className="">
                    <p className={`p-0 m-0 ${!props.read ? '' : "text-muted"}`} style={{textDecoration: "none", color: "black"}}><strong>{props.params.userFullName}</strong> đã bình luận về bài viết {props.params.postTitle ? <strong>{props.params.postTitle}</strong> : ''} của bạn.</p>
                </div>
                <small className="text-muted">{props.time}</small>
            </div>
            {/* </Link> */}
        </li>
    )
}