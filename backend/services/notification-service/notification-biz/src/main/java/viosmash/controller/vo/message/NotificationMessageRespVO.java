package viosmash.controller.vo.message;

import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.dal.dataobject.v1.NotificationMessage;
import viosmash.friendship.api.UserDTO;

import java.time.LocalDateTime;

@Data
@Accessors(chain = true)
public class NotificationMessageRespVO {
    private Long id;

    private NotificationMessage.TargetType targetType;

    private Object target;

    private NotificationMessage.NotificationType notificationType;

    private LocalDateTime createdAt;

    private UserDTO actor;
    private Boolean seen;
    private Long others;
}
