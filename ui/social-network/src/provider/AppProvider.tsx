import { createContext, useState } from "react"
import { ProfileSimpleResp, UserProfileResp } from "../model/profileModel"

interface Model {
    profile?: {
        get: UserProfileResp,
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
    }

}

export const AppContext = createContext<Model | undefined>(undefined)

export default function AppProvider({children}: any) {
    const [openSearch, setOpenSearch] = useState(false)
    const [openNotification, setOpenNotification] = useState(false)
    const [friendNotificationCount, setFriendNotificationCount] = useState(0)
    const [unreadMessageCount, setUnreadMessageCount] = useState(0)
    const [unreadNotificationCount, setUnreadNotificationCount] = useState(0)


    return <AppContext.Provider value={{
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