package viosmash.api;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import viosmash.controller.vo.NotificationMessageRespVO;
import viosmash.dal.dataobject.NotificationMessage;
import viosmash.dal.dataobject.NotificationSetting;
import viosmash.notification.api.MailNotificationDto;
import viosmash.notification.api.NotificationApi;
import viosmash.notification.api.NotificationDto;
import viosmash.object.BeanUtil;
import viosmash.service.notification.NotificationService;
import viosmash.service.notification.NotificationSettingService;

@Slf4j
@RestController
@RequestMapping(NotificationApi.PREFIX)
@RequiredArgsConstructor
public class NotificationApiImpl implements NotificationApi {
    private final NotificationService notificationService;
    @Override
    public void sendAppNotification(NotificationDto req) {
        log.info("Notification coming: {}", req);
        notificationService.sendNotification(req);
    }


    @Override
    public void sendMail(MailNotificationDto req) {

    }
}
