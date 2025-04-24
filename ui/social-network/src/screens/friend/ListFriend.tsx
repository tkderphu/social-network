import { Link } from "react-router"

function ListFriend(props: { type: "MY" | "REQUEST" | "ACCEPT" | "SUGGESTION", title?: string }) {
    return (
        <>
            <h4>{props.title ? props.title : "People may you know"}</h4>
            <div className="d-flex flex-wrap mt-3">
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <Link to={`/profile/4`} >Phu Quang</Link>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <Link to={`/profile/4`} >Phu Quang</Link>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <Link to={`/profile/4`} >Phu Quang</Link>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <Link to={`/profile/4`} >Phu Quang</Link>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <Link to={`/profile/4`} >Phu Quang</Link>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <Link to={`/profile/4`} >Phu Quang</Link>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <a href="/friends">Phu Quang</a>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>
                <div className="card mb-3" style={{ marginRight: "20px" }}>
                    <div>
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded" alt="..."
                            height={"150px"} width={"150px"}
                        />
                    </div>
                    <div className="">
                        <Link to={"profile/2"}>Phu Quang</Link>
                    </div>
                    <button className="mt-3">Add Friend</button>
                </div>

            </div>
        </>
    )
}
export default ListFriend