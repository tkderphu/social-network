package viosmash.api;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import viosmash.notification.api.FirebaseNotificationDto;
import viosmash.notification.api.MailNotificationDto;
import viosmash.notification.api.NotificationApi;
import viosmash.notification.api.NotificationDto;
import viosmash.service.firebase.FCMService;
import viosmash.service.notification.NotificationService;

@Slf4j
@RestController
@RequestMapping(NotificationApi.PREFIX)
@RequiredArgsConstructor
public class NotificationApiImpl implements NotificationApi {
    private final NotificationService notificationService;
    private final FCMService fcmService;

    @Override
    public void sendAppNotification(NotificationDto req) {
        log.info("Notification via app coming: {}", req);
        notificationService.sendNotification(req);
    }




    @Override
    public void sendMail(MailNotificationDto req) {

    }

    @Override
    public void sendFirebase(FirebaseNotificationDto req) {
        log.info("Notification via firebase coming: {}", req);
//        fcmService.sendNotification(
//                req.getTopic(),
//                req.getBody(),
//                req.getUserIds()
//        );
    }
}
