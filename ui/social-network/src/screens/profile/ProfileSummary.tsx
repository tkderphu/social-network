import { useContext } from "react"
import { Link, useLocation, useNavigate } from "react-router"
import { ProfileContext } from "./ProfileScreen"
import "./ProfileSummary.css"
export default function ProfileSummary() {
    const medias = useContext(ProfileContext)?.photos.get
    const navigate = useNavigate()
    const location = useLocation()
    const profile = useContext(ProfileContext)?.userProfile.get
    return (
        <div className="profile-container" style={{ zIndex: -1 }}>
            {/* Intro Section */}
            <div className="intro-section">
                <div className="border-bottom mb-3"> <h2 style={{ fontSize: "20px" }}>Intro</h2></div>

                <ul className="profile-info">
                    {profile?.bio && (
                        <li>
                            <i className="fas fa-briefcase" />
                            <span>
                                <strong>Bio</strong> • {profile?.bio}
                            </span>
                        </li>
                    )}
                    <li>
                        <i className="fas fa-graduation-cap" />
                        <div>
                            <div>
                                Studied at{" "}
                                <strong>Học viện Công nghệ Bưu chính Viễn thông - PTIT</strong>
                            </div>
                        </div>
                    </li>
                    <li>
                        <i className="fas fa-map-marker-alt" />
                        <span>
                            From <strong>Bắc Ninh</strong>
                        </span>
                    </li>
                </ul>
            </div>
            {/* Photos Section */}
            <div className="mt-3">
                <div className=" d-flex align-items-center justify-content-between border-bottom mb-3">
                    <div> <h2 style={{ fontSize: "20px" }}>Photos</h2></div>
                    <div><a href="#" className="see-all-link">
                        See all photos
                    </a></div>
                </div>
                <div className="photo-grid">
                    {medias?.map((media, index) => {
                        if (index >= 9) return null;
                        return (
                            <div className="photo-item" onClick={() => {
                                navigate(`/posts/${media?.linkedPostId}?media_url=${media.url}`, {
                                    state: {
                                        backgroundLocation: location
                                    }
                                })
                            }} style={{ cursor: "pointer" }}>
                                <img src={media.url} height={100} width={150} />
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>

    )
}