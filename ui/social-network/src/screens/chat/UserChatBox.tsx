import "./Chat"
function UserChatBox(props: {removeThisUserChatboxFn: any}) {
    return (
        <div className="user-chat-box card">
            <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                        <img src="https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-1/480711535_1842907343127897_6577860200092242649_n.jpg?stp=dst-jpg_p100x100_tt6&_nc_cat=110&ccb=1-7&_nc_sid=e99d92&_nc_ohc=U7qwTKWNLHYQ7kNvgGqEqOH&_nc_oc=AdjWl8LXI4wLXfwZFoXTQN5VGb9zYJSTK69H9Trx1jVGuvFxRDYLPSVajgjE4aHNVwSuZoQ89gPIwmOsQRFQb_Jd&_nc_zt=24&_nc_ht=scontent.fhan2-4.fna&_nc_gid=AHx6CbMoDTUXgvSY4zMH5o4&oh=00_AYHYgEvxj6dqt0BY4L1iQ7RfUSRjhKM67CFXOwlSZecTgg&oe=67D491B5"
                            height={"50px"}
                        />
                        <h5 className="mx-3">Phuong nhi</h5>
                    </div>
                    <div>
                        <button onClick={() => {
                            props.removeThisUserChatboxFn()
                        }} className="btn btn-secondary"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 50 50">
                            <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                        </svg></button>
                    </div>
            </div>
            <div className="user-chat-box-content">

            </div>
            <div className="user-chat-box-send-message d-flex flex-column ">
                <input type={'file'} className="mb-3" />
                <div className="d-flex">
                    <textarea placeholder="Aa" rows={3}></textarea>
                    <button className="btn btn-primary">Send</button>
                </div>
            </div>
        </div>
    )
}
export default UserChatBox