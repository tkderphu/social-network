import { useState } from "react"

export default function EducationSection() {
    const [editPersonalInfor, setEditPersonalInfor] = useState(false)

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
            <div id="schools-section">
                <div className="row mb-3">
                    <div className="col-sm-4">
                        <span className="info-label">University</span>
                    </div>
                    <div className="col-sm-8">
                        <span className="info-value" id="university-view">
                            Stanford University
                        </span>
                        <input
                            type="text"
                            className="form-control edit-mode"
                            id="university-edit"
                            defaultValue="Stanford University"
                            style={{ display: "none" }}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-4">
                        <span className="info-label">High School</span>
                    </div>
                    <div className="col-sm-8">
                        <span className="info-value" id="highschool-view">
                            Central High School
                        </span>
                        <input
                            type="text"
                            className="form-control edit-mode"
                            id="highschool-edit"
                            defaultValue="Central High School"
                            style={{ display: "none" }}
                        />
                    </div>
                </div>
            </div>
           

        </>
    )
}