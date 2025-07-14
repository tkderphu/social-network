import { useState } from "react";
import { Link, Outlet } from "react-router";
import ProfileSettingComponent from "./ProfileSetting/ProfileSettingComponent";
import SettingProvider from "./SettingProvider";

const LINK = [
    {
        path: "profile",
        name: "Profile"
    },
    {
        path: "notification",
        name: "Notification"
    }
]
export default function SettingScreen() {
    const [useLink, setUseLink] = useState("Profile")
    return (
        <SettingProvider>
            <ProfileSettingComponent/>
            {/* <div className="row mt-3 m-1">
                <div className="col-3 sticky-sidebar hide-scrollbar">
                    <div>
                        {LINK.map(link => {
                            if (link.path) {
                                return <Link to={link.path} className={`btn ${link.name === useLink ? "btn-secondary" : "btn-light"} w-100`}
                                    onClick={() => {
                                        setUseLink(link.name)
                                    }}
                                >{link.name}</Link>
                            }
                            return (
                                <button className={`btn ${link.name === useLink ? "btn-secondary" : "btn-light"} w-100`}
                                    onClick={() => {
                                        setUseLink(link.name)

                                    }}
                                >{link.name}</button>
                            )
                        })}
                    </div>
                </div>
                <div className="col-9 vertical-line">
                    <Outlet />
                </div>
            </div> */}
        </SettingProvider>
    )
}