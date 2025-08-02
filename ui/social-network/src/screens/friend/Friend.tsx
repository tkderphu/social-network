







import { useEffect, useState } from "react"
import { Link, Outlet } from "react-router"
import "./Friend.css"
function Friend() {

    const [useMode, setUseMode] = useState<"YOUR_FRIENDS" | "FRIEND_REQUESTS" | "FRIEND_ACCEPTS" | "SUGGESTIONS">("YOUR_FRIENDS")
    useEffect(() => {
        if(!localStorage.getItem("friends-navbar")) {
            localStorage.setItem("friends-navbar", useMode)
        } else {
            const nav: any = localStorage.getItem("friends-navbar")
            setUseMode(nav)
        }

        return () => {
            localStorage.removeItem("friends-navbar")
        }
    }, [])


    const onClickChangeNavBar = (nav: any) => {
        localStorage.setItem("friends-navbar", nav)
        setUseMode(nav)
    }

    return (
        <div className="mt-2">
            <div className="row">
                <div className="col-md-3 sticky-sidebar vertical-line-right" style={{height: "100vh"}}>
                    <div className="d-flex flex-column">
                        <Link to={''} className={'p-3 btn btn-light w-100 ' + (useMode === "YOUR_FRIENDS" ? "active" : "")}  onClick={() => {
                            onClickChangeNavBar("YOUR_FRIENDS")
                        }} style={{ border: "none" }}>Your friends</Link>
                        <Link to={'requests'} className={'p-3 btn btn-light w-100 ' + (useMode === "FRIEND_REQUESTS" ? "active" : "")} onClick={() => {
                            onClickChangeNavBar("FRIEND_REQUESTS")
                        }}  style={{ border: "none" }}>Friend Requests</Link>
                        <Link to={'accepts'} className={'p-3 btn btn-light w-100 ' + (useMode === "FRIEND_ACCEPTS" ? "active" : "")} onClick={() => {
                            onClickChangeNavBar("FRIEND_ACCEPTS")
                        }}  style={{ border: "none" }}>Friend Accepts</Link>
                        <Link to={"suggestions"} className={'p-3 btn btn-light w-100 ' + (useMode === "SUGGESTIONS" ? "active" : "")} onClick={() => {
                            onClickChangeNavBar("SUGGESTIONS")
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