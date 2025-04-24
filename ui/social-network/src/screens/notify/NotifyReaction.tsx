import { Link, useLocation, useNavigate } from "react-router";

export default function NotifyReaction(props: {
    userFullName: any,
    userAvatar: any,
    reactionFeeling: any,
    reactionTyoe: any,
    time: any,
    postId: any,
    postTitle: any
}) {
    const location = useLocation()
    return (
        <div className="notification">
            <img className="avatar" src={props.userAvatar} alt="User Avatar" />
            <Link to={`/posts/${props.postId}`} state={{
                backgroundLocation: location
            }} data-target="#exampleModal" style={{ border: "none", backgroundColor: "none" }}

            >
                <div className="notification-text">
                    <div>
                        <strong>{props.userFullName}</strong> reacted 😂 to your comment at {}
                    </div>
                    <div className="notification-time">{props.time} ago</div>
                </div>

            </Link>
        </div>
    )
}
