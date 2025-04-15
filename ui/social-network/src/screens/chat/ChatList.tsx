import { Link, Outlet, useParams } from "react-router"
import UserChatBox from "./UserChatBox"
import "./Chat.css"
function ChatList() {
    const { conversationId } = useParams()
    return (
        <div className="row">
            <div className="col-3">
                <div className="drop-down mt-3 user-chat " >
                    <Link to={"6"} onClick={() => {
                        // onClickAddChatBox()
                    }}>
                        <div className="d-flex align-items-center">
                            <img src="https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-1/480711535_1842907343127897_6577860200092242649_n.jpg?stp=dst-jpg_p100x100_tt6&_nc_cat=110&ccb=1-7&_nc_sid=e99d92&_nc_ohc=U7qwTKWNLHYQ7kNvgGqEqOH&_nc_oc=AdjWl8LXI4wLXfwZFoXTQN5VGb9zYJSTK69H9Trx1jVGuvFxRDYLPSVajgjE4aHNVwSuZoQ89gPIwmOsQRFQb_Jd&_nc_zt=24&_nc_ht=scontent.fhan2-4.fna&_nc_gid=AHx6CbMoDTUXgvSY4zMH5o4&oh=00_AYHYgEvxj6dqt0BY4L1iQ7RfUSRjhKM67CFXOwlSZecTgg&oe=67D491B5"
                            />
                            <div className="d-flex flex-column mx-3">
                                <h4>Phuong Nhi</h4>
                                <span className="mute">You: vl</span>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="drop-down mt-3 user-chat">
                    <Link to={"8"} onClick={() => {
                        // onClickAddChatBox()
                    }}>
                        <div className="d-flex align-items-center">
                            <img src="https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-1/480711535_1842907343127897_6577860200092242649_n.jpg?stp=dst-jpg_p100x100_tt6&_nc_cat=110&ccb=1-7&_nc_sid=e99d92&_nc_ohc=U7qwTKWNLHYQ7kNvgGqEqOH&_nc_oc=AdjWl8LXI4wLXfwZFoXTQN5VGb9zYJSTK69H9Trx1jVGuvFxRDYLPSVajgjE4aHNVwSuZoQ89gPIwmOsQRFQb_Jd&_nc_zt=24&_nc_ht=scontent.fhan2-4.fna&_nc_gid=AHx6CbMoDTUXgvSY4zMH5o4&oh=00_AYHYgEvxj6dqt0BY4L1iQ7RfUSRjhKM67CFXOwlSZecTgg&oe=67D491B5"
                            />
                            <div className="d-flex flex-column mx-3">
                                <h4>Phuong Nhi</h4>
                                <span className="mute">You: o24o2332l4</span>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="col-8">
                <Outlet />
            </div>
        </div>
    )
}
export default ChatList