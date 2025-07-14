import { useState } from "react"

export default function PolicySection() {
    const [editPersonalInfor, setEditPersonalInfor] = useState(false)
    return (
        <div className="card profile-info-card">
            <div className="card-body">
                <div className=" section-title d-flex justify-content-between align-items-center">
                    <h5 >Privacy &amp; Policies</h5>
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
                <div className="row">
                    <div className="col-md-6">
                        <h5 className="section-title">Chat</h5>
                        <div className="form-check mb-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="privacy-policy"
                                defaultChecked={true}
                                disabled={true}
                            />
                            <label className="form-check-label" htmlFor="privacy-policy">
                                Privacy Policy Accepted
                            </label>
                        </div>
                        <div className="form-check mb-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="terms-service"
                                defaultChecked={true}
                                disabled={true}
                            />
                            <label className="form-check-label" htmlFor="terms-service">
                                Terms of Service Accepted
                            </label>
                        </div>

                        <div>
                            <h5 className="section-title">Notification</h5>
                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="privacy-policy"
                                    defaultChecked={true}
                                    disabled={true}
                                />
                                <label className="form-check-label" htmlFor="privacy-policy">
                                    Privacy Policy Accepted
                                </label>
                            </div>
                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="terms-service"
                                    defaultChecked={true}
                                    disabled={true}
                                />
                                <label className="form-check-label" htmlFor="terms-service">
                                    Terms of Service Accepted
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h5 className="section-title">Post</h5>
                        <div className="form-check mb-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="marketing-emails"
                                defaultChecked={true}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="marketing-emails"
                            >
                                Receive Marketing Emails
                            </label>
                        </div>
                        <div className="form-check mb-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="notifications"
                                defaultChecked={true}
                            />
                            <label className="form-check-label" htmlFor="notifications">
                                Push Notifications
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}