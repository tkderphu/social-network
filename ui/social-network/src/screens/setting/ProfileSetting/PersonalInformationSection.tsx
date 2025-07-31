import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { TokenUtils } from "../../../common"
import { UserUpdateInfoReqVO } from "../../../model/profileModel"
import AppProvider, { AppContext } from "../../../provider/AppProvider"
import profileService from "../../../services/profile/profileService"
import { formatDate2, formatDate3 } from "../../../utils/common"

export default function PersonalInformationSection() {
   
    const [editPersonalInfor, setEditPersonalInfor] = useState(false)
    const [userInfoReq, setUserInfoReq] = useState<UserUpdateInfoReqVO>()
    const profile = useContext(AppContext)?.profile
    console.log("req: ", userInfoReq)
    useEffect(() => {
        initialUserReqUpdate()
    }, [profile?.get])


    const initialUserReqUpdate = () => {
        if (profile?.get) {
            setUserInfoReq({
                isMale: profile?.get?.gender == 'Male' ? true : false,
                ...profile?.get
            })
        }
    }

    const onChange = (e: any) => {
        const {name, value} = e.target

        if(name == "gender") {
            setUserInfoReq((prev: any) => ({
                ...prev,
                isMale: value == "Male" ? true : false
            }))
        } else {
            setUserInfoReq((prev: any) => ({
                ...prev,
                [name]: value
            }))
        }
    }

    const onSubmit = () => {
        profileService.updateInfo(userInfoReq, () => {
            profileService.getUserDetailByUserId(TokenUtils.authLogin.userId, profile?.set)
            toast.success("User info updated successfully")
            setEditPersonalInfor(false)
        })
    }

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
                                    onClick={onSubmit}
                                >
                                    <i className="fas fa-save me-2" />
                                    Save
                                </button>
                                <button
                                    className="btn btn-secondary"
                                    id="cancelBtn"
                                    onClick={() => {
                                        initialUserReqUpdate()
                                        setEditPersonalInfor(false)
                                    }}
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
                            {userInfoReq?.firstName}
                        </span>
                        <input
                            name='firstName'
                            onChange={onChange}
                            type="text"
                            className="form-control edit-mode"
                            id="firstName-edit"
                            value={userInfoReq?.firstName}
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
                            {userInfoReq?.lastName}
                        </span>
                        <input
                            name='lastName'
                            onChange={onChange}
                            type="text"
                            className="form-control edit-mode"
                            id="lastName-edit"
                            value={userInfoReq?.lastName}
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
                            {userInfoReq?.phoneNumber || "null"}
                        </span>
                        <input
                            name='phoneNumber'
                            onChange={onChange}
                            type="tel"
                            className="form-control edit-mode"
                            id="phoneNumber-edit"
                            value={userInfoReq?.phoneNumber || ""}
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
                            {userInfoReq?.isMale ? "Male" : "Female"}
                        </span>
                        <select
                            name='gender'
                            onChange={onChange}
                            className="form-select edit-mode"
                            id="gender-edit"
                            style={{ display: `${editPersonalInfor ? "block" : "none"}` }}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-4">
                        <span className="info-label">Date of Birth</span>
                    </div>
                    <div className="col-sm-8">
                        <span className="info-value" id="dob-view" style={{ display: `${!editPersonalInfor ? "block" : "none"}` }}>
                            {formatDate2(userInfoReq?.dateOfBirth) || "null"}
                        </span>
                        <input
                            name='dateOfBirth'
                            onChange={onChange}
                            type="date"
                            className="form-control edit-mode"
                            id="dob-edit"
                            value={formatDate3(userInfoReq?.dateOfBirth)}
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
                            {userInfoReq?.bio || "null"}
                        </span>
                        <textarea
                            name="bio"
                            onChange={onChange}
                            className="form-control edit-mode"
                            id="bio-edit"
                            rows={3}
                            style={{ display: `${editPersonalInfor ? "block" : "none"}` }}
                            value={userInfoReq?.bio || "" }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}