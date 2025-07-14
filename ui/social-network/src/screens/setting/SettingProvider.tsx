import { createContext, useEffect, useRef, useState } from "react"
import { TokenUtils } from "../../common"
import { NotificationSettingRespVO } from "../../model/notificationModel"
import { UserProfileResp } from "../../model/profileModel"
import notificationService from "../../services/notification/notificationService"
import profileService from "../../services/profile/profileService"


interface Model {
    notificationSetting: {
        get?: NotificationSettingRespVO,
        set: any
    },
    profile: {
        get?: UserProfileResp,
        set: any
    },

}

export const SettingContext = createContext<Model | undefined>(undefined)

export default function SettingProvider({children}: any) {
    const [notificationSetting, setNotificationSetting] = useState<NotificationSettingRespVO>()
    const [profile, setProfile] = useState<UserProfileResp>()

    const ref = useRef(false)

    useEffect(() => {
        if(ref.current) {
            return
        }
        ref.current = true


        notificationService.getNotifySetting().then(resp => {
            setNotificationSetting(resp.data.data)
        }).catch(err => {
            console.log("err notification setting fetching: ", err)
        })


        profileService.fetchProfileUser(TokenUtils.authLogin.userId).then(resp => {
            setProfile(resp.data.data)
        }).catch(err => {
            console.log("err profile fetching: ", err)
        })

    }, [])


    return (
        <SettingContext.Provider value={{
            profile: {
                get: profile,
                set: setProfile
            },
            notificationSetting: {
                get: notificationSetting,
                set: setNotificationSetting
            }
        }}>
            {children}
        </SettingContext.Provider>
    )

}