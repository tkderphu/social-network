package viosmash.api;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import viosmash.dal.dataobject.v1.CommentNotification;
import viosmash.dal.dataobject.v1.FriendNotification;
import viosmash.notification.api.NotificationApi;
import viosmash.pojo.api.notification.NotificationDto;
import viosmash.object.BeanUtil;
import viosmash.service.notify.SendNotifyService;
import viosmash.service.v1.NotificationService;

import static viosmash.pojo.api.notification.NotificationType.CREATED_REQUEST_FRIEND;
import static viosmash.pojo.api.notification.NotificationType.FORGOT_PASSWORD;

@RestController
@RequiredArgsConstructor
@RequestMapping(NotificationApi.PREFIX)
@Slf4j
public class NotificationApiImpl implements NotificationApi {

    private final SendNotifyService sendNotifyService;
    private final NotificationService notificationService;
    @Override
    @PostMapping("/send")
    public void sendNotification(@RequestBody NotificationDto req) {
        switch (req.getType()) {
            case FORGOT_PASSWORD -> {
                log.info("begin send");
//                sendNotifyService.mailNotifySingleMessage(req.getProperties(), req.getType(), "Forgot password");
                log.info("end send");
                break;
            }
            case CREATED_REQUEST_FRIEND -> {
                log.info("create request friend");
                FriendNotification notification = BeanUtil.copy(req, FriendNotification.class);
                notification.setFriendTypeAction(FriendNotification.FriendTypeAction.REQUEST);
                notificationService.saveNotification(notification);
//                sendNotifyService.sendNotifyMessage(userId, req.getType(), req.getProperties());
            }
            case CREATED_COMMENT -> {
                log.info("create comment: {}", req);
                CommentNotification notification = BeanUtil.copy(req, CommentNotification.class);
                notificationService.saveNotification(notification);
            }
        }
    }
}
