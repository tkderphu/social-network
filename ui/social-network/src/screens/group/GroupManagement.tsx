import { useState } from "react"
import { Link, Outlet } from "react-router"

const GROUP_MANAGEMENT = [
    {
        name: "User pending",
        path: "pending/user"
    },
    {
        name: "Post pending",
        path: "pending/post"
    }
]

export  function PendingUser() {
    return (
        <div className="d-flex flex-wrap mt-3">

            <div className="card mb-3 d-flex align-item-center" style={{ marginRight: "20px" }}>
                <div>
                    <img src="https://wibu.com.vn/wp-content/uploads/2024/05/songoku.jpg"
                        className="rounded" alt="..."
                        height={"150px"} width={"150px"}
                    />
                </div>
                <div className="text-center mt-1">
                    <Link to={`/friends/profile/${1}`} style={{ textDecoration: "none" }} >Phu Quang</Link>
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
                    <Link to={`/friends/profile/${1}`} style={{ textDecoration: "none" }} >Phu Quang</Link>
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
                    <Link to={`/friends/profile/${1}`} style={{ textDecoration: "none" }} >Phu Quang</Link>
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
                    <Link to={`/friends/profile/${1}`} style={{ textDecoration: "none" }} >Phu Quang</Link>
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
                    <Link to={`/friends/profile/${1}`} style={{ textDecoration: "none" }} >Phu Quang</Link>
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
                    <Link to={`/
                                friends/profile/${1}`} style={{ textDecoration: "none" }} >Phu Quang</Link>
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
                    <Link to={`/
                                friends/profile/${1}`} style={{ textDecoration: "none" }} >Phu Quang</Link>
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
                    <Link to={`/
                                friends/profile/${1}`} style={{ textDecoration: "none" }} >Phu Quang</Link>
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
                    <Link to={`/
                                friends/profile/${1}`} style={{ textDecoration: "none" }} >Phu Quang</Link>
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
                    <Link to={`/
                                friends/profile/${1}`} style={{ textDecoration: "none" }} >Phu Quang</Link>
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
                    <Link to={`/
                                friends/profile/${1}`} style={{ textDecoration: "none" }} >Phu Quang</Link>
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
                    <Link to={`/
                                friends/profile/${1}`} style={{ textDecoration: "none" }} >Phu Quang</Link>
                </div>
                <button className="mt-2 btn btn-primary">Add Friend</button>
            </div>
        </div>
    )
}

export function PendingPost() {
    
}

export default function GroupManagement() {
    const [selectedGroup, setSelectedGroup] = useState("pending/user")
    return (
        <>
            <div className="row mt-2">
                <div className="col-3">
                    <div className='sticky-sidebar hide-scrollbar'>
                        {GROUP_MANAGEMENT.map(fake => {
                            return (
                                <Link onClick={() => {
                                    setSelectedGroup(fake.name)
                                }} style={{ textDecoration: "none" }} to={fake.path} className={'btn  d-flex align-items-center ' + (fake.path == selectedGroup ? "btn-secondary" : "")}>

                                    <div className='mx-3' style={{ fontSize: "23px" }}>{fake.name}</div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
                <div className="col-9">
                    <Outlet />
                </div>
            </div>
        </>
    )
}