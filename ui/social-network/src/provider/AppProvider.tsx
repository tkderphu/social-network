import { createContext, useEffect, useState } from "react"
import { TokenUtils } from "../common"
import { NotificationSettingRespVO } from "../model/notificationModel"
import { ProfileSimpleResp, UserProfileResp } from "../model/profileModel"
import messageService from "../services/chat/messageService"
import notificationService from "../services/notification/notificationService"
import notificationSettingService from "../services/notification/notificationSettingService"
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
    },
    notificationSetting: {
        get?: NotificationSettingRespVO,
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
    const [uploadStateLoading, setUploadStateLoading] = useState(false)
    const [userProfile, setUserProfile] = useState<UserProfileResp>()
    const [notificationSetting, setNotificationSetting] = useState<NotificationSettingRespVO>()
    const currentUserId = TokenUtils.authLogin.userId
    useEffect(() => {
        profileService.getUserDetailByUserId(currentUserId, setUserProfile)
        notificationSettingService.getNotificationSetting(setNotificationSetting)
        notificationService.countUnreadMessage(setUnreadNotificationCount)
        messageService.countUnreadMessages(setUnreadMessageCount)
    }, [])


    return <AppContext.Provider value={{
        notificationSetting: {
            get: notificationSetting,
            set: setNotificationSetting
        },
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