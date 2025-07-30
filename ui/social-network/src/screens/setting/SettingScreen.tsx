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
        </SettingProvider>
    )
}