package viosmash.dal.dataobject;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.notification.enums.NotificationType;
import viosmash.notification.enums.TargetType;

import java.time.LocalDateTime;

@Entity
@Table(name = "tblNotificationMessage")
@Data
@Accessors(chain = true)
public class NotificationMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private TargetType targetType;

    private Long targetId;

    @Enumerated(EnumType.STRING)
    private NotificationType notificationType;

    private LocalDateTime createdAt;

    private String content;

    private Long actorId;
    private Long userId;
    private Boolean seen;
}
