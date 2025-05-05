package viosmash;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.Message;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import viosmash.profile.api.UserApi;

@Component
@RequiredArgsConstructor
@Slf4j
public class WebsocketHandleEvent {
    private final UserApi userApi;
    @EventListener
    public void handleSessionConnected(SessionConnectEvent sessionConnectEvent) {
        handleSession(sessionConnectEvent.getMessage(), true);
    }

    @EventListener
    public void handleSessionDisConnected(SessionDisconnectEvent sessionDisconnectEvent) {
        handleSession(sessionDisconnectEvent.getMessage(), false);
    }

    private void handleSession(Message message, boolean isOnline) {
        SimpMessageHeaderAccessor accessor = SimpMessageHeaderAccessor.wrap(message);
        log.info("user at accessor: {}", accessor.getUser());
        Long userId = Long.parseLong(accessor.getUser().getName());
        userApi.updateOnlineStatus(userId, isOnline);

        log.info("updated status user: {}", isOnline);
    }
}
