import { useState } from 'react'
function Photo() {
    const [navigateContent, setNavigateContent] = useState<"#your_photos">("#your_photos")
    return (
        <div className="card">
            <div className="card-header">
                Photos
            </div>
            <div className="card-body">
                <ul className="nav nav-tabs mt-3">
                    <li className="nav-item"><a className={"nav-link " + (navigateContent === '#your_photos' ? 'active' : '')}
                        onClick={() => { setNavigateContent("#your_photos") }}
                        data-bs-toggle="tab" href="#your_photos">Your photos</a></li>
                    {/* <li className="nav-item"><a onClick={() => { setNavigateContent("#college") }} className={"nav-link " + (navigateContent === '#college' ? 'active' : '')} data-bs-toggle="tab" href="#college">College</a></li> */}
                    {/* <li className="nav-item"><a onClick={() => { setNavigateContent("#hometown") }} className={"nav-link " + (navigateContent === '#hometown' ? 'active' : '')} data-bs-toggle="tab" href="#hometown">Hometown</a></li> */}
                    {/* <li className="nav-item"><a onClick={() => { setNavigateContent("#follower") }} className={"nav-link " + (navigateContent === '#follower' ? 'active' : '')} data-bs-toggle="tab" href="#follower">Follower</a></li> */}
                    {/* <li className="nav-item"><a onClick={() => { setNavigateContent("#following") }} className={"nav-link " + (navigateContent === '#following' ? 'active' : '')} data-bs-toggle="tab" href="#following">Following</a></li> */}
                </ul>
                <div className="tab-content mt-3">
                    <div className="tab-pane fade show active" id={`${navigateContent}`}></div>
                    <div className='d-flex flex-wrap'>
                        <img src="https://scontent.fhan14-2.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=tr-s4_JjwBkQ7kNvgHb5pVe&_nc_oc=AdjBXkHaW1v57nxT2aWusTyYlx8Tzz_csH-KgfhXVshIXqcslX5d3z6teanwI0ARXck&_nc_zt=24&_nc_ht=scontent.fhan14-2.fna&_nc_gid=A3geOAlyJTwwOSIYk2SOiCj&oh=00_AYAnUuKvhVyDL3cNRnPy5pfwImK3jZV6JvzcwKW6kuW7zw&oe=67EE4CBA"
                            className="img-fluid rounded mx-2 mb-3"
                            width={"200px"}
                        />
                        <img src="https://scontent.fhan14-2.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=tr-s4_JjwBkQ7kNvgHb5pVe&_nc_oc=AdjBXkHaW1v57nxT2aWusTyYlx8Tzz_csH-KgfhXVshIXqcslX5d3z6teanwI0ARXck&_nc_zt=24&_nc_ht=scontent.fhan14-2.fna&_nc_gid=A3geOAlyJTwwOSIYk2SOiCj&oh=00_AYAnUuKvhVyDL3cNRnPy5pfwImK3jZV6JvzcwKW6kuW7zw&oe=67EE4CBA"
                            className="img-fluid rounded mx-2 mb-3"
                            width={"200px"}
                        />
                        <img src="https://scontent.fhan14-2.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=tr-s4_JjwBkQ7kNvgHb5pVe&_nc_oc=AdjBXkHaW1v57nxT2aWusTyYlx8Tzz_csH-KgfhXVshIXqcslX5d3z6teanwI0ARXck&_nc_zt=24&_nc_ht=scontent.fhan14-2.fna&_nc_gid=A3geOAlyJTwwOSIYk2SOiCj&oh=00_AYAnUuKvhVyDL3cNRnPy5pfwImK3jZV6JvzcwKW6kuW7zw&oe=67EE4CBA"
                            className="img-fluid rounded mx-2 mb-3"
                            width={"200px"}
                        />
                        <img src="https://scontent.fhan14-2.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=tr-s4_JjwBkQ7kNvgHb5pVe&_nc_oc=AdjBXkHaW1v57nxT2aWusTyYlx8Tzz_csH-KgfhXVshIXqcslX5d3z6teanwI0ARXck&_nc_zt=24&_nc_ht=scontent.fhan14-2.fna&_nc_gid=A3geOAlyJTwwOSIYk2SOiCj&oh=00_AYAnUuKvhVyDL3cNRnPy5pfwImK3jZV6JvzcwKW6kuW7zw&oe=67EE4CBA"
                            className="img-fluid rounded mx-2 mb-3"
                            width={"200px"}
                        />
                        <img src="https://scontent.fhan14-2.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=tr-s4_JjwBkQ7kNvgHb5pVe&_nc_oc=AdjBXkHaW1v57nxT2aWusTyYlx8Tzz_csH-KgfhXVshIXqcslX5d3z6teanwI0ARXck&_nc_zt=24&_nc_ht=scontent.fhan14-2.fna&_nc_gid=A3geOAlyJTwwOSIYk2SOiCj&oh=00_AYAnUuKvhVyDL3cNRnPy5pfwImK3jZV6JvzcwKW6kuW7zw&oe=67EE4CBA"
                            className="img-fluid rounded mx-2 mb-3"
                            width={"200px"}
                        />

                        <img src="https://scontent.fhan14-2.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=tr-s4_JjwBkQ7kNvgHb5pVe&_nc_oc=AdjBXkHaW1v57nxT2aWusTyYlx8Tzz_csH-KgfhXVshIXqcslX5d3z6teanwI0ARXck&_nc_zt=24&_nc_ht=scontent.fhan14-2.fna&_nc_gid=A3geOAlyJTwwOSIYk2SOiCj&oh=00_AYAnUuKvhVyDL3cNRnPy5pfwImK3jZV6JvzcwKW6kuW7zw&oe=67EE4CBA"
                            className="img-fluid rounded mx-2 mb-3"
                            width={"200px"}
                        />
                        <img src="https://scontent.fhan14-2.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=tr-s4_JjwBkQ7kNvgHb5pVe&_nc_oc=AdjBXkHaW1v57nxT2aWusTyYlx8Tzz_csH-KgfhXVshIXqcslX5d3z6teanwI0ARXck&_nc_zt=24&_nc_ht=scontent.fhan14-2.fna&_nc_gid=A3geOAlyJTwwOSIYk2SOiCj&oh=00_AYAnUuKvhVyDL3cNRnPy5pfwImK3jZV6JvzcwKW6kuW7zw&oe=67EE4CBA"
                            className="img-fluid rounded mx-2 mb-3"
                            width={"200px"}
                        />
                        <img src="https://scontent.fhan14-2.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=tr-s4_JjwBkQ7kNvgHb5pVe&_nc_oc=AdjBXkHaW1v57nxT2aWusTyYlx8Tzz_csH-KgfhXVshIXqcslX5d3z6teanwI0ARXck&_nc_zt=24&_nc_ht=scontent.fhan14-2.fna&_nc_gid=A3geOAlyJTwwOSIYk2SOiCj&oh=00_AYAnUuKvhVyDL3cNRnPy5pfwImK3jZV6JvzcwKW6kuW7zw&oe=67EE4CBA"
                            className="img-fluid rounded mx-2 mb-3"
                            width={"200px"}
                        />
                        <img src="https://scontent.fhan14-2.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=tr-s4_JjwBkQ7kNvgHb5pVe&_nc_oc=AdjBXkHaW1v57nxT2aWusTyYlx8Tzz_csH-KgfhXVshIXqcslX5d3z6teanwI0ARXck&_nc_zt=24&_nc_ht=scontent.fhan14-2.fna&_nc_gid=A3geOAlyJTwwOSIYk2SOiCj&oh=00_AYAnUuKvhVyDL3cNRnPy5pfwImK3jZV6JvzcwKW6kuW7zw&oe=67EE4CBA"
                            className="img-fluid rounded mx-2 mb-3"
                            width={"200px"}
                        />
                    </div>
                </div>
            </div>
            <div className='card-footer'>
            <button className="btn btn-primary" data-toggle="modal">Upload photos/video</button>

            </div>
        </div>
    )
}
export default Photo