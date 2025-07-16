import { Children, createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ProfileSimpleResp, UserProfileResp } from "../model/profileModel";
import friendshipService from "../services/friendship/friendshipService";
import profileService from "../services/profile/profileService";


interface Model {
    friends?: {
        get: ProfileSimpleResp[],
        set: any
    }
    checkHasEstablishedConversation?: {
        get: string,
        set: any
    },
    profile: {
        get?: UserProfileResp,
        set: any
    },
    countFriends: {
        get: number,
        set: any
    }
}
export const ProfileContext = createContext<Model | undefined>(undefined)
export default function ProfileProvider({children}: any) {
    const [friends, setFriends] = useState([])
    const [checkHasEstablishedConversation, setCheckHasEstablishedConversation] = useState("")
    const [profile, setProfile] = useState<UserProfileResp>()
    const [countFriends, setCountFriends] = useState(0)

    const {userId} = useParams()

    useEffect(() => {
        profileService.fetchProfileUser(userId).then(resp => {
            setProfile(resp.data.data)
        }).catch(err => {
            console.log("err fetch profile: ", err)
        })


        friendshipService.countFriends(useContext, setCountFriends)
        
    }, [userId])


    return <ProfileContext.Provider value={{
        checkHasEstablishedConversation: {
            get: checkHasEstablishedConversation,
            set: setCheckHasEstablishedConversation
        },
        friends: {
            get: friends,
            set: setFriends
        },
        profile: {
            get: profile,
            set: setProfile
        },
        countFriends: {
            get: countFriends,
            set: setCountFriends
        }
    }}>
        {children}
    </ProfileContext.Provider>
}