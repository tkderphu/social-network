import { useContext, useState } from "react"
import { SettingContext } from "../SettingProvider"

export default function PersonalInformationSection() {
    const profile = useContext(SettingContext)?.profile
    const [editPersonalInfor, setEditPersonalInfor] = useState(false)

    return (
        <div className="card profile-info-card">
            <div className="card-body">
                <div className="d-flex section-title justify-content-between align-items-center">
                    <h5 >Personal Information</h5>
                    <div >
                        {!editPersonalInfor && (
                            <button className="btn btn-edit" id="editBtn"
                                onClick={() => setEditPersonalInfor(true)}
                            >
                                <i className="fas fa-edit me-2" />
                                Edit
                            </button>
                        )}
                        {editPersonalInfor && (
                            <div className="d-flex">
                                <button
                                    className="btn btn-save me-2"
                                    id="saveBtn"
                                // onclick="saveProfile()"
                                >
                                    <i className="fas fa-save me-2" />
                                    Save
                                </button>
                                <button
                                    className="btn btn-secondary"
                                    id="cancelBtn"
                                    onClick={() => setEditPersonalInfor(false)}
                                >
                                    <i className="fas fa-times me-2" />
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-4">
                        <span className="info-label">First Name</span>
                    </div>
                    <div className="col-sm-8">
                        <span className="info-value" id="firstName-view" style={{ display: `${!editPersonalInfor ? "block" : "none"}` }}>
                            John
                        </span>
                        <input
                            type="text"
                            className="form-control edit-mode"
                            id="firstName-edit"
                            defaultValue="John"
                            style={{ display: `${editPersonalInfor ? "block" : "none"}` }}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-4">
                        <span className="info-label">Last Name</span>
                    </div>
                    <div className="col-sm-8">
                        <span className="info-value" id="lastName-view" style={{ display: `${!editPersonalInfor ? "block" : "none"}` }}>
                            Doe
                        </span>
                        <input
                            type="text"
                            className="form-control edit-mode"
                            id="lastName-edit"
                            defaultValue="Doe"
                            style={{ display: `${editPersonalInfor ? "block" : "none"}` }}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-4">
                        <span className="info-label">Phone Number</span>
                    </div>
                    <div className="col-sm-8">
                        <span className="info-value" id="phoneNumber-view" style={{ display: `${!editPersonalInfor ? "block" : "none"}` }}>
                            +1 (555) 123-4567
                        </span>
                        <input
                            type="tel"
                            className="form-control edit-mode"
                            id="phoneNumber-edit"
                            defaultValue="+1 (555) 123-4567"
                            style={{ display: `${editPersonalInfor ? "block" : "none"}` }}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-4">
                        <span className="info-label">Gender</span>
                    </div>
                    <div className="col-sm-8">
                        <span className="info-value" id="gender-view" style={{ display: `${!editPersonalInfor ? "block" : "none"}` }}>
                            Male
                        </span>
                        <select
                            className="form-select edit-mode"
                            id="gender-edit"
                            style={{ display: `${editPersonalInfor ? "block" : "none"}` }}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-4">
                        <span className="info-label">Date of Birth</span>
                    </div>
                    <div className="col-sm-8">
                        <span className="info-value" id="dob-view" style={{ display: `${!editPersonalInfor ? "block" : "none"}` }}>
                            January 15, 1990
                        </span>
                        <input
                            type="date"
                            className="form-control edit-mode"
                            id="dob-edit"
                            defaultValue="1990-01-15"
                            style={{ display: `${editPersonalInfor ? "block" : "none"}` }}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-4">
                        <span className="info-label">Bio</span>
                    </div>
                    <div className="col-sm-8">
                        <span className="info-value" id="bio-view" style={{ display: `${!editPersonalInfor ? "block" : "none"}` }}>
                            Software Developer passionate about creating amazing user
                            experiences
                        </span>
                        <textarea
                            className="form-control edit-mode"
                            id="bio-edit"
                            rows={3}
                            style={{ display: `${editPersonalInfor ? "block" : "none"}` }}
                            defaultValue={
                                "Software Developer passionate about creating amazing user experiences"
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}