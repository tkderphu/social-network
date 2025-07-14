import { useState } from "react"

export default function AddressInformationSection() {
    const [edit, setEdit] = useState(false)
    return (
        <>
            <div className="d-flex section-title justify-content-between align-items-center">
                <h5 >Address Information</h5>
                <div >
                    {!edit && (
                        <button className="btn btn-edit" id="editBtn"
                            onClick={() => setEdit(true)}
                        >
                            <i className="fas fa-edit me-2" />
                            Edit
                        </button>
                    )}
                    {edit && (
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
                                onClick={() => setEdit(false)}
                            >
                                <i className="fas fa-times me-2" />
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div id="addresses-section">
                <div className="row mb-3">
                    <div className="col-sm-4">
                        <span className="info-label">From</span>
                    </div>
                    <div className="col-sm-8">
                        <span className="info-value" id="home-address-view">
                            123 Main St, San Francisco, CA 94102
                        </span>
                        <input
                            type="text"
                            className="form-control edit-mode"
                            id="home-address-edit"
                            defaultValue="123 Main St, San Francisco, CA 94102"
                            style={{ display: "none" }}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-4">
                        <span className="info-label">Current living</span>
                    </div>
                    <div className="col-sm-8">
                        <span className="info-value" id="work-address-view">
                            456 Tech Ave, San Francisco, CA 94105
                        </span>
                        <input
                            type="text"
                            className="form-control edit-mode"
                            id="work-address-edit"
                            defaultValue="456 Tech Ave, San Francisco, CA 94105"
                            style={{ display: "none" }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}