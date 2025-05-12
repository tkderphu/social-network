package viosmash.notification.api;

import lombok.Data;
import viosmash.notification.enums.NotificationType;

import java.util.Map;

@Data
public class NotificationDto {
    private NotificationType type;
    private Map<String, Object> properties;
}
