package viosmash.async;

import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import viosmash.notification.api.NotificationApi;
import viosmash.pojo.api.notification.NotificationDto;

@Service
@RequiredArgsConstructor
public class Listener {
    private final NotificationApi notificationApi;

    @EventListener
    @Async
    public void notification(NotificationDto notificationDto) {
        notificationApi.sendNotification(notificationDto);
    }
}
