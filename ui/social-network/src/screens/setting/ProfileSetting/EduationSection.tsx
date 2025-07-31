import { useContext, useEffect, useState } from "react"
import { p } from "react-router/dist/development/fog-of-war-Cm1iXIp7"
import { toast } from "react-toastify"
import { TokenUtils } from "../../../common"
import { AppContext } from "../../../provider/AppProvider"
import profileService from "../../../services/profile/profileService"


const enums = [
    "HIGH_SCHOOL",
    "UNIVERSITY"
]

export default function EducationSection() {
    const [editPersonalInfor, setEditPersonalInfor] = useState(false)
    const [education, setEducation] = useState<Record<string, string>>({
        "HIGH_SCHOOL": "",
        "UNIVERSITY": ""
    })
    const profile = useContext(AppContext)?.profile


    useEffect(() => {
        initialUserReqUpdate()
    }, [profile?.get])

    const initialUserReqUpdate = () => {
        if (profile?.get?.educations) {
            setEducation(profile.get.educations)
        }
    }

    const onChange = (e: any) => {
        const {name, value} = e.target

        setEducation((prev: any) => ({
            ...prev,
            [name]: value
        }))
    }

    const onSubmit = () => {
        profileService.updateEducation(education, () => {
            profileService.getUserDetailByUserId(TokenUtils.authLogin.userId, profile?.set)
            setEditPersonalInfor(false)
            toast.success("Education updated successfully!")
        })
    }
    return (
        <>
            <div className="d-flex section-title justify-content-between align-items-center">
                <h5 >Education</h5>
                <div>
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
                                onClick={() => setEditPersonalInfor(false)}
                            >
                                <i className="fas fa-times me-2" />
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div id="schools-section">
                <div className="row mb-3">
                    <div className="col-sm-4">
                        <span className="info-label">University</span>
                    </div>
                    <div className="col-sm-8">
                        <span className="info-value" id="university-view" style={{ display: `${!editPersonalInfor ? "block" : "none"}` }}>
                            {education["UNIVERSITY"] || "null"}
                        </span>
                        <input
                            onChange={onChange}
                            name="UNIVERSITY"
                            type="text"
                            className="form-control edit-mode"
                            id="university-edit"
                            value={education["UNIVERSITY"]}
                            style={{ display: `${editPersonalInfor ? "block" : "none"}` }}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-4">
                        <span className="info-label">High School</span>
                    </div>
                    <div className="col-sm-8">
                        <span className="info-value" id="highschool-view" style={{ display: `${!editPersonalInfor ? "block" : "none"}` }}>
                            {education['HIGH_SCHOOL'] || "null"}
                        </span>
                        <input
                            onChange={onChange}
                            type="text"
                            name="HIGH_SCHOOL"
                            className="form-control edit-mode"
                            id="highschool-edit"
                            value={education['HIGH_SCHOOL']}
                            style={{ display: `${editPersonalInfor ? "block" : "none"}` }}
                        />
                    </div>
                </div>
            </div>
           

        </>
    )
}