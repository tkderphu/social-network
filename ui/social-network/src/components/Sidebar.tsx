import { useState } from "react";
import { Link } from "react-router";

export default function Sidebar(){
    const [useLink, setUseLik] = useState<"HOME" | "PROFILE" | "FRIENDS" | "GROUPS" | "INBOX">("HOME")
    return (
        <div className="d-flex mt-2 flex-column bg-light vh-100 p-3" style={{ position: 'fixed', top: 0, left: 0 }}>
            <ul className="nav nav-pills flex-column">
                <li className="nav-item">
                    <Link to={"/#"} className={`nav-link ${useLink === 'HOME' ? "active" : ""}`} onClick={() => {
                        setUseLik("HOME")
                    }}><i className="bi bi-house-door me-2"></i>Home</Link>
                </li>
                <li className="nav-item">
                    <Link to={"/profile/1"} className={`nav-link ${useLink === 'PROFILE' ? "active" : ""}`} onClick={() => {
                        setUseLik("PROFILE")
                    }}><i className="bi bi-person me-2"></i>Profile</Link>
                </li>
                <li className="nav-item">
                    <Link to={"/inbox"} className={`nav-link ${useLink === 'INBOX' ? "active" : ""}`} onClick={() => {
                        setUseLik("INBOX")
                    }}><i className="bi bi-person me-2"></i>Inbox</Link>
                </li>
                <li className="nav-item">
                    <Link to={"/friends"} className={`nav-link ${useLink === 'FRIENDS' ? "active" : ""}`} onClick={() => {
                        setUseLik("FRIENDS")
                    }}><i className="bi bi-people me-2"></i>Friends</Link>
                </li>
                <li className="nav-item">
                    <Link to={"/groups"} className={`nav-link ${useLink === 'GROUPS' ? "active" : ""}`} onClick={() => {
                        setUseLik("GROUPS")
                    }}><i className="bi bi-collection me-2"></i>Groups</Link>
                </li>
            </ul>
        </div>
    );
};