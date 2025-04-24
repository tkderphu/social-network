import { Link, useLocation } from "react-router"

export default function NotifyMakeFriendRequest(props: {
    userAvatar: any,
    userId: any,
    userFullName: any,
    time: any
}) {
    const location = useLocation()
    return (
        <div className="notification">
            <img className="avatar" src={props.userAvatar} alt="User Avatar" />
            <Link   to={`/profile/${props.userId}`} state={{
                backgroundLocation: location 
            }}  data-target="#exampleModal"style={{border: "none", backgroundColor: "none"}}
                
            >
                {/* <Link to={"/posts"}> */}


                    <div className="notification-text">
                        <div>
                            <strong>{props.userFullName}</strong> make friend request to you.
                        </div>
                        <div className="notification-time">{props.time} ago</div>
                    </div>
                {/* </Link> */}

            </Link>
        </div>
    )
}