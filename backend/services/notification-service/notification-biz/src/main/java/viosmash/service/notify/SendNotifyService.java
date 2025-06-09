package viosmash.service.notify;

import org.springframework.scheduling.annotation.Async;
import viosmash.pojo.api.notification.NotificationDto;
import viosmash.pojo.api.notification.NotificationType;

import java.util.Map;

public interface SendNotifyService {

    void sendNotifyMessage(Long userId, NotificationType type, Map<NotificationDto.KeyParams, Object> templateParams);
//    @Async
//    void notifySingleMessage(Long userId, Map<NotificationDto.KeyParams, Object> templateParams);

    @Async
    void mailNotifySingleMessage(Map<NotificationDto.KeyParams, Object> properties, NotificationType type, String subject);
}
