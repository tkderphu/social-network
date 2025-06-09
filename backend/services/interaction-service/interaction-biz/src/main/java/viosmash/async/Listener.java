package viosmash.async;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import viosmash.notification.api.NotificationApi;
import viosmash.pojo.api.notification.NotificationDto;
import viosmash.pojo.api.post.PostUpdateVote;
import viosmash.post.api.PostApi;

@RequiredArgsConstructor
@Component
@Slf4j
public class Listener {
    private final NotificationApi notificationApi;
    private final PostApi postApi;
    @Async
    @EventListener
    public void saveNotification(NotificationDto dto) {
        notificationApi.sendNotification(dto);
    }



}
