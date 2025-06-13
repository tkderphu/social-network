package viosmash.notification.api;

import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.notification.enums.NotificationType;
import viosmash.notification.enums.TargetType;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@Accessors(chain = true)
public class NotificationDto {

    private TargetType targetType;

    private Long targetId;

    private NotificationType notificationType;

    private LocalDateTime createdAt;

    private Long actorId;
    private Long userId;

    //optional params;
    private Map<String, Object> params;
}
