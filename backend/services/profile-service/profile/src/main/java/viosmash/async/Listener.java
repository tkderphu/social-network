package viosmash.async;

import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import viosmash.notification.api.NotificationApi;
import viosmash.notification.api.NotificationDto;
import viosmash.notification.enums.TargetType;

@Service
@RequiredArgsConstructor
public class Listener {
    private final NotificationApi notificationApi;
    @EventListener
    @Async
    public void notification(NotificationDto notificationDto) {
//        if(notificationDto.getTargetType() == TargetType.COMMENT) {
//
//        }
    }
}
