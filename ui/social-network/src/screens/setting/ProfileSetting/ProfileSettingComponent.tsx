import { useContext, useState } from "react"
import { formatDate } from "../../../utils/common"
import "./../ProfileSetting.css"
import { SettingContext } from "../SettingProvider"
import PersonalInformationSection from "./PersonalInformationSection"
import EducationSection from "./EduationSection"
import AddressInformationSection from "./AddressInformationSection"
import PolicySection from "./PolicySection"
import NotificationSection from "./NotificationSection"
import { AppContext } from "../../../provider/AppProvider"
import ProfileScreen from "../../profile/ProfileScreen"
export default function ProfileSettingComponent() {
    const profile = useContext(AppContext)?.profile.get
    const [editPersonalInfor, setEditPersonalInfor] = useState(false)
    return (
        <div >
            {/* Profile Header */}
            <div className="profile-header mb-2">
                <div className="cover-photo mt-2 mx-3">
                    <strong>
                        Joined: {formatDate(profile?.joined || "")}
                    </strong>
                </div>

                {/* Profile Info Section */}
                <div className="profile-info-section">
                    <div className="profile-left">
                        {/* Profile Picture */}
                        <img src={profile?.avatar} className="profile-picture"></img>
                        {/* Profile Details */}
                        <div className="">
                            <h1 className="profile-name">{profile?.firstName + " " + profile?.lastName}</h1>

                        </div>
                    </div>

                </div>
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
                    <NotificationSection />
                </div>
            </div>
        </div>

    )
}