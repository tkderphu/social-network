import "./css/PostReport.css"
export default function PostReport() {
    return (
        <>
     
            {/* <div className="container"> */}
                {/* <div className="report-container"> */}
                   
                    <form id="reportForm">
                        <div className="reason-options">
                            <h5 className="mb-3">
                                Select a reason:
                            </h5>
                            <div className="form-check reason-option">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="reportReason"
                                    id="spam"
                                    defaultValue="spam"
                                />
                                <label className="form-check-label" htmlFor="spam">
                                    <i className="fas fa-envelope-open-text me-2" />
                                    Spam or unwanted content
                                </label>
                            </div>
                            <div className="form-check reason-option">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="reportReason"
                                    id="harassment"
                                    defaultValue="harassment"
                                />
                                <label className="form-check-label" htmlFor="harassment">
                                    <i className="fas fa-user-times me-2" />
                                    Harassment or bullying
                                </label>
                            </div>
                            <div className="form-check reason-option">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="reportReason"
                                    id="inappropriate"
                                    defaultValue="inappropriate"
                                />
                                <label className="form-check-label" htmlFor="inappropriate">
                                    <i className="fas fa-exclamation-triangle me-2" />
                                    Inappropriate content
                                </label>
                            </div>
                            <div className="form-check reason-option">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="reportReason"
                                    id="misinformation"
                                    defaultValue="misinformation"
                                />
                                <label className="form-check-label" htmlFor="misinformation">
                                    <i className="fas fa-info-circle me-2" />
                                    False information
                                </label>
                            </div>
                            <div className="form-check reason-option">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="reportReason"
                                    id="other"
                                    defaultValue="other"
                                />
                                <label className="form-check-label" htmlFor="other">
                                    <i className="fas fa-ellipsis-h me-2" />
                                    Other
                                </label>
                            </div>
                        </div>
                        <div className="form-floating">
                            <textarea
                                className="form-control"
                                id="reportDescription"
                                placeholder="Please describe the issue..."
                                style={{ height: 120 }}
                                defaultValue={""}
                            />
                            <label htmlFor="reportDescription">
                                <i className="fas fa-comment-alt me-2" />
                                Additional details (optional)
                            </label>
                        </div>
                        <button type="submit" className="btn btn-report">
                            <i className="fas fa-paper-plane me-2" />
                            Submit Report
                        </button>
                      
                    </form>
                {/* </div> */}
            {/* </div> */}
        </>

    )
}