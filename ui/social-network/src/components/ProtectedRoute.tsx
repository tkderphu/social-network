import { Navigate, Outlet, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { TokenUtils } from "../common";
import { NotificationRespVO } from "../screens/notification/Notification";
import NotificationComment from "../screens/notification/template/NotificationComment";
import { useStompClient } from "../utils/useStomp";

export default function ProtectedRoute() {
    console.log("token: ", TokenUtils)
    if (TokenUtils.tokenIsExpired) {
        return <Navigate to={"/login"} />
    }
 

    useStompClient({
        path: "notification/ws", handles: [
            {
                topic: `/topic/notifications/user/${TokenUtils.authLogin.userId}`,
                callback: (payload: any) => {
                    console.log("data: ", payload.body)
                    const notification: NotificationRespVO = JSON.parse(payload.body)
                    if(notification.notificationType == "NEW_COMMENT") {
                        toast.info(<>
                            <NotificationComment obj={JSON.parse(payload.body)} />
                        </>, {
                            position: "bottom-left",
                            icon: false
                                // style: {
                                //     height: '300px', // adjust height as needed
                                //     lineHeight: '80px', // vertically center text (optional)
                                // }
                        });
                    }
                }
            }
        ]
    });

    return <Outlet />
}