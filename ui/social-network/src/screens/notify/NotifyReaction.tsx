import { Link, useNavigate } from "react-router";

export default function NotifyReaction() {
    const nav = useNavigate()
    return (
        <div className="notification">
            <img className="avatar" src="https://i.pravatar.cc/48?img=5" alt="User Avatar" />
            <button type="button" className="btn btn-primary"  data-toggle="modal" data-target="#exampleModal"
                onClick={() => {
                    nav("/posts")
                }}
            >

                {/* <Link to={"/posts"}> */}


                    <div className="notification-text">
                        <div>
                            <strong>Jane Smith</strong> reacted 😂 to your comment
                            <img src="https://static.xx.fbcdn.net/images/emoji.php/v9/t75/1/32/1f602.png" className="reaction-icon" alt="Laugh Reaction" />
                        </div>
                        <div className="notification-time">10 minutes ago</div>
                    </div>
                {/* </Link> */}

            </button>
        </div>
    )
}
