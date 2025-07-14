import { useContext, useState } from "react"
import { formatDate } from "../../../utils/common"
import "./../ProfileSetting.css"
import { SettingContext } from "../SettingProvider"
import PersonalInformationSection from "./PersonalInformationSection"
import EducationSection from "./EduationSection"
import AddressInformationSection from "./AddressInformationSection"
import PolicySection from "./PolicySection"
import NotificationSection from "./NotificationSection"
export default function ProfileSettingComponent() {
    const profile = useContext(SettingContext)?.profile
    const [editPersonalInfor, setEditPersonalInfor] = useState(false)
    return (
        <div className="container-fluid">
            {/* Profile Header */}
            <div className="container">
                <div style={{ backgroundImage: `url(${profile?.get?.coverPhoto})` }}>
                    {/* <div className="d-flex justify-content-between mt-2"> */}
                    <div className="bottom-0 start-0  px-3 py-1" style={{ borderColor: "black" }}>
                        {/* Cover Photo */}
                        <div className="profile-cover" id="coverPhoto">
                            <img
                                src={profile?.get?.avatar}
                                alt="Profile Avatar"
                                className="profile-avatar bg-white"
                                id="avatarImg"
                            />
                            <div className="online-status" id="onlineStatus" />
                        </div>
                    </div>
                    {/* <button className="btn btn-secondary me-2">Joined</button> */}
                    {/* </div> */}

                </div>
                <div className="row profile-header ">
                       
                        <strong className= "mt-2" id="joinedDate">
                            {/* {profile?.get?.joined} */}
                            Joined: {formatDate(profile?.get?.joined)}
                        </strong>
                    

                </div>
                {/* Profile Content */}
                <div className="row">
                    {/* Personal Information */}
                    <div className="col-md-6 mb-4">
                        <PersonalInformationSection />
                    </div>
                    {/* Education & Addresses */}
                    <div className="col-md-6 mb-4">
                        <div className="card profile-info-card">
                            <div className="card-body">
                                <EducationSection />
                                <AddressInformationSection />

                            </div>
                        </div>
                    </div>
                </div>
                {/* Policies Section */}
                <div className="row mb-4">
                    <div className="col-12">
                        <PolicySection />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <NotificationSection/>
                    </div>
                </div>
            </div>
        </div>

    )
}