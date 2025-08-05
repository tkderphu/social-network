import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import FullScreenLoader from "../../components/fullSpinner/FullScreenLoader";
import { ProfileSimpleResp } from "../../model/profileModel";
import { fetchNotifyMessagesAction } from "../../redux/actions/notificationAction";
import notificationService from "../../services/notification/notificationService";
import "./Notification.css"
import NotificationRequestFriend from "./template/NotificationRequestFriend";

export interface NotificationRespVO {
    id: any,
    targetType: "POST" | "COMMENT" | "USER" | "VOTE" | "GROUP",
    notificationType: "NEW_VOTE"| "NEW_COMMENT"| "NEW_FRIEND_REQUEST"
    | "NEW_ACCEPT_REQUEST"|"NEW_POST_FRIENDS"| "NEW_POST_GROUPS"
    | "JOINED_GROUP" | "REQUEST_JOINED_GROUP" | "JOIN_GROUP_BY_INVITED" | "ACCEPT_POST_IN_GROUP"
    | "REJECT_POST_IN_GROUP"
    timeAgo: string,
    seen: boolean,
    actor: ProfileSimpleResp,
    others: number
}

export enum RefParam {
    ref_notification,
    ref_post,
    notiication_type
}

export default function Notification() {
    const [showNotifications, setShowNotifications] = useState(false);
    const navigate = useNavigate()

    const closeNotifications = () => {
        navigate(-1)
        setShowNotifications(false);
    };

    useEffect(() => {

        setShowNotifications(!showNotifications);
    }, [])

    // // Close notifications when clicking outside
    // const handleOutsideClick = (e: any) => {
    //     if (showNotifications &&
    //         !e.target.closest('#notificationSidebar') &&
    //         !e.target.closest('#notificationBtn')) {
    //         setShowNotifications(false);
    //     }
    // };


    const dispatch = useDispatch()
    const fetchNotificationState: {
        notifications: {
            time: any,
            read: boolean,
            type: "ACCEPTED_REQUEST_FRIEND" | "CREATED_REQUEST_FRIEND" | "COMMENT",
            params: any
        }[],
        loading: boolean
    } = useSelector((state: any) => {
        return state.fetchNotifyMessages
    })
    useEffect(() => {
        //@ts-ignore
        dispatch(fetchNotifyMessagesAction())
    }, [])

    if(fetchNotificationState.loading) {
        return <FullScreenLoader/>
    }
    return (
        <>
            <div
                className={`notification-sidebar ${showNotifications ? 'show' : ''}`}
                id="notificationSidebar"
            >
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0">Notifications</h5>
                    <button
                        type="button"
                        className="btn-close"
                        onClick={closeNotifications}
                    />
                </div>

                {fetchNotificationState?.notifications?.map(notification => {
                    if (notification.type === "CREATED_REQUEST_FRIEND") {
                        return (
                            <NotificationRequestFriend
                                read={notification.read}
                                time={notification.time}
                                params={notification.params}
                            />
                        )
                    }
                    return null
                })}

            </div>
        </>

    )
}