import { useState } from "react"

function Friends() {
    const [navigateContent, setNavigateContent] = useState<"#all_friends" | "#college" | "#photos" | "#hometown" | "#follower" | "#following">("#all_friends")
    return (
        <div className="card">
            <div className="card-header">
                Friends
            </div>
            <div className="card-body">
                <ul className="nav nav-tabs mt-3">
                    <li className="nav-item"><a className={"nav-link " + (navigateContent === '#all_friends' ? 'active' : '')}
                        onClick={() => { setNavigateContent("#all_friends") }}
                        data-bs-toggle="tab" href="#all_friends">All friends</a></li>
                    <li className="nav-item"><a onClick={() => { setNavigateContent("#college") }} className={"nav-link " + (navigateContent === '#college' ? 'active' : '')} data-bs-toggle="tab" href="#college">College</a></li>
                    <li className="nav-item"><a onClick={() => { setNavigateContent("#hometown") }} className={"nav-link " + (navigateContent === '#hometown' ? 'active' : '')} data-bs-toggle="tab" href="#hometown">Hometown</a></li>
                    <li className="nav-item"><a onClick={() => { setNavigateContent("#follower") }} className={"nav-link " + (navigateContent === '#follower' ? 'active' : '')} data-bs-toggle="tab" href="#follower">Follower</a></li>
                    <li className="nav-item"><a onClick={() => { setNavigateContent("#following") }} className={"nav-link " + (navigateContent === '#following' ? 'active' : '')} data-bs-toggle="tab" href="#following">Following</a></li>
                </ul>
                <div className="tab-content mt-3">
                    <div className="tab-pane fade show active" id={`${navigateContent}`}></div>
                    <div className="d-flex justify-content-between flex-wrap">
                        <div className="card mb-3" style={{ width: "49%" }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <img src="https://scontent.fhan14-2.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=tr-s4_JjwBkQ7kNvgHb5pVe&_nc_oc=AdjBXkHaW1v57nxT2aWusTyYlx8Tzz_csH-KgfhXVshIXqcslX5d3z6teanwI0ARXck&_nc_zt=24&_nc_ht=scontent.fhan14-2.fna&_nc_gid=A3geOAlyJTwwOSIYk2SOiCj&oh=00_AYAnUuKvhVyDL3cNRnPy5pfwImK3jZV6JvzcwKW6kuW7zw&oe=67EE4CBA"
                                        className="img-fluid rounded"
                                        width={"100px"}
                                    />
                                    <h5 className="mx-2">Nguyen Quang Phu</h5>
                                </div>
                                <a href="javascript:(0)" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="card mb-3" style={{ width: "49%" }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <img src="https://scontent.fhan14-2.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=tr-s4_JjwBkQ7kNvgHb5pVe&_nc_oc=AdjBXkHaW1v57nxT2aWusTyYlx8Tzz_csH-KgfhXVshIXqcslX5d3z6teanwI0ARXck&_nc_zt=24&_nc_ht=scontent.fhan14-2.fna&_nc_gid=A3geOAlyJTwwOSIYk2SOiCj&oh=00_AYAnUuKvhVyDL3cNRnPy5pfwImK3jZV6JvzcwKW6kuW7zw&oe=67EE4CBA"
                                        className="img-fluid rounded"
                                        width={"100px"}
                                    />
                                    <h5 className="mx-2">Nguyen Quang Phu</h5>
                                </div>
                                <a href="javascript:(0)" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="card mb-3" style={{ width: "49%" }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <img src="https://scontent.fhan14-2.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=tr-s4_JjwBkQ7kNvgHb5pVe&_nc_oc=AdjBXkHaW1v57nxT2aWusTyYlx8Tzz_csH-KgfhXVshIXqcslX5d3z6teanwI0ARXck&_nc_zt=24&_nc_ht=scontent.fhan14-2.fna&_nc_gid=A3geOAlyJTwwOSIYk2SOiCj&oh=00_AYAnUuKvhVyDL3cNRnPy5pfwImK3jZV6JvzcwKW6kuW7zw&oe=67EE4CBA"
                                        className="img-fluid rounded"
                                        width={"100px"}
                                    />
                                    <h5 className="mx-2">Nguyen Quang Phu</h5>
                                </div>
                                <a href="javascript:(0)" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="card mb-3" style={{ width: "49%" }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <img src="https://scontent.fhan14-2.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=tr-s4_JjwBkQ7kNvgHb5pVe&_nc_oc=AdjBXkHaW1v57nxT2aWusTyYlx8Tzz_csH-KgfhXVshIXqcslX5d3z6teanwI0ARXck&_nc_zt=24&_nc_ht=scontent.fhan14-2.fna&_nc_gid=A3geOAlyJTwwOSIYk2SOiCj&oh=00_AYAnUuKvhVyDL3cNRnPy5pfwImK3jZV6JvzcwKW6kuW7zw&oe=67EE4CBA"
                                        className="img-fluid rounded"
                                        width={"100px"}
                                    />
                                    <h5 className="mx-2">Nguyen Quang Phu</h5>
                                </div>
                                <a href="javascript:(0)" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="card mb-3" style={{ width: "49%" }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <img src="https://scontent.fhan14-2.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=tr-s4_JjwBkQ7kNvgHb5pVe&_nc_oc=AdjBXkHaW1v57nxT2aWusTyYlx8Tzz_csH-KgfhXVshIXqcslX5d3z6teanwI0ARXck&_nc_zt=24&_nc_ht=scontent.fhan14-2.fna&_nc_gid=A3geOAlyJTwwOSIYk2SOiCj&oh=00_AYAnUuKvhVyDL3cNRnPy5pfwImK3jZV6JvzcwKW6kuW7zw&oe=67EE4CBA"
                                        className="img-fluid rounded"
                                        width={"100px"}
                                    />
                                    <h5 className="mx-2">Nguyen Quang Phu</h5>
                                </div>
                                <a href="javascript:(0)" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="card mb-3" style={{ width: "49%" }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <img src="https://scontent.fhan14-2.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=tr-s4_JjwBkQ7kNvgHb5pVe&_nc_oc=AdjBXkHaW1v57nxT2aWusTyYlx8Tzz_csH-KgfhXVshIXqcslX5d3z6teanwI0ARXck&_nc_zt=24&_nc_ht=scontent.fhan14-2.fna&_nc_gid=A3geOAlyJTwwOSIYk2SOiCj&oh=00_AYAnUuKvhVyDL3cNRnPy5pfwImK3jZV6JvzcwKW6kuW7zw&oe=67EE4CBA"
                                        className="img-fluid rounded"
                                        width={"100px"}
                                    />
                                    <h5 className="mx-2">Nguyen Quang Phu</h5>
                                </div>
                                <a href="javascript:(0)" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="card mb-3" style={{ width: "49%" }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <img src="https://scontent.fhan14-2.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=tr-s4_JjwBkQ7kNvgHb5pVe&_nc_oc=AdjBXkHaW1v57nxT2aWusTyYlx8Tzz_csH-KgfhXVshIXqcslX5d3z6teanwI0ARXck&_nc_zt=24&_nc_ht=scontent.fhan14-2.fna&_nc_gid=A3geOAlyJTwwOSIYk2SOiCj&oh=00_AYAnUuKvhVyDL3cNRnPy5pfwImK3jZV6JvzcwKW6kuW7zw&oe=67EE4CBA"
                                        className="img-fluid rounded"
                                        width={"100px"}
                                    />
                                    <h5 className="mx-2">Nguyen Quang Phu</h5>
                                </div>
                                <a href="javascript:(0)" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="card mb-3" style={{ width: "49%" }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <img src="https://scontent.fhan14-2.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=tr-s4_JjwBkQ7kNvgHb5pVe&_nc_oc=AdjBXkHaW1v57nxT2aWusTyYlx8Tzz_csH-KgfhXVshIXqcslX5d3z6teanwI0ARXck&_nc_zt=24&_nc_ht=scontent.fhan14-2.fna&_nc_gid=A3geOAlyJTwwOSIYk2SOiCj&oh=00_AYAnUuKvhVyDL3cNRnPy5pfwImK3jZV6JvzcwKW6kuW7zw&oe=67EE4CBA"
                                        className="img-fluid rounded"
                                        width={"100px"}
                                    />
                                    <h5 className="mx-2">Nguyen Quang Phu</h5>
                                </div>
                                <a href="javascript:(0)" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Friends