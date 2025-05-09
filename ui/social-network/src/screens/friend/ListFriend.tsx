import { Link } from "react-router"

function ListFriend(props: { type: "MY" | "REQUEST" | "ACCEPT" | "SUGGESTION", title?: string }) {
    return (
        <>
            <h4>{props.title ? props.title : "Your friends"}</h4>
            <div className="d-flex flex-wrap mt-3">
                
                <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://wibu.com.vn/wp-content/uploads/2024/05/songoku.jpg"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="text-center mt-1">
                        <Link to={`/friends/profile/${1}`} style={{textDecoration:"none"}} >Phu Quang</Link>
                    </div>
                    <button className="mt-2 btn btn-primary">Add Friend</button>
                </div>

                <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://wibu.com.vn/wp-content/uploads/2024/05/songoku.jpg"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="text-center mt-1">
                        <Link to={`profile/${1}`} style={{textDecoration:"none"}} >Phu Quang</Link>
                    </div>
                    <button className="mt-2 btn btn-primary">Add Friend</button>
                </div>
                <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://wibu.com.vn/wp-content/uploads/2024/05/songoku.jpg"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="text-center mt-1">
                        <Link to={`profile/${1}`} style={{textDecoration:"none"}} >Phu Quang</Link>
                    </div>
                    <button className="mt-2 btn btn-primary">Add Friend</button>
                </div>
                <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://wibu.com.vn/wp-content/uploads/2024/05/songoku.jpg"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="text-center mt-1">
                        <Link to={`profile/${1}`} style={{textDecoration:"none"}} >Phu Quang</Link>
                    </div>
                    <button className="mt-2 btn btn-primary">Add Friend</button>
                </div>
                <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://wibu.com.vn/wp-content/uploads/2024/05/songoku.jpg"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="text-center mt-1">
                        <Link to={`profile/${5}`} style={{textDecoration:"none"}} >Phu Quang</Link>
                    </div>
                    <button className="mt-2 btn btn-primary">Add Friend</button>
                </div>
                <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://wibu.com.vn/wp-content/uploads/2024/05/songoku.jpg"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="text-center mt-1">
                        <Link to={`profile/${5}`} style={{textDecoration:"none"}} >Phu Quang</Link>
                    </div>
                    <button className="mt-2 btn btn-primary">Add Friend</button>
                </div>
                <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://wibu.com.vn/wp-content/uploads/2024/05/songoku.jpg"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="text-center mt-1">
                        <Link to={`profile/${7}`} style={{textDecoration:"none"}} >Phu Quang</Link>
                    </div>
                    <button className="mt-2 btn btn-primary">Add Friend</button>
                </div>
                <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://wibu.com.vn/wp-content/uploads/2024/05/songoku.jpg"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="text-center mt-1">
                        <Link to={`profile/${1}`} style={{textDecoration:"none"}} >Phu Quang</Link>
                    </div>
                    <button className="mt-2 btn btn-primary">Add Friend</button>
                </div>
                
                
                <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://wibu.com.vn/wp-content/uploads/2024/05/songoku.jpg"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="text-center mt-1">
                        <Link to={`/friends/profile/${1}`} style={{textDecoration:"none"}} >Phu Quang</Link>
                    </div>
                    <button className="mt-2 btn btn-primary">Add Friend</button>
                </div>
                
                <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://wibu.com.vn/wp-content/uploads/2024/05/songoku.jpg"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="text-center mt-1">
                        <Link to={`profile/${1}`} style={{textDecoration:"none"}} >Phu Quang</Link>
                    </div>
                    <button className="mt-2 btn btn-primary">Add Friend</button>
                </div>
                
                <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://wibu.com.vn/wp-content/uploads/2024/05/songoku.jpg"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="text-center mt-1">
                        <Link to={`profile/${1}`} style={{textDecoration:"none"}} >Phu Quang</Link>
                    </div>
                    <button className="mt-2 btn btn-primary">Add Friend</button>
                </div>
                <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://wibu.com.vn/wp-content/uploads/2024/05/songoku.jpg"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="text-center mt-1">
                        <Link to={`profile/${1}`} style={{textDecoration:"none"}} >Phu Quang</Link>
                    </div>
                    <button className="mt-2 btn btn-primary">Add Friend</button>
                </div>
                <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://wibu.com.vn/wp-content/uploads/2024/05/songoku.jpg"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="text-center mt-1">
                        <Link to={`profile/${1}`} style={{textDecoration:"none"}} >Phu Quang</Link>
                    </div>
                    <button className="mt-2 btn btn-primary">Add Friend</button>
                </div>
                <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://wibu.com.vn/wp-content/uploads/2024/05/songoku.jpg"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="text-center mt-1">
                        <Link to={`profile/${1}`} style={{textDecoration:"none"}} >Phu Quang</Link>
                    </div>
                    <button className="mt-2 btn btn-primary">Add Friend</button>
                </div>
                <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://wibu.com.vn/wp-content/uploads/2024/05/songoku.jpg"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="text-center mt-1">
                        <Link to={`profile/${1}`} style={{textDecoration:"none"}} >Phu Quang</Link>
                    </div>
                    <button className="mt-2 btn btn-primary">Add Friend</button>
                </div>
                
                <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://wibu.com.vn/wp-content/uploads/2024/05/songoku.jpg"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="text-center mt-1">
                        <Link to={`profile/${1}`} style={{textDecoration:"none"}} >Phu Quang</Link>
                    </div>
                    <button className="mt-2 btn btn-primary">Add Friend</button>
                </div>
                
                <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://wibu.com.vn/wp-content/uploads/2024/05/songoku.jpg"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="text-center mt-1">
                        <Link to={`profile/${1}`} style={{textDecoration:"none"}} >Phu Quang</Link>
                    </div>
                    <button className="mt-2 btn btn-primary">Add Friend</button>
                </div>
                


            </div>
        </>
    )
}
export default ListFriend