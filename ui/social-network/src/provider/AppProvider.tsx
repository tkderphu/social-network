import { createContext } from "react"
import { ProfileSimpleResp, UserProfileResp } from "../model/profileModel"

interface Model {
    profile: {
        get: UserProfileResp,
        set: any
    },
    blockedUsers: {
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
    }
}

const AppContext = createContext<Model | undefined>(undefined)

export default function AppProvider({children}: any) {
    

    // <AppContext.Provider value={{}}>
    //     {children}
    // </AppContext.Provider>
}