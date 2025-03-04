

import Modal from "../../components/Modal"
import { useState } from 'react'
import "./Profile.css"
import Friends from "./Friends"
import Photo from "./Photo"
function ProfileScreen() {
    const [navigateContent, setNavigateContent] = useState<"#posts_nav" | "#friends" | "#photos">("#posts_nav")
    return (
        <div className="container-fluid" style={{ minWidth: "1000px" }} >
            <div className="cover-photo">
                <div>
                    <a href="javascript:(0)"><img src="https://freefrontend.com/assets/img/bootstrap-profiles/bootstrap-4-individual-user-profile-on-a-social-network.png"
                        alt="Profile Picture" height={"400px"} width={"100%"} /></a>
                    {/* <button>Add cover photo</button> */}
                </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
                <div className="d-flex align-items-center ">
                    <img src="https://freefrontend.com/assets/img/bootstrap-profiles/bootstrap-4-individual-user-profile-on-a-social-network.png"
                        alt="Profile Picture" className="img-fluid img-thumbnail rounded-circle" width={"150px"} height={"150px"} />
                    <div>
                        <h3>Phu Nguyen</h3>
                        <div>53 friends</div>
                    </div>
                </div>
                <div>
                    <button className="btn btn-primary m-3">Add to story</button>
                    <button className="btn btn-secondary" data-toggle="modal" data-target=".edit-profile">Edit profile</button>
                    <Modal id="edit-profile" />
                </div>
            </div>
            <ul className="nav nav-tabs mt-3">
                <li className="nav-item"><a className={"nav-link " + (navigateContent === '#posts_nav' ? 'active' : '')}
                    onClick={() => { setNavigateContent("#posts_nav") }}
                    data-bs-toggle="tab" href="#posts_nav">Posts</a></li>
                {/* <li className="nav-item"><a className={"nav-link " + (navigateContent === '#post' ? 'active' : '')} data-bs-toggle="tab" href="#about">About</a></li> */}
                <li className="nav-item"><a onClick={() => { setNavigateContent("#friends") }} className={"nav-link " + (navigateContent === '#friends' ? 'active' : '')} data-bs-toggle="tab" href="#friends">Friends</a></li>
                <li className="nav-item"><a onClick={() => { setNavigateContent("#photos") }} className={"nav-link " + (navigateContent === '#photos' ? 'active' : '')} data-bs-toggle="tab" href="#photos">Photos</a></li>
                {/* <li className="nav-item"><a className={"nav-link " + (navigateContent === '#post' ? 'active' : '')} data-bs-toggle="tab" href="#videos">Videos</a></li> */}
                {/* <li className="nav-item"><a className={"nav-link " + (navigateContent === '#post' ? 'active' : '')} data-bs-toggle="tab" href="#checkins">Check-ins</a></li> */}
            </ul>
            <div className="tab-content mt-3">
                <div className="tab-pane fade show active" id={`${navigateContent}`}>
                    {navigateContent === '#posts_nav' && (<div className="row d-flex flex-wrap">
                        <div className="col-5 left-section">
                            <div className="card mb-3">
                                <h5>Intro</h5>
                                <p>Studied at Học viện Công nghệ Bưu chính Viễn thông - PTIT</p>
                                <p>From Bắc Ninh</p>
                                <p>Joined October 2017</p>
                                <p>Followed by 20 people</p>
                                <button className="btn btn-light">Edit details</button>
                            </div>
                            <div className="card mb-3">
                                <h5>Photos</h5>
                                <p>Studied at Học viện Công nghệ Bưu chính Viễn thông - PTIT</p>
                                <p>From Bắc Ninh</p>
                                <p>Joined October 2017</p>
                                <p>Followed by 20 people</p>
                                <button className="btn btn-light">Edit details</button>
                            </div>
                            <div className="card mb-3">
                                <h5>Friends</h5>
                                <div className="d-flex flex-wrap">
                                    <div className="mb-3">
                                        <div className="text-center mx-3 mb-3">
                                            <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                                                className="rounded" alt="..."
                                                height={"100px"}
                                            />
                                        </div>
                                        <div className="d-flex flex-column mt-2">
                                            <a href="/friends">Phu Quang</a>
                                            <span>Active 2h ago</span>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="text-center mx-3 mb-3">
                                            <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                                                className="rounded" alt="..."
                                                height={"100px"}
                                            />
                                        </div>
                                        <div className="d-flex flex-column mt-2">
                                            <a href="/friends">Phu Quang</a>
                                            <span>Active 2h ago</span>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="text-center mx-3 mb-3">
                                            <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                                                className="rounded" alt="..."
                                                height={"100px"}
                                            />
                                        </div>
                                        <div className="d-flex flex-column mt-2">
                                            <a href="/friends">Phu Quang</a>
                                            <span>Active 2h ago</span>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="text-center mx-3 mb-3">
                                            <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                                                className="rounded" alt="..."
                                                height={"100px"}
                                            />
                                        </div>
                                        <div className="d-flex flex-column mt-2">
                                            <a href="/friends">Phu Quang</a>
                                            <span>Active 2h ago</span>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="text-center mx-3 mb-3">
                                            <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                                                className="rounded" alt="..."
                                                height={"100px"}
                                            />
                                        </div>
                                        <div className="d-flex flex-column mt-2">
                                            <a href="/friends">Phu Quang</a>
                                            <span>Active 2h ago</span>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="text-center mx-3 mb-3">
                                            <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                                                className="rounded" alt="..."
                                                height={"100px"}
                                            />
                                        </div>
                                        <div className="d-flex flex-column mt-2">
                                            <a href="/friends">Phu Quang</a>
                                            <span>Active 2h ago</span>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="text-center mx-3 mb-3">
                                            <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                                                className="rounded" alt="..."
                                                height={"100px"}
                                            />
                                        </div>
                                        <div className="d-flex flex-column mt-2">
                                            <a href="/friends">Phu Quang</a>
                                            <span>Active 2h ago</span>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="text-center mx-3 mb-3">
                                            <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                                                className="rounded" alt="..."
                                                height={"100px"}
                                            />
                                        </div>
                                        <div className="d-flex flex-column mt-2">
                                            <a href="/friends">Phu Quang</a>
                                            <span>Active 2h ago</span>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="text-center mx-3 mb-3">
                                            <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                                                className="rounded" alt="..."
                                                height={"100px"}
                                            />
                                        </div>
                                        <div className="d-flex flex-column mt-2">
                                            <a href="/friends">Phu Quang</a>
                                            <span>Active 2h ago</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-7 ">
                            <div className="input-group mb-3">
                                <textarea placeholder="What your mind today?" cols={100} className="mb-2" rows={2}></textarea>
                                <button className="btn btn-primary w-100">Post</button>
                            </div>
                            <div className="right-section">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <h5 className="card-title">Phu Nguyen</h5>
                                        <p className="card-text">March 1 at 7:32 PM</p>
                                        <p className="card-text">This is a sample post.</p>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>)}
                    {navigateContent === '#friends' && (
                        <Friends/>
                    )}
                    {navigateContent === '#photos' && (
                        <Photo/>
                    )}
                </div>
            </div>
        </div>
    )
}
export default ProfileScreen