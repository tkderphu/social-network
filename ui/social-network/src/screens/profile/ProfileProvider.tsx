import { createContext, useState } from "react";
import { UserProfileResp } from "../../model/profileModel";

interface ProfileContextType {
    userProfile: UserProfileResp,
    setUserProfile: (user: any) => void
}
const ProfileContext = createContext<ProfileContextType | undefined>(undefined)
export default function ProfileProvider() {
    const [userProfile, setUserProfile] = useState<UserProfileResp | undefined>(undefined)

    return (
        null
    )
}