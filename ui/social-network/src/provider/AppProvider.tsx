import { createContext, useEffect, useState } from "react"
import { TokenUtils } from "../common"
import { ProfileSimpleResp, UserProfileResp } from "../model/profileModel"
import profileService from "../services/profile/profileService"

interface Model {
    profile: {
        get?: UserProfileResp,
        set: any
    },
    blockedUsers?: {
        get: ProfileSimpleResp[],
        set: any
    },
    unreadMessageCount: {
        get: number,
        set: any
    },
    unreadNotificationCount: {
        get: number,
        set: any
    },
    friendNotificationCount: {
        get: number,
        set: any
    },
    openSearch: {
        get: boolean,
        set: any
    },

    openNotification: {
        get: boolean,
        set: any
    },
    uploadState: {
        loading: {get: boolean, set: any}
    }

}

export const AppContext = createContext<Model | undefined>(undefined)

export default function AppProvider({children}: any) {
    const [openSearch, setOpenSearch] = useState(false)
    const [openNotification, setOpenNotification] = useState(false)
    const [friendNotificationCount, setFriendNotificationCount] = useState(0)
    const [unreadMessageCount, setUnreadMessageCount] = useState(0)
    const [unreadNotificationCount, setUnreadNotificationCount] = useState(0)
    const [uploadStateLoading, setUploadStateLoading] = useState(false)
    const [userProfile, setUserProfile] = useState<UserProfileResp>()
    const currentUserId = TokenUtils.authLogin.userId
    useEffect(() => {
        profileService.getUserDetailByUserId(currentUserId, setUserProfile)
    }, [])


    return <AppContext.Provider value={{
        profile: {
            get: userProfile,
            set: setUserProfile
        },
        uploadState: {
            loading: {
                get: uploadStateLoading,
                set: setUploadStateLoading
            }
        },
        friendNotificationCount: {
            get: friendNotificationCount,
            set: setFriendNotificationCount
        },
        openSearch: {
            get: openSearch,
            set: setOpenSearch
        },
        openNotification: {
            get: openNotification,
            set: setOpenNotification
        },
        unreadMessageCount: {
            set: setUnreadMessageCount,
            get: unreadMessageCount
        },
        unreadNotificationCount: {
            set: setUnreadNotificationCount,
            get: unreadNotificationCount
        }
    }}>
        {children}
    </AppContext.Provider>
}