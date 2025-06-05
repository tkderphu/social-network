package viosmash.async;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import viosmash.notification.api.NotificationApi;
import viosmash.pojo.api.notification.NotificationDto;

@RequiredArgsConstructor
@Component
public class Listener {
    private final NotificationApi notificationApi;

    @Async
    @EventListener
    public void saveNotification(NotificationDto dto) {
        notificationApi.sendNotification(dto);
    }
}
