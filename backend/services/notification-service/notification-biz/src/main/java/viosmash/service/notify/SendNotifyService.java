package viosmash.service.notify;

import org.springframework.scheduling.annotation.Async;
import viosmash.pojo.api.notification.NotificationType;

import java.util.Map;

public interface SendNotifyService {

    void sendNotifyMessage(Long userId, NotificationType type, Map<String, Object> templateParams);
    @Async
    void notifySingleMessage(Long userId, Map<String, Object> templateParams);

    @Async
    void mailNotifySingleMessage(Map<String, Object> properties, NotificationType type, String subject);
}
