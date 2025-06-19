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
    },
    {
        name: "Setting",
        path: "setting"
    },
]

export function PendingUser() {
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

const setting = {
    "autoAcceptMember": "Auto accept members",
    "autoReviewPost": "Auto accept posts",
}

export function GroupSetting() {
    return (
        <>
            <div className="form-check form-switch mb-2" style={{fontSize: "18px"}}>
                <label className="form-check-label" htmlFor="member">Enable auto accept members</label>
                <input className="form-check-input" type="checkbox" id="member" />
            </div>
            <div className="form-check form-switch mb-2" style={{fontSize: "18px"}}>
                <label className="form-check-label" htmlFor="post">Enable auto accept posts</label>
                <input className="form-check-input" type="checkbox" id="post" />
            </div>
        </>
    )
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
                                    setSelectedGroup(fake.path)
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