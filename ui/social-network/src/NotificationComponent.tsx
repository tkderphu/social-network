import React, { useEffect } from "react";
import { TokenUtils } from "./common";
import { requestFCMToken, onMessageListener } from "./firebase/firebase";

const NotificationComponent: React.FC = () => {
  useEffect(() => {
    if(TokenUtils.authLogin) {
        requestFCMToken(TokenUtils.authLogin.userId).then((token: any) => {
            if (token) {
              console.log("FCM Token:", token);
      
              // TODO: send token to backend and store in DB
            }
          });
      
          onMessageListener().then((payload: any) => {
            console.log("Notification in foreground:", payload);
            alert(payload.notification?.title);
          });
    }
  }, [TokenUtils.authLogin]);

  return <div>Push Notification Ready</div>;
};

export default NotificationComponent;
