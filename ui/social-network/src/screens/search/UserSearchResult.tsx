import { Link } from "react-router"

function UserSearchResult() {
    return (
        <>
            <div className="card mb-4 " style={{ marginRight: "20px" }}>
                <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                        <div>
                            <img src="https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-1/480711535_1842907343127897_6577860200092242649_n.jpg?stp=dst-jpg_p100x100_tt6&_nc_cat=110&ccb=1-7&_nc_sid=e99d92&_nc_ohc=U7qwTKWNLHYQ7kNvgGqEqOH&_nc_oc=AdjWl8LXI4wLXfwZFoXTQN5VGb9zYJSTK69H9Trx1jVGuvFxRDYLPSVajgjE4aHNVwSuZoQ89gPIwmOsQRFQb_Jd&_nc_zt=24&_nc_ht=scontent.fhan2-4.fna&_nc_gid=AHx6CbMoDTUXgvSY4zMH5o4&oh=00_AYHYgEvxj6dqt0BY4L1iQ7RfUSRjhKM67CFXOwlSZecTgg&oe=67D491B5"
                                className="rounded" alt="..."
                                height={"100px"} width={"100px"}
                            />
                        </div>
                        <div className="">
                            <Link to={`profile/5`}><h4>Phu Quang</h4></Link>

                        </div>
                    </div>
                    <button className="m-5" style={{

                    }}>Add Friend</button>
                </div>
            </div>
            <div className="card mb-4 " style={{ marginRight: "20px" }}>
                <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                        <div>
                            <img src="https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-1/480711535_1842907343127897_6577860200092242649_n.jpg?stp=dst-jpg_p100x100_tt6&_nc_cat=110&ccb=1-7&_nc_sid=e99d92&_nc_ohc=U7qwTKWNLHYQ7kNvgGqEqOH&_nc_oc=AdjWl8LXI4wLXfwZFoXTQN5VGb9zYJSTK69H9Trx1jVGuvFxRDYLPSVajgjE4aHNVwSuZoQ89gPIwmOsQRFQb_Jd&_nc_zt=24&_nc_ht=scontent.fhan2-4.fna&_nc_gid=AHx6CbMoDTUXgvSY4zMH5o4&oh=00_AYHYgEvxj6dqt0BY4L1iQ7RfUSRjhKM67CFXOwlSZecTgg&oe=67D491B5"
                                className="rounded" alt="..."
                                height={"100px"} width={"100px"}
                            />
                        </div>
                        <div className="">
                            <Link to={`/profile/5`}><h4>Phu Quang</h4></Link>

                        </div>
                    </div>
                    <button className="m-5" style={{

                    }}>Add Friend</button>
                </div>
            </div>
            <div className="card mb-4 " style={{ marginRight: "20px" }}>
                <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                        <div>
                            <img src="https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-1/480711535_1842907343127897_6577860200092242649_n.jpg?stp=dst-jpg_p100x100_tt6&_nc_cat=110&ccb=1-7&_nc_sid=e99d92&_nc_ohc=U7qwTKWNLHYQ7kNvgGqEqOH&_nc_oc=AdjWl8LXI4wLXfwZFoXTQN5VGb9zYJSTK69H9Trx1jVGuvFxRDYLPSVajgjE4aHNVwSuZoQ89gPIwmOsQRFQb_Jd&_nc_zt=24&_nc_ht=scontent.fhan2-4.fna&_nc_gid=AHx6CbMoDTUXgvSY4zMH5o4&oh=00_AYHYgEvxj6dqt0BY4L1iQ7RfUSRjhKM67CFXOwlSZecTgg&oe=67D491B5"
                                className="rounded" alt="..."
                                height={"100px"} width={"100px"}
                            />
                        </div>
                        <div className="">
                            <Link to={`/profile/5`}><h4>Phu Quang</h4></Link>

                        </div>
                    </div>
                    <button className="m-5" style={{

                    }}>Add Friend</button>
                </div>
            </div>
        </>
    )
}
export default UserSearchResult