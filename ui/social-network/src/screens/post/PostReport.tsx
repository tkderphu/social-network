import { useContext, useState } from "react"
import { ReportReqVO } from "../../model/postModel"
import "./css/PostReport.css"
import { PostContext } from "./PostCard"

const TYPE = [
    {
        name: "Spam or unwanted content",
        type: "SPAM_UNWANTED_CONTENT",
        icon: "fas fa-envelope-open-text"
    },
    {
        name: "Harassment or bullying",
        type: "HARASSMENT_BULLYING",
        icon: "fas fa-user-times"
    },
    {
        name: "Inappropriate content",
        type: "INAPPROPRIATE_CONTENT",
        icon: "fas fa-exclamation-triangle"
    },
    {
        name: "False information",
        type: "FALSE_INFORMATION",
        icon: "fas fa-info-circle"
    },
    {
        name: "Other",
        type: "OTHER",
        icon: "fas fa-ellipsis-h"
    }
]

export default function PostReport() {
    const post = useContext(PostContext)?.post?.get
    const [reportReq, setReportReq] = useState<ReportReqVO>({
        postId: post?.id,
    })



    const handleReport = () => {
        if(!reportReq.reportType) {
            alert("Please select type report")
            return
        }
        console.log("report: ", reportReq)
    }

    return (
        <>

            {/* <div className="container"> */}
            {/* <div className="report-container"> */}


            <div className="reason-options">
                <h5 className="mb-3">
                    Select a reason:
                </h5>
                {TYPE.map(report => {
                    return (
                        <div className="form-check reason-option">
                            <input
                                className="form-check-input"
                                type="radio"
                                onChange={(e) => setReportReq((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                                name="reportType"
                                id={report.name}
                                value={report.type}
                                defaultValue="spam"
                            />
                            <label className="form-check-label" htmlFor={report.name}>
                                <i className={`${report.icon} me-2`} />
                                {report.name}
                            </label>
                        </div>
                    )
                })}

            </div>
            <div className="form-floating">
                <textarea
                    className="form-control"
                    id="reason"
                    onChange={(e) => setReportReq((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                    placeholder="Please describe the issue..."
                    style={{ height: 120 }}
                    name="reason"
                    defaultValue={""}
                />
                <label htmlFor="reportDescription">
                    <i className="fas fa-comment-alt me-2" />
                    Additional details (optional)
                </label>
            </div>
            <button onClick={handleReport} className="btn btn-report">
                <i className="fas fa-paper-plane me-2" />
                Submit Report
            </button>


            {/* </div> */}
            {/* </div> */}
        </>

    )
}