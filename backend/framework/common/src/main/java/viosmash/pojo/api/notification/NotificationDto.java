package viosmash.pojo.api.notification;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class NotificationDto {
    private NotificationType type;
    private Long toUserId;
    private Long fromUserId;
    private Long postId;
    private Long commentId;

}
