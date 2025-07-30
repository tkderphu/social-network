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
    }

}

export const SettingContext = createContext<Model | undefined>(undefined)

export default function SettingProvider({children}: any) {
    const [notificationSetting, setNotificationSetting] = useState<NotificationSettingRespVO>()

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



    }, [])


    return (
        <SettingContext.Provider value={{
         
            notificationSetting: {
                get: notificationSetting,
                set: setNotificationSetting
            }
        }}>
            {children}
        </SettingContext.Provider>
    )

}