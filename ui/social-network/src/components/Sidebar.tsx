import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { l } from "react-router/dist/development/fog-of-war-Cm1iXIp7";
import { TokenUtils } from "../common";
import { AppContext } from "../provider/AppProvider";



export default function Sidebar() {
    const [useLink, setUseLik] = useState<"HOME" | "PROFILE" | "SETTING" | "NOTIFICATIONS" | "FRIENDS" | "GROUPS" | "INBOX" | "LOGOUT" | "SEARCH">("HOME")
    const location = useLocation()
    const openSearch = useContext(AppContext)?.openSearch
    const openNotification = useContext(AppContext)?.openNotification
    const countUnreadNotification = useContext(AppContext)?.unreadNotificationCount.get
    const countUnreadMessage = useContext(AppContext)?.unreadMessageCount.get
    const appbar = "app-navbar"

    const setLink = (link: "HOME" | "PROFILE" | "SETTING" | "NOTIFICATIONS" | "FRIENDS" | "GROUPS" | "INBOX" | "LOGOUT" | "SEARCH") => {
        if (link == "SEARCH") {
            openSearch?.set(true)
            openNotification?.set(false)
        } else if (link == "NOTIFICATIONS") {
            openSearch?.set(false)
            openNotification?.set(true)
        } else {
            openSearch?.set(false)
            openNotification?.set(false)
        }
        if (link != "SEARCH" && link != "NOTIFICATIONS") {
            setUseLik(link)
            localStorage.setItem(appbar, link)
        }
    }


    useEffect(() => {
        if(localStorage.getItem(appbar)) {
            const link : any = localStorage.getItem(appbar)
            setUseLik(link || "HOME")
        } else {
            localStorage.setItem(appbar, useLink)
        }

        return () => {
            localStorage.removeItem(appbar)
        }
    }, [])

    return (
        <div className="d-flex flex-column bg-light vh-100 p-3" style={{ position: 'fixed', top: 0, left: 0 }}>
            <ul className="nav nav-pills flex-column">
                <li className="nav-item">
                    <Link to={"/#"} className={`nav-link ${useLink === 'HOME' ? "active" : ""}`} onClick={() => {
                        setLink("HOME")
                    }}><i className="bi bi-house-door " style={{ fontSize: "24px" }}></i></Link>
                </li>
                <li className="nav-item">
                    <Link to={"/profile/" + TokenUtils.authLogin.userId} className={`nav-link ${useLink === 'PROFILE' ? "active" : ""}`} onClick={() => {
                        setLink("PROFILE")
                    }}><i className="bi bi-person " style={{ fontSize: "24px" }}></i></Link>
                </li>
                <li className="nav-item">
                    <div className="position-relative">
                        <Link to={"/inbox"} className={`nav-link ${useLink === 'INBOX' ? "active" : ""}`} onClick={() => {
                            setLink("INBOX")
                        }}><i className="bi bi-inbox " style={{ fontSize: "24px" }}></i></Link>
                        {countUnreadMessage && countUnreadMessage > 0 ? (
                            <div className="rounded-circle" style={{position: 'absolute', top: 0, padding: `${countUnreadMessage  >= 10 ? "3px 3px" : "2.3px 7px"}`, right: 0, backgroundColor: "red"}}>
                                <span style={{ color: "white", fontWeight: "700" }}>{countUnreadMessage >= 10 ? "9+" : countUnreadMessage}</span>
                            </div>
                        ) : null}
                    </div>
                </li>
                <li className="nav-item">
                    <div className={`nav-link`} style={{ cursor: "pointer" }} onClick={() => {
                        setLink("SEARCH")
                    }}><i className="bi bi-search " style={{ fontSize: "24px" }}></i></div>
                </li>
                <li className="nav-item">
                    <Link to={"/friends"} className={`nav-link ${useLink === 'FRIENDS' ? "active" : ""}`} onClick={() => {
                        setLink("FRIENDS")
                    }}><i className="bi bi-people " style={{ fontSize: "24px" }}></i></Link>
                </li>
                <li className="nav-item">
                    <Link to={"/groups"} className={`nav-link ${useLink === 'GROUPS' ? "active" : ""}`} onClick={() => {
                        setLink("GROUPS")
                    }}><i className="bi bi-collection " style={{ fontSize: "24px" }}></i></Link>
                </li>
                <li className="nav-item">
                    <div className="position-relative">
                        <div className={`nav-link`} style={{ cursor: "pointer" }} onClick={() => {
                            setLink("NOTIFICATIONS")
                        }}>
                            <i className="bi bi-bell " style={{ fontSize: "24px" }}></i>
                        </div>
                        {countUnreadNotification && countUnreadNotification > 0 ? (
                            <div className="rounded-circle" style={{position: 'absolute', top: 0, padding: `${countUnreadNotification  >= 10 ? "3px 3px" : "2.3px 7px"}`, right: 0, backgroundColor: "red"}}>
                                <span style={{ color: "white", fontWeight: "700" }}>{countUnreadNotification >= 10 ? "9+" : countUnreadNotification}</span>
                            </div>
                        ) : null}
                    </div>
                </li>

                <li className="nav-item">
                    <Link to={"/setting"} className={`nav-link ${useLink === 'SETTING' ? "active" : ""}`} onClick={() => {
                        setLink("SETTING")
                    }}><i className="bi bi-gear" style={{ fontSize: "24px" }}></i></Link>

                </li>

                <li className="nav-item">
                    <Link to={"/logout"} className={`nav-link ${useLink === 'LOGOUT' ? "active" : ""}`} onClick={() => {
                        setLink("LOGOUT")
                    }}><i className="fa fa-sign-out" style={{ fontSize: "24px" }}></i></Link>

                </li>
            </ul>
        </div>
    );
};






