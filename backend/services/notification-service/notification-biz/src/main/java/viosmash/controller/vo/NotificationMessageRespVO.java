package viosmash.controller.vo;

import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.date.DateUtils;
import viosmash.notification.enums.NotificationType;
import viosmash.notification.enums.TargetType;
import viosmash.pojo.api.profile.UserDTO;

import java.time.LocalDateTime;

@Data
@Accessors(chain = true)
public class NotificationMessageRespVO {
    private Long id;

    private TargetType targetType;

    private Object target;

    private NotificationType notificationType;

    private LocalDateTime createdAt;

    private UserDTO actor;
    private Boolean seen;
    private Long others;
    private String timeAgo;

    public String getTimeAgo() {
        return DateUtils.timeAgo(createdAt);
    }
}
