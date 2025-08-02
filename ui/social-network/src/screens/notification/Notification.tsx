import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import FullScreenLoader from "../../components/fullSpinner/FullScreenLoader";
import { ProfileSimpleResp } from "../../model/profileModel";
import { AppContext } from "../../provider/AppProvider";
import { fetchNotifyMessagesAction } from "../../redux/actions/notificationAction";
import notificationService from "../../services/notification/notificationService";
import "./Notification.css"
import NotificationComment from "./template/NotificationComment";
import NotificationGroup from "./template/NotificationGroup";
import NotificationPost from "./template/NotificationPost";
import NotificationRequestFriend from "./template/NotificationRequestFriend";
import NotificationVote from "./template/NotificationVote";

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
    const openNotification = useContext(AppContext)?.openNotification
    const [notifications, setNotifications] = useState<NotificationRespVO[]>([])
    
    const [paging, setPaging] = useState<{
        page: number,
        limit: number
    }>({
        page: 1,
        limit: 20
    })

    const closeNotifications = () => {
        openNotification?.set(false)
    };

    useEffect(() => {
        if(openNotification?.get) {
            notificationService.getListNotification(paging.page, paging.limit, setNotifications);
        } else {
            return
        }
    }, [openNotification?.get])

  
    return (
        <>
            <div
                className={`notification-sidebar show`}
                id="notificationSidebar"
            >
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0">Notifications</h5>
                    <button type="button" className="btn close" aria-label="Close" onClick={closeNotifications}>
                        <span aria-hidden="true" style={{ fontSize: "20px" }}>&times;</span>
                    </button>
                </div>

                {notifications.map(notification => {
                    if (notification.targetType === "GROUP") {
                        return (
                            <NotificationGroup
                                obj={JSON.parse(JSON.stringify(notification))}
                            />
                        )
                    } else if(notification.targetType == "COMMENT") {
                        return (
                            <NotificationComment
                                obj={JSON.parse(JSON.stringify(notification))}
                            />
                        )
                    } else if(notification.targetType == "POST") {
                        return (
                            <NotificationPost
                                obj={JSON.parse(JSON.stringify(notification))}
                            />
                        )
                    } else if(notification.targetType == "USER") {
                        return (
                            <NotificationGroup
                                obj={JSON.parse(JSON.stringify(notification))}
                            />
                        )
                    } else {
                        return (
                            null
                        )
                    }
                })}

            </div>
        </>

    )
}