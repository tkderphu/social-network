export default function NotificationSection() {
    return (
        <div className="card profile-info-card">
            <div className="card-body">
                <>
                    <h5 className="section-title">Notification Settings</h5>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="enable-comment-notification"
                                    
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="enable-comment-notification"
                                >
                                    <i className="fas fa-comment text-primary me-2" />
                                    Comment Notifications
                                </label>
                            </div>
                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="enable-post-friends-notification"
                                    
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="enable-post-friends-notification"
                                >
                                    <i className="fas fa-user-friends text-success me-2" />
                                    Friends' Post Notifications
                                </label>
                            </div>
                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="enable-post-groups-notification"
                                    
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="enable-post-groups-notification"
                                >
                                    <i className="fas fa-users text-info me-2" />
                                    Group Post Notifications
                                </label>
                            </div>
                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="enable-vote-notification"
                                    
                                />
                                <label className="form-check-label" htmlFor="enable-vote-notification">
                                    <i className="fas fa-thumbs-up text-warning me-2" />
                                    Vote Notifications
                                </label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="enable-push-notification"
                                    
                                />
                                <label className="form-check-label" htmlFor="enable-push-notification">
                                    <i className="fas fa-bell text-danger me-2" />
                                    Push Notifications
                                </label>
                            </div>
                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="enable-sound-notification"
                                    
                                />
                                <label className="form-check-label" htmlFor="enable-sound-notification">
                                    <i className="fas fa-volume-up text-secondary me-2" />
                                    Sound Notifications
                                </label>
                            </div>
                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="enable-friends-request-notification"
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="enable-friends-request-notification"
                                >
                                    <i className="fas fa-user-plus text-primary me-2" />
                                    Friend Request Notifications
                                </label>
                            </div>
                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="enable-accept-request-notification"
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="enable-accept-request-notification"
                                >
                                    <i className="fas fa-user-check text-success me-2" />
                                    Accept Request Notifications
                                </label>
                            </div>
                        </div>
                    </div>
                </>

            </div>

        </div>
    )
}