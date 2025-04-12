

import Modal from "../../components/Modal"
import { useEffect, useState } from 'react'
import "./Profile.css"
import Friends from "./Friends"
import Photo from "./Photo"
import { UserProfileResp } from "../../model/profileModel"
import { useDispatch, useSelector } from "react-redux"
import { fetchProfileAction } from "../../redux/actions/profileAction"
import { TokenUtils } from "../../common"
import { useParams } from "react-router"
import Spinner from "../../components/Spinner"
import Alert from "../../components/Alert"
import InfoComponent from "./InfoComponent"
import PhotosComponent from "./PhotosComponent"
import AddressComponent from "./AddressComponent"
import EduactionComponent from "./EducationComponent"
import { acceptMakeFriendRequestAction, cancelFriendAction, cancelMakeFriendRequestAction, createFriendRequestAction, fetchStatusBetweenUserAction, rejectMakeFriendRequestAction } from "../../redux/actions/friendshipAction"
function ProfileScreen() {
    const { id } = useParams()
    const fetchProfile: {
        userProfile: UserProfileResp,
        loading: boolean,
        hasError: boolean,
        message: any
    } = useSelector((state: any) => {
        return state.fetchProfile
    })

    const fetchStatusState: {
        status: "FRIEND" | "MAKE_FRIEND" |
        "ACCEPT_FRIEND" |
        "NONE"
    } = useSelector((state: any) => {
        return state.fetchStatusBetweenUser
    })

    const dispatch = useDispatch()

    const [navigateContent, setNavigateContent] = useState<"#posts_nav" | "#friends" | "#photos">("#posts_nav")


    useEffect(() => {
        //@ts-ignore
        dispatch(fetchProfileAction(id))
        //@ts-ignore
        dispatch(fetchStatusBetweenUserAction(id))
    }, [])


    const friendshipActionOnClick = () => {
        if (fetchStatusState.status === 'NONE') {
            //@ts-ignore
            dispatch(createFriendRequestAction(id))
        }else if (fetchStatusState.status === 'ACCEPT_FRIEND') {
            //@ts-ignore
            dispatch(acceptMakeFriendRequestAction(id))
        } else if (fetchStatusState.status == 'MAKE_FRIEND'){
            //@ts-ignore
            dispatch(cancelMakeFriendRequestAction(id))
        } else {
            //@ts-ignore
            dispatch(cancelFriendAction(id))
        }
    }

    return (
        <div className="container-fluid" style={{ minWidth: "1000px" }} >
            {fetchProfile.loading && <Spinner loading={fetchProfile.loading} />}
            {fetchProfile.hasError && <Alert message={fetchProfile.message} type='danger' />}
            {fetchProfile.userProfile && (
                <>
                    <div className="cover-photo">
                        <div>
                            <a href="#photo-cover" data-toggle="modal" data-target=".photo-cover-modal" ><img src="https://freefrontend.com/assets/img/bootstrap-profiles/bootstrap-4-individual-user-profile-on-a-social-network.png"
                                alt="Profile Picture" height={"400px"} width={"100%"}

                            /></a>
                            <Modal id="photo-cover-modal" title="Cover photo" html={
                                <>
                                    <div className="row">
                                        <div className="col-8">
                                            <img src="https://freefrontend.com/assets/img/bootstrap-profiles/bootstrap-4-individual-user-profile-on-a-social-network.png"
                                                alt="Profile Picture" height={"100%"} width={"100%"} />
                                        </div>
                                        <div className="col-4">
                                            <div className="input-group">
                                                <button style={{ border: "none" }} className="input-group-text"><span >Write comment</span></button>
                                                <textarea className="form-control" aria-label="With textarea"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            } />
                            {/* <button>Add cover photo</button> */}
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
                        <div className="d-flex align-items-center ">
                            <img src="https://freefrontend.com/assets/img/bootstrap-profiles/bootstrap-4-individual-user-profile-on-a-social-network.png"
                                alt="Profile Picture" className="img-fluid img-thumbnail rounded-circle" width={"150px"} height={"150px"} />
                            <div>
                                <h3>{fetchProfile.userProfile.firstName + " " + fetchProfile.userProfile.lastName}</h3>
                                <div>53 friends</div>
                            </div>
                        </div>
                        <div>
                            {id == TokenUtils.authLogin.userId ? (
                                <>
                                    <button className="btn btn-primary ">Add to story</button>
                                    <button className="btn btn-secondary m-3" data-toggle="modal" data-target=".edit-profile">Edit profile</button>
                                    <button className="btn btn-primary" data-toggle="modal" data-target=".settings-privacy">Settings</button>
                                </>
                            ) : (
                                <>
                                    {fetchStatusState.status === 'ACCEPT_FRIEND' && <button className="btn btn-secondary mx-3" onClick={() => {
                                        //@ts-ignore
                                        dispatch(rejectMakeFriendRequestAction(id))
                                    }}>Cancel</button>}

                                    <button className="btn btn-primary" onClick={() => {
                                        friendshipActionOnClick()
                                    }}>{fetchStatusState.status === 'NONE' ? "Add friend" : (fetchStatusState.status === 'MAKE_FRIEND' ? "Cancel made friend" : (fetchStatusState.status === 'ACCEPT_FRIEND' ? "Accept friend" : "Cancel friend"))}</button>

                                    <button style={{ border: 'none', backgroundColor: "white" }} className='m-3'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-chat-fill" viewBox="0 0 16 16">
                                            <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15" />
                                        </svg>
                                    </button>

                                </>
                            )}
                            <Modal id="edit-profile"
                                title="Edit profile"
                                html={<>
                                    <PhotosComponent />
                                    <InfoComponent />
                                    <EduactionComponent />
                                    <AddressComponent />
                                </>}
                            />
                            <Modal id="settings-privacy"
                                title="Settings privacy"
                                html={<>
                                    <div className="mb-3">
                                        <div className="card">
                                            <div className="card-header">
                                                Notifications privacy
                                            </div>
                                            <div className="card-body">
                                                <select className="form-select form-select-lg w-100" aria-label=".form-select-lg example">
                                                    <option value="1" selected>Anyone can send notifications to you</option>
                                                    <option value="2">Only your friends can send notification to you</option>

                                                </select>
                                            </div>
                                            <div className="card-footer"><button className="btn btn-primary w-50">Update</button></div>

                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="card">
                                            <div className="card-header">
                                                Posts privacy
                                            </div>
                                            <div className="card-body">
                                                <select className="form-select form-select-lg w-100" aria-label=".form-select-lg example">
                                                    <option value="1" selected>Any can see your posts</option>
                                                    <option value="2">Only friends can see your posts</option>
                                                    <option value="3">Only you can see your posts</option>
                                                </select>
                                            </div>
                                            <div className="card-footer"><button className="btn btn-primary w-50">Update</button></div>

                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="card">
                                            <div className="card-header">
                                                Messages privacy
                                            </div>
                                            <div className="card-body">
                                                <select className="form-select form-select-lg w-100" aria-label=".form-select-lg example">
                                                    <option value="1" selected>Any can send messages to you</option>
                                                    <option value="2">Only friends can send messages to you</option>

                                                </select>
                                            </div>
                                            <div className="card-footer"><button className="btn btn-primary w-50">Update</button></div>

                                        </div>
                                    </div>
                                </>}
                            />
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
                                <div className="col-5 left-section sticky-sidebar">
                                    <div className="card mb-3">
                                        <div className="d-flex flex-column align-items-center mb-2 mt-2">
                                            <h5>Intro</h5>
                                            {fetchProfile.userProfile.educations?.map(err => {
                                                return <>
                                                    <p>Studied at {err.pageName}</p>
                                                </>
                                            })}
                                            {fetchProfile.userProfile.addresses?.map(err => {
                                                return <>
                                                    <p>{err.addressEnum + " " + err.pageName}</p>
                                                </>
                                            })}
                                            <p>Joined {fetchProfile.userProfile.createdDate}</p>
                                        </div>
                                    </div>
                                    <div className="card mb-3">
                                        <div className="d-flex flex-column align-items-center">
                                            <h5>Photos</h5>
                                            <p>Studied at Học viện Công nghệ Bưu chính Viễn thông - PTIT</p>
                                            <p>From Bắc Ninh</p>
                                            <p>Joined October 2017</p>
                                            <p>Followed by 20 people</p>
                                            <button className="btn btn-primary">Edit details</button>
                                        </div>
                                    </div>
                                    <div className="card mb-3">
                                        <h5>Friends</h5>
                                        <div className="d-flex flex-wrap">
                                            <div className="mb-3">
                                                <div className="text-center mx-3 mb-3">
                                                    <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                                                        className="rounded" alt="..."
                                                        height={"150px"}
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
                                        <div className="input-group">
                                            <button style={{ border: "none" }} className="input-group-text"><span >Write comment</span></button>
                                            <div data-toggle="modal" data-target=".your-bulletin" className="form-control rounded" style={{
                                                cursor: "pointer"
                                            }} aria-label="With textarea"><span>What's on your mind?</span></div>

                                            <Modal id="your-bulletin" title="Create post" html={
                                                <>
                                                    <div className="input-group mb-3">
                                                        <textarea className="form-control" aria-label="With textarea" placeholder="Write your content"
                                                            rows={9}
                                                        ></textarea>
                                                    </div>
                                                    {/* <div className="input-group">
                                                <span className="input-group-text">With textarea</span>
                                                <textarea className="form-control" aria-label="With textarea"></textarea>
                                            </div> */}
                                                    <div className="mb-3 input-group">
                                                        <label htmlFor="formFile" className="form-label input-group-text" style={{ cursor: "pointer" }}>Add your photos</label>
                                                        <input className="form-control" type="file" id="formFile" />
                                                    </div>
                                                    <button className="btn btn-primary w-50">Submit</button>
                                                </>
                                            } />
                                        </div>
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

                                    <div className="right-section">
                                        <div className="card mb-3">
                                            <div className="card-body">
                                                <h5 className="card-title">Phu Nguyen</h5>
                                                <p className="card-text">March 1 at 7:32 PM</p>
                                                <p className="card-text">This is a sample post.</p>
                                            </div>
                                        </div>

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
                                    <div className="right-section">
                                        <div className="card mb-3">
                                            <div className="card-body">
                                                <h5 className="card-title">Phu Nguyen</h5>
                                                <p className="card-text">March 1 at 7:32 PM</p>
                                                <p className="card-text">This is a sample post.</p>
                                            </div>
                                        </div>

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
                                    <div className="right-section">
                                        <div className="card mb-3">
                                            <div className="card-body">
                                                <h5 className="card-title">Phu Nguyen</h5>
                                                <p className="card-text">March 1 at 7:32 PM</p>
                                                <p className="card-text">This is a sample post.</p>
                                            </div>
                                        </div>

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
                                <Friends />
                            )}
                            {navigateContent === '#photos' && (
                                <Photo />
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
export default ProfileScreen