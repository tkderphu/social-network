







import { useState } from "react"
import { Link, Outlet, useLocation, useNavigate } from "react-router"
import "./Friend.css"
function Friend() {
    const location = useLocation()
    const navigate = useNavigate()
    const [useMode, setUseMode] = useState<"YOUR_FRIENDS" | "FRIEND_REQUESTS" | "FRIEND_ACCEPTS" | "SUGGESTIONS">()
    return (
        <div className="mt-2">
            <div className="row">
                <div className="col-md-3 sticky-sidebar">
                    <div className="d-flex flex-column">
                        <Link to={''} className={'p-3 btn btn-light w-100 ' + (useMode === "YOUR_FRIENDS" ? "active" : "")}  onClick={() => {
                            setUseMode("YOUR_FRIENDS")
                        }} style={{ border: "none" }}>Your friends</Link>
                        <Link to={'requests'} className={'p-3 btn btn-light w-100 ' + (useMode === "FRIEND_REQUESTS" ? "active" : "")} onClick={() => {
                            setUseMode("FRIEND_REQUESTS")
                        }}  style={{ border: "none" }}>Friend Requests</Link>
                        <Link to={'accepts'} className={'p-3 btn btn-light w-100 ' + (useMode === "FRIEND_ACCEPTS" ? "active" : "")} onClick={() => {
                            setUseMode("FRIEND_ACCEPTS")
                        }}  style={{ border: "none" }}>Friend Accepts</Link>
                        <Link to={"suggestions"} className={'p-3 btn btn-light w-100 ' + (useMode === "SUGGESTIONS" ? "active" : "")} onClick={() => {
                            setUseMode("SUGGESTIONS")
                        }}  >Suggestions</Link>
                    </div>
                </div>
                <div className="col-md-8">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
export default Friend